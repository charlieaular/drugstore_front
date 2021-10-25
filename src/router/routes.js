import factura from "./factura";
import medicamento from "./medicamento";
import promocion from "./promocion";

export default [
  {
    path: "/",
    name: "inicio",
    redirect: { name: "factura" },
  },
  ...factura,
  ...medicamento,
  ...promocion,
];
