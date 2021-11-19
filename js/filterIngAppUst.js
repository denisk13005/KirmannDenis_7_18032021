// import closeKeyword from './closeKeyword.js'
// import filterByTag from './filterByTag.js'
import Recipe from './recipe.js'
import generateKeyword from './generateKeyword.js'
//***********************************fonction de filtre des ing, app et ust ********/
/**
 * 
 * @param {Object} arrayOfRecipes tableau de recettes 
 *
 */
let recettesBarreRecherche
export const filterIngAppUst = (arrayOfRecipes) =>{
	recettesBarreRecherche = arrayOfRecipes
	console.log(arrayOfRecipes)
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
	
	document.querySelectorAll('.list').forEach(el => el.addEventListener('click', (e)=>{
		
		let arrayOfRecipesToFilter=arrayOfRecipes
		filterByTag(e,arrayOfRecipesToFilter)
		const closeBtns = document.querySelectorAll('.croix')
		closeBtns.forEach(el => el.addEventListener('click', (e)=> {
			closeKeyword(e,arrayOfRecipesToFilter)
			
		}))
		
		
	}))
}



let arrayOfTags=[]
let filteredArrayOfRecipesBySearchbar
let globalArrayOfRecipes = []
function filterByTag(e,arrayOfRecipes,valueOfTag){
	console.log(arrayOfRecipes)
	console.log(filteredArrayOfRecipesBySearchbar)
	let value = e.target.innerHTML.toLowerCase() // récupére le contenu textuel du tag 
	globalArrayOfRecipes = arrayOfRecipes
	if(arrayOfTags.includes(value)){
		return
		// let index = arrayOfTags.indexOf(value)
		// arrayOfTags.splice(index,1)

	} 

	else{
		arrayOfTags.push(value)
	}	
	console.log(arrayOfTags)
	// filterOnclick(globalArrayOfRecipes,arrayOfTags,e)
	generateKeyword(e)

}




// function filterOnclick(globalArrayOfRecipes,arrayOfTags,e,arrayOfRecipesToRender){		
	
// 	let container = document.querySelector('.container')
// 	arrayOfRecipesToRender=[]
// 	for(const tag of arrayOfTags){
// 		for(const recipe of globalArrayOfRecipes){	
// 			for(const el of recipe.ingredients){
// 				if(el.ingredient.toLowerCase().match(tag))
// 					arrayOfRecipesToRender.push(recipe)
			
// 			}	
// 			if(recipe.appliance.toLowerCase().match(tag)){
// 				arrayOfRecipesToRender.push(recipe)
// 			}
// 			for(const el of recipe.ustensils){
// 				if(el.toLowerCase().match(tag)){
// 					arrayOfRecipesToRender.push(recipe)
// 				}
// 			}
// 		}

// 	}
// 	let setArrayOfRecipesToRender = [...new Set(arrayOfRecipesToRender)]

// 	container.innerHTML = ''
// 	if(setArrayOfRecipesToRender.length>0){
// 		for(const recipe of setArrayOfRecipesToRender){
// 			container.innerHTML += new Recipe(recipe).render()
// 		}	
// 	}
// 	else{
// 		console.log('ok')

// 		for(const recipe of recettesBarreRecherche){
// 			container.innerHTML += new Recipe(recipe).render()
// 		}	
// 	}
	
// 	// globalArrayOfRecipes=setArrayOfRecipesToRender
// 	// filterIngAppUst(globalArrayOfRecipes)


// 	generateKeyword(e)	

// }

function closeKeyword(e,valueOfTag,arrayOfRecipes){
	valueOfTag = e.target.parentElement.children[0].innerHTML.toLowerCase()	
	let index = arrayOfTags.indexOf(valueOfTag)
	console.log(index)
	arrayOfTags.splice(index,1)
	console.log(arrayOfTags)
	e.target.parentElement.remove(e.target)
	
	
	// filterByTag(e,arrayOfRecipes,valueOfTag)
}