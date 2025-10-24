import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6">
      <section className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Welcome to L2L
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Build faster with Next.js + TypeScript + Tailwind.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/login">
            <Button size="lg">Get Started</Button>
          </Link>
          
          <Link href="/dashboard/student">
            <Button variant="outline" size="lg">Student Dashboard</Button>
          </Link>
          <Link href="/dashboard/investor">
            <Button variant="outline" size="lg">Investor Portal</Button>
          </Link>
          <Link href="/dashboard/developer">
            <Button variant="outline" size="lg">Developer Console</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
