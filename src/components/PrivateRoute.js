import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from './../reducers/userSlice'


export const PrivateRoute = ({children}) => {
	const token = useSelector(selectToken)
	const location = useLocation()

	return Boolean(token) === true && token ? (
		children
	) : (
		<Redirect to={{pathname: '/login', state: { from: location.pathname }}} />
	)
}

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
}