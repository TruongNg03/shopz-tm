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
