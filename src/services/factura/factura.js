import axios from "axios";

const api = "factura";

const factura = {
  listar: () => axios.get(`${api}/`),
  crear: (model) => axios.post(`${api}/`, model),
  grafica: (params) => axios.get(`${api}/grafica`, { params }),
  simular: (params) => axios.get(`${api}/simular`, { params }),
};

export default factura;
