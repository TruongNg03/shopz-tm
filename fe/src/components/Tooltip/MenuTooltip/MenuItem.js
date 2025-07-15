import classNames from 'classnames/bind';
import styles from './MenuTooltip.scss';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Wrapper } from '~/components/Tooltip';

const cx = classNames.bind(styles);

// const EXAMPLE_ITEM = {
//     title: 'a', // ~item.title
//     icon: '<FontAwesomeIcon icon={faCheck} />', // ~item.icon
//     to: '/a', // ~item.to
//     children: ['a', 'b'], // ~item.children
//     separate: true, // ~item.separate
// };

function MenuItem({ title, icon, to, children = [], separate, onClick }) {
    const classes = cx('menu-tooltip-item', { separate });

    return (
        <div className="w-100">
            <Tippy
                placement="left-start"
                interactive
                // visible
                render={() =>
                    children.length > 0 && (
                        <Wrapper sbItem>
                            {children.map((child, key) => {
                                return (
                                    <span
                                        className="sp-item d-flex flex-row align-items-center justify-content-between"
                                        key={key++}
                                    >
                                        <p className="m-0">{child.data}</p>
                                        {child.checked && <FontAwesomeIcon icon={faCheck} />}
                                    </span>
                                );
                            })}
                        </Wrapper>
                    )
                }
            >
                <div className={cx(classes, 'w-100 d-flex align-items-center')} onClick={onClick}>
                    <span className="flex-grow-1 fw-bold">
                        <Link className="text-decoration-none text-black" to={to}>
                            <p className="m-0">{title}</p>
                        </Link>
                    </span>
                    {icon && (
                        <span className="flex-shrink-0 ms-4" style={{ opacity: 0.7 }}>
                            {icon}
                        </span>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

export default MenuItem;
