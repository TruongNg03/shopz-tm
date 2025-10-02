import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './AdminOrders.scss';
import images from '~/assets/images';
import useDebounce from '~/hooks/useDebounce';
import * as httpRequest from '~/utils/httpRequest';

//example data
const ORDER_ITEMS = [
    {
        idOrder: 'FDS22',
        linkImg: images.introduction1,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        numProduct: 1,
        nameProduct: 'AN-515',
        statusOrder: 'processing',
    },
    {
        idOrder: 'FAS89',
        linkImg: images.introduction2,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        numProduct: 2,
        nameProduct: 'AN-515',
        statusOrder: 'processing',
    },
];

function AdminOrders() {
    const [searchOrder, setSearchOrder] = useState('');
    const [allOrders, setAllOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    return (
        <div className="admin-orders">
            <h1 className="fs-1 fw-bold">Danh sách đơn hàng</h1>
            <div className="admin-search-result mt-4 p-3 rounded-4 overflow-auto">
                <Table className="m-0 text-center" hover>
                    <thead>
                        <tr>
                            <th>#</th>
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
                            allOrders.map((order, key) => {
                                return (
                                    <tr key={++key}>
                                        <td>{++key}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-4">
                                                <img
                                                    className="admin-order-img"
                                                    src={order.linkImg}
                                                    alt="product-img"
                                                />
                                                {order.nameProduct}
                                            </div>
                                        </td>
                                        <td>{order.partNumber}</td>
                                        <td>{order.price}₫</td>
                                        <td>{order.numberProduct}</td>
                                        <td>{order.price * order.numberProduct}₫</td>
                                        <td className="fst-italic">{order.status}</td>
                                        <td>
                                            <Button className="fs-4 text-primary text-decoration-underline bg-transparent border-0">
                                                Cập nhật
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={8}>
                                    {errorMessage || 'Chưa có đơn hàng'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default AdminOrders;
