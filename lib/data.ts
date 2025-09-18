import type { Part, Invoice, CreditMemo, NotificationItem, Repairer, KPIs, Order } from "./types"

export function getMockPartsCatalog(): Part[] {
  return [
    {
      partNumber: "LUC-1001-AX",
      description: "Brake Pad Set Front",
      category: "Brakes",
      vehicleModel: "Air Pure",
      price: 180,
      discountPct: 0,
      uom: "EA",
      moq: 1,
      weightKg: 2.1,
    },
    {
      partNumber: "BRK-PAD-001",
      description: "High Performance Brake Pad Set (Bulk)",
      category: "Brakes",
      vehicleModel: "Air Sapphire",
      price: 25,
      discountPct: 15,
      uom: "EA",
      moq: 50,
      weightKg: 0.8,
    },
    {
      partNumber: "LUC-2007-BZ",
      description: "Cabin Air Filter",
      category: "Filters",
      vehicleModel: "Air Touring",
      price: 42,
      discountPct: 10,
      uom: "EA",
      moq: 1,
      weightKg: 0.2,
      supersededBy: "LUC-2007-BZ-REV2",
    },
    {
      partNumber: "LUC-3310-QF",
      description: "12V Auxiliary Battery",
      category: "Electrical",
      vehicleModel: "Air Grand Touring",
      price: 350,
      discountPct: 0,
      uom: "EA",
      moq: 1,
      weightKg: 9.5,
    },
    {
      partNumber: "LUC-5550-TR",
      description: "Tire Pressure Sensor",
      category: "Sensors",
      vehicleModel: "Air Sapphire",
      price: 95,
      discountPct: 5,
      uom: "EA",
      moq: 2,
      weightKg: 0.05,
    },
    {
      partNumber: "LUC-4100-OC",
      description: "Oil Filter Cartridge",
      category: "Filters",
      vehicleModel: "Air Touring",
      price: 28,
      discountPct: 0,
      uom: "EA",
      moq: 2,
      weightKg: 0.3,
    },
  ]
}

export function getMockPartsByVIN(vin: string): Part[] {
  // Simple VIN-based filter: return subset and tweak discount to simulate genealogy pricing
  const base = getMockPartsCatalog()
  return base.map((p, idx) => ({
    ...p,
    discountPct: (p.discountPct || 0) + (idx % 2 === 0 ? 5 : 0),
  }))
}

export function getMockInvoices(): Invoice[] {
  return [
    { invoiceNumber: "INV-10234", orderId: "ORD-553210", dueDate: "2025-08-05", status: "Past Due", amount: 1320.45 },
    { invoiceNumber: "INV-10235", orderId: "ORD-553211", dueDate: "2025-08-20", status: "Due Soon", amount: 845.0 },
    { invoiceNumber: "INV-10236", orderId: "ORD-553212", dueDate: "2025-09-01", status: "Open", amount: 218.99 },
    { invoiceNumber: "INV-10237", orderId: "ORD-553213", dueDate: "2025-08-08", status: "Past Due", amount: 432.1 },
  ]
}

export function getMockCreditMemos(): CreditMemo[] {
  return [
    { creditMemo: "CM-90021", invoiceNumber: "INV-10210", date: "2025-07-29", amount: 128.5 },
    { creditMemo: "CM-90022", invoiceNumber: "INV-10199", date: "2025-07-22", amount: 342.0 },
  ]
}

export function getMockNotifications(): NotificationItem[] {
  return [
    {
      id: "n1",
      title: "Recall: Tire Pressure Sensor Batch 2025-06",
      description: "Sensors manufactured between May and June 2025 may report incorrect PSI.",
      type: "Recall",
      partNumber: "LUC-5550-TR",
      orderId: "ORD-552900",
    },
    {
      id: "n2",
      title: "Campaign: Cabin Air Filter Upgrade",
      description: "Optional upgrade to REV2 filters for improved airflow.",
      type: "Campaign",
      partNumber: "LUC-2007-BZ-REV2",
      vin: "1HGBH41JXMN109186",
      orderId: "ORD-552901",
    },
  ]
}

export function getMockRepairers(): Repairer[] {
  return [
    { id: "ar-1", name: "AR Berlin", city: "Berlin", country: "DE" },
    { id: "ar-2", name: "AR Munich", city: "Munich", country: "DE" },
    { id: "ar-3", name: "AR Paris", city: "Paris", country: "FR" },
    { id: "ar-4", name: "AR Lyon", city: "Lyon", country: "FR" },
    { id: "ar-5", name: "AR Amsterdam", city: "Amsterdam", country: "NL" },
  ]
}

export function kpisForRepairer(id: string): KPIs {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const rnd = (min: number, max: number) => Math.floor(min + ((seed % 97) / 97) * (max - min))
  const k: KPIs = {
    pendingOrders: rnd(2, 24),
    pastDueInvoices: rnd(0, 7),
    openReturns: rnd(0, 6),
    recallFlags: rnd(0, 5),
    backorders: rnd(0, 12),
    avgEtaDays: rnd(3, 9),
    aging: { "0-30": rnd(40, 70), "31-60": rnd(10, 30), "61+": rnd(0, 20) },
    alerts: [
      { type: "warning", title: "Backorder Risk", detail: "Electrical components trending to backorder next week." },
      { type: "info", title: "Seasonal Demand", detail: "Brake components demand expected to increase by 8%." },
    ],
  }
  return k
}

export function aggregateKPIs(list: KPIs[]): KPIs {
  const sum = (fn: (k: KPIs) => number) => list.reduce((a, k) => a + fn(k), 0)
  const avg = (fn: (k: KPIs) => number) => Math.round(sum(fn) / Math.max(1, list.length))
  return {
    pendingOrders: sum((k) => k.pendingOrders),
    pastDueInvoices: sum((k) => k.pastDueInvoices),
    openReturns: sum((k) => k.openReturns),
    recallFlags: sum((k) => k.recallFlags),
    backorders: sum((k) => k.backorders),
    avgEtaDays: avg((k) => k.avgEtaDays),
    aging: {
      "0-30": Math.round(sum((k) => k.aging["0-30"]) / Math.max(1, list.length)),
      "31-60": Math.round(sum((k) => k.aging["31-60"]) / Math.max(1, list.length)),
      "61+": Math.round(sum((k) => k.aging["61+"]) / Math.max(1, list.length)),
    },
    alerts: list.flatMap((k) => k.alerts).slice(0, 5),
  }
}

export function estimateCreditForReturn(partNumber: string, qty: number): number {
  const part = getMockPartsCatalog().find((p) => p.partNumber === partNumber)
  if (!part) return 0
  const unit = part.price * (1 - part.discountPct / 100)
  // Assume recall returns full credit, others subject to 10% restocking simulated by caller context if needed.
  return unit * qty
}

export function getMockOrders(): Order[] {
  return [
    {
      orderId: "ORD-553210",
      orderDate: "2025-08-05",
      status: "Awaiting Shipment",
      totalAmount: 1320.45,
      itemCount: 3,
      estimatedDelivery: "2025-08-15",
      parts: [
        { partNumber: "LUC-1001-AX", description: "Brake Pad Set Front", quantity: 2, unitPrice: 180 },
        { partNumber: "LUC-3310-QF", description: "12V Auxiliary Battery", quantity: 1, unitPrice: 350 },
        { partNumber: "LUC-5550-TR", description: "Tire Pressure Sensor", quantity: 4, unitPrice: 95 },
      ],
    },
    {
      orderId: "ORD-553211",
      orderDate: "2025-08-03",
      status: "Shipped",
      totalAmount: 845.0,
      itemCount: 5,
      estimatedDelivery: "2025-08-12",
      trackingNumber: "1Z999AA1234567890",
      parts: [
        { partNumber: "LUC-2007-BZ", description: "Cabin Air Filter", quantity: 3, unitPrice: 42 },
        { partNumber: "LUC-4100-OC", description: "Oil Filter Cartridge", quantity: 2, unitPrice: 28 },
      ],
    },
    {
      orderId: "ORD-553212",
      orderDate: "2025-08-01",
      status: "In Transit",
      totalAmount: 218.99,
      itemCount: 2,
      estimatedDelivery: "2025-08-11",
      trackingNumber: "1Z999AA1234567891",
      parts: [
        { partNumber: "LUC-4100-OC", description: "Oil Filter Cartridge", quantity: 4, unitPrice: 28 },
        { partNumber: "LUC-2007-BZ", description: "Cabin Air Filter", quantity: 2, unitPrice: 42 },
      ],
    },
    {
      orderId: "ORD-553213",
      orderDate: "2025-07-28",
      status: "Processing",
      totalAmount: 432.1,
      itemCount: 1,
      estimatedDelivery: "2025-08-18",
      parts: [{ partNumber: "LUC-3310-QF", description: "12V Auxiliary Battery", quantity: 1, unitPrice: 350 }],
    },
    {
      orderId: "ORD-553214",
      orderDate: "2025-07-25",
      status: "Backordered",
      totalAmount: 190.0,
      itemCount: 2,
      estimatedDelivery: "2025-08-25",
      parts: [{ partNumber: "LUC-5550-TR", description: "Tire Pressure Sensor", quantity: 2, unitPrice: 95 }],
    },
    {
      orderId: "ORD-553215",
      orderDate: "2025-07-20",
      status: "Delivered",
      totalAmount: 126.0,
      itemCount: 3,
      trackingNumber: "1Z999AA1234567892",
      parts: [
        { partNumber: "LUC-4100-OC", description: "Oil Filter Cartridge", quantity: 3, unitPrice: 28 },
        { partNumber: "LUC-2007-BZ", description: "Cabin Air Filter", quantity: 1, unitPrice: 42 },
      ],
    },
  ]
}
