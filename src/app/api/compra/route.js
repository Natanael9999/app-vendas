import { createConnection } from "../../lib/mysql";
import {NextResponse} from "next/server";


export async function GET(){
   try{
       const db = await createConnection()
       const sql = "select * from Compra"
       const [compra] = await db.query(sql)


       return NextResponse.json(compra)


   } catch(error){
       console.log(error)
       return NextResponse.json({erro: error.message})
   }
}

export async function POST(){

    try{
        const db = await createConnection()
        const sql = "insert into Local (valor, quantidade) values (?,?)"
        const {valor, quantidade} = await Request.json();
        await db.query(sql,[valor, quantidade])

        return NextResponse.json({message: "Compra inserida com sucesso"})
    } catch (error){
        return NextResponse.json({erro: error.message})
    }
}