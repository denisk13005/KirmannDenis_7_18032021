import recipes from './js/recipes.js'
import Header from './js/header.js'
import Search from './js/search.js'
import Keywords from './js/keyWords.js'
import SearchBtns from './js/searchBtns.js'
import Recipe from './js/recipe.js'
// recupération des ingrédients
const ingredients = []
recipes.forEach((element) => {
	element.ingredients.forEach((el) =>
		ingredients.push(el.ingredient.toLowerCase())
	)
})
let setIngredients = [...new Set(ingredients)] //supression des doublons et conversion en tableau

//récupération des appareils
const appliances = []
recipes.forEach((element) => appliances.push(element.appliance))
const setAppliances = [...new Set(appliances)]
console.log(setAppliances)

// récupération des ustensiles
const ustensiles = []
recipes.forEach((element) => {
	element.ustensils.forEach((el) => ustensiles.push(el.toLowerCase()))
})
const setUstensile = [...new Set(ustensiles)]

// génération des éléments DOM
const body = document.body
const main = document.createElement('main')
body.appendChild(main)

//génération du header
const logo = '../img/logo.png'
const header = new Header(logo).render()
main.innerHTML += header

//génération de la barre de recherche
const loupe = '../img/loupe.svg'
const search = new Search(loupe).render()
main.innerHTML += search

//génération des mots clé
const keyword = document.createElement('div')
keyword.classList.add('keyword')

main.appendChild(keyword)
const userChoice = new Keywords('test').render()
keyword.innerHTML += userChoice
const modif = document.querySelector('.userChoice')
modif.style.background = 'green'

//génération des boutons de choix de recherche
const btns = new SearchBtns(setIngredients, setAppliances, setUstensile).render()
main.innerHTML += btns
//animation de la fleche
document
	.querySelectorAll('.btn')
	.forEach((el) =>
		el.addEventListener('click', () => el.classList.toggle('arrow'))
	)
// apparition des ingrédients
document
	.querySelector('.btn__ingredients')
	.addEventListener('click', () =>
		document
			.querySelector('.ingredients__container')
			.classList.toggle('ingredients__container--visible')
	)
//apparition des appareils
document
	.querySelector('.btn__appareil')
	.addEventListener('click', () =>
		document
			.querySelector('.appliances__container')
			.classList.toggle('appliances__container--visible')
	)
//apparition des ustensiles
document
	.querySelector('.btn__ustensiles')
	.addEventListener('click', () =>
		document
			.querySelector('.ustensiles__container')
			.classList.toggle('ustensiles__container--visible')
	)
//génération du conteneur des recettes
const container = document.createElement('div')
container.classList.add('container')
main.appendChild(container)

recipes.forEach(
	(element) => (container.innerHTML += new Recipe(element).render())
)
console.log(recipes[0].ingredients[0].ingredient)
recipes[0].ingredients.forEach((el) => console.log(el))
