import { BaseScreen } from '@/screens/base-screen/base-screen.component'
import renderService from '@/services/render.service'

import styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(template, [], styles)
		return element.outerHTML
	}
}
