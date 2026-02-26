"use client"

import { useState } from "react"
import { toast } from "sonner"
import DashboardHeader from "@/components/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Check, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"

const settingTabs = [
  { value: "profile", label: "Profile" },
  { value: "payout", label: "Payout Details" },
  { value: "notifications", label: "Notifications" },
  { value: "security", label: "Security" },
  { value: "privacy", label: "Privacy" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <>
      <DashboardHeader
        title="Account Settings"
        showSearch={false}
      />
      <main className="flex-1 min-h-0 overflow-y-auto bg-[#F7F8FC]">
        <div className="p-4 sm:p-6 md:p-8 max-w-[1440px] mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 rounded-none gap-4 sm:gap-6 flex overflow-x-auto">
              {settingTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none px-0 pb-3 -mb-px bg-transparent"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <TabsContent value="profile" className="mt-0 space-y-6">
                  {/* Personal Information */}
                  <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            defaultValue="Alex"
                            className="h-11 border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            defaultValue="Johnson"
                            className="h-11 border-gray-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <Label
                          htmlFor="email"
                          className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="alex.johnson@spayce.ng"
                          readOnly
                          className="h-11 border-gray-200 bg-gray-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="bio"
                          className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          defaultValue="Superhost since 2019. Passionate about creating unique sustainable stays in Lagos. Love hiking and local coffee."
                          className="border-gray-200 resize-y min-h-[100px]"
                        />
                      </div>
                      <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm" onClick={() => toast.success("Profile updated successfully")}>
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Payout Details */}
                  <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                        Payout Details
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Choose how you want to receive your earnings.
                      </p>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">
                              Primary Bank Account
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              GTBank **** 4242
                            </p>
                            <button
                              type="button"
                              onClick={() => toast.info("Payout method update coming soon")}
                              className="text-sm font-medium text-primary mt-2 hover:underline"
                            >
                              Change payout method
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="bankName"
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Bank Name
                          </Label>
                          <Input
                            id="bankName"
                            defaultValue="GTBank"
                            className="h-11 border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="accountNumber"
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Account Number
                          </Label>
                          <Input
                            id="accountNumber"
                            type="password"
                            defaultValue="••••••••••"
                            className="h-11 border-gray-200"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payout" className="mt-0">
                  <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                        Payout Details
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Choose how you want to receive your earnings.
                      </p>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Primary Bank Account
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              GTBank **** 4242
                            </p>
                            <button
                              type="button"
                              onClick={() => toast.info("Payout method update coming soon")}
                              className="text-sm font-medium text-primary mt-2 hover:underline"
                            >
                              Change payout method
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-gray-900">
                        Notification Preferences
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Manage how you receive notifications about bookings and updates.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                  <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-gray-900">
                        Security
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Update your password and manage two-factor authentication.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="mt-0">
                  <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-gray-900">
                        Privacy
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Control your privacy and data sharing preferences.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              {/* Right Column - Sidebar Cards */}
              <div className="space-y-4">
                {/* Verification Status */}
                <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                  <CardContent className="p-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      Verification Status
                    </h3>
                    <ul className="space-y-3 mb-4">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-xs text-gray-700">
                          Email verified
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-xs text-gray-700">
                          Phone verified
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                        <span className="text-xs text-gray-500">
                          ID identification
                        </span>
                      </li>
                    </ul>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => toast.info("ID verification flow coming soon")}>
                      Complete ID Verification
                    </Button>
                  </CardContent>
                </Card>

                {/* Host Resources */}
                <Card className="bg-gray-900 border-0 shadow-sm rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90" />
                  <CardContent className="p-5 relative z-10">
                    <h3 className="text-base font-semibold text-white mb-1.5">
                      Host Resources
                    </h3>
                    <p className="text-xs text-gray-300 mb-4">
                      Learn how to maximize your earnings with our hosting guides.
                    </p>
                    <Link
                      href="/help"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Visit Help Center
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                {/* Deactivate Account */}
                <Card className="bg-white border-gray-100 shadow-sm rounded-lg">
                  <CardContent className="p-5">
                    <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                      Deactivate Account
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Temporarily hide your listings and disable your account.
                    </p>
                    <button
                      type="button"
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Deactivate my account...
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </>
  )
}
