import { revalidateOnDemand } from "@/app/actions"
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

    // Revalidate the specific instance
    const result = await revalidateOnDemand(instanceId)

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated instance: ${instanceId}`,
      result
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