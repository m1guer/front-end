import ApiFactory from "@/infrastructure/http/factories/ApiFactory";
import type { HttpResponse } from "@/models/http/http-client";
import { GetSalesResponseDTO } from "./dto/responses/get-sales-response-dto";
import { FiltersResponseDTO } from "./dto/responses/filters-response-dto";
export default class SalesService {
  private httpClient = ApiFactory();

  public async get(
    data?: SalesQueryParamsRequestDTO,
  ): Promise<HttpResponse<GetSalesResponseDTO[]>> {
    return this.httpClient.request({
      url: "api/vendas/relatorio/",
      method: "get",
      params: data,
    });
  }
  public async export(
    data?: SalesQueryParamsRequestDTO,
  ): Promise<HttpResponse<any>> {
    return this.httpClient.request({
      url: "api/vendas/export/",
      method: "get",
      params: data,
    });
  }
  public async filters(): Promise<HttpResponse<FiltersResponseDTO>> {
    return this.httpClient.request({
      url: "api/vendas/avaible_filters/",
      method: "get",
    });
  }
}
