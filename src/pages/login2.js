import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin, selectToken } from './../reducers/userSlice'
import * as Yup from 'yup'
import FormResource from '../components/FormResource'
//import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import { Grid, Card, CardMedia, Typography, CardContent } from '@mui/material'

const LoginForm = {
	initialValues: {
		user: '',
		password: ''
	},
	validationSchema: Yup.object({
		user: Yup.string()
			.required('Required'),
		password: Yup.string()
			.min(6, 'Must be 6 characters min')
			.required('Required')
	}),
	fieldsList: [
		{
			label: 'Username',
			name: 'user',
			id: 'user',
			type: 'text',
			placeholder: 'Username'
		},
		{
			label: 'Password',
			name: 'password',
			id: 'password',
			type: 'password',
			placeholder: 'Password'
		},
	],
	submitBtnLabel: 'Login'
}

const loginStyles = {
	boxContainer: {
		height: '100vh',
		backgroundImage: 'url("bg.svg")',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	}
}

const Login2 = () => {
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

	const handleLogin = async (dataLogin) => {
		await dispatch(doLogin(dataLogin))
	}

	return (
		<>
			<Box sx={loginStyles.boxContainer}>
				<Grid sx={{height: '100vh'}} container direction="row" justifyContent="center" alignItems="center">
					<Grid item xs={12} sm={8} md={5} lg={3}>
						<Card sx={{p: '2.5rem'}}>
							<CardMedia component="img" sx={{ width: '50px', height: '50px', margin: '0 auto'}} image="logo192.png" alt="Company Icon" />
							<CardContent>
								<Typography sx={{textAlign: 'center', pb: '2.5rem'}} component="h5" variant="h5">Log in</Typography>
								<FormResource {...LoginForm} sendSubmit={handleLogin} />
								<br/>
								{userSliceStatus == 'pending' ? <span>...Loading...</span> : ''}
								{userSliceStatus == 'failed' ? <span>Wrong Authentication</span> : ''}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				
			</Box>
		</>
	)
}

export default Login2