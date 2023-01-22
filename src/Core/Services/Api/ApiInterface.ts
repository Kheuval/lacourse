export interface ApiRequest {
  url: string;
  method: string;
  contentType: string;
  body: BodyInit | null;
}

export interface ApiResponse {
  content: any;
  status: number;
}
