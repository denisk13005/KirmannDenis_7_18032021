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
const logo = 'img/logo.png'
const header = new Header(logo).render()
main.innerHTML += header

//génération de la barre de recherche
const loupe = 'img/loupe.svg'
const search = new Search(loupe).render()
main.innerHTML += search

//génération des mots clé
const keyword = document.createElement('div')
keyword.classList.add('keyword')
main.appendChild(keyword)

//********************************boutons de sélection *****************/

//génération des boutons de choix de recherche
const btns = new SearchBtns(
	setIngredients,
	setAppliances,
	setUstensile
).render()
main.innerHTML += btns
const ingredientsContainer = document.querySelector('.ingredients__container')
const appliancesContainer = document.querySelector('.appliances__container')
const ustensilesContainer = document.querySelector('.ustensiles__container')
//animation de la fleche
document.querySelectorAll('.btn').forEach((el) =>
	el.addEventListener('click', () => {
		el.classList.toggle('arrow')
	})
)
const btnIngredients = document.querySelector('.btn__ingredients')
const btnAppliances = document.querySelector('.btn__appareil')
const btnUstensiles = document.querySelector('.btn__ustensiles')
const ingInput = document.querySelector('.input__ing')
const ingApp = document.querySelector('.input__app')
const ingUst = document.querySelector('.input__ust')
// apparition des ingrédients
btnIngredients.addEventListener('click', () => {
	ingredientsContainer.classList.toggle('ingredients__container--visible'),
	appliancesContainer.classList.remove('appliances__container--visible'),
	ustensilesContainer.classList.remove('ustensiles__container--visible'),
	btnAppliances.classList.remove('arrow')
	btnUstensiles.classList.remove('arrow')
	ingApp.classList.remove('input__app--visible')
	ingUst.classList.remove('input__ust--visible')
	ingInput.classList.toggle('input__ing--visible')
	ingInput.focus()
})
//apparition des appareils
btnAppliances.addEventListener('click', () => {
	appliancesContainer.classList.toggle('appliances__container--visible'),
	ustensilesContainer.classList.remove('ustensiles__container--visible'),
	ingredientsContainer.classList.remove('ingredients__container--visible'),
	btnUstensiles.classList.remove('arrow')
	btnIngredients.classList.remove('arrow')
	ingUst.classList.remove('input__ust--visible')
	ingInput.classList.remove('input__ing--visible')
	ingApp.classList.toggle('input__app--visible')
	ingApp.focus()
})
//apparition des ustensiles
btnUstensiles.addEventListener('click', () => {
	ustensilesContainer.classList.toggle('ustensiles__container--visible'),
	ingredientsContainer.classList.remove('ingredients__container--visible'),
	appliancesContainer.classList.remove('appliances__container--visible'),
	btnIngredients.classList.remove('arrow')
	btnAppliances.classList.remove('arrow')
	ingInput.classList.remove('input__ing--visible')
	ingApp.classList.remove('input__app--visible')
	ingUst.classList.toggle('input__ust--visible')
	ingUst.focus()
})
//fermeture des choix au click ailleur que sur un boutton
document.body.addEventListener('click', (e) => {
	if (e.target.getAttribute('data-name') !== 'button') {
		ingredientsContainer.classList.remove('ingredients__container--visible'),
		appliancesContainer.classList.remove('appliances__container--visible'),
		ustensilesContainer.classList.remove('ustensiles__container--visible')
		ingInput.classList.remove('input__ing--visible')
		ingApp.classList.remove('input__app--visible')
		ingUst.classList.remove('input__ust--visible')
		document
			.querySelectorAll('.btn')
			.forEach((el) => el.classList.remove('arrow'))
	}
})
// génération des keywords en fonction du choix utilisateur
const divKeyword = document.querySelector('.keyword')
const spans = document.querySelectorAll('.list')
let color
const generateKeyword = (e) => {
	if (e.target.getAttribute('class').includes('ingredients')) {
		color = 'blue'
	} else if (e.target.getAttribute('class').includes('appliances')) {
		color = 'green'
	} else {
		color = 'red'
	}
	divKeyword.innerHTML += new Keywords(e.target.innerHTML, color).render()

	//supression des keywords au click sur la croix
	const croix = document.querySelectorAll('.croix')
	croix.forEach((el) =>
		el.addEventListener('click', () => el.parentElement.remove())
	)
}
spans.forEach((span) =>
	span.addEventListener('click', generateKeyword))

//*******************************************recettes*********************/
//génération du conteneur des recettes
const container = document.createElement('div')
container.classList.add('container')
main.appendChild(container)
//génération des fiches de recettes

recipes.forEach(
	(element) => (container.innerHTML += new Recipe(element).render())
)

//******************************************filtre par la barre de recherche */

const searchInput = document.getElementById('search')
searchInput.addEventListener('input', (e) => {
	if(e.target.value.length > 2 || e.target.value.length === 0){
		let filterRecipe = recipes.filter(
			recipe => recipe.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())|| recipe.description.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase() || recipe.ingredients.filter(ing=>ing.ingredient.toLowerCase().includes(e.target.value.toLowerCase()))) 
			
		)
		
		container.innerHTML = ''
		// tri des ingrédients
		ingredientsContainer.innerHTML = ''
		let ingredientsFilter = filterRecipe.map(el => el.ingredients.map(el=>el.ingredient.toLowerCase()))
		let setIng = [...new Set(ingredientsFilter.flat(Infinity))]
		ingredientsContainer.innerHTML += setIng.sort().map(el => `<span class="list list__ingredients">${el}</span>`).join('')
		//tri des appareils
		appliancesContainer.innerHTML = ''
		let appliancesFilter = filterRecipe.map(el=>el.appliance)
		let setApp = [...new Set(appliancesFilter)]
		appliancesContainer.innerHTML += setApp.sort().map(el=>  `<span class="list list__appliances">${el}</span>`).join('')
		filterRecipe.forEach(recipe => {
	
			container.innerHTML += new Recipe(recipe).render()
			
			
		})

	}

	// génération des keywords sur les span filtrés
	const spansFilter = document.querySelectorAll('.list')
	spansFilter.forEach(span => span.addEventListener('click', generateKeyword))

})

