import { createConnection } from "../../lib/mysql";
import {NextResponse} from "next/server";


export async function GET(){
   try{
       const db = await createConnection()
       const sql = "select * from Cliente"
       const [cliente] = await db.query(sql)


       return NextResponse.json(cliente)


   } catch(error){
       console.log(error)
       return NextResponse.json({erro: error.message})
   }
}

export async function POST(request) {
    try {
        const db = await createConnection();
        const sql = "INSERT INTO Cliente (nome, endereco, cidade) VALUES (?, ?, ?)";
        const { nome, endereco, cidade } = await request.json();
        await db.query(sql, [nome, endereco, cidade]);

        return NextResponse.json({ message: "Cliente inserido com sucesso" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ erro: error.message });
    }
}