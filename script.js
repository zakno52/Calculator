const buttons = document.querySelectorAll("#numbers");
const output = document.getElementById("output");
const results = document.getElementById("result");
const submit = document.getElementById("equal");
const reset = document.getElementById("reset");
const allNum = [];
const nomi = [];
let counter = 0;
let pointCounter = 0;
const message = document.getElementById("message");
const point = document.getElementById("point");
const backSpace = document.getElementById("backsp");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    results.classList.remove("resultZoon");
    console.log(point[0]);
    if (button.innerHTML === "0" && nomi[nomi.length - 1] === "/") {
      message.style.display = "inline";
    } else if (isNaN(parseInt(button.innerHTML)) === false) {
      allNum.push(button.innerHTML);
      nomi[counter] = allNum.join("");
      message.style.display = "";
    } else {
      pointCounter = 0;
      if ([".", "+", "-", "*", "/", "%"].includes(nomi[nomi.length - 1])) {
        nomi.splice(nomi.length - 1, 1);
        nomi.push(button.innerHTML);
      } else {
        nomi.push(button.innerHTML);

        allNum.length = 0;
        counter = nomi.length;
      }
    }
    calculate();
  });
});

function calculate() {
  output.innerHTML = nomi.join(" ");
  let resultsArray = nomi.slice();
  let ini = nomi.slice();
  // console.log(resultsArray, resultSub, "array1", pointCounter);

  if (resultsArray.includes("/")) {
    for (let index = 0; index < resultsArray.length; index++) {
      if (resultsArray[index] === "/") {
        resultsArray = ini;
        var resultSub = resultsArray[index - 1] / resultsArray[index + 1];
        resultsArray[index - 1] = resultSub;
        resultsArray.splice(index, 2);

        index = 0;
      }
    }
    if (!isNaN(resultSub)) {
      console.log("called");
      showresult(resultSub);
    }
  }
  if (resultsArray.includes("*")) {
    for (let index = 0; index < resultsArray.length; index++) {
      if (resultsArray[index] === "*") {
        resultsArray = ini;
        let resultSub = resultsArray[index - 1] * resultsArray[index + 1];
        resultsArray[index - 1] = resultSub;
        resultsArray.splice(index, 2);

        index = 0;
      }
    }
  }

  for (let indx = 0; indx < resultsArray.length; indx++) {
    if (resultsArray[indx] === "+") {
      var resultSub2 =
        parseFloat(resultsArray[indx - 1]) + parseFloat(resultsArray[indx + 1]);
      resultsArray[indx - 1] = resultSub2;
      resultsArray.splice(indx, 2);
      indx = 0;
    }
    if (resultsArray[indx] === "-") {
      resultSub2 = resultsArray[indx - 1] - resultsArray[indx + 1];
      resultsArray[indx - 1] = resultSub2;
      resultsArray.splice(indx, 2);
      indx = 0;
    }
  }
  if (!isNaN(resultSub2)) {
    showresult(resultSub2);
  }

  function showresult(resultat) {
    if (resultat % 1 !== 0) {
      results.innerHTML = resultat.toFixed(2);
    } else {
      results.innerHTML = resultat;
    }
  }
  console.log(nomi, allNum);
}

point.addEventListener("click", () => {
  console.log(nomi, allNum);
  if (isNaN(nomi[nomi.length - 1]) === false && pointCounter === 0) {
    allNum.push(point.innerHTML);
    nomi[counter] = allNum.join("");
    output.innerHTML = nomi.join(" ");
    pointCounter = 1;
  }
});

submit.addEventListener("click", () => {
  results.classList.add("resultZoon");
});

backSpace.addEventListener("click", () => {
  let lastNumber = nomi[nomi.length - 1];
  let digits = lastNumber.toString().split("");
  digits.splice(digits.length - 1, 1);
  if (isNaN(digits[0])) {
    nomi.splice(digits.length - 1, 1);
  } else {
    nomi[nomi.length - 1] = parseFloat(digits.join(""));
  }
  output.innerHTML = nomi.join(" ");
  if (isNaN(nomi[0])) {
    allNum.length = 0;
    results.innerHTML = "";
  }
  calculate();
});

reset.addEventListener("click", () => {
  output.innerHTML = "";
  results.innerHTML = "";
  allNum.length = 0;
  nomi.length = 0;
  message.style.display = "";
});
