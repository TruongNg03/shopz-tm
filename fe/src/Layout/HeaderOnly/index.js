import Header from '../components/Header';
import './HeaderOnly.scss';

function HeaderOnly({ children }) {
    return (
        <div className="wrapper-header-only d-flex flex-column min-vh-100">
            <Header />
            <div className="content-header-only container">{children}</div>
        </div>
    );
}

export default HeaderOnly;
