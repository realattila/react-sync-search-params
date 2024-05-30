
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import packages from "./package.json" with { type: "json" };

const external = [...Object.keys(packages?.peerDependencies || {})];

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external,
});

export default [
  bundle({
    plugins: [
      resolve(), // Allows Rollup to find modules in node_modules
      commonjs(), // Allows Rollup to convert CommonJS modules to ES6
      esbuild({
        include: /\.[jt]sx?$/, // Include .ts and .js files
        exclude: /node_modules/, // Exclude node_modules
        sourceMap: true, // Enable source maps
        minify: process.env.NODE_ENV === "production", // Minify if in production mode
        target: "esnext", // Specify ECMAScript target
        tsconfig: "tsconfig.json", // Path to your tsconfig.json
      }),
      json(),
    ],
    output: [
      {
        file: packages.main, // Output file for CommonJS format
        format: "cjs",
        sourcemap: true, // Include sourcemaps
      },
      {
        file: packages.module, // Output file for ES module format
        format: "esm",
        sourcemap: true, // Include sourcemaps
      },
    ],
  }),
  bundle({
    plugins: [
      dts(), // Generate type declarations
    ],
    output: {
      file: packages.types,
      format: "es",
    },
  }),
];
