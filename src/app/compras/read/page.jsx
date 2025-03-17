'use client';

import { useState, useEffect } from "react";
import './style.css';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button";

export default function ReadCompras() {
    const [compras, setCompras] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await fetch("../api/compra");
                if (!response.ok) {
                    throw new Error('Erro ao buscar compras');
                }
                const data = await response.json();
                setCompras(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCompras();
    }, []);

    return (
        <div>
            <Header />
            <div className="table-container">
                {error && <p className="error">{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Valor</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map((compras) => (
                            <tr key={compras.id}>
                                <td>{compras.valor}</td>
                                <td>{compras.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button onClick={() => window.location.href = "/compras/create"}>Adicionar</Button>
            <Footer />
        </div>
    );
}
