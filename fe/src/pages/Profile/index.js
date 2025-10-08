import './Profile.scss';
import { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import images from '~/assets/images';
import * as httpRequest from '~/utils/httpRequest';
import { AuthContext } from '~/context/AuthContext';

function Profile() {
    const { user } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [changeUserInfo, setChangeUserInfo] = useState({});
    const [changeUserPassword, setChangeUserPassword] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const dataUsers = await httpRequest.get(`users/${user._id}`);

            console.log('get user info:', dataUsers);
            console.log('--------------------');

            if (dataUsers.message) {
                setErrorMessage(dataUsers.message);
            } else {
                setUserInfo(dataUsers);
                setChangeUserInfo({
                    username: dataUsers.username,
                    phone: dataUsers.phone,
                });
                setErrorMessage('');
            }
            setLoading(false);
        }

        getData();
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const res = await httpRequest.patch(`users/update?id=${userInfo._id}`, changeUserInfo);
            console.log(res.data, changeUserInfo);
            setUserInfo((prev) => ({
                ...prev,
                ...changeUserInfo,
            }));
            alert(res.data.message);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response?.data?.message || error.message);
        }
    };

    const handleChangePass = async (e) => {
        e.preventDefault();
        let res = await httpRequest.patch(`users/update?id=${userInfo._id}`, changeUserPassword);
        console.log(res.data, changeUserPassword);

        if (res.message) {
            // error message from api/not connect to db
            console.log(res.message);
            setErrorMessage(res.message);
        } else {
            console.log(res.data.message);
            setChangeUserPassword({
                currentPassword: '',
                newPassword: '',
            });
            setErrorMessage('');
            alert(res.data.message);
        }
    };

    return (
        <div className="profile container">
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <Row className="pt-5">
                    <Col md={4} className="px-4">
                        <div className="mb-4 p-5 bg-white shadow rounded-4">
                            <div className="d-flex flex-column align-items-center">
                                <img
                                    className="profile-avatar mb-4 rounded-circle bg-info"
                                    src={images.faruzanCat}
                                    alt="avatar"
                                />
                                <h2 className="m-0 fs-2 fw-bold">Username</h2>
                            </div>
                            <hr className="my-4" />
                            <div className="d-flex flex-column g-3 mt-4">
                                <Button className="change-pf-btn fs-5 text-secondary border-0 bg-transparent">
                                    Thay đổi avatar
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md={8} className="px-4">
                        <div className="d-flex flex-column gap-5 p-5 bg-white shadow rounded-4">
                            {errorMessage && <p className="m-0 text-danger">{errorMessage}</p>}
                            {/* user profile */}
                            <div className="d-flex flex-column">
                                <h2 className="m-0 fw-bold">Thông tin cá nhân</h2>
                                <div className="mt-4">
                                    <Form className="d-flex flex-column gap-4">
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="email"
                                            placeholder="abc@gmail.com"
                                            value={userInfo.email}
                                            required
                                            disabled
                                        />
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="text"
                                            placeholder="Username"
                                            value={changeUserInfo.username}
                                            aria-required
                                            onChange={(e) => {
                                                setChangeUserInfo({
                                                    ...changeUserInfo,
                                                    username: e.target.value,
                                                });
                                            }}
                                        />
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="text"
                                            placeholder="0123456789"
                                            value={changeUserInfo.phone}
                                            onChange={(e) => {
                                                setChangeUserInfo({
                                                    ...changeUserInfo,
                                                    phone: e.target.value,
                                                });
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            className="update-pf-btn py-2 fs-4 fw-bold rounded-5 border-0"
                                            disabled={
                                                userInfo.username === changeUserInfo.username &&
                                                userInfo.phone === changeUserInfo.phone
                                            }
                                            onClick={handleUpdateProfile}
                                        >
                                            Cập nhật
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                            {/* change password */}
                            <div className="d-flex flex-column mt-4">
                                <h2 className="m-0 fw-bold">Thay đổi mật khẩu</h2>
                                <div className="mt-4">
                                    <p className="mb-1 text-danger opacity-75">*Mật khẩu phải có ít nhất 8 ký tự</p>
                                    <Form className="d-flex flex-column gap-4">
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="password"
                                            placeholder="Mật khẩu cũ"
                                            value={changeUserPassword.currentPassword}
                                            required
                                            onChange={(e) => {
                                                setChangeUserPassword({
                                                    ...changeUserPassword,
                                                    currentPassword: e.target.value,
                                                });
                                            }}
                                        />
                                        <Form.Control
                                            className="fs-4"
                                            size="lg"
                                            type="password"
                                            placeholder="Mật khẩu mới"
                                            value={changeUserPassword.newPassword}
                                            required
                                            onChange={(e) => {
                                                setChangeUserPassword({
                                                    ...changeUserPassword,
                                                    newPassword: e.target.value,
                                                });
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            className="update-pf-btn py-2 fs-4 fw-bold rounded-5 border-0"
                                            disabled={
                                                changeUserPassword.currentPassword.length < 8 ||
                                                changeUserPassword.newPassword.length < 8
                                            }
                                            onClick={handleChangePass}
                                        >
                                            Cập nhật
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default Profile;
