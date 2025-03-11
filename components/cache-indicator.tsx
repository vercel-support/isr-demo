import { Badge } from "@/components/ui/badge"

interface CacheIndicatorProps {
  type: string
  color: "blue" | "green" | "purple" | "orange"
  generatedAt: string
  requestId: string
}

export function CacheIndicator({ type, color, generatedAt, requestId }: CacheIndicatorProps) {
  const colorClasses = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={colorClasses[color]}>
          {type}
        </Badge>
        <span className="text-sm text-muted-foreground">Generated at: {generatedAt}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        Request ID: <code className="bg-muted px-1 rounded">{requestId}</code>
      </div>
    </div>
  )
}

