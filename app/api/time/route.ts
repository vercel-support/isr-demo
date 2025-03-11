// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get a unique identifier for this request
    const requestId = crypto.randomUUID()

    // Get the current time
    const now = new Date()

    // Return the time data
    return Response.json({
      datetime: now.toISOString(),
      timestamp: now.getTime(),
      requestId: requestId,
      generatedAt: now.toLocaleTimeString(),
    })
  } catch (error) {
    console.error("Error in time API:", error)
    return Response.json({ error: "Failed to generate time data" }, { status: 500 })
  }
}

