import React from 'react';
import { useFormik } from 'formik';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { RootStateType } from '../../../../bll/store';
import s from './Login.module.scss';
import commonS from './../CommonAuthStyles.module.scss';
import { Link } from 'react-router-dom';
import { login } from '../../../../bll/auth-reducer';
import { ROUTES } from '../../../../router/routes';

export interface ILoginData {
	email: string;
	password: string;
}

export const PreLoginForm = React.memo(() => {
	const dispatch = useDispatch();
	// const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('This field is required'),
			password: Yup.string()
				.min(8, 'Must be at least 8 characters long')
				.required('This field is required'),
		}),
		onSubmit: (values: ILoginData) => {
			console.log(values)
			// @ts-ignore
			dispatch(login(values));
			formik.resetForm();
		},
	});
	return (
		<>

			<form onSubmit={formik.handleSubmit} className={commonS.form}>
				<div className={commonS.formLine}>
					<SuperInputText
						autoComplete='email'
						type={'email'}
						placeholder={' '}
						{...formik.getFieldProps('email')}
					/>
					<label className={commonS.formLabel}>E-mail</label>
					{formik.touched.email && formik.errors.email ? (
						<div className={commonS.error}>{formik.errors.email}</div>
					) : null}
				</div>


				<div className={commonS.formLine}>
					<SuperInputText type='password'
									autoComplete='password'
									placeholder={' '}
									{...formik.getFieldProps('password')} />
					<label className={commonS.formLabel}>Пароль</label>
					{formik.touched.password && formik.errors.password ? (
						<div className={commonS.error}>{formik.errors.password}</div>
					) : null}
				</div>

				{/*<SuperCheckbox id={'rememberMe'} {...formik.getFieldProps('rememberMe')} />*/}
				<SuperButton type={'submit'} /*disabled={isLoading}*/>Войти</SuperButton>
			</form>
		</>
	);
});


