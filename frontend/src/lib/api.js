import axios from "axios";

export const API = axios.create({
  baseURL: "https://gst-reconciliation-system.onrender.com",
});