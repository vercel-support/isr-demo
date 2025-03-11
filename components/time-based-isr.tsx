import { Clock } from "lucide-react"
import { CacheIndicator } from "./cache-indicator"
import { unstable_cache } from "next/cache"
import { TimeBasedRevalidateButton } from "./time-based-revalidate-button"

// This sets the revalidation time to 10 seconds
export const revalidate = 10

// Create a function to get time data
async function getTimeData() {
  // Add a timestamp to identify this specific generation
  const timestamp = Date.now()
  
  try {
    // Generate time data with a unique ID for each request
    const now = new Date()
    const requestId = crypto.randomUUID()
    
    // Generate a unique tag for this specific data
    const dataTag = Math.random().toString(36).substring(2, 10)
    
    console.log(`Time-Based ISR Time generated at ${now.toISOString()} with timestamp ${timestamp} (tag: ${dataTag})`)
    
    return {
      time: now.toISOString(),
      requestId: requestId,
      generatedAt: now.toLocaleTimeString(),
      timestamp: timestamp,
      dataTag: dataTag,
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
      dataTag: 'error',
    }
  }
}

// Create a unique ID for this component instance to ensure proper isolation
const timeBasedInstanceId = crypto.randomUUID()

// Wrap the getTimeData function with unstable_cache to ensure it uses a separate cache
// This ensures it won't be affected by on-demand revalidation
const getTime = unstable_cache(
  getTimeData,
  [`time-based-isr-data-${timeBasedInstanceId}`], // Cache key with unique instance ID
  {
    tags: [`time-based-isr-tag-${timeBasedInstanceId}`], // Revalidation tag specific to this instance
    revalidate: 10 // Revalidate every 10 seconds
  }
)

export default async function TimeBasedISR() {
  const { time, requestId, generatedAt, timestamp, dataTag } = await getTime()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-green-500" />
        <span className="font-mono">{time}</span>
      </div>

      <CacheIndicator type="ISR (Time-based)" color="green" generatedAt={generatedAt} requestId={requestId} />
      
      <div className="text-xs text-gray-500 mt-1">
        Timestamp: {timestamp}
        <span className="ml-2 text-xs text-gray-400">(Tag: {dataTag})</span>
      </div>

      {/* Add a manual revalidation button for testing */}
      <TimeBasedRevalidateButton instanceId={timeBasedInstanceId} />

      <div className="text-sm text-muted-foreground mt-2">
        <p>• Cached for 10 seconds</p>
        <p>• First request after expiry shows stale data</p>
        <p>• Regenerates in the background</p>
        <p>• Good for data that changes infrequently</p>
        <p className="text-xs text-gray-400">Instance ID: {timeBasedInstanceId.substring(0, 8)}...</p>
      </div>
    </div>
  )
}

