export interface ApiRequest {
  url: string;
  method: string;
  contentType: string;
  body: BodyInit | null;
  resourceType: string;
}

export interface ApiResponse {
  content: any;
  status: number;
}
