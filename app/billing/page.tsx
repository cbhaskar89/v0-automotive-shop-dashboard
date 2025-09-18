"use client"

import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getMockInvoices, getMockCreditMemos } from "@/lib/data"
import { InvoicePDFViewer } from "@/components/invoice-pdf-viewer"
import { CreditMemoPDFViewer } from "@/components/credit-memo-pdf-viewer"

export default function BillingPage() {
  const [q, setQ] = React.useState("")
  const [selectedInvoice, setSelectedInvoice] = React.useState<any>(null)
  const [pdfViewerOpen, setPdfViewerOpen] = React.useState(false)
  const [selectedCreditMemo, setSelectedCreditMemo] = React.useState<any>(null)
  const [creditPdfViewerOpen, setCreditPdfViewerOpen] = React.useState(false)

  const invoices = getMockInvoices().filter(
    (i) => i.invoiceNumber.toLowerCase().includes(q.toLowerCase()) || i.orderId.toLowerCase().includes(q.toLowerCase()),
  )
  const credits = getMockCreditMemos()

  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice)
    setPdfViewerOpen(true)
  }

  const handleCreditMemoClick = (creditMemo: any) => {
    setSelectedCreditMemo(creditMemo)
    setCreditPdfViewerOpen(true)
  }

  const pastDue = invoices.filter((i) => i.status === "Past Due")
  const upcoming = invoices.filter((i) => i.status !== "Past Due")

  return (
    <>
      <header className="flex items-center gap-2 border-b bg-muted/40 h-14">
        <SidebarTrigger />
        <div className="ml-2 font-semibold">Billing & Documents</div>
        <div className="ml-auto flex items-center gap-2">
          <Input placeholder="Search invoice/order..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="outline" onClick={() => exportCsv(invoices, "invoices.csv")}>
            Export CSV
          </Button>
        </div>
      </header>

      <main className="py-4 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Past Due Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoiceTable rows={pastDue} onInvoiceClick={handleInvoiceClick} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming/Future Due Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoiceTable rows={upcoming} onInvoiceClick={handleInvoiceClick} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Memos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Credit Memo</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credits.map((c) => (
                  <TableRow key={c.creditMemo}>
                    <TableCell>
                      <button
                        onClick={() => handleCreditMemoClick(c)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                      >
                        {c.creditMemo}
                      </button>
                    </TableCell>
                    <TableCell>{c.invoiceNumber}</TableCell>
                    <TableCell>{c.date}</TableCell>
                    <TableCell className="text-right">${c.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <InvoicePDFViewer open={pdfViewerOpen} onOpenChange={setPdfViewerOpen} invoice={selectedInvoice} />
      <CreditMemoPDFViewer
        open={creditPdfViewerOpen}
        onOpenChange={setCreditPdfViewerOpen}
        creditMemo={selectedCreditMemo}
      />
    </>
  )
}

function InvoiceTable({
  rows,
  onInvoiceClick,
}: {
  rows: ReturnType<typeof getMockInvoices>
  onInvoiceClick: (invoice: any) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((i) => (
          <TableRow key={i.invoiceNumber}>
            <TableCell>
              <button
                onClick={() => onInvoiceClick(i)}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {i.invoiceNumber}
              </button>
            </TableCell>
            <TableCell>{i.orderId}</TableCell>
            <TableCell>{i.dueDate}</TableCell>
            <TableCell>
              <Badge variant={i.status === "Past Due" ? "secondary" : "outline"}>{i.status}</Badge>
            </TableCell>
            <TableCell className="text-right">${i.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function exportCsv(rows: any[], filename: string) {
  const headers = Object.keys(rows[0] || {})
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => JSON.stringify((r as any)[h] ?? "")).join(",")),
  ].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
