import { createConnection } from "../../lib/mysql";
import {NextResponse} from "next/server";


export async function GET(){
   try{
       const db = await createConnection()
       const sql = "select * from Local"
       const [local] = await db.query(sql)


       return NextResponse.json(local)


   } catch(error){
       console.log(error)
       return NextResponse.json({erro: error.message})
   }
}

export async function POST(){

    try{
        const db = await createConnection()
        const sql = "insert into Local (endereco, numero, bairro, cidade) values (?,?,?,?)"
        const {endereco, numero, bairro, cidade} = await Request.json();
        await db.query(sql,[endereco, numero, bairro, cidade])

        return NextResponse.json({message: "Local inserido com sucesso"})
    } catch (error){
        return NextResponse.json({erro: error.message})
    }
}