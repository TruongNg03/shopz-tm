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

    const debouncedValue = useDebounce(searchInput, 500);

    const getData = async () => {
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

        setAllBrands(dataBrands?.brands || []);
        setAllCategories(dataCategories?.categories || []);
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, currentBrand, currentCategory]);

    const handleCreateProduct = async (formData) => {
        try {
            const res = await httpRequest.post('products/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('response create product:', res.data);
            alert('Thêm sản phẩm thành công!');
            setModalShow(false);

            await getData();
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
            </div>

            <AddForm
                show={modalShow}
                title="Thêm sản phẩm mới"
                onHide={() => setModalShow(false)}
                onSubmit={handleCreateProduct}
            />

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
