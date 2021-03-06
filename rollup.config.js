/* eslint-disable no-process-env */
// Rollup plugins
import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import replace from "rollup-plugin-replace"
import uglify from "rollup-plugin-uglify"
import postcss from "rollup-plugin-postcss"
import livereload from "rollup-plugin-livereload"
import serve from "rollup-plugin-serve"
import image from "rollup-plugin-img"

// PostCSS plugins
import simplevars from "postcss-simple-vars"
import nested from "postcss-nested"
import cssnext from "postcss-cssnext"

export default {
  input: "src/main.js",
  output: {file: "public/build/main.min.js", format: "iife", sourcemap: "inline"},
  plugins: [
    postcss({
      modules: true,
      plugins: [
        simplevars(),
        nested(),
        cssnext(),
      ],
    }),
    commonjs({
      include: ["node_modules/**"],
      exclude: [
        "node_modules/lodash-es/**",
        "node_modules/symbol-observable/**",
      ],
      namedExports: {
        "node_modules/react/index.js": [
          "Children", "Component", "createElement",
        ],
        "node_modules/redux-logger/dist/redux-logger.js": [
          "createLogger",
        ],
      },
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    babel({
      exclude: "node_modules/**",
    }),
    image({limit: 1000000}),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    (process.env.NODE_ENV === "production" && uglify()),
    (process.env.NODE_ENV !== "production" && livereload({
      watch: "public/build",
    })),
    (process.env.NODE_ENV !== "production" && serve({
      contentBase: "public",
      host: "localhost",
      port: 10001,
    })),
  ],
}
