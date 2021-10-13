import recipes from "./js/recipes.js";
import Header from "./js/header.js";
import Search from "./js/search.js";
import Keywords from "./js/keyWords.js";
import SearchBtns from "./js/searchBtns.js";
const ingredients = [];
recipes.forEach((element) => {
  element.ingredients.forEach((el) =>
    ingredients.push(el.ingredient.toLowerCase())
  );
});
console.log(ingredients);
let setIngredients = new Set(ingredients);
setIngredients.forEach((element) => {
  console.log(element);
});

// génération des éléments DOM
const body = document.body;
const main = document.createElement("main");
body.appendChild(main);

//génération du header
const logo = "../img/logo.png";
const header = new Header(logo).render();
main.innerHTML += header;

//génération de la barre de recherche
const loupe = "../img/loupe.svg";
const search = new Search(loupe).render();
main.innerHTML += search;

//génération des mots clé
const keyword = document.createElement("div");
keyword.classList.add("keyword");

main.appendChild(keyword);
const userChoice = new Keywords("lait", "bleu").render();
keyword.innerHTML += userChoice;
const modif = document.querySelector(".userChoice");
console.log(modif);
modif.style.background = "green";

//génération des boutons de choix de recherche
const btns = new SearchBtns('patate','four','spatule').render()
main.innerHTML+=btns
console.log(typeof btns);

//génération du conteneur des recettes
const container = document.createElement('div')
container.classList.add('container')
main.appendChild(container)

