import { Button, Table, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './AdminOrders.scss';
import useDebounce from '~/hooks/useDebounce';
import * as httpRequest from '~/utils/httpRequest';

function AdminOrders() {
    const [searchOrder, setSearchOrder] = useState('');
    const [allOrders, setAllOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteOrderInfo, setDeleteOrderInfo] = useState({});

    const debouncedValue = useDebounce(searchOrder, 500);

    useEffect(() => {
        async function getData() {
            const dataOrders = await httpRequest.get(`orders?search_input=${debouncedValue}`);

            console.log('all orders:', dataOrders);
            console.log('--------------------');

            if (dataOrders.message) {
                setErrorMessage(dataOrders.message);
                setAllOrders([]);
            } else {
                setAllOrders(dataOrders.orders);
                setErrorMessage('');
            }
        }

        getData();
    }, [debouncedValue]);

    const handleShowDeleteModal = (idx, id) => {
        setDeleteOrderInfo({
            idx: idx,
            _id: id,
        });
        setShowDeleteModal(true);
        console.log(deleteOrderInfo);
    };

    const handleDeleteOrder = async (idx, id) => {
        const updatedOrders = allOrders.filter((_, i) => i !== idx);

        const res = await httpRequest.remove(`orders/delete-permanent?id=${id}`);
        console.log(res);

        if (res.status === 200) {
            console.log('delete order:', id);
            setAllOrders(updatedOrders);
            setDeleteOrderInfo({});
        } else {
            alert(res.message);
        }

        setShowDeleteModal(false);
    };

    return (
        <div className="admin-orders">
            <h1 className="fs-1 fw-bold">Danh sách đơn hàng</h1>
            <div className="admin-search d-flex flex-column gap-4 mt-4">
                <Form.Control
                    className="search-label px-4 py-3 fs-3 rounded-4"
                    type="admin-search-text"
                    placeholder="Tìm kiếm đơn hàng"
                    aria-label="Search"
                    onChange={(e) => {
                        setSearchOrder(e.target.value);
                    }}
                />
            </div>

            <div className="admin-search-result mt-4 p-3 rounded-4 overflow-auto">
                <Table className="m-0 text-center" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Sản phẩm</th>
                            <th>Mã sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng cộng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.length > 0 ? (
                            allOrders.map((order, idx) => {
                                return (
                                    <tr key={order._id}>
                                        <td>{++idx}</td>
                                        <td>{order.email}</td>
                                        <td>{order.username}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-4">
                                                <img
                                                    className="admin-order-img"
                                                    src={`${process.env.REACT_APP_BASE_API_URL}${order.img}`}
                                                    alt="product-img"
                                                />
                                                {order.nameProduct}
                                            </div>
                                        </td>
                                        <td>{order.partNumber}</td>
                                        <td>{Number(order.price).toLocaleString('en-US')}₫</td>
                                        <td>{order.numberProduct}</td>
                                        <td>{Number(order.price * order.numberProduct).toLocaleString('en-US')}₫</td>
                                        <td className="fst-italic">{order.status}</td>
                                        <td>
                                            <Button className="fs-4 text-primary text-decoration-underline bg-transparent border-0">
                                                Cập nhật
                                            </Button>
                                            <Button
                                                className="fs-4 text-danger text-decoration-underline bg-transparent border-0"
                                                onClick={() => handleShowDeleteModal(idx - 1, order._id)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={10}>
                                    {errorMessage || 'Chưa có đơn hàng'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-3 fw-bold">Xóa đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có muốn Xóa đơn hàng <strong>{deleteOrderInfo._id || ''}</strong>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="fs-4" variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button
                            className="fs-4"
                            variant="primary"
                            onClick={() => handleDeleteOrder(deleteOrderInfo.idx, deleteOrderInfo._id)}
                        >
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default AdminOrders;
