"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  MessageCircle,
  Search,
  Building2,
  Navigation,
  Clock,
  Star,
} from "lucide-react"

export default function ImporterContactUsPage() {
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
  const [distributionCenters, setDistributionCenters] = useState<any[]>([])
  const [showMap, setShowMap] = useState(false)

  const mockDistributionCenters = [
    {
      id: 1,
      name: "Lucid Distribution Center - Amsterdam",
      address: "Havenstraat 123, 1012 AB Amsterdam, Netherlands",
      phone: "+31 20 555-0123",
      distance: "15 km",
      rating: 4.9,
      hours: "Mon-Fri: 7AM-6PM, Sat: 8AM-4PM",
      services: ["Vehicle Distribution", "Parts Warehouse", "Logistics Hub"],
      coordinates: { lat: 52.3676, lng: 4.9041 },
    },
    {
      id: 2,
      name: "Lucid Distribution Center - Rotterdam",
      address: "Industrieweg 456, 3045 CD Rotterdam, Netherlands",
      phone: "+31 10 555-0456",
      distance: "45 km",
      rating: 4.8,
      hours: "Mon-Fri: 6AM-7PM, Sat: 7AM-5PM",
      services: ["Port Operations", "Vehicle Processing", "Export Hub"],
      coordinates: { lat: 51.9244, lng: 4.4777 },
    },
    {
      id: 3,
      name: "Lucid Distribution Center - Hamburg",
      address: "Hafenstraße 789, 20459 Hamburg, Germany",
      phone: "+49 40 555-0789",
      distance: "280 km",
      rating: 4.7,
      hours: "Mon-Fri: 7AM-6PM, Sat: 8AM-3PM",
      services: ["Regional Distribution", "Quality Control", "Customs Processing"],
      coordinates: { lat: 53.5511, lng: 9.9937 },
    },
  ]

  const handleDistributionCenterSearch = () => {
    if (zipCode.trim()) {
      setDistributionCenters(mockDistributionCenters)
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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-silver-400 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-slate-400 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="text-center py-20 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-6xl font-light text-white tracking-tight">We're Here to Help.</h1>
            <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
              Reach out to Lucid Customer Care or your nearest Authorized Repairer.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-light text-white">Importer Support</CardTitle>
                  <CardDescription className="text-slate-300">
                    Specialized assistance for wholesale operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12 space-y-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full">
                        <CheckCircle className="h-10 w-10 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-light text-white">Priority Request Submitted!</h3>
                      <p className="text-slate-300">
                        Your importer support request has been received. Priority response within 2 hours.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-black hover:bg-slate-800 text-white border border-white/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-200 font-light">
                            Contact Name
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-white/5 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400 focus:bg-white/10 transition-all duration-300 rounded-lg"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-200 font-light">
                            Business Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-white/5 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400 focus:bg-white/10 transition-all duration-300 rounded-lg"
                            placeholder="business@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-200 font-light">
                            Business Phone
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-white/5 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400 focus:bg-white/10 transition-all duration-300 rounded-lg"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiryType" className="text-slate-200 font-light">
                            Request Type
                          </Label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) => handleInputChange("inquiryType", value)}
                          >
                            <SelectTrigger className="bg-white/5 border-slate-600 text-white focus:border-slate-400 focus:bg-white/10 transition-all duration-300 rounded-lg">
                              <SelectValue placeholder="Select request type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              <SelectItem value="wholesale" className="text-white hover:bg-slate-700">
                                Wholesale Orders
                              </SelectItem>
                              <SelectItem value="logistics" className="text-white hover:bg-slate-700">
                                Vehicle Logistics
                              </SelectItem>
                              <SelectItem value="registration" className="text-white hover:bg-slate-700">
                                Registration Support
                              </SelectItem>
                              <SelectItem value="compliance" className="text-white hover:bg-slate-700">
                                Compliance Issue
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-slate-200 font-light">
                          Detailed Request
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="bg-white/5 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400 focus:bg-white/10 transition-all duration-300 rounded-lg min-h-[120px]"
                          placeholder="Please provide detailed information about your wholesale or distribution inquiry..."
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-black hover:bg-slate-800 text-white border border-white/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 py-3 rounded-lg"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Priority Request
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="grid gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <Phone className="h-6 w-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Importer Hotline</h3>
                        <p className="text-slate-300">+1 (800) LUCID-IMP</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <Mail className="h-6 w-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Wholesale Support</h3>
                        <p className="text-slate-300">wholesale@lucidmotors.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                        <Building2 className="h-6 w-6 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Distribution Center</h3>
                        <p className="text-slate-300">Amsterdam, Netherlands</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-white">Distribution Centers</CardTitle>
                  <CardDescription className="text-slate-300">Locate Lucid distribution hubs worldwide</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter region or country"
                      className="bg-white/5 border-slate-600 text-white placeholder:text-slate-400 focus:border-slate-400 focus:bg-white/10 transition-all duration-300 rounded-lg"
                      onKeyPress={(e) => e.key === "Enter" && handleDistributionCenterSearch()}
                    />
                    <Button
                      onClick={handleDistributionCenterSearch}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {showMap ? (
                    <div className="space-y-4">
                      <div className="h-64 bg-slate-800/50 rounded-lg border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-900/50 opacity-90"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <MapPin className="h-12 w-12 text-blue-400 mx-auto animate-pulse" />
                            <p className="text-white font-medium">Distribution Centers Near {zipCode}</p>
                            <p className="text-slate-300 text-sm">
                              Interactive map with {distributionCenters.length} locations
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-16 left-20">
                          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                        </div>
                        <div className="absolute top-32 right-24">
                          <div
                            className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                        </div>
                        <div className="absolute bottom-20 left-1/2">
                          <div
                            className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"
                            style={{ animationDelay: "1s" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {distributionCenters.map((center) => (
                          <Card
                            key={center.id}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
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
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-white/10 text-slate-200 text-xs rounded border border-white/20"
                                    >
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
                                    className="border-white/20 text-slate-300 hover:bg-white/10 text-xs flex-1 bg-transparent"
                                  >
                                    Contact Hub
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-48 bg-slate-800/50 rounded-lg border border-white/10 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-8 w-8 text-slate-400 mx-auto" />
                        <p className="text-slate-400 text-sm">Enter region or country to find distribution centers</p>
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
            className="bg-white text-black hover:bg-slate-100 shadow-2xl rounded-full p-4 transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {showChatbot && (
            <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-bottom-2">
              <div className="text-center space-y-2">
                <h4 className="font-medium text-slate-800">Lucid Assistant</h4>
                <p className="text-sm text-slate-600">Need quick help? Chat with us.</p>
                <Button className="w-full bg-black hover:bg-slate-800 text-white">Start Chat</Button>
              </div>
            </div>
          )}
        </div>

        <footer className="bg-black border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black font-bold text-sm">L</span>
                </div>
                <span className="text-white font-light">Lucid Motors</span>
              </div>
              <div className="flex space-x-6 text-sm text-slate-400">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
                <a href="#" className="hover:text-white transition-colors">
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
