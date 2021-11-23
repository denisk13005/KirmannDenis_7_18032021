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
filterIngAppUst(recipes)  //lance le filtre et le tri au tag


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


const inputs = document.querySelectorAll('.input')
for(const input of inputs){
	input.addEventListener('input', (e)=> {
		let userResearchByTag = e.target.value.toLowerCase()		
		let filterRecipesByTagsInput=[]
		console.log([...new Set(filterRecipesByTagsInput)])
		for(const recipe of recipes){
			for(const el of recipe.ingredients){
				if(el.ingredient.toLowerCase().match(userResearchByTag))
					filterRecipesByTagsInput.push(recipe)

			}
			if(recipe.appliance.toLowerCase().match(userResearchByTag)){
				filterRecipesByTagsInput.push(recipe)
			}
			for(const ustensil of recipe.ustensils){
				if(ustensil.toLowerCase().match(userResearchByTag)){
					filterRecipesByTagsInput.push(recipe)

				}
			}
		}
		// filter(userResearchByTag,filterRecipesByTagsInput,recipes)
		filterIngAppUst([...new Set(filterRecipesByTagsInput)])		
			
	
		if(userResearchByTag.length == 0){
			container.innerHTML = ''		
			for(const recipe of recipes){
				container.innerHTML += new Recipe(recipe).render()
			}
		}
	})	
}
