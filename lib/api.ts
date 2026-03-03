const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function signupUser(data: { email: string; password: string, role: string }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Signup failed");
  }

  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function getSpace() {
  const res = await fetch(`${BASE_URL}/spaces/get-spaces`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error getting spaces')
  }

  return res.json();
}

export async function getSpaceById(id: string) {
  const res = await fetch(`${BASE_URL}/spaces/get-space/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error getting space')
  }

  return res.json();
}

export async function listSpaces(data: FormData | Record<string, unknown>) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

  const headers: HeadersInit = isFormData
    ? { Authorization: `Bearer ${token}` }
    : {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

  const res = await fetch(`${BASE_URL}/spaces/list-space`, {
    method: 'POST',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error listing space')
  }

  return res.json();
}


export async function sendSignupOTP(data: { email: string; password: string; role: string; fullName?: string; phone?: string }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send OTP");
  }

  return res.json();
}

export async function verifySignupOTP(data: { email: string; otp: string }) {
  const res = await fetch(`${BASE_URL}/auth/verify-signup-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "OTP verification failed");
  }

  return res.json();
}

export async function sendPasswordResetOTP(data: { email: string }) {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send reset OTP");
  }

  return res.json();
}

export async function verifyPasswordResetOTP(data: { email: string; otp: string }) {
  const res = await fetch(`${BASE_URL}/auth/verify-reset-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "OTP verification failed");
  }

  return res.json();
}

export async function resetPassword(data: { email: string; otp: string; newPassword: string }) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Password reset failed");
  }

  return res.json();
}

export async function createBooking(data: {
  spaceId: string;
  date: string;
  time: string;
  duration?: number;
}) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch(`${BASE_URL}/bookings/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error creating booking');
  }

  return res.json();
}

export async function getBookingsBySpace(spaceId: string) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch(`${BASE_URL}/bookings/space/${spaceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error fetching bookings');
  }

  return res.json();
}

export async function sendMessageToHost(data: {
  spaceId: string;
  hostId?: string;
  message: string;
}) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch(`${BASE_URL}/messages/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error sending message');
  }

  return res.json();
}


