import classNames from 'classnames/bind';
import styles from './MenuTooltip.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as TooltipWrapper } from '~/components/Tooltip';
import HeaderTooltip from '../NotifyTooltip/HeaderTooltip';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function MenuTooltip({ header, data = [{}], onClick }) {
    return (
        <TooltipWrapper menuTooltip>
            <HeaderTooltip header={header} />

            <div className={cx('content-menu-tooltip d-flex flex-column align-items-center justify-content-center')}>
                {data.map((item, key) => {
                    return (
                        <MenuItem
                            key={key++}
                            title={item.title}
                            // icon={<FontAwesomeIcon icon={faBell} />}
                            // children={item.children}
                            separate={item.separate}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </TooltipWrapper>
    );
}

export default MenuTooltip;
