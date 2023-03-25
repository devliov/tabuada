const titulo = buildH1("title", "title");
titulo.innerHTML = `Tabuada de multiplicação (<span class="title_symbol">x</span>)`;
const inputValue = buildInput(
  "inputComand",
  "inputComand",
  "text",
  "Apenas números!)",
  "3"
);
const body = document.querySelector("body");
const main = buildArticle("main", "main");
const container = buildDiv("container", "container");
body.append(titulo, inputValue, main);
const indicateNumber = buildDiv("indicateNumber", "indicateNumber");
const boxResult = buildDiv("boxResult", "boxResult");

let valuer = 0;

function showAll() {
  const container1 = buildDiv("container", "container");
  const container2 = buildDiv("container", "container");
  const container3 = buildDiv("container", "container");
  main.append(container,container1,container2,container3);
  container.append(indicateNumber, boxResult);
  container1.append(indicateNumber, boxResult);
  container2.append(indicateNumber, boxResult);
  container3.append(indicateNumber, boxResult);
}

function buildH1(id = "", classe = "") {
  const h1 = document.createElement("h1");
  h1.setAttribute("id", id);
  h1.setAttribute("class", classe);
  return h1;
}

function buildInput(
  id = "",
  classe = "",
  type = "",
  placeholder = "",
  maxlength = ""
) {
  const input = document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("class", classe);
  input.setAttribute("type", type);
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("maxlength", maxlength);
  return input;
}

function buildArticle(id = "", classe = "") {
  const article = document.createElement("article");
  article.setAttribute("id", id);
  article.setAttribute("class", classe);

  return article;
}

function buildDiv(id = "", classe = "") {
  const div = document.createElement("div");
  div.setAttribute("id", id);
  div.setAttribute("class", classe);
  div.textContent = "";
  return div;
}

function getNumbersOperators(maxNumber = 10) {
  let numbers = [];

  for (let i = 0; i <= maxNumber; i++) {
    numbers.push({ number: i });
  }

  return numbers;
}

function operate(operator) {
  if (isNaN(operator)) {
    return [];
  }

  const numbersOperatos = getNumbersOperators();

  return numbersOperatos.map((element, index) => {
    let resultEnd = element.number * operator;
    return {
      numberBase: operator,
      operation: "x",
      numberOperator: index,
      equal: "=",
      result: resultEnd,
    };
  });
}

function showResult(data = []) {
  boxResult.innerHTML = "";

  data.forEach((value, index) => {
    setTimeout(() => {
      const divResult = `<div id="number-${value.numberOperator}" class="result" ><p class="operation">${value.numberBase} ${value.operation} ${value.numberOperator} ${value.equal} <span class="resultOperation" > ${value.result}</span></p></div>`;
      boxResult.innerHTML += divResult;
    }, 20 * index);
  });
}

function changeIndicate(valueOfInput) {
  indicateNumber.innerHTML = "";
  setTimeout(() => {
    indicateNumber.innerHTML = valueOfInput;
  }, 300);
}

function handleInput(event) {
  const inputValue = parseInt(event.target.value);
  if (!isNaN(inputValue)) {
    valuer = parseInt(event.target.value);

    let data = operate(valuer);
    showResult(data);
    showAll();

    changeIndicate(valuer);
  } else {
    main.innerHTML = "";
  }
}

inputValue.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "Enter":
      handleInput(event);
      break;
    default:
      return (main.innerHTML = "");
  }
});
