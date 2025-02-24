export default async function Produtos(){
    
    const recebedados = await fetch('https://api.vercel.app/products');
    const produtos = await recebedados.json();

    return(
        <>

            <ul>
                {
                    produtos.map ((produto) => (
                        <li key={produto.key}>
                            {produto.id}
                            {produto.name}
                        </li>
                    ))
                }
            </ul>

        </>
    )

}