export default [
  {
    path: "/medicamento",
    name: "medicamento",
    component: () => import("../../pages/medicamento/index"),
    redirect: { name: "medicamento.listar" },
    children: [
      {
        path: "",
        name: "medicamento.listar",
        component: () => import("../../pages/medicamento/listar"),
      },
      {
        path: "crear",
        name: "medicamento.crear",
        component: () => import("../../pages/medicamento/crear"),
      },
    ],
  },
];
