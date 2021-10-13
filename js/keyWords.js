/**
 * @param {string} value valeur de l'élément sélectionné
 * @param {string} color couleur du type d'élémént sélectionné
 */
export default class Keywords{
  constructor(value,color){
    this.value=value
    this.color=color
  }
  render(){
    const userChoice=
    `
    <div class="userChoice ${this.color}">
      <p>${this.value}</p>
      <img class="croix" src="img/croix.png" alt="" />
    </div>
    `
    return userChoice
  }
}

   