"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface CreditMemoPDFViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creditMemo: any
}

export function CreditMemoPDFViewer({ open, onOpenChange, creditMemo }: CreditMemoPDFViewerProps) {
  if (!creditMemo) return null

  const handleDownload = () => {
    // Simulate PDF download
    const element = document.createElement("a")
    element.href = `data:application/pdf;base64,${btoa(`Credit Memo ${creditMemo.creditMemo}`)}`
    element.download = `credit-memo-${creditMemo.creditMemo}.pdf`
    element.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Credit Memo {creditMemo.creditMemo}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownload} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={() => onOpenChange(false)} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="bg-white p-8 border rounded-lg">
          {/* Credit Memo Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CREDIT MEMO</h1>
              <p className="text-gray-600 mt-1">Credit Memo #: {creditMemo.creditMemo}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">Car Company</div>
              <div className="text-sm text-gray-600 mt-2">
                <p>123 Manufacturing Drive</p>
                <p>Detroit, MI 48201</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: billing@carcompany.com</p>
              </div>
            </div>
          </div>

          {/* Credit Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Credit To:</h3>
              <div className="text-sm text-gray-700">
                <p className="font-medium">Premium Auto Repair</p>
                <p>456 Service Lane</p>
                <p>Chicago, IL 60601</p>
                <p>Phone: (555) 987-6543</p>
                <p>Email: billing@premiumauto.com</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Credit Details:</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Credit Date:</span> {creditMemo.date}
                </p>
                <p>
                  <span className="font-medium">Original Invoice:</span> {creditMemo.invoiceNumber}
                </p>
                <p>
                  <span className="font-medium">Return Authorization:</span> RMA-{creditMemo.creditMemo.slice(-6)}
                </p>
                <p>
                  <span className="font-medium">Reason:</span> Warranty Return
                </p>
              </div>
            </div>
          </div>

          {/* Credit Items */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Credit Items</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Part Number</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Qty</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Unit Price</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">BRK-PAD-001</td>
                  <td className="border border-gray-300 px-4 py-2">High Performance Brake Pad Set</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">$89.99</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">$89.99</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">OIL-FLT-003</td>
                  <td className="border border-gray-300 px-4 py-2">Premium Oil Filter Cartridge</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">2</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">$24.99</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">$49.98</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Credit Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span>
                <span>${(creditMemo.amount * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Tax Credit:</span>
                <span>${(creditMemo.amount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg border-t-2 border-gray-900">
                <span>Total Credit:</span>
                <span>${creditMemo.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-500 border-t pt-4">
            <p>
              This credit memo will be applied to your account balance. If you have any questions regarding this credit,
              please contact our billing department at billing@carcompany.com or (555) 123-4567.
            </p>
            <p className="mt-2">
              Credit processed on {creditMemo.date} | Reference: {creditMemo.creditMemo}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
