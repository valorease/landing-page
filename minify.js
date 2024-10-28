// @ts-check

import fs from "fs";
import { exec } from "child_process";
import { glob } from "glob";
import path from "path";

(async () => {
  const files = await glob("./src/**/*.js");

  files.forEach((file) => {
    const outputFile = `./build/${file.replace("src/", "")}`;

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    exec(
      `terser "${file}" --compress --mangle --output "${outputFile}" --keep-filenames`,
      (error) => {
        if (error) {
          console.error(`Error minifying ${file}: ${error.message}`);
        } else {
          console.log(`Minified ${file} to ${outputFile}`);
        }
      }
    );
  });
})();
