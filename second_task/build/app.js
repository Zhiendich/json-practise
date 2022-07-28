"use strict";
const list = document.getElementById("info") || null;
let responseData = {};
const fetchData = fetch("./jsons/data.json")
  .then((response) => response.json())
  .then((response) => {
    responseData = response;
    sortData(responseData);
  })
  .catch((e) => {
    alert(e.message);
  });
const sortData = (JSONData) => {
  let filterProp = {};
  let sortedResult;
  let filter;
  let result = [];
  for (const key in JSONData.condition) {
    if (typeof JSONData.condition[key][0] === "object") {
      filterProp = JSONData.condition[key][0];
      if (filterProp) {
        for (const key in filterProp) {
          filter = key;
          result = JSONData.data.filter((d) => d[filter] == filterProp[filter]);
        }
      }
    }
    sortedResult = result.sort(
      (a, b) => b[JSONData.condition[key]] - a[JSONData.condition[key]]
    );
  }
  let listItems = "";
  sortedResult === null || sortedResult === void 0
    ? void 0
    : sortedResult.forEach((li) => {
        listItems += `<li> email : ${li.user} || rating:  ${li.rating} || disabled: ${li.disabled}</li> \n`;
      });
  list.innerHTML = listItems;
  let json = Object.assign({ result: sortedResult });
  console.log(json);
};
