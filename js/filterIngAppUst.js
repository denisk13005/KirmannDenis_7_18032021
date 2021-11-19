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
			closeKeyword(e)
			
		}))
		
		
	}))
}



let arrayOfTags=[]
let arrayOfTagsLength = 0

let filteredArrayOfRecipesBySearchbar
let globalArrayOfRecipes = []
function filterByTag(e,arrayOfRecipes,valueOfTag){
	let value = e.target.innerHTML.toLowerCase() // récupére le contenu textuel du tag 
	globalArrayOfRecipes = arrayOfRecipes
	if(arrayOfTags.includes(value)){
		console.log('deja dans le tableau')
		return
		// let index = arrayOfTags.indexOf(value)
		// arrayOfTags.splice(index,1)

	} 

	else{
		arrayOfTags.push(value)
		arrayOfTagsLength++
	}	
	console.log(arrayOfTags)
	filterOnclick(globalArrayOfRecipes,arrayOfTags,e)
	generateKeyword(e)
	console.log(arrayOfTagsLength)

}




function filterOnclick(globalArrayOfRecipes,arrayOfTags,e,arrayOfRecipesToRender){	
	let container = document.querySelector('.container')
	arrayOfRecipesToRender=[]
	for(const tag of arrayOfTags){
		for(const recipe of globalArrayOfRecipes){	
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
	let setArrayOfRecipesToRender = [...new Set(arrayOfRecipesToRender)]
	container.innerHTML = ''
	if(arrayOfTagsLength>0){
		for(const recipe of setArrayOfRecipesToRender){
			container.innerHTML += new Recipe(recipe).render()
		}	
	}
	
	
	// globalArrayOfRecipes=setArrayOfRecipesToRender
	// filterIngAppUst(globalArrayOfRecipes)


}

function closeKeyword(e,valueOfTag,arrayOfRecipes){
	let container = document.querySelector('.container')
	valueOfTag = e.target.parentElement.children[0].innerHTML.toLowerCase()	
	let index = arrayOfTags.indexOf(valueOfTag)
	e.target.parentElement.remove(e.target)
	console.log(index)
	arrayOfTags.splice(index,1)
	console.log(arrayOfTags)
	arrayOfTagsLength--
	console.log(arrayOfTagsLength)
	if(arrayOfTagsLength == 0){	
		container.innerHTML = ''
		console.log('ok')
		for(const recipe of recettesBarreRecherche){
			container.innerHTML += new Recipe(recipe).render()
		}	
	}
	
	// filterByTag(e,arrayOfRecipes,valueOfTag)
}
