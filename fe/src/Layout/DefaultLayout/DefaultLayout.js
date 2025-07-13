import Header from '../components/Header';
import Footer from '../components/Footer';
import SubHeader from '../components/Header/SubHeader';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper-default d-flex flex-column min-vh-100">
            <Header />
            <div className="content flex-grow-1">
                <SubHeader />
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
