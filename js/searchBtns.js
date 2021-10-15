export default class SearchBtns{
	constructor(ingredients,appliances,ustensiles){
		this.ingredients=ingredients
		this.appliances=appliances
		this.ustensiles=ustensiles
	}

	render(){
		const btns =
    `
    <div class="btns">
      <div class="ingredients">
        <button class="btn btn__ingredients">Ingrédients</button>
        <div class = "ingredients__container">
           ${this.ingredients.sort().map(el => `<span class="list list__ingredients">${el}</span>`).join('')}
        </div>
      </div>
      <div class="appliances">
        <button class="btn btn__appareil">Appareil</button>
        <div class = "appliances__container">
        ${this.appliances.sort().map(el => `<span class="list list__appliances">${el}</span>`).join('')}
     </div>
      </div>
      <div class="ustensiles">
        <button class="btn btn__ustensiles">Ustensiles</button>
        <div class = "ustensiles__container">
        ${this.ustensiles.sort().map(el => `<span class="list list__ustensiles">${el}</span>`).join('')}
     </div>
      </div>
    </div>
    
    `
		return btns
	}
}