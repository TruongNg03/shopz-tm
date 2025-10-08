import './ProductItem.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';

function ProductItem({ product = {}, showOverView = true, separate = false, admin = false, onDeleteProduct }) {
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    const handleCloseDeleteForm = () => setShowDeleteForm(false);
    const handleShowDeleteForm = () => setShowDeleteForm(true);

    return (
        <div>
            <div className="product-item py-5 px-3">
                <NavLink
                    to={`/products/${product._id}`}
                    className="product-img w-100 my-5"
                    onClick={(e) => admin && e.preventDefault()}
                >
                    <img
                        className="w-100 object-fit-contain"
                        src={`${process.env.REACT_APP_BASE_API_URL}${product.img}`}
                        alt={product.nameProduct}
                    />
                </NavLink>

                <div className="overview flex-grow-1 d-flex flex-column px-5">
                    <NavLink
                        className="name-product mb-4 fs-1 fw-bold text-black text-decoration-none"
                        to={`/products/${product._id}`}
                        onClick={(e) => admin && e.preventDefault()}
                    >
                        {product.nameProduct}
                    </NavLink>
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
                            {product.shortDescription.map((info, key) => (
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
                            <Modal.Body>
                                Bạn muốn xóa sản phẩm <strong>{product.nameProduct}</strong>?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="fs-4" variant="secondary" onClick={handleCloseDeleteForm}>
                                    Hủy
                                </Button>
                                <Button
                                    className="fs-4"
                                    variant="danger"
                                    onClick={() => {
                                        onDeleteProduct(product._id);
                                        handleCloseDeleteForm();
                                    }}
                                >
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
