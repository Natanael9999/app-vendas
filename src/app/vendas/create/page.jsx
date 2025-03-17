'use client'

import { useState } from "react";
import "./style.css";

export default function CreateVendas() {
    const [vendas, setVendas] = useState([]); // Lista de produtos
    const [valor, setValor] = useState(''); // Nome do produto
    const [error, setError] = useState(null); // Estado para erros

    const enviarVendas = async (e) => {
        e.preventDefault();

        try {
            

            // Envia os dados para a API
            const response = await fetch("/api/venda", {
                method: "POST",
                body: JSON.stringify({ valor: Number(valor)}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar produto');
            }

            const data = await response.json();

            // Atualiza a lista de produtos após adicionar um novo produto
            setVendas([...vendas, data]);

            // Limpa os campos do formulário
            setValor('');

            alert("Venda adicionado com sucesso!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container">
                <form className="formulario" onSubmit={enviarVendas}>
                    <input
                        type="text"
                        placeholder="Valor"
                        className="input"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                    <button type="submit" className="botao botao-enviar">Enviar</button>
                    <button type="button" className="botao botao-retornar" onClick={() => window.location.href = "/vendas/read"}>
                        Retornar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}