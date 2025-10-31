import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Cart.scss';
import { AuthContext } from '~/context/AuthContext';
import * as httpRequest from '~/utils/httpRequest';
import config from '~/config';

function Cart() {
    const { user } = useContext(AuthContext);

    const [allOrders, setAllOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [summary, setSummary] = useState(0);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    useEffect(() => {
        async function getData() {
            if (user) {
                const dataOrders = await httpRequest.get(`orders?email=${user.email}`);

                console.log('my orders:', dataOrders);
                console.log('--------------------');

                if (dataOrders.message) {
                    setErrorMessage(dataOrders.message);
                    setAllOrders([]);
                } else {
                    setAllOrders(dataOrders.orders);
                    setErrorMessage('');
                }
            } else {
                setErrorMessage('Đăng nhập để sử dụng chức năng này');
            }
        }

        getData();
    }, [user]);

    useEffect(() => {
        const total = allOrders.reduce((sum, item) => sum + item.price * item.numberProduct, 0);
        setSummary(total);
    }, [allOrders]);

    const handleChangeNumberProduct = async (e, idx) => {
        const updatedOrders = [...allOrders];
        updatedOrders[idx].numberProduct = e.target.value;

        const res = await httpRequest.patch(`orders/update?id=${e.target.id}`, { numberProduct: e.target.value });
        console.log('update order:', res.data.order);

        if (res.data.order) {
            setAllOrders(updatedOrders);
        } else {
            alert(res.message);
        }
    };

    const handleDeleteOrder = async (idx, id) => {
        const updatedOrders = allOrders.filter((_, i) => i !== idx);

        const res = await httpRequest.remove(`orders/delete-permanent?id=${id}`);
        console.log(res);

        if (res.status === 200) {
            console.log('delete order:', id);
            setAllOrders(updatedOrders);
        } else {
            alert(res.message);
        }
    };

    const handleDeleteAllOrders = async () => {
        const allOrderIds = allOrders.map((order) => order._id);
        console.log('all order ids:', allOrderIds);

        const res = await httpRequest.remove('orders/delete-permanent-orders', { ids: allOrderIds });
        console.log(res);

        if (res.status === 200) {
            console.log('delete all orders');
            setAllOrders([]);
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="cart container">
            {!user && (
                <span className="fs-3">
                    Vui lòng{' '}
                    <NavLink to="/sign-in" className="m-0 text-decoration-underline text-primary">
                        đăng nhập
                    </NavLink>{' '}
                    để dùng chức năng này
                </span>
            )}

            {user && (
                <div className="wrapper-cart pt-5 px-3">
                    <div className="title-cart my-3">
                        <h1 className="fw-bold fs-2">Giỏ hàng</h1>
                    </div>

                    {allOrders.length === 0 && (
                        <div className="m-5">
                            <span className="fs-3 text-center">
                                <p className="m-0">Danh sách giỏ hàng trống</p>
                                <p className="m-0">
                                    <NavLink to="/">Đi mua sắm</NavLink>
                                </p>
                            </span>
                        </div>
                    )}

                    {allOrders.length > 0 && (
                        <div className="list-summary">
                            <div className="list-carts h-100 flex-grow-1 p-3 rounded-2">
                                <Table className="bg-transparent m-0" striped hover>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left' }}>Sản phẩm của bạn</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Tổng cộng</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allOrders.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>
                                                        <div className="cart-item d-flex align-items-center">
                                                            <img
                                                                className="item-img me-4 rounded-3"
                                                                src={`${process.env.REACT_APP_BASE_API_URL}${item.img}`}
                                                                alt={item.nameProduct}
                                                            />
                                                            <div className="info-item d-flex flex-column text-start">
                                                                <p className="m-0 fs-4 fw-bold">{item.nameProduct}</p>
                                                                <p className="m-0 fs-5">
                                                                    Part Number: {item.partNumber}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="fs-3 fw-bold">
                                                            {Number(item.price).toLocaleString('en-US') + '₫'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Form.Select
                                                            id={item._id}
                                                            className="select-amount"
                                                            size="lg"
                                                            aria-label="Default select example"
                                                            defaultValue={item.numberProduct}
                                                            onChange={(e) => handleChangeNumberProduct(e, idx)}
                                                        >
                                                            {Array.from({ length: 10 }, (_, i) => (
                                                                <option key={i + 1} value={i + 1}>
                                                                    {i + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </td>
                                                    <td>
                                                        <span className="fs-3 fw-bold">
                                                            {Number(item.price * item.numberProduct).toLocaleString(
                                                                'en-US',
                                                            ) + '₫'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="delete-btn text-black bg-transparent border-0"
                                                            onClick={() => handleDeleteOrder(idx, item._id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>

                                <div className="d-flex justify-content-between pt-4 px-3">
                                    <NavLink
                                        to={config.routes.home}
                                        className="m-0 fs-4 fw-bold text-black text-decoration-underline"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Tiếp tục mua sắm
                                    </NavLink>
                                    <p
                                        className="m-0 fs-4 fw-bold text-decoration-underline"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowDeleteForm(true)}
                                    >
                                        Xóa tất cả
                                    </p>
                                </div>

                                <Modal show={showDeleteForm} onHide={() => setShowDeleteForm(false)} keyboard={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Xóa đơn hàng</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Bạn muốn xóa tất cả đơn hàng?</Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            className="fs-4"
                                            variant="secondary"
                                            onClick={() => setShowDeleteForm(false)}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            className="fs-4"
                                            variant="danger"
                                            onClick={() => handleDeleteAllOrders()}
                                        >
                                            Xóa
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                            <div className="cart-summary h-100 p-3 rounded-3">
                                <p className="fs-3 fw-bold">Tổng cộng giỏ hàng</p>
                                <div className="separate"></div>
                                <div>
                                    <Table className="table-borderless">
                                        <tbody>
                                            <tr>
                                                <td className="px-0 fs-4">Tổng cộng</td>
                                                <td className="px-0 fs-4 text-end">
                                                    {Number(summary).toLocaleString('en-US') + '₫'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-0 py-3 fs-3 fw-bold">Tổng</td>
                                                <td className="px-0 py-3 fs-3 fw-bold text-end">
                                                    {Number(summary).toLocaleString('en-US') + '₫'}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <Button className="w-100 my-4 p-2 fs-4 fw-bold rounded-5">Thanh toán</Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
