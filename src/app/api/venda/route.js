import { createConnection } from "../../lib/mysql";
import {NextResponse} from "next/server";


export async function GET(){
   try{
       const db = await createConnection()
       const sql = "select * from Venda"
       const [local] = await db.query(sql)


       return NextResponse.json(local)


   } catch(error){
       console.log(error)
       return NextResponse.json({erro: error.message})
   }
}

export async function POST(request){

    try{
        const db = await createConnection()
        const sql = "insert into Venda (valor) values (?)"
        const {valor} = await request.json();
        await db.query(sql,[valor])

        return NextResponse.json({message: "Venda inserida com sucesso"})
    } catch (error){
        return NextResponse.json({erro: error.message})
    }
}