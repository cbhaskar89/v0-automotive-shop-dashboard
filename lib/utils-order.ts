import type { CartItem } from "./types"

export function calcCartTotals(items: CartItem[], shippingType: string) {
  const subtotalBeforeDiscount = items.reduce((sum, it) => sum + it.part.price * it.qty, 0)
  const discounts = items.reduce((sum, it) => sum + it.part.price * it.qty * (it.part.discountPct / 100), 0)
  const subtotal = subtotalBeforeDiscount - discounts
  const shipping = shippingType === "Expedite" ? 49 : 15
  const tax = Math.round((subtotal * 0.0825 + Number.EPSILON) * 100) / 100
  const total = subtotal + tax + shipping
  return { subtotal, discounts, shipping, tax, total }
}
