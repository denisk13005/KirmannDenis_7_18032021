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
// ********************************fonction de filtre des recettes
const filter = (input , tab)=>{
	for (const recipe of recipes) {
		for(const ingredient of recipe.ingredients){
			if(ingredient.ingredient.toLowerCase().includes(input)){
				tab.push(recipe)
			}
		}	
		for(const ustensil of recipe.ustensils){
			if(ustensil.toLowerCase().includes(input)){
				tab.push(recipe)
			}
		}		
		if(recipe.appliance.toLowerCase().includes(input)){
			tab.push(recipe)
		}			
	}
}
//******************************************filtre par la barre de recherche */
let userResearch
let setFilterRecipeRefrech
const searchInput = document.getElementById('search')
searchInput.addEventListener('input', (e) => {
	userResearch= e.target.value.toLowerCase()
	//tri des recettes par ing , app ou ust
	if(userResearch.length > 2 || userResearch.length === 0 ){
		let filterRecipe = []
		container.innerHTML = ''		
		filter(userResearch, filterRecipe)
		let setFilterRecipe = [...new Set(filterRecipe)]
		//génération des recettes filtrées
		for(const recipe of setFilterRecipe){
			container.innerHTML += new Recipe(recipe).render()
		}
		//maj des ingrédients appareils et ustensiles
		ingredientsContainer.innerHTML = ''
		appliancesContainer.innerHTML=''
		ustensilesContainer.innerHTML=''
		let ingredientsFilter = []
		let appliancesFilter = []
		let ustensilesFilter = []
		for(const recipe of filterRecipe){
			for(const el of recipe.ingredients){
				ingredientsFilter.push(el.ingredient)
			}
			appliancesFilter.push(recipe.appliance)
			for(const el of recipe.ustensils){
				ustensilesFilter.push(el)
			}
			
		}
		let setIngredientsFilter = [...new Set(ingredientsFilter)]
		let setAppliancesFilter = [...new Set(appliancesFilter)]	
		let setUstensilesFilter = [...new Set(ustensilesFilter)]
		for(const el of setIngredientsFilter){
			ingredientsContainer.innerHTML += `<span class="list list__ingredients">${el}</span>`

		}
		for(const el of setAppliancesFilter){
			appliancesContainer.innerHTML+= `<span class="list list__appliances">${el}</span>`
		}
		for(const el of setUstensilesFilter){
			ustensilesContainer.innerHTML += `<span class="list list__ustensiles">${el}</span>`
		}
		//****************************************génération des keywords
		let spans = document.querySelectorAll('.list')
		for(const span of spans){
			span.addEventListener('click', (e)=>{
				let value = e.target.innerHTML // récupére le contenu textuel du span
				let type = e.target.getAttribute('class') // défini le type de span cliqué(ing, app, ust)
				container.innerHTML = ''
				let filterRecipeAdvanced = []
				if(type.includes('ingredients')){
					for(const recipe of setFilterRecipe){
						for(const el of recipe.ingredients){
							if(el.ingredient.includes(value)){
								filterRecipeAdvanced.push(recipe)
							}
						}
					}
				}
				else if(type.includes('appliances')){
					for(const recipe of setFilterRecipe){
						if(recipe.appliance.includes(value)){
							filterRecipeAdvanced.push(recipe)
						}
					}
				}
				else{
					for(const recipe of setFilterRecipe){
						for(const el of recipe.ustensils){
							if(el.includes(value)){
								filterRecipeAdvanced.push(recipe)
							}
						}
					}
				}
				//rendu des recettes filtrées avec recherche avancées
				for(const recipe of filterRecipeAdvanced){
					container.innerHTML += new Recipe(recipe).render()
				}
				console.log(filterRecipeAdvanced)

			})
		}
	}
	// génération des keywords sur les span filtrés
	const spansFilter = document.querySelectorAll('.list')
	spansFilter.forEach(span => span.addEventListener('click', generateKeyword))


})

// //*********************************************filtre par les champs de recherche avancés */

const inputs = document.querySelectorAll('.input')
for(const input of inputs){
	input.addEventListener('input', (e)=> {
		let value = e.target.value.toLowerCase()
		const target = e.target.getAttribute('class')
		//maj des ingrédients
		if(target.includes('ing')){
			ingredientsContainer.innerHTML = ''
			let ingredientsMAJ = []
			for(const ingredient of ingredients){
				if(ingredient.includes(value)){
					ingredientsMAJ.push(ingredient)
				}
			}
			let setIngredientsMAJ = [...new Set(ingredientsMAJ)]
			for(const ingredient of setIngredientsMAJ){
				ingredientsContainer.innerHTML += `<span class="list list__ingredients">${ingredient}</span>`

			}
		}
		//maj des appareils
		else if(target.includes('app')){
			appliancesContainer.innerHTML = ''
			let appliancesMAJ = []
			for(const appliance of appliances){
				if(appliance.includes(value)){
					appliancesMAJ.push(appliance)
				}
			}
			let setAppliancesMAJ = [...new Set(appliancesMAJ)]
			for(const appliance of setAppliancesMAJ){
				appliancesContainer.innerHTML += `<span class="list list__appliances">${appliance}</span>`
			}
		}
		//maj des ustensiles
		else{
			ustensilesContainer.innerHTML = ''
			let ustensilesMAJ = []
			for(const ustensile of ustensiles){
				if(ustensile.includes(value)){
					ustensilesMAJ.push(ustensile)
				}
			}
			let setUstensilesMAJ = [...new Set(ustensilesMAJ)]
			for(const ustensile of setUstensilesMAJ){
				ustensilesContainer.innerHTML += `<span class="list list__ustensiles">${ustensile}</span>`
			}
		}
		//recettes filtrées par les champs de recherche avancés
		//par ingrédients
		let filterRecipeByInput=[]	
		filter(value,filterRecipeByInput)
		let setFilterRecipeByInput = [...new Set(filterRecipeByInput)]
		let spansFilterAdvanced = document.querySelectorAll('.list')
		console.log(spansFilterAdvanced)
		for(const span of spansFilterAdvanced){
			span.addEventListener('click',()=>{

				container.innerHTML = ''
				for(const recipe of setFilterRecipeByInput){
					container.innerHTML += new Recipe(recipe).render()
				}
				generateKeyword

			}
				
			)
		}
	
		//rendu des recettes par filtrage avancé
		
		console.log(setFilterRecipeByInput)
	})

	
}


// 	//recettes filtrées par les champs de recherche avancés
// 	//par ingrédients
// 	recipes.forEach(recipe=> recipe.ingredients.forEach(el=> (el.ingredient.toLowerCase().includes(e.target.value.toLowerCase()))? filterRecipeByInput.push(recipe): ''))
// 	//par nom
// 	recipes.forEach(recipe=> recipe.name.toLowerCase().includes(e.target.value.toLowerCase())? filterRecipeByInput.push(recipe):'')
// 	//par description
// 	recipes.forEach(recipe =>recipe.description.toLowerCase().includes(e.target.value.toLowerCase())? filterRecipeByInput.push(recipe):'')
// 	//supression des doublons
// 	let setFilterRecipeByInput = [...new Set(filterRecipeByInput)]
	
// 	let spansFilterAdvanced = document.querySelectorAll('.list')
// 	spansFilterAdvanced.forEach(el => el.addEventListener('click',generateKeyword))
	
// 	container.innerHTML = ''
	
// 	setFilterRecipeByInput.forEach(recipe => {	
// 		container.innerHTML += new Recipe(recipe).render()			
					
// 	})
// }))

//*******************************************conservation des arrayMthods pour comparaison au cas ou */


// 	// recipes.filter(recipe => recipes.ingredients.some(el => el.includes(e.target.value)))
// 	recipes.forEach(recipe=> recipe.ingredients.forEach(el=> (el.ingredient.toLowerCase().includes(userResearch))? filterRecipe.push(recipe): ''))

// 	recipes.forEach(recipe=> recipe.name.toLowerCase().includes(userResearch)? filterRecipe.push(recipe):'')
// 	recipes.forEach(recipe =>recipe.description.toLowerCase().includes(userResearch)? filterRecipe.push(recipe):'')
// 	let setFilterRecipe = [...new Set(filterRecipe)]
// 	setFilterRecipeRefrech=setFilterRecipe
// 	container.innerHTML = ''

// filterRecipe.map(el => el.ingredients.map(el=>el.ingredient.toLowerCase()))
// let setIng = [...new Set(ingredientsFilter.flat(Infinity))]
// ingredientsContainer.innerHTML += setIng.sort().map(el => `<span class="list list__ingredients">${el}</span>`).join('')
// //tri des appareils
// appliancesContainer.innerHTML = ''
// let appliancesFilter = filterRecipe.map(el=>el.appliance)
// let setApp = [...new Set(appliancesFilter)]
// appliancesContainer.innerHTML += setApp.sort().map(el=>  `<span class="list list__appliances">${el}</span>`).join('')
// //tri des ustensiles
// ustensilesContainer.innerHTML=''
// let ustensilesFilter = filterRecipe.map(el => el.ustensils)
// let setUst = [...new Set(ustensilesFilter.flat(Infinity))]
// ustensilesContainer.innerHTML += setUst.sort().map(el=> `<span class="list list__ustensiles">${el}</span>` ).join('')
// //génération des recttes filtrées
// setFilterRecipe.forEach(recipe => {	
// 	container.innerHTML += new Recipe(recipe).render()			

// 	let spans = document.querySelectorAll('.list')
// 	spans.forEach(span => span.addEventListener('click', (e)=> {
// 		let value = e.target.innerHTML // récupére le contenu textuel du span
// 		let type = e.target.getAttribute('class') // défini le type de span cliqué(ing, app, ust)
// 		container.innerHTML = ''
// 		let filterRecipeAdvanced = []
// 		//si on a cliqué sur un span ingrédient on affine la recherche avec les recettes restantes contenants l'ingrédient sélectionné
// 		if(type.includes('ingredients')){
// 			setFilterRecipe.forEach(recipe=> recipe.ingredients.forEach(el=> (el.ingredient.toLowerCase().includes(value))? filterRecipeAdvanced.push(recipe): ''))
// 		}
// 		//pareil pour les appareils
// 		else if(type.includes('appliances')){
// 			setFilterRecipe.forEach(recipe => recipe.appliance.includes(value)?filterRecipeAdvanced.push(recipe):'')		
// 		}
// 		//sinon ce sont les ustensiles
// 		else{
// 			setFilterRecipe.forEach(recipe => recipe.ustensils.forEach(el=>el.includes(value)?filterRecipeAdvanced.push(recipe):''))		

// 		}
// 		//on raffraichit avec les vignettes correspondantes
// 		filterRecipeAdvanced.forEach(recipe => {
// 			container.innerHTML += new Recipe(recipe).render()
// 		})
// 	}))



// }

// // génération des keywords sur les span filtrés
// const spansFilter = document.querySelectorAll('.list')
// spansFilter.forEach(span => span.addEventListener('click', generateKeyword))


// })

// inputs.forEach(input => input.addEventListener('input', (e)=>{
// 	let filterRecipeByInput=[]	
// 	//maj des ingrédients	
// 	if(e.target.getAttribute('class').includes('ing')){
// 		ingredientsContainer.innerHTML=''
// 		let ingredientsMAJ = ingredients.filter(el => el.includes(e.target.value.toLowerCase()))
// 		let setIngredientsMAJ = [...new Set(ingredientsMAJ)]
// 		ingredientsContainer.innerHTML += setIngredientsMAJ.map(el => `<span class="list list__ingredients">${el}</span>`).join('')
		
// 	}
// 	//maj des appareils
// 	else if(e.target.getAttribute('class').includes('app')){
// 		appliancesContainer.innerHTML = ''
// 		let appliancesMAJ = appliances.filter(el=> el.includes(e.target.value.toLowerCase()))
// 		let setAppliancesMAJ = [...new Set(appliancesMAJ)]
// 		appliancesContainer.innerHTML += setAppliancesMAJ.map(el => `<span class="list list__appliances">${el}</span>`).join('')

// 	}	
// 	//maj des ustensiles
// 	else if(e.target.getAttribute('class').includes('ust')){
// 		ustensilesContainer.innerHTML = ''
// 		let ustensilesMAJ = ustensiles.filter(el => el.includes(e.target.value.toLowerCase()))
// 		let setUstensilesMAJ =[...new Set(ustensilesMAJ)]
// 		ustensilesContainer.innerHTML += setUstensilesMAJ.map(el => `<span class="list list__ustensiles">${el}</span>`).join('')
// 	}