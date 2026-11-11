// Texto sempre via textContent. Não interpretar respostas ou fontes como HTML.
export function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
export function focusHeading(node) {
  node.tabIndex = -1;
  node.focus();
}
