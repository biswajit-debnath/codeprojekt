import { axiosAdapter } from "../utils/axiosAdapter";
import { API_BASE_URLS, API_REQUESTS } from "../constants/apiConstants";
import { createUrl } from "../utils/helpers";
import { get } from "lodash";
import {
  ProductSPU,
  PlayerIGN,
  UserLogin,
  UserProfile,
  TransactionStatus,
  PurchaseRequest,
  PurchaseResponse,
} from "../constants/apiInterfaces";
export class BackendApiClient {
  private static instance: BackendApiClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = API_BASE_URLS.CODEPROJEKT_BACKEND;
    console.log(`Backend API Base URL11: ${this.baseUrl}`);
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

  public async signinUser(googleUserInfo: object): Promise<UserLogin> {
    const config = {
      ...API_REQUESTS.USER_LOGIN,
      url: `${this.baseUrl}${API_REQUESTS.USER_LOGIN.url}`,
      data: { googleUserInfo },
    };
    const response = await axiosAdapter.request<UserLogin>(config);
    return get(response, "data", {
      uid: "",
      profile: {},
      wallet: {},
    });
  }

  public async getUserProfile(uid: string): Promise<UserProfile> {
    const config = {
      ...API_REQUESTS.USER_PROFILE,
      url: `${this.baseUrl}${API_REQUESTS.USER_PROFILE.url}/${uid}`,
    };
    const response = await axiosAdapter.request<UserProfile>(config);
    return get(response, "data", {
      uid: "",
      profile: {},
      transactions: [],
      wallet: {},
    });
  }

  public async getTransactionStatus(transactionId: string): Promise<TransactionStatus> {
    const config = {
      ...API_REQUESTS.GET_TRANSACTION_STATUS,
      url: `${this.baseUrl}${createUrl(API_REQUESTS.GET_TRANSACTION_STATUS.url, {
        transactionId,
      })}`,
    };
    const response = await axiosAdapter.request<TransactionStatus>(config);
    return get(response, "data", {
      transactionId: "",
      stage: 1,
      status: "pending",
      amount: 0,
      currency: "INR",
      productInfo: {},
    });
  }

  public async purchaseSPU(spuId: string, purchaseData: PurchaseRequest): Promise<PurchaseResponse> {
    const config = {
      ...API_REQUESTS.PURCHASE_SPU,
      url: `${this.baseUrl}${createUrl(API_REQUESTS.PURCHASE_SPU.url, {
        spuId,
      })}`,
      data: purchaseData,
    };
    const response = await axiosAdapter.request<PurchaseResponse>(config);
    return get(response, "data", {
      transactionId: "",
      gatewayRedirectUrl: ""
    });
  }
}

export const vendorApiService = BackendApiClient.getInstance();
