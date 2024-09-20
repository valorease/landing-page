// @ts-check

/**
 * @param {HTMLElement} element
 */
export default function (element) {
  const modalName = element.getAttribute("data-modal-name");

  if (modalName !== null && modalName !== "") {
    newModal(modalName);

    return;
  }

  const modalTarget = element.getAttribute("data-modal-target");

  if (modalTarget === null || modalTarget === "") {
    return;
  }

  element.addEventListener("click", () => newModal(modalTarget));

  return {
    style: true,
  };
}

/**
 * @param {string} modalName
 */
function newModal(modalName) {
  if (modalCache.get(modalName) !== undefined) {
    modalCache.get(modalName)?.showModal();
  } else {
    const modal = createModal(modalName);
    modalCache.set(modalName, modal);
    modal?.showModal();
  }
}

/**
 * @type {Map.<string, HTMLDialogElement|null>}
 */
const modalCache = new Map();

/**
 * @param {HTMLDialogElement} dialog
 * @returns {Promise<void>}
 */
async function closeModal(dialog) {
  dialog.classList.add("modal-fade-out");

  return new Promise((resolve) => {
    /**
     * @param {AnimationEvent} event
     */
    function onAnimationEnd(event) {
      if (event.animationName === "modal-fade-out") {
        dialog.classList.remove("modal-fade-out");
        dialog.close();
        dialog.removeEventListener("animationend", onAnimationEnd);
        resolve();
      }
    }

    dialog.addEventListener("animationend", onAnimationEnd);
  });
}

/**
 * @param {string} modalName
 * @returns {HTMLDialogElement|null}
 */
function createModal(modalName) {
  const template = document.querySelector(
    `template[data-modal-name="${modalName}"]`
  );

  if (!(template instanceof HTMLTemplateElement)) {
    return null;
  }

  const content = template.content.cloneNode(true);

  const dialog = document.createElement("dialog");

  dialog.append(content);

  const closeButton = document.createElement("button");
  closeButton.ariaLabel = "Fechar modal.";
  closeButton.innerHTML = '<f-icon name="close"></f-icon>';
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => closeModal(dialog));

  dialog.append(closeButton);

  dialog.classList.add("modal");

  dialog.querySelectorAll("[data-modal-close]")?.forEach((element) => {
    element.addEventListener("click", () => closeModal(dialog));
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeModal(dialog);
    }
  });

  document.body.append(dialog);

  return dialog;
}
