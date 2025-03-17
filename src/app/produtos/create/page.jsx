'use client'

import { useState } from "react";
import "./style.css";

export default function CreateProduto() {
    const [produtos, setProdutos] = useState([]); // Lista de produtos
    const [nome, setNome] = useState(''); // Nome do produto
    const [preco, setPreco] = useState(''); // Valor do produto
    const [quantidade, setQuantidade] = useState(''); // Quantidade do produto
    const [error, setError] = useState(null); // Estado para erros

    const enviarProduto = async (e) => {
        e.preventDefault();

        try {
            // Validação básica dos campos
            if (!nome || !preco || !quantidade) {
                throw new Error('Todos os campos são obrigatórios');
            }

            // Envia os dados para a API
            const response = await fetch("/api/produtos", {
                method: "POST",
                body: JSON.stringify({ nome: nome, preco: Number(preco), quantidade: Number(quantidade) }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar produto');
            }

            const data = await response.json();

            // Atualiza a lista de produtos após adicionar um novo produto
            setProdutos([...produtos, data]);

            // Limpa os campos do formulário
            setNome('');
            setPreco('');
            setQuantidade('');

            alert("Produto adicionado com sucesso!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container">
                <form className="formulario" onSubmit={enviarProduto}>
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        className="input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Valor do Produto"
                        className="input"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Quantidade"
                        className="input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                    <button type="submit" className="botao botao-enviar">Enviar</button>
                    <button type="button" className="botao botao-retornar" onClick={() => window.location.href = "/produtos/read"}>
                        Retornar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}