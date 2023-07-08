import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import postCssPxToRem from "postcss-pxtorem";
import { fileURLToPath } from "url";
import { babel } from "@rollup/plugin-babel";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              chrome: "49",
              ios: "10",
            },
          },
        ],
      ],
    }),
  ],
  resolve: {
    // alias: { "@": path.resolve(__dirname, "src") },
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      // less: {
      //   additionalData: `@import "${path.resolve(
      //     __dirname,
      //     "src/theme.module.less"
      //   )}";`,
      //   javascriptEnabled: true,
      // },
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: ["norem"], // 过滤掉norem-开头的class，不进行rem转换
        }),
      ],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://news-at.zhihu.com/api/4",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
