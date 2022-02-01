import * as dfd from "danfojs-node";

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const dataFrameLength = (df: dfd.DataFrame): number => Number(df.count({axis:0}).iat(0)) ?? 0;

