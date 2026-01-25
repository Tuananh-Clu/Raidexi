import { MeasurementDataResponse } from "@/features/Camera/types";

export interface AISuggestSizeType {
  brand: string;
  dataMeasure: MeasurementDataResponse;
  userCustom: UserCustomSizeType;
}
export type UserCustomSizeType = {
  gender: string;
  typeProduct: string;
  sizeOutput: string;
};
export interface AISuggestSizeResponse {
  analysisCode: string;
  analysisDate: string;
  typeCustom: string;
  fitSuggest: string;
  sizeSuggest: string;
  reliableRate: number;
  fitSuggestFromAI: GeminiAISuggestSizeResponse;
}
export type GeminiAISuggestSizeResponse = {
  measureInsight: {
    content: string;
  };
  productFitInsight: {
    content: string;
  };
  expectedFit: {
    content: string;
  };
};