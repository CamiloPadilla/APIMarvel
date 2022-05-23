const miLista = document.getElementById('container')



const informacion = {
    personajes:[]
}


const getDataFromApi = () => {
const URI = "https://gateway.marvel.com/v1/public";
const CREDENTIALS = "ts=1&apikey=0ef749ca6edfffb071056e9417d26eba&hash=b6e7396841701f5fd18a9aa9636532f9"
return fetch(URI + "/characters?" + CREDENTIALS)
}

const getCharacter = (name) => {
    const parsedName = name.replaceAll(" ","%20")
    const URI = "https://gateway.marvel.com/v1/public";
    const CREDENTIALS = "&ts=1&apikey=0ef749ca6edfffb071056e9417d26eba&hash=b6e7396841701f5fd18a9aa9636532f9"
    return fetch(URI + "/characters?"+ "nameStartsWith=" +parsedName + CREDENTIALS)
    }

    //`${URI}/characters?${CREDENTIALS}`
const createListNodeElement = (personaje) => {
    const myDiv = document.createElement('div')
    myDiv.className = 'card-big-box'
    myDiv.innerHTML = createAcard(personaje) 
    return myDiv
}

const renderNodes = (arrayOfNodes) => {
    miLista.innerHTML=null
    arrayOfNodes.forEach((Node)=>{
        miLista.appendChild(Node)
    })
}
const search = document.getElementById("buscador");
search.addEventListener("input",(event) => {
    getCharacter(event.target.value).then(data=>data.json()).then(({data:{results}})=>{
        console.log(results)
        const nombresDePersonajes = results.map((personaje)=>{
            return createListNodeElement(personaje)
        })
      
            renderNodes(nombresDePersonajes)
    
    })

})





const createAcard = ({thumbnail:{path,extension},name}) =>{
return `<div class="image-container">
              <img class="card-image" src="${path}.${extension}" />
        </div>
        <div class="description-container">
        <h1>${name}</h1>
        </div>`
}



const callbackFunction = () => {
     getDataFromApi()
     .then((data)=>data.json())
     .then(({data:{results}})=>{
        const nombresDePersonajes = results.map((personaje)=>{
            return createListNodeElement(personaje)
        })
        renderNodes(nombresDePersonajes)
       
    })
 
}



window.addEventListener('load',callbackFunction)



// window.addEventListener('load',() => {
//     console.log('si vine')   
//     getDataFromApi()
//     .then((data) => data.json())
//     .then((data) =>{
//         console.log(data)
//     })
// })


