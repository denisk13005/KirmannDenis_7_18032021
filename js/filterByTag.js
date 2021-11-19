// import generateKeyword from './generateKeyword.js'
// import Recipe from './recipe.js'
// import {filterIngAppUst} from './filterIngAppUst.js'

// // import setFilterRecipeBySearchBar from'../index.js'
// /**
//  * 
//  * @param {Event} e
//  * @param {Object} arrayOfRecipes tableau des recettes
//  * @param {Object} filterRecipeByTag recettes correspondantes au tag selectionné
//  * @param {HTMLElement} container 
//  */

// let arrayOfTags=[]
// let globalArrayOfRecipes = []
// export default function filterByTag(e,valueOfTag,arrayOfRecipes){
// 	console.log(arrayOfRecipes)
// 	let value = e.target.innerHTML.toLowerCase() // récupére le contenu textuel du tag 
// 	globalArrayOfRecipes = arrayOfRecipes
// 	if(arrayOfTags.includes(value)){
// 		let index = arrayOfTags.indexOf(value)
// 		arrayOfTags.splice(index,1)
// 		console.log(arrayOfTags)

// 	}
// 	if(arrayOfTags.includes(valueOfTag)){
// 		let index = arrayOfTags.indexOf(valueOfTag)
// 		arrayOfTags.splice(index,1)
// 		filterOnclick(globalArrayOfRecipes,arrayOfTags)
// 	}
	
// 	else{
// 		arrayOfTags.push(value)
// 		generateKeyword(e)	
// 		filterOnclick(globalArrayOfRecipes,arrayOfTags)
// 	}	

// }

// function filterOnclick(globalArrayOfRecipes,arrayOfTags,arrayOfRecipesToRender){		
	
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
// 	console.log(arrayOfRecipesToRender)
// 	container.innerHTML = ''
// 	for(const recipe of setArrayOfRecipesToRender){
// 		container.innerHTML += new Recipe(recipe).render()
// 	}
// 	filterIngAppUst(setArrayOfRecipesToRender)
// 	globalArrayOfRecipes=setArrayOfRecipesToRender
// 	console.log(setArrayOfRecipesToRender)
// 	console.log('tableau des tags')
// 	console.log(arrayOfTags)
// 	console.log('global array of recipes')
// 	console.log(globalArrayOfRecipes)


// }