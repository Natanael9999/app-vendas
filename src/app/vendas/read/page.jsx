'use client'

import { useState, useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button";

export default function ReadVendas() {
    const [vendas, setVendas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchVendas = async () => {
            try {
                const response = await fetch("/api/venda");
                if (!response.ok) {
                    throw new Error('Erro ao buscar fornecedores');
                }
                const data = await response.json();
                setVendas(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchVendas();
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
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map((produtos) => (
                            <tr key={produtos.id}>
                                <td>{produtos.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button onClick={() => window.location.href = "/vendas/create"}>Adicionar</Button>
            <Footer />
        </div>
    );
}