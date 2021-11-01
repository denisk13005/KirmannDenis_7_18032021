/**
 * @param {string} ingredients 
 * @param {string} appliances
 * @param {strinng} ustensiles
 */
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
        <button data-name ='button' class="btn btn__ingredients">Ingrédients
          <input type="text" class="input input__ing"/>
        </button>
        <div class = "contain ingredients__container">
           ${this.ingredients.sort().map(el => `<span class="list list__ingredients">${el}</span>`).join('')}
        </div>
      </div>
      <div class="appliances">
        <button data-name ='button' class="btn btn__appareil">Appareil
          <input type="text" class=" input input__app"/>
        </button>
        <div class = "contain appliances__container">
        ${this.appliances.sort().map(el => `<span class="list list__appliances">${el}</span>`).join('')}
     </div>
      </div>
      <div class="ustensiles">
        <button data-name ='button' class="btn btn__ustensiles">Ustensiles
          <input type="text" class="input input__ust"/>
        </button>
        <div class = "contain ustensiles__container">
        ${this.ustensiles.sort().map(el => `<span class="list list__ustensiles">${el}</span>`).join('')}
     </div>
      </div>
    </div>
    
    `
		return btns
	}
}