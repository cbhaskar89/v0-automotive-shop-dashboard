"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Grid3X3, Car } from "lucide-react"
import type { Part } from "@/lib/types"

interface CarPartsCatalogProps {
  parts: Part[]
  onAdd: (part: Part, qty: number) => void
}

const carPartHotspots = [
  { partNumber: "LUC-1001-AX", position: { x: 15, y: 75 }, label: "Front Brakes" },
  { partNumber: "LUC-2007-BZ", position: { x: 45, y: 45 }, label: "Air Filter" },
  { partNumber: "LUC-3310-QF", position: { x: 35, y: 35 }, label: "Battery" },
  { partNumber: "LUC-5550-TR", position: { x: 20, y: 80 }, label: "Tire Sensor" },
  { partNumber: "LUC-4100-OC", position: { x: 40, y: 55 }, label: "Oil Filter" },
]

export default function CarPartsCatalog({ parts, onAdd }: CarPartsCatalogProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedPart, setSelectedPart] = React.useState<Part | null>(null)
  const [hoveredHotspot, setHoveredHotspot] = React.useState<string | null>(null)
  const [justAdded, setJustAdded] = React.useState<string | null>(null)

  const filteredParts = parts.filter(
    (part) =>
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleHotspotClick = (partNumber: string) => {
    const part = parts.find((p) => p.partNumber === partNumber)
    if (part) {
      setSelectedPart(part)
      onAdd(part, part.moq)

      setJustAdded(partNumber)
      setTimeout(() => setJustAdded(null), 2000)
    }
  }

  const getPartByNumber = (partNumber: string) => {
    return parts.find((p) => p.partNumber === partNumber)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Car Image with Hotspots */}
      <div className="lg:col-span-2">
        <Card className="h-[500px]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Interactive Car Parts
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search parts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-[calc(100%-80px)]">
            <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-gray-100 rounded-lg overflow-hidden">
              {/* Car Image */}
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Car parts diagram - click on highlighted areas to add parts to cart"
                className="w-full h-full object-contain"
              />

              {/* Clickable Hotspots */}
              {carPartHotspots
                .filter((hotspot) => {
                  const part = getPartByNumber(hotspot.partNumber)
                  return part && filteredParts.includes(part)
                })
                .map((hotspot) => {
                  const part = getPartByNumber(hotspot.partNumber)
                  if (!part) return null

                  return (
                    <button
                      key={hotspot.partNumber}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-125 ${
                        selectedPart?.partNumber === hotspot.partNumber
                          ? "bg-green-500 animate-pulse"
                          : hoveredHotspot === hotspot.partNumber
                            ? "bg-blue-500"
                            : justAdded === hotspot.partNumber
                              ? "bg-green-400"
                              : "bg-red-500"
                      }`}
                      style={{
                        left: `${hotspot.position.x}%`,
                        top: `${hotspot.position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => handleHotspotClick(hotspot.partNumber)}
                      onMouseEnter={() => setHoveredHotspot(hotspot.partNumber)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      title={`${part.partNumber} - ${part.description} - $${part.price}`}
                    >
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </button>
                  )
                })}

              {/* Hover Labels */}
              {hoveredHotspot && (
                <div
                  className="absolute bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none z-10"
                  style={{
                    left: `${carPartHotspots.find((h) => h.partNumber === hoveredHotspot)?.position.x}%`,
                    top: `${(carPartHotspots.find((h) => h.partNumber === hoveredHotspot)?.position.y || 0) - 8}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {(() => {
                    const part = getPartByNumber(hoveredHotspot)
                    return part ? (
                      <>
                        <div>{part.description}</div>
                        <div className="text-xs text-gray-300">
                          ${part.price} • MOQ: {part.moq}
                        </div>
                      </>
                    ) : null
                  })()}
                </div>
              )}

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs font-medium mb-2">Click to Add Parts</div>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Available parts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Added to cart</span>
                  </div>
                </div>
              </div>

              {/* Success Notification */}
              {justAdded && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm font-medium">Added to cart!</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part Details Panel */}
      <div className="space-y-4">
        {selectedPart ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selected Part</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold">{selectedPart.partNumber}</div>
                <div className="text-sm text-muted-foreground">{selectedPart.description}</div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedPart.category}</Badge>
                <div className="text-lg font-bold">
                  $
                  {selectedPart.discountPct > 0
                    ? (selectedPart.price * (1 - selectedPart.discountPct / 100)).toFixed(2)
                    : selectedPart.price.toFixed(2)}
                </div>
                {selectedPart.discountPct > 0 && (
                  <Badge variant="outline" className="text-green-600">
                    {selectedPart.discountPct}% off
                  </Badge>
                )}
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <div>Vehicle: {selectedPart.vehicleModel}</div>
                <div>
                  MOQ: {selectedPart.moq} • UOM: {selectedPart.uom}
                </div>
                <div>Weight: {selectedPart.weightKg}kg</div>
                {selectedPart.supersededBy && (
                  <div className="text-orange-600">Superseded by: {selectedPart.supersededBy}</div>
                )}
              </div>

              <Button onClick={() => handleHotspotClick(selectedPart.partNumber)} className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add Another to Cart
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <Grid3X3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">Click on car parts to add to cart</div>
              <div className="text-xs mt-1">{filteredParts.length} parts available</div>
            </CardContent>
          </Card>
        )}

        {/* Available Parts List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Available Parts</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredParts.slice(0, 10).map((part) => (
                <div
                  key={part.partNumber}
                  className="flex items-center justify-between p-2 rounded-lg border cursor-pointer hover:bg-muted/50"
                  onClick={() => handleHotspotClick(part.partNumber)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{part.partNumber}</div>
                    <div className="text-xs text-muted-foreground truncate">{part.description}</div>
                  </div>
                  <div className="text-xs font-medium">${part.price}</div>
                </div>
              ))}
              {filteredParts.length > 10 && (
                <div className="text-xs text-muted-foreground text-center py-2">
                  +{filteredParts.length - 10} more parts...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
