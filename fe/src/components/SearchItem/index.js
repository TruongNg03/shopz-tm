import classNames from 'classnames/bind';
import styles from './SearchItem.scss';
import { NavLink } from 'react-router';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    return (
        <NavLink
            to={data.to}
            className={cx(
                'search-item w-100 d-flex align-items-center text-decoration-none rounded-4 user-select-none',
            )}
        >
            <img className={cx('img-item me-4')} src={data.linkImg} alt="img-product" />
            <div className={cx('info-item d-flex flex-grow-1 align-items-center')}>
                <p className={cx('content-item m-0 fs-4')}>{data.contentItem}</p>
            </div>
        </NavLink>
    );
}

export default SearchItem;
