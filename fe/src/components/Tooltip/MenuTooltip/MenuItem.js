import { Link } from 'react-router-dom';

// const EXAMPLE_ITEM = {
//     title: 'a', // ~item.title
//     icon: '<FontAwesomeIcon icon={faCheck} />', // ~item.icon
//     to: '/a', // ~item.to
//     children: ['a', 'b'], // ~item.children
//     separate: true, // ~item.separate
// };

function MenuItem({ title, icon, to, separate, hidden, onClick }) {
    return (
        !hidden && (
            <div className="w-100">
                {separate && <div className="separate"></div>}

                <div className="menu-tooltip-item w-100 d-flex align-items-center" onClick={onClick}>
                    <span className="flex-grow-1 fw-bold">
                        <Link className="text-decoration-none text-black" to={to}>
                            <p className="m-0 fs-4">{title}</p>
                        </Link>
                    </span>
                    {icon && (
                        <span className="flex-shrink-0 ms-4" style={{ opacity: 0.7 }}>
                            {icon}
                        </span>
                    )}
                </div>
            </div>
        )
    );
}

export default MenuItem;
