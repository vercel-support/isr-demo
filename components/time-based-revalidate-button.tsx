"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

interface TimeBasedRevalidateButtonProps {
  instanceId: string;
}

export function TimeBasedRevalidateButton({ instanceId }: TimeBasedRevalidateButtonProps) {
  const [isRevalidating, setIsRevalidating] = useState(false)

  const handleRevalidate = async () => {
    try {
      setIsRevalidating(true)
      
      // Use the dedicated API endpoint for time-based revalidation
      const response = await fetch(`/api/revalidate/time-based?instanceId=${instanceId}`)
      const data = await response.json()
      
      console.log("Time-based revalidation response:", data)
      
      if (!data.revalidated) {
        console.error("Time-based revalidation failed:", data.message || "Unknown error")
      }
    } catch (error) {
      console.error("Error during time-based revalidation:", error)
    } finally {
      setIsRevalidating(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRevalidate} disabled={isRevalidating} className="mt-2">
      <RefreshCw className={`h-4 w-4 mr-2 ${isRevalidating ? "animate-spin" : ""}`} />
      {isRevalidating ? "Revalidating..." : "Force Time-Based Update"}
    </Button>
  )
} 