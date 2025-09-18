"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { BuyBackFlow } from "@/components/returns/buyback-flow"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function BuyBackPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [submittedData, setSubmittedData] = React.useState<any>(null)

  const handleSubmit = (data: any) => {
    console.log("[v0] BuyBack request submitted:", data)
    setSubmittedData(data)
    setSubmitted(true)
  }

  const handleBack = () => {
    router.back()
  }

  if (submitted) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">BuyBack Request Submitted</AlertTitle>
          <AlertDescription className="text-green-700">
            Your buyback request has been submitted successfully. Request ID: BBR-{Date.now().toString().slice(-6)}
            <br />
            <br />
            <strong>Next Steps:</strong>
            <br />• Car Company will review your request within 5-10 business days
            <br />• You'll receive an email notification with the approval decision
            <br />• If approved, shipping instructions and final buyback amount will be provided
            <br />• Estimated shipping fee: ${submittedData?.estimatedShippingFee || 0} (will be deducted from buyback
            amount)
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">BuyBack Request</h1>
        <p className="text-muted-foreground mt-2">
          Submit parts you no longer need for potential buyback by Car Company.
        </p>
      </div>

      <BuyBackFlow onSubmit={handleSubmit} onBack={handleBack} />
    </div>
  )
}
