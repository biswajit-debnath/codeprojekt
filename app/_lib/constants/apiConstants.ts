export const API_BASE_URLS = {
  CODEPROJEKT_BACKEND:
    (process.env.CODEPROJEKT_BACKEND_BASE_URL as string) ||
    "https://api.codeprojekt.shop",
} as const;

export const API_ENDPOINTS = {
  PRODUCT_SPUS: "/v1/product/:product/spus",
  PLAYER_IGN: "/v1/user/playerIGN",
  PURCHASE_SPU: "/v1/payment/purchase/:spuId",
  USER_LOGIN: "/v1/user/login/google",
  USER_PROFILE: "/v1/user/profile",
  TRANSACTION_STATUS: "/v1/payment/transaction/:transactionId/status",
} as const;

export const API_HEADERS = {
  JSON: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  FORM_URLENCODED: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
} as const;

export const API_REQUESTS = {
  GET_PRODUCT_SPUS: {
    method: "GET",
    url: API_ENDPOINTS.PRODUCT_SPUS,
    headers: API_HEADERS.JSON,
  },
  GET_PLAYER_IGN: {
    method: "GET",
    url: API_ENDPOINTS.PLAYER_IGN,
    headers: API_HEADERS.JSON,
  },
  PURCHASE_SPU: {
    method: "POST",
    url: API_ENDPOINTS.PURCHASE_SPU,
    headers: API_HEADERS.JSON,
  },
  USER_LOGIN: {
    method: "POST",
    url: API_ENDPOINTS.USER_LOGIN,
    headers: API_HEADERS.JSON,
  },
  USER_PROFILE: {
    method: "GET",
    url: API_ENDPOINTS.USER_PROFILE,
    headers: API_HEADERS.JSON,
  },
  GET_TRANSACTION_STATUS: {
    method: "GET",
    url: API_ENDPOINTS.TRANSACTION_STATUS,
    headers: API_HEADERS.JSON,
  },
} as const;
