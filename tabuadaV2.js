/**
 * Declaração de variáveis
 */
const body = document.querySelector("body");
const mainElement = buildArticle("main", "main");

/**
 * Inicializa o programa
 */
function initialize() {
  
  const titleElement = buildH1(`Tabuada de multiplicação (<span class="title_symbol">x</span>)`, "title", "title");
  const inputElement = buildInput(
    "inputComand",
    "inputComand",
    "text",
    "Apenas números!)"
  );
  
  body.append(titleElement, inputElement, mainElement);

  inputElement.addEventListener("keyup", handleInput);
}

function handleInput(event) {
  if(event.key !== "Enter") {
    return;
  }

  clearDisplay();

  const numericValues = event.target.value.split(";");

  if(numericValues.some(value => isNaN(value))) {
      alert("Apenas números separados por `;` são permitidos!");
      return;
  }


  numericValues.forEach(numericValue => {
      const data = operate(numericValue);
      const containerResultElement = prepareResult(data);
      const containerElement = prepareContainer(containerResultElement, numericValue);
      showData(containerElement)
  })
}


function showData(containerElement){
  mainElement.append(containerElement)
}

function prepareResult(data = []) {
  const _boxResult = buildDiv({ id: 'boxResult', className: 'boxResult'});
  _boxResult.innerHTML = "";

  data.forEach((value) => {
      const divResult = `<div id="number-${value.numberOperator}" class="result" ><p class="operation">${value.numberBase} ${value.operation} ${value.numberOperator} ${value.equal} <span class="resultOperation" > ${value.result}</span></p></div>`;
      _boxResult.innerHTML += divResult;
  });

  return _boxResult;
}

function prepareContainer(containerResultElement, inidicateNumber) {
  const _container = buildDiv({ className: 'container' });
  const _indicateNumber = buildDiv({ className: 'indicateNumber', id: `indicateNumber-${inidicateNumber}` });
  _indicateNumber.innerHTML = inidicateNumber
  _container.append(_indicateNumber, containerResultElement);

  return _container;
}

function buildH1(text, id = "", classe = "") {
  const h1 = document.createElement("h1");
  h1.setAttribute("id", id);
  h1.setAttribute("class", classe);
  h1.innerHTML = text;
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

function buildDiv(params = {id: '', className: ''}) {
  const div = document.createElement("div");
  
  if(params.id) {
    div.setAttribute("id", params.id);
  }
  
  if(params.className) {
    div.setAttribute("class", params.className);
  }
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

function clearDisplay() {
  mainElement.innerHTML = "";
}


initialize();
