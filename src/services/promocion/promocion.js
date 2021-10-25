import axios from "axios";

const api = "promocion";

const promocion = {
  listar: () => axios.get(`${api}/`),
  crear: (model) => axios.post(`${api}/`, model),
};

export default promocion;
