import axios from "axios";

const url = import.meta.env.VITE_API_URL

export const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let message = "Something went wrong";
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    message = error.response.data?.message || "Bad Request";
                    break;

                case 401:
                    message = error.response.data?.message || "Unauthorized";
                    break;

                case 403:
                    message = error.response.data?.message || "Forbidden";
                    break;

                case 404:
                    message = error.response.data?.message || "Resource Not Found";
                    break;

                case 500:
                    message = error.response.data?.message || "Internal Server Error";
                    break;

                default:
                    message = error.response.data?.message || message;
            }
        }
        else if (error.request) {
            message = "Network error. Please check your internet connection.";
        }
        return Promise.reject(message);
    }
);

export async function login(form) {
    const res = await apiClient.post("/auth/sign-in", form);
    console.log("FULL RESPONSE:", res.data);

    return {
        token: res.data.data.accessToken,
        role: res.data.data.role,
        name: res.data.data.name,
        email: res.data.data.email,
    };
}