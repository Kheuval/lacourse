export interface ApiRequest {
  url: string;
  method: string;
  accept: string;
  contentType: string;
  body: BodyInit | null;
  cacheable: boolean;
  expectResponseData: boolean;
  resourceType: string;
}

export interface ApiResponse {
  content: any;
  status: number;
}
