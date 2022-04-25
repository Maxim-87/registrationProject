import React from 'react';
import { useFormik } from 'formik';
import SuperInputText from '../../../components/SuperInputText/SuperInputText';
import SuperButton from '../../../components/SuperButton/SuperButton';
import { useDispatch} from 'react-redux';
import * as Yup from 'yup';
import commonS from './../CommonAuthStyles.module.scss';
import {preLogin} from '../../../../bll/auth-reducer';

export interface ILoginData {
	login: string;
	password: string;
}

export const PreLogin = React.memo(() => {
	console.log('PreLoginForm')
	const dispatch = useDispatch();
	// const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading);
	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
		},
		validationSchema: Yup.object({
			login: Yup.string().email('Invalid email address').required('This field is required'),
			password: Yup.string()
				.min(8, 'Must be at least 8 characters long')
				.required('This field is required'),
		}),
		onSubmit: (values: ILoginData) => {
			console.log(values)
			// @ts-ignore
			dispatch(preLogin(values));
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
						{...formik.getFieldProps('login')}
					/>
					<label className={commonS.formLabel}>E-mail</label>
					{formik.touched.login && formik.errors.login ? (
						<div className={commonS.error}>{formik.errors.login}</div>
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

				<SuperButton type={'submit'} /*disabled={isLoading}*/>Войти</SuperButton>
			</form>
		</>
	);
});


