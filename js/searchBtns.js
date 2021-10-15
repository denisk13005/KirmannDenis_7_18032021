export default class SearchBtns{
  constructor(ingredients,appareil,ustensile){
    this.ingredients=ingredients
    this.appareil=appareil
    this.ustensile=ustensile
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
      <div class="appareil">
        <button class="btn btn__appareil">Appareil</button>
        <span class="list list__appareil">${this.appareil}</span>
      </div>
      <div class="ustensiles">
        <button class="btn btn__ustensiles">Ustensiles</button>
        <span class="list list__ustensiles">${this.ustensile}</span>
      </div>
    </div>
    
    `
    return btns
  }
}