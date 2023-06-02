export default [
  {
    path: "/test1",
    name: "test1",
    meta: {
      loading: true,
    },
    component: () => import("@/views/test/index-test1.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    meta: {
      loading: true,
    },
    component: () => import("@/views/test/index-test2.vue"),
  },
  {
    path: "/test3",
    name: "test3",
    meta: {
      loading: true,
    },
    component: () => import("@/views/test/index-test3.vue"),
  },
];
