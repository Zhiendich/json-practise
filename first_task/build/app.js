"use strict";
const inputFrom = document.getElementById('input-from') || null;
const inputTo = document.getElementById('input-to') || null;
const selectFrom = document.getElementById('select-from') || null;
const selectTo = document.getElementById('select-to') || null;
let arrayMetric = [];
const fetchMetric = fetch('./jsons/metric.json')
    .then(response => response.json())
    .then(data => {
    arrayMetric = data;
    createOptions(arrayMetric);
});
const createOptions = (metric) => {
    let options = "";
    metric.forEach(m => {
        options += `<option>${m.unit}</option>`;
    });
    try {
        selectFrom.innerHTML = options;
        selectTo.innerHTML = options;
        if (selectFrom.value === "")
            throw "Error: select-from does not exist!";
        if (selectTo.value === "")
            throw "Error: select-to does not exist!";
    }
    catch (error) {
        console.log(error);
    }
};
const convertValue = () => {
    var _a, _b;
    try {
        const findSelectFrom = (_a = arrayMetric.find(m => m.unit == selectFrom.value)) === null || _a === void 0 ? void 0 : _a.value;
        const findSelectTo = (_b = arrayMetric.find(m => m.unit == selectTo.value)) === null || _b === void 0 ? void 0 : _b.value;
        inputTo.value = ((Number(inputFrom.value) * findSelectFrom) / findSelectTo).toFixed(2);
    }
    catch (error) {
        console.log(error);
    }
};
inputFrom.addEventListener('change', convertValue);
selectFrom.addEventListener('change', convertValue);
selectTo.addEventListener('change', convertValue);
