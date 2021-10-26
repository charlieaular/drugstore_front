import axios from "axios";
axios.defaults.baseURL =
  process.env.VUE_BACKEND_URL || "http://localhost:3000/v1";
