import Vue from "vue";
import VueRouter from "vue-router";

import LayoutThree from "@/views/layout/LayoutThree";
import LayoutTwo from "@/views/layout/LayoutTwo";

import Helper from '../views/helper/Helper';
import Gallery from "../views/gallery/Gallery";
import ShowCase from "../views/demo/ShowCase";
import Product from "../views/component/product";
import Guide from "../views/guide/DevelopGuide";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: LayoutTwo,
    hidden: true,
    name: "welcome",
    redirect: "index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/welcome/home"),
      },
    ],
  },
  {
    path: "/total",
    component: LayoutThree,
    redirect: "/total/core",
    hidden: true,
    name: "total",
    children: [
      {
        path: "core",
        name: "core",
        component: () => import("@/views/total/Core"),
      },
      {
        path: "detail",
        name: "detail",
        component: () => import("@/views/total/Detail"),
      },
      {
        path: "plugins",
        name: "plugins",
        component: () => import("@/views/total/Plugin"),
      },
      {
        path: "use",
        name: "use",
        component: () => import("@/views/total/Use"),
      },
      {
        path: "select",
        name: "select",
        component: () => import("@/views/total/Select"),
      },
      {
        path: "download",
        name: "download",
        component: () => import("@/views/total/Download"),
      },
      {
        path: "detailChart",
        name: "detailChart",
        component: () => import("@/views/total/DetailChart"),
      },
      {
        path: "pluginTags",
        name: "pluginTags",
        component: () => import("@/views/total/PluginTags"),
      },
      {
        path: "bugCommit",
        name: "bugCommit",
        component: () => import("@/views/total/BugCommit"),
      }
    ],
  },
  {
    path: "/standard",
    component: LayoutThree,
    redirect: "/standard/epsg",
    hidden: true,
    name: "standard",
    children: [
      {
        path: "epsg",
        name: "epsg",
        component: () => import("@/views/standard/Epsg"),
      },
      {
        path: "ogc",
        name: "ogc",
        component: () => import("@/views/total/Detail"),
      },
      {
        path: "socket",
        name: "socket",
        component: () => import("@/views/total/Plugin"),
      },
      {
        path: "geojson",
        name: "geojson",
        component: () => import("@/views/standard/Geojson"),
      },
    ],
  },
  {
    path: "/helper/:mapmode/:first/:file",
    component: Helper,
    name: "helper-views",
  },
  {
    path: "/helper/:mapmode/:first/:second/:file",
    component: Helper,
    name: "helper-views",
  },
  {
    path: "/gallery/:mapmode",
    component: Gallery,
    name: "gallery-views",
  },
  {
    path: "/demo/:mapmode",
    component: ShowCase,
    hidden: true,
    name: "demo",
    children: [
      {
        path: ":first/:file",
        name: "codemirror",
        component: () => import("@/views/demo/index"),
      },
      {
        path: ":first/:second/:file",
        name: "codemirror",
        component: () => import("@/views/demo/index"),
      },
    ],
  },
  {
    path: "/total/*",
    component: () => import("@/views/empty/index"),
    name: "*",
  },
  {
    path: "/standard/*",
    component: () => import("@/views/empty/index"),
    name: "*",
  },
  {
    path:"/component/product",
    component: Product,
    name: "product"
  },
  {
    path:"/guide/DevelopGuide",
    component: Guide,
    name: "guide"
  }
];

const router = new VueRouter({
  mode: "hash",
  routes: routes,
});

export default router;
