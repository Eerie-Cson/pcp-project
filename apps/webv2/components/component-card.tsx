import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ComponentSpec {
  label: string
  value: string
}

interface ComponentCardProps {
  name: string
  manufacturer: string
  price: number
  imageUrl?: string
  specs: ComponentSpec[]
}

export function ComponentCard({ name, manufacturer, price, imageUrl, specs }: ComponentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="aspect-video relative bg-muted rounded-md overflow-hidden mb-3">
          {imageUrl ? (
            <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{name}</CardTitle>
        <Badge variant="secondary" className="w-fit mt-1">
          {manufacturer}
        </Badge>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{spec.label}:</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
