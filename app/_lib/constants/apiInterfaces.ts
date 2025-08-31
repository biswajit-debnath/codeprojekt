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
  amount?: number;
  currency?: string;
  productInfo?: object;
}

export interface PurchaseRequest {
  spuDetails: {
    product: string;
    price: number;
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
  statusPageRedirectUrl: string;
}

export interface PurchaseResponse {
  transactionId: string;
  phonePayRedirectUrl: string;
}
