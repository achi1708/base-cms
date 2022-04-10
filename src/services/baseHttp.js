import axios from 'axios'

const baseHttp = axios.create( {
	baseURL: process.env.REACT_APP_API_URL
})

let token = localStorage.getItem('tkn')

baseHttp.defaults.headers.common['Authorization'] = `Bearer ${token}`

baseHttp.interceptors.request.use(function (config) {
	console.log('INTERCEPTOR AXIOS')
	const token = localStorage.getItem('tkn')
	config.headers.Authorization = `Bearer ${token}`
	console.log(token)

	return config
})

export default baseHttp