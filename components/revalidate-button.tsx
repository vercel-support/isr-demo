"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

interface RevalidateButtonProps {
  instanceId: string;
}

export function RevalidateButton({ instanceId }: RevalidateButtonProps) {
  const [isRevalidating, setIsRevalidating] = useState(false)

  const handleRevalidate = async () => {
    try {
      setIsRevalidating(true)
      
      // Use the dedicated API endpoint for on-demand revalidation
      const response = await fetch(`/api/revalidate/on-demand?instanceId=${instanceId}`)
      const data = await response.json()
      
      console.log("Revalidation response:", data)
      
      if (!data.revalidated) {
        console.error("Revalidation failed:", data.message || "Unknown error")
      }
    } catch (error) {
      console.error("Error during revalidation:", error)
    } finally {
      setIsRevalidating(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRevalidate} disabled={isRevalidating} className="mt-2">
      <RefreshCw className={`h-4 w-4 mr-2 ${isRevalidating ? "animate-spin" : ""}`} />
      {isRevalidating ? "Revalidating..." : "Revalidate Now"}
    </Button>
  )
}

