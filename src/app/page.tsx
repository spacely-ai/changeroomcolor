"use client";
import { Button } from "@/components/ui/button";
import CompareSlider from "@/components/compare-slider";
import { Link } from "@/lib/router-events";
import { Download, Loader2, Palette } from "lucide-react";
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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { saveAs } from "file-saver";

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
      <h3 className="text-lg font-semibold md:text-xl"> {title}</h3>
    </div>
  );
}

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [area, setArea] = useState<"wall" | "ceiling" | "floor">("wall");
  const [color, setColor] = useState<string>("#0543F5");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultImageUrl, setResultImageUrl] = useState<string>("");
  const [isCompare, setIsCompare] = useState<boolean>(true);

  const { toast } = useToast();

  const handleGenerate = async () => {
    setResultImageUrl("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/generate", {
        imageUrl,
        area,
        color,
      });

      if (res.status === 200) {
        setResultImageUrl(res.data.imageUrl);
      } else {
        console.error("Failed to generate image");
        toast({
          title: "Error: Failed to generate image!",
          description: "Something went wrong, Please try again later.",
          duration: 1000,
        });
      }
    } catch {
      console.error("Failed to generate image");
      toast({
        title: "Error: Failed to generate image!",
        description: "Something went wrong, Please try again later.",
        duration: 1000,
      });
    }

    setIsLoading(false);
  };

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
        <section id="title" className="space-y-6 pt-24 md:pt-36">
          <div className="container flex max-w-[80rem] flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="font-heading text-3xl md:text-4xl font-bold">
                  changeroomcolor.com
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground">
                  Instantly Visualize New Colors in Your Space. In just a few
                  clicks.
                </p>
                <div className="flex gap-1 md:gap-4 flex-col md:flex-row mt-8">
                  <Link href="#generate">
                    <Button className="w-48">Try for free</Button>
                  </Link>
                  <Link
                    href="https://docs.enterprise.spacely.ai/spacely-ai-enterprise/product-visualization-api/color-transfer"
                    target="_blank"
                  >
                    <Button variant="outline" className="w-48 ">
                      View API
                    </Button>
                  </Link>
                </div>
                <Link
                  href={"https://www.spacely.ai/contact"}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 mt-8"
                >
                  Contact Us
                </Link>
              </div>
              <div className="flex justify-center items-center w-full h-[300px]">
                <CompareSlider
                  firstImage="/landing/example-original.webp"
                  secondImage="/landing/example-result.png"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="powered-by" className="space-y-6 pt-24 md:pt-48">
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
                  src="/logo/bytescale-logo.png"
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
        <section id="generate" className="space-y-6 pt-24 md:pt-28">
          <div className="container flex max-w-[80rem] flex-col gap-6 items-center">
            <StepIcon step={1} title="Upload your room image" />
            <div className="max-w-[500px]">
              <ImageUploader value={imageUrl} setValue={setImageUrl} />
            </div>
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
            <Button
              disabled={!imageUrl || !area || !color || isLoading}
              className="w-[300px] mt-12"
              onClick={handleGenerate}
            >
              {isLoading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
              Generate (~30 seconds)
            </Button>
            {resultImageUrl && (
              <div className="w-full md:w-[500px] flex flex-col items-center justify-center mt-12">
                <div className="w-full flex justify-between">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-lg font-semibold">Result</h3>
                    <Button
                      size="sm"
                      onClick={() => {
                        saveAs(resultImageUrl, "result.png");
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Switch
                      checked={isCompare}
                      onCheckedChange={(e) => {
                        setIsCompare(e);
                      }}
                    />
                    <p>Compare</p>
                  </div>
                </div>
                <div className="relative w-full h-[250px] md:h-[350px] mt-4 rounded-lg">
                  {!isCompare && (
                    <Image
                      src={resultImageUrl}
                      alt="Result Image"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                      className="rounded-lg"
                    />
                  )}
                  {isCompare && (
                    <CompareSlider
                      firstImage={imageUrl}
                      secondImage={resultImageUrl}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        <section id="open-source" className="container pt-24 pb-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-6xl">
              Open Source
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              This project is open source and the code available on{" "}
              <Link
                href={"https://github.com/spacely-ai/changeroomcolor"}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Github.
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
