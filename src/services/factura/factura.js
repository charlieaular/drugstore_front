import axios from "axios";

const api = "factura";

const factura = {
  listar: () => axios.get(`${api}/`),
  crear: (model) => axios.post(`${api}/`, model),
  grafica: (params) => axios.get(`${api}/grafica`, { params }),
};

export default factura;
