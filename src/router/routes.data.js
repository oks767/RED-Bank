import { Home } from '../components/home/home.component'
import { Auth } from '../components/auth/auth.component'

export const ROUTES = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/auth',
		component: Auth
	}
]
