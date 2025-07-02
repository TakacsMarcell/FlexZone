import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// A helyi tárolóból történő adatlekérés és a token beállítása
const getTokenFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  return currentUser?.accessToken;
};

// Beállítjuk a token-t a request-hez
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getTokenFromStorage() || ""}`, // Ha van token, hozzáadjuk
  },
});

// Token frissítése
export const updateUserRequestToken = () => {
  const token = getTokenFromStorage();
  if (token) {
    userRequest.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    // Ha nincs token, akkor üres header
    userRequest.defaults.headers.Authorization = "";
  }
};

