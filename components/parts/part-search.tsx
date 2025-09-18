"use client"

import * as React from "react"
import { Search, Filter, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { Part } from "@/lib/types"

type Props = {
  parts: Part[]
  onAdd: (part: Part, qty: number) => void
}

export default function PartSearch({ parts, onAdd }: Props) {
  const [q, setQ] = React.useState("")
  const [category, setCategory] = React.useState<string>("all")
  const [vehicle, setVehicle] = React.useState<string>("all")
  const [qtyMap, setQtyMap] = React.useState<Record<string, number>>({})

  const getValidMOQQuantity = (qty: number, moq: number) => {
    if (qty <= 0) return moq
    return Math.ceil(qty / moq) * moq
  }

  const getMOQSuggestions = (currentQty: number, moq: number) => {
    const validQty = getValidMOQQuantity(currentQty, moq)
    const prevMultiple = Math.max(moq, validQty - moq)
    const nextMultiple = validQty + moq

    if (validQty === currentQty) return []

    return [
      { qty: prevMultiple, label: `${prevMultiple} (${prevMultiple / moq}x MOQ)` },
      { qty: validQty, label: `${validQty} (${validQty / moq}x MOQ)` },
    ]
  }

  const categories = Array.from(new Set(parts.map((p) => p.category))).sort()
  const vehicles = Array.from(new Set(parts.map((p) => p.vehicleModel))).sort()

  const filtered = parts.filter((p) => {
    const qMatch =
      p.partNumber.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase())
    const cat = category === "all" || p.category === category
    const veh = vehicle === "all" || p.vehicleModel === vehicle
    return qMatch && cat && veh
  })

  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="relative md:col-span-2">
          <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Search part number, description..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-8"
            aria-label="Search parts"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger aria-label="Filter by category">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={vehicle} onValueChange={setVehicle}>
          <SelectTrigger aria-label="Filter by vehicle">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicles</SelectItem>
            {vehicles.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[360px] rounded-md border">
        <div className="p-3 grid gap-3">
          {filtered.map((p) => {
            const currentQty = qtyMap[p.partNumber] ?? p.moq
            const isValidMOQ = currentQty % p.moq === 0
            const suggestions = getMOQSuggestions(currentQty, p.moq)

            return (
              <Card key={p.partNumber} className="border-muted">
                <CardContent className="p-3">
                  <div className="flex flex-col md:flex-row gap-3 md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{p.partNumber}</div>
                        {p.supersededBy && (
                          <Badge variant="outline" className="text-xs">
                            Superseded → {p.supersededBy}
                          </Badge>
                        )}
                        {p.discountPct > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {p.discountPct}% off
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{p.description}</div>
                      <div className="text-xs text-muted-foreground">
                        Model: {p.vehicleModel} • UOM: {p.uom} • MOQ: {p.moq} • Weight: {p.weightKg}kg
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 md:items-end">
                      <div className="text-center md:text-left">
                        <div className="text-sm">Unit Price</div>
                        <div className="font-semibold">${p.price.toFixed(2)}</div>
                        {p.discountPct > 0 && (
                          <div className="text-xs text-muted-foreground">
                            After discount: ${(p.price * (1 - p.discountPct / 100)).toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-shrink-0">
                          <label className="text-xs text-muted-foreground block mb-1" htmlFor={`qty-${p.partNumber}`}>
                            Quantity
                          </label>
                          <Input
                            id={`qty-${p.partNumber}`}
                            type="number"
                            min={p.moq}
                            step={p.moq}
                            value={currentQty}
                            onChange={(e) => {
                              const newQty = Number(e.target.value) || p.moq
                              setQtyMap((m) => ({
                                ...m,
                                [p.partNumber]: Math.max(p.moq, newQty),
                              }))
                            }}
                            className={`w-20 ${!isValidMOQ ? "border-orange-500 focus:border-orange-500" : ""}`}
                          />
                          <div className="text-[10px] text-muted-foreground mt-1">MOQ: {p.moq}</div>

                          {!isValidMOQ && suggestions.length > 0 && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                              <div className="text-orange-700 font-medium mb-1">Must order in multiples of {p.moq}</div>
                              <div className="space-y-1">
                                {suggestions.map((suggestion) => (
                                  <button
                                    key={suggestion.qty}
                                    onClick={() => setQtyMap((m) => ({ ...m, [p.partNumber]: suggestion.qty }))}
                                    className="block w-full text-left px-2 py-1 bg-white border border-orange-300 rounded hover:bg-orange-100 transition-colors"
                                  >
                                    {suggestion.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0 pb-4">
                          <Button
                            onClick={() => {
                              const validQty = getValidMOQQuantity(currentQty, p.moq)
                              onAdd(p, validQty)
                            }}
                            size="default"
                            disabled={!isValidMOQ}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-sm text-muted-foreground px-1 py-6">No parts match your filters.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
