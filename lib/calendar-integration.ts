/**
 * Calendar Integration Utilities
 * Supports Google Calendar and Outlook Calendar
 */

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  timezone?: string;
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDate(event.startDate)}/${formatDate(event.endDate)}`,
    details: event.description,
    location: event.location,
    sf: 'true',
    output: 'xml',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook Calendar URL
 */
export function generateOutlookCalendarUrl(event: CalendarEvent): string {
  const formatDate = (date: Date): string => {
    return date.toISOString();
  };

  const params = new URLSearchParams({
    subject: event.title,
    startdt: formatDate(event.startDate),
    enddt: formatDate(event.endDate),
    body: event.description,
    location: event.location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate ICS file for download
 */
export function generateICSFile(event: CalendarEvent): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Spayce//Workspace Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.startDate)}`,
    `DTEND:${formatDate(event.endDate)}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return icsContent;
}

/**
 * Download ICS file
 */
export function downloadICSFile(event: CalendarEvent, filename: string = 'booking.ics'): void {
  const icsContent = generateICSFile(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Open calendar in new window
 */
export function openCalendar(event: CalendarEvent, provider: 'google' | 'outlook'): void {
  const url =
    provider === 'google'
      ? generateGoogleCalendarUrl(event)
      : generateOutlookCalendarUrl(event);
  window.open(url, '_blank', 'width=700,height=600');
}

/**
 * Create calendar event from booking data
 */
export function createCalendarEvent(
  spaceName: string,
  location: string,
  date: Date,
  time: string,
  duration: number = 1
): CalendarEvent {
  const [timeStr, period] = time.split(' ');
  const [hours, minutes] = timeStr.split(':').map(Number);
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) hour24 += 12;
  if (period === 'AM' && hours === 12) hour24 = 0;

  const startDate = new Date(date);
  startDate.setHours(hour24, minutes || 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + duration);

  return {
    title: `Workspace Booking: ${spaceName}`,
    description: `Workspace booking at ${spaceName}\n\nLocation: ${location}\nTime: ${time}`,
    location: location,
    startDate,
    endDate,
  };
}
