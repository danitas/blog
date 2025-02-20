import axios, { AxiosError, AxiosResponse, Method } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // You can change this to your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosRequest = async <T, D = {}>(
  url: string,
  method: Method = "get", // Default to GET
  data?: D,
): Promise<T | null> => {
  try {
    const config = {
      method,
      url,
      ...(method !== "get" && data ? { data } : {}),
    };

    const response: AxiosResponse<T> = await axiosInstance.request(config);

    console.log("Success:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error(`Error making ${method} request to ${url}:`, error);

    if (error instanceof AxiosError) {
      if (error.response) {
        console.error(
          "Response Error:",
          error.response.status,
          error.response.data,
        );

        const errorMessages: { [key: number]: string } = {
          404: "Resource not found.",
          500: "Internal server error.",
        };

        const errorMessage = errorMessages[error.response.status];
        if (errorMessage) {
          console.error(errorMessage);
        }
      } else if (error.request) {
        console.error("Request Error:", error.message);
        console.error("No response received. Check your network connection.");
      } else {
        console.error("Setup Error:", error.message);
      }
    } else {
      console.error("An unknown error occurred:", error);
    }

    return null;
  }
};

export default axiosInstance;
