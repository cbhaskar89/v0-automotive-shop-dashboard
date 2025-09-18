"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Clock, Send, CheckCircle, Users, MapPin, Search, Navigation, Star } from "lucide-react"

export default function AgentContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    priority: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [zipCode, setZipCode] = useState("")
  const [deliveryCenters, setDeliveryCenters] = useState<any[]>([])
  const [showMap, setShowMap] = useState(false)

  const mockDeliveryCenters = [
    {
      id: 1,
      name: "Lucid Delivery Center - Beverly Hills",
      address: "9800 Wilshire Blvd, Beverly Hills, CA 90210",
      phone: "(310) 555-0123",
      distance: "2.3 miles",
      rating: 4.8,
      hours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM",
      services: ["Customer Delivery", "Test Drives", "Sales Support"],
      coordinates: { lat: 34.0669, lng: -118.4001 },
    },
    {
      id: 2,
      name: "Lucid Delivery Center - Manhattan Beach",
      address: "1234 Sepulveda Blvd, Manhattan Beach, CA 90266",
      phone: "(310) 555-0456",
      distance: "5.7 miles",
      rating: 4.9,
      hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-6PM",
      services: ["Customer Delivery", "Agent Training", "Demo Vehicles"],
      coordinates: { lat: 33.8847, lng: -118.4109 },
    },
    {
      id: 3,
      name: "Lucid Delivery Center - Pasadena",
      address: "5678 Colorado Blvd, Pasadena, CA 91101",
      phone: "(626) 555-0789",
      distance: "8.1 miles",
      rating: 4.7,
      hours: "Mon-Sat: 9AM-7PM, Sun: 11AM-4PM",
      services: ["Customer Delivery", "Sales Events", "Agent Support"],
      coordinates: { lat: 34.1478, lng: -118.1445 },
    },
  ]

  const handleDeliveryCenterSearch = () => {
    if (zipCode.trim()) {
      setDeliveryCenters(mockDeliveryCenters)
      setShowMap(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Lucid Motors Agent Support</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Sales Agent Support
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive support for sales agents with specialized assistance for customer delivery, lead management,
            and retail operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Agent Support</CardTitle>
                <CardDescription>Dedicated support for sales professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Phone className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Sales Support Line</h3>
                    <p className="text-slate-600">+1 (800) LUCID-SALES</p>
                    <p className="text-sm text-slate-500">Direct Agent Support</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Mail className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Agent Support</h3>
                    <p className="text-slate-600">agents@lucidmotors.com</p>
                    <p className="text-sm text-slate-500">Response within 1 hour</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Users className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Sales Operations</h3>
                    <p className="text-slate-600">Customer Delivery Network</p>
                    <p className="text-slate-600">Regional Support Centers</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Clock className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Agent Hours</h3>
                    <p className="text-slate-600">Mon - Sat: 7:00 AM - 9:00 PM</p>
                    <p className="text-slate-600">Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Categories */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Agent Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="w-full justify-start p-3">
                  Lead Management
                </Badge>
                <Badge variant="outline" className="w-full justify-start p-3">
                  Customer Delivery
                </Badge>
                <Badge variant="outline" className="w-full justify-start p-3">
                  Incentive Programs
                </Badge>
                <Badge variant="outline" className="w-full justify-start p-3">
                  Sales Training
                </Badge>
                <Badge variant="outline" className="w-full justify-start p-3">
                  Commission Support
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Delivery Centers</CardTitle>
                <CardDescription>Find customer delivery locations near you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP code or city"
                    className="border-slate-200 focus:border-slate-400"
                    onKeyPress={(e) => e.key === "Enter" && handleDeliveryCenterSearch()}
                  />
                  <Button onClick={handleDeliveryCenterSearch} className="bg-slate-700 hover:bg-slate-600">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {showMap ? (
                  <div className="space-y-4">
                    <div className="h-48 bg-slate-100 rounded-lg relative overflow-hidden border">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 opacity-90"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <MapPin className="h-8 w-8 text-slate-600 mx-auto animate-pulse" />
                          <p className="text-slate-700 font-medium">Delivery Centers Near {zipCode}</p>
                          <p className="text-slate-500 text-sm">
                            Interactive map with {deliveryCenters.length} locations
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-12 left-16">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                      </div>
                      <div className="absolute top-24 right-20">
                        <div
                          className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                      <div className="absolute bottom-16 left-1/2">
                        <div
                          className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {deliveryCenters.map((center) => (
                        <Card
                          key={center.id}
                          className="border border-slate-200 hover:border-slate-300 transition-colors"
                        >
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-slate-800 text-sm">{center.name}</h4>
                                  <p className="text-slate-600 text-xs mt-1">{center.address}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                    <span className="text-slate-700 text-xs">{center.rating}</span>
                                  </div>
                                  <p className="text-slate-500 text-xs">{center.distance}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1 text-slate-600">
                                  <Phone className="h-3 w-3" />
                                  <span>{center.phone}</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-600">
                                  <Clock className="h-3 w-3" />
                                  <span>Open today</span>
                                </div>
                              </div>

                              <div className="flex gap-1">
                                {center.services.map((service, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                                    {service}
                                  </span>
                                ))}
                              </div>

                              <div className="flex gap-2 pt-1">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex-1">
                                  <Navigation className="h-3 w-3 mr-1" />
                                  Directions
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-300 text-slate-600 hover:bg-slate-50 text-xs flex-1 bg-transparent"
                                >
                                  Call Center
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-32 bg-slate-100 rounded-lg border flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="h-6 w-6 text-slate-400 mx-auto" />
                      <p className="text-slate-500 text-sm">Enter ZIP code to find delivery centers</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">Agent Support Request</CardTitle>
                <CardDescription>
                  Get immediate assistance with sales operations, customer delivery, and agent resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">Agent Request Submitted!</h3>
                    <p className="text-slate-600">
                      Your support request has been received. Our agent support team will respond within 1 hour.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} className="bg-slate-800 hover:bg-slate-700">
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700">
                          Agent Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="border-slate-200 focus:border-slate-400"
                          placeholder="Enter your agent name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">
                          Agent Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="border-slate-200 focus:border-slate-400"
                          placeholder="Enter your agent email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700">
                          Direct Phone
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="border-slate-200 focus:border-slate-400"
                          placeholder="Enter your direct phone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority" className="text-slate-700">
                          Support Category *
                        </Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => handleInputChange("priority", value)}
                        >
                          <SelectTrigger className="border-slate-200 focus:border-slate-400">
                            <SelectValue placeholder="Select support category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="leads">Lead Management</SelectItem>
                            <SelectItem value="delivery">Customer Delivery</SelectItem>
                            <SelectItem value="incentives">Incentives & Programs</SelectItem>
                            <SelectItem value="training">Sales Training</SelectItem>
                            <SelectItem value="urgent">Urgent - Customer Issue</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-700">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="border-slate-200 focus:border-slate-400"
                        placeholder="Brief description of your support need"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700">
                        Support Details *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="border-slate-200 focus:border-slate-400 min-h-[120px]"
                        placeholder="Please provide detailed information about your sales support request..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white py-3"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Agent Request
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
