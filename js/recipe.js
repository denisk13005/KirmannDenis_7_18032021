/**
 * @param {string} name nom de la recette
 * @param {number} time durée de la recette
 * @param {string} description description de la recette
 * @param {string} ingredients
 * @param {number} quantity 
 * @param {string} unit 
 */
export default class Recipe{
	constructor({name,time,description,ingredients,quantity,unit}){
		this.name=name
		this.time=time
		this.description=description
		this.ingredients=ingredients
		this.quantity = quantity
		this.unit=unit
	}
	render(){
		const card = 
    `
    <div class="card" >
      <div class="img"></div>
      <div class="description">
        <div class="nameAndTime">
          <p class="name">${this.name}</p>
          <div class="time">
            <img class="clock" src="img/clock.png" alt="horloge" />
            <p class="time">${this.time} min</p>
          </div>
        </div>
        <div class="ingredientsAndRecipe">
          <ul class="ingredientsRecipe">
            
            ${this.ingredients.map(el =>  {
		let unity = el.unit?el.unit:''
		if(unity=='grammes'){
			unity=' g'
		}
		if(el.quantity){
			return `<li>${el.ingredient} : ${el.quantity} ${unity} </li>`
		}else if (el.quantite){
			return `<li>${el.ingredient} : ${el.quantite} ${unity} </li>`
		}else{
			return `<li>${el.ingredient}</li>`
		}
	}).join('')}            
          </ul>
          <p class="recipe">${this.description}</p>
        </div>
      </div>
    </div>
    
    `
		return card

	}
}
