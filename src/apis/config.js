import axios from "axios";
// import { store } from "../../src/store/slices/languageSlice.js"; // Adjust path to your store file
import store from '/src/store/store.js';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_APP_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// Add an interceptor to dynamically update the language parameter for each request
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const language = state.languages.language;

  // Debugging: Log the language being set
  console.log("Interceptor - Language being set:", language);
  console.log("Interceptor - Full request config:", config);

  config.params = {
    ...config.params,
    language,
  };
  return config;
});

export default axiosInstance;
