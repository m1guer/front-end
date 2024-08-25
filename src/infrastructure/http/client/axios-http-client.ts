import axios from "axios";

import getToken from "@/models/http/get-token";
import type {
  HttpResponse,
  IHttpClient,
  IHttpRequest,
} from "@/models/http/http-client";
export const BACKEND_URL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";
interface CreateHeadersProps {
  token?: string | null;
  headers?: any;
}
export class AxiosHttpClient implements IHttpClient {
  private baseUrl: string | undefined;

  constructor() {
    this.baseUrl = BACKEND_URL;
  }
  private createHeaders({ token, headers }: CreateHeadersProps) {
    const tokenAuth = token ? { Authorization: `Token ${token}` } : null;
    return {
      "Content-Type": "application/json",
      ...tokenAuth,
      ...(headers && headers),
    };
  }

  async request(data: IHttpRequest): Promise<HttpResponse> {
    try {
      const response = await axios.request({
        baseURL: BACKEND_URL,
        url: data.url,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: this.createHeaders({
          token: await getToken(),
          headers: data.headers,
        }),
        timeoutErrorMessage: "timeout",
      });
      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (err: any) {
      return {
        statusCode: err?.response?.status,
        body: err?.response?.data,
      };
    }
  }
}
