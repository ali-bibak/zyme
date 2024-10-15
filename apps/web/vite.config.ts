import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import Inspect from "vite-plugin-inspect";
import { VitePWA } from "vite-plugin-pwa";
import removeConsole from "vite-plugin-remove-console";
import svgr from "vite-plugin-svgr";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild", // or 'terser'
    sourcemap: true,
  },
  plugins: [
    react(),
    svgr(),
    removeConsole(),
    Inspect(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,ttf,woff,woff2,eot,otf}"],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: process.env.VITE_APP_NAME,
        short_name: process.env.VITE_APP_NAME,
        description: process.env.VITE_APP_DESCRIPTION,
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
    createHtmlPlugin({
      minify: true,
      template: "./index.html",
      inject: {
        data: {
          title: process.env.VITE_APP_NAME,
          description: process.env.VITE_APP_DESCRIPTION,
          themeColor: "#ffffff",
          ogTitle: process.env.VITE_APP_NAME,
          ogDescription: process.env.VITE_APP_DESCRIPTION,
          ogUrl: process.env.VITE_APP_URL,
          ogImage: process.env.VITE_APP_OG_IMAGE,
          twitterCard: "summary_large_image",
          twitterSite: "@yourtwitterhandle",
          twitterCreator: "@yourtwitterhandle",
          structuredData: `
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "${process.env.VITE_APP_NAME}",
              "url": "${process.env.VITE_APP_URL}",
              "description": "${process.env.VITE_APP_DESCRIPTION}",
              "publisher": {
                "@type": "Organization",
                "name": "${process.env.VITE_APP_NAME}"
              }
            }
          `,
        },
        tags: [
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              name: "description",
              content: process.env.VITE_APP_DESCRIPTION,
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              name: "theme-color",
              content: "#ffffff",
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              property: "og:title",
              content: process.env.VITE_APP_NAME,
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              property: "og:description",
              content: process.env.VITE_APP_DESCRIPTION,
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              property: "og:url",
              content: process.env.VITE_APP_URL,
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              property: "og:image",
              content: process.env.VITE_APP_OG_IMAGE,
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              name: "twitter:card",
              content: "summary_large_image",
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              name: "twitter:site",
              content: "@yourtwitterhandle",
            },
          },
          {
            injectTo: "head",
            tag: "meta",
            attrs: {
              name: "twitter:creator",
              content: "@yourtwitterhandle",
            },
          },
          {
            injectTo: "head",
            tag: "script",
            attrs: {
              type: "application/ld+json",
            },
            children: `
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "${process.env.VITE_APP_NAME}",
                "url": "${process.env.VITE_APP_URL}",
                "description": "${process.env.VITE_APP_DESCRIPTION}",
                "publisher": {
                  "@type": "Organization",
                  "name": "${process.env.VITE_APP_NAME}"
                }
              }
            `,
          },
        ],
      },
    }),
  ],
});
