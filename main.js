const keys = [
  [
    ["1", "!"],
    ["2", '"'],
    ["3", "·"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "?"],
    ["¡", "¿"],
  ], // primera fila
  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["`", "^"],
    ["+", "*"],
  ], // segunda fila
  [
    ["MAYUS", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
    ["ñ", "Ñ"],
    ["¨", "{"],
    ["Ç", "}"],
  ],
  [
    ["SHIFT", "SHIFT"], // tercera fila
    ["<", ">"],
    ["z", "Z"],
    ["x", "Z"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", ";"],
    [".", ":"],
    ["-", "_"],
  ],
  [["SPACE", "SPACE"]], //ultima fila
];

// keys.forEach(element => {
//     element.forEach(elem => {
//         console.log(elem);
//     });
// });

let mayus = false;
let shift = false;
let current = null; // obtener la referencia ultimo input

renderKeyboard();

function renderKeyboard() {
  const keyboardContainer = document.querySelector("#keyboard-container");
  let empty = `<div class="key-empty"></div>`;

  const layers = keys.map((layer, i) => {
    return layer.map((key) => {
      if (key[0].trim() === "SHIFT") {
        return `<button class="key key-shift ${shift ? "activated" : ""}">${
          key[0]
        } </button>`;
      }
      if (key[0].trim() === "MAYUS") {
        return `<button class="key key-mayus  ${mayus ? "activated" : ""}">${
          key[0]
        } </button>`;
      }
      if (key[0].trim() === "SPACE") {
        return `<button class="key key-space"> </button>`;
      }
      return `<button class="key key-normal">${
        shift
          ? key[1]
          : mayus &&
            key[0].toLowerCase().charCodeAt(0) >= 97 &&
            key[0].toLowerCase().charCodeAt(0) <= 122
          ? key[1]
          : key[0]
      }</button>`;
    });
  });
  //codigos ascii, 97 a minuscula, 122 z minisc
  layers[0].push(empty); // adiciona final
  layers[1].unshift(empty); // adic al comienzo
  console.log(layers);

  const htmlLayers = layers.map((layer) => {
    return layer.join("");
  });

  keyboardContainer.innerHTML = ""; // limpia
  htmlLayers.forEach((layer) => {
    keyboardContainer.innerHTML += `<div class="layer"> ${layer}</div>`;
  });

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("click", (e) => {
      //console.log("asasasas");
      if (current) {
        //console.log("key.textContent =>", key.textContent, " len ",key.textContent.length);
        let textContent = key.textContent.trim();
        if (textContent === "SHIFT") {
          shift = !shift;
          //console.log("Pase con shift");
          renderKeyboard();
        } else if (textContent === "MAYUS") {
          mayus = !mayus;
          renderKeyboard();
        } else if (textContent === "") {
          //debugger;
          current.value += " ";
        } else {
          current.value += textContent.trim(); // quita blancos al final
          if (shift) {
            shift = false;
            renderKeyboard();
          }
        }
        current.focus();
      }
    });
  });
} // end func renderKeyboard()

document.querySelectorAll("input").forEach((input) => {
  // focusin
  input.addEventListener("focusin", (e) => {
    current = e.target;
  });
});
//}
