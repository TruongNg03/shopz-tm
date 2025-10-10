import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as httpRequest from '~/utils/httpRequest';

function AddForm({ productEdit, show = false, edit = false, title, disabled, onHide, onSubmit }) {
    const [allBrands, setAllBrands] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        img: '',
        title: '',
        nameProduct: '',
        partNumber: '',
        status: '',
        brand: '',
        category: '',
        numberProduct: 1,
        price: '',
        shortDescription: '',
        description: '',
        shortOverview: '',
        overview: '',
    });
    const [imgFile, setImgFile] = useState(null);

    useEffect(() => {
        if (edit && productEdit) {
            setNewProduct({
                ...productEdit,
                shortDescription: Array.isArray(productEdit.shortDescription)
                    ? productEdit.shortDescription.map((line) => `${line}`).join('\n')
                    : productEdit.shortDescription || '',
                description: Array.isArray(productEdit.description)
                    ? productEdit.description.map((line) => `${line}`).join('\n')
                    : productEdit.description || '',
            });
        }
    }, [edit, productEdit]);

    useEffect(() => {
        async function getData() {
            const dataBrands = await httpRequest.get('brands');
            const dataCategories = await httpRequest.get('categories');

            setAllBrands(dataBrands?.brands || []);
            setAllCategories(dataCategories?.categories || []);
        }

        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const processedProduct = {
            ...newProduct,
            shortDescription: newProduct.shortDescription
                ?.split('\n')
                .map((line) => line.trim())
                .filter((line) => line !== ''),
            description: newProduct.description
                ?.split('\n')
                .map((line) => line.trim())
                .filter((line) => line !== ''),
        };

        const formData = new FormData();
        Object.entries(processedProduct).forEach(([key, value]) => {
            if (key === 'img') return;
            if (Array.isArray(value)) {
                value.forEach((v) => formData.append(`${key}[]`, v));
            } else {
                formData.append(key, value);
            }
        });

        if (imgFile) {
            formData.append('image-product', imgFile);
        } else if (edit && newProduct.img) {
            formData.append('image-product', newProduct.img);
        }

        onSubmit(formData, newProduct._id);
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}
            backdrop="static"
            scrollable
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-3">
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="add-product-form" onSubmit={handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Ảnh (Image)</Form.Label>
                        <Form.Control
                            className=" fs-4"
                            type="file"
                            size="lg"
                            onChange={(e) => {
                                setImgFile(e.target.files[0]);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex gap-1">
                            Title <p className="m-0 text-center text-danger">*</p>
                        </Form.Label>
                        <Form.Control
                            className=" fs-4"
                            name="title"
                            type="text"
                            placeholder="Example: Title 1"
                            size="lg"
                            required
                            value={newProduct.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex gap-1">
                            Tên sản phẩm <p className="m-0 text-center text-danger">*</p>
                        </Form.Label>
                        <Form.Control
                            className=" fs-4"
                            name="nameProduct"
                            type="text"
                            placeholder="Example: product 1"
                            size="lg"
                            required
                            value={newProduct.nameProduct}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hãng</Form.Label>
                        <Form.Select
                            className=" fs-4"
                            name="brand"
                            aria-label="Default select example"
                            size="lg"
                            value={newProduct.brand}
                            onChange={(e) => {
                                setNewProduct((prev) => ({
                                    ...prev,
                                    brand: e.target.value,
                                }));
                            }}
                        >
                            <option value="">Chọn hãng</option>
                            {allBrands.map((brand) => (
                                <option key={brand.key} value={brand.key}>
                                    {brand.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Danh mục</Form.Label>
                        <Form.Select
                            className=" fs-4"
                            name="category"
                            aria-label="Default select example"
                            size="lg"
                            value={newProduct.category}
                            onChange={(e) => {
                                setNewProduct((prev) => ({
                                    ...prev,
                                    category: e.target.value,
                                }));
                            }}
                        >
                            <option value="">Chọn danh mục</option>
                            {allCategories.map((category) => (
                                <option key={category.key} value={category.key}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex gap-1">
                            Số lượng <p className="m-0 text-center text-danger">*</p>
                        </Form.Label>
                        <Form.Control
                            className=" fs-4"
                            name="numberProduct"
                            type="number"
                            size="lg"
                            required
                            value={newProduct.numberProduct}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex gap-1">
                            Part Number <p className="m-0 text-center text-danger">*</p>
                        </Form.Label>
                        <Form.Control
                            className=" fs-4"
                            name="partNumber"
                            type="text"
                            placeholder="Example: AA.AAAAA.000"
                            size="lg"
                            required
                            value={newProduct.partNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="d-flex gap-1">
                            Giá <p className="m-0 text-center text-danger">*</p>
                        </Form.Label>
                        <Form.Control
                            className="fs-4"
                            name="price"
                            type="number"
                            placeholder="Example: 10"
                            size="lg"
                            required
                            value={newProduct.price}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Select
                            className=" fs-4"
                            name="status"
                            size="lg"
                            value={newProduct.status}
                            onChange={(e) => {
                                setNewProduct((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                }));
                            }}
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="in-stock">Còn hàng</option>
                            <option value="out-of-stock">Hết hàng</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả ngắn (Short Description)</Form.Label>
                        <Form.Control
                            name="shortDescription"
                            className="fs-4"
                            type="text"
                            as="textarea"
                            rows={3}
                            placeholder="Mô tả ngắn"
                            size="lg"
                            value={newProduct.shortDescription}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả chi tiết (Description)</Form.Label>
                        <Form.Control
                            name="description"
                            className="fs-4"
                            type="text"
                            as="textarea"
                            rows={3}
                            placeholder="Mô tả chi tiết"
                            size="lg"
                            value={newProduct.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Short Overview</Form.Label>
                        <Form.Control
                            className="fs-4"
                            name="shortOverview"
                            type="text"
                            as="textarea"
                            rows={3}
                            placeholder="Example: Short overview 1"
                            size="lg"
                            value={newProduct.shortOverview}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Overview</Form.Label>
                        <Form.Control
                            className="fs-4"
                            name="overview"
                            type="text"
                            as="textarea"
                            rows={3}
                            placeholder="Example: Overview 1"
                            size="lg"
                            value={newProduct.overview}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button className="fs-4" variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button className="fs-4" type="submit" form="add-product-form" disabled={disabled}>
                    {edit ? 'Cập nhật' : 'Thêm'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddForm;
