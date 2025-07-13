import './Profile.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import images from '~/assets/images';
import { useState } from 'react';

function Profile() {
    const [showUpdatePfBtn, setShowUpdatePfBtn] = useState(false);
    const [showChangePassBtn, setShowChangePassBtn] = useState(false);

    const handleShowUpdatePfBtn = () => {
        setShowUpdatePfBtn(!showUpdatePfBtn);
    };

    const handleUpdatePf = () => {
        //
        // setShowUpdatePfBtn(false);
    };

    const handleShowChangePassBtn = () => {
        setShowChangePassBtn(!showChangePassBtn);
    };

    const handleChangePass = () => {
        //
        // setShowChangePassBtn(false);
    };

    return (
        <div className="profile container">
            <Row className="pt-5">
                <Col md={4} className="px-4">
                    <div className="mb-4 p-5 bg-white shadow rounded-4">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                className="profile-avatar mb-4 rounded-circle bg-info"
                                src={images.faruzanCat}
                                alt="avatar"
                            />
                            <h2 className="m-0 fs-2 fw-bold">Name</h2>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex flex-column g-3 mt-4">
                            <Button
                                className="change-pf-btn fs-5 text-secondary border-0 bg-transparent"
                                onClick={handleShowUpdatePfBtn}
                            >
                                Thay đổi thông tin cá nhân
                            </Button>
                            <Button
                                className="change-pf-btn fs-5 text-secondary border-0 bg-transparent"
                                onClick={handleShowChangePassBtn}
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md={8} className="px-4">
                    <div className="d-flex flex-column gap-5 p-5 bg-white shadow rounded-4">
                        {/* user profile */}
                        <div className="d-flex flex-column">
                            <h2 className="m-0 fw-bold">Thông tin cá nhân</h2>
                            <div className="mt-4">
                                <Form className="d-flex flex-column gap-4">
                                    <Form.Control
                                        className="fs-4"
                                        size="lg"
                                        type="text"
                                        placeholder="Name"
                                        readOnly={!showUpdatePfBtn}
                                        required
                                    />
                                    <Form.Control
                                        className="fs-4"
                                        size="lg"
                                        type="email"
                                        placeholder="abc@gmail.com"
                                        readOnly={!showUpdatePfBtn}
                                        required
                                    />
                                    <Form.Control
                                        className="fs-4"
                                        size="lg"
                                        type="text"
                                        placeholder="0123456789"
                                        readOnly={!showUpdatePfBtn}
                                    />
                                    {showUpdatePfBtn && (
                                        <Button
                                            type="submit"
                                            className="update-pf-btn py-2 fs-4 fw-bold rounded-5 border-0"
                                            onClick={handleUpdatePf}
                                        >
                                            Cập nhật
                                        </Button>
                                    )}
                                </Form>
                            </div>
                        </div>

                        {/* change password */}
                        {showChangePassBtn && (
                            <div className="d-flex flex-column">
                                <h2 className="m-0 fw-bold">Thay đổi mật khẩu</h2>
                                <div className="mt-4">
                                    <Form className="d-flex flex-column gap-4">
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="password"
                                            placeholder="Mật khẩu cũ"
                                            readOnly={!showChangePassBtn}
                                            required
                                        />
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="password"
                                            placeholder="Mật khẩu mới"
                                            readOnly={!showChangePassBtn}
                                            required
                                        />
                                        {showChangePassBtn && (
                                            <Button
                                                type="submit"
                                                className="update-pf-btn py-2 fs-4 fw-bold rounded-5 border-0"
                                                onClick={handleChangePass}
                                            >
                                                Cập nhật
                                            </Button>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
