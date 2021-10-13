import  recipes  from './js/recipes.js'
import Header from './js/header.js'
import Search from './js/search.js'
//variables
const body = document.body
const logo = '../img/logo.png'
const loupe ='../img/loupe.svg'
const main = document.createElement('main')
body.appendChild(main)
//génération du header
const header = new Header(logo).render()
body.innerHTML += header
const search = new Search(loupe).render()
body.innerHTML += search


