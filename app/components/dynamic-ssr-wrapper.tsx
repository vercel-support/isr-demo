import SSRTime from "@/components/ssr-time"
import { Suspense } from "react"

// Force dynamic rendering for this component
export const dynamic = "force-dynamic"
// Disable all caching for this component
export const fetchCache = "force-no-store"
// Setting revalidate to 0 ensures the component is not statically generated
export const revalidate = 0

export default function DynamicSSRWrapper() {
  // Generate a unique ID for this render to ensure SSR component gets fresh data
  const renderTime = Date.now()
  const uniqueId = Math.random().toString(36).substring(2, 10)
  
  // Log the render for debugging
  console.log(`DynamicSSRWrapper rendered at ${new Date(renderTime).toISOString()} (id: ${uniqueId})`)
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Use a unique key based on render time to force fresh data on each request */}
      <SSRTime key={`dynamic-ssr-${renderTime}-${uniqueId}`} />
    </Suspense>
  )
} 