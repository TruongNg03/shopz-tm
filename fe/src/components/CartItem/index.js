import classNames from 'classnames/bind';
import styles from './CartItem.scss';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CartItem({
    linkImg,
    title,
    text,
    linkTo,
    price,
    status,
    nameProduct,
    contentProduct = [],
    showCart = false,
    showTitle = false,
    addProduct,
    showItemSpecification,
}) {
    const classes = cx('card', { addProduct, showItemSpecification });

    const infoProduct = contentProduct.map((info, key) => <li key={key++}>{info}</li>);

    return (
        <Card className={cx(classes, 'border-0 rounded-4 d-flex flex-column m-2')}>
            <div className={cx('img-hover-info position-relative')}>
                <Card.Img variant="top" src={linkImg} />

                {/* only for featured products */}
                {showCart && (
                    <div className={cx('hover-info position-absolute top-0 w-100 h-100 bg-white opacity-0')}>
                        <div className="p-3">
                            <p className="m-0 fs-3">{nameProduct}</p>
                        </div>
                    </div>
                )}
            </div>

            <Card.Body>
                {showTitle && (
                    <a href={linkTo}>
                        <Card.Title className={cx('pt-3 text-center fs-2 fw-bold')}>{title}</Card.Title>
                    </a>
                )}
                <a href={linkTo}>
                    <Card.Text className={cx('name-product text-center fs-4')}>{text}</Card.Text>
                </a>
                {showCart && (
                    <span className={cx('d-flex align-items-center justify-content-between user-select-none')}>
                        <p className={cx('price-product m-0 fs-2 fw-bold')}>{price + '₫'}</p>
                        <Button href="/cart" className={cx('add rounded-circle bg-transparent border-0 fs-2')}>
                            <FontAwesomeIcon icon={faCartPlus} />
                        </Button>
                    </span>
                )}
            </Card.Body>

            {showItemSpecification && (
                <div className="item-specification p-3">
                    <div className="content-specification">
                        <p className="fs-2 fw-bold text-uppercase mb-2">{price + '₫'}</p>
                        <p className="fs-5 fw-bold text-uppercase">{status}</p>
                        <ul className="pt-3 fs-4">{infoProduct}</ul>
                    </div>

                    <div className="group-btn d-flex flex-column mt-5 pb-2 row-gap-3">
                        <Button
                            href="/product/test-product"
                            className="view-specification-btn p-2 fs-4 fw-bold rounded-5"
                        >
                            Xem chi tiết
                        </Button>
                        <Button className="add-to-cart-btn p-2 fs-4 fw-bold rounded-5">Thêm vào giỏ hàng</Button>
                    </div>
                </div>
            )}
        </Card>
    );
}

export default CartItem;
