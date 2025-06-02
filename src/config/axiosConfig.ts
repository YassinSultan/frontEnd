import axios from "axios";

// إنشاء instance من axios بإعدادات أساسية
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Updated to match your API structure
  timeout: 10000, // 10 ثواني مهلة للطلبات
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة Authorization header تلقائيًا لو عندك توكن محفوظ مثلاً في localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// منع تكرار نفس الطلب (بسيط جداً)
// فكرة: تخزن الطلبات الجارية وتمنع إرسال طلب مكرر قبل انتهاء الطلب السابق
const pendingRequests = new Map();

axiosInstance.interceptors.request.use((config) => {
  const key = `${config.method}:${config.url}`;

  if (pendingRequests.has(key)) {
    // ممكن ترجع Promise مرفوض أو تلغي الطلب السابق، حسب حاجتك
    return Promise.reject(new axios.Cancel(`Request cancelled: ${key}`));
  } else {
    pendingRequests.set(key, true);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const key = `${response.config.method}:${response.config.url}`;
    pendingRequests.delete(key);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // طلب ملغي بسبب التكرار
      console.warn(error.message);
      return Promise.reject(error);
    }
    if (error.config) {
      const key = `${error.config.method}:${error.config.url}`;
      pendingRequests.delete(key);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
