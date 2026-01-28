import { MeasurementDataResponse } from "@/features/Camera/types";
import { GetAttachmentOptions } from "resend";

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
  userId: string;
  brand: string;
  analysisCode: string;
  analysisDate: string;
  typeCustom: UserCustomSizeType;
  fitSuggest: string;
  sizeSuggest: string;
  reliableRate: number;
  fitSuggestFromAI: GeminiAISuggestSizeResponse;
}
export type GeminiAISuggestSizeResponse = {
  measurementInsight?: {
    content: string;
  };
  productFitNote?: {
    content: string;
  };
  expectedFit?: {
    content: string;
  };
};
export interface DataToSaveBrandMeasure {
  brand: string;
  dataMeasure: MeasurementDataResponse;
  dataAnalysis: AISuggestSizeResponse;
}

export interface DataBrandMeasureResponse {
  userid: string;
  dataBrandAnalysis:DataToSaveBrandMeasure[];
}
export interface SendMailRequest {
  to: string;
  subject: string;
  body: string;
  attachments: Attachment;
}
export interface Attachment {
  filenames: string;
  mineType: string;
  base64: string;
}