"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Search, Navigation, Clock, Star } from "lucide-react"

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [zipCode, setZipCode] = useState("")
  const [showChatbot, setShowChatbot] = useState(false)
  const [serviceCenters, setServiceCenters] = useState<any[]>([])
  const [showMap, setShowMap] = useState(false)

  const mockServiceCenters = [
    {
      id: 1,
      name: "Lucid Service Center - Beverly Hills",
      address: "9800 Wilshire Blvd, Beverly Hills, CA 90210",
      phone: "(310) 555-0123",
      distance: "2.3 miles",
      rating: 4.8,
      hours: "Mon-Sat: 8AM-6PM, Sun: 10AM-4PM",
      services: ["Service", "Parts", "Charging"],
      coordinates: { lat: 34.0669, lng: -118.4001 },
    },
    {
      id: 2,
      name: "Lucid Service Center - Santa Monica",
      address: "1234 Ocean Ave, Santa Monica, CA 90401",
      phone: "(310) 555-0456",
      distance: "5.7 miles",
      rating: 4.9,
      hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      services: ["Service", "Parts", "Body Shop"],
      coordinates: { lat: 34.0195, lng: -118.4912 },
    },
    {
      id: 3,
      name: "Lucid Service Center - Culver City",
      address: "5678 Jefferson Blvd, Culver City, CA 90232",
      phone: "(310) 555-0789",
      distance: "8.1 miles",
      rating: 4.7,
      hours: "Mon-Sat: 8AM-6PM, Sun: Closed",
      services: ["Service", "Charging", "Mobile Service"],
      coordinates: { lat: 34.0211, lng: -118.3965 },
    },
  ]

  const handleServiceCenterSearch = () => {
    if (zipCode.trim()) {
      setServiceCenters(mockServiceCenters)
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
    <div className="min-h-screen bg-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>

      <div className="relative z-10 min-h-screen">
        <div className="text-center py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl font-light text-white">We're Here to Help.</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Reach out to Lucid Customer Care or your nearest Authorized Repairer.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-white">Get in Touch</CardTitle>
                  <CardDescription className="text-slate-300">
                    Send us a message and we'll respond promptly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12 space-y-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900 rounded-full">
                        <CheckCircle className="h-10 w-10 text-green-400" />
                      </div>
                      <h3 className="text-2xl text-white">Message Sent Successfully!</h3>
                      <p className="text-slate-300">
                        Thank you for contacting us. We'll respond within 4 hours during business hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} className="bg-black hover:bg-slate-700 text-white">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-200">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-200">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-200">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiryType" className="text-slate-200">
                            Inquiry Type
                          </Label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) => handleInputChange("inquiryType", value)}
                          >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="sales" className="text-white hover:bg-slate-700">
                                Sales
                              </SelectItem>
                              <SelectItem value="service" className="text-white hover:bg-slate-700">
                                Service
                              </SelectItem>
                              <SelectItem value="technical" className="text-white hover:bg-slate-700">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="general" className="text-white hover:bg-slate-700">
                                General
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-slate-200">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
                          placeholder="How can we help you today?"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-black hover:bg-slate-700 text-white py-3">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="grid gap-6">
                <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-700 rounded-lg">
                        <Phone className="h-6 w-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">24/7 Support</h3>
                        <p className="text-slate-300">+1 (800) LUCID-01</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-700 rounded-lg">
                        <Mail className="h-6 w-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Email Support</h3>
                        <p className="text-slate-300">support@lucidmotors.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Find Service Centers</CardTitle>
                  <CardDescription className="text-slate-300">
                    Locate authorized Lucid service centers near you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter ZIP code or city"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      onKeyPress={(e) => e.key === "Enter" && handleServiceCenterSearch()}
                    />
                    <Button onClick={handleServiceCenterSearch} className="bg-slate-700 hover:bg-slate-600 text-white">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {showMap ? (
                    <div className="space-y-4">
                      <div className="h-64 bg-slate-700 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 opacity-90"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <MapPin className="h-12 w-12 text-blue-400 mx-auto animate-pulse" />
                            <p className="text-white font-medium">Service Centers Near {zipCode}</p>
                            <p className="text-slate-300 text-sm">
                              Interactive map with {serviceCenters.length} locations
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-16 left-20">
                          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                        </div>
                        <div className="absolute top-32 right-24">
                          <div
                            className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                        </div>
                        <div className="absolute bottom-20 left-1/2">
                          <div
                            className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {serviceCenters.map((center) => (
                          <Card
                            key={center.id}
                            className="bg-slate-700 border-slate-600 hover:bg-slate-650 transition-colors"
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-white text-sm">{center.name}</h4>
                                    <p className="text-slate-300 text-xs mt-1">{center.address}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                      <span className="text-white text-xs">{center.rating}</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">{center.distance}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs">
                                  <div className="flex items-center gap-1 text-slate-300">
                                    <Phone className="h-3 w-3" />
                                    <span>{center.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-slate-300">
                                    <Clock className="h-3 w-3" />
                                    <span>Open today</span>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  {center.services.map((service, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">
                                      {service}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex-1">
                                    <Navigation className="h-3 w-3 mr-1" />
                                    Directions
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-500 text-slate-300 hover:bg-slate-600 text-xs flex-1 bg-transparent"
                                  >
                                    Call Now
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-slate-700 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-8 w-8 text-slate-400 mx-auto" />
                        <p className="text-slate-400 text-sm">Enter ZIP code or city to find service centers</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowChatbot(!showChatbot)}
            className="bg-white text-black hover:bg-slate-100 shadow-lg rounded-full p-4"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {showChatbot && (
            <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-lg border p-4">
              <div className="text-center space-y-2">
                <h4 className="font-medium text-slate-800">Lucid Assistant</h4>
                <p className="text-sm text-slate-600">Need quick help? Chat with us.</p>
                <Button className="w-full bg-black hover:bg-slate-800 text-white">Start Chat</Button>
              </div>
            </div>
          )}
        </div>

        <footer className="bg-black border-t border-slate-700 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black font-bold text-sm">L</span>
                </div>
                <span className="text-white">Lucid Motors</span>
              </div>
              <div className="flex space-x-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
                <a href="#" className="hover:text-white">
                  Social
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
