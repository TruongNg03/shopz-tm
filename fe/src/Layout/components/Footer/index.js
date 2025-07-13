import './Footer.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

function Footer() {
    const breakpoint = 'md';
    // 'sm', 'md', 'lg', 'xl', 'xxl'

    const handleToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="footer mt-5 user-select-none">
            <Button className="top-btn w-100 py-4 fs-4 fw-bold border-0 rounded-0" onClick={handleToTop}>
                Back to top
            </Button>

            <Container className="d-flex flex-column align-items-center pt-5">
                <ListGroup horizontal={breakpoint} className="my-2 w-100 d-flex justify-content-between">
                    <ListGroup.Item className="border-0 bg-transparent text-left fw-bold fs-2">
                        Sản phẩm
                        <Nav className="d-flex flex-column">
                            <Nav.Link href="#action1">Dapibus ac facilisis in</Nav.Link>
                            <Nav.Link href="#action2">Porta ac consectetur ac</Nav.Link>
                            <Nav.Link href="#action3">Cras justo odio</Nav.Link>
                            <Nav.Link href="#action4">Vestibulum at eros</Nav.Link>
                        </Nav>
                    </ListGroup.Item>

                    <ListGroup.Item className="border-0 bg-transparent text-left fw-bold fs-2">
                        Dịch vụ & Hỗ trợ
                        <Nav className="d-flex flex-column">
                            <Nav.Link href="#action1">Dapibus ac facilisis in</Nav.Link>
                            <Nav.Link href="#action2">Porta ac consectetur ac</Nav.Link>
                        </Nav>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 bg-transparent text-left fw-bold fs-2">
                        About us
                        <ListGroup className="fs-4 fw-normal">
                            <ListGroup.Item className="border-0 bg-transparent ps-0">
                                <span className="d-flex align-items-center column-gap-3">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p className="m-0">0123456789</p>
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 bg-transparent ps-0">
                                <span className="d-flex align-items-center column-gap-3">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p className="m-0">abc@gmail.com</p>
                                </span>
                            </ListGroup.Item>
                        </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 bg-transparent text-left fw-bold fs-2">
                        Thông báo
                        <Nav className="d-flex flex-column">
                            <Nav.Link href="#action4">Vestibulum at eros</Nav.Link>
                        </Nav>
                    </ListGroup.Item>
                </ListGroup>

                <div className="w-100">
                    <div className="footer-border"></div>
                </div>

                <div className="footer-bottom">
                    <p className="fs-5 m-0">Copyright © SHOPZTM. All Rights Reserved.</p>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
