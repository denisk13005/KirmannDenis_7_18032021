/**
 * 
 * @param {Event} e
 * @param {Object} arrayOfRecipes tableau des recettes
 * @param {Object} filterRecipeByTag recettes correspondantes au tag selectionné
 * @param {HTMLElement} container 
 */

export default function filterByTag(e,arrayOfRecipes,filterRecipeByTag,container){
	let value = e.target.innerHTML // récupére le contenu textuel du span
	let type = e.target.getAttribute('class') // défini le type de span cliqué(ing, app, ust)
	container.innerHTML = ''
	if(type.includes('ingredients')){
		for(const recipe of arrayOfRecipes){
			for(const el of recipe.ingredients){
				if(el.ingredient.match(value)){
					filterRecipeByTag.push(recipe)
				}
			}
		}
	}
	else if(type.includes('appliances')){
		for(const recipe of arrayOfRecipes){
			if(recipe.appliance.match(value)){
				filterRecipeByTag.push(recipe)
			}
		}
	}
	else{
		for(const recipe of arrayOfRecipes){
			for(const el of recipe.ustensils){
				if(el.match(value)){
					filterRecipeByTag.push(recipe)
					console.log(recipe)
				}
			}
		}
	}	

}
