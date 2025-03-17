'use client'

import { useState, useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button";

export default function ReadFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFornecedores = async () => {
            try {
                const response = await fetch("/api/fornecedor");
                if (!response.ok) {
                    throw new Error('Erro ao buscar fornecedores');
                }
                const data = await response.json();
                setFornecedores(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFornecedores();
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
                            <th>Endereço</th>
                            <th>Cidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedores.map((fornecedor) => (
                            <tr key={fornecedor.id}>
                                <td>{fornecedor.nome}</td>
                                <td>{fornecedor.endereco}</td>
                                <td>{fornecedor.cidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button onClick={() => window.location.href = "/Fornecedores/create"}>Adicionar</Button>
            <Footer />
        </div>
    );
}