import generateKeyword from './generateKeyword.js'
/**
 * 
 * @param {Event} e
 * @param {Object} arrayOfRecipes tableau des recettes
 * @param {Object} filterRecipeByTag recettes correspondantes au tag selectionné
 * @param {HTMLElement} container 
 */

let arrayOfTags = []

export default function filterByTag(e,arrayOfRecipes,filterRecipeByTag,container){
	let value = e.target.innerHTML.toLowerCase() // récupére le contenu textuel du span
	let type = e.target.getAttribute('class') // défini le type de span cliqué(ing, app, ust)
	if(arrayOfTags.includes(value)){
		console.log(arrayOfTags)
		let index = arrayOfTags.indexOf(value)
		arrayOfTags.splice(index,1)
		console.log(arrayOfTags)

	}else{
		arrayOfTags.push(value)
		generateKeyword
	}


	console.log(arrayOfTags)
	container.innerHTML = ''
	if(type.includes('ingredients')){
		for(const recipe of arrayOfRecipes){
			for(const el of recipe.ingredients){
				if(el.ingredient.toLowerCase().match(value)){
					filterRecipeByTag.push(recipe)
				}
			}
		}
	}
	else if(type.includes('appliances')){
		for(const recipe of arrayOfRecipes){
			if(recipe.appliance.toLowerCase().match(value)){
				filterRecipeByTag.push(recipe)
			}
		}
	}
	else{
		for(const recipe of arrayOfRecipes){
			for(const el of recipe.ustensils){
				if(el.toLowerCase().match(value)){
					filterRecipeByTag.push(recipe)
				}
			}
		}
	}	

}
