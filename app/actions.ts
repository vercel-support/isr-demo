"use server"

import { revalidateTag } from "next/cache"

export async function revalidateOnDemand(instanceId?: string) {
  try {
    if (instanceId) {
      // If an instanceId is provided, only revalidate that specific instance
      console.log(`Revalidating specific instance: ${instanceId}`)
      
      // Only revalidate the specific instance tag
      revalidateTag(`on-demand-instance-${instanceId}`)
      
      return { 
        revalidated: true, 
        now: new Date().toISOString(),
        message: `Revalidation triggered for instance ${instanceId}`,
        instanceId
      }
    }
    
    // Fallback to revalidating all on-demand content if no instanceId is provided
    // This maintains backward compatibility but should be avoided in production
    console.log("Revalidating all on-demand content (no specific instance provided)")
    
    // Only revalidate the general on-demand tag, not paths
    revalidateTag("on-demand-isr")
    
    return { 
      revalidated: true, 
      now: new Date().toISOString(),
      message: "Revalidation triggered for all on-demand content" 
    }
  } catch (error) {
    console.error("Error during revalidation:", error)
    return { 
      revalidated: false, 
      now: new Date().toISOString(),
      message: "Revalidation failed",
      error: String(error)
    }
  }
}

export async function getTime() {
  try {
    // Generate time data directly instead of fetching from API
    const now = new Date()
    return {
      time: now.toISOString(),
      datetime: now.toISOString(),
      timestamp: now.getTime(),
      requestId: crypto.randomUUID(),
      generatedAt: now.toLocaleTimeString(),
    }
  } catch (error) {
    console.error("Error generating time:", error)
    // Fallback if there's an error
    return { time: new Date().toISOString() }
  }
}

export async function getTimeData() {
  return getTime()
}

