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
import { Upload, Building, User, Camera, FileText, Shield, CheckCircle, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useMutation } from "@tanstack/react-query"
import { listSpaces } from "@/lib/api"
import { toast } from "sonner"

const STEPS = [
  { id: 1, title: "Owner Info", description: "Tell us about yourself" },
  { id: 2, title: "Space Details", description: "Describe your space" },
  { id: 3, title: "Pricing & Availability", description: "Set your rates" },
  { id: 4, title: "Verification", description: "Verify your identity" },
  { id: 5, title: "Agreement", description: "Review and submit" },
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
    companyName: "",
    spaceType: "",
    location: "",
    capacity: "",
    amenities: [] as string[],
    images: [] as File[],
    description: "",
    pricingModel: "",
    price: "",
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
    payload.append("companyName", formData.companyName)
    payload.append("spaceType", formData.spaceType)
    payload.append("location", formData.location)
    payload.append("capacity", formData.capacity)
    payload.append("description", formData.description)
    payload.append("pricingModel", formData.pricingModel)
    payload.append("price", formData.price)
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">List Your Space</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hosts across Nigeria earning by sharing their workspace. Simple process, transparent earnings.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between mb-8">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-sm transition-all ${step.id < currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}
              >
                {step.id < currentStep ? <CheckCircle className="h-5 w-5" /> : step.id}
              </div>
              <div className="text-center mt-2">
                <div className="text-sm font-medium text-foreground">{step.title}</div>
                <div className="text-xs text-muted-foreground hidden sm:block">{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        <Card className="border border-transparent shadow-soft">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-2">
              {currentStep === 1 && <User className="h-5 w-5" />}
              {currentStep === 2 && <Building className="h-5 w-5" />}
              {currentStep === 3 && <Badge className="h-5 w-5" />}
              {currentStep === 4 && <Shield className="h-5 w-5" />}
              {currentStep === 5 && <CheckCircle className="h-5 w-5" />}
              <span>{STEPS[currentStep - 1].title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (WhatsApp preferred) *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company/Business Name (Optional)</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="spaceType">Type of Space *</Label>
                    <Select value={formData.spaceType} onValueChange={(value) => handleInputChange("spaceType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select space type" />
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
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange("capacity", e.target.value)}
                      placeholder="e.g., 10 people"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Address *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Full address with city and area"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your space, its unique features, and what makes it special..."
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Amenities Available</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {AMENITIES.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityToggle(amenity)}
                        />
                        <Label htmlFor={amenity} className="text-sm">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Photos of the Space *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Upload high-quality photos of your space</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.images.length ? "Add More Photos" : "Choose Files"}
                    </Button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => handlePhotosSelected(event.target.files)}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: JPG, PNG, WebP. Max 10MB per file. Up to {MAX_PHOTOS} photos.
                    </p>
                    {photoPreviews.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {photoPreviews.map((url, index) => (
                          <div key={url} className="relative group">
                            <img
                              src={url}
                              alt={`workspace photo ${index + 1}`}
                              className="h-32 w-full rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove photo</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pricingModel">Pricing Model *</Label>
                    <Select
                      value={formData.pricingModel}
                      onValueChange={(value) => handleInputChange("pricingModel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pricing model" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRICING_MODELS.map((model) => (
                          <SelectItem key={model} value={model.toLowerCase()}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₦) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="Enter your price"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Availability *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.availability.includes(option)}
                          onCheckedChange={() => handleAvailabilityToggle(option)}
                        />
                        <Label htmlFor={option} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.availability.includes("Specific Days") && (
                  <div className="space-y-2">
                    <Label htmlFor="specificDays">Specify Days/Times</Label>
                    <Textarea
                      id="specificDays"
                      value={formData.specificDays}
                      onChange={(e) => handleInputChange("specificDays", e.target.value)}
                      placeholder="e.g., Monday-Wednesday 9AM-5PM, Saturday 10AM-2PM"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Government ID Upload *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
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
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
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
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Space Details</h4>
                      <p>
                        <strong>Type:</strong> {formData.spaceType}
                      </p>
                      <p>
                        <strong>Location:</strong> {formData.location}
                      </p>
                      <p>
                        <strong>Capacity:</strong> {formData.capacity} people
                      </p>
                      <p>
                        <strong>Price:</strong> ₦{formData.price} {formData.pricingModel?.toLowerCase()}
                      </p>
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
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          {
            mutation.isError && (
              <p className="text-sm text-red-400  text-center">
                {
                  mutation.error.message
                }
              </p>
            )
          }

          {currentStep < STEPS.length ? (
            <Button onClick={nextStep} className="flex items-center space-x-2 bg-primary hover:bg-primary/90">
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.confirmOwnership || !formData.agreeTerms || mutation.isPending}
              className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Space for Review</span>
              {

              }
            </Button>
          )}

        </div>
      </div>
      <Footer />
    </div>
  )
}