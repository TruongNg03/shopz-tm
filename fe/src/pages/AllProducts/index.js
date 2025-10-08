import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AllProducts.scss';
import Form from 'react-bootstrap/Form';
import ProductItem from '~/components/ProductItem';
import * as httpRequest from '~/utils/httpRequest';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function AllProducts() {
    const query = useQuery();
    const keyword = query.get('q') || '';
    const [allProducts, setAllProducts] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentBrand, setCurrentBrand] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        async function getData() {
            const dataProducts = await httpRequest.get(
                `products?search_input=${encodeURIComponent(
                    keyword,
                )}&brand=${currentBrand}&category=${currentCategory}`,
            );
            const dataBrands = await httpRequest.get('brands');
            const dataCategories = await httpRequest.get('categories');

            console.log('all products:', dataProducts);
            console.log('all brands:', dataBrands);
            console.log('all categories:', dataCategories);

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
    }, [keyword, currentBrand, currentCategory]);

    return (
        <div className="all-products container pt-5">
            <div className="search-sidebar p-4 rounded-4">
                <div className="search-category mb-4">
                    <p className="fs-2 fw-bold">Danh mục</p>
                    <Form.Select
                        aria-label="Default select example"
                        value={currentCategory}
                        onChange={(e) => {
                            setCurrentCategory(e.target.value);
                        }}
                    >
                        <option value="">Tất cả</option>
                        {allCategories.map((category) => {
                            return (
                                <option key={category.key} value={category.key}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                </div>
                <div className="separate my-5"></div>
                <div className="search-brand mb-4">
                    <p className="fs-2 fw-bold">Hãng</p>
                    <Form.Select
                        aria-label="Default select example"
                        value={currentBrand}
                        onChange={(e) => {
                            setCurrentBrand(e.target.value);
                        }}
                    >
                        <option value="">Tất cả</option>
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

            <div className="product-results flex-grow-1 h-100 p-4 rounded-4">
                <h2 className="mb-4 fw-bold">Kết quả tìm kiếm cho: '{keyword}' </h2>
                <span className="d-flex flex-row align-items-center gap-3">
                    <p className="m-0">Sắp xếp theo</p>
                    <Form.Select aria-label="Default select example" defaultValue={1}>
                        <option value="asc">Giá: thấp đến cao</option>
                        <option value="desc">Giá: cao đến thấp</option>
                    </Form.Select>
                </span>
                <div className="list-result">
                    {allProducts.length > 0 ? (
                        allProducts.map((product, key) => {
                            return (
                                <ProductItem
                                    key={key++}
                                    product={product}
                                    showOverView={false}
                                    separate={key < allProducts.length - 1}
                                />
                            );
                        })
                    ) : (
                        <p className="m-0 py-3 fs-2 text-center">{errorMessage || 'Không tìm thấy sản phẩm'}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllProducts;
