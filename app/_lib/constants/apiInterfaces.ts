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

export interface UserProfile {
  uid: string;
  profile: object;
  transactions: [];
  wallet: object;
}

export interface UserLogin {
  uid: string;
  profile: object;
  wallet: object;
}

export interface TransactionStatus {
  transactionId: string;
  stage: number;
  status: string;
  isFailed?: boolean;
  price_inr?: number;
  currency?: string;
  productInfo?: object;
  spuDetails?: {
    category: string;
    spu: string;
  };
}

export interface PurchaseRequest {
  spuDetails: {
    product: string;
    price: number;
    price_inr: number;
  };
  spuType: string;
  userDetails: {
    username: string;
    uid: string;
  };
  playerDetails: {
    userid: string;
    zoneid: string;
  };
  redirectUrl: string;
}

export interface PurchaseResponse {
  transactionId: string;
  gatewayRedirectUrl: string;
}
