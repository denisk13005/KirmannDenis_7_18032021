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
recipes.forEach((element) => appliances.push(element.appliance.toLowerCase()))
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
//récupération des éléments du dom
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
	croix.forEach((el) =>{
		el.addEventListener('click', () => {
			el.parentElement.remove()
			//si plus de keyword sélectionnés et recherche < 2 on rafraichit les vignettes
			if(divKeyword.children.length === 0 && userResearch.length <= 2){
				container.innerHTML =''
				recipes.forEach(
					(element) => (container.innerHTML += new Recipe(element).render())
				)
				
			}
			//si on supprime tous les keywords les vignettes filtrées par le champ de recherche principal réaparaissent
			if(divKeyword.children.length ===0 && userResearch.length>2){
				container.innerHTML=''
				setFilterRecipeRefrech.forEach(el=>container.innerHTML += new Recipe(el).render())
			}
		})
		
	}
	

	)
}
spans.forEach((span) =>
	span.addEventListener('click',()=> {
		generateKeyword
		console.log(spans.length)

	}))

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
let userResearch
let setFilterRecipeRefrech
const searchInput = document.getElementById('search')
searchInput.addEventListener('input', (e) => {

	userResearch= e.target.value.toLowerCase()
	if(userResearch.length > 2 || userResearch.length === 0 ){
		let filterRecipe = []
		// recipes.filter(recipe => recipes.ingredients.some(el => el.includes(e.target.value)))
		recipes.forEach(recipe=> recipe.ingredients.forEach(el=> (el.ingredient.toLowerCase().includes(userResearch))? filterRecipe.push(recipe): ''))
		recipes.forEach(recipe=> recipe.name.toLowerCase().includes(userResearch)? filterRecipe.push(recipe):'')
		recipes.forEach(recipe =>recipe.description.toLowerCase().includes(userResearch)? filterRecipe.push(recipe):'')
		console.log(filterRecipe)
		let setFilterRecipe = [...new Set(filterRecipe)]
		setFilterRecipeRefrech=setFilterRecipe
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
		//tri des ustensiles
		ustensilesContainer.innerHTML=''
		let ustensilesFilter = filterRecipe.map(el => el.ustensils)
		let setUst = [...new Set(ustensilesFilter.flat(Infinity))]
		ustensilesContainer.innerHTML += setUst.sort().map(el=> `<span class="list list__ustensiles">${el}</span>` ).join('')
		//génération des recttes filtrées
		setFilterRecipe.forEach(recipe => {	
			container.innerHTML += new Recipe(recipe).render()			
			
		})
		let spans = document.querySelectorAll('.list')
		spans.forEach(span => span.addEventListener('click', (e)=> {
			console.log(spans.length)
			let value = e.target.innerHTML // récupére le contenu textuel du span
			let type = e.target.getAttribute('class') // défini le type de span cliqué(ing, app, ust)
			container.innerHTML = ''
			let filterRecipeAdvanced = []
			//si on a cliqué sur un span ingrédient on affine la recherche avec les recettes restantes contenants l'ingrédient sélectionné
			if(type.includes('ingredients')){
				setFilterRecipe.forEach(recipe=> recipe.ingredients.forEach(el=> (el.ingredient.toLowerCase().includes(value))? filterRecipeAdvanced.push(recipe): ''))
			}
			//pareil pour les appareils
			else if(type.includes('appliances')){
				setFilterRecipe.forEach(recipe => recipe.appliance.includes(value)?filterRecipeAdvanced.push(recipe):'')		
			}
			//sinon ce sont les ustensiles
			else{
				setFilterRecipe.forEach(recipe => recipe.ustensils.forEach(el=>el.includes(value)?filterRecipeAdvanced.push(recipe):''))		

			}
			//on raffraichit avec les vignettes correspondantes
			filterRecipeAdvanced.forEach(recipe => {
				container.innerHTML += new Recipe(recipe).render()
			})
		}))



	}

	// génération des keywords sur les span filtrés
	const spansFilter = document.querySelectorAll('.list')
	spansFilter.forEach(span => span.addEventListener('click', generateKeyword))


})


//*********************************************filtre par les champs de recherche avancés */

const inputs = document.querySelectorAll('.input')
inputs.forEach(input => input.addEventListener('input', (e)=>{
	console.log(e.target)


	let filterRecipeByInput=[]
	console.log(e.target.value)
	
	//maj des ingrédients
	
	if(e.target.getAttribute('class').includes('ing')){
		ingredientsContainer.innerHTML=''
		let ingredientsMAJ = ingredients.filter(el => el.includes(e.target.value.toLowerCase()))
		let setIngredientsMAJ = [...new Set(ingredientsMAJ)]
		ingredientsContainer.innerHTML += setIngredientsMAJ.map(el => `<span class="list list__ingredients">${el}</span>`).join('')
		
	}
	//maj des appareils
	else if(e.target.getAttribute('class').includes('app')){
		appliancesContainer.innerHTML = ''
		let appliancesMAJ = appliances.filter(el=> el.includes(e.target.value.toLowerCase()))
		let setAppliancesMAJ = [...new Set(appliancesMAJ)]
		appliancesContainer.innerHTML += setAppliancesMAJ.map(el => `<span class="list list__appliances">${el}</span>`).join('')

	}	
	//maj des ustensiles
	else if(e.target.getAttribute('class').includes('ust')){
		ustensilesContainer.innerHTML = ''
		let ustensilesMAJ = ustensiles.filter(el => el.includes(e.target.value.toLowerCase()))
		let setUstensilesMAJ =[...new Set(ustensilesMAJ)]
		ustensilesContainer.innerHTML += setUstensilesMAJ.map(el => `<span class="list list__ustensiles">${el}</span>`).join('')
	}

	//recettes filtrées par les champs de recherche avancés
	//par ingrédients
	recipes.forEach(recipe=> recipe.ingredients.forEach(el=> (el.ingredient.toLowerCase().includes(e.target.value.toLowerCase()))? filterRecipeByInput.push(recipe): ''))
	//par nom
	recipes.forEach(recipe=> recipe.name.toLowerCase().includes(e.target.value.toLowerCase())? filterRecipeByInput.push(recipe):'')
	//par description
	recipes.forEach(recipe =>recipe.description.toLowerCase().includes(e.target.value.toLowerCase())? filterRecipeByInput.push(recipe):'')
	//supression des doublons
	let setFilterRecipeByInput = [...new Set(filterRecipeByInput)]
	container.innerHTML = ''
	
	setFilterRecipeByInput.forEach(recipe => {	
		container.innerHTML += new Recipe(recipe).render()			
					
	})
	let spansFilterAdvanced = document.querySelectorAll('.list')
	spansFilterAdvanced.forEach(el => el.addEventListener('click',generateKeyword))
	

}))






