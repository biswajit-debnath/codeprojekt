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
