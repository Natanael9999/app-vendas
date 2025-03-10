import { createConnection } from "../../lib/mysql";
import {NextResponse} from "next/server";


export async function GET(){
   try{
       const db = await createConnection()
       const sql = "select * from Fornecedor"
       const [fornecedor] = await db.query(sql)


       return NextResponse.json(fornecedor)


   } catch(error){
       console.log(error)
       return NextResponse.json({erro: error.message})
   }
}

export async function POST(){

    try{
        const db = await createConnection()
        const sql = "insert into Local (nome, endereco, cidade) values (?,?,?)"
        const {nome, endereco, cidade} = await Request.json();
        await db.query(sql,[nome, endereco, cidade])

        return NextResponse.json({message: "Fornecedor inserido com sucesso"})
    } catch (error){
        return NextResponse.json({erro: error.message})
    }
}