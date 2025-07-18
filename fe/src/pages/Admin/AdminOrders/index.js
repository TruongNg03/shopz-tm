import { Button, Table } from 'react-bootstrap';
import './AdminOrders.scss';
import images from '~/assets/images';

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
    return (
        <div className="admin-orders">
            <h1 className="fs-1 fw-bold">Danh sách đơn hàng</h1>
            <div className="admin-order-result mt-4 p-3 rounded-4 overflow-auto">
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ORDER_ITEMS.length > 0 ? (
                            ORDER_ITEMS.map((order, key) => {
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
                                        <td>{order.idOrder}</td>
                                        <td>{order.price}₫</td>
                                        <td>{order.numProduct}</td>
                                        <td>{order.price * order.numProduct}₫</td>
                                        <td className="fst-italic">{order.statusOrder}</td>
                                        <td>
                                            <Button className="fs-5">Cập nhật</Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={8}>
                                    Chưa có đơn hàng
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
