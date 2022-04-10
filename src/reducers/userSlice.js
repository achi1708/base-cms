import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Auth from '../services/Auth'

const initialState = {
	token: (window.localStorage.getItem('tkn') || null),
	data: {},
	status: null,
}

export const doLogin = createAsyncThunk(
	'user/doLogin',
	async (dataLogin) => {
		const res = await Auth.doLogin(dataLogin)
		return res.data.token
	}
) 

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, action) => {
			window.localStorage.setItem('tkn', action.payload)
			state.token = action.payload
		},

		removeToken: (state) => {
			window.localStorage.removeItem('tkn')
			state.token = (window.localStorage.getItem('tkn') || null)
		}
	},
	extraReducers: {
		[doLogin.pending]: (state) => {
			state.status = 'loading'
		},
		[doLogin.fulfilled]: (state, action) => {
			state.status = 'success'
			state.token = action.payload
			window.localStorage.setItem('tkn', action.payload)
		},
		[doLogin.rejected]: (state) => {
			console.log('failed')
			state.status = 'failed'
			window.localStorage.removeItem('tkn')
			state.token = (window.localStorage.getItem('tkn') || null)
		}
	}
})

export const { setToken, removeToken } = userSlice.actions

export const selectToken = (state) => state.user.token
export const selectData  = (state) => state.user.data

export const checkTokenThunk = () => {
	return async (dispatch) => {
		try{
			const reqVerifyToken = await Auth.isAuthenticated()
			if(reqVerifyToken.status !== 200){
				console.log('check')
				console.log(reqVerifyToken)
				dispatch(removeToken())
			}
			
		} catch(err) {
			console.log('error')
			console.log(err)
			dispatch(removeToken())
		}
	}
}

export const loginAsync = (dataLogin) => {
	return async (dispatch) => {
		try{
			const reqVerifyToken = await Auth.doLogin(dataLogin)
			if(reqVerifyToken.status === 200 && reqVerifyToken.data?.token){
				console.log('check')
				console.log(reqVerifyToken)
				dispatch(setToken(reqVerifyToken.data?.token))
				return true
			}else{
				dispatch(removeToken())
				console.log(reqVerifyToken)
				return reqVerifyToken
			}
			
		} catch(err) {
			console.log('error')
			console.log(err)
			dispatch(removeToken())
			return err
		}
	}
}

export default userSlice.reducer