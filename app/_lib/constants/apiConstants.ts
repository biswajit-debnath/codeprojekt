export const API_BASE_URLS = {
  CODEPROJEKT_BACKEND: process.env.CODEPROJEKT_BACKEND_BASE_URL,
} as const;

export const API_ENDPOINTS = {
  PRODUCT_SPUS: "/api/product/:product/spus",
  PLAYER_IGN: "/api/user/playerIGN",
  PURCHASE_SPU: "/api/payment/:spuId",
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
} as const;
