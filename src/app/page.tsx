"use client";

import { Button } from "@/components/ui/button";
import CompareSlider from "@/components/compare-slider";
import { Link } from "@/lib/router-events";
import { BrickWall, Palette } from "lucide-react";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { useState } from "react";
import ImageUploader from "@/components/image-uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";

interface StepIconProps {
  step: number;
  title: string;
}

function StepIcon({ step, title }: StepIconProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-black rounded-full flex justify-center items-center w-8 h-8">
        <p className="text-white font-bold">{step}</p>
      </div>
      <h3 className="text-xl font-semibold"> {title}</h3>
    </div>
  );
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [area, setArea] = useState<"wall" | "ceiling" | "floor">("wall");
  const [color, setColor] = useState<string>("#0543F5");

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
        <section id="title" className="space-y-6 pt-36">
          <div className="container flex max-w-[80rem] flex-col gap-4">
            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-center">
                <h1 className="font-heading text-4xl font-bold">
                  changeroomcolor.com
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground">
                  Instantly Visualize New Colors in Your Space. In just a few
                  clicks.
                </p>
                <div className="flex gap-4">
                  <Button className="w-48 mt-8">Try for free</Button>
                  <Button variant="outline" className="w-48 mt-8">
                    View API
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center w-full h-[300px] bg-red-500">
                <CompareSlider
                  firstImage="/landing/example-original.webp"
                  secondImage="/landing/example-result.png"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="powered-by" className="space-y-6 pt-48">
          <div className="container flex max-w-[80rem] flex-col gap-4 items-center">
            <h2 className="text-heading text-2xl font-bold">Powered By</h2>
            <div className="flex gap-4 w-full justify-evenly h-[100px]">
              <div className="w-[200px] relative h-full">
                <Image
                  src="/logo/spacely-ai-logo.png"
                  alt="Spacely AI Logo"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  quality={50}
                />
              </div>
              <div className="w-[200px] relative">
                <Image
                  src="/logo/next-js-logo.png"
                  alt="Next.js Logo"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  quality={50}
                />
              </div>
              <div className="w-[200px] relative">
                <Image
                  src="/logo/vercel-logo.jpeg"
                  alt="Vercel Logo"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  quality={50}
                />
              </div>
              <div className="w-[200px] relative">
                <Image
                  src="/logo/shadcn-ui-logo.png"
                  alt="Shadcn Logo"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  quality={50}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="generate" className="space-y-6 py-36">
          <div className="container flex max-w-[80rem] flex-col gap-4 items-center">
            <StepIcon step={1} title="Upload your room image" />
            <ImageUploader value={imageUrl} setValue={setImageUrl} />
            <StepIcon step={2} title="Select area to change the color" />
            <Select
              value={area}
              onValueChange={(v: "wall" | "floor" | "ceiling") => {
                setArea(v);
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="--- choose your area ---" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wall">Wall</SelectItem>
                <SelectItem value="floor">Floor</SelectItem>
                <SelectItem value="ceiling">Ceiling</SelectItem>
              </SelectContent>
            </Select>
            <StepIcon step={3} title="Choose the the color" />
            <Input
              className="w-[120px]"
              placeholder="HEX color"
              type="text"
              value={color}
              onChange={(e) =>
                setColor(
                  e.target.value[0] === "#"
                    ? e.target.value.slice(0, 7)
                    : `#${e.target.value.slice(0, 6)}`
                )
              }
            />
            <HexColorPicker color={color} onChange={setColor} />
            <Button className="w-[300px] mt-12">Generate</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
