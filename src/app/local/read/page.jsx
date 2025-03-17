'use client'

import { useState, useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button";

export default function ReadLocal() {
    const [local, setLocal] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchFornecedores = async () => {
            try {
                const response = await fetch("/api/local");
                if (!response.ok) {
                    throw new Error('Erro ao buscar fornecedores');
                }
                const data = await response.json();
                setLocal(data);
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
                            <th>Endereço</th>
                            <th>Número</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {local.map((local) => (
                            <tr key={local.id}>
                                <td>{local.endereco}</td>
                                <td>{local.numero}</td>
                                <td>{local.bairro}</td>
                                <td>{local.cidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button onClick={() => window.location.href = "/local/create"}>Adicionar</Button>
            <Footer />
        </div>
    );
}