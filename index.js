import recipes from './js/recipes.js'
// import Keywords from './js/keyWords.js'
import generateKeyword from './js/generateKeyword.js'
import Recipe from './js/recipe.js'
import { filter } from './js/filter.js'
import { filterIngAppUst } from './js/filterIngAppUst.js'
import filterByTag from './js/filterByTag.js'
import generateDOM from './js/domGeneration.js'
// génération du dom
generateDOM()

const main = document.getElementsByTagName('main')

const ingredientsContainer = document.querySelector('.ingredients__container')
const appliancesContainer = document.querySelector('.appliances__container')
const ustensilesContainer = document.querySelector('.ustensiles__container')
//*******************************************recettes*********************/
//génération du conteneur des recettes
const container = document.createElement('div')
container.classList.add('container')
main[0].appendChild(container)
//génération des fiches de recettes

recipes.forEach(
	(element) => (container.innerHTML += new Recipe(element).render())
)


// génération des keywords en fonction du choix utilisateur
const divKeyword = document.querySelector('.keyword')
let color
let setFilterRecipeByClickOnTagAfterRefresh// recettes restantes au 1er click sur les tag
let setFilterRecipeByClickOnTagAfterRefresh2  // recettes testantes au 2eme click sur un tag
let setFilterRecipeByClickOnTagAfterRefresh3// recettes testantes au 3eme click sur un tag
// const generateKeyword = (e) => {
// 	if (e.target.getAttribute('class').includes('ingredients')) {
// 		color = 'blue'
// 	}
// 	else if (e.target.getAttribute('class').includes('appliances')) {
// 		color = 'green'
// 	} 
// 	else if(e.target.getAttribute('class').includes('ustensiles')){
// 		color = 'red'
// 	}
// 	divKeyword.innerHTML += new Keywords(e.target.innerHTML, color).render()
// 	//supression des keywords au click sur la croix
// 	const croix = document.querySelectorAll('.croix')
// 	croix.forEach((el) =>{
// 		el.addEventListener('click', () => {
// 			el.parentElement.remove()//on suprimme le keyword sélectionné
			
// 			//si la recherche a été effectuée par le champ de recherche avancé et que le champ de recherche pricipal n'a pas été rempli ou si plus de keyword sélectionnés et recherche < 2 on rafraichit les vignettes
// 			if((divKeyword.children.length === 0 && userResearch === undefined) || (divKeyword.children.length === 0 && userResearch.length <= 2)){
// 				console.log('ligne 160')
// 				container.innerHTML =''
// 				for(const recipe of recipes){
// 					container.innerHTML += new Recipe(recipe).render()
// 				}
// 				//on remet à jour les ing ...
// 				filterIngAppUst(recipes,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 				// on lance le tri au tag sur le tableau setFilterRecipesByOnlyTag
// 				const tagsRefresh = document.querySelectorAll('.list')
// 				for(const tag of tagsRefresh){
// 					tag.addEventListener('click', (e)=> {
// 						//on relance l'affinage de la recherche par tag
// 						console.log('cas 1+1tag')
// 						let filterRecipesByOnlyTag2 = []
// 						container.innerHTML=''
// 						filterByTag(e,recipes,filterRecipesByOnlyTag2,container)

// 						setFilterRecipeByClickOnTagAfterRefresh = [...new Set(filterRecipesByOnlyTag2)]

// 						for(const recipe of setFilterRecipeByClickOnTagAfterRefresh){
// 							container.innerHTML += new Recipe(recipe).render()
// 						}
// 						generateKeyword(e)
// 						filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 						//on relance l'affinage de la recherche pour 2 tags
// 						const tagsRefresh = document.querySelectorAll('.list')
// 						for(const tag of tagsRefresh){
// 							tag.addEventListener('click', (e)=> {
// 								//on relance l'affinage de la recherche par tag
// 								let filterRecipeByClickOnTagAfterRefresh2 = []
								
// 								filterByTag(e,setFilterRecipeByClickOnTagAfterRefresh,filterRecipeByClickOnTagAfterRefresh2,container)
// 								setFilterRecipeByClickOnTagAfterRefresh2=[...new Set(filterRecipeByClickOnTagAfterRefresh2)]

// 								for(const recipe of setFilterRecipeByClickOnTagAfterRefresh2){
// 									container.innerHTML += new Recipe(recipe).render()
// 								}
// 								generateKeyword(e)
// 								filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh2,ingredientsContainer,appliancesContainer,ustensilesContainer)
		
		
// 							})
// 						}


// 					})
// 				}
// 			}	
// 			//lorsque qu'il reste 1 keyword sélectionné si on a commancé la recherche par un tag
// 			if((divKeyword.children.length === 1 && userResearch === undefined) || (divKeyword.children.length === 1 && userResearch.length <= 2)){
// 				console.log('keyword ==1 && userResearch === undefined ligne 210')
// 				console.log(setFilterRecipeByClickOnTagAfterRefresh)
// 				container.innerHTML =''
// 				for(const recipe of setFilterRecipeByClickOnTagAfterRefresh){
// 					container.innerHTML += new Recipe(recipe).render()
// 				}
// 				// on remet à jour les ing ...
// 				filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 				//on relance l'affinage de la recherche pour 2 tags
// 				const tagsRefresh = document.querySelectorAll('.list')
// 				for(const tag of tagsRefresh){
// 					tag.addEventListener('click', (e)=> {
// 						//on relance l'affinage de la recherche par tag
// 						let filterRecipeByClickOnTagAfterRefresh2 = []						
// 						filterByTag(e,setFilterRecipeByClickOnTagAfterRefresh,filterRecipeByClickOnTagAfterRefresh2,container)
// 						setFilterRecipeByClickOnTagAfterRefresh2=[...new Set(filterRecipeByClickOnTagAfterRefresh2)]
// 						for(const recipe of setFilterRecipeByClickOnTagAfterRefresh2){
// 							container.innerHTML += new Recipe(recipe).render()
// 						}
// 						generateKeyword(e)
// 						filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh2,ingredientsContainer,appliancesContainer,ustensilesContainer)


// 					})
// 				}

// 			}





		
			
// 			//si on supprime tous les keywords, les vignettes filtrées par le champ de recherche principal réaparaissent
// 			if(divKeyword.children.length ===0 && userResearch.length>2){
// 				console.log('divKeyword.children.length ===0 && userResearch.length>2 ligne 246')
// 				//on réaffiche les recettes filtrées par la barre de recherche
// 				container.innerHTML=''
// 				for(const el of setFilterRecipeBySearchBar){
// 					container.innerHTML += new Recipe(el).render()
// 				}
// 				//on remet à jour les ing ...
// 				filterIngAppUst(setFilterRecipeBySearchBar,ingredientsContainer,appliancesContainer,ustensilesContainer)/// on recrée un eventListener sur les tags			
// 				const tagsRefresh = document.querySelectorAll('.list')
// 				for(const tag of tagsRefresh){
// 					tag.addEventListener('click', (e)=> {
// 						//on relance l'affinage de la recherche par tag
// 						let filterRecipeByClickOnTagAfterRefresh = []
// 						container.innerHTML=''
// 						filterByTag(e,setFilterRecipeBySearchBar,filterRecipeByClickOnTagAfterRefresh,container)

// 						setFilterRecipeByClickOnTagAfterRefresh = [...new Set(filterRecipeByClickOnTagAfterRefresh)]

// 						for(const recipe of setFilterRecipeByClickOnTagAfterRefresh){
// 							container.innerHTML += new Recipe(recipe).render()
// 						}
// 						generateKeyword(e)
// 						filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 						//on relance l'affinage de la recherche pour 2 tags
// 						const tagsRefresh = document.querySelectorAll('.list')
// 						for(const tag of tagsRefresh){
// 							tag.addEventListener('click', (e)=> {
// 								//on relance l'affinage de la recherche par tag
// 								let filterRecipeByClickOnTagAfterRefresh2 = []
								
// 								filterByTag(e,filterRecipeByClickOnTagAfterRefresh,filterRecipeByClickOnTagAfterRefresh2,container)
// 								setFilterRecipeByClickOnTagAfterRefresh2=[...new Set(filterRecipeByClickOnTagAfterRefresh2)]

// 								for(const recipe of setFilterRecipeByClickOnTagAfterRefresh2){
// 									container.innerHTML += new Recipe(recipe).render()
// 								}
// 								generateKeyword(e)
// 								filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh2,ingredientsContainer,appliancesContainer,ustensilesContainer)
								
// 								const tagsRefresh = document.querySelectorAll('.list')
// 								for(const tag of tagsRefresh){
// 									tag.addEventListener('click', (e)=> {
// 										//on relance l'affinage de la recherche par tag
// 										let filterRecipeByClickOnTagAfterRefresh3 = []
										
// 										filterByTag(e,filterRecipeByClickOnTagAfterRefresh2,filterRecipeByClickOnTagAfterRefresh3,container)
// 										setFilterRecipeByClickOnTagAfterRefresh3=[...new Set(filterRecipeByClickOnTagAfterRefresh3)]
		
// 										for(const recipe of setFilterRecipeByClickOnTagAfterRefresh3){
// 											container.innerHTML += new Recipe(recipe).render()
// 										}
// 										generateKeyword(e)
// 										filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh3,ingredientsContainer,appliancesContainer,ustensilesContainer)
				
				
// 									})
// 								}
		
// 							})
// 						}


// 					})
// 				}
// 			}


// 			if(divKeyword.children.length === 1 && userResearch.length>2 ){
// 				//on réaffiche les recettes filtrées par tag
// 				console.log('divKeyword.children.length === 1 && userResearch>2 ligne 295')
// 				container.innerHTML = ''
// 				for(const el of setFilterRecipeByClickOnTag){
// 					container.innerHTML += new Recipe(el).render()
// 				}
// 				filterIngAppUst(setFilterRecipeByClickOnTag,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 				//on relance l'affinage de la recherche pour 2 tags
// 				const tagsRefresh = document.querySelectorAll('.list')
// 				for(const tag of tagsRefresh){
// 					tag.addEventListener('click', (e)=> {
// 						//on relance l'affinage de la recherche par tag
// 						container.innerHTML = ''
// 						let filterRecipeByClickOnTagAfterRefresh2 = []
// 						filterByTag(e,setFilterRecipeByClickOnTag,filterRecipeByClickOnTagAfterRefresh2,container)
// 						setFilterRecipeByClickOnTagAfterRefresh2=[...new Set(filterRecipeByClickOnTagAfterRefresh2)]
// 						for(const recipe of setFilterRecipeByClickOnTagAfterRefresh2){
// 							container.innerHTML += new Recipe(recipe).render()
// 						}

// 						generateKeyword(e)
// 						filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh2,ingredientsContainer,appliancesContainer,ustensilesContainer)
	
// 						const tagsRefresh = document.querySelectorAll('.list')
// 						for(const tag of tagsRefresh){
// 							tag.addEventListener('click', (e)=> {
// 								//on relance l'affinage de la recherche par tag
// 								container.innerHTML = ''
// 								let filterRecipeByClickOnTagAfterRefresh3 = []
// 								filterByTag(e,setFilterRecipeByClickOnTag2,filterRecipeByClickOnTagAfterRefresh3,container)
// 								setFilterRecipeByClickOnTagAfterRefresh3=[...new Set(filterRecipeByClickOnTagAfterRefresh3)]
// 								for(const recipe of setFilterRecipeByClickOnTagAfterRefresh3){
// 									container.innerHTML += new Recipe(recipe).render()
// 								}

// 								generateKeyword(e)
// 								filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh3,ingredientsContainer,appliancesContainer,ustensilesContainer)
	
	
// 							})
// 						}


// 					})
// 				}
				
// 			}	


// 			if(divKeyword.children.length === 2 && userResearch.length>2 ){
// 				console.log('divKeyword.children.length === 2 && userResearch.length>2 ligne 328')
// 				container.innerHTML = ''
// 				for(const el of setFilterRecipeByClickOnTag2){
// 					container.innerHTML += new Recipe(el).render()
// 				}
// 				filterIngAppUst(setFilterRecipeByClickOnTag2,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 				//on relance l'affinage de la recherche pour 2 tags
// 				const tagsRefresh = document.querySelectorAll('.list')
// 				for(const tag of tagsRefresh){
// 					tag.addEventListener('click', (e)=> {
// 						//on relance l'affinage de la recherche par tag
// 						container.innerHTML = ''
// 						let filterRecipeByClickOnTagAfterRefresh3 = []
// 						filterByTag(e,setFilterRecipeByClickOnTag2,filterRecipeByClickOnTagAfterRefresh3,container)
// 						setFilterRecipeByClickOnTagAfterRefresh3=[...new Set(filterRecipeByClickOnTagAfterRefresh3)]
// 						for(const recipe of setFilterRecipeByClickOnTagAfterRefresh3){
// 							container.innerHTML += new Recipe(recipe).render()
// 						}

// 						generateKeyword(e)
// 						filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh3,ingredientsContainer,appliancesContainer,ustensilesContainer)
	
	
// 					})
// 				}
// 			}
			
// 		})
		
// 	}
	

// 	)
// }



//*************************************Scénario alternatif A2 */


// const tags = document.querySelectorAll('.list')
// let setFilterRecipesByOnlyTag2 // recettes filtrées après 2 tags
// for(const tag of tags){
// 	tag.addEventListener('click', (e)=> {
// 		console.log('a2')
// 		let filterRecipesByOnlyTag = []	
// 		filterByTag(e,recipes,filterRecipesByOnlyTag,container)
// 		setFilterRecipeByClickOnTagAfterRefresh = [...new Set(filterRecipesByOnlyTag)]
// 		for(const recipe of setFilterRecipeByClickOnTagAfterRefresh){
// 			container.innerHTML += new Recipe(recipe).render()
// 		}
// 		generateKeyword(e,color,divKeyword)
// 		filterIngAppUst(setFilterRecipeByClickOnTagAfterRefresh,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 		const tags = document.querySelectorAll('.list')
// 		for(const tag of tags){
// 			tag.addEventListener('click', (e)=>{
// 				let filterRecipesByOnlyTag2=[]
// 				filterByTag(e,setFilterRecipeByClickOnTagAfterRefresh,filterRecipesByOnlyTag2,container)
// 				setFilterRecipesByOnlyTag2 = [...new Set(filterRecipesByOnlyTag2)]
// 				for(const recipe of setFilterRecipesByOnlyTag2){
// 					container.innerHTML += new Recipe(recipe).render()
// 				}
// 				generateKeyword(e,color,divKeyword)
// 				filterIngAppUst(setFilterRecipesByOnlyTag2,ingredientsContainer,appliancesContainer,ustensilesContainer)
// 			})
// 		}


// 	})
// }




//******************************************filtre par la barre de recherche principale**************/
let userResearch // entrée utilisateur dans search
//entrée utilisateur
let setFilterRecipeBySearchBar // résultats de la recherche par barre de recherche débarrassé des doublons
// recettes triées aprés click sur un tag
let setFilterRecipeByClickOnTag
//recettes triées après click sur 2 tags
let setFilterRecipeByClickOnTag2
//recettes triées après click sur 3 tags
let setFilterRecipeByClickOnTag3

const searchInput = document.getElementById('search')

searchInput.addEventListener('input', (e) => {

	userResearch= e.target.value.toLowerCase()
	if(userResearch.length===0){
		container.innerHTML=''
		recipes.forEach(
			(element) => (container.innerHTML += new Recipe(element).render())
		)
		filterIngAppUst(recipes)		
	}	

	if(userResearch.length > 2  ){
		let filterRecipe = [] // recettes filtrées par la barre de recherche
		container.innerHTML = ''		
		filter(userResearch, filterRecipe, recipes)
		setFilterRecipeBySearchBar = [...new Set(filterRecipe)]
		//génération des recettes filtrées
		for(const recipe of setFilterRecipeBySearchBar){
			container.innerHTML += new Recipe(recipe).render()
		}
		

		//maj des ingrédients appareils et ustensiles

		filterIngAppUst(setFilterRecipeBySearchBar)

	

		// //****************************************affinage de la recherche par tag
		// let tags = document.querySelectorAll('.list')
		
		// for(const tag of tags){
		// 	tag.addEventListener('click', (e)=>{
		// 		console.log('barre de recherche + 1 tag')
		// 		console.log(setFilterRecipeBySearchBar)
		// 		let filter1 = []
		// 		filterByTag(e,setFilterRecipeBySearchBar,filter1,container)	
		// 		setFilterRecipeByClickOnTag = [...new Set(filter1)]	
		// 		for(const recipe of setFilterRecipeByClickOnTag){
		// 			container.innerHTML += new Recipe(recipe).render()
		// 		}
		// 		generateKeyword(e,color,divKeyword)
		// 		filterIngAppUst(setFilterRecipeByClickOnTag,ingredientsContainer,appliancesContainer,ustensilesContainer)
				
		// 		let tags2 = document.querySelectorAll('.list')
		// 		for(const tag2 of tags2){
		// 			tag2.addEventListener('click', (e)=>{
		// 				let filter2 = []
		// 				filterByTag(e,filter1,filter2,container)
		// 				setFilterRecipeByClickOnTag2 = [...new Set(filter2)]	
		// 				for(const recipe of setFilterRecipeByClickOnTag2){
		// 					container.innerHTML += new Recipe(recipe).render()
		// 				}			
		// 				console.log(setFilterRecipeByClickOnTag2)
		// 				generateKeyword(e)
		// 				filterIngAppUst(setFilterRecipeByClickOnTag2,ingredientsContainer,appliancesContainer,ustensilesContainer)

		// 				let tags3=document.querySelectorAll('.list')
		// 				for(const tag3 of tags3){
		// 					tag3.addEventListener('click',(e)=>{
		// 						console.log('barre de recherche + 2 tags')

		// 						let filter3 = []
		// 						filterByTag(e,filter2,filter3,container)
		// 						setFilterRecipeByClickOnTag3 = [...new Set(filter3)]
		// 						console.log(setFilterRecipeByClickOnTag3)
		// 						for(const recipe of setFilterRecipeByClickOnTag3){
		// 							container.innerHTML += new Recipe(recipe).render()
		// 						}
		// 						generateKeyword(e)
		// 						filterIngAppUst(setFilterRecipeByClickOnTag3,ingredientsContainer,appliancesContainer,ustensilesContainer)

		// 					})
		// 				}						

		// 			})
		// 		}
		// 	})

		// 
		// }
		
		if(setFilterRecipeBySearchBar.length===0){
			container.innerHTML = '<p class="noFound"> Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. </p>'
		}
		
	}
	
})
//****************************************scénario alternatif A1 */

// //*********************************************filtre par les champs de recherche avancés */

const inputs = document.querySelectorAll('.input')
for(const input of inputs){
	input.addEventListener('input', (e)=> {
		let userResearchByTag = e.target.value.toLowerCase()

		if(userResearch===undefined || userResearch.length<3 ){
			let filterRecipesByTagsInput=[]
			console.log([...new Set(filterRecipesByTagsInput)])
			filter(userResearchByTag,filterRecipesByTagsInput,recipes)
			filterIngAppUst([...new Set(filterRecipesByTagsInput)],ingredientsContainer,appliancesContainer,ustensilesContainer)
			let tags = document.querySelectorAll('.list')
			for(const tag of tags){
				tag.addEventListener('click',(e)=>{
					container.innerHTML = ''
					for(const recipe of [...new Set(filterRecipesByTagsInput)]){
						container.innerHTML += new Recipe(recipe).render()

					}
					generateKeyword(e)
				})
			}
			
		}
		else{
			let filterRecipesByTagsInput=[]
			filter(userResearchByTag, filterRecipesByTagsInput, setFilterRecipeBySearchBar)
			filterIngAppUst([...new Set(filterRecipesByTagsInput)],ingredientsContainer,appliancesContainer,ustensilesContainer)
			let tags = document.querySelectorAll('.list')
			for(const tag of tags){
				tag.addEventListener('click',(e)=>{
					container.innerHTML = ''
					for(const recipe of [...new Set(filterRecipesByTagsInput)]){
						container.innerHTML += new Recipe(recipe).render()

					}
					generateKeyword(e)
				})
			}



		
		}
	
	})




	
}

