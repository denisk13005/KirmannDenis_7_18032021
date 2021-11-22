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
	console.log(arrayOfTagsLength)
	if(arrayOfTagsLength ==0){
		filteredRecipesBySearchBar = arrayOfRecipes
		arrayOfFilteredRecipes = filteredRecipesBySearchBar
		console.log('0 tag')
	}
	if(arrayOfTagsLength == 1){
		arrayOfFilteredRecipes = filteredRecipesBy1Tag
		console.log('1 tag')
	}
	if(arrayOfTagsLength == 2 ){
		arrayOfFilteredRecipes = filteredRecipesBy2Tag
		console.log('2 tags')
	}
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
	for(const recipe of arrayOfFilteredRecipes){
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
	
	document.querySelectorAll('.list').forEach(el => el.addEventListener('click', (e)=>{
		createArrayOfTag(e,arrayOfFilteredRecipes)		
		const closeBtns = document.querySelectorAll('.croix')
		closeBtns.forEach(el => el.addEventListener('click', (e)=> {
			closeKeyword(e)
				
		}))
	}))
}



let arrayOfTags=[] // tableau des tags sur lesquels on a clické
let arrayOfTagsLength = 0 // initialisation du nombre de tags sélectionnés
let filteredRecipesByTag = [] // recettes filtrées après un click sur un tag
let valueOfTag ='' // value du tag quand on click sur close
/**
 * 
 * @param {*} e 
 * @param {*} arrayOfRecipes 
 * @param {*} valueOfTag 
 * @returns 
 */
function createArrayOfTag(e,arrayOfFilteredRecipes){
	valueOfTag =	e.target.innerHTML.toLowerCase() // récupére le contenu textuel du tag 
	filteredRecipesByTag = arrayOfFilteredRecipes
	if(!arrayOfTags.includes(valueOfTag)){
		arrayOfTags.push(valueOfTag)
		arrayOfTagsLength++
		generateKeyword(e)

	} 
	filterOnclick(filteredRecipesByTag,arrayOfTags)


}

/**
 * 
 * @param {Object} filteredRecipesByTag tableau de recettes filtrées (par barre de recherche ou par tag)
 * @param {Object} arrayOfTags tableau des tags sélectionnés
 * @param {Object} arrayOfRecipesToRender tableau de recettes triées a afficher
 */

function filterOnclick(filteredRecipesByTag,arrayOfTags,arrayOfRecipesToRender){	
	let container = document.querySelector('.container')
	arrayOfRecipesToRender=[]
	for(const tag of arrayOfTags){
		for(const recipe of filteredRecipesByTag){	
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
	arrayOfFilteredRecipes  = [...new Set(arrayOfRecipesToRender)]
	container.innerHTML = ''
	if(arrayOfTagsLength>0){
		for(const recipe of arrayOfFilteredRecipes){
			container.innerHTML += new Recipe(recipe).render()
		}	
	}

	console.log(valueOfTag)
	console.log(filteredRecipesBySearchBar)
	// if(arrayOfTagsLength == 0){
	// 	console.log('0')
	// 	filterIngAppUst(arrayOfFilteredRecipes)


	// }
	// if(arrayOfTagsLength == 1){
	// 	filteredRecipesBy1Tag = arrayOfFilteredRecipes
	// }
	// if(arrayOfTagsLength==2){
	// 	filteredRecipesBy2Tag = arrayOfFilteredRecipes
	// }
	
	console.log(filteredRecipesBy1Tag)
	console.log(arrayOfFilteredRecipes)
	
	
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
	
	e.target.parentElement.remove(e.target)
	
}

export default createArrayOfTag