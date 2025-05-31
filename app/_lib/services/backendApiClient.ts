import { axiosAdapter } from "../utils/axiosAdapter";
import { API_BASE_URLS, API_REQUESTS } from "../constants/apiConstants";
import { createUrl } from "../utils/helpers";
import { get } from "lodash";

export interface ProductSPU {
  id: string;
  spu: string;
  cost_price: number;
  discount: string;
  price_inr: string;
  category: string;
}

export interface PlayerIGN {
  code: string;
  username: string;
  zone: 1;
  change_price: string;
  use: string;
  type: string;
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
    const response = await axiosAdapter.request<ProductSPU[]>(config);
    return get(response, "data", []);
  }

  public async getplayerIGN(
    userid: string,
    zoneid: string
  ): Promise<PlayerIGN> {
    const config = {
      ...API_REQUESTS.GET_PRODUCT_SPUS,
      url: `${this.baseUrl}${API_REQUESTS.GET_PLAYER_IGN.url}?userid=${userid}&zoneid=${zoneid}`,
    };
    const response = await axiosAdapter.request<PlayerIGN>(config);
    return get(response, "data", {
      code: "",
      username: "",
      zone: 1,
      change_price: "",
      use: "",
      type: "",
    });
  }
}

export const vendorApiService = BackendApiClient.getInstance();
