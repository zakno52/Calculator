const buttons = document.querySelectorAll("#numbers");
const output = document.getElementById("output");
const results = document.getElementById("result");
const submit = document.getElementById("equal");
const reset = document.getElementById("reset");
const allNum = [];
const nomi = [];
let counter = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      isNaN(parseInt(button.innerHTML)) === false
      /*||button.innerHTML === "(" ||button.innerHTML === ")"*/
    ) {
      allNum.push(button.innerHTML);
      nomi[counter] = allNum.join("");
      // console.log(nomi);
    } else {
      if (["+", "-", "*", "/", "%"].includes(nomi[nomi.length - 1])) {
        nomi.splice(nomi.length - 1, 1);
        nomi.push(button.innerHTML);
      } else {
        nomi.push(button.innerHTML);

        allNum.length = 0;
        counter = nomi.length;
      }
    }
    output.innerHTML = nomi.join(" ");
    let resultsArray = nomi.slice();
    let ini = nomi.slice();

    if (resultsArray.includes("/")) {
      for (let index = 0; index < resultsArray.length; index++) {
        if (resultsArray[index] === "/") {
          resultsArray = ini;
          var resultSub = resultsArray[index - 1] / resultsArray[index + 1];
          resultsArray[index - 1] = resultSub;
          resultsArray.splice(index, 2);
          console.log(resultsArray, resultSub, "array1");
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
          console.log(resultsArray, resultSub, "array1");
          index = 0;
        }
      }
    }

    for (let indx = 0; indx < resultsArray.length; indx++) {
      if (resultsArray[indx] === "+") {
        var resultSub2 =
          parseFloat(resultsArray[indx - 1]) +
          parseFloat(resultsArray[indx + 1]);
        resultsArray[indx - 1] = resultSub2;
        resultsArray.splice(indx, 2);
        indx = 0;
        console.log(resultsArray, resultSub2, "array2");
      }
      if (resultsArray[indx] === "-") {
        resultSub2 = resultsArray[indx - 1] - resultsArray[indx + 1];
        resultsArray[indx - 1] = resultSub2;
        resultsArray.splice(indx, 2);
        indx = 0;
        console.log(resultsArray, resultSub2, "array2minus");
      }
    }
    if (!isNaN(resultSub2)) {
      console.log("called");
      showresult(resultSub2);
    }

    function showresult(resultat) {
      results.innerHTML = resultat;
    }
  });
});

submit.addEventListener("click", () => {});

reset.addEventListener("click", () => {
  output.innerHTML = "";
});
