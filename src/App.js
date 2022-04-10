import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { PrivateRoute } from './components/PrivateRoute'
/*import useUser from './hooks/useUser'*/
//import Login from './pages/login'
import Login2 from './pages/login2'

const theme = createTheme({
	palette: {
		primary: {
			main: '#1f2d41',
		},
		secondary: {
			main: '#00cfd5'
		}
	}
})

function App() {

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route exact path="/">
						<PrivateRoute>
							<>Home</>
						</PrivateRoute>
					</Route>
					<Route path="/another">
						<PrivateRoute>
							<>Another private page</>
						</PrivateRoute>
					</Route>
					<Route path="/login">
						<Login2 />
					</Route>
					<Route>
						<Redirect to='/' />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	)	
	/*const {isLogged, logout, checkTokenFn} = useUser()

	

	const handleLogout = (e) => {
		e.preventDefault()
		logout()
	}

	const checkToken = (e) => {
		e.preventDefault()
		checkTokenFn()
	}

	return (
		(isLogged ? 
			<>
				<h1>Logged</h1>
				<button onClick={checkToken}>Check Token</button>
				<button onClick={handleLogout}>Logout</button>
			</>
			: 
			<Login />
		)
		
	)*/
}

export default App
