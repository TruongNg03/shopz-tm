import config from '~/config';

// layout
import HeaderOnly from '~/Layout/HeaderOnly';
import SidebarOnly from '~/Layout/SidebarOnly';

// page
import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Profile from '~/pages/Profile';
import Laptop from '~/pages/Laptop';
import Phone from '~/pages/Phone';
import Monitor from '~/pages/Monitor';
import Accessories from '~/pages/Accessories';
import AllProducts from '~/pages/AllProducts';
import SpecificationProduct from '~/pages/SpecificationProduct';
import Feedback from '~/pages/Feedback';
import SignIn from '~/pages/SignIn';
import NotFoundPage from '~/pages/NotFoundPage';
//admin
import AdminHome from '~/pages/Admin/AdminHome';
import AdminProducts from '~/pages/Admin/AdminProducts';
import AdminUsers from '~/pages/Admin/AdminUsers';
import AdminOrders from '~/pages/Admin/AdminOrders';
import AdminFeedbacks from '~/pages/Admin/AdminFeedbacks';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.laptop, component: Laptop },
    { path: config.routes.phone, component: Phone },
    { path: config.routes.monitor, component: Monitor },
    { path: config.routes.accessories, component: Accessories },
    { path: config.routes.allProducts, component: AllProducts },
    { path: config.routes.testProduct, component: SpecificationProduct },
    { path: config.routes.feedback, component: Feedback },
    { path: config.routes.signIn, component: SignIn, layout: HeaderOnly },
    // admin routes
    { path: config.routes.adminHome, component: AdminHome, layout: SidebarOnly },
    { path: config.routes.adminProducts, component: AdminProducts, layout: SidebarOnly },
    { path: config.routes.adminUsers, component: AdminUsers, layout: SidebarOnly },
    { path: config.routes.adminOrders, component: AdminOrders, layout: SidebarOnly },
    { path: config.routes.adminFeedbacks, component: AdminFeedbacks, layout: SidebarOnly },
    // not found route
    { path: '*', component: NotFoundPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
