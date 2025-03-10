'use client'

import { useState, useEffect } from "react";

export default function Cliente() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');

    useEffect(() => {
        const fetchClientes = async () => {
            const receberAPI = await fetch("http://localhost:3000/api/clientes");
            const convertejson = await receberAPI.json();
            setClientes(convertejson);
        };

        fetchClientes();
    }, []);

    const enviarCliente = async (e) => {
        e.preventDefault();

        const enviarAPI = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            body: JSON.stringify({ nome, endereco, cidade }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const resposta = await enviarAPI.json();
        console.log(resposta);

        // Atualiza a lista de clientes após adicionar um novo cliente
        setClientes([...clientes, resposta]);
    };

    return (
        <>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>
                        {cliente.id} {cliente.nome}
                    </li>
                ))}
            </ul>

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