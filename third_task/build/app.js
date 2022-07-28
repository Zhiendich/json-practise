"use strict";
const questionBlock = document.getElementById('question-block') || null;
const firstAnswerButton = document.getElementById('first-answer-button') || null;
const secondAnswerButton = document.getElementById('second-answer-button') || null;
let responseData = {};
let resultArray = [];
fetch('./jsons/questins.json')
    .then(response => response.json())
    .then(response => {
    responseData = response;
    makeQuestions(responseData.questions, 1);
})
    .catch(e => {
    alert(e.message);
});
const makeQuestions = (questionsArray, id) => {
    let paragrafs = '';
    showQuestions(id, questionsArray, paragrafs);
};
const showQuestions = (id, questionsArray, paragrafs) => {
    let findIdex = questionsArray.findIndex(question => question.id == id);
    const condition = questionsArray[findIdex].answer1 !== undefined || questionsArray[findIdex].answer2 !== undefined;
    if (!condition) {
        firstAnswerButton.disabled = true;
        secondAnswerButton.disabled = true;
        paragrafs += `<p>${questionsArray[findIdex].question}</p>`;
        questionBlock.innerHTML = paragrafs;
        console.log(resultArray);
        return;
    }
    paragrafs += `<p>${questionsArray[findIdex].question}</p>`;
    firstAnswerButton.innerText = questionsArray[findIdex].answer1.text;
    firstAnswerButton.value = questionsArray[findIdex].answer1.nextquestion;
    secondAnswerButton.innerText = questionsArray[findIdex].answer2.text;
    secondAnswerButton.value = questionsArray[findIdex].answer2.nextquestion;
    questionBlock.innerHTML = paragrafs;
};
const changeButtonValue1 = () => {
    const find = responseData.questions.find(question => question.id == Number(firstAnswerButton.value));
    const findAnswer = responseData.questions.find(question => question.answer1.nextquestion == firstAnswerButton.value || question.answer2.nextquestion == firstAnswerButton.value);
    resultArray.push({ question: find === null || find === void 0 ? void 0 : find.question, answer: findAnswer === null || findAnswer === void 0 ? void 0 : findAnswer.answer1.text });
    makeQuestions(responseData.questions, firstAnswerButton.value);
};
const changeButtonValue2 = () => {
    const find = responseData.questions.find(question => question.id == Number(secondAnswerButton.value));
    const findAnswer = responseData.questions.find(question => question.answer1.nextquestion == secondAnswerButton.value || question.answer2.nextquestion == secondAnswerButton.value);
    resultArray.push({ question: find === null || find === void 0 ? void 0 : find.question, answer: findAnswer === null || findAnswer === void 0 ? void 0 : findAnswer.answer2.text });
    makeQuestions(responseData.questions, secondAnswerButton.value);
};
firstAnswerButton.addEventListener('click', changeButtonValue1);
secondAnswerButton.addEventListener('click', changeButtonValue2);
