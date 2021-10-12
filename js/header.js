/**
 * @param {string} logo url du logo
 */
export default class Header{
  constructor(logo){
    this.logo = logo
  }
  render(){
    const header = `
    <header>
        <img src="${this.logo}" alt="logo du site les petits plats" />
      </header>    
      
    `
    return header
  }

}