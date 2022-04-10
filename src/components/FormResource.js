import React from 'react'
import PropTypes from 'prop-types'
import { Form, Formik, useField } from 'formik'
import { Button, FormControl, TextField } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

const MyInput = (props) => {
	const [field, meta] = useField(props)

	return(
		<>
			<TextField
				fullWidth
				{...field} 
				{...props}
				error={meta.touched && Boolean(meta.error)}
				helperText={meta.touched && meta.error}
			/>
		</>
	)
}

MyInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string
}

const MySelect = ({label, ...props}) => {
	const [field, meta] = useField(props)

	return(
		<>
			<label htmlFor={props.id || props.name}>{label}</label><br/>
			<select {...field} {...props}/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null }
			<br/>
		</>
	)
}

MySelect.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string
}

const FormResource = ({ initialValues, validationSchema, sendSubmit, ...props}) => {

	const renderSelectOpts = opts => {
		opts.map(opt => {
			return(
				<option key={opt.value} value={opt.value}>{opt.desc}</option>
			)
		})
	}

	const renderFields = props.fieldsList.map((field, index) => {

		const inputTypes = ['text', 'number', 'password', 'email']
		if(inputTypes.includes(field.type)){
			return(
				<FormControl fullWidth sx={{mb: '1.5rem'}}>
					<MyInput 
						key={index}
						label={field.label}
						name={field.name}
						type={field.type}
						placeholder={field?.placeholder}
					/>
				</FormControl>
			)
		}else if(field.typeG === 'select'){
			return(
				<MySelect
					key={index}
					label={field.label}
					name={field.name}
				>
					<option>Sellll</option>
					{renderSelectOpts(field.opts)}
				</MySelect>
			)
		}else{
			return(
				<></>
			)
		}
	})
	return (
		<>
			<Formik 
				initialValues={initialValues} 
				validationSchema={validationSchema}
				onSubmit={(values) =>{
					console.log(values)
					sendSubmit(values)
				}}
			>
				<Form>
					{renderFields}
					<FormControl fullWidth>
						<Button type="submit" variant="contained" endIcon={<LoginIcon/>}>{ props?.submitBtnLabel ? `${props.submitBtnLabel}` : 'Enviar'}</Button>
					</FormControl>
				</Form>
			</Formik>
		</>
	)
}

export default FormResource

FormResource.propTypes = {
	initialValues: PropTypes.object,
	validationSchema: PropTypes.object,
	fieldsList: PropTypes.array,
	sendSubmit: PropTypes.func,
	submitBtnLabel: PropTypes.string
}
