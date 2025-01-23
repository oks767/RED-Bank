import htmlFile from './index.html'
class RenderService extends HTMLElement {

	htmlToElement(html, components = [], styles) {
		const template = document.createElement('template');
		template.innerHTML = html;

		this.#replaceComponentTag
		this.#applyModuleStyles(styles);
		return template.content.firstChild;
	}
	
	#replaceComponentTag(parentElement, components) {
		const componentTagPattern = /^component-/;
		const allElements = parentElement.getElementByTagName('*');
		for (const element of allElements) {
			if (componentTagPattern.test(element.tagName.toLowerCase())) {
				const componentName = element.tagName.toLowerCase().replace(componentTagPattern, '').replace(/-/g, '');
				// найти компонент в массиве компонентов в текущей итерации цикла
				const foundComponent = components.find(Component => {
					const instance = Component instanceof ChildComponent ? Component : new Component();
					return instance.constructor.name.toLowerCase() === componentName;
				});
				// если компонент найден, заменить элемент на содержимое компонента
				if(foundComponent) {
					const componentContent = foundComponent instanceof ChildComponent ? foundComponent : new foundComponent().render();
					element.replaceWith(componentContent);
				} else {
					console.error(`Component ${componentName} not found`);
				}
			}
		}
	}
	// create #applyModuleStyles
	// будет принимать стили в виде объекта styles: {componentName: 'styles'}; нужно создать массив, пройтись по нему и добавлять уникальные значения к классу элемента
	#applyModuleStyles (style) {
		const styleElement = Object.entries(style).map(([componentName, styles]) => {
			const componentReplacePattern = new RegExp(`component-${componentName}`, 'g');
			// нужно передать уникальное значение класса для замены с помощью replace
			return styles.replace(componentReplacePattern, '');
	}, '');	
	styleElement.innerHTML = styleElement;
	}
}
