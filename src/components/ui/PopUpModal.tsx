import React, { ReactNode, SetStateAction } from "react";

interface PropsType {
  children: ReactNode;
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
}

const PopUpModal: React.FC<PropsType> = ({ children, state, setState }) => {
  return (
    <>
      {state ? (
        <>
          <div className="w-full h-full fixed top-0 left-0 center z-[999]">
            <div
              className="w-full h-full left-0 top-0 absolute z-[99] backdrop-blur-[5px]"
              onClick={() => setState(false)}
            ></div>

            <div className="z-[100] relative overflow-auto h-[90vh] smoothBar">
              {children}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PopUpModal;
