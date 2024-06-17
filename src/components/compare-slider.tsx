"use client";;
import { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

type Props = {
  firstImage: string;
  secondImage: string;
};

const ImageCompareDisplay = ({ firstImage, secondImage }: Props) => {
  const [positionEnum, setPositionEnum] = useState<
    "LEFT" | "RIGHT" | "IN_BETWEEN"
  >("IN_BETWEEN");
  return (
    <div className="relative group">
      {positionEnum !== "LEFT" && (
        <div className="absolute group-hover:hidden left-4 top-1/2 bg-primary/90 py-2 px-4 font-medium z-50 text-primary-foreground select-none text-sm">
          Before
        </div>
      )}
      {positionEnum !== "RIGHT" && (
        <div className="absolute group-hover:hidden right-4 top-1/2 bg-primary/90 py-2 px-4 font-medium z-50 text-primary-foreground select-none text-sm">
          After
        </div>
      )}
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={firstImage} alt="Input Image" />}
        itemTwo={
          <ReactCompareSliderImage src={secondImage} alt="Output Image" />
        }
        onPositionChange={(position) => {
          if (position < 10) setPositionEnum("LEFT");
          else if (position > 90) setPositionEnum("RIGHT");
          else setPositionEnum("IN_BETWEEN");
        }}
        className="rounded-lg"
      />
    </div>
  );
};

export default ImageCompareDisplay;
