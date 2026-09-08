export type InspectionType =
  | "move_in"
  | "move_out";


export type Severity =
  | "None"
  | "Low"
  | "Medium"
  | "High";


export interface Prediction {
  id: number;
  label: string;
  confidence: number;
  severity: Severity;
  created_at: string;
}


export interface InspectionImage {
  id: number;
  image_url: string;
  uploaded_at: string;
  prediction: Prediction | null;
}


export interface Room {
  id: number;
  name: string;
  images: InspectionImage[];
}


export interface Inspection {
  id: number;
  property_name: string;
  inspection_type: InspectionType;
  status: string;
  created_at: string;
  rooms: Room[];
}


export interface CreatedInspection {
  id: number;
  property_name: string;
  inspection_type: InspectionType;
  status: string;
}


export interface UploadedImageResponse {
  image: {
    id: number;
    room_id: number;
    file_path: string;
    uploaded_at: string;
  };

  prediction: Prediction;

  top_predictions: {
    class: string;
    confidence: number;
  }[];
}