import classNames from 'classnames/bind';
import styles from './MenuTooltip.scss';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Wrapper } from '~/components/Tooltip';

const cx = classNames.bind(styles);

function MenuItem({ title, icon, children = [], separate, onClick }) {
    const classes = cx('menu-tooltip-item', { separate });

    // const RenderItems = (items) => {
    //     items.length > 0 && (
    //         <div className="list-sp-items">
    //             {items.map((item, key) => {
    //                 return (
    //                     <span
    //                         className="sp-item d-flex flex-row align-items-center justify-content-between"
    //                         key={key++}
    //                     >
    //                         <p className="m-0">{item}</p>
    //                         {item.checked && <FontAwesomeIcon icon={faBell} />}
    //                     </span>
    //                 );
    //             })}
    //         </div>
    //     );
    // };

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
                                        {child.checked && <FontAwesomeIcon icon={faBell} />}
                                    </span>
                                );
                            })}
                        </Wrapper>
                    )
                }
            >
                <div className={cx(classes, 'w-100 d-flex align-items-center')} onClick={onClick}>
                    <span className="flex-grow-1 fw-bold">{title}</span>
                    <span className="flex-grow-1 text-end" style={{ opacity: 0.7 }}>
                        {children.data}
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
