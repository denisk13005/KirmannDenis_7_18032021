import recipes from './js/recipes.js'
import Recipe from './js/recipe.js'
import { filter } from './js/filter.js'
import  {filterIngAppUst}   from './js/filterIngAppUst.js'
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
let arrayOfFilteredRecipesToReturn = []

filterIngAppUst(recipes,arrayOfFilteredRecipesToReturn)  //lance le filtre et le tri au tag
console.log(arrayOfFilteredRecipesToReturn)

//******************************************filtre par la barre de recherche principale**************/
let userResearch // entrée utilisateur dans search
//entrée utilisateur
let setFilterRecipeBySearchBar // résultats de la recherche par barre de recherche débarrassé des doublons
// recettes triées aprés click sur un tag


const searchInput = document.getElementById('search')
searchInput.focus()
searchInput.addEventListener('input', (e) => {
	userResearch= e.target.value.toLowerCase()
	// si on efface tous les caractères de la barre de recherche toutes les recettes se réaffichent
	if(userResearch.length===0){
		container.innerHTML=''
		recipes.forEach(
			(element) => (container.innerHTML += new Recipe(element).render())
		)
		filterIngAppUst(recipes)		
	}	

	if(userResearch.length > 2  ){
		let filterRecipe = [] // recettes filtrées par la barre de recherche
		container.innerHTML = ''		
		filter(userResearch, filterRecipe, recipes)
		setFilterRecipeBySearchBar = [...new Set(filterRecipe)]
		//génération des recettes filtrées
		for(const recipe of setFilterRecipeBySearchBar){
			container.innerHTML += new Recipe(recipe).render()
		}		

		//maj des ingrédients appareils et ustensiles

		filterIngAppUst(setFilterRecipeBySearchBar)
	

		// affichage du message si aucune recette ne correspond à la recherche par barre de recherche
		if(setFilterRecipeBySearchBar.length===0){
			container.innerHTML = '<p class="noFound"> Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. </p>'
		}
		
	}
	

})
/***************************************scénario alternatif A1 */

//*********************************************filtre par les champs de recherche avancés */

function filteredByAdvancedSearchField(userResearchByTag,arrayOfRecipes,recipesFilteredByAdvancedSearchField){
	for(const recipe of arrayOfRecipes){
		for(const el of recipe.ingredients){

			if(el.ingredient.toLowerCase().match(userResearchByTag)){
				ingredientsContainer.innerHTML += `<span  class="list list__ingredients">${el.ingredient}</span>`
				recipesFilteredByAdvancedSearchField.push(recipe)
			}
		}
		if(recipe.appliance.toLowerCase().match(userResearchByTag)){
			appliancesContainer.innerHTML += `<span  class="list list__appliance">${recipe.appliance}</span>`				
			recipesFilteredByAdvancedSearchField.push(recipe)
		}
		for(const ustensils of recipe.ustensils){
			if(ustensils.toLowerCase().match(userResearchByTag)){
				ustensilesContainer.innerHTML += `<span  class="list list__ustensiles">${ustensils}</span>`	
				recipesFilteredByAdvancedSearchField.push(recipe)

			}
		}

		let tagFilteredByAdvancedInput = document.querySelectorAll('.list')
		for(const tag of tagFilteredByAdvancedInput){
			tag.addEventListener('click', filterIngAppUst([...new Set(recipesFilteredByAdvancedSearchField)]))
		}
	}
	

}

const divKeywords = document.querySelector('.keyword')
const inputs = document.querySelectorAll('.input')
const ingredientsContainer = document.querySelector('.ingredients__container')
const appliancesContainer = document.querySelector('.appliances__container')
const ustensilesContainer = document.querySelector('.ustensiles__container')
console.log(ingredientsContainer)
for(const input of inputs){
	input.addEventListener('input', (e)=> {
		let userResearchByTag = e.target.value.toLowerCase()		
		let numberOfTagsSelected = divKeywords.children.length
		ingredientsContainer.innerHTML=''
		appliancesContainer.innerHTML = ''
		ustensilesContainer.innerHTML = ''
		let recipesFilteredByAdvancedSearchField = []
		if(userResearch.length > 2){
			filteredByAdvancedSearchField(userResearchByTag,setFilterRecipeBySearchBar,recipesFilteredByAdvancedSearchField)

		}

		

	})	
}
