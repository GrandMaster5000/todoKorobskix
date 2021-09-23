import React, {useState} from 'react'
import {
    Typography
} from 'mdc-react'
import './index.scss';
import useStore from '../../hooks/store';

const Auth = () => {
    const { actions } = useStore();
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [error , setError] = useState('');

     function handleLogInButtonClick() {
        if (email && password) {
            actions.loginUser(email, password)
                .catch(error => setError(error.message));
        }
    }

    function handleRegisterButtonClick() {
        if (email && password) {
            actions.registerUser(email, password)
                .catch(error => setError(error.message));
        }
    }

    return (
        <div className='auth-wrapper'>
            <h1 className='auth-title'>Korobskix Todo</h1>

            {error &&
                <Typography>{error}</Typography>
            }

            <div className='auth-form'>
                <input
                    type='email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className='auth-input'
                    placeholder='Электронная почта'
                    required
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='auth-input'
                    placeholder='Пароль'
                    required
                />

                <div className='auth-button-wrapper'>
                    <button onClick={handleLogInButtonClick} className='auth-button'>ВОЙТИ</button>
                    <button onClick={handleRegisterButtonClick} className='auth-button'>ЗАРЕГИСТРИРОВАТСЯ</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;