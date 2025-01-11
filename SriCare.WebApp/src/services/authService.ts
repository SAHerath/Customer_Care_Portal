import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const tokenName = "jwtToken";

// Create an Axios instance
const client: AxiosInstance = axios.create({
  baseURL: "https://localhost:7155",
  timeout: 30000,
  // withCredentials: true,
  maxRedirects: 0,
  headers: { Accept: "application/json" },
});

// Add request interceptor
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request sent:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Response received:", response);

    const token = response.data?.token;
    if (token) {
      localStorage.setItem(tokenName, token);
      // document.cookie = `jwtToken=${token}; path=/; secure; httponly; samesite=strict`;
      console.log("JWT token saved:", token);
      delete response.data.token;
    }

    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      console.log("Unauthorized access");
    } else if (status === 404) {
      console.log("Post not found");
    } else if (status >= 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("An error occurred:", error.message);
    }

    return Promise.reject(error);
  }
);

export const postRequest = async (
  endpoint: string,
  data: object
): Promise<AxiosResponse | null> => {
  try {
    const response: AxiosResponse = await client.post(endpoint, data);
    return response;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    return null;
  }
};

export const getRequest = async (
  endpoint: string,
  params?: object
): Promise<AxiosResponse | null> => {
  try {
    const response: AxiosResponse = await client.get(endpoint, { params });
    return response;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    return null;
  }
};

// const getToken = () => {
//   const match = document.cookie.match(new RegExp('(^| )' + tokenName + '=([^;]+)'));
//   return match ? match[2] : null;
// };

const getToken = () => {
  return localStorage.getItem(tokenName);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now(); // Check if token is expired
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

export const getCurrentUser = (): string => {
  const token = getToken();
  if (!token) return "No User";

  const payload = JSON.parse(atob(token.split(".")[1]));
  // const user = payload.name.split(" ")[0];
  console.log("currentUser: ", payload.name);
  return payload.name;
};

export const logout = (): void => {
  localStorage.removeItem(tokenName);
};
