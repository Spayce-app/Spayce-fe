"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separators"
import { Upload, Building, User, Camera, FileText, Shield, CheckCircle, ChevronLeft, ChevronRight, X, Mail, Phone, Briefcase, MapPin, Plus, Check } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useMutation } from "@tanstack/react-query"
import { listSpaces } from "@/lib/api"
import { toast } from "sonner"

const STEPS = [
  { id: 1, title: "Owner Details", description: "Tell us a bit about yourself to get started with your hosting journey." },
  { id: 2, title: "", description: "" },
  { id: 3, title: "Pricing & Amenities", description: "Help guests find the right space by providing accurate pricing and available facilities." },
  { id: 4, title: "Verification", description: "Verify your identity" },
  { id: 5, title: "Agreement", description: "Review and submit" },
]

const GOVERNMENT_ID_OPTIONS = [
  { value: "international-passport", label: "International Passport" },
  { value: "national-id", label: "National ID" },
  { value: "voters-card", label: "Voter's Card" },
  { value: "drivers-license", label: "Driver's License" },
]

const AMENITIES = [
  "Wi-Fi",
  "AC",
  "Projector/TV",
  "Whiteboard",
  "Parking",
  "Kitchen",
  "Security",
  "Generator/Inverter",
  "Printing",
  "Phone Booths",
  "Reception",
  "24/7 Access",
  "Coffee/Tea",
  "Meeting Rooms",
]

const AMENITIES_GROUPED: { category: string; items: { id: string; label: string; description: string }[] }[] = [
  {
    category: "ESSENTIALS",
    items: [
      { id: "wifi", label: "High-speed WiFi", description: "Fast and reliable connection" },
      { id: "power", label: "Uninterrupted Power", description: "Backup generator or inverter" },
    ],
  },
  {
    category: "COMFORT & REFRESHMENTS",
    items: [
      { id: "ac", label: "Air Conditioning", description: "Climate control" },
      { id: "coffee", label: "Coffee & Tea", description: "Kitchen or beverage station" },
      { id: "kitchen", label: "Kitchen Access", description: "Microwave and fridge" },
      { id: "ergonomic", label: "Ergonomic Chairs", description: "Support for long work hours" },
    ],
  },
  {
    category: "FACILITIES",
    items: [
      { id: "parking", label: "Free Parking", description: "Secure on-site parking" },
      { id: "meeting-room", label: "Meeting Room", description: "Private bookable room" },
      { id: "whiteboard", label: "Whiteboard", description: "Available for collaboration" },
      { id: "printing", label: "Printing Service", description: "Paid or free printing" },
    ],
  },
]

const AMENITY_ID_MAP: Record<string, string> = {
  wifi: "Wi-Fi",
  power: "Generator/Inverter",
  ac: "AC",
  coffee: "Coffee/Tea",
  kitchen: "Kitchen",
  ergonomic: "Reception",
  parking: "Parking",
  "meeting-room": "Meeting Rooms",
  whiteboard: "Whiteboard",
  printing: "Printing",
}

const SPACE_TYPES = [
  "Private-Office",
  "Desk/Co-working",
  "Conference/Meeting Room",
]

const PRICING_MODELS = ["Hourly", "Daily", "Weekly", "Monthly"]

const AVAILABILITY_OPTIONS = ["Weekdays", "Weekends", "24/7", "Specific Days"]

export default function ListSpacePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    governmentIdType: "",
    companyName: "",
    spaceName: "",
    spaceType: "",
    location: "",
    capacity: "",
    amenities: [] as string[],
    images: [] as File[],
    description: "",
    pricingModel: "",
    price: "",
    pricePerHour: "",
    pricePerDay: "",
    availability: [] as string[],
    specificDays: "",
    governmentId: null as File | null,
    ownershipProof: null as File | null,
    confirmOwnership: false,
    agreeTerms: false,
  })

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const photoInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [photoPreviews])


  const progress = (currentStep / STEPS.length) * 100

  const handleInputChange = (field: string, value: string | number | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleGroupedAmenityToggle = (id: string) => {
    const mapped = AMENITY_ID_MAP[id]
    if (mapped) {
      handleAmenityToggle(mapped)
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.includes(id)
          ? prev.amenities.filter((a) => a !== id)
          : [...prev.amenities, id],
      }))
    }
  }

  const isGroupedAmenityChecked = (id: string) => {
    const mapped = AMENITY_ID_MAP[id]
    return mapped ? formData.amenities.includes(mapped) : formData.amenities.includes(id)
  }

  const saveDraft = () => {
    try {
      const toSave = {
        ...formData,
        images: [],
        governmentId: null,
        ownershipProof: null,
      }
      localStorage.setItem("spayce_list_space_draft", JSON.stringify(toSave))
      toast.success("Draft saved. You can continue later.")
    } catch {
      toast.error("Could not save draft.")
    }
  }

  const handleAvailabilityToggle = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleDocumentUpload = (field: "governmentId" | "ownershipProof", event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a JPG, PNG, or PDF file")
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        return
      }
      handleFileUpload(field, file)
      toast.success(`${field === "governmentId" ? "Government ID" : "Ownership proof"} uploaded successfully`)
    }
  }

  const MAX_PHOTOS = 8
  const MAX_PHOTO_SIZE = 10 * 1024 * 1024

  const handlePhotosSelected = (files: FileList | null) => {
    if (!files?.length) return

    const remainingSlots = MAX_PHOTOS - formData.images.length
    if (remainingSlots <= 0) {
      toast.error(`You can upload up to ${MAX_PHOTOS} photos`)
      if (photoInputRef.current) photoInputRef.current.value = ""
      return
    }

    const selected = Array.from(files).slice(0, remainingSlots)
    const validFiles: File[] = []
    const previews: string[] = []

    selected.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`"${file.name}" is not a supported image type`)
        return
      }

      if (file.size > MAX_PHOTO_SIZE) {
        toast.error(`"${file.name}" is larger than 10MB`)
        return
      }

      validFiles.push(file)
      previews.push(URL.createObjectURL(file))
    })

    if (!validFiles.length) {
      if (photoInputRef.current) photoInputRef.current.value = ""
      return
    }

    if (files.length > remainingSlots) {
      toast.error(`Only ${remainingSlots} more photo${remainingSlots === 1 ? "" : "s"} allowed`)
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }))
    setPhotoPreviews((prev) => [...prev, ...previews])

    if (photoInputRef.current) photoInputRef.current.value = ""
  }

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => {
      const nextPhotos = [...prev.images]
      nextPhotos.splice(index, 1)
      return { ...prev, images: nextPhotos }
    })

    setPhotoPreviews((prev) => {
      const nextPreviews = [...prev]
      const [removed] = nextPreviews.splice(index, 1)
      if (removed) URL.revokeObjectURL(removed)
      return nextPreviews
    })
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }



  const mutation = useMutation({
    mutationFn: listSpaces,
    onSuccess() {
      toast.success("Space listed successfully!")
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to list space. Please try again.")
    },
  })
  const handleSubmit = () => {
    if (!formData.confirmOwnership || !formData.agreeTerms) {
      toast.error("Please confirm ownership and accept the terms.")
      return
    }

    if (!formData.images.length) {
      toast.error("Please upload at least one photo of your space.")
      setCurrentStep(2)
      return
    }

    const payload = new FormData()

    payload.append("fullName", formData.fullName)
    payload.append("email", formData.email)
    payload.append("phone", formData.phone)
    payload.append("governmentIdType", formData.governmentIdType)
    payload.append("companyName", formData.companyName)
    payload.append("spaceName", formData.spaceName)
    payload.append("spaceType", formData.spaceType)
    payload.append("location", formData.location)
    payload.append("capacity", formData.capacity)
    payload.append("description", formData.description)
    payload.append("pricingModel", formData.pricingModel)
    payload.append("price", formData.price)
    payload.append("pricePerHour", formData.pricePerHour)
    payload.append("pricePerDay", formData.pricePerDay)
    payload.append("specificDays", formData.specificDays)
    payload.append("confirmOwnership", String(formData.confirmOwnership))
    payload.append("agreeTerms", String(formData.agreeTerms))

    formData.amenities.forEach((amenity) => payload.append("amenities", amenity))
    formData.availability.forEach((option) => payload.append("availability", option))
    formData.images.forEach((photo) => payload.append("photos", photo))

    if (formData.governmentId) {
      payload.append("governmentId", formData.governmentId)
    }

    if (formData.ownershipProof) {
      payload.append("ownershipProof", formData.ownershipProof)
    }

    mutation.mutate(payload)
  }
  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Progress: STEP X OF 5 + progress bar + title */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <p className="text-sm font-semibold text-primary">
              STEP {currentStep} OF {STEPS.length}
            </p>
            <div className="flex items-center gap-3 flex-1 sm:max-w-xs">
              <Progress value={progress} className="h-2 flex-1 rounded-full" />
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            {currentStep === 1 ? "Account Setup" : STEPS[currentStep - 1].title}
          </h1>
        </div>

        <div>
        <Card className="border border-border/40 shadow-soft rounded-xl overflow-hidden">
          <CardHeader className="pb-5 pt-8 px-8">
            <CardTitle className="text-lg font-bold">
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1.5">
              {STEPS[currentStep - 1].description}
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8 pt-2 space-y-6">
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="e.g., John Doe"
                      className="pl-9 h-10 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="name@example.com"
                      className="pl-9 h-10 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="pl-9 h-10 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="governmentIdType" className="text-sm">Government ID Type *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                      value={formData.governmentIdType}
                      onValueChange={(value) => handleInputChange("governmentIdType", value)}
                    >
                      <SelectTrigger className="pl-9 h-10 rounded-lg">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOVERNMENT_ID_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We use this to verify your identity for secure hosting.
                  </p>
                </div>
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={nextStep}
                    className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-5"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">Tell us about your space</h3>
                  <p className="text-sm text-muted-foreground">Provide the basics to help guests find your listing.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spaceName" className="text-sm">Space Name</Label>
                  <Input
                    id="spaceName"
                    value={formData.spaceName}
                    onChange={(e) => handleInputChange("spaceName", e.target.value)}
                    placeholder="e.g. Sunny Corner Office"
                    className="h-10 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter the full address"
                      className="pl-9 h-10 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">What type of space is it?</Label>
                  <Select value={formData.spaceType} onValueChange={(value) => handleInputChange("spaceType", value)}>
                    <SelectTrigger className="h-10 rounded-lg">
                      <SelectValue placeholder="Select a space type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPACE_TYPES.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Description</Label>
                    <span className="text-xs text-muted-foreground">Optional</span>
                  </div>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe what makes your space unique, amenities included, and nearby attractions..."
                    rows={4}
                    className="rounded-lg resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Space Photos</Label>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      RECOMMENDED
                    </span>
                  </div>
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center transition-colors hover:border-primary/40"
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-primary/50") }}
                    onDragLeave={(e) => { e.currentTarget.classList.remove("border-primary/50") }}
                    onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove("border-primary/50"); handlePhotosSelected(e.dataTransfer.files) }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Camera className="h-6 w-6 text-muted-foreground" />
                        <Plus className="h-4 w-4 text-muted-foreground absolute -bottom-0.5 -right-0.5" />
                      </div>
                      <p className="text-sm font-medium text-foreground">Drag and drop your photos here</p>
                      <p className="text-xs text-muted-foreground">
                        Upload at least 3 high-quality photos to make your listing stand out.
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        className="rounded-lg bg-primary hover:bg-primary/90 mt-1"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handlePhotosSelected(e.target.files)}
                    />
                    {photoPreviews.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {photoPreviews.map((url, index) => (
                          <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                            <img
                              src={url}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-0.5 right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-white text-xs hover:bg-black/80"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {photoPreviews.length < MAX_PHOTOS && (
                          <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors shrink-0"
                          >
                            <Plus className="h-6 w-6" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Set your rates */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    Set your rates
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="pricePerHour" className="text-sm">Price per Hour</Label>
                      <Input
                        id="pricePerHour"
                        type="text"
                        value={formData.pricePerHour}
                        onChange={(e) => handleInputChange("pricePerHour", e.target.value)}
                        placeholder="N 2,500"
                        className="h-10 rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground">Suggested: N2,000 - N3,500</p>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="pricePerDay" className="text-sm">Price per Day</Label>
                      <Input
                        id="pricePerDay"
                        type="text"
                        value={formData.pricePerDay}
                        onChange={(e) => handleInputChange("pricePerDay", e.target.value)}
                        placeholder="N 15,000"
                        className="h-10 rounded-lg"
                      />
                      <p className="text-xs text-muted-foreground">Suggested: N12,000 - N20,000</p>
                    </div>
                  </div>
                </div>

                {/* Amenities & Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    Amenities & Features
                  </div>
                  <div className="space-y-4">
                    {AMENITIES_GROUPED.map((group) => (
                      <div key={group.category}>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                          {group.category}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.items.map((item) => {
                            const checked = isGroupedAmenityChecked(item.id)
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleGroupedAmenityToggle(item.id)}
                                className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-colors ${
                                  checked
                                    ? "border-primary bg-primary/5"
                                    : "border-border bg-background hover:border-primary/50"
                                }`}
                              >
                                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                  checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                                }`}>
                                  {checked ? <Check className="h-3 w-3" /> : null}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium">{item.label}</p>
                                  <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compact: Capacity & Availability (optional) */}
                <details className="rounded-lg border border-border bg-muted/30">
                  <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-muted-foreground">
                    Additional details (capacity & availability)
                  </summary>
                  <div className="space-y-3 px-3 pb-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="capacity" className="text-xs">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => handleInputChange("capacity", e.target.value)}
                          placeholder="e.g., 10"
                          className="h-9 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Availability</Label>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABILITY_OPTIONS.map((option) => (
                          <label key={option} className="flex items-center gap-1.5 text-sm cursor-pointer">
                            <Checkbox
                              checked={formData.availability.includes(option)}
                              onCheckedChange={() => handleAvailabilityToggle(option)}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                    {formData.availability.includes("Specific Days") && (
                      <Textarea
                        value={formData.specificDays}
                        onChange={(e) => handleInputChange("specificDays", e.target.value)}
                        placeholder="e.g., Monday-Wednesday 9AM-5PM"
                        rows={2}
                        className="text-sm"
                      />
                    )}
                  </div>
                </details>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Government ID Upload *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a clear photo of your government-issued ID
                    </p>
                    {formData.governmentId ? (
                      <div className="space-y-2">
                        <p className="text-sm text-primary font-medium">{formData.governmentId.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFileUpload("governmentId", null)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleDocumentUpload("governmentId", e)}
                        />
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload ID
                          </span>
                        </Button>
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Business/Property Ownership Proof (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload utility bill, CAC document, or lease agreement
                    </p>
                    {formData.ownershipProof ? (
                      <div className="space-y-2">
                        <p className="text-sm text-primary font-medium">{formData.ownershipProof.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFileUpload("ownershipProof", null)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleDocumentUpload("ownershipProof", e)}
                        />
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Document
                          </span>
                        </Button>
                      </label>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Why do we need verification?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ensures the safety and security of our community</li>
                    <li>• Builds trust between hosts and guests</li>
                    <li>• Helps prevent fraud and unauthorized listings</li>
                    <li>• Required for payment processing and tax compliance</li>
                  </ul>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Review Your Information</h3>

                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Owner Information</h4>
                      <p>
                        <strong>Name:</strong> {formData.fullName}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {formData.phone}
                      </p>
                      {formData.companyName && (
                        <p>
                          <strong>Company:</strong> {formData.companyName}
                        </p>
                      )}
                      {formData.governmentIdType && (
                        <p>
                          <strong>ID Type:</strong>{" "}
                          {GOVERNMENT_ID_OPTIONS.find((o) => o.value === formData.governmentIdType)?.label ?? formData.governmentIdType}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Space Details</h4>
                      {formData.spaceName && (
                        <p>
                          <strong>Name:</strong> {formData.spaceName}
                        </p>
                      )}
                      <p>
                        <strong>Type:</strong> {formData.spaceType}
                      </p>
                      <p>
                        <strong>Location:</strong> {formData.location}
                      </p>
                      {formData.capacity && (
                        <p>
                          <strong>Capacity:</strong> {formData.capacity} people
                        </p>
                      )}
                      {(formData.pricePerHour || formData.pricePerDay) ? (
                        <>
                          {formData.pricePerHour && (
                            <p>
                              <strong>Price per hour:</strong> {formData.pricePerHour}
                            </p>
                          )}
                          {formData.pricePerDay && (
                            <p>
                              <strong>Price per day:</strong> {formData.pricePerDay}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          <strong>Price:</strong> ₦{formData.price} {formData.pricingModel?.toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>

                  {formData.amenities.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Selected Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Agreement</h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="confirmOwnership"
                        checked={formData.confirmOwnership}
                        onCheckedChange={(checked) => handleInputChange("confirmOwnership", checked)}
                      />
                      <Label htmlFor="confirmOwnership" className="text-sm leading-relaxed">
                        I confirm this space is owned/managed by me or my business and I have the authority to list it
                        on Spayce.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                        I agree to Spayce&apos;s
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>
                        including escrow payments, renter reviews, and dispute handling procedures.
                      </Label>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        </div>

        {currentStep > 1 && (
          <div className="mt-6">
            {mutation.isError && (
              <p className="text-sm text-destructive text-center mb-3">
                {(mutation.error as Error)?.message}
              </p>
            )}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-1.5 rounded-lg h-10"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <button
                type="button"
                onClick={saveDraft}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Save as draft
              </button>
              {currentStep < STEPS.length ? (
                <Button onClick={nextStep} className="rounded-lg h-10 bg-primary hover:bg-primary/90">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1.5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.confirmOwnership || !formData.agreeTerms || mutation.isPending}
                  className="rounded-lg h-10 bg-primary hover:bg-primary/90"
                >
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  Submit Space for Review
                </Button>
              )}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have a host account?{" "}
          <Link href="/signin" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  )
}