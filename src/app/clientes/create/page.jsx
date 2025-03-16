'use client'

import { useState, useEffect } from "react";

export default function CreateCliente() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [error, setError] = useState(null);

    const enviarCliente = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("../api/clientes", {
                method: "POST",
                body: JSON.stringify({ nome, endereco, cidade }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log('POST response:', response);

            if (!response.ok) {
                throw new Error('Erro ao enviar cliente');
            }

            const data = await response.json();
            console.log('POST data:', data);

            // Atualiza a lista de clientes após adicionar um novo cliente
            setClientes([...clientes, data]);
            setNome('');
            setEndereco('');
            setCidade('');
        } catch (error) {
            console.error('POST error:', error);
            setError(error.message);
        }
    };

    return (
        <>
            <form onSubmit={enviarCliente}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </>
    );
}