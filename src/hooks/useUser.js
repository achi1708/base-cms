import {useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
	setToken,
	removeToken,
	checkTokenThunk,
	loginAsync,
	selectToken
} from '../reducers/userSlice'

export default function useUser () {
	const user = useSelector(selectToken)
	const dispatch = useDispatch()

	const login = useCallback((dataLogin) => {
		return dispatch(loginAsync(dataLogin))
	}, [dispatch, setToken])

	const logout = useCallback(() => {
		dispatch(removeToken())
	}, [dispatch, removeToken])

	const checkTokenFn = useCallback(() => {
		dispatch(checkTokenThunk())
	}, [dispatch, checkTokenThunk])

	return {
		user,
		isLogged: Boolean(user),
		login,
		logout,
		checkTokenFn
	}
}