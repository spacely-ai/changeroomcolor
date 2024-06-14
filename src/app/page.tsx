import { Link } from "@/lib/router-events";
import { Palette } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b-2">
        <Link href="/" className="text-lg font-bold">
          <div className="flex gap-2 items-center">
            <Palette />
            <h1 className="font-bold">changeroomcolor.com</h1>
          </div>
        </Link>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[80rem] flex-col gap-4">
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <h1 className="font-heading text-4xl">changeroomcolor.com</h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground">
                Instant Room Makeover: Quickly Visualize New Colors in Your Space
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
