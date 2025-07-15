import NavLinkItem from '~/components/NavLinkItem';

const SUB_MENUS = [
    { title: 'Máy tính xách tay', to: '/laptop' },
    { title: 'Điện thoại', to: '/phone' },
    { title: 'Màn hình máy tính', to: '/monitor' },
    { title: 'Phụ kiện', to: '/accessories' },
];

function SubHeader() {
    return (
        <div className="wrapper-sub-header d-flex flex-row align-items-center justify-content-center w-100">
            {SUB_MENUS.map((item, key) => (
                <NavLinkItem key={key++} title={item.title} to={item.to} />
            ))}
        </div>
    );
}

export default SubHeader;
