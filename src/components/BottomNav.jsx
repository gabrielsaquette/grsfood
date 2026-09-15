import { Link, useLocation } from 'react-router-dom'

function BottomNav() {
    const { pathname } = useLocation()

    const links = [
        { path: '/', label: 'Início' },
        { path: '/menu', label: 'Menu' },
        { path: '/cart', label: 'Carrinho' },
        { path: '/profile', label: 'Perfil' },
    ]

    return (
        <nav className="bottom-nav">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={pathname === link.path ? 'active' : ''}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

export default BottomNav