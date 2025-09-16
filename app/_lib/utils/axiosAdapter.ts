import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { auth } from "../../../firebaseConfig";

interface RequestConfig extends AxiosRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  authToken?: string; // Optional auth token for authenticated requests
}

class AxiosAdapter {
  private static instance: AxiosAdapter;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      timeout: 45000, // 45 seconds
    });

    this.setupInterceptors();
  }

  public static getInstance(): AxiosAdapter {
    if (!AxiosAdapter.instance) {
      AxiosAdapter.instance = new AxiosAdapter();
    }
    return AxiosAdapter.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Prefer explicit authToken passed by callers
        const explicitToken = (config as any).authToken as string | undefined;
        if (explicitToken) {
          config.headers = config.headers || {};
          (config.headers as any)["Authorization"] = `Bearer ${explicitToken}`;
        } else {
          // If not explicitly provided, attach current Firebase ID token when available
          const currentUser = auth.currentUser;
          if (currentUser) {
            try {
              const token = await currentUser.getIdToken(/* forceRefresh */ false);
              if (token) {
                config.headers = config.headers || {};
                (config.headers as any)["Authorization"] = `Bearer ${token}`;
              }
            } catch (_e) {
              // Swallow token fetch errors here; request may still succeed without auth
            }
          }
        }

        // Add logs
        console.log(`Request made to ${config.url}`);
        // Store request start time
        (config as any).metadata = { startTime: new Date() };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Calculate and log response time
        const metadata = (response.config as any).metadata;
        if (metadata && metadata.startTime) {
          const endTime = new Date();
          const duration = endTime.getTime() - metadata.startTime.getTime();
          console.log(
            `Response from ${response.config.url} took ${duration} ms`
          );
        }
        return response;
      },
      async (error: AxiosError) => {
        // Calculate and log response time for errors
        if (error.config && (error.config as any).metadata?.startTime) {
          const endTime = new Date();
          const startTime = (error.config as any).metadata.startTime;
          const duration = endTime.getTime() - startTime.getTime();
          console.log(
            `Error response from ${error.config.url} took ${duration} ms`
          );
        }
        // Retry once on 401 by forcing a token refresh
        const originalRequest = error.config as any;
        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest.__isRetryRequest
        ) {
          try {
            const currentUser = auth.currentUser;
            if (currentUser) {
              const freshToken = await currentUser.getIdToken(true);
              if (freshToken) {
                originalRequest.__isRetryRequest = true;
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers["Authorization"] = `Bearer ${freshToken}`;
                return this.axiosInstance.request(originalRequest);
              }
            }
          } catch (_e) {
            // If refresh fails, fall through to reject
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async request<T>(config: RequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request(
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorMessage =
        typeof axiosError.response?.data === "object" &&
        axiosError.response?.data !== null
          ? (axiosError.response.data as { message?: string }).message
          : undefined;

      return new Error(
        errorMessage ||
          axiosError.message ||
          "An error occurred while making the request"
      );
    }
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
}

export const axiosAdapter = AxiosAdapter.getInstance();
