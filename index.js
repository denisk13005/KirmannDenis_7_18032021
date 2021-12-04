import recipes from './js/recipes.js'
import Recipe from './js/recipe.js'
import { filter } from './js/filter.js'
import { filterIngAppUst } from './js/filterIngAppUst.js'
import { createArrayOfTag } from './js/filterIngAppUst.js'
import { closeKeyword } from './js/filterIngAppUst.js'
import {filteredRecipesBy1Tag,filteredRecipesBy2Tag} from './js/filterIngAppUst.js'
import generateDOM from './js/domGeneration.js'

// génération du dom
generateDOM()

const main = document.getElementsByTagName('main')

//*******************************************recettes*********************/
//génération du conteneur des recettes
const container = document.createElement('div')
container.classList.add('container')
main[0].appendChild(container)
//génération des fiches de recettes

recipes.forEach(
	(element) => (container.innerHTML += new Recipe(element).render())
)
filterIngAppUst(recipes)

//******************************************filtre par la barre de recherche principale**************/
let userResearch // entrée utilisateur dans search
//entrée utilisateur
let setFilterRecipeBySearchBar // résultats de la recherche par barre de recherche débarrassé des doublons
// recettes triées aprés click sur un tag

const searchInput = document.getElementById('search')
searchInput.focus()
searchInput.addEventListener('input', (e) => {
	userResearch = e.target.value.toLowerCase()

	// si on efface tous les caractères de la barre de recherche toutes les recettes se réaffichent
	if (userResearch.length === 0) {
		container.innerHTML = ''
		recipes.forEach(
			(element) => (container.innerHTML += new Recipe(element).render())
		)
		filterIngAppUst(recipes)
	}
	//lance la recherche par la barre de recherche principale au bout du 3 ème caractère
	if (userResearch.length > 2) {
		container.innerHTML = ''	
		console.time('filter')	//lance un timer pour mesurer la durée d'exécution de la fonction filter()
		const filterRecipe = filter(userResearch, recipes)
		console.timeEnd('filter')//arrête le timer 
		setFilterRecipeBySearchBar = [...new Set(filterRecipe)]
		//génération des recettes filtrées
		setFilterRecipeBySearchBar.forEach(recipe => container.innerHTML += new Recipe(recipe).render())

		//maj des ingrédients appareils et ustensiles	

		filterIngAppUst(setFilterRecipeBySearchBar)


		// affichage du message si aucune recette ne correspond à la recherche par barre de recherche
		if (setFilterRecipeBySearchBar.length === 0) {
			container.innerHTML =
        '<p class="noFound"> Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. </p>'
		}
	}
})

//*********************************************filtre par les champs de recherche avancés */
/**
 * 
 * @param {string} userResearchByTag terme recherché dans un champ de recherche avancée
 * @param {Array} arrayOfRecipes tableau des recettes a filtrer
 * @param {Array} recipesFilteredByAdvancedSearchField tableau de recettes filtrées
 */

const ingredientsContainer = document.querySelector('.ingredients__container')
const appliancesContainer = document.querySelector('.appliances__container')
const ustensilesContainer = document.querySelector('.ustensiles__container')
function filteredByAdvancedSearchField(
	userResearchByTag,
	arrayOfRecipes,
	recipesFilteredByAdvancedSearchField
) {
	ingredientsContainer.innerHTML = ''
	appliancesContainer.innerHTML = ''
	ustensilesContainer.innerHTML = ''
	let ingredientsFilteredByAdvancedSearchField = []
	let appliancesFilteredByAdvancedSearchField = []
	let ustensilsFilteredByAdvancedSearchField = []
	
	arrayOfRecipes.forEach(recipe => {
		recipe.ingredients.forEach(el => {
			if (el.ingredient.toLowerCase().includes(userResearchByTag)) {//on vérifie si le terme entrée par l'utilisateur est présent dans les ingredients
				ingredientsFilteredByAdvancedSearchField.push(el.ingredient.toLowerCase())
				recipesFilteredByAdvancedSearchField.push(recipe)
			}
		})
		if (recipe.appliance.toLowerCase().includes(userResearchByTag)) {//on vérifie si le terme entrée par l'utilisateur est présent dans les appareils
			appliancesFilteredByAdvancedSearchField.push(recipe.appliance.toLowerCase())
			recipesFilteredByAdvancedSearchField.push(recipe)
		}
		recipe.ustensils.forEach(el => {
			if (el.toLowerCase().match(userResearchByTag)) {//on vérifie si le terme entrée par l'utilisateur est présent dans les ustensils
				ustensilsFilteredByAdvancedSearchField.push(el.toLowerCase())
				recipesFilteredByAdvancedSearchField.push(recipe)
			}
		})
	})


	//supression des doublons
	let setIngredientsFilteredByAdvancedSearchField = [...new Set(ingredientsFilteredByAdvancedSearchField)]
	let setAppliancesFilteredByAdvancedSearchField = [...new Set(appliancesFilteredByAdvancedSearchField)]
	let setUstensilsFilteredByAdvancedSearchField = [...new Set(ustensilsFilteredByAdvancedSearchField)]
	//génération des spans filtrés
	setIngredientsFilteredByAdvancedSearchField.forEach(el => ingredientsContainer.innerHTML += `<span  class="list list__ingredients">${el}</span>`)
	setAppliancesFilteredByAdvancedSearchField.forEach(el => appliancesContainer.innerHTML += `<span  class="list list__appliances">${el}</span>`)
	setUstensilsFilteredByAdvancedSearchField.forEach(el => ustensilesContainer.innerHTML += `<span  class="list list__ustensiles">${el}</span>`)

}
const divKeywords = document.querySelector('.keyword')
const inputsAdvancedSearch = document.querySelectorAll('.input')

let recipesFilteredByAdvancedSearchField1
let recipesFilteredByAdvancedSearchField2

for (const el of inputsAdvancedSearch) {
	el.addEventListener('input', (e) => {

		let userResearchByTag = e.target.value.toLowerCase() //  terme recherché dans un champ de recherche avancée
		let numberOfTagsSelected = divKeywords.children.length// nombre de tags déjà sélectionné
		let recipesFilteredByAdvancedSearchField = []
	
		//si un tag a déjà été sélectionné		
		
		if(numberOfTagsSelected==1){
			filteredByAdvancedSearchField(
				userResearchByTag,
				filteredRecipesBy1Tag, //tableau des recettes renvoyé par la fonction filterByTag
				recipesFilteredByAdvancedSearchField
			)
		}
		else if(numberOfTagsSelected==2){
			filteredByAdvancedSearchField(
				userResearchByTag,
				filteredRecipesBy2Tag,//tableau des recettes renvoyé par la fonction filterByTag
				recipesFilteredByAdvancedSearchField
			)
		}
			
		// si le champ de recherche principal n'est pas rempli et qu'on rentre un terme directement dans un des champs de recherche avancé
		else if((userResearch === undefined || userResearch.length < 2)  ){
			if(numberOfTagsSelected == 0){
				filteredByAdvancedSearchField(
					userResearchByTag,
					recipes,
					recipesFilteredByAdvancedSearchField
				)		
				recipesFilteredByAdvancedSearchField1=recipesFilteredByAdvancedSearchField
			}
			else if(numberOfTagsSelected==1){
				filteredByAdvancedSearchField(
					userResearchByTag,
					recipesFilteredByAdvancedSearchField1,
					recipesFilteredByAdvancedSearchField
				)		
				recipesFilteredByAdvancedSearchField2=recipesFilteredByAdvancedSearchField
			}
			else if(numberOfTagsSelected==2){
				filteredByAdvancedSearchField(
					userResearchByTag,
					recipesFilteredByAdvancedSearchField2,
					recipesFilteredByAdvancedSearchField
				)		
			}
		}
	
	
		// champ de recherche principal rempli
		else if (userResearch.length > 2 ){
			if(numberOfTagsSelected==0){
				filteredByAdvancedSearchField(
					userResearchByTag,
					setFilterRecipeBySearchBar,
					recipesFilteredByAdvancedSearchField
				)
				recipesFilteredByAdvancedSearchField1 = recipesFilteredByAdvancedSearchField
			}
			else if(numberOfTagsSelected==1){
				filteredByAdvancedSearchField(
					userResearchByTag,
					recipesFilteredByAdvancedSearchField1,
					recipesFilteredByAdvancedSearchField
				)
				recipesFilteredByAdvancedSearchField2 = recipesFilteredByAdvancedSearchField
			}
			else if(numberOfTagsSelected==2){
				filteredByAdvancedSearchField(
					userResearchByTag,
					recipesFilteredByAdvancedSearchField2,
					recipesFilteredByAdvancedSearchField
				)
			}
				
	
		}
			
	
	
		//récupération des tags générés après filtrage avancé
	
		let tagsFilteredByAdvancedSearchField = document.querySelectorAll('.list')
		tagsFilteredByAdvancedSearchField.forEach(tag => {

			tag.addEventListener('click', (e) => {					
				createArrayOfTag([...new Set(recipesFilteredByAdvancedSearchField)], e)						
				const closeBtns = document.querySelectorAll('.croix')
				closeBtns.forEach(btn => {
					btn.addEventListener('click', (e) => {
						closeKeyword(e)
					})

				})
					
			})
		})
		
	})
}

