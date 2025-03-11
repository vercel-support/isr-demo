import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import OnDemandISR from "@/components/on-demand-isr"

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Instance-Specific Revalidation Debug</h2>
      
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-muted-foreground mb-4">
          This page demonstrates that on-demand revalidation only affects the specific instance being revalidated.
          Each card below is a separate instance of the OnDemandISR component with its own unique instance ID.
          When you click &quot;Revalidate Now&quot; on one card, only that specific instance should be revalidated.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Instance 1</CardTitle>
            <CardDescription>On-demand ISR with instance-specific revalidation</CardDescription>
          </CardHeader>
          <CardContent>
            <OnDemandISR />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instance 2</CardTitle>
            <CardDescription>On-demand ISR with instance-specific revalidation</CardDescription>
          </CardHeader>
          <CardContent>
            <OnDemandISR />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instance 3</CardTitle>
            <CardDescription>On-demand ISR with instance-specific revalidation</CardDescription>
          </CardHeader>
          <CardContent>
            <OnDemandISR />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instance 4</CardTitle>
            <CardDescription>On-demand ISR with instance-specific revalidation</CardDescription>
          </CardHeader>
          <CardContent>
            <OnDemandISR />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

