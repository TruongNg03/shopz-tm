import classNames from 'classnames/bind';
import styles from '././NavLinkItem.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavLinkItem({ title, to, className }) {
    const classes = cx('nav-link-item', { active: false, [className]: className });

    return (
        <NavLink className={(nav) => cx(classes, { active: nav.isActive })} to={to}>
            <p className={cx('m-0')}>{title}</p>
        </NavLink>
    );
}

export default NavLinkItem;
