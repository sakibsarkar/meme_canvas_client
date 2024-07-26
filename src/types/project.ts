import { IShape } from "./shape";

export interface IProjects {
  projectName: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface IProject {
  projectName: string;
  canvas: {
    width: number;
    height: number;
  };
  shapes: IShape[] | [];
}
