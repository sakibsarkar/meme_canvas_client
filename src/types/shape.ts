export type TFontWeight = 300 | 400 | 500 | 600 | 700;

export interface ITextStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: TFontWeight;
  fontStyle?: "italic" | "";
  textDecoration?: "underline";
  textAlign?: "center" | "start" | "end";
}

export interface IShape {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
  color: string;
  rotation: number;
  type: "rectangle" | "circle" | "image" | "text";
  text?: string;
  radius: number;
  imageUrl?: string;
  zIndex: number;
  textStyle?: ITextStyle;
}


