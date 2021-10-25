import axios from "axios";

const api = "factura";

const factura = {
  listar: () => axios.get(`${api}/`),
  crear: (model) => axios.post(`${api}/`, model),
};

export default factura;
