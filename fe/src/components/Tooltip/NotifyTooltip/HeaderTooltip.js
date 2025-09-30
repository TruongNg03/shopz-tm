import classNames from 'classnames/bind';
import styles from './NotifyTooltip.scss';

const cx = classNames.bind(styles);

function HeaderTooltip({ header }) {
    return (
        <header className={cx('header-notify-tooltip d-flex align-items-center justify-content-between')}>
            <p className={cx('m-0 fs-3 fw-bold')}>{header}</p>
        </header>
    );
}

export default HeaderTooltip;
