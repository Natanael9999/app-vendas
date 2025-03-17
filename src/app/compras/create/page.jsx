'use client'

import { useState } from "react";
import "./style.css";

export default function CreateCompras() {
    const [compras, setCompras] = useState([]);
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [error, setError] = useState(null);

    const enviarCompra = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/compra", {
                method: "POST",
                body: JSON.stringify({ valor: Number(valor), quantidade: Number(quantidade) }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar compra');
            }

            const data = await response.json();

            // Atualiza a lista de compras após adicionar uma nova compra
            setCompras([...compras, data]);
            setValor('');
            setQuantidade('');

            alert("Compra adicionada com sucesso!");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container">
                <form className="formulario" onSubmit={enviarCompra}>
                    <input
                        type="text"
                        placeholder="Valor"
                        className="input"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Quantidade"
                        className="input"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                    <button type="submit" className="botao botao-enviar">Enviar</button>
                    <button type="button" className="botao botao-retornar" onClick={() => window.location.href = "/compras/read"}>
                        Retornar
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    );
}