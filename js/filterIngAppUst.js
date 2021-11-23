// import closeKeyword from './closeKeyword.js'
// import filterByTag from './filterByTag.js'
import Recipe from './recipe.js'
import generateKeyword from './generateKeyword.js'
//***********************************fonction de filtre des ing, app et ust ********/
/**
 * 
 * @param {Object} arrayOfRecipes tableau de recettes 
 * @param {Object} arrayOfFilteredRecipes tableau des recettes ayant subit un filterByTag
 *
 */
let filteredRecipesBySearchBar // recettes filtrées par la barre de recherche
let arrayOfFilteredRecipes
let filteredRecipesBy1Tag
let filteredRecipesBy2Tag

export const filterIngAppUst = (arrayOfRecipes) =>{
	if(arrayOfTagsLength == 0){
		filteredRecipesBySearchBar = arrayOfRecipes
	}
	if(arrayOfTagsLength ==1){
		filteredRecipesBy1Tag = arrayOfRecipes
	}
	console.log(arrayOfTagsLength)
	console.log('ligne 19 arrayof recipes')
	console.log(arrayOfRecipes)

	console.log('arrayOfFilteredRecipes ligne 23')
	console.log(arrayOfFilteredRecipes)
	const ingredientsContainer = document.querySelector('.ingredients__container')
	const appliancesContainer = document.querySelector('.appliances__container')
	const ustensilesContainer = document.querySelector('.ustensiles__container')
	ingredientsContainer.innerHTML = ''
	appliancesContainer.innerHTML= ''
	ustensilesContainer.innerHTML= ''
	let ingredientsFilter = []
	let appliancesFilter = []
	let ustensilesFilter = []
	for(const recipe of arrayOfRecipes){
		for(const el of recipe.ingredients){
			ingredientsFilter.push(el.ingredient)
		}
		appliancesFilter.push(recipe.appliance)
		for(const el of recipe.ustensils){
			ustensilesFilter.push(el)
		}		
	}
	let setIngredientsFilter = [...new Set(ingredientsFilter.sort())]
	let setAppliancesFilter = [...new Set(appliancesFilter.sort())]	
	let setUstensilesFilter = [...new Set(ustensilesFilter.sort())]
	for(const el of setIngredientsFilter){
		ingredientsContainer.innerHTML += `<span class="list list__ingredients">${el}</span>`

	}
	for(const el of setAppliancesFilter){
		appliancesContainer.innerHTML+= `<span class="list list__appliances">${el}</span>`
	}
	for(const el of setUstensilesFilter){
		ustensilesContainer.innerHTML += `<span class="list list__ustensiles">${el}</span>`
	}
	const tags = document.querySelectorAll('.list')
	for(const tag of tags){
		tag.addEventListener('click', (e)=>{
			console.log(('on est la'))			
			createArrayOfTag(e,arrayOfRecipes)				
			const closeBtns = document.querySelectorAll('.croix')
			closeBtns.forEach(el => el.addEventListener('click', (e)=> {
				closeKeyword(e)
				
			}))
		})
	}

}



let arrayOfTags=[] // tableau des tags sur lesquels on a clické
let arrayOfTagsLength = 0 // initialisation du nombre de tags sélectionnés
let valueOfTag ='' // value du tag quand on click sur close
/**
 * 
 * @param {*} e 
 * @param {*} arrayOfRecipes 
 * @param {*} valueOfTag 
 * @returns 
 */
function createArrayOfTag(e,arrayOfRecipes){
	arrayOfTags= []
	console.log('create of tag')
	valueOfTag =	e.target.innerHTML.toLowerCase() // récupére le contenu textuel du tag 

	if(!arrayOfTags.includes(valueOfTag)){
		arrayOfTags.push(valueOfTag)
		arrayOfTagsLength++
		generateKeyword(e)

	} 
	console.log(arrayOfTags)

	filterByTag(arrayOfRecipes,arrayOfTags)



}

/**
 * 
 * @param {Object} filteredRecipesByTag tableau de recettes filtrées (par barre de recherche ou par tag)
 * @param {Object} arrayOfTags tableau des tags sélectionnés
 * @param {Object} arrayOfRecipesToRender tableau de recettes triées a afficher
 */

function filterByTag(filteredRecipesByTag,arrayOfTags){	
	console.log(filteredRecipesByTag)
	console.log(('filterByTag'))
	let container = document.querySelector('.container')
	let arrayOfRecipesToRender=[]
	for(const recipe of filteredRecipesByTag){	
		for(const tag of arrayOfTags){

			for(const el of recipe.ingredients){
				if(el.ingredient.toLowerCase().match(tag))
					arrayOfRecipesToRender.push(recipe)
					
			}	
			if(recipe.appliance.toLowerCase().match(tag)){
				arrayOfRecipesToRender.push(recipe)
			}
			for(const el of recipe.ustensils){
				if(el.toLowerCase().match(tag)){
					arrayOfRecipesToRender.push(recipe)
				}
			}
		}
	}
		
	arrayOfFilteredRecipes = [...new Set(arrayOfRecipesToRender)]
	container.innerHTML = ''
	for(const recipe of arrayOfFilteredRecipes){
		container.innerHTML += new Recipe(recipe).render()
	}	

	if(arrayOfTagsLength==1){
		console.log('arrayOfTagsLength==1')
		filteredRecipesBy1Tag = arrayOfFilteredRecipes
		console.log(('1'))
		filterIngAppUst(filteredRecipesBy1Tag)
	}
	if(arrayOfTagsLength == 2){
		filteredRecipesBy2Tag = arrayOfFilteredRecipes
		filterIngAppUst(filteredRecipesBy2Tag)
	}
	
	
	
}
/**
 * 
 * @param {Event} e 
 * @param {string} valueOfTag contenu du tag qu'on veut fermer
 * 
 */
function closeKeyword(e,valueOfTag){
	let container = document.querySelector('.container')
	valueOfTag = e.target.parentElement.children[0].innerHTML.toLowerCase()	
	let index = arrayOfTags.indexOf(valueOfTag)
	console.log(index)
	arrayOfTags.splice(index,1)
	console.log(arrayOfTags)
	arrayOfTagsLength--
	console.log(arrayOfTagsLength)
	if(arrayOfTagsLength == 0){	
		container.innerHTML = ''
		console.log('ok')
		for(const recipe of filteredRecipesBySearchBar){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBySearchBar)
	}
	if(arrayOfTagsLength == 1){	
		container.innerHTML = ''
		console.log('ok')
		for(const recipe of filteredRecipesBy1Tag){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBy1Tag)
	}
	if(arrayOfTagsLength == 2){	
		container.innerHTML = ''
		console.log('ok')
		for(const recipe of filteredRecipesBy2Tag){
			container.innerHTML += new Recipe(recipe).render()
		}	
		filterIngAppUst(filteredRecipesBy2Tag)
	}
	
	e.target.parentElement.remove(e.target)
	
}

export default createArrayOfTag