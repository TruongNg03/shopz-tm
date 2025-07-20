import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '~/routes';
import { DefaultLayout } from './Layout';
import { AuthContext } from '~/context/AuthContext';

function App() {
    const { user } = useContext(AuthContext);

    // user routes
    const priRoutes = user ? privateRoutes : [];
    // admin routes
    const admRoutes = user ? (user.role === 'admin' ? adminRoutes : []) : [];

    // get all routes
    const allRoutes = [...publicRoutes, ...priRoutes, ...admRoutes];
    // console.log(allRoutes);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {allRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
