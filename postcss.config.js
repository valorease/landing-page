import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import cssnano from "cssnano";

export default {
  plugins: [
    autoprefixer,
    postcssNesting,
    cssnano({
      preset: "default",
    }),
  ],
};
