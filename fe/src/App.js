import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '~/routes';
import { DefaultLayout } from './Layout';
import { AuthContext } from '~/context/AuthContext';
import config from './config';

function App() {
    const { user } = useContext(AuthContext);

    // get all routes
    let allRoutes = publicRoutes;

    if (user) {
        if (user.role === 'admin') {
            allRoutes = adminRoutes;
        } else {
            allRoutes = [...allRoutes, ...privateRoutes];
        }
    }
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
                    {user?.role === 'admin' && (
                        <Route path="*" element={<Navigate to={config.routes.adminHome} replace />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
