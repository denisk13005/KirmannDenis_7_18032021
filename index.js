import  recipes  from './js/recipes.js'
import Header from './js/header.js'
import Search from './js/search.js'
const ingredients = []
recipes.forEach(element => {
  element.ingredients.forEach(el=> ingredients.push(el.ingredient.toLowerCase()))
});
console.log(ingredients);
let setIngredients = new Set(ingredients)
setIngredients.forEach(element => {
  console.log(element);
});
// génération des éléments DOM
const body = document.body
const main = document.createElement('main')
body.appendChild(main)
const keyword = document.createElement('div')
keyword.classList.add('keyword')
//génération du header
const logo = '../img/logo.png'
const header = new Header(logo).render()
main.innerHTML += header
const loupe ='../img/loupe.svg'
const search = new Search(loupe).render()
main.innerHTML += search
main.appendChild(keyword)



