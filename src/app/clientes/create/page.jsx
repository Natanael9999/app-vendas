'use client'

import { useState, useEffect } from "react";
import "./style.css";

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

            alert("Cliente adicionado com sucesso!");
        } catch (error) {
            console.error('POST error:', error);
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container">
            <form className="formulario" onSubmit={enviarCliente}>
                <input
                    type="text"
                    placeholder="Nome"
                    className="input"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Endereço"
                    className="input"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    className="input"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
                <button type="submit" className="botao botao-enviar">Enviar</button>
                <button type="button" className="botao botao-retornar" onClick={() => window.location.href = "/clientes/read"}>
                    Retornar
                </button>
            </form>
        </div>
        </>
    );
}