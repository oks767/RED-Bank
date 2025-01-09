import { Layout } from '@/components/layout/layout.component'
import { NotFound } from '../components/not-found/not-found.component'
import { ROUTES } from '../router/routes.data'
export class Router {
	#routes
	#currentRoute
	#layout = null
	constructor() {
		this.#routes = ROUTES
		this.#currentRoute = null

		this.#handleRouteChange()
		this.#handleLinks()
	}
	getCurrentPath() {
		return window.location.pathname
	}
	// меняем путь в браузерной строке и переходим по этому пути
	#handleRouteChange() {
		const path = this.getCurrentPath() || '/'
		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = {
				component: NotFound
			}
		}
		this.#currentRoute = route
		this.render()
	}
	// по клику на ближайший родительский элемент ссылки, переходим по адресу ссылки, не обновляя страницу полностью, а только те элементы, которых на странице нет за счет метода render()
	#handleLinks() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.navigate(target.href)
			}
		})
	}

	// Меняем путь при клике на кнопку назад или вперед с помощью метода pushState
	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '', path)
			this.#handleRouteChange()
		}
	}
	render() {
		const component = new this.#currentRoute.component()
		// Если сетка не отрисована, то мы создаем ее на странице, с помощью метода render, иначе просто добавляем контент на экран, не отрисовывая сетку заново
		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component.render()
			})
			document.getElementById('app').innerHTML = this.#layout.render()
		} else {
			document.querySelector('main').innerHTML = component.render()
		}
		document.getElementById('app').innerHTML = component.render()
	}
}
