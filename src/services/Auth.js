import baseHttp from './baseHttp'

const Auth = {
	async isAuthenticated () {
		return baseHttp.get('auth')
			.then((res) =>{
				return res
			}).catch((error) => {
				throw error
			})
	},

	async doLogin (data) {
		return baseHttp.post('auth', data)
			.then((res) =>{
				return res
			}).catch((error) => {
				throw error.response
			})
	}
}

export default Auth