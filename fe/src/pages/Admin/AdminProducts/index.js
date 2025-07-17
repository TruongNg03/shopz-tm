import './AdminProducts.scss';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import images from '~/assets/images';
import ProductItem from '~/components/ProductItem';
import AddForm from '~/components/AddForm';

// example
const PRODUCT_ITEMS = [
    {
        linkImg: images.introduction1,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: [
            'Windows 11 Home SL',
            'CPU Intel® Core™ Ultra 7 Processor 155H',
            'Card đồ họa NVIDIA® GeForce RTX™ 4060',
        ],
        detailProduct: [
            'Hệ điều hành : Windows 11 Home',
            'Kiến trúc hệ điều hành : 64-bit',
            'Nhà sản xuất : Intel',
            'Dòng CPU : Core™ i3',
            'Số hiệu CPU : Intel® Core™ i3-1215U, 6 nhân 8 luồng',
            'Tốc độ xung nhịp : 1.2 GHz - 4.4 GHz',
            'Bộ nhớ trang bị sẵn : 8GB',
        ],
        overview: 'abcd',
    },
    {
        linkImg: images.introduction2,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: [
            'Windows 11 Home SL',
            'CPU Intel® Core™ Ultra 7 Processor 155H',
            'Card đồ họa NVIDIA® GeForce RTX™ 4060',
        ],
        detailProduct: [
            'Hệ điều hành : Windows 11 Home',
            'Kiến trúc hệ điều hành : 64-bit',
            'Nhà sản xuất : Intel',
            'Dòng CPU : Core™ i3',
            'Số hiệu CPU : Intel® Core™ i3-1215U, 6 nhân 8 luồng',
            'Tốc độ xung nhịp : 1.2 GHz - 4.4 GHz',
            'Bộ nhớ trang bị sẵn : 8GB',
        ],
        overview: 'abcd',
    },
    {
        linkImg: images.introduction4,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: [
            'Windows 11 Home SL',
            'CPU Intel® Core™ Ultra 7 Processor 155H',
            'Card đồ họa NVIDIA® GeForce RTX™ 4060',
        ],
        detailProduct: [
            'Hệ điều hành : Windows 11 Home',
            'Kiến trúc hệ điều hành : 64-bit',
            'Nhà sản xuất : Intel',
            'Dòng CPU : Core™ i3',
            'Số hiệu CPU : Intel® Core™ i3-1215U, 6 nhân 8 luồng',
            'Tốc độ xung nhịp : 1.2 GHz - 4.4 GHz',
            'Bộ nhớ trang bị sẵn : 8GB',
        ],
        overview: 'abcd',
    },
];

const listCategory = ['Điện thoại', 'Laptop', 'Màn hình máy tính', 'Phụ kiện'];

const listBrand = ['Iphone', 'Samsung', 'Acer'];

function AdminProducts() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="admin-products">
            <div className="admin-add-product">
                <h1 className="fs-1 fw-bold">Thêm sản phẩm</h1>
                <Button className="fs-3" variant="primary" onClick={() => setModalShow(true)}>
                    Add Product
                </Button>

                <AddForm
                    show={modalShow}
                    title="Thêm sản phẩm"
                    onHide={() => setModalShow(false)}
                    onSubmit={() => setModalShow(false)}
                >
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" size="lg" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" size="lg" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Text</Form.Label>
                            <Form.Control type="text" placeholder="Text" size="lg" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name Product</Form.Label>
                            <Form.Control type="text" placeholder="Name Product" size="lg" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Price" size="lg" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content Product</Form.Label>
                            <Form.Control as="textarea" size="lg" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Detail Product</Form.Label>
                            <Form.Control as="textarea" size="lg" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Overview</Form.Label>
                            <Form.Control as="textarea" size="lg" rows={3} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select size="lg" aria-label="Default select example" defaultValue="1">
                                <option value="1">Có hàng</option>
                                <option value="2">Hết hàng</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </AddForm>
            </div>

            <div className="separate my-5"></div>

            <div className="admin-show-product">
                <h1 className="fs-1 fw-bold">Danh sách sản phẩm</h1>
                <div className="admin-search d-flex gap-4">
                    <Form.Select
                        className="admin-search-label px-4 py-3 fs-3 rounded-4"
                        aria-label="Default select example"
                        defaultValue={0}
                    >
                        <option value="0">Tìm kiếm danh mục</option>
                        {listCategory.map((category, key) => {
                            return (
                                <option key={key++} value={category}>
                                    {category}
                                </option>
                            );
                        })}
                    </Form.Select>
                    <Form.Select
                        className="admin-search-label px-4 py-3 fs-3 rounded-4"
                        aria-label="Default select example"
                    >
                        <option value="0">Tìm kiếm hãng</option>
                        {listBrand.map((brand, key) => {
                            return (
                                <option key={key++} value={brand}>
                                    {brand}
                                </option>
                            );
                        })}
                    </Form.Select>
                </div>

                <div className="admin-search-result mt-4 p-3 rounded-4">
                    {PRODUCT_ITEMS.map((product, key) => {
                        return (
                            <ProductItem
                                key={key++}
                                product={product}
                                showOverView={false}
                                separate={key < PRODUCT_ITEMS.length - 1}
                                admin
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
