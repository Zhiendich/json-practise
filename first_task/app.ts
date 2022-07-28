type metric = {
    unit: string;
    value: number;
  };
  
//-----------------//
// Get elements
//-----------------//

const inputFrom = document.getElementById('input-from') as HTMLInputElement || null 
const inputTo = document.getElementById('input-to') as HTMLInputElement || null 
const selectFrom = document.getElementById('select-from') as HTMLSelectElement || null 
const selectTo = document.getElementById('select-to') as HTMLSelectElement || null 
let arrayMetric = <metric[]> [] 

//---------------------------------//
// Fetch data from .json file
//---------------------------------//

const fetchMetric = fetch('./jsons/metric.json')
.then(response => response.json() )
.then(data => {
  arrayMetric = data
  createOptions(arrayMetric)
})
.catch( e => {
  alert(e.message)
})

//-----------------------------------------//
// Set option elements of the selects
//-----------------------------------------//

const createOptions = (metric : metric[]) => {
  let options = ""
  metric.forEach(m => {
    options += `<option>${m.unit}</option>`
  })

  try{
    selectFrom.innerHTML = options;
    selectTo.innerHTML = options
    if (selectFrom.value === "") throw "Error: select-from does not exist!";
    if (selectTo.value === "") throw "Error: select-to does not exist!";
  }catch (error) {
      console.log(error)
  } 
}

//---------------------------------------------------//
// Method to execute when user changes data in page
//---------------------------------------------------//

const convertValue = () => {
    try {
     const findSelectFrom = arrayMetric.find(m => m.unit == selectFrom.value)?.value as number
     const findSelectTo = arrayMetric.find(m => m.unit == selectTo.value)?.value as number
     inputTo.value = ((Number(inputFrom.value) * findSelectFrom ) / findSelectTo).toFixed(2)
    } catch (error) {
      console.log(error)
    }
}

//------------------------------------//
// Add listeners to the elements
//------------------------------------//

inputFrom.addEventListener('change', convertValue)
selectFrom.addEventListener('change', convertValue)
selectTo.addEventListener('change', convertValue)