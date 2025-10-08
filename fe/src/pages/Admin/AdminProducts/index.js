import './AdminProducts.scss';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import ProductItem from '~/components/ProductItem';
import AddForm from '~/components/AddForm';
import useDebounce from '~/hooks/useDebounce';
import * as httpRequest from '~/utils/httpRequest';

function AdminProducts() {
    const [modalShow, setModalShow] = useState(false);

    const [searchInput, setSearchInput] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentBrand, setCurrentBrand] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        img: '',
        partNumber: '',
        price: '',
        status: '',
        description: [''],
        overview: '',
        shortDescription: [''],
        shortOverview: '',
        title: '',
        brand: '',
        nameProduct: '',
        category: '',
        numberProduct: 1,
    });
    const [disabledCreateForm, setDisabledCreateForm] = useState(true);

    const debouncedValue = useDebounce(searchInput, 500);

    useEffect(() => {
        async function getData() {
            const dataProducts = await httpRequest.get(
                `products?search_input=${encodeURIComponent(
                    debouncedValue,
                )}&brand=${currentBrand}&category=${currentCategory}`,
            );
            const dataBrands = await httpRequest.get('brands');
            const dataCategories = await httpRequest.get('categories');

            console.log('all products:', dataProducts);
            console.log('all brands:', dataBrands);
            console.log('all categories:', dataCategories);
            console.log('--------------------');

            if (dataProducts.message) {
                setErrorMessage(dataProducts.message);
                setAllProducts([]);
            } else {
                setAllProducts(dataProducts.products);
                setErrorMessage('');
            }

            if (dataBrands.message) {
                setAllBrands([]);
            } else {
                setAllBrands(dataBrands.brands);
            }

            if (dataCategories.message) {
                setAllCategories([]);
            } else {
                setAllCategories(dataCategories.categories);
            }
        }

        getData();
    }, [debouncedValue, currentBrand, currentCategory]);

    useEffect(() => {
        const { title, nameProduct, price, partNumber, numberProduct } = newProduct;
        const disabled = !title.trim() || !nameProduct.trim() || !price || !partNumber.trim() || !numberProduct;
        setDisabledCreateForm(disabled);
    }, [newProduct]);

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            if (newProduct.img instanceof File) {
                formData.append('image-product', newProduct.img);
            }

            Object.entries(newProduct).forEach(([key, value]) => {
                if (key === 'img') return;

                if (Array.isArray(value)) {
                    value.forEach((v) => formData.append(`${key}[]`, v));
                } else {
                    formData.append(key, value);
                }
            });

            const res = await httpRequest.post('products/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Response:', res.data);
            console.log('new product:', newProduct);

            setModalShow(false);
            setNewProduct({
                img: '',
                partNumber: '',
                price: '',
                status: '',
                description: [''],
                linkTo: '',
                overview: '',
                shortDescription: [''],
                shortOverview: '',
                title: '',
                brand: '',
                nameProduct: '',
                category: '',
                numberProduct: 1,
            });
            alert('Thêm sản phẩm thành công!');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Lỗi khi thêm sản phẩm');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await httpRequest.remove(`products/delete-permanent?id=${productId}`);

            setAllProducts((prev) => prev.filter((product) => product._id !== productId));

            console.log('delete product:', productId);
            alert('Xóa sản phẩm thành công!');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Lỗi khi xóa sản phẩm');
        }
    };

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
                    disabled={disabledCreateForm}
                    onHide={() => setModalShow(false)}
                    onSubmit={handleCreateProduct}
                >
                    <Form id="add-product-form" onSubmit={handleCreateProduct}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Ảnh (img)</Form.Label>
                            <Form.Control
                                type="file"
                                size="lg"
                                onChange={(e) => {
                                    setNewProduct({ ...newProduct, img: e.target.files[0] });
                                    console.log(e.target.files[0]?.name);
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex gap-1">
                                Title <p className="m-0 text-center text-danger">*</p>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Example: Title 1"
                                size="lg"
                                required
                                value={newProduct.title}
                                onChange={(e) => {
                                    setNewProduct({ ...newProduct, title: e.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex gap-1">
                                Tên sản phẩm <p className="m-0 text-center text-danger">*</p>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Example: product 1"
                                size="lg"
                                required
                                value={newProduct.nameProduct}
                                onChange={(e) => {
                                    setNewProduct({ ...newProduct, nameProduct: e.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Hãng</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                size="lg"
                                value={newProduct.brand}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        brand: e.target.value,
                                    })
                                }
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
                                aria-label="Default select example"
                                size="lg"
                                value={newProduct.category}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        category: e.target.value,
                                    })
                                }
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
                                type="number"
                                size="lg"
                                required
                                value={newProduct.numberProduct || ''}
                                onChange={(e) => {
                                    setNewProduct({ ...newProduct, numberProduct: e.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex gap-1">
                                Part Number <p className="m-0 text-center text-danger">*</p>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Example: AA.AAAAA.000"
                                size="lg"
                                required
                                value={newProduct.partNumber}
                                onChange={(e) => {
                                    setNewProduct({ ...newProduct, partNumber: e.target.value.trim() });
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex gap-1">
                                Giá <p className="m-0 text-center text-danger">*</p>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="VD: 10"
                                size="lg"
                                required
                                value={newProduct.price}
                                onChange={(e) => {
                                    setNewProduct({ ...newProduct, price: e.target.value });
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                size="lg"
                                value={newProduct.status}
                                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="Còn hàng">Còn hàng</option>
                                <option value="Hết hàng">Hết hàng</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả ngắn (shortDescription)</Form.Label>
                            {newProduct.shortDescription.map((desc, idx) => (
                                <Form.Control
                                    key={idx}
                                    className="mb-2"
                                    type="text"
                                    placeholder={`Mô tả ngắn ${idx + 1}`}
                                    size="lg"
                                    value={desc}
                                    onChange={(e) => {
                                        const updated = [...newProduct.shortDescription];
                                        updated[idx] = e.target.value;
                                        setNewProduct({ ...newProduct, shortDescription: updated });
                                    }}
                                />
                            ))}
                            <Button
                                size="lg"
                                onClick={() =>
                                    setNewProduct({
                                        ...newProduct,
                                        shortDescription: [...newProduct.shortDescription, ''],
                                    })
                                }
                            >
                                + Thêm dòng
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả chi tiết (description)</Form.Label>
                            {newProduct.description.map((desc, idx) => (
                                <Form.Control
                                    key={idx}
                                    className="mb-2"
                                    type="text"
                                    placeholder={`Mô tả chi tiết ${idx + 1}`}
                                    size="lg"
                                    value={desc}
                                    onChange={(e) => {
                                        const updated = [...newProduct.description];
                                        updated[idx] = e.target.value;
                                        setNewProduct({ ...newProduct, description: updated });
                                    }}
                                />
                            ))}
                            <Button
                                size="lg"
                                onClick={() =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: [...newProduct.description, ''],
                                    })
                                }
                            >
                                + Thêm dòng
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Overview</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={3}
                                placeholder="Example: Overview 1"
                                size="lg"
                                value={newProduct.overview}
                                onChange={(e) => setNewProduct({ ...newProduct, overview: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Short Overview</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={3}
                                placeholder="Example: Short overview 1"
                                size="lg"
                                value={newProduct.shortOverview}
                                onChange={(e) => setNewProduct({ ...newProduct, shortOverview: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </AddForm>
            </div>

            <div className="separate my-5"></div>

            <div className="admin-show-product">
                <h1 className="fs-1 fw-bold">Danh sách sản phẩm</h1>
                <div className="admin-search d-flex flex-column gap-4 mt-4">
                    <Form.Control
                        className="search-label px-4 py-3 fs-3 rounded-4"
                        type="admin-search-text"
                        placeholder="Tìm kiếm sản phẩm"
                        aria-label="Search"
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                        }}
                    />
                    <div className="admin-group-search d-flex gap-4">
                        <Form.Select
                            className="admin-search-label px-4 py-3 fs-3 rounded-4"
                            aria-label="Default select example"
                            value={currentCategory}
                            onChange={(e) => {
                                setCurrentCategory(e.target.value);
                            }}
                        >
                            <option value="">Tìm kiếm danh mục</option>
                            {allCategories.map((category) => {
                                return (
                                    <option key={category.key} value={category.key}>
                                        {category.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <Form.Select
                            className="admin-search-label px-4 py-3 fs-3 rounded-4"
                            aria-label="Default select example"
                            value={currentBrand}
                            onChange={(e) => {
                                setCurrentBrand(e.target.value);
                            }}
                        >
                            <option value="">Tìm kiếm hãng</option>
                            {allBrands.map((brand) => {
                                return (
                                    <option key={brand.key} value={brand.key}>
                                        {brand.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </div>
                </div>

                <div className="admin-search-result mt-4 p-3 rounded-4">
                    {allProducts.length > 0 ? (
                        allProducts.map((product, idx) => {
                            return (
                                <ProductItem
                                    key={product._id}
                                    product={product}
                                    showOverView={false}
                                    separate={idx < allProducts.length - 1}
                                    admin
                                    onDeleteProduct={(id) => handleDeleteProduct(id)}
                                />
                            );
                        })
                    ) : (
                        <p className="m-0 text-center">Không tìm thấy sản phẩm</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
