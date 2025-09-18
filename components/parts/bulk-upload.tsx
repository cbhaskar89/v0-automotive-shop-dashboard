"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, CheckCircle, XCircle, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getMockPartsCatalog } from "@/lib/data"
import type { Part, CartItem } from "@/lib/types"

interface BulkUploadProps {
  onAddBulk: (items: CartItem[]) => void
}

interface ParsedRow {
  partNumber: string
  quantity: number
  valid: boolean
  error?: string
  part?: Part
}

export default function BulkUpload({ onAddBulk }: BulkUploadProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const [parsedData, setParsedData] = React.useState<ParsedRow[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const { toast } = useToast()

  const allParts = getMockPartsCatalog()

  function downloadTemplate() {
    const csvContent = "Part Number,Quantity\nLUC-12345,2\nLUC-67890,1\nLUC-11111,5"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bulk_order_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setParsedData([])
    }
  }

  async function processFile() {
    if (!file) return

    setIsProcessing(true)

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())

      // Skip header row
      const dataLines = lines.slice(1)

      const parsed: ParsedRow[] = dataLines.map((line, index) => {
        const [partNumber, quantityStr] = line.split(",").map((s) => s.trim())

        if (!partNumber || !quantityStr) {
          return {
            partNumber: partNumber || "",
            quantity: 0,
            valid: false,
            error: "Missing part number or quantity",
          }
        }

        const quantity = Number.parseInt(quantityStr)
        if (isNaN(quantity) || quantity <= 0) {
          return {
            partNumber,
            quantity: 0,
            valid: false,
            error: "Invalid quantity",
          }
        }

        // Find part in catalog
        const part = allParts.find((p) => p.partNumber === partNumber)
        if (!part) {
          return {
            partNumber,
            quantity,
            valid: false,
            error: "Part not found in catalog",
          }
        }

        // Check MOQ
        if (quantity < part.moq) {
          return {
            partNumber,
            quantity,
            valid: false,
            error: `Quantity below MOQ (${part.moq})`,
          }
        }

        return {
          partNumber,
          quantity,
          valid: true,
          part,
        }
      })

      setParsedData(parsed)

      const validCount = parsed.filter((p) => p.valid).length
      const totalCount = parsed.length

      toast({
        title: "File processed",
        description: `${validCount}/${totalCount} parts validated successfully`,
      })
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please check file format and try again",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  function addValidPartsToCart() {
    const validItems = parsedData
      .filter((row) => row.valid && row.part)
      .map((row) => ({
        part: row.part!,
        qty: row.quantity,
      }))

    if (validItems.length === 0) {
      toast({
        title: "No valid parts",
        description: "Please fix errors before adding to cart",
        variant: "destructive",
      })
      return
    }

    onAddBulk(validItems)

    toast({
      title: "Parts added to cart",
      description: `${validItems.length} parts added successfully`,
    })

    // Reset
    setFile(null)
    setParsedData([])
    const fileInput = document.getElementById("bulk-file") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const validCount = parsedData.filter((p) => p.valid).length
  const errorCount = parsedData.filter((p) => !p.valid).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk Upload Parts
        </CardTitle>
        <CardDescription>Upload a CSV file with part numbers and quantities for bulk ordering</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Template Download */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">Need a template?</span>
          </div>
          <Button variant="outline" size="sm" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="bulk-file">Upload CSV File</Label>
          <div className="flex gap-2">
            <Input id="bulk-file" type="file" accept=".csv,.txt" onChange={handleFileChange} className="flex-1" />
            <Button onClick={processFile} disabled={!file || isProcessing}>
              {isProcessing ? "Processing..." : "Process"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">CSV format: Part Number, Quantity (one per line)</p>
        </div>

        {/* Results Summary */}
        {parsedData.length > 0 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {validCount > 0 && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {validCount} Valid
                </Badge>
              )}
              {errorCount > 0 && (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  {errorCount} Errors
                </Badge>
              )}
            </div>

            {/* Results Table */}
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Number</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parsedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{row.partNumber}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        {row.valid ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Valid
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Error
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.error || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-end">
              <Button onClick={addValidPartsToCart} disabled={validCount === 0} className="w-full sm:w-auto">
                Add {validCount} Valid Parts to Cart
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
