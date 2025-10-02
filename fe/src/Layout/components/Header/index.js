import './Header.scss';
import { forwardRef, useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser, faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

import Tippy from '@tippyjs/react/headless';
import { Wrapper as TooltipWrapper } from '~/components/Tooltip';
import SearchItem from '~/components/SearchItem';
import NotifyTooltip from '~/components/Tooltip/NotifyTooltip';
import MenuTooltip from '~/components/Tooltip/MenuTooltip/MenuTooltip';
import NavLinkItem from '~/components/NavLinkItem';
import config from '~/config';
import { AuthContext } from '~/context/AuthContext';
import * as httpRequest from '~/utils/httpRequest';
import useDebounce from '~/hooks/useDebounce';

// menu
const MENU_ITEMS = [
    {
        title: 'Đổi ngôn ngữ',
    },
    {
        title: 'Cài đặt hiển thị',
        separate: true,
    },
    {
        title: 'Đăng nhập',
        to: config.routes.signIn,
    },
];

const USER_MENU_ITEMS = [
    {
        title: 'Trang cá nhân',
        to: config.routes.profile,
    },
    ...MENU_ITEMS.slice(0, 2),
    {
        title: 'Đăng xuất',
        to: config.routes.home,
        separate: true,
        onClick: () => {
            localStorage.removeItem('shopz-tm-user');
            window.location.reload(false);
        },
    },
];

const sizeExpandNavbar = 'md';
/* 'sm', 'md', 'lg', 'xl', 'xxl' */

function Header() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchResult, setSearchResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);

    const debouncedValue = useDebounce(searchInput, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        async function getData() {
            const data = await httpRequest.get(`products?search_input=${searchInput}`);
            console.log('search text:', searchInput);
            console.log('search results:', data);

            if (data.message) {
                setSearchResult([]);
                setErrorMessage(data.message);
            } else {
                setSearchResult(data.products);
                setErrorMessage('');
            }
        }

        getData();
    }, [debouncedValue]);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchInput(searchValue);
        }
    };

    const handleSearchBtn = () => {
        if (searchInput.trim() !== '') {
            navigate(`/all-products?q=${encodeURIComponent(searchInput)}`);
        }
    };

    const handleHideResult = () => {
        setShowSearchResult(false);
    };

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
                            <div className="d-flex flex-row justify-content-start align-items-center flex-grow-1 column-gap-2 me-4 text-center">
                                <NavLinkItem className="header-nav-link" title="Trang chủ" to="/" />
                                <NavLinkItem className="header-nav-link" title="Feedback" to="/feedback" />
                            </div>

                            <Form className="search position-relative mx-4">
                                <div className="search-wrapper-tooltip">
                                    <Tippy
                                        placement="bottom"
                                        interactive
                                        visible={showSearchResult && searchResult.length > 0}
                                        render={(attr) => (
                                            <div className="search-result" tabIndex={-1} {...attr}>
                                                <TooltipWrapper searchTooltip>
                                                    {searchResult.map((data, key) => {
                                                        return <SearchItem key={key++} data={data} />;
                                                    })}
                                                </TooltipWrapper>
                                            </div>
                                        )}
                                        onClickOutside={handleHideResult}
                                    >
                                        <Form.Control
                                            className="search-label"
                                            type="search"
                                            placeholder="Tìm kiếm..."
                                            aria-label="Search"
                                            onChange={handleSearchChange}
                                            onFocus={() => setShowSearchResult(true)}
                                        />
                                    </Tippy>
                                </div>
                                <Button className="search-btn" variant="outline-secondary" onClick={handleSearchBtn}>
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
                                                linkTo={config.routes.signIn}
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
                                        visible
                                        render={() => (
                                            <MenuTooltip
                                                header="Thiết lập hệ thống"
                                                data={user ? USER_MENU_ITEMS : MENU_ITEMS}
                                            />
                                        )}
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
