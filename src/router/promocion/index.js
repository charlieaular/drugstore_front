export default [
  {
    path: "/promocion",
    name: "promocion",
    component: () => import("../../pages/promocion/index"),
    redirect: { name: "promocion.listar" },
    children: [
      {
        path: "",
        name: "promocion.listar",
        component: () => import("../../pages/promocion/listar"),
      },
      {
        path: "crear",
        name: "promocion.crear",
        component: () => import("../../pages/promocion/crear"),
      },
    ],
  },
];
