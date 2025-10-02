import { useState, useEffect } from 'react';
import './AdminUsers.scss';
import { Button, Form, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import useDebounce from '~/hooks/useDebounce';
import * as httpRequest from '~/utils/httpRequest';

function AdminUsers() {
    const [searchUser, setSearchUser] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [showForm, setShowForm] = useState(false);

    const debouncedValue = useDebounce(searchUser, 500);

    useEffect(() => {
        async function getData() {
            const dataUsers = await httpRequest.get(
                `users?search_input=${encodeURIComponent(debouncedValue)}&deleted=${searchStatus}`,
            );

            console.log('all Users:', dataUsers);
            console.log('--------------------');

            if (dataUsers.message) {
                setErrorMessage(dataUsers.message);
                setAllUsers([]);
            } else {
                setAllUsers(dataUsers.users);
                setErrorMessage('');
            }
        }

        getData();
    }, [debouncedValue, searchStatus]);

    // show/hide form
    const handleCloseForm = () => setShowForm(false);

    //
    const handleShowForm = async (e) => {
        try {
            const getUser = await httpRequest.get(`users/${e.target.value}`);
            setUserInfo(getUser);
            console.log(
                getUser.deleted
                    ? `Restore user form for user: ${getUser.email}`
                    : `Delete user form for user: ${getUser.email}`,
            );
            console.log('--------------------');

            setShowForm(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="admin-users">
            <h1 className="fs-1 fw-bold">Danh sách người dùng</h1>
            <div className="admin-search d-flex gap-4 mt-4">
                <Form.Control
                    className="admin-search-label px-4 py-3 fs-3 rounded-4"
                    type="search"
                    placeholder="Tìm kiếm theo tên, email, sđt"
                    aria-label="Search"
                    onChange={(e) => {
                        setSearchUser(e.target.value);
                    }}
                />
                <Form.Select
                    className="admin-search-label px-4 py-3 fs-3 rounded-4"
                    aria-label="Default select example"
                    onChange={(e) => {
                        setSearchStatus(e.target.value);
                    }}
                >
                    <option value="">Tất cả</option>
                    <option value="false">Đang hoạt động</option>
                    <option value="true">Đã khóa</option>
                </Form.Select>
            </div>

            <div className="admin-search-result mt-4 p-3 rounded-4 overflow-auto">
                <Table className="m-0 text-center" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Số đơn hàng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.length > 0 ? (
                            allUsers.map((user, key) => {
                                return (
                                    <tr key={++key}>
                                        <td>{++key}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.numberOrder}</td>
                                        <td>
                                            {user.deleted ? (
                                                <FontAwesomeIcon icon={faLock} />
                                            ) : (
                                                <FontAwesomeIcon icon={faUnlock} />
                                            )}
                                        </td>
                                        <td>
                                            {user.deleted ? (
                                                <Button
                                                    className="fs-4 text-primary text-decoration-underline bg-transparent border-0"
                                                    value={user._id}
                                                    onClick={handleShowForm}
                                                >
                                                    Khôi phục
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="fs-4 text-danger text-decoration-underline bg-transparent border-0"
                                                    value={user._id}
                                                    onClick={handleShowForm}
                                                >
                                                    Khóa
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={7}>
                                    {errorMessage || 'Không tìm thấy người dùng'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* alert form */}
                <Modal show={showForm} onHide={handleCloseForm} keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{userInfo.deleted ? 'Khôi phục' : 'Khóa'} người dùng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn muốn {userInfo.deleted ? 'khôi phục' : 'khóa'} người dùng <strong>{userInfo.email}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="fs-4" variant="secondary" onClick={handleCloseForm}>
                            Hủy
                        </Button>
                        <Button className="fs-4" variant={userInfo.deleted ? 'primary' : 'danger'}>
                            {userInfo.deleted ? 'Khôi phục' : 'Khóa'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default AdminUsers;
