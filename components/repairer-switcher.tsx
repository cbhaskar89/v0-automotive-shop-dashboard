"use client"

import * as React from "react"
import { ChevronsUpDown, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Repairer } from "@/lib/types"

type Props = {
  repairers: Repairer[]
  value?: string
  onChange?: (id: string) => void
  allowAll?: boolean
}

export default function RepairerSwitcher({ repairers, value, onChange, allowAll = true }: Props) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const current =
    allowAll && value === "all"
      ? { id: "all", name: "All Repairers" }
      : (repairers.find((r) => r.id === value) ?? repairers[0])

  const filtered = repairers.filter(
    (r) => r.name.toLowerCase().includes(query.toLowerCase()) || r.city.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="truncate max-w-[180px]">{current?.name ?? "Select Repairer"}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-3">
        <div className="mb-2">
          <Input placeholder="Search repairers..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <ScrollArea className="h-56 pr-2">
          <div className="grid gap-1">
            {allowAll && (
              <button
                className={cn("text-left rounded-md px-2 py-2 hover:bg-muted", value === "all" && "bg-muted")}
                onClick={() => {
                  onChange?.("all")
                  setOpen(false)
                }}
              >
                <div className="flex items-center justify-between">
                  <span>All Repairers</span>
                  <Badge variant="secondary">Aggregate</Badge>
                </div>
              </button>
            )}
            {filtered.map((r) => (
              <button
                key={r.id}
                className={cn("text-left rounded-md px-2 py-2 hover:bg-muted", r.id === value && "bg-muted")}
                onClick={() => {
                  onChange?.(r.id)
                  setOpen(false)
                }}
              >
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">
                  {r.city} • {r.country}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
