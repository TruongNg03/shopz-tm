import './Sidebar.scss';
import SidebarItem from './SidebarItem';
import config from '~/config';
import {
    faArrowRightFromBracket,
    faBoxOpen,
    faCartShopping,
    faComment,
    faHouse,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

function Sidebar() {
    return (
        <div className="sidebar position-fixed h-100">
            {/* change m -> p */}
            <div className="d-flex flex-column align-items-center h-100 p-4">
                <img className="mt-4 mb-5 object-fit-contain rounded-circle" src={images.faruzanCat} alt="faru-img" />
                {/* <h1 className="m-0 pt-3 pb-5 text-white fw-bold">Admin</h1> */}
                <SidebarItem to={config.routes.adminHome} title="Trang chủ" icon={faHouse} />
                <SidebarItem to={config.routes.adminProducts} title="Sản phẩm" icon={faBoxOpen} />
                <SidebarItem to={config.routes.adminUsers} title="Người dùng" icon={faUser} />
                <SidebarItem to={config.routes.adminOrders} title="Đơn hàng" icon={faCartShopping} />
                <SidebarItem to={config.routes.adminFeedbacks} title="Phản hồi" icon={faComment} />
                <SidebarItem to={'/admin/home/#about'} title="Đăng xuất" icon={faArrowRightFromBracket} />
            </div>
        </div>
    );
}

export default Sidebar;
