import { useState } from 'react';
import './AdminUsers.scss';
import { Button, Form, Table, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

const USERS = [
    { username: 'abc1', email: 'email1@gmail.com', phone: '0123456789', numOrders: 1, deleted: false },
    { username: 'abc2', email: 'email2@gmail.com', phone: '0123456789', numOrders: 2, deleted: false },
    { username: 'abc3', email: 'email3@gmail.com', phone: '0123456789', numOrders: 3, deleted: true },
];

function AdminUsers() {
    const [searchUser, setSearchUser] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [showForm, setShowForm] = useState(false);

    // show/hide form
    const handleCloseForm = () => setShowForm(false);

    const handleShowForm = (e) => {
        const userCurrInfo = USERS.find((user) => user.email.includes(e.target.value));
        setUserInfo(userCurrInfo);
        console.log(
            userCurrInfo.deleted ? `Restore user: ${userCurrInfo.email}` : `Delete user: ${userCurrInfo.email}`,
        );

        setShowForm(true);
    };

    // search user
    const handleChangeSearch = (e) => {
        console.log('Search user:', e.target.value);

        setSearchUser(e.target.value);
    };

    const handleSearch = () => {
        console.log(
            USERS.filter(
                (user) =>
                    user.email.includes(searchUser) ||
                    user.username.includes(searchUser) ||
                    user.phone.includes(searchUser),
            ),
        );
    };

    return (
        <div className="admin-users">
            <h1 className="fs-1 fw-bold">Danh sách người dùng</h1>
            <div className="admin-search">
                <Form className="admin-search-user d-flex gap-3 fs-3">
                    <Form.Control
                        className="admin-search-label p-3 fs-4 rounded-4"
                        type="search"
                        placeholder="Tìm kiếm theo tên, emal, sđt..."
                        aria-label="Search"
                        onChange={handleChangeSearch}
                    />
                    <Button className="p-3 fs-4 rounded-4" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {USERS.length > 0 ? (
                            USERS.map((user, key) => {
                                return (
                                    <tr key={++key}>
                                        <td>{++key}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.numOrders}</td>
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
                                                    value={user.email}
                                                    onClick={handleShowForm}
                                                >
                                                    Khôi phục
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="fs-4 text-danger text-decoration-underline bg-transparent border-0"
                                                    value={user.email}
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
                                    Chưa có người dùng
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
                        Bạn muốn {userInfo.deleted ? 'khôi phục' : 'khóa'} người dùng {userInfo.email}?
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
