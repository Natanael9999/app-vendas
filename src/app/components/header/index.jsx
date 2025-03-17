import Link from 'next/link';
import "./style.css";

export default function Header() {
    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link href={'/clientes/read'} className="nav-link">Clientes</Link>
                        <Link href={'/compras/read'} className="nav-link">Compras</Link>
                        <Link href={'/Fornecedores/read'} className="nav-link">Fornecedores</Link>
                        <Link href={'/local/read'} className="nav-link">Local</Link>
                        <Link href={'/produtos/read'} className="nav-link">Produtos</Link>
                        <Link href={'/vendas/read'} className="nav-link">Vendas</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
