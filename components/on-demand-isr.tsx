import { Clock } from "lucide-react"
import { RevalidateButton } from "./revalidate-button"
import { CacheIndicator } from "./cache-indicator"
import { unstable_cache } from "next/cache"

// For on-demand ISR, we want to cache the component until explicitly revalidated
// We don't want force-dynamic here as that would defeat the purpose of on-demand ISR
export const dynamic = 'auto'
// Set to false to disable automatic revalidation
export const revalidate = false

// Generate a unique instance ID for this component instance
// This will be used to tag this specific instance for revalidation
const instanceId = crypto.randomUUID()

// Create a function to get time data that is cached with the instance-specific tag
async function getTimeData() {
  // Add a timestamp to identify this specific generation
  const timestamp = Date.now()
  
  try {
    // Generate time data with a unique ID for each request
    const now = new Date()
    const requestId = crypto.randomUUID()
    
    // Generate a unique tag for this specific data
    const dataTag = Math.random().toString(36).substring(2, 10)
    
    console.log(`On-Demand ISR Time generated at ${now.toISOString()} with timestamp ${timestamp} for instance ${instanceId} (tag: ${dataTag})`)
    
    return {
      time: now.toISOString(),
      requestId: requestId,
      generatedAt: now.toLocaleTimeString(),
      timestamp: timestamp,
      instanceId: instanceId, // Include the instance ID in the returned data
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
      instanceId: instanceId, // Include the instance ID in the returned data
      dataTag: 'error',
    }
  }
}

// Wrap the getTimeData function with unstable_cache to enable tag-based revalidation
// This ensures that only this specific instance is revalidated when the tag is revalidated
const getTime = unstable_cache(
  getTimeData,
  [`on-demand-time-${instanceId}`], // Cache key
  {
    tags: [`on-demand-instance-${instanceId}`], // Revalidation tag specific to this instance
    revalidate: false // Don't revalidate automatically based on time
  }
)

export default async function OnDemandISR() {
  const { time, requestId, generatedAt, timestamp, instanceId: componentInstanceId, dataTag } = await getTime()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-purple-500" />
        <span className="font-mono">{time}</span>
      </div>

      <CacheIndicator type="ISR (On-demand)" color="purple" generatedAt={generatedAt} requestId={requestId} />
      
      <div className="text-xs text-gray-500 mt-1">
        Timestamp: {timestamp}
        <span className="ml-2 text-xs text-gray-400">(Tag: {dataTag})</span>
      </div>

      <RevalidateButton instanceId={componentInstanceId} />

      <div className="text-sm text-muted-foreground mt-2">
        <p>• Cached indefinitely until manually revalidated</p>
        <p>• Perfect for content that changes on specific events</p>
        <p>• Can be triggered via API or user action</p>
        <p className="text-xs text-gray-400">Instance ID: {componentInstanceId.substring(0, 8)}...</p>
      </div>
    </div>
  )
}


