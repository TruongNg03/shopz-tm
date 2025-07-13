import './Home.scss';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slider from 'react-slick';
import CartItem from '~/components/CartItem';
import images from '~/assets/images';

function Home() {
    // carousel
    const carouselHomeData = [images.carouselIphone, images.carouselVivo, images.carouselMacBook];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    // intro
    const introData = [
        { linkImg: images.introduction1, title: 'Title', text: 'Text', linkTo: '/#' },
        { linkImg: images.introduction2, title: 'Title', text: 'Text', linkTo: '/#' },
        { linkImg: images.introduction3, title: 'Title', text: 'Text', linkTo: '/#' },
        { linkImg: images.introduction4, title: 'Title', text: 'Text', linkTo: '/#' },
    ];

    // featured products
    const featuredProducts = [
        {
            linkImg: images.introduction1,
            title: 'Title',
            text: 'Text',
            linkTo: '/#',
            price: '10',
            nameProduct: 'AN-515',
            contentProduct: ['line 1', 'line 2'],
        },
        {
            linkImg: images.introduction2,
            title: 'Title',
            text: 'Text',
            linkTo: '/#',
            price: '10',
            nameProduct: 'AN-515',
            contentProduct: ['line 1', 'line 2'],
        },
        {
            linkImg: images.introduction3,
            title: 'Title',
            text: 'Text',
            linkTo: '/#',
            price: '10',
            nameProduct: 'AN-515',
            contentProduct: ['line 1', 'line 2'],
        },
        {
            linkImg: images.introduction4,
            title: 'Title',
            text: 'Text',
            linkTo: '/#',
            price: '10',
            nameProduct: 'AN-515',
            contentProduct: ['line 1', 'line 2'],
        },
    ];

    // slick slider
    const settings = {
        dots: true,
        infinite: true,
        // arrows: true,
        // accessibility: true,
        autoplay: true,
        className: 'slick-active',
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    return (
        <div className="home">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {carouselHomeData.map((carousel) => {
                    return (
                        <Carousel.Item key={carousel}>
                            <img
                                src={carousel}
                                className="d-block w-100 object-fit-contain"
                                alt={'Slide ' + carousel}
                            />
                        </Carousel.Item>
                    );
                })}
            </Carousel>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-3 py-5">
                    {introData.map((data, key) => {
                        return (
                            <div key={key++} className="col d-flex justify-content-center">
                                <CartItem
                                    linkImg={data.linkImg}
                                    title={data.title}
                                    text={data.text}
                                    linkTo={data.linkTo}
                                    showTitle
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="featured-products">
                    <div className="my-4">
                        <p className="m-0 fs-1">Sản phẩm nổi bật</p>
                        <div className="w-100">
                            <div className="footer-border"></div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-3 py-5">
                        {featuredProducts.map((data, key) => {
                            return (
                                <div key={key++} className="col d-flex justify-content-center">
                                    <CartItem
                                        linkImg={data.linkImg}
                                        title={data.title}
                                        text={data.text}
                                        linkTo={data.linkTo}
                                        price={data.price}
                                        nameProduct={data.nameProduct}
                                        contentProduct={data.contentProduct}
                                        addProduct
                                        showCart
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="top-sale">
                    <div className="my-4">
                        <p className="m-0 fs-1">Sản phẩm bán chạy nhất</p>
                        <div className="w-100">
                            <div className="footer-border"></div>
                        </div>
                    </div>

                    <div className="list-featured-products py-5">
                        <Slider {...settings}>
                            {featuredProducts.map((data, key) => {
                                return (
                                    <CartItem
                                        key={key++}
                                        linkImg={data.linkImg}
                                        title={data.title}
                                        text={data.text}
                                        linkTo={data.linkTo}
                                        price={data.price}
                                        nameProduct={data.nameProduct}
                                        contentProduct={data.contentProduct}
                                        addProduct
                                        showCart
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
