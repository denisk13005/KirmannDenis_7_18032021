import { filter } from './filter.js'
//***********************************fonction de filtre des ing, app et ust ********/
/**
 * 
 * @param {Object} arrayOfRecipes tableau de recettes 
 * @param {HTMLElement} ingredientsContainer 
 * @param {HTMLElement} appliancesContainer 
 * @param {HTMLElement} ustensilesContainer 
 */
export const filterIngAppUst = (arrayOfRecipes,ingredientsContainer,appliancesContainer,ustensilesContainer) =>{
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
	

}
