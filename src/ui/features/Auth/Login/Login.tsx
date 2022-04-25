import React from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { PreLoginForm } from './PreLoginForm';
import commonS from './../CommonAuthStyles.module.scss';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../bll/store';
import { ROUTES } from '../../../../router/routes';

export const PreLogin = React.memo(() => {
	const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);

	if (isLoggedIn) {
		return <Navigate to={ROUTES.PROFILE} />;
	}
	return (
		<>
			<p className={commonS.subtitle}>Войти</p>
			<PreLoginForm />
			<NavLink to={ROUTES.REG} className={commonS.redirectLink}>Registration</NavLink>
		</>
	);
});


