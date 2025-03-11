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

    // Only revalidate the specific on-demand instance tag
    console.log(`API: Revalidating on-demand instance: ${instanceId}`)
    revalidateTag(`on-demand-instance-${instanceId}`)
    
    return NextResponse.json({
      revalidated: true,
      type: "on-demand",
      message: `Revalidated on-demand instance: ${instanceId}`,
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