import Header from './header.js'
import recipes from './recipes.js'
import Search from './search.js'
import SearchBtns from './searchBtns.js'



export default function generateDOM(){

	// recupération des ingrédients appareils et ustensils
	const ingredients = []
	const appliances = []
	const ustensiles = []

	recipes.forEach((element) => {
		element.ingredients.forEach((el) =>
			ingredients.push(el.ingredient.toLowerCase())
		)
		appliances.push(element.appliance.toLocaleLowerCase())
		element.ustensils.forEach((el) => ustensiles.push(el.toLowerCase()))

	})
	//supression des doublons et conversion en tableau
	const setIngredients = [...new Set(ingredients)] 
	const setAppliances = [...new Set(appliances)]
	const setUstensile = [...new Set(ustensiles)]


	// génération des éléments DOM
	const body = document.body
	const main = document.createElement('main')
	body.appendChild(main)

	//génération du header
	const logo = 'img/logo.png'
	const header = new Header(logo).render()
	main.innerHTML += header

	//génération de la barre de recherche
	const loupe = 'img/loupe.svg'
	const search = new Search(loupe).render()
	main.innerHTML += search

	//génération des mots clé
	const keyword = document.createElement('div')
	keyword.classList.add('keyword')
	main.appendChild(keyword)



	//********************************boutons de sélection *****************/

	//génération des boutons de choix de recherche
	const btns = new SearchBtns(
		setIngredients,
		setAppliances,
		setUstensile
	).render()
	main.innerHTML += btns

	//animation de la fleche
	document.querySelectorAll('.btn').forEach((el) =>
		el.addEventListener('click', () => {
			el.classList.toggle('arrow')
		})
	)
	//récupération des éléments du dom
	const ingredientsContainer = document.querySelector('.ingredients__container')
	const appliancesContainer = document.querySelector('.appliances__container')
	const ustensilesContainer = document.querySelector('.ustensiles__container')
	const btnIngredients = document.querySelector('.btn__ingredients')
	const btnAppliances = document.querySelector('.btn__appareil')
	const btnUstensiles = document.querySelector('.btn__ustensiles')
	const ingInput = document.querySelector('.input__ing')
	const ingApp = document.querySelector('.input__app')
	const ingUst = document.querySelector('.input__ust')
	// apparition des ingrédients
	btnIngredients.addEventListener('click', () => {
		ingredientsContainer.classList.toggle('ingredients__container--visible'),
		appliancesContainer.classList.remove('appliances__container--visible'),
		ustensilesContainer.classList.remove('ustensiles__container--visible'),
		btnAppliances.classList.remove('arrow')
		btnUstensiles.classList.remove('arrow')
		ingApp.classList.remove('input__app--visible')
		ingUst.classList.remove('input__ust--visible')
		ingInput.classList.toggle('input__ing--visible')
		ingInput.focus()
	})
	//apparition des appareils
	btnAppliances.addEventListener('click', () => {
		appliancesContainer.classList.toggle('appliances__container--visible'),
		ustensilesContainer.classList.remove('ustensiles__container--visible'),
		ingredientsContainer.classList.remove('ingredients__container--visible'),
		btnUstensiles.classList.remove('arrow')
		btnIngredients.classList.remove('arrow')
		ingUst.classList.remove('input__ust--visible')
		ingInput.classList.remove('input__ing--visible')
		ingApp.classList.toggle('input__app--visible')
		ingApp.focus()
	})
	//apparition des ustensiles
	btnUstensiles.addEventListener('click', () => {
		ustensilesContainer.classList.toggle('ustensiles__container--visible'),
		ingredientsContainer.classList.remove('ingredients__container--visible'),
		appliancesContainer.classList.remove('appliances__container--visible'),
		btnIngredients.classList.remove('arrow')
		btnAppliances.classList.remove('arrow')
		ingInput.classList.remove('input__ing--visible')
		ingApp.classList.remove('input__app--visible')
		ingUst.classList.toggle('input__ust--visible')
		ingUst.focus()
	})
	//fermeture des choix au click ailleur que sur un boutton
	document.body.addEventListener('click', (e) => {
		if (e.target.getAttribute('data-name') !== 'button') {
			ingredientsContainer.classList.remove('ingredients__container--visible'),
			appliancesContainer.classList.remove('appliances__container--visible'),
			ustensilesContainer.classList.remove('ustensiles__container--visible')
			ingInput.classList.remove('input__ing--visible')
			ingApp.classList.remove('input__app--visible')
			ingUst.classList.remove('input__ust--visible')
			document
				.querySelectorAll('.btn')
				.forEach((el) => el.classList.remove('arrow'))
		}
	})



}
