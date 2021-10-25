import axios from "axios";

const api = "medicamento";

const medicamento = {
  listar: () => axios.get(`${api}/`),
  crear: (model) => axios.post(`${api}/`, model),
};

export default medicamento;
