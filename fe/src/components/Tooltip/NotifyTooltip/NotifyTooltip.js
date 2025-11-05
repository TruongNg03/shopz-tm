import classNames from 'classnames/bind';
import styles from './NotifyTooltip.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Wrapper as TooltipWrapper } from '~/components/Tooltip';
import images from '~/assets/images';
import HeaderTooltip from './HeaderTooltip';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function NotifyTooltip({ header, content, linkTo, nameBtn }) {
    const { user } = useContext(AuthContext);

    return (
        <TooltipWrapper notifyTooltip>
            <HeaderTooltip header={header} />

            <div className={cx('content-notify-tooltip d-flex flex-column align-items-center justify-content-center')}>
                <div className={cx('d-flex flex-column align-items-center mb-4 pe-none')}>
                    <img
                        className={cx('img-no-data mb-2 border-0 overflow-hidden')}
                        src={images.noData}
                        alt="img-no-data"
                    />
                    {!user && <p className={cx('m-0 fs-5 opacity-50')}>{content}</p>}
                </div>
                {!user && (
                    <Link
                        className={cx('btn-notify-tooltip border-0 rounded-5 fs-4 lh-lg text-decoration-none')}
                        to={linkTo}
                    >
                        {nameBtn}
                    </Link>
                )}
            </div>
        </TooltipWrapper>
    );
}

export default NotifyTooltip;
