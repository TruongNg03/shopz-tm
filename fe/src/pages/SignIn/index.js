/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './SignIn.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SignIn() {
    const [activeClass, setActiveClass] = useState(false)
    const classes = cx('sign-in', {'active': activeClass})

    const handleSignIn = () => {
        setActiveClass(true);
    }

    const handleRegisterBtn = () => {

    }

    const handleLoginBtn = () => {
        setActiveClass(false);
    }

    return (
        <div className={cx(classes)}>
            {/* login form */}
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FontAwesomeIcon className="input-icon" icon={faUser} />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FontAwesomeIcon className="input-icon" icon={faLock} />
                    </div>
                    <div className="forgot-link">
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="submit-btn">
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
                        <input type="text" placeholder="Username" required />
                        <FontAwesomeIcon className="input-icon" icon={faUser} />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FontAwesomeIcon className="input-icon" icon={faLock} />
                    </div>
                    <button type="submit" className="submit-btn">
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
                    <button className="submit-btn btn-register" onClick={handleSignIn}>Register</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account</p>
                    <button className="submit-btn btn-register" onClick={handleLoginBtn}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
