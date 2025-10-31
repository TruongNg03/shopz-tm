import './ProductItem.scss';
import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import AddForm from '~/components/AddForm';
import * as httpRequest from '~/utils/httpRequest';
import { AuthContext } from '~/context/AuthContext';

function ProductItem({
    product = {},
    showOverView = true,
    separate = false,
    admin = false,
    onDeleteProduct,
    onEditProduct,
}) {
    const { user } = useContext(AuthContext);

    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [numberProduct, setNumberProduct] = useState(1);

    const handleCreateOrder = async () => {
        if (user) {
            const newOrder = {
                email: user.email,
                username: user.username,
                img: product.img,
                nameProduct: product.nameProduct,
                category: product.category,
                branch: product.branch,
                partNumber: product.partNumber,
                price: product.price,
                numberProduct: numberProduct,
            };

            const res = await httpRequest.post('orders/create', newOrder);
            if (res.status === 201 || res.status === 200) {
                console.log('create order:', newOrder);
                alert(res.data.message);
            } else {
                alert(res.message || 'Lỗi tạo đơn hàng');
            }
        } else {
            alert('Đăng nhập để sử dụng chức năng này');
        }
    };

    const handleCloseDeleteForm = () => setShowDeleteForm(false);

    const handleEditProduct = async (formData, id) => {
        try {
            await httpRequest.put(`products/edit?id=${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Cập nhật thành công');
            setShowEditForm(false);
        } catch (err) {
            console.error(err);
            alert('Lỗi khi cập nhật sản phẩm');
        }

        await onEditProduct(formData, id);
        setShowEditForm(false);
    };

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
                        {product.overview && showOverView && <p className="m-0">{product.shortDescription || ''}</p>}
                        <ul className="fs-4 py-3">
                            {product.shortDescription.map((info, key) => (
                                <li key={key++}>{info}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="add-to-cart px-5">
                    <div>
                        <h1 className="mb-4 fw-bold">{Number(product.price).toLocaleString('en-US') + '₫'}</h1>
                        <p className="m-0 pb-4 text-uppercase fs-4 fw-bold">
                            {product.status === 'in-stock' ? 'Còn hàng' : 'Hết hàng'}
                        </p>
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
                                    onChange={(e) => {
                                        setNumberProduct(e.target.value);
                                    }}
                                >
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                            <Button
                                className="add-to-cart-btn w-100 p-2 fs-4 fw-bold rounded-5"
                                onClick={handleCreateOrder}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    )}
                </div>

                {admin && (
                    <div className="update-btn d-flex flex-column justify-content-center gap-4">
                        <Button className="fs-4" onClick={() => setShowEditForm(true)}>
                            Sửa
                        </Button>
                        <Button className="fs-4 btn-danger" onClick={() => setShowDeleteForm(true)}>
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
            <AddForm
                show={showEditForm}
                title="Chỉnh sửa sản phẩm"
                edit
                productEdit={product}
                onHide={() => setShowEditForm(false)}
                onSubmit={handleEditProduct}
            />
            {separate && <div className="separate-content w-100"></div>}
        </div>
    );
}

export default ProductItem;
