export function querySelectorAll(query, object) {
  if (object) return [...object.querySelectorAll(query)];
  return [...document.querySelectorAll(query)];
}

export function createButton(buttonText, onClick, id) {
  let but = document.createElement("button");
  if (id) but.id = id;
  but.innerText = buttonText;
  if (onClick)
    but.addEventListener("click", (e) => {
      onClick(but, e);
    });
  return but;
}

export function removeNodeRecursivly(node) {
  while (node.hasChildNodes()) {
    removeNodeRecursivly(node.firstChild);
  }
  node.remove();
}

export function createTextInput(presetText, onChange, id) {
  let input = document.createElement("input");
  if (id) input.id = id;
  if (presetText) input.value = presetText;
  if (onChange) input.addEventListener("change", onChange);
  return input;
}

export function loop(func, interval) {
  let inter = setInterval(func, interval ? interval : 500);
  return {
    stop: (_) => clearInterval(inter),
  };
}

export function checkLocation(string) {
  let regex;
  if (typeof string == "string") {
    try {
      regex = new RegExp(string);
    } catch (e) {
      console.error(e);
      return false;
    }
  } else if (string instanceof RegExp) regex = string;
  else return console.error("This isnt a good input:", string);
  return regex.test(window.location.href);
}
