import React from 'react';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import {ProfileStateType} from '../../../bll/profile-reducer';


export const Profile = React.memo(() => {
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn);
    const profile = useSelector<RootStateType, ProfileStateType>(state => state.profile);

    if (isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div>
            <p> <b>Username:</b> </p>
            <p> <b>E-mail:</b>: </p>
        </div>
    );
});


