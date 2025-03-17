'use client'

import { useState } from "react";
import "./style.css";

export default function CreateLocal() {
    const [local, setLocal] = useState([]);
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [error, setError] = useState(null);

    const enviarFornecedor = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/local", {
                method: "POST",
                body: JSON.stringify({ endereco: endereco, numero: numero, bairro: bairro, cidade: cidade }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar fornecedor');
            }

            const data = await response.json();

            // Atualiza a lista de fornecedores após adicionar um novo fornecedor
            setLocal([...local, data]);
            setEndereco('');
            setNumero('');
            setBairro('');
            setCidade('');

            alert("Local adicionado com sucesso!");
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
                        placeholder="Endereço"
                        className="input"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Número"
                        className="input"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Bairro"
                        className="input"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="cidade"
                        className="input"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    />
                    <button type="submit" className="botao botao-enviar">Enviar</button>
                    <button type="button" className="botao botao-retornar" onClick={() => window.location.href = "/local/read"}>
                        Retornar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}