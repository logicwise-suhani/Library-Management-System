import axios from "axios";

const url = import.meta.env.VITE_API_URL

export const apiClient = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export async function login(form) {
    try {
        const res = await apiClient.post("/auth/sign-in", form);
        console.log("FULL RESPONSE:", res.data);

        return {
            token: res.data.data.accessToken,
            role: res.data.data.role,
            name: res.data.data.name,
            email: res.data.data.email,
        };

    } catch (error) {
        if (error.response?.status === 400) {
            throw error.response?.data?.message || "Bad Request";
        }

        if (error.response?.status === 401) {
            throw error.response?.data?.message || "Unauthorized";
        }

        throw error.response?.data?.message || "Something went wrong";
    }
}