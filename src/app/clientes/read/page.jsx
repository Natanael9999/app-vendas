'use client';

import { useState, useEffect } from "react";
import './style.css';
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button";

export default function ReadCliente() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch("../api/clientes");
                if (!response.ok) {
                    throw new Error('Erro ao buscar clientes');
                }
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchClientes();
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
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.cidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Button onClick={() => window.location.href = "/clientes/create"}>Adicionar</Button>
            <Footer />
        </div>
    );
}
