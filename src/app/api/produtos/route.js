import { createConnection } from "../../lib/mysql";
import {NextResponse} from "next/server";


export async function GET(){
   try{
       const db = await createConnection()
       const sql = "select * from Produto"
       const [produto] = await db.query(sql)


       return NextResponse.json(produto)


   } catch(error){
       console.log(error)
       return NextResponse.json({erro: error.message})
   }
}

export async function POST(){

    try{
        const db = await createConnection()
        const sql = "insert into Local (nome, preco, quantidade) values (?,?,?)"
        const {nome, preco, quantidade} = await Request.json();
        await db.query(sql,[nome, preco, quantidade])

        return NextResponse.json({message: "Produto inserido com sucesso"})
    } catch (error){
        return NextResponse.json({erro: error.message})
    }
}