import { setZoomScale, zoovVal } from "@/redux/features/project/project.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import "react-range-slider-input/dist/style.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
const BottomBar = () => {
  const { zoom, canvas } = useAppSelector((state) => state.project);
  const { selectedShape } = useAppSelector((state) => state.shapes);
  const dispatch = useAppDispatch();
  return (
    <div className="h-[50px] w-full py-[5px] px-[10px] flex items-center justify-between bg-white border-t-[1px] border-borderColor">
      <div className="center gap-[10px]">
        <p className="text-primaryTxt text-[16px]">Zoom Scale</p>
        <Slider
          className="w-[350px]"
          value={zoom}
          max={zoovVal.maxZoomVal}
          min={zoovVal.minZoomVal}
          step={10}
          onChange={(e) => dispatch(setZoomScale(Number(e)))}
        />

        <span className="text-primaryTxt text-[16px]">{zoom.toFixed(2)}%</span>
      </div>
      <div className="center gap-[16px] text-[13px]">
        <div className="center gap-[5px] text-primaryTxt">
          <span>Canvas: </span>
          <p>
            <span className="font-[700]">
              {canvas.height}X{canvas.width}
            </span>{" "}
            px
          </p>
        </div>

        <div className="center gap-[5px]">
          {selectedShape ? (
            <>
              <p>Position:</p>
              <p>
                <span className="font-[700]">x:</span>{" "}
                {selectedShape.x.toFixed(0)}px
              </p>
              <p>
                <span className="font-[700]">y:</span>{" "}
                {selectedShape.y.toFixed(0)}px
              </p>
            </>
          ) : (
            <>
              <p>Position:</p>
              <p>
                <span className="font-[700]">x:</span> 0px
              </p>
              <p>
                <span className="font-[700]">y:</span> 0px
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
