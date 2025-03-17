'use client'

import { useState, useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button";

export default function ReadProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchProdutos = async () => {
            try {
                const response = await fetch("/api/produtos");
                if (!response.ok) {
                    throw new Error('Erro ao buscar fornecedores');
                }
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProdutos();
    }, []);

    return (
        <div>
            <Header />
            <div className="table-container">
                {error && <p className="error">{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produtos) => (
                            <tr key={produtos.id}>
                                <td>{produtos.nome}</td>
                                <td>{produtos.preco}</td>
                                <td>{produtos.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button onClick={() => window.location.href = "/produtos/create"}>Adicionar</Button>
            <Footer />
        </div>
    );
}