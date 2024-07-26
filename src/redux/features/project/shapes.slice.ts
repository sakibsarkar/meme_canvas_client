import { IShape } from "@/types/shape";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShapesState {
  shapes: IShape[];
  selectedShape: IShape | null;
}

const initialState: ShapesState = {
  shapes: [],
  selectedShape: null,
};

const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    setShapes(state, action: PayloadAction<IShape[]>) {
      state.shapes = action.payload;
    },
    addShape(state, action: PayloadAction<IShape>) {
      state.shapes.unshift(action.payload);
      state.selectedShape = action.payload;
    },
    updateShape(state, action: PayloadAction<IShape>) {
      const index = state.shapes.findIndex(
        (shape) => shape.id === action.payload.id
      );
      if (index !== -1) {
        state.shapes[index] = action.payload;
      }
    },
    removeShape(state, action: PayloadAction<string>) {
      state.shapes = state.shapes.filter(
        (shape) => shape.id !== action.payload
      );
      state.selectedShape = null;
    },
    setSelectedShape(state, action: PayloadAction<IShape | null>) {
      state.selectedShape = action.payload;
    },
    clearSelectedShape(state) {
      state.selectedShape = null;
    },
  },
});

export const {
  setShapes,
  addShape,
  updateShape,
  removeShape,
  setSelectedShape,
  clearSelectedShape,
} = shapesSlice.actions;

export default shapesSlice.reducer;
