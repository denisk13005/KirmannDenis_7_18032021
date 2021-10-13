/**
 * @param {string} name nom de la recette
 * @param {number} time durée de la recette
 * @param {string} ingredient 
 * @param {string} recipe recette
 */
export default class Recipe{
  constructor(name,time,ingredient,recipe){
    this.name=name
    this.time=time
    this.ingredient=ingredient
    this.recipe=recipe
  }
  render(){
    const card = 
    `
    <div class="card">
      <div class="img"></div>
      <div class="description">
        <div class="nameAndTime">
          <p class="name">${this.name}</p>
          <div class="time">
            <img class="clock" src="img/clock.png" alt="horloge" />
            <p class="time">${this.time}</p>
          </div>
        </div>
        <div class="ingredientsAndRecipe">
          <ul class="ingredients">
            ${this.ingredient}
          </ul>
          <p class="recipe">${recipe}</p>
        </div>
      </div>
    </div>
    
    `
    return card

  }
}