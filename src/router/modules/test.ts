export default [
  {
    path: "/test1",
    name: "test1",
    component: () => import("@/views/test/index-test1.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    component: () => import("@/views/test/index-test2.vue"),
  },
  {
    path: "/test3",
    name: "test3",
    component: () => import("@/views/test/index-test3.vue"),
  },
];
