type userData = {
    user: string,
    rating: number,
    disabled: boolean,
  };
  type JSONData = {
    data :  userData [],
    condition : object
  }

//-----------------//
// Get elements
//-----------------//

const list = document.getElementById('info') as HTMLUListElement || null 
let responseData = <JSONData> {}

//---------------------------------//
// Fetch data from .json file
//---------------------------------//
const fetchData = fetch('./jsons/data.json')
.then(response => response.json())
.then(response => { 
    responseData = response
    sortData(responseData)
})
.catch( e => {
    alert(e.message)
})

//-----------------------------------------------------------------------------------------//
// Аiltering data according to 1 condition and sorting data according to 2 condition
//-----------------------------------------------------------------------------------------//

const sortData = (JSONData : JSONData) => {
let filterProp = {}
let sortedResult 
let filter : string
let result = <userData[]>[]
   for (const key in JSONData.condition) {
       if(typeof JSONData.condition[key as keyof typeof JSONData.condition][0] === 'object' ){
            filterProp = JSONData.condition[key as keyof typeof JSONData.condition][0]
            if(filterProp){
                for ( const key in filterProp   ) {
                   filter = key
                   result = JSONData.data.filter(d => d[filter as keyof userData] == filterProp[filter as keyof typeof JSONData.condition])
                 }
            } 
       }
       sortedResult = result.sort((a,b ) => b[JSONData.condition[key as keyof typeof JSONData.condition]] - a[JSONData.condition[key as keyof typeof JSONData.condition]])
   }
   let listItems = ''
   sortedResult?.forEach( li => {
      listItems += `<li> email : ${li.user} || rating:  ${li.rating} || disabled: ${li.disabled}</li> \n`
   })
   list.innerHTML = listItems
     let json = Object.assign({'result' : sortedResult});
   console.log(json)
}
