import { Table, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Cart.scss';
import images from '~/assets/images';

//example data
const CART_ITEMS = [
    {
        linkImg: images.introduction1,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
    {
        linkImg: images.introduction2,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
];

function Cart() {
    return (
        <div className="cart container">
            {/* <span className="fs-3">
                Vui lòng{' '}
                <a href="/sign-in" className="m-0 text-decoration-underline text-primary">
                    đăng nhập
                </a>{' '}
                để xem danh sách yêu thích
            </span> */}

            {/* <div className="m-5">
                <span className="fs-3 text-center">
                    <p className="m-0">Danh sách giỏ hàng trống</p>
                    <p className="m-0">
                        <a href="/">Đi mua sắm</a>
                    </p>
                </span>
            </div> */}

            <div className="wrapper-cart pt-5 px-3">
                <div className="title-cart my-3">
                    <h1 className="fw-bold">Giỏ hàng</h1>
                </div>

                <div className="list-summary">
                    <div className="list-carts flex-grow-1 p-3 rounded-2">
                        <Table striped hover>
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
                                {CART_ITEMS.map((item, key = 0) => {
                                    return (
                                        <tr key={key++}>
                                            <td>
                                                <div className="cart-item d-flex align-items-center">
                                                    <img
                                                        className="item-img me-4 rounded-3"
                                                        src={item.linkImg}
                                                        alt={item.nameProduct}
                                                    />
                                                    <div className="info-item">
                                                        <p className="m-0 fs-4">{item.nameProduct}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="fs-3 fw-bold">{item.price + '₫'}</span>
                                            </td>
                                            <td>
                                                <Form.Select
                                                    className="select-amount"
                                                    size="lg"
                                                    aria-label="Default select example"
                                                    defaultValue={1}
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <span className="fs-3 fw-bold">{item.price * 2 + '₫'}</span>
                                            </td>
                                            <td>
                                                <Button className="delete-btn text-black bg-transparent border-0">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>

                    <div className="cart-summary h-100 p-3 rounded-3">
                        <p className="fs-3 fw-bold">Tổng cộng giỏ hàng</p>
                        <div className="separate"></div>
                        <div>
                            <Table className="table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="px-0 fs-4">Tổng cộng</td>
                                        <td className="px-0 fs-4 text-end">{20 + '₫'}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-0 py-3 fs-3 fw-bold">Tổng</td>
                                        <td className="px-0 py-3 fs-3 fw-bold text-end">{20 + '₫'}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <Button className="w-100 my-4 p-2 fs-4 fw-bold rounded-5">Thanh toán</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
