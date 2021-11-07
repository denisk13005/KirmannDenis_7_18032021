// ********************************fonction de filtre des recettes
/**
 * 
 * @param {string} userResearch recherhce de l'utilisateur
 * @param {Object} arrayOfFilteredRecipes tableau de recettes filtrées par rapport à la recherhce utilisateur
 * @param {*} arrayOfRecipes tableau de recettes où faire la recherche
 */
export const filter = (userResearch , arrayOfFilteredRecipes, arrayOfRecipes)=>{
	for (const recipe of arrayOfRecipes) {
		for(const ingredient of recipe.ingredients){
			if(ingredient.ingredient.toLowerCase().includes(userResearch)){
				arrayOfFilteredRecipes.push(recipe)
			}
		}	
		if(recipe.name.toLowerCase().includes(userResearch)){
			arrayOfFilteredRecipes.push(recipe)
		}
		if(recipe.description.toLowerCase().includes(userResearch)){
			arrayOfFilteredRecipes.push(recipe)
		}			
	}
}
