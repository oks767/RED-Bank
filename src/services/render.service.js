import htmlFile from './index.html'
class RenderService extends HTMLElement {
	get html() {
		return this.innerHTML;
	}
	
	set html(value) {
		this.innerHTML = value;
	}
	
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.innerHTML = this.html;
	}
}
customElements.define(htmlFile, RenderService)