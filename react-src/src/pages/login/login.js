import React, { useState } from 'react';

import LoginForm from '../../components/loginForm/loginForm';
import PageTitle from '../../components/pageTItle/pageTitle';
import RegisterForm from '../../components/registerForm/registerForm';

import './login.css';

function LoginPage(props) {
    const [login, setLogin] = useState(true);

    const toggleLogin = () => {
        setLogin(!login);
    }

    return (
        <div id="login">
            <PageTitle
                pageTitle={ login ? "Login" : "Register" }
            />
            {
                login 
                ? <LoginForm 
                        authChanger={props.authChanger}
                        toggleLogin={toggleLogin}
                    />
                : <RegisterForm
                        toggleLogin={toggleLogin}
                    />
            }
        </div>
    )
}

export default LoginPage;
