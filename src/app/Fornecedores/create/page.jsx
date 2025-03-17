'use client'

import { useState } from "react";
import "./style.css";

export default function CreateFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [error, setError] = useState(null);

    const enviarFornecedor = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/fornecedor", {
                method: "POST",
                body: JSON.stringify({ nome: nome, endereco: endereco, cidade: cidade }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar fornecedor');
            }

            const data = await response.json();

            // Atualiza a lista de fornecedores após adicionar um novo fornecedor
            setFornecedores([...fornecedores, data]);
            setNome('');
            setEndereco('');
            setCidade('');

            alert("Fornecedor adicionado com sucesso!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container">
                <form className="formulario" onSubmit={enviarFornecedor}>
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
                    <button type="button" className="botao botao-retornar" onClick={() => window.location.href = "/Fornecedores/read"}>
                        Retornar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}