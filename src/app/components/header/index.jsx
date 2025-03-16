import Link from 'next/link';
import "./style.css";

export default function Header() {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link href={'/clientes/read'} className="nav-link">Clientes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
