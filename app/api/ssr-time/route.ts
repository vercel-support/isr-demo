import { NextResponse } from "next/server"

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic"
// Disable all caching for this API route
export const fetchCache = "force-no-store"
// Setting revalidate to 0 ensures the route is not statically generated
export const revalidate = 0

export async function GET() {
  try {
    // Generate a unique ID for this request
    const requestId = crypto.randomUUID()
    const timestamp = Date.now()
    const now = new Date()
    
    // Log the API call for debugging
    console.log(`SSR Time API called at ${now.toISOString()} (id: ${requestId})`)
    
    // Return fresh time data
    return NextResponse.json({
      time: now.toISOString(),
      requestId: requestId,
      generatedAt: now.toLocaleTimeString(),
      timestamp: timestamp,
      source: "api-route"
    })
  } catch (error) {
    console.error("Error generating SSR time:", error)
    return NextResponse.json(
      { 
        error: "Failed to generate time data",
        message: String(error)
      }, 
      { status: 500 }
    )
  }
} 