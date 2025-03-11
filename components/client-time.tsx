"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { CacheIndicator } from "./cache-indicator"

export default function ClientTime() {
  const [time, setTime] = useState<string>("Loading...")
  const [generatedAt, setGeneratedAt] = useState<string>("Loading...")
  const [requestId, setRequestId] = useState<string>("client-loading")

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date()
      setTime(now.toISOString())
      setGeneratedAt(now.toLocaleTimeString())
      setRequestId(`client-${now.getTime()}`)
    }

    // Initial update
    updateTime()

    // Set interval for updates
    const interval = setInterval(updateTime, 1000)

    // Clean up interval
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-blue-500" />
        <span className="font-mono">{time}</span>
      </div>

      <CacheIndicator type="Client-side" color="blue" generatedAt={generatedAt} requestId={requestId} />

      <div className="text-sm text-muted-foreground mt-2">
        <p>• Updates in real-time on the client</p>
        <p>• No caching, always fresh data</p>
        <p>• Requires JavaScript to be enabled</p>
      </div>
    </div>
  )
}

