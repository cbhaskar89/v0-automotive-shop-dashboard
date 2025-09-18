"use client"

import * as React from "react"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type { CartItem } from "@/lib/types"
import { calcCartTotals } from "@/lib/utils-order"

type Props = {
  items: CartItem[]
  onRemove: (partNumber: string) => void
  onUpdateQty: (partNumber: string, qty: number) => void
  onCheckout: (payload: {
    items: CartItem[]
    paymentType: string
    shippingType: string
    vin?: string
  }) => Promise<void>
  vin?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function CartModal({ items, onRemove, onUpdateQty, onCheckout, vin, open, onOpenChange }: Props) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [paymentType, setPaymentType] = React.useState("Customer Pay")
  const [shippingType, setShippingType] = React.useState("Ground")
  const totals = calcCartTotals(items, shippingType)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart ({items.length})
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="space-y-2 pb-4 shrink-0">
          <DialogTitle className="text-xl font-semibold">Shopping Cart</DialogTitle>
          {items.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""} in cart
            </p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 pb-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground/70">Add parts to get started</p>
            </div>
          ) : (
            items.map((it) => (
              <Card key={it.part.partNumber} className="border border-border/50 hover:border-border transition-colors">
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight break-words">{it.part.partNumber}</h4>
                        <p className="text-xs text-muted-foreground mt-1 break-words leading-relaxed">
                          {it.part.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(it.part.partNumber)}
                        className="shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground">Qty:</Label>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-transparent"
                            onClick={() => onUpdateQty(it.part.partNumber, Math.max(it.part.moq, it.qty - 1))}
                            disabled={it.qty <= it.part.moq}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            min={it.part.moq}
                            value={it.qty}
                            onChange={(e) =>
                              onUpdateQty(
                                it.part.partNumber,
                                Math.max(it.part.moq, Number(e.target.value) || it.part.moq),
                              )
                            }
                            className="h-7 w-16 text-center text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-transparent"
                            onClick={() => onUpdateQty(it.part.partNumber, it.qty + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${(it.qty * it.part.price * (1 - it.part.discountPct / 100)).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${(it.part.price * (1 - it.part.discountPct / 100)).toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="space-y-4 border-t border-border pt-4 shrink-0 bg-background">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Payment Method</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer Pay">Customer Pay</SelectItem>
                      <SelectItem value="Warranty">Warranty</SelectItem>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="Car Company Wallet">Car Company Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Shipping Method</Label>
                  <Select value={shippingType} onValueChange={setShippingType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ground">Ground Shipping</SelectItem>
                      <SelectItem value="Expedite">Expedited Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {vin && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">VIN Tagged</p>
                  <p className="text-sm font-mono">{vin}</p>
                </div>
              )}

              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discounts</span>
                    <span className="text-accent font-medium">-${totals.discounts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-medium">${totals.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span className="font-medium">${totals.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DialogFooter className="pt-4 shrink-0">
              <Button
                className="w-full h-12 text-base font-medium"
                onClick={async () => {
                  await onCheckout({
                    items,
                    paymentType,
                    shippingType,
                    vin,
                  })
                  setIsOpen(false)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Place Order • ${totals.total.toFixed(2)}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
