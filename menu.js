import { Dish } from "./models/dish.js"
const reponse = await fetch("plats.json");
const plats = await reponse.json();

let panier = [];

const instanceDishes =[];
const btn_section = document.getElementById("btn-section");
let ul;
const btnPayer = document.createElement("button");
const totalSection = document.getElementById("total-section")
const dishSection = document.getElementById("dish-section");
for( let i = 0 ; i < plats.length ; i++){

   const dishes = new Dish( plats[i].id, plats[i].name, plats[i].description, plats[i].price, plats[i].category, plats[i].image);
   instanceDishes.push(dishes);
   
   
   //  Création des éméments 
   const menuList = document.getElementById("menu-list"); 
   
   const liMenuItem = document.createElement("li");
   liMenuItem.classList.add("menu-item");
   const imagePlat = document.createElement("img");
   imagePlat.src = dishes.image;
   
   const menuItemDescription = document.createElement("div");
   const namePlat = document.createElement("h3");
   namePlat.innerText = dishes.name;
   const descriptionPlat = document.createElement("p");
   descriptionPlat.innerText = dishes.description;
   
   const menuItemPrice = document.createElement("div");
   menuItemPrice.innerText =  ` ${dishes.price}€`;

  

const btnGroupe = document.createElement("div");
const btnSuccess = document.createElement("button");

// Fontionalité BtnSucces 
btnSuccess.classList.add("btn","btn-success");
btnSuccess.innerText = `ajouter au panier`
btnSuccess.addEventListener("click", function(){
   let total = 0;

   // find sert a trouver celui qui passe la condition
   const dishAlreadySelected = panier.find((dish) => dishes.id === dish.id);

   
   if(dishAlreadySelected) {
      const newDishList = panier.filter((dish) => dishAlreadySelected.id !== dish.id);
      dishAlreadySelected.count = dishAlreadySelected.count+1;
      newDishList.push(dishAlreadySelected)
      panier = newDishList;
      
   } else {
      dishes.count = 1;
      panier.push(dishes);
   }

   console.log(panier)
   const pricesList = panier.map(dish => dish.price * dish.count); //fonction . map pour transformer ma liste d'objet dans mon tableau uniquement en prix 
   total = pricesList.reduce((accumulator,priceCurrent)=> accumulator + priceCurrent) // focntion ".reduce" pour demander à mon priceCurrent ( dernière valeur itinérer) de s'additionner à mon "accumulator" (valeur initial + dernière valeur reçu)


// exemple Reduce
//  total = panier.reduce(
//    function(accumulator, priceCurrent){
//       return accumulator + priceCurrent
//    },total
// );



   // delete all element
if(dishSection.hasChildNodes()) {
   dishSection.removeChild(dishSection.firstElementChild);

}
ul = document.createElement('ul');
for(let dish of panier) {
   const li = document.createElement("li")
   li.innerHTML = `${dish.name} : ${dish.price}€ (x${dish.count})`;
   ul.classList.add("list-commande");
   ul.appendChild(li);
   btnPayer.classList.add("btn", "btnSuccess");
   btnPayer.innerText =  `PAYER`
   btn_section.appendChild(btnPayer);
}


   //affiche le total du panier
   if(document.getElementById("total")) {
      const VueTotal = document.getElementById("total");
      VueTotal.innerHTML =  ` Total: ${total}€ `

   } else {
      const VueTotal = document.createElement('p');
      VueTotal.id = "total"
      VueTotal.innerHTML = ` Total: ${total}€ `
      totalSection.appendChild(VueTotal)
      const btnPayer = document.createElement("button");
      btnPayer.classList.add("btn", "btnSuccess");
   }
   dishSection.appendChild(ul);
})

const btnDanger = document.createElement("button");
btnDanger.classList.add("btn","btn-danger");
btnDanger.innerText = `voir la description`

btnDanger.addEventListener("click",function(){
   window.open(`http://127.0.0.1:5501/description.html`) // ouvrir une autre page suite au click 
   window.localStorage.setItem("idDishSelected",JSON.stringify(dishes.id))// envoyer les données stingifié dans le local storage.
})






// Attachement au DOM
menuList.appendChild(liMenuItem);
liMenuItem.appendChild(imagePlat);

liMenuItem.appendChild(menuItemDescription);
menuItemDescription.appendChild(namePlat);
menuItemDescription.appendChild(descriptionPlat);

liMenuItem.appendChild(menuItemPrice);

liMenuItem.appendChild(btnGroupe);
btnGroupe.appendChild(btnSuccess);
btnGroupe.appendChild(btnDanger);


}
// fonction bouton payer
   btnPayer.addEventListener("click", function(){
   JSAlert.alert("VOTRE COMMANDE A ÉTÉ PAYÉ AVEC SUCCÈS", "Payement validé");

})



//Valider formulaire simulation 
const form = document.getElementById("form")

form.addEventListener("submit", function(event){
   event.preventDefault();
   // console.log(form.checkValidity());
   if( form.checkValidity()){
      JSAlert.alert("VOS INFORMATIONS ONT ÉTÉ ENVOYÉES AVEC SUCCES", "Informations envoyées ")
   }else{
      JSAlert.alert("Remplissez le formulaire", "ERREUR")
   }
})

// .disable = true

// .value.length sup zéro condition 