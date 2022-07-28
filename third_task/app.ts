 type Answer = {
    text : string,
    nextquestion : string
 }
 type Question = {
    id : number,
    question : string,
    answer1 : Answer,
    answer2 : Answer,
 }
  type JSONData = {
    questions : Question[]
  }

//-----------------//
// Get elements
//-----------------//

const questionBlock = document.getElementById('question-block') as HTMLDivElement || null
const firstAnswerButton = document.getElementById('first-answer-button') as HTMLButtonElement || null
const secondAnswerButton = document.getElementById('second-answer-button') as HTMLButtonElement || null

let responseData = <JSONData> {}
let resultArray = <object[]>[] 

//---------------------------------//
// Fetch data from .json file
//---------------------------------//

fetch('./jsons/questins.json')
.then(response => response.json())
.then(response => { 
    responseData = response
    makeQuestions(responseData.questions, 1)
})
.catch( e => {
    alert(e.message)
})
 
//--------------------------------------------------------------------------------//
// First iteration function call and creation of questions in a varieble paragrafs
//--------------------------------------------------------------------------------//

const makeQuestions = (questionsArray :  Question[], id : number, )  => {
    let paragrafs = ''
    showQuestions(id,questionsArray, paragrafs )
}
  
//--------------------------------------------------------------------------------//
// Сhanging the question and values ​​inside the buttons, drawing the question
//--------------------------------------------------------------------------------//

const showQuestions = ( id : number, questionsArray :  Question[], paragrafs : string)  => {
     let findIdex =  questionsArray.findIndex(question => question.id == id)
     const condition = questionsArray[findIdex].answer1 !== undefined  || questionsArray[findIdex].answer2 !== undefined
    if(!condition) {
        firstAnswerButton.disabled = true
        secondAnswerButton.disabled = true
        paragrafs += `<p>${questionsArray[findIdex].question}</p>`
        questionBlock.innerHTML = paragrafs
        console.log(resultArray)
        return
    }
    paragrafs += `<p>${questionsArray[findIdex].question}</p>`
    firstAnswerButton.innerText = questionsArray[findIdex].answer1.text
    firstAnswerButton.value = questionsArray[findIdex].answer1.nextquestion
    secondAnswerButton.innerText = questionsArray[findIdex].answer2.text
    secondAnswerButton.value = questionsArray[findIdex].answer2.nextquestion
    questionBlock.innerHTML = paragrafs
  }; 

//-----------------------------------------------------------------------------------------//
// Write the question and answer to the final array of the result for drawing from 1 button
//-----------------------------------------------------------------------------------------//

  const changeButtonValue1 = ()  => {
    const find = responseData.questions.find(question => question.id == Number(firstAnswerButton.value))
    const findAnswer = responseData.questions.find(question => question.answer1.nextquestion == firstAnswerButton.value || question.answer2.nextquestion == firstAnswerButton.value )
    resultArray.push({question : find?.question,answer : findAnswer?.answer1.text})
    makeQuestions(responseData.questions,firstAnswerButton.value as unknown as number)
  }

//-----------------------------------------------------------------------------------------//
// Write the question and answer to the final array of the result for drawing from 2 button
//-----------------------------------------------------------------------------------------//

  const changeButtonValue2 = ()  => {
   const find = responseData.questions.find(question => question.id == Number(secondAnswerButton.value))
   const findAnswer = responseData.questions.find(question => question.answer1.nextquestion == secondAnswerButton.value || question.answer2.nextquestion == secondAnswerButton.value )
   resultArray.push({question : find?.question,answer : findAnswer?.answer2.text})
    makeQuestions(responseData.questions,secondAnswerButton.value as unknown as number)
  }

//------------------------------------//
// Add listeners to the buttons
//------------------------------------//

  firstAnswerButton.addEventListener('click', changeButtonValue1)
  secondAnswerButton.addEventListener('click', changeButtonValue2)
