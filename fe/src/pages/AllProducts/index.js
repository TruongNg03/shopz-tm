import './AllProducts.scss';
import Form from 'react-bootstrap/Form';
import images from '~/assets/images';
import ProductItem from '~/components/ProductItem';

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
            'line Windows 11 Home SL',
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
        linkImg: images.introduction1,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: [
            'line Windows 11 Home SL',
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

function AllProducts() {
    return (
        <div className="all-products container pt-5">
            <div className="search-sidebar p-4 rounded-4">
                <div className="search-category mb-4">
                    <p className="fs-2 fw-bold">Danh mục</p>
                    <Form.Select aria-label="Default select example" defaultValue={0}>
                        <option value="0">Tất cả</option>
                        {listCategory.map((category, key) => {
                            return (
                                <option key={key++} value={category}>
                                    {category}
                                </option>
                            );
                        })}
                    </Form.Select>
                </div>
                <div className="separate my-5"></div>
                <div className="search-brand mb-4">
                    <p className="fs-2 fw-bold">Hãng</p>
                    <Form.Select aria-label="Default select example">
                        <option value="0">Tất cả</option>
                        {listBrand.map((brand, key) => {
                            return (
                                <option key={key++} value={brand}>
                                    {brand}
                                </option>
                            );
                        })}
                    </Form.Select>
                </div>
            </div>

            <div className="product-results p-4 rounded-4">
                <h2 className="mb-4">Kết quả tìm kiếm cho: '{'an-515'}' </h2>
                <span className="d-flex flex-row align-items-center gap-3">
                    <p className="m-0">Sắp xếp theo</p>
                    <Form.Select aria-label="Default select example" defaultValue={1}>
                        <option value="1">Giá: thấp đến cao</option>
                        <option value="2">Giá: cao đến thấp</option>
                    </Form.Select>
                </span>
                <div className="list-result">
                    {PRODUCT_ITEMS.map((product, key) => {
                        return <ProductItem key={key++} product={product} showOverView={false} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;
