import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClientTime from "@/components/client-time"
import OnDemandISR from "@/components/on-demand-isr"
import { ReloadButton } from "@/components/reload-button"

// For on-demand ISR, we want to cache the page until explicitly revalidated
export const dynamic = 'auto'
// Set to false to disable automatic revalidation
export const revalidate = false

export default function OnDemandPage() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">On-Demand ISR Comparison</h2>
      <div className="flex justify-center mb-4">
        <ReloadButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Client-Side Rendering</CardTitle>
            <CardDescription>Time fetched on the client-side using useEffect</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientTime />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On-Demand ISR</CardTitle>
            <CardDescription>Revalidates when manually triggered</CardDescription>
          </CardHeader>
          <CardContent>
            <OnDemandISR />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

