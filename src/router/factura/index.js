export default [
  {
    path: "/factura",
    name: "factura",
    component: () => import("../../pages/factura/index"),
    redirect: { name: "factura.listar" },
    children: [
      {
        path: "",
        name: "factura.listar",
        component: () => import("../../pages/factura/listar"),
      },
      {
        path: "crear",
        name: "factura.crear",
        component: () => import("../../pages/factura/crear"),
      },
      {
        path: "dashboard",
        name: "factura.dashboard",
        component: () => import("../../pages/factura/dashboard"),
      },
    ],
  },
];
