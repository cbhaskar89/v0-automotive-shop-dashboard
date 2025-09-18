"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Html } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, RotateCcw, ShoppingCart, Zap, Maximize2 } from "lucide-react"
import type { Part } from "@/lib/types"
import type * as THREE from "three"

interface EPC3DCatalogProps {
  onAdd: (part: Part, qty: number) => void
  onOpenCart?: () => void
}

const carParts = [
  {
    id: "brake-pad-001",
    partNumber: "BP-2024-001",
    description: "Front Brake Pad Set",
    price: 89.99,
    category: "Brakes",
    position: [-1.5, -0.5, 1.2],
    color: "#8B4513",
    moq: 1,
  },
  {
    id: "air-filter-002",
    partNumber: "AF-2024-002",
    description: "Engine Air Filter",
    price: 34.5,
    category: "Engine",
    position: [0, 0.3, 0.8],
    color: "#FFD700",
    moq: 1,
  },
  {
    id: "oil-filter-003",
    partNumber: "OF-2024-003",
    description: "Oil Filter Cartridge",
    price: 12.99,
    category: "Engine",
    position: [0.3, -0.2, 0.5],
    color: "#4169E1",
    moq: 2,
  },
  {
    id: "spark-plug-004",
    partNumber: "SP-2024-004",
    description: "Spark Plug Set (4pc)",
    price: 45.99,
    category: "Engine",
    position: [0, 0.5, 0.3],
    color: "#DC143C",
    moq: 1,
  },
  {
    id: "battery-005",
    partNumber: "BT-2024-005",
    description: "12V Battery",
    price: 129.99,
    category: "Electrical",
    position: [-0.8, 0.2, 0.8],
    color: "#2F4F4F",
    moq: 1,
  },
  {
    id: "headlight-006",
    partNumber: "HL-2024-006",
    description: "LED Headlight Assembly",
    price: 245.99,
    category: "Lighting",
    position: [-1.2, 0.2, 1.8],
    color: "#FFFFFF",
    moq: 1,
  },
  {
    id: "rear-brake-007",
    partNumber: "RB-2024-007",
    description: "Rear Brake Disc",
    price: 125.5,
    category: "Brakes",
    position: [1.5, -0.5, 1.2],
    color: "#696969",
    moq: 1,
  },
  {
    id: "taillight-008",
    partNumber: "TL-2024-008",
    description: "Rear Taillight LED",
    price: 89.99,
    category: "Lighting",
    position: [1.8, 0.2, 0.5],
    color: "#FF0000",
    moq: 1,
  },
]

// 3D Car Body Component
function CarBody() {
  return (
    <group>
      {/* Main car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 1.2, 1.5]} />
        <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car hood */}
      <mesh position={[-0.8, 0.6, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.4]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car roof */}
      <mesh position={[0.3, 0.8, 0]}>
        <boxGeometry args={[1.8, 0.1, 1.3]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[-1.9, -0.2, 0]}>
        <boxGeometry args={[0.3, 0.4, 1.3]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[1.9, -0.2, 0]}>
        <boxGeometry args={[0.3, 0.4, 1.3]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-1.2, -0.8, 1.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[-1.2, -0.8, -1.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.2, -0.8, 1.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[1.2, -0.8, -1.1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Windows */}
      <mesh position={[0.3, 0.7, 0]}>
        <boxGeometry args={[1.6, 0.05, 1.2]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// 3D Clickable Part Component
function ClickablePart({ part, isSelected, isHovered, onClick, onHover, onUnhover }: any) {
  const meshRef = React.useRef<THREE.Mesh>(null)

  return (
    <group position={part.position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick(part)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(part.id)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          onUnhover()
          document.body.style.cursor = "default"
        }}
      >
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial
          color={isSelected ? "#10b981" : isHovered ? "#3b82f6" : "#ef4444"}
          emissive={isSelected ? "#065f46" : isHovered ? "#1e40af" : "#7f1d1d"}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Part label */}
      {isHovered && (
        <Html position={[0, 0.3, 0]} center>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none">
            <div className="font-medium">{part.description}</div>
            <div className="text-gray-300">${part.price}</div>
          </div>
        </Html>
      )}

      {/* Pulsing ring for selected part */}
      {isSelected && (
        <mesh>
          <ringGeometry args={[0.2, 0.25]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  )
}

// Detailed 3D Part View Component
function DetailedPartView({ part }: { part: any }) {
  if (!part) return null

  return (
    <group position={[0, 2, 0]}>
      {/* Detailed part visualization based on category */}
      {part.category === "Brakes" && (
        <group>
          <mesh>
            <cylinderGeometry args={[0.8, 0.8, 0.2]} />
            <meshStandardMaterial color={part.color} metalness={0.8} roughness={0.3} />
          </mesh>
          <Text position={[0, -1.2, 0]} fontSize={0.2} color="#374151" anchorX="center" anchorY="middle">
            {part.description}
          </Text>
        </group>
      )}

      {part.category === "Engine" && (
        <group>
          <mesh>
            <boxGeometry args={[1, 0.6, 0.8]} />
            <meshStandardMaterial color={part.color} metalness={0.6} roughness={0.4} />
          </mesh>
          <Text position={[0, -1.2, 0]} fontSize={0.2} color="#374151" anchorX="center" anchorY="middle">
            {part.description}
          </Text>
        </group>
      )}

      {part.category === "Lighting" && (
        <group>
          <mesh>
            <sphereGeometry args={[0.5]} />
            <meshStandardMaterial color={part.color} emissive={part.color} emissiveIntensity={0.2} />
          </mesh>
          <Text position={[0, -1.2, 0]} fontSize={0.2} color="#374151" anchorX="center" anchorY="middle">
            {part.description}
          </Text>
        </group>
      )}

      {part.category === "Electrical" && (
        <group>
          <mesh>
            <boxGeometry args={[1.2, 0.8, 0.6]} />
            <meshStandardMaterial color={part.color} metalness={0.4} roughness={0.6} />
          </mesh>
          <Text position={[0, -1.2, 0]} fontSize={0.2} color="#374151" anchorX="center" anchorY="middle">
            {part.description}
          </Text>
        </group>
      )}
    </group>
  )
}

// Main 3D Scene Component
function Car3DScene({ parts, selectedPart, hoveredPart, onPartClick, onPartHover, onPartUnhover }: any) {
  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <CarBody />

      {parts.map((part: any) => (
        <ClickablePart
          key={part.id}
          part={part}
          isSelected={selectedPart?.id === part.id}
          isHovered={hoveredPart === part.id}
          onClick={onPartClick}
          onHover={onPartHover}
          onUnhover={onPartUnhover}
        />
      ))}

      <DetailedPartView part={selectedPart} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="studio" />
    </Canvas>
  )
}

export default function EPC3DCatalog({ onAdd, onOpenCart }: EPC3DCatalogProps) {
  const [selectedPart, setSelectedPart] = React.useState<any>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [quantity, setQuantity] = React.useState(1)
  const [justAdded, setJustAdded] = React.useState(false)
  const [hoveredPart, setHoveredPart] = React.useState<string | null>(null)

  const filteredParts = carParts.filter(
    (part) =>
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePartClick = (part: any) => {
    setSelectedPart(part)
    // Auto-add to cart when clicking on car part
    const partToAdd: Part = {
      partNumber: part.partNumber,
      description: part.description,
      price: part.price,
      category: part.category,
      moq: part.moq,
      weight: 1.0,
      uom: "EA",
    }
    onAdd(partToAdd, part.moq)

    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)

    if (onOpenCart) {
      setTimeout(() => onOpenCart(), 500)
    }
  }

  const handleAddToCart = () => {
    if (selectedPart) {
      const part: Part = {
        partNumber: selectedPart.partNumber,
        description: selectedPart.description,
        price: selectedPart.price,
        category: selectedPart.category,
        moq: selectedPart.moq,
        weight: 1.0,
        uom: "EA",
      }
      onAdd(part, quantity)
      setQuantity(1)

      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2000)

      if (onOpenCart) {
        setTimeout(() => onOpenCart(), 500)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
      <div className="lg:col-span-2 relative">
        <Card className="h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">3D Interactive Parts Catalog</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedPart(null)}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
                {onOpenCart && (
                  <Button variant="outline" size="sm" onClick={onOpenCart}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-[calc(100%-80px)]">
            <div className="relative w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg overflow-hidden">
              <Car3DScene
                parts={filteredParts}
                selectedPart={selectedPart}
                hoveredPart={hoveredPart}
                onPartClick={handlePartClick}
                onPartHover={setHoveredPart}
                onPartUnhover={() => setHoveredPart(null)}
              />
            </div>

            {/* Instructions Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-xs text-muted-foreground mb-2 font-medium">3D Controls</div>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Click red spheres to add parts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Hover for part details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Selected part (3D view above)</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">Drag to rotate • Scroll to zoom • Right-click to pan</div>
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
          </CardContent>
        </Card>
      </div>

      {/* Part Details & Controls */}
      <div className="space-y-4">
        {/* Search */}
        <Card>
          <CardContent className="pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selected Part Details */}
        {selectedPart ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Part Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold">{selectedPart.partNumber}</div>
                <div className="text-sm text-muted-foreground">{selectedPart.description}</div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedPart.category}</Badge>
                <div className="text-lg font-bold">${selectedPart.price}</div>
              </div>

              <div className="text-xs text-muted-foreground">MOQ: {selectedPart.moq} • UOM: EA • Weight: 1.0 kg</div>

              <div className="space-y-2">
                <Label htmlFor="qty">Quantity (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="qty"
                    type="number"
                    min={selectedPart.moq}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(selectedPart.moq, Number.parseInt(e.target.value) || 1))}
                    className="w-20"
                  />
                  <Button onClick={handleAddToCart} className="flex-1">
                    Add More to Cart
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Min order: {selectedPart.moq} • Click 3D parts for quick add
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-sm font-medium">3D Part Visualization</div>
                <div className="text-xs text-muted-foreground mt-1">
                  • Interactive 3D model shown above car • Rotate view to inspect • Real-time part highlighting
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-4 text-center text-muted-foreground">
              <div className="mb-2">
                <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
              </div>
              <div className="text-sm">Click on red spheres on the 3D car</div>
              <div className="text-xs mt-1">{filteredParts.length} parts available</div>
              <div className="text-xs mt-2 text-blue-600">Use mouse to rotate, zoom, and explore the 3D model</div>
            </CardContent>
          </Card>
        )}

        {/* EPC Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">3D EPC Integration</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>3D Rendering:</span>
                <Badge variant="outline" className="text-green-600">
                  Active
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Interactive Parts:</span>
                <span className="text-muted-foreground">{filteredParts.length} mapped</span>
              </div>
              <div className="flex justify-between">
                <span>Real-time 3D:</span>
                <span className="text-muted-foreground">WebGL Enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
