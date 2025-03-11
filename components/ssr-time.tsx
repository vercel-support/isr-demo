import { Clock } from "lucide-react"
import { CacheIndicator } from "./cache-indicator"

// This forces dynamic rendering (SSR)
export const dynamic = "force-dynamic"
// Disable all caching for this component
export const fetchCache = "force-no-store"
// Setting revalidate to 0 ensures the page is not statically generated
export const revalidate = 0

// Create a function to get time data that is never cached
// The uniqueParam ensures this function is called fresh each time
async function getTimeData(uniqueParam: string) {
  // Add a timestamp to ensure we get fresh data on each request
  const timestamp = Date.now()
  
  try {
    // Use the API route to get fresh data
    // Add a cache-busting parameter to ensure we get fresh data
    const response = await fetch(`/api/ssr-time?t=${timestamp}&u=${uniqueParam}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    
    const data = await response.json()
    
    // Generate a unique nonce for this specific request
    const nonce = Math.random().toString(36).substring(2, 10)
    
    console.log(`SSR Time generated at ${new Date().toISOString()} with timestamp ${timestamp} (nonce: ${nonce}, param: ${uniqueParam})`)
    
    return {
      time: data.time || new Date().toISOString(),
      requestId: data.requestId || crypto.randomUUID(),
      generatedAt: data.generatedAt || new Date().toLocaleTimeString(),
      timestamp: data.timestamp || timestamp,
      nonce: nonce,
      uniqueParam,
      source: data.source || 'component'
    }
  } catch (error) {
    console.error("Error generating time:", error)
    // Fallback if there's an error
    const now = new Date()
    return {
      time: now.toISOString(),
      requestId: `fallback-${now.getTime()}`,
      generatedAt: now.toLocaleTimeString(),
      timestamp: timestamp,
      nonce: 'error',
      uniqueParam,
      source: 'fallback'
    }
  }
}

export default async function SSRTime() {
  // Generate a unique parameter for this specific render
  // This ensures we never hit a cached version
  const uniqueParam = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
  
  // Call getTimeData directly with the unique parameter to ensure fresh data on every request
  const { time, requestId, generatedAt, timestamp, nonce, uniqueParam: param, source } = await getTimeData(uniqueParam)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-orange-500" />
        <span className="font-mono">{time}</span>
      </div>

      <CacheIndicator type="SSR" color="orange" generatedAt={generatedAt} requestId={requestId} />
      
      <div className="text-xs text-gray-500 mt-1">
        Timestamp: {timestamp}
        <span className="ml-2 text-xs text-gray-400">(Nonce: {nonce})</span>
      </div>
      
      <div className="text-xs text-gray-400 mt-1">
        Unique param: {param.substring(0, 8)}...
        <span className="ml-2">Source: {source}</span>
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        <p>• Rendered on every request</p>
        <p>• Always fresh data</p>
        <p>• No caching</p>
        <p>• Higher server load</p>
        <p>• Good for personalized or frequently changing data</p>
      </div>
    </div>
  )
}

