// ********************************fonction de filtre des recettes
/**
 * 
 * @param {string} userResearch recherhce de l'utilisateur
 * @param {Array} arrayOfFilteredRecipes tableau de recettes filtrées par rapport à la recherche utilisateur
 * @param {Array} arrayOfRecipes tableau de recettes où faire la recherche
 */
export const filter = (userResearch , arrayOfFilteredRecipes, arrayOfRecipes)=>{
	arrayOfRecipes.forEach(recipe => {
		recipe.ingredients.forEach(el => {
			if(el.ingredient.toLowerCase().includes(userResearch)){
				arrayOfFilteredRecipes.push(recipe)
			}
		})
		if(recipe.name.toLowerCase().includes(userResearch)){
			arrayOfFilteredRecipes.push(recipe)
		}
		if(recipe.description.toLowerCase().includes(userResearch)){
			arrayOfFilteredRecipes.push(recipe)
		}			
	})
}
