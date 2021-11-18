import closeKeyword from './closeKeyword.js'
import filterByTag from './filterByTag.js'
//***********************************fonction de filtre des ing, app et ust ********/
/**
 * 
 * @param {Object} arrayOfRecipes tableau de recettes 
 * @param {HTMLElement} ingredientsContainer 
 * @param {HTMLElement} appliancesContainer 
 * @param {HTMLElement} ustensilesContainer 
 */
export const filterIngAppUst = (arrayOfRecipes) =>{
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
		filterByTag(e,arrayOfRecipes)
		const closeBtns = document.querySelectorAll('.croix')
		closeBtns.forEach(el => el.addEventListener('click', closeKeyword))
		
		
	}))
}

