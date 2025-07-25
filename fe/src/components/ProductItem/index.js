import './ProductItem.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// example
// const productItem = {
//     linkImg: images.introduction1,
//     title: 'Title',
//     text: 'Text',
//     linkTo: '/#',
//     price: '10',
//     status: 'Có hàng',
//     nameProduct: 'AN-515',
//     contentProduct: [
//         'line Windows 11 Home SL',
//         'CPU Intel® Core™ Ultra 7 Processor 155H',
//         'Card đồ họa NVIDIA® GeForce RTX™ 4060',
//     ],
//     detailProduct: [
//         'Hệ điều hành : Windows 11 Home',
//         'Kiến trúc hệ điều hành : 64-bit',
//         'Nhà sản xuất : Intel',
//         'Dòng CPU : Core™ i3',
//         'Số hiệu CPU : Intel® Core™ i3-1215U, 6 nhân 8 luồng',
//         'Tốc độ xung nhịp : 1.2 GHz - 4.4 GHz',
//         'Bộ nhớ trang bị sẵn : 8GB',
//     ],
//     overview: 'abcd',
// };

function ProductItem({ product = {}, showOverView = true, separate = false, admin = false }) {
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const handleCloseDeleteForm = () => setShowDeleteForm(false);
    const handleShowDeleteForm = () => setShowDeleteForm(true);

    return (
        <div>
            <div className="product-item py-5 px-3">
                <div className="product-img my-5">
                    <img className="w-100 object-fit-contain" src={product.linkImg} alt={product.nameProduct} />
                </div>

                <div className="overview d-flex flex-column px-5">
                    <h1 className="name-product mb-4 fw-bold">{product.nameProduct}</h1>
                    <div className="separate-content w-100"></div>
                    <div className="product-info my-4">
                        {product.overview && showOverView && (
                            <p className="m-0">
                                Vũ Khí Gaming AI Tối Thượng 2024 phiên bản màn hình 16" - PTN16-51. Laptop Gaming AI
                                tiên phong với CPU Intel® Core™ Ultra 7 mới nhất (với nhân NPU chuyên dụng cho các tác
                                vụ AI). Mỏng nhẹ, tinh tế với chất liệu nhôm (20.8mm - 2.05kg), mạnh mẽ với GPU NVIDIA®
                                GeForce™ RTX 40 Series, màn hình 16" 2K+ IPS 240Hz siêu tốc, mát nhất phân khúc với 2
                                quạt (1 quạt AeroBlade™ 3D thế hệ 5), ống đồng dạng Vector và tản nhiệt Kim Loại Lỏng.
                            </p>
                        )}
                        <ul className="fs-4 py-3">
                            {product.contentProduct.map((info, key) => (
                                <li key={key++}>{info}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="add-to-cart px-5">
                    <div>
                        <h1 className="mb-4 fw-bold">{product.price + '₫'}</h1>
                        <p className="m-0 pb-4 text-uppercase fs-4 fw-bold">{product.status}</p>
                    </div>
                    {!admin && (
                        <div className="product-add-form mb-5">
                            <div className="product-number d-flex align-items-center mb-4">
                                <span>Số lượng:</span>
                                <Form.Select
                                    className="ms-4"
                                    size="lg"
                                    aria-label="Default select example"
                                    defaultValue={1}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Form.Select>
                            </div>
                            <Button className="add-to-cart-btn w-100 p-2 fs-4 fw-bold rounded-5">
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    )}
                </div>

                {admin && (
                    <div className="update-btn d-flex flex-column justify-content-center gap-4">
                        <Button className="fs-4">Sửa</Button>
                        <Button className="fs-4 btn-danger" onClick={handleShowDeleteForm}>
                            Xóa
                        </Button>

                        {/* alert form */}
                        <Modal show={showDeleteForm} onHide={handleCloseDeleteForm} keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Xóa sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Bạn muốn xóa sản phẩm '...'?</Modal.Body>
                            <Modal.Footer>
                                <Button className="fs-4" variant="secondary" onClick={handleCloseDeleteForm}>
                                    Hủy
                                </Button>
                                <Button className="fs-4" variant="danger">
                                    Xóa
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
            </div>
            {separate && <div className="separate-content w-100"></div>}
        </div>
    );
}

export default ProductItem;
