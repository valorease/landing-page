// @ts-check

class FlexIcon extends HTMLElement {
  constructor() {
    super();
  }

  static cache = new Map();

  async connectedCallback() {
    const name = this.getAttribute("name");

    if (!name) {
      return;
    }

    if (!FlexIcon.cache.has(name)) {
      FlexIcon.cache.set(name, this.loadIcon(name));
    }

    this.innerHTML = await FlexIcon.cache.get(name);
  }

  /** @param {string} name */
  async loadIcon(name) {
    const response = await fetch(`./assets/icons/${name}.svg`).catch(() => "");

    return response instanceof Response && response.status === 200
      ? await response.text()
      : "";
  }
}

export const elements = () => customElements.define("f-icon", FlexIcon);
