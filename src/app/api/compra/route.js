import { createConnection } from "../../lib/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM Compra";
        const [compras] = await db.query(sql);

        return NextResponse.json(compras);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ erro: error.message });
    }
}

export async function POST(request) {
    try {
        const db = await createConnection();
        const sql = "INSERT INTO Compra (valor, quantidade) VALUES (?, ?)";
        const { valor, quantidade } = await request.json();
        await db.query(sql, [valor, quantidade]);

        return NextResponse.json({ message: "Compra inserida com sucesso" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ erro: error.message });
    }
}