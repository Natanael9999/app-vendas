import { createConnection } from "../../lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM Fornecedor";
        const [fornecedores] = await db.query(sql);

        return NextResponse.json(fornecedores);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ erro: error.message });
    }
}

export async function POST(request) {
    try {
        const db = await createConnection();
        const sql = "INSERT INTO Fornecedor (nome, endereco, cidade) VALUES (?, ?, ?)";
        const { nome, endereco, cidade } = await request.json();
        await db.query(sql, [nome, endereco, cidade]);

        return NextResponse.json({ message: "Fornecedor inserido com sucesso" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ erro: error.message });
    }
}