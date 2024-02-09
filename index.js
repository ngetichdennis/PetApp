document.addEventListener("DOMContentLoaded",()=>{
    //storing the DOM elements as variables
    const animalForm = document.getElementById("form-section");
    const RenderAnimals=document.getElementById("animalList");
    const animals="http://localhost:3000/animal"
    //GET request to get all animals from the server
    fetch(animals)
    .then((response)=> response.json())
    .then((data)=>{
        console.log("success",data)
        data.forEach((element)=>{
            addAnimalsToDom(element)
        })
    })
    // Add animals to the DOM
    function addAnimalsToDom(animalsObj){
        let animalCard=document.createElement("li");
        animalCard.className="card";
        animalCard.innerHTML=`
        <img src="${animalsObj.imageurl}" alt="${animalsObj.name}"/>
        <div class="content">
        <h2 class="title">${animalsObj.name}</h2>
        <p>$ <span>${animalsObj.donation}</span> donated</p>
        <p class="description">${animalsObj.description}</P>
        </div>
        <div class="buttons">
        <button id="donate"> Donate$10 </button>
        <button id="delete">DELETE</button>
        </div>
        `
        //adding event listener to the donate button which then donates the amount donated to the DOM
        animalCard.querySelector("#donate").addEventListener("click",()=>{
    
            animalsObj.donation +=10;
            animalCard.querySelector("span").textContent=animalsObj.donation
            //calling the donate function which then adds the amount donated to each animals to the server
            updateAnimalOnServer(animalsObj);
        })
        //adding event listener to the delete button which deletes the individual animal from the list
        animalCard.querySelector("#delete").addEventListener("click",()=>{
            animalCard.remove()
            //calling back the function which deletes the animals from the server
            deleteAnimalFromServer(animalsObj.id);
        })
        //Rendering the animal list on the DOM
        RenderAnimals.appendChild(animalCard);

    // Event listener for adopt Animal submit button
    animalForm.addEventListener('submit', (e)=>{
        //prevents default when submitting the form
        e.preventDefault()
        //declaring the new animal objects to be submitted
        let animalsObj={
            name:e.target.animalName.value,
            imageurl:e.target.animalImageurl.value,
            description:e.target.animalDescription.value,
            donation:0
        }
        //calling back the function which adds the animal list to the DOM
        addAnimalsToDom(animalsObj)
        //Post the added animal from the form to the server
        postNewAnimal(animalsObj);

    })
}
    // Post new animal object to server
    function postNewAnimal(animalsObj){
        fetch('http://localhost:3000/animal',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify(animalsObj)
                }).then((response)=> response.json())
                .then((data)=>{console.log(data)})
                }
                function updateAnimalOnServer(animalsObj){
                    fetch(`http://localhost:3000/animal/${animalsObj.id}`,{
                        method:"PATCH",
                        headers:{
                            "Content-type":"application/json"
                        },
                        body:JSON.stringify(animalsObj)
                    })
                    .then((resp)=>resp.json())
                    .then((data)=>{console.log(data)})
                }
                function deleteAnimalFromServer(id){
                    fetch(`http://localhost:3000/animal/${id}`,{
                        method:"DELETE",
                        headers:{
                            "Content-Type":"application/json"
                            },
                            })
                            .then((resp)=>resp.json())
                            .then((data)=>{console.log(data)})
                    
                }
            
            
        

    })