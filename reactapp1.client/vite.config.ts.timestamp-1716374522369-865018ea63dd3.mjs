// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/melkmeshi/Documents/Projects/CSharp/ReactApp1/reactapp1.client/node_modules/vite/dist/node/index.js";
import plugin from "file:///C:/Users/melkmeshi/Documents/Projects/CSharp/ReactApp1/reactapp1.client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
var __vite_injected_original_import_meta_url = "file:///C:/Users/melkmeshi/Documents/Projects/CSharp/ReactApp1/reactapp1.client/vite.config.ts";
var baseFolder = env.APPDATA !== void 0 && env.APPDATA !== "" ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
var certificateName = "reactapp1.client";
var certFilePath = path.join(baseFolder, `${certificateName}.pem`);
var keyFilePath = path.join(baseFolder, `${certificateName}.key`);
if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (0 !== child_process.spawnSync(
    "dotnet",
    [
      "dev-certs",
      "https",
      "--export-path",
      certFilePath,
      "--format",
      "Pem",
      "--no-password"
    ],
    { stdio: "inherit" }
  ).status) {
    throw new Error("Could not create certificate.");
  }
}
var target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(";")[0] : "http://localhost:5261";
var vite_config_default = defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "^/api/*": {
        target
      }
    },
    port: 5173
    // https: {
    //   key: fs.readFileSync(keyFilePath),
    //   cert: fs.readFileSync(certFilePath),
    // },
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtZWxrbWVzaGlcXFxcRG9jdW1lbnRzXFxcXFByb2plY3RzXFxcXENTaGFycFxcXFxSZWFjdEFwcDFcXFxccmVhY3RhcHAxLmNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWVsa21lc2hpXFxcXERvY3VtZW50c1xcXFxQcm9qZWN0c1xcXFxDU2hhcnBcXFxcUmVhY3RBcHAxXFxcXHJlYWN0YXBwMS5jbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21lbGttZXNoaS9Eb2N1bWVudHMvUHJvamVjdHMvQ1NoYXJwL1JlYWN0QXBwMS9yZWFjdGFwcDEuY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBjaGlsZF9wcm9jZXNzIGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCB7IGVudiB9IGZyb20gXCJwcm9jZXNzXCI7XHJcblxyXG5jb25zdCBiYXNlRm9sZGVyID1cclxuICBlbnYuQVBQREFUQSAhPT0gdW5kZWZpbmVkICYmIGVudi5BUFBEQVRBICE9PSBcIlwiXHJcbiAgICA/IGAke2Vudi5BUFBEQVRBfS9BU1AuTkVUL2h0dHBzYFxyXG4gICAgOiBgJHtlbnYuSE9NRX0vLmFzcG5ldC9odHRwc2A7XHJcblxyXG5jb25zdCBjZXJ0aWZpY2F0ZU5hbWUgPSBcInJlYWN0YXBwMS5jbGllbnRcIjtcclxuY29uc3QgY2VydEZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ucGVtYCk7XHJcbmNvbnN0IGtleUZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ua2V5YCk7XHJcbmlmICghZnMuZXhpc3RzU3luYyhjZXJ0RmlsZVBhdGgpIHx8ICFmcy5leGlzdHNTeW5jKGtleUZpbGVQYXRoKSkge1xyXG4gIGlmIChcclxuICAgIDAgIT09XHJcbiAgICBjaGlsZF9wcm9jZXNzLnNwYXduU3luYyhcclxuICAgICAgXCJkb3RuZXRcIixcclxuICAgICAgW1xyXG4gICAgICAgIFwiZGV2LWNlcnRzXCIsXHJcbiAgICAgICAgXCJodHRwc1wiLFxyXG4gICAgICAgIFwiLS1leHBvcnQtcGF0aFwiLFxyXG4gICAgICAgIGNlcnRGaWxlUGF0aCxcclxuICAgICAgICBcIi0tZm9ybWF0XCIsXHJcbiAgICAgICAgXCJQZW1cIixcclxuICAgICAgICBcIi0tbm8tcGFzc3dvcmRcIixcclxuICAgICAgXSxcclxuICAgICAgeyBzdGRpbzogXCJpbmhlcml0XCIgfVxyXG4gICAgKS5zdGF0dXNcclxuICApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBjcmVhdGUgY2VydGlmaWNhdGUuXCIpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgdGFyZ2V0ID0gZW52LkFTUE5FVENPUkVfSFRUUFNfUE9SVFxyXG4gID8gYGh0dHBzOi8vbG9jYWxob3N0OiR7ZW52LkFTUE5FVENPUkVfSFRUUFNfUE9SVH1gXHJcbiAgOiBlbnYuQVNQTkVUQ09SRV9VUkxTXHJcbiAgPyBlbnYuQVNQTkVUQ09SRV9VUkxTLnNwbGl0KFwiO1wiKVswXVxyXG4gIDogXCJodHRwOi8vbG9jYWxob3N0OjUyNjFcIjtcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcGx1Z2luKCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiXi9hcGkvKlwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBvcnQ6IDUxNzMsXHJcbiAgICAvLyBodHRwczoge1xyXG4gICAgLy8gICBrZXk6IGZzLnJlYWRGaWxlU3luYyhrZXlGaWxlUGF0aCksXHJcbiAgICAvLyAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhjZXJ0RmlsZVBhdGgpLFxyXG4gICAgLy8gfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1WixTQUFTLGVBQWUsV0FBVztBQUUxYixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsV0FBVztBQVBpUCxJQUFNLDJDQUEyQztBQVN0VCxJQUFNLGFBQ0osSUFBSSxZQUFZLFVBQWEsSUFBSSxZQUFZLEtBQ3pDLEdBQUcsSUFBSSxPQUFPLG1CQUNkLEdBQUcsSUFBSSxJQUFJO0FBRWpCLElBQU0sa0JBQWtCO0FBQ3hCLElBQU0sZUFBZSxLQUFLLEtBQUssWUFBWSxHQUFHLGVBQWUsTUFBTTtBQUNuRSxJQUFNLGNBQWMsS0FBSyxLQUFLLFlBQVksR0FBRyxlQUFlLE1BQU07QUFDbEUsSUFBSSxDQUFDLEdBQUcsV0FBVyxZQUFZLEtBQUssQ0FBQyxHQUFHLFdBQVcsV0FBVyxHQUFHO0FBQy9ELE1BQ0UsTUFDQSxjQUFjO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsRUFBRSxPQUFPLFVBQVU7QUFBQSxFQUNyQixFQUFFLFFBQ0Y7QUFDQSxVQUFNLElBQUksTUFBTSwrQkFBK0I7QUFBQSxFQUNqRDtBQUNGO0FBRUEsSUFBTSxTQUFTLElBQUksd0JBQ2YscUJBQXFCLElBQUkscUJBQXFCLEtBQzlDLElBQUksa0JBQ0osSUFBSSxnQkFBZ0IsTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUNoQztBQUVKLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
