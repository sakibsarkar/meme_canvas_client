import { ArrowRight } from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";

const CheckEmail = ({
  setIsSent,
}: {
  setIsSent: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [timer, setTimer] = useState(120); // timer in seconds
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((timer) => (timer ? timer - 1 : 0));
    }, 1000);

    setTimerId(timerId);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (!timer) {
      clearInterval(timerId);
    }
  }, [timer, timerId]);

  return (
    <div className="w-[500px] shadow-md p-[20px] rounded-[15px] ">
      <h2 className="text-[25px] text-primaryTxt font-[700]">
        We have sent you a email
      </h2>
      <p className="text-[14px] text-primaryTxt">
        Please check your email and you will findout a link to recover your
        password. the link will expire in 5 minute
      </p>

      <div className="w-full flex items-center justify-end gap-[10px] mt-[20px]">
        <p>Didn&apos;t recive any Mail?</p>{" "}
        <button
          onClick={() => setIsSent(false)}
          className="bg-primaryMat text-white py-[4px] px-[8px] rounded-[5px] disabled:bg-primaryMat/25 disabled:text-primaryMat center gap-[5px]"
          disabled={!!timer}
        >
          {timer
            ? `Resend in ${Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}:${Math.floor(timer % 60)
                .toString()
                .padStart(2, "0")}`
            : `Resend`}
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;
