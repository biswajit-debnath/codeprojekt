import { axiosAdapter } from "../utils/axiosAdapter";
import { API_BASE_URLS, API_REQUESTS } from "../constants/apiConstants";
import { createUrl } from "../utils/helpers";

export interface ProductSPU {
  id: string;
  spu: string;
  cost_price: number;
  discount: string;
  price_inr: string;
  category: string;
}

export class BackendApiClient {
  private static instance: BackendApiClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = API_BASE_URLS.CODEPROJEKT_BACKEND;
  }

  public static getInstance(): BackendApiClient {
    if (!BackendApiClient.instance) {
      BackendApiClient.instance = new BackendApiClient();
    }
    return BackendApiClient.instance;
  }

  public async getProductSPUs(product: string): Promise<ProductSPU[]> {
    const config = {
      ...API_REQUESTS.GET_PRODUCT_SPUS,
      url: `${this.baseUrl}${createUrl(API_REQUESTS.GET_PRODUCT_SPUS.url, {
        product,
      })}`,
    };
    return axiosAdapter.request<ProductSPU[]>(config);
  }
}

export const vendorApiService = BackendApiClient.getInstance();
