"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, DollarSign } from "lucide-react"

interface ClaimTypeSelectionProps {
  onSelect: (type: "order" | "quality" | "buyback") => void
}

export function ClaimTypeSelection({ onSelect }: ClaimTypeSelectionProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">What type of claim are you filing?</CardTitle>
          <CardDescription>Select the type of return claim you need to submit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-500"
              onClick={() => onSelect("order")}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Claim Against Order Received</h3>
                    <p className="text-muted-foreground mt-1">
                      File a return claim for parts from a specific order you received. This includes damaged,
                      defective, or incorrect parts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-orange-500"
              onClick={() => onSelect("quality")}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Quality Alert Claim</h3>
                    <p className="text-muted-foreground mt-1">
                      Return parts that have been flagged by Car Company due to quality issues, recalls, or
                      manufacturing defects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-500"
              onClick={() => onSelect("buyback")}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">BuyBack Request</h3>
                    <p className="text-muted-foreground mt-1">
                      Submit parts you no longer need for potential buyback. Shipping fees will apply for approved
                      requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
