export type Part = {
  partNumber: string
  description: string
  category: string
  vehicleModel: string
  price: number
  discountPct: number
  uom: string
  moq: number
  weightKg: number
  supersededBy?: string
}

export type CartItem = {
  part: Part
  qty: number
}

export type Repairer = {
  id: string
  name: string
  city: string
  country: string
}

export type Invoice = {
  invoiceNumber: string
  orderId: string
  dueDate: string
  status: "Past Due" | "Due Soon" | "Open"
  amount: number
}

export type CreditMemo = {
  creditMemo: string
  invoiceNumber: string
  date: string
  amount: number
}

export type NotificationItem = {
  id: string
  title: string
  description: string
  type: "Recall" | "Campaign"
  partNumber: string
  vin?: string
  orderId: string
}

export type KPIs = {
  pendingOrders: number
  pastDueInvoices: number
  openReturns: number
  recallFlags: number
  backorders: number
  avgEtaDays: number
  aging: { "0-30": number; "31-60": number; "61+": number }
  alerts: { type: "info" | "warning"; title: string; detail: string }[]
}

export type Order = {
  orderId: string
  orderDate: string
  status: "Processing" | "Awaiting Shipment" | "Shipped" | "In Transit" | "Delivered" | "Backordered"
  totalAmount: number
  itemCount: number
  estimatedDelivery?: string
  trackingNumber?: string
  parts: {
    partNumber: string
    description: string
    quantity: number
    unitPrice: number
  }[]
}
