import  recipes  from './js/recipes.js'
import Header from './js/header.js'
//variables
const body = document.body
const logo = '../img/logo.png'
const main = document.createElement('main')
body.appendChild(main)
//génération du header
const header = new Header(logo).render()
body.innerHTML += header


