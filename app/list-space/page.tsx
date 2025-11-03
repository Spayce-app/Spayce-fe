"use client"

import { useState } from "react"
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
import { Upload, Building, User, Camera, FileText, Shield, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

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
  "Private Office",
  "Desk/Co-working",
  "Conference/Meeting Room",
  "Training Hall",
  "Event Space",
  "Others",
]

const PRICING_MODELS = ["Hourly", "Daily", "Weekly", "Monthly"]

const AVAILABILITY_OPTIONS = ["Weekdays", "Weekends", "24/7", "Specific Days"]

export default function ListSpacePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Owner Info
    fullName: "",
    email: "",
    phone: "",
    companyName: "",

    // Space Details
    spaceType: "",
    location: "",
    capacity: "",
    amenities: [] as string[],
    photos: [] as File[],
    description: "",

    // Pricing & Availability
    pricingModel: "",
    price: "",
    availability: [] as string[],
    specificDays: "",

    // Verification
    governmentId: null as File | null,
    ownershipProof: null as File | null,

    // Agreement
    confirmOwnership: false,
    agreeTerms: false,
  })

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

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">spayce</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Help
              </Button>
              <Button variant="outline">Save Draft</Button>
            </div>
          </div> */}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">List Your Space</h1>
          <p className="text-lg text-muted-foreground">
            Join thousands of hosts earning money by sharing their workspace
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {STEPS.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step.id < currentStep
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

        {/* Form Content */}
        <Card>
          <CardHeader>
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
            {/* Step 1: Owner Info */}
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

            {/* Step 2: Space Details */}
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
                          <SelectItem key={type} value={type}>
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
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: JPG, PNG, WebP. Max 10MB per file.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing & Availability */}
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
                          <SelectItem key={model} value={model}>
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

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Government ID Upload *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a clear photo of your government-issued ID
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload ID
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Business/Property Ownership Proof (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload utility bill, CAC document, or lease agreement
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
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

            {/* Step 5: Agreement */}
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

          {currentStep < STEPS.length ? (
            <Button onClick={nextStep} className="flex items-center space-x-2 bg-primary hover:bg-primary/90">
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.confirmOwnership || !formData.agreeTerms}
              className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Space for Review</span>
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
