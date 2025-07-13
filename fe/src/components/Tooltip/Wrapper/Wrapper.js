import classNames from 'classnames/bind';
import styles from './WrapperTooltip.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, searchTooltip, notifyTooltip, menuTooltip, sbItem }) {
    const classes = cx('wrapper-tooltip', { searchTooltip, notifyTooltip, menuTooltip, sbItem });

    return (
        <div className={cx(classes, 'd-flex flex-column align-items-center justify-content-start bg-white')}>
            <div className={cx('wrapper-items')}>{children}</div>
        </div>
    );
}

export default Wrapper;
