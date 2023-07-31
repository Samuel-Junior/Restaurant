import { Dish } from "./models/dish.js"

let disheId = JSON.parse(window.localStorage.getItem("idDishSelected")) // récuperer les données(id) dans le local storage. 

// if (dishes === 0) {
//     const reponse = await fetch("plats.json");
//     const plats = await reponse.json();
    
//     const valeurPlats = JSON.stringify(plats);
//     window.localStorage.setItem("dishes", plats);
// } else{
// }
const reponse = await fetch("plats.json"); // récuperer les données du tableau . 
const plats = await reponse.json();

const platSelected = plats.find (plat => plat.id === disheId) // condition ne récuperer l'id dans le tableau qui correspond à id envoyé 

console.log(platSelected)

const descriptionList = document.getElementById("menu-list"); 
   
const liMenuItem = document.createElement("li");
liMenuItem.classList.add("menu-item");
const imagePlat = document.createElement("img");
imagePlat.src = platSelected.image;

const menuItemDescription = document.createElement("div");
const namePlat = document.createElement("h3");
namePlat.innerText = platSelected.name;
const descriptionPlat = document.createElement("p");
descriptionPlat.innerText = platSelected.description;

const menuItemPrice = document.createElement("div");
menuItemPrice.innerText = platSelected.price;


descriptionList.appendChild(liMenuItem);
liMenuItem.appendChild(imagePlat);

liMenuItem.appendChild(menuItemDescription);
menuItemDescription.appendChild(namePlat);
menuItemDescription.appendChild(descriptionPlat);

liMenuItem.appendChild(menuItemPrice);
