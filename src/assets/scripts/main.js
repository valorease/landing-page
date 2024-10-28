// @ts-check

import { elements } from "./elements.js";

console.log("%cOlá, curioso.", "font-size: x-large");

console.log(
  "%cSe você estiver explorando e gostaria de saber mais sobre como este site funciona, sinta-se à vontade para nos contatar.",
  "font-size: large"
);

console.log(
  "%cPor favor, lembre-se de NÃO executar códigos aqui, pois isso pode comprometer a segurança do seu navegador.",
  "font-size: large"
);

elements();

const hookCache = new Map();
const styleCache = new Map();

document.querySelectorAll("[data-hook]")?.forEach(async (element) => {
  const hookName = element.getAttribute("data-hook");

  if (hookName === null) {
    return;
  }

  if (!hookCache.has(hookName)) {
    hookCache.set(hookName, import("./hooks/" + hookName + ".js"));
  }

  const hook = await hookCache.get(hookName);

  const settings = await hook.default(element);

  if (
    typeof settings.style !== "undefined" &&
    settings.style &&
    !styleCache.has(hookName)
  ) {
    styleCache.set(hookName, true);

    document.head.innerHTML += `
      <link rel="stylesheet" href="./assets/styles/hooks/${hookName}.css" />
    `;
  }
});

export {};
