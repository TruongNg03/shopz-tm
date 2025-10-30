import './Sidebar.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import {
    faArrowRightFromBracket,
    faBoxOpen,
    faCartShopping,
    faComment,
    faHouse,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SidebarItem';
import config from '~/config';
import images from '~/assets/images';

function Sidebar() {
    const navigate = useNavigate();

    const [showLogoutForm, setShowLogoutForm] = useState(false);

    const handleCloseLogoutForm = () => setShowLogoutForm(false);
    const handleShowLogoutForm = () => setShowLogoutForm(true);

    // logout
    const handleLogout = () => {
        localStorage.removeItem('shopz-tm-user');
        navigate(config.routes.home);
        window.location.reload(false);
    };

    return (
        <div className="sidebar position-fixed h-100">
            {/* change m -> p */}
            <div className="d-flex flex-column align-items-center h-100 p-4 overflow-y-auto">
                <img className="mt-4 mb-5 object-fit-contain rounded-circle" src={images.faruzanCat} alt="faru-img" />
                {/* <h1 className="m-0 pt-3 pb-5 text-white fw-bold">Admin</h1> */}
                <SidebarItem to={config.routes.adminHome} title="Trang chủ" icon={faHouse} />
                <SidebarItem to={config.routes.adminProducts} title="Sản phẩm" icon={faBoxOpen} />
                <SidebarItem to={config.routes.adminUsers} title="Người dùng" icon={faUser} />
                <SidebarItem to={config.routes.adminOrders} title="Đơn hàng" icon={faCartShopping} />
                <SidebarItem to={config.routes.adminFeedbacks} title="Phản hồi" icon={faComment} />
                <SidebarItem
                    title="Đăng xuất"
                    icon={faArrowRightFromBracket}
                    notActive
                    onClick={handleShowLogoutForm}
                />
            </div>

            <Modal show={showLogoutForm} onHide={handleCloseLogoutForm} keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="fs-3 fw-bold">Đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn đăng xuất không?</Modal.Body>
                <Modal.Footer>
                    <Button className="fs-4" variant="secondary" onClick={handleCloseLogoutForm}>
                        Hủy
                    </Button>
                    <Button className="fs-4" variant="primary" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Sidebar;
