// shapesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --> canvas max zooming values--->
export const zoovVal = {
  maxZoomVal: 190,
  minZoomVal: 10,
} as const;

interface ProjectState {
  projectName: string;
  canvas: {
    width: number;
    height: number;
  };
  zoom: number; // zoom ammount maxvalue 100%
}

const initialState: ProjectState = {
  projectName: "",
  canvas: {
    width: 0,
    height: 0,
  },
  zoom: 100,
};

const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<ProjectState>) {
      return action.payload;
    },
    setProjectName(state, action: PayloadAction<string>) {
      state.projectName = action.payload;
    },
    setScale(state, action: PayloadAction<number>) {
      const willAmount = state.zoom + action.payload;
      const { maxZoomVal, minZoomVal } = zoovVal;

      if (willAmount > maxZoomVal) {
        const delta = maxZoomVal - state.zoom;
        state.zoom += delta;
        return;
      }
      if (willAmount < minZoomVal) {
        state.zoom = minZoomVal;
        return;
      } else {
        state.zoom += action.payload;
      }
    },
    setZoomScale(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
  },
});

export const { setProjectName, setProject, setScale, setZoomScale } =
  shapesSlice.actions;

export default shapesSlice.reducer;
