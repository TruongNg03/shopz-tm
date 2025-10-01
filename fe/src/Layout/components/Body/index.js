import { useEffect, useState } from 'react';
import CartItem from '~/components/CartItem';
import * as httpRequest from '~/utils/httpRequest';
// import images from '~/assets/images';

//example data
// const featuredProducts = [
//     {
//         linkImg: images.introduction1,
//         title: 'Title',
//         text: 'Text',
//         linkTo: '/#',
//         price: '10',
//         status: 'Có hàng'
//         nameProduct: 'AN-515',
//         contentProduct: ['line 1', 'line 2'],
//     },
//     {
//         linkImg: images.introduction2,
//         title: 'Title',
//         text: 'Text',
//         linkTo: '/#',
//         price: '10',
//         status: 'Có hàng'
//         nameProduct: 'AN-515',
//         contentProduct: ['line 1', 'line 2'],
//     },
// ];

function Body({ title, type }) {
    const [productsData, setProductsData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getData() {
            const data = await httpRequest.get(`products?type=${type}`);
            console.log(data);

            if (data.message) {
                setErrorMessage(data.message);
            } else {
                setProductsData(data.products);
                setErrorMessage('');
            }
        }

        getData();
    }, []);

    return (
        <div className="body container">
            <div className="d-flex flex-column pt-5 mx-5">
                <div className="body-header d-flex flex-row align-items-center justify-content-between my-4">
                    <h1 className="fw-bold">{title}</h1>
                    <a href="/all-products" className="m-0 fs-4">
                        View All Products
                    </a>
                </div>

                <div className="list-products w-100">
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : productsData.length > 0 ? (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-4">
                            {productsData.map((data) => {
                                return (
                                    <div key={data._id} className="col d-flex justify-content-center">
                                        <CartItem
                                            linkImg={
                                                'http://localhost:3333/static/media/intro-3.ea4846817a3375824fd3.png'
                                            }
                                            title={data.title}
                                            text={data.nameProduct}
                                            linkTo={`products/${data._id}`}
                                            data={data}
                                            contentProduct={data.contentProduct}
                                            addProduct
                                            // showCart
                                            showItemSpecification
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>Không có sản phẩm</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Body;
