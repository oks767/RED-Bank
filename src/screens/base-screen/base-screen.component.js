export class BaseScreen {
	#title = null
	constructor(title) {
		this.#title = title
		this.createTitle(this.#title)
		
	}
	// TODO: add title to the document with the title of the screen
	createTitle() {
		document.title = this.#title
	}
	render() {
		return
	}
}
