"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"

interface InvoicePDFViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invoice: {
    invoiceNumber: string
    orderId: string
    dueDate: string
    status: string
    amount: number
  } | null
}

export function InvoicePDFViewer({ open, onOpenChange, invoice }: InvoicePDFViewerProps) {
  if (!invoice) return null

  const handleDownload = () => {
    // Create a blob with PDF-like content (in real implementation, this would be actual PDF generation)
    const pdfContent = generateInvoicePDF(invoice)
    const blob = new Blob([pdfContent], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Invoice_${invoice.invoiceNumber}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoice {invoice.invoiceNumber}
            <Button onClick={handleDownload} size="sm" className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* PDF-like Invoice Layout */}
        <div className="bg-white border rounded-lg p-8 space-y-6 text-black">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">CAR COMPANY</h1>
              <p className="text-sm text-gray-600">Parts & Service Division</p>
              <p className="text-sm text-gray-600">7373 Gateway Blvd, Newark, CA 94560</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">INVOICE</h2>
              <p className="text-sm">Invoice #: {invoice.invoiceNumber}</p>
              <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-sm">Due Date: {invoice.dueDate}</p>
            </div>
          </div>

          {/* Ship To / Ship From */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Ship From:</h3>
              <div className="text-sm space-y-1">
                <p>Car Company Parts Center</p>
                <p>7373 Gateway Blvd</p>
                <p>Newark, CA 94560</p>
                <p>Phone: (650) 395-5555</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ship To:</h3>
              <div className="text-sm space-y-1">
                <p>Premium Auto Repair</p>
                <p>Paxton Reed - Shop Manager</p>
                <p>1234 Main Street</p>
                <p>San Francisco, CA 94102</p>
                <p>Phone: (415) 555-0123</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Order Information:</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Order #:</span> {invoice.orderId}
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <Badge variant={invoice.status === "Past Due" ? "destructive" : "outline"} className="ml-2">
                  {invoice.status}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Payment Terms:</span> Net 30
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <h3 className="font-semibold mb-3">Items:</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-3 py-2 text-left">Part Number</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-center">Qty</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">Unit Price</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">BRK-001</td>
                  <td className="border border-gray-300 px-3 py-2">Brake Pad Set - Front</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">$89.50</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">$179.00</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">OIL-002</td>
                  <td className="border border-gray-300 px-3 py-2">Oil Filter Cartridge</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">3</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">$24.99</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">$74.97</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2">CAB-003</td>
                  <td className="border border-gray-300 px-3 py-2">Cabin Air Filter</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">$32.50</td>
                  <td className="border border-gray-300 px-3 py-2 text-right">$32.50</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${(invoice.amount * 0.85).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${(invoice.amount * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8.75%):</span>
                <span>${(invoice.amount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${invoice.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 text-xs text-gray-600">
            <p>Payment Terms: Net 30 days. Late payments subject to 1.5% monthly service charge.</p>
            <p>Questions about this invoice? Contact: accounts@carcompany.com | (650) 395-5555</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function generateInvoicePDF(invoice: any): string {
  // In a real implementation, this would generate actual PDF content
  // For demo purposes, returning a simple text representation
  return `Invoice: ${invoice.invoiceNumber}
Order: ${invoice.orderId}
Amount: $${invoice.amount.toFixed(2)}
Due Date: ${invoice.dueDate}
Status: ${invoice.status}

This is a simulated PDF download. In production, this would be a proper PDF file.`
}
