import Nav from 'react-bootstrap/Nav';
import './Header.scss';
import config from '~/config';

const SUB_MENUS = [
    { title: 'Máy tính xách tay', to: '/laptop' },
    { title: 'Điện thoại', to: '/phone' },
    { title: 'Màn hình máy tính', to: '/monitor' },
    { title: 'Phụ kiện', to: '/accessories' },
];

function SubHeader() {
    return (
        <div className="wrapper-sub-header w-100">
            <Nav className="sub-header d-flex justify-content-center mx-5">
                {SUB_MENUS.map((item, key) => {
                    return (
                        <Nav.Item key={key++} className="sub-item text-uppercase py-3">
                            <Nav.Link href={item.to}>{item.title}</Nav.Link>
                        </Nav.Item>
                    );
                })}
            </Nav>
        </div>
    );
}

export default SubHeader;
