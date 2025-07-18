import './SidebarOnly.scss';
import Sidebar from '../components/Sidebar';

function SidebarOnly({ children }) {
    return (
        <div className="wrapper-sidebar-only">
            <Sidebar />
            <div className="content-sidebar-only min-vh-100 p-5">
                <div className="container">{children}</div>
            </div>
        </div>
    );
}

export default SidebarOnly;
