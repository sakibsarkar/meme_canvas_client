declare module "react-range-slider-input" {
    import * as React from "react";
  
    interface RangeSliderProps {
      min?: number;
      max?: number;
      step?: number;
      value?: [number, number];
      defaultValue?: [number, number];
      onInput?: (value: [number, number]) => void;
    }
  
    const RangeSlider: React.FC<RangeSliderProps>;
  
    export default RangeSlider;
  }