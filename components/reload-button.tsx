"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

export function ReloadButton() {
  const [isReloading, setIsReloading] = useState(false)

  const handleReload = () => {
    setIsReloading(true)
    
    // Add a timestamp to the URL to bypass cache
    const timestamp = Date.now()
    const url = new URL(window.location.href)
    
    // Remove any existing _t parameter
    url.searchParams.delete('_t')
    
    // Add a new timestamp parameter
    url.searchParams.append('_t', timestamp.toString())
    
    // Force a full page reload and bypass cache
    window.location.href = url.toString()
  }

  return (
    <Button onClick={handleReload} disabled={isReloading} className="mb-4">
      <RefreshCw className={`h-4 w-4 mr-2 ${isReloading ? "animate-spin" : ""}`} />
      {isReloading ? "Reloading..." : "Reload Page"}
    </Button>
  )
} 