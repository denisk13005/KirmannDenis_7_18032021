import Keywords from './keyWords.js'
const generateKeyword = (e,color,divKeyword) => {
	if (e.target.getAttribute('class').includes('ingredients')) {
		color = 'blue'
	}
	else if (e.target.getAttribute('class').includes('appliances')) {
		color = 'green'
	} 
	else if(e.target.getAttribute('class').includes('ustensiles')){
		color = 'red'
	}
	divKeyword.innerHTML += new Keywords(e.target.innerHTML, color).render()
}
export default generateKeyword