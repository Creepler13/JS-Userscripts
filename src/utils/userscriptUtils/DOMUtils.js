module.exports = {
  createButton,
  querySelectorAll,
};

function querySelectorAll(query, object) {
  if (object) return [...object.querySelectorAll(query)];
  return [...document.querySelectorAll(query)];
}

function createButton(id, buttonText, onClick) {
  let but = document.createElement("button");
  but.id = id;
  but.innerText = buttonText;
  but.addEventListener("click", onClick);
  return but;
}
