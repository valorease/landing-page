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
      const response = await fetch(`./assets/icons/${name}.svg`).catch(
        () => ""
      );

      FlexIcon.cache.set(
        name,
        response instanceof Response && response.status === 200
          ? await response.text()
          : ""
      );
    }

    this.innerHTML = FlexIcon.cache.get(name);
  }
}

export const elements = () => customElements.define("f-icon", FlexIcon);
