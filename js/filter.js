// ********************************fonction de filtre des recettes
/**
 * 
 * @param {string} userResearch recherhce de l'utilisateur
 * @param {Object} arrayOfFilteredRecipes tableau de recettes filtrées par rapport à la recherche utilisateur
 * @param {*} arrayOfRecipes tableau de recettes où faire la recherche
 */
export const filter = (userResearch , arrayOfFilteredRecipes, arrayOfRecipes)=>{
	for (const recipe of arrayOfRecipes) {
		for(const ingredient of recipe.ingredients){
			if(ingredient.ingredient.toLowerCase().match(userResearch)){
				arrayOfFilteredRecipes.push(recipe)
			}
		}	
		if(recipe.name.toLowerCase().match(userResearch)){
			arrayOfFilteredRecipes.push(recipe)
		}
		if(recipe.description.toLowerCase().match(userResearch)){
			arrayOfFilteredRecipes.push(recipe)
		}			
	}
}
