import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Cpu, HardDrive, Package, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Package className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h2 className="text-5xl font-bold mb-4 text-balance">
            Build Your Dream PC
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Choose from thousands of components with real-time compatibility
            checking and intelligent recommendations
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                Start Building
              </Button>
            </Link>
            <Link href="/components">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent"
              >
                <Cpu className="h-5 w-5" />
                Browse Components
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <Cpu className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Extensive Component Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Browse thousands of CPUs, GPUs, motherboards, and more from top
                manufacturers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-Time Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our intelligent system checks compatibility as you build,
                preventing costly mistakes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <HardDrive className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Save & Share Builds</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create an account to save your builds and share them with the
                community
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
