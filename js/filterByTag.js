import generateKeyword from './generateKeyword.js'
import Recipe from './recipe.js'
import {filterIngAppUst} from './filterIngAppUst.js'

// import setFilterRecipeBySearchBar from'../index.js'
/**
 * 
 * @param {Event} e
 * @param {Object} arrayOfRecipes tableau des recettes
 * @param {Object} filterRecipeByTag recettes correspondantes au tag selectionné
 * @param {HTMLElement} container 
 */

let arrayOfTags = []

export default function filterByTag(e,arrayOfRecipes,color,divKeyword){
	let value = e.target.innerHTML.toLowerCase() // récupére le contenu textuel du span
	if(arrayOfTags.includes(value)){
		console.log(arrayOfTags)
		let index = arrayOfTags.indexOf(value)
		arrayOfTags.splice(index,1)
		console.log(arrayOfTags)

	}else{
		arrayOfTags.push(value)
		generateKeyword(e,color,divKeyword)	
		filterOnclick(arrayOfRecipes,arrayOfTags)
	}	


}

function filterOnclick(arrayOfRecipes,arrayOfTags,arrayOfRecipesToRender){			let container = document.querySelector('.container')
	arrayOfRecipesToRender=[]
	for(const tag of arrayOfTags){
		console.log(tag)
		for(const recipe of arrayOfRecipes){	
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

	console.log(arrayOfRecipesToRender)
	container.innerHTML = ''
	for(const recipe of arrayOfRecipesToRender){
		container.innerHTML += new Recipe(recipe).render()
	}
	filterIngAppUst(arrayOfRecipesToRender)

}