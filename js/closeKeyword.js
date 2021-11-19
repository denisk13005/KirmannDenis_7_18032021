import filterByTag from './filterByTag.js'
export default function closeKeyword(e,valueOfTag,arrayOfRecipes){
	e.target.parentElement.remove(e.target)
	valueOfTag = e.target.parentElement.children[0].innerHTML.toLowerCase()
	filterByTag(e,valueOfTag,arrayOfRecipes)
}