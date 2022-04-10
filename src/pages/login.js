import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin, selectToken } from './../reducers/userSlice'
//import useUser from '../hooks/useUser'

const Login = () => {
	const [userInput, setUserInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const dispatch = useDispatch()
	const token = useSelector(selectToken)
	const userSliceStatus = useSelector( state => {return state.user.status} )
	let history = useHistory()
	let location = useLocation()
	let {from} = location.state || { from: { pathname: '/' } }

	useEffect( () => {
		if(token){
			history.replace(from)
		}
	}, [token])

	const handleInput = (e) => {
		switch(e.target.name){
		case 'user':
			setUserInput(e.target.value)
			break
		case 'password':
			setPasswordInput(e.target.value)
			break
		}
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		await dispatch(doLogin({user: userInput, password: passwordInput}))
	}

	return (
		<>
			<h1>Please Login</h1>
			<input type="text" name="user" value={userInput} onChange={handleInput} placeholder="User" /><br/>
			<input type="password" name="password" value={passwordInput} onChange={handleInput} placeholder="Pass" /><br/>
			<button onClick={handleLogin}>Login</button>
			<br/>
			{userSliceStatus == 'pending' ? <span>...Loading...</span> : ''}
			{userSliceStatus == 'failed' ? <span>Wrong Authentication</span> : ''}
		</>
	)
}

export default Login