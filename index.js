import recipes from './js/recipes.js'
import Header from './js/header.js'
import Search from './js/search.js'
import Keywords from './js/keyWords.js'
import SearchBtns from './js/searchBtns.js'
import Recipe from './js/recipe.js'
import { filter } from './js/filter.js'
import { filterIngAppUst } from './js/filterIngAppUst.js'
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

//animation de la fleche
document.querySelectorAll('.btn').forEach((el) =>
	el.addEventListener('click', () => {
		el.classList.toggle('arrow')
	})
)
//récupération des éléments du dom
const ingredientsContainer = document.querySelector('.ingredients__container')
const appliancesContainer = document.querySelector('.appliances__container')
const ustensilesContainer = document.querySelector('.ustensiles__container')
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
let color
let setFilterRecipes2 // recettes restantes au 1er click sur les tag
let setFilterRecipes3 // recettes testantes au 2eme click sur un tag
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
			//si la recherche a été effectuée par le champ de recherche avancé et que le champ de recherche pricipal n'a pas été rempli ou si plus de keyword sélectionnés et recherche < 2 on rafraichit les vignettes
			if((divKeyword.children.length === 0 && userResearch === undefined) || (divKeyword.children.length === 0 && userResearch.length <= 2)){
				container.innerHTML =''
				recipes.forEach(
					(element) => (container.innerHTML += new Recipe(element).render())
				)
			}	
			if(divKeyword.children.length === 1){
				container.innerHTML = ''
				setFilterRecipeRefrech2.forEach(el => container.innerHTML+= new Recipe(el).render())
				
			}		
			//si on supprime tous les keywords, les vignettes filtrées par le champ de recherche principal réaparaissent
			if(divKeyword.children.length ===0 && userResearch.length>2){
				container.innerHTML=''
				setFilterRecipeSaved.forEach(el=>container.innerHTML += new Recipe(el).render())
				filterIngAppUst(setFilterRecipeSaved,ingredientsContainer,appliancesContainer,ustensilesContainer)
				// génération des keywords sur les span filtrés
				const spansFilter = document.querySelectorAll('.list')
				spansFilter.forEach(span => span.addEventListener('click', (e)=>{
					let filterRecipes2 = []
					container.innerHTML=''
					let tagValue = e.target.innerHTML.toLowerCase()
					filter(tagValue,filterRecipes2,setFilterRecipeSaved)
					setFilterRecipes2 = [...new Set(filterRecipes2)]				
					generateKeyword(e)
					filterIngAppUst(filterRecipeAdvanced,ingredientsContainer,appliancesContainer,ustensilesContainer)
					setFilterRecipes2.forEach(el=>container.innerHTML += new Recipe(el).render())				
				}))
				
			}
			
		})
		
	}
	

	)
}
// let tabSpans=[]
// spans.forEach((span) =>
// 	span.addEventListener('click',(e)=>{
// 		tabSpans=[]
// 		container.innerHTML=''
// 		generateKeyword(e)
// 		filter(e.target.innerHTML,tabSpans,recipes)
// 		let setTabSpans = [...new Set(tabSpans)]
// 		for(const recipe of setTabSpans){
// 			container.innerHTML += new Recipe(recipe).render()
// 		}
// 		console.log(setTabSpans)

// 		filterIngAppUst()
// 	}
// 	))

//*******************************************recettes*********************/
//génération du conteneur des recettes
const container = document.createElement('div')
container.classList.add('container')
main.appendChild(container)
//génération des fiches de recettes

recipes.forEach(
	(element) => (container.innerHTML += new Recipe(element).render())
)


//******************************************filtre par la barre de recherche principale**************/
let userResearch // entrée utilisateur dans search
let filterRecipe = [] // recettes filtrées par la barre de recherche
let setFilterRecipeSaved // sauvegarde des résultats de la recherche 1
let setFilterRecipeRefrech2
let filterRecipeAdvanced = [] // tableau des recettes après click sur un tag
const searchInput = document.getElementById('search')
searchInput.addEventListener('input', (e) => {
	userResearch= e.target.value.toLowerCase()
	if(userResearch.length===0){
		recipes.forEach(
			(element) => (container.innerHTML += new Recipe(element).render())
		)
	}
	//tri des recettes par ing , app ou ust
	if(userResearch.length > 2  ){
		container.innerHTML = ''		
		filter(userResearch, filterRecipe, recipes)
		let setFilterRecipe = [...new Set(filterRecipe)]
		setFilterRecipeSaved=setFilterRecipe
		//génération des recettes filtrées
		for(const recipe of setFilterRecipe){
			container.innerHTML += new Recipe(recipe).render()
		}
		//maj des ingrédients appareils et ustensiles

		filterIngAppUst(filterRecipe,ingredientsContainer,appliancesContainer,ustensilesContainer)
		
		//****************************************génération des keywords
		let tags = document.querySelectorAll('.list')

		for(const tag of tags){
			tag.addEventListener('click', (e)=>{

				console.log('click')
				console.log(divKeyword)
				let value = e.target.innerHTML // récupére le contenu textuel du span
				let type = e.target.getAttribute('class') // défini le type de span cliqué(ing, app, ust)
				container.innerHTML = ''
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
				let setFilterRecipeAdvanced = [...new Set(filterRecipeAdvanced)]
				setFilterRecipeRefrech2 = setFilterRecipeAdvanced
				console.log(setFilterRecipeRefrech2)
				//rendu des recettes filtrées avec recherche avancées
				for(const recipe of setFilterRecipeAdvanced){
					container.innerHTML += new Recipe(recipe).render()
				}
				
				generateKeyword(e)
				filterIngAppUst(filterRecipeAdvanced,ingredientsContainer,appliancesContainer,ustensilesContainer)
				console.log(divKeyword.children.length)
				if(divKeyword.children.length === 1){
					let spans3 = document.querySelectorAll('.list')
					for(const span3 of spans3){
						console.log(span3)
						span3.addEventListener('click', (e)=>{
							console.log('click1')
							let filterRecipes3 = []
							container.innerHTML = ''
							let tagValue= e.target.innerHTML.toLowerCase()
							console.log(tagValue)
							filter(tagValue,filterRecipes3,setFilterRecipeRefrech2)
							console.log(setFilterRecipeRefrech2)
							setFilterRecipes3 = [...new Set(filterRecipes3)]
							filterIngAppUst(setFilterRecipeRefrech2,ingredientsContainer,appliancesContainer,ustensilesContainer)
							generateKeyword(e)
							for(const recipe of setFilterRecipes3){
								container.innerHTML += new Recipe(recipe).render()
							}

						})
					}
				}


			})
			if(filterRecipe.length===0){
				container.innerHTML = '<p class="noFound"> Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. </p>'
			}
		}
		
		
	}
	
})

// //*********************************************filtre par les champs de recherche avancés */

// const inputs = document.querySelectorAll('.input')
// for(const input of inputs){
// 	input.addEventListener('input', (e)=> {
// 		let value = e.target.value.toLowerCase()
// 		const target = e.target.getAttribute('class')
// 		//maj des ingrédients
// 		if(target.includes('ing')){
// 			ingredientsContainer.innerHTML = ''
// 			let ingredientsMAJ = []
// 			for(const ingredient of ingredients){
// 				if(ingredient.includes(value)){
// 					ingredientsMAJ.push(ingredient)
// 				}
// 			}
// 			let setIngredientsMAJ = [...new Set(ingredientsMAJ)]
// 			for(const ingredient of setIngredientsMAJ){
// 				ingredientsContainer.innerHTML += `<span class="list list__ingredients">${ingredient}</span>`


// 			}
// 		}
// 		//maj des appareils
// 		else if(target.includes('app')){
// 			appliancesContainer.innerHTML = ''
// 			let appliancesMAJ = []
// 			for(const appliance of appliances){
// 				if(appliance.includes(value)){
// 					appliancesMAJ.push(appliance)
// 				}
// 			}
// 			let setAppliancesMAJ = [...new Set(appliancesMAJ)]
// 			for(const appliance of setAppliancesMAJ){
// 				appliancesContainer.innerHTML += `<span class="list list__appliances">${appliance}</span>`
// 			}
// 		}
// 		//maj des ustensiles
// 		else{
// 			ustensilesContainer.innerHTML = ''
// 			let ustensilesMAJ = []
// 			for(const ustensile of ustensiles){
// 				if(ustensile.includes(value)){
// 					ustensilesMAJ.push(ustensile)
// 				}
// 			}
// 			let setUstensilesMAJ = [...new Set(ustensilesMAJ)]
// 			for(const ustensile of setUstensilesMAJ){
// 				ustensilesContainer.innerHTML += `<span class="list list__ustensiles">${ustensile}</span>`
// 			}
// 		}
// 		//recettes filtrées par les champs de recherche avancés
		
// 		let filterRecipeByInput=[]	
// 		filter(value,filterRecipeByInput, recipes)
// 		let setFilterRecipeByInput = [...new Set(filterRecipeByInput)]
// 		let spansFilterAdvanced = document.querySelectorAll('.list')
// 		for(const span of spansFilterAdvanced){
// 		//rendu des recettes par filtrage avancé

// 			span.addEventListener('click',()=>{
// 				container.innerHTML = ''
// 				for(const recipe of setFilterRecipeByInput){
// 					container.innerHTML += new Recipe(recipe).render()
// 				}
// 			}				
// 			)
// 		}
// 		//génération du keyword
// 		for(const span of spansFilterAdvanced){
// 			span.addEventListener('click',generateKeyword)
// 		}	
// 		for(const span of spansFilterAdvanced){
// 			span.addEventListener('click', ()=> {
// 				filterRecipeByInput = []
// 				console.log('click')
// 				filter(e.target.innerHTML,filterRecipeByInput,recipes)
			
// 			})
// 		}
// 		console.log(filterRecipeByInput)
// 	})





	
// }

