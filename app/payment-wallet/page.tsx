"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, DollarSign, ArrowUpRight, ArrowDownLeft, Settings, Shield } from "lucide-react"

// Mock data for wallet transactions
const transactions = [
  {
    id: "TXN-001",
    type: "credit",
    amount: 500.0,
    description: "Wallet Top-up",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "TXN-002",
    type: "debit",
    amount: 245.8,
    description: "Invoice #INV-2024-001 Auto-charge",
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: "TXN-003",
    type: "debit",
    amount: 89.5,
    description: "Invoice #INV-2024-002 Auto-charge",
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: "TXN-004",
    type: "credit",
    amount: 1000.0,
    description: "Wallet Top-up",
    date: "2024-01-10",
    status: "completed",
  },
  {
    id: "TXN-005",
    type: "debit",
    amount: 156.25,
    description: "Invoice #INV-2024-003 Auto-charge",
    date: "2024-01-08",
    status: "completed",
  },
]

export default function PaymentWalletPage() {
  const [walletBalance] = useState(1008.45)
  const [autoChargeEnabled, setAutoChargeEnabled] = useState(true)
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState(100)
  const [topUpAmount, setTopUpAmount] = useState("")

  const handleTopUp = () => {
    // Simulate top-up process
    console.log(`Adding $${topUpAmount} to wallet`)
    setTopUpAmount("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Wallet</h1>
        <p className="text-muted-foreground">Manage your prepaid balance for automatic invoice payments</p>
      </div>

      {/* Wallet Balance Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Available for auto-charges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-charge Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant={autoChargeEnabled ? "default" : "secondary"}>
                {autoChargeEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Invoices charged automatically</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Balance Alert</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${lowBalanceThreshold}</div>
            <p className="text-xs text-muted-foreground">Notification threshold</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="topup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="topup">Top Up Wallet</TabsTrigger>
          <TabsTrigger value="settings">Auto-charge Settings</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="topup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Funds to Wallet</CardTitle>
              <CardDescription>Top up your wallet balance for automatic invoice payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Top-up Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card-1234">**** **** **** 1234 (Visa)</SelectItem>
                      <SelectItem value="card-5678">**** **** **** 5678 (Mastercard)</SelectItem>
                      <SelectItem value="bank-account">Bank Account ****9876</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setTopUpAmount("100")}>
                  $100
                </Button>
                <Button variant="outline" onClick={() => setTopUpAmount("250")}>
                  $250
                </Button>
                <Button variant="outline" onClick={() => setTopUpAmount("500")}>
                  $500
                </Button>
                <Button variant="outline" onClick={() => setTopUpAmount("1000")}>
                  $1000
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Top-up Amount: ${topUpAmount || "0.00"}</p>
                  <p className="text-sm text-muted-foreground">Processing fee: $0.00</p>
                </div>
                <Button onClick={handleTopUp} disabled={!topUpAmount}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto-charge Settings</CardTitle>
              <CardDescription>Configure automatic payment settings for invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Auto-charge</Label>
                  <p className="text-sm text-muted-foreground">Automatically charge invoices from wallet balance</p>
                </div>
                <Switch checked={autoChargeEnabled} onCheckedChange={setAutoChargeEnabled} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="threshold">Low Balance Notification Threshold</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="threshold"
                    type="number"
                    value={lowBalanceThreshold}
                    onChange={(e) => setLowBalanceThreshold(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You'll receive notifications when balance falls below this amount
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Auto Top-up (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span className="text-sm">Enable automatic top-up when balance is low</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically add funds when balance falls below threshold
                </p>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all wallet transactions and auto-charges</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.type === "credit" ? (
                            <ArrowUpRight className="mr-2 h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownLeft className="mr-2 h-4 w-4 text-red-600" />
                          )}
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                        {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
