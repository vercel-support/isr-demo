import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get the instanceId from the query parameters
    const { searchParams } = new URL(request.url)
    const instanceId = searchParams.get('instanceId')

    if (!instanceId) {
      return NextResponse.json(
        { 
          error: "Missing instanceId parameter",
          message: "Please provide an instanceId query parameter to revalidate a specific instance"
        }, 
        { status: 400 }
      )
    }

    // Only revalidate the specific time-based instance tag
    console.log(`API: Revalidating time-based instance: ${instanceId}`)
    revalidateTag(`time-based-isr-tag-${instanceId}`)
    
    return NextResponse.json({
      revalidated: true,
      type: "time-based",
      message: `Revalidated time-based instance: ${instanceId}`,
      timestamp: Date.now()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        revalidated: false, 
        message: "Error revalidating", 
        error: String(error) 
      }, 
      { status: 500 }
    )
  }
} 