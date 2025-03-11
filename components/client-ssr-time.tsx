"use client"

import { Clock } from "lucide-react"
import { CacheIndicator } from "./cache-indicator"
import { useEffect, useState } from "react"

export default function ClientSSRTime() {
  const [timeData, setTimeData] = useState<{
    time: string;
    requestId: string;
    generatedAt: string;
    timestamp: number;
    nonce: string;
    source: string;
  }>({
    time: new Date().toISOString(),
    requestId: 'loading',
    generatedAt: new Date().toLocaleTimeString(),
    timestamp: Date.now(),
    nonce: 'loading',
    source: 'client-initial'
  })
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Use a state to track the URL's timestamp parameter
  const [urlTimestamp, setUrlTimestamp] = useState<string>('')
  
  // Update the URL timestamp whenever the component mounts or the URL changes
  useEffect(() => {
    const url = new URL(window.location.href)
    const timestamp = url.searchParams.get('_t') || Date.now().toString()
    setUrlTimestamp(timestamp)
  }, [])
  
  // Fetch data whenever the URL timestamp changes
  useEffect(() => {
    // Skip the initial render when urlTimestamp is empty
    if (!urlTimestamp) return
    
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Generate unique parameters for this request
        const timestamp = Date.now()
        const uniqueParam = `${timestamp}-${Math.random().toString(36).substring(2, 10)}`
        
        // Fetch data from the API route with URL timestamp
        const response = await fetch(`/api/ssr-time?t=${timestamp}&u=${uniqueParam}&url_t=${urlTimestamp}`, {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }
        
        const data = await response.json()
        
        // Add client-specific data
        const nonce = Math.random().toString(36).substring(2, 10)
        
        setTimeData({
          time: data.time || new Date().toISOString(),
          requestId: data.requestId || 'client-generated',
          generatedAt: data.generatedAt || new Date().toLocaleTimeString(),
          timestamp: data.timestamp || timestamp,
          nonce: nonce,
          source: `${data.source || 'api'}-via-client`
        })
        
        setError(null)
      } catch (err) {
        console.error("Error fetching SSR time:", err)
        setError(String(err))
        
        // Set fallback data
        const now = new Date()
        setTimeData({
          time: now.toISOString(),
          requestId: `fallback-${now.getTime()}`,
          generatedAt: now.toLocaleTimeString(),
          timestamp: now.getTime(),
          nonce: 'error',
          source: 'client-fallback'
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [urlTimestamp])
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className={`h-5 w-5 ${isLoading ? 'text-gray-400 animate-pulse' : 'text-orange-500'}`} />
        <span className="font-mono">{timeData.time}</span>
      </div>

      <CacheIndicator type="SSR (Client)" color="orange" generatedAt={timeData.generatedAt} requestId={timeData.requestId} />
      
      <div className="text-xs text-gray-500 mt-1">
        Timestamp: {timeData.timestamp}
        <span className="ml-2 text-xs text-gray-400">(Nonce: {timeData.nonce})</span>
      </div>
      
      {error && (
        <div className="text-xs text-red-500 mt-1">
          Error: {error.substring(0, 50)}...
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-1">
        Source: {timeData.source}
        {urlTimestamp && <span className="ml-2">URL Timestamp: {urlTimestamp.substring(0, 8)}...</span>}
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        <p>• Fetched on the client-side</p>
        <p>• Fresh data on every page load</p>
        <p>• No server-side caching issues</p>
        <p>• Good for static pages that need dynamic data</p>
      </div>
    </div>
  )
} 