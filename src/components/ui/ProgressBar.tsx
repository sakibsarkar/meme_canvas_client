// components/ProgressBar.tsx
import React from "react";
import { MdDoneAll } from "react-icons/md";
import { TbShoppingBagHeart, TbTruckDelivery } from "react-icons/tb";
const steps = [
  {
    label: "your order is under Proccesing",
    step: 1,
    Icon: TbShoppingBagHeart,
  },
  { label: "Your is product on the way", step: 2, Icon: TbTruckDelivery },
  { label: "Deliverd", step: 3, Icon: MdDoneAll },
];

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 mt-[20px]">
      {steps.map(({ Icon, label, step }, index) => (
        <div
          key={step}
          className={`${index === 2 ? "" : "flex-1"} flex items-start flex-col`}
        >
          <div className={` flex items-center w-full`}>
            <div
              className={`flex items-center justify-center w-[50px] h-[50px] rounded-full ${
                currentStep >= step
                  ? "bg-green-500 text-white"
                  : "bg-blue-200 text-primaryTxt"
              }`}
            >
              {<Icon className="text-[20px]" />}
            </div>
            {index < steps.length - 1 && (
              <>
                <div
                  className={`flex-1 h-1 ml-2 ${
                    currentStep >= step ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></div>
                <div className="flex-1">
                  <div
                    className={`h-1 ${
                      currentStep >= step + 1 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </>
            )}
          </div>
          <p className="w-full text-center md:text-start text-[15px] font-[500] text-primaryTxt mt-[10px]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
