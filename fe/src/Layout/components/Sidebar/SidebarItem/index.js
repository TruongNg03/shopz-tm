import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function SidebarItem({ title, className, to, icon }) {
    const classes = cx('sidebar-item', {
        [className]: className,
    });

    return (
        <NavLink className={(nav) => cx(classes, { active: nav.isActive })} to={to}>
            <div className={cx('d-flex flex-row align-items-center user-select-none')}>
                <div className={cx('sidebar-item-icon me-3 fs-3')}>{icon && <FontAwesomeIcon icon={icon} />}</div>
                <p className={cx('m-0 fs-3 fw-bold')}>{title}</p>
            </div>
        </NavLink>
    );
}

export default SidebarItem;
