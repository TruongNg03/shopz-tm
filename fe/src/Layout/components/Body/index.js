import CartItem from '~/components/CartItem';
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

function Body({ title, dataProducts = [{}] }) {
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
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-4">
                        {dataProducts.map((data, key = 0) => {
                            return (
                                <div key={key++} className="col d-flex justify-content-center">
                                    <CartItem
                                        linkImg={data.linkImg}
                                        title={data.title}
                                        text={data.nameProduct}
                                        linkTo={data.linkTo}
                                        price={data.price}
                                        status={data.status}
                                        nameProduct={data.nameProduct}
                                        contentProduct={data.contentProduct}
                                        addProduct
                                        // showCart
                                        showItemSpecification
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
