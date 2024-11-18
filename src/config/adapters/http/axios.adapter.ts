import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";

interface Options {
  baseURL: string;
}

export class AxiosAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    // Crea la instancia de Axios con la URL base
    this.axiosInstance = axios.create({ baseURL: options.baseURL });

    // Configura el interceptor para añadir el token en todas las solicitudes
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = "cf3851069b6ad0c13f365cda737b71e349c2ee94a9203d07930c23009eaeafdc"; // Token estático o dinámico
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Manejo de errores en el interceptor
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const data = await this.axiosInstance.get(url);
    return data.data;
  }

  async post<T>(url: string, body: Record<string, unknown>): Promise<T> {
    const data = await this.axiosInstance.post(url, body);
    return data.data;
  }

  async put<T>(url: string, body: Record<string, unknown>): Promise<T> {
    const data = await this.axiosInstance.put(url, body);
    return data.data;
  }
}
