export default function closeKeyword(e){
	let tags = document.querySelectorAll('')
	e.target.parentElement.remove(e.target)
	let valueOfTag = e.target.parentElement.children[0].innerHTML
	// console.log(e.target.parentElement.children[0].innerHTML)
	console.log(tags.indexOf(valueOfTag)) 
}