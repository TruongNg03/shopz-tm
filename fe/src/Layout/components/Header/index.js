import './Header.scss';
import { forwardRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';

import Tippy from '@tippyjs/react/headless';
import images from '~/assets/images';
import { Wrapper as TooltipWrapper } from '~/components/Tooltip';
import SearchItem from '~/components/SearchItem';
import NotifyTooltip from '~/components/Tooltip/NotifyTooltip';
import MenuTooltip from '~/components/Tooltip/MenuTooltip/MenuTooltip';
import NavLinkItem from '~/components/NavLinkItem';
import config from '~/config';

function Header() {
    // example
    const [searchResult, setSearchResult] = useState([
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
        { linkImg: images.defAvatar, contentItem: 'content', to: '/#action' },
    ]);

    // menu
    const MENU_ITEMS = [
        {
            title: 'Đổi ngôn ngữ',
            children: [
                { type: 'language', data: 'Tiếng Anh', checked: false },
                { type: 'language', data: 'Tiếng Việt', checked: true },
                { type: 'language', data: 'Tiếng Nhật', checked: false },
            ],
        },
        {
            title: 'Cài đặt hiển thị',
            children: [
                { type: 'display', data: 'Chế độ sáng', checked: true },
                { type: 'display', data: 'chể độ tối', checked: false },
            ],
            separate: true,
        },
        {
            title: 'Đăng nhập',
            to: config.routes.signIn,
        },
        // {
        //     title: 'Đăng xuất',
        //     to: config.routes.login,
        //     separate: true,
        // },
    ];

    const sizeExpandNavbar = 'md';
    /* 'sm', 'md', 'lg', 'xl', 'xxl' */

    // cart, notify, user button
    const CNUButton = forwardRef((props, ref) => {
        return (
            <Button
                ref={ref}
                href={props.href}
                className="bg-transparent border-0 text-secondary fs-2 rounded-circle hover-btn"
            >
                <FontAwesomeIcon icon={props.icon} />
            </Button>
        );
    });

    return (
        <div className="header position-fixed fixed-top w-100 bg-white z-3 user-select-none">
            <Navbar expand={sizeExpandNavbar} className="content-header shadow-sm navbar navbar-expand-md navbar-light">
                <Container fluid>
                    <Navbar.Brand href="/">Shopz-TM</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${sizeExpandNavbar}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${sizeExpandNavbar}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${sizeExpandNavbar}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${sizeExpandNavbar}`}>
                                Danh mục
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="align-items-center justify-content-end flex-grow-1">
                            <div className="d-flex flex-row justify-content-start align-items-center flex-grow-1 column-gap-1 me-4 text-center">
                                <NavLinkItem className="header-nav-link" title="Trang chủ" to="/" />
                                <NavLinkItem className="header-nav-link" title="Feedback" to="/feedback" />
                                <NavLinkItem className="header-nav-link" title="Action3" to="/action3" />
                                <NavLinkItem className="header-nav-link" title="Action4" to="/action4" />
                            </div>

                            <Form className="search position-relative mx-4">
                                <div className="search-wrapper-tooltip">
                                    <Tippy
                                        placement="bottom"
                                        interactive
                                        // visible={searchResult.length > 0}
                                        render={(attr) => (
                                            <div className="search-result" tabIndex={-1} {...attr}>
                                                <TooltipWrapper searchTooltip>
                                                    {searchResult.map((data, key) => {
                                                        return <SearchItem key={data.to + ` ${key++}`} data={data} />;
                                                    })}
                                                </TooltipWrapper>
                                            </div>
                                        )}
                                    >
                                        <Form.Control
                                            className="search-label"
                                            type="search"
                                            placeholder="Tìm kiếm..."
                                            aria-label="Search"
                                        />
                                    </Tippy>
                                </div>
                                <Button className="search-btn" variant="outline-secondary">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </Form>

                            <Nav className="justify-content-end flex-grow-1 column-gap-4">
                                <CNUButton icon={faCartShopping} href="/cart" />
                                <div>
                                    <Tippy
                                        placement="bottom-end"
                                        interactive
                                        render={() => (
                                            <NotifyTooltip
                                                header="Thông báo"
                                                content="Log in to discover more interesting content"
                                                nameBtn="Đăng nhập"
                                                linkTo="/sign-in"
                                            />
                                        )}
                                    >
                                        <CNUButton icon={faBell} />
                                    </Tippy>
                                </div>
                                <div>
                                    <Tippy
                                        placement="bottom-end"
                                        interactive
                                        // visible
                                        render={() => <MenuTooltip header="Thiết lập hệ thống" data={MENU_ITEMS} />}
                                    >
                                        <CNUButton icon={faCircleUser} />
                                    </Tippy>
                                </div>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
