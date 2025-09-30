/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './SignIn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import * as httpRequest from '~/utils/httpRequest';
import config from '~/config';

const cx = classNames.bind(styles);

// check email func
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function SignIn() {
    const { user } = useContext(AuthContext);

    const [showError, setShowError] = useState(false);
    const [showAlertText, setShowAlertText] = useState(false);
    const [userAlertText, setUserAlertText] = useState('');
    const [errorText, setErrorText] = useState('');

    const [activeClass, setActiveClass] = useState(false);
    const classes = cx('sign-in', { active: activeClass });

    // user account info
    const [loginUser, setLoginUser] = useState({
        email: undefined,
        password: undefined,
    });

    const [registerUser, setRegisterUser] = useState({
        email: undefined,
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = () => {
        setActiveClass(true);
        setShowAlertText(false);
    };

    const handleRegister = () => {
        setActiveClass(false);
        setShowAlertText(false);
    };

    // get data login input
    const getLoginEmail = (e) => {
        setLoginUser({
            ...loginUser,
            email: e.target.value.toLowerCase(),
        });
    };

    const getLoginPassword = (e) => {
        setLoginUser({
            ...loginUser,
            password: e.target.value,
        });
    };

    // get data register input
    const getRegisterEmail = (e) => {
        setRegisterUser({
            ...registerUser,
            email: e.target.value.toLowerCase(),
        });
    };

    const getRegisterUsername = (e) => {
        setRegisterUser({
            ...registerUser,
            username: e.target.value,
        });
    };

    const getRegisterPassword = (e) => {
        setRegisterUser({
            ...registerUser,
            password: e.target.value,
        });
    };

    // check email
    const checkEmail = (email) => {
        setShowAlertText(true);

        if (!email) {
            setUserAlertText('Account cannot be empty');
            return false;
        } else if (!validateEmail(email)) {
            setUserAlertText('Invalid email format');
            return false;
        } else {
            setShowAlertText(false);
            return true;
        }
    };

    // check password
    const checkPassword = (password) => {
        setShowAlertText(true);

        if (!password) {
            setUserAlertText('Password cannot be empty');
            return false;
        } else if (password.length < 8 || password.length > 30) {
            setUserAlertText('Invalid email format');
            return false;
        } else {
            setShowAlertText(false);
            return true;
        }
    };

    // login
    const handleLoginAccount = async (e) => {
        e.preventDefault();

        // check data
        console.log('User login:', { email: loginUser.email });

        if (checkEmail(loginUser.email) && checkPassword(loginUser.password)) {
            dispatch({ type: 'LOGIN_START' });

            try {
                const res = await httpRequest.post('auth/login', loginUser);

                if (res.error) {
                    setErrorText(res.message);
                    setShowError(true);
                    return;
                }

                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

                if (res.data.role === 'admin') {
                    navigate(config.routes.adminHome);
                } else {
                    navigate(config.routes.home);
                }
                window.location.reload(false);
            } catch (err) {
                dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
                setShowError(true);
            }
        }
    };

    // register
    const handleRegisterAccount = async (e) => {
        e.preventDefault();
        // check data
        console.log('User register:', { email: registerUser.email, username: registerUser.username });

        // login directly: change REGISTER -> LOGIN
        if (checkEmail(registerUser.email) && checkPassword(registerUser.password)) {
            dispatch({ type: 'REGISTER_START' });

            try {
                const res = await httpRequest.post('auth/register', registerUser);

                if (res.error) {
                    setErrorText(res.message);
                    setShowError(true);
                    return;
                }

                dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });

                window.location.reload(false);
            } catch (err) {
                dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data });
                setShowError(true);
            }
        }
    };

    // show error in 1s
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setShowError(false);
        }
    }, [showError]);

    return (
        <div className={cx(classes)}>
            {/* login form */}
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" onChange={getLoginEmail} required />
                        <FontAwesomeIcon className="input-icon" icon={faUser} />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" onChange={getLoginPassword} required />
                        <FontAwesomeIcon className="input-icon" icon={faLock} />
                    </div>
                    <div className="alert-text">
                        {showAlertText && <p className="mt-0 text-danger">{userAlertText}</p>}
                    </div>
                    <div className="forgot-link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="submit-btn" disabled={user} onClick={handleLoginAccount}>
                        Login
                    </button>
                    <p>or login with social platforms</p>
                    <div className="social-icons">
                        <a href="#">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </form>
            </div>

            {/* register form */}
            <div className="form-box register">
                <form action="">
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="email" placeholder="Email" onChange={getRegisterEmail} required />
                        <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" onChange={getRegisterUsername} required />
                        <FontAwesomeIcon className="input-icon" icon={faUser} />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" onChange={getRegisterPassword} required />
                        <FontAwesomeIcon className="input-icon" icon={faLock} />
                    </div>
                    <div className="alert-text">
                        {showAlertText && <p className="mt-0 text-danger">{userAlertText}</p>}
                    </div>
                    <button type="submit" className="submit-btn" onClick={handleRegisterAccount}>
                        Register
                    </button>
                    <p>or register with social platforms</p>
                    <div className="social-icons">
                        <a href="#">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="#">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account</p>
                    <button className="submit-btn btn-register" onClick={handleSignIn}>
                        Register
                    </button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account</p>
                    <button className="submit-btn btn-register" onClick={handleRegister}>
                        Login
                    </button>
                </div>
            </div>

            {/* error msg */}
            {error && showError && (
                <div className={cx('error-message')}>
                    <p>{error.message}</p>
                </div>
            )}

            {/* error text when db not work */}
            {errorText && showError && (
                <div className={cx('error-message')}>
                    <p>{errorText}</p>
                </div>
            )}

            {/* show alert when logged in */}
            {user && (
                <div className={cx('error-message')}>
                    <p>Bạn đã đăng nhập</p>
                </div>
            )}
        </div>
    );
}

export default SignIn;
