function Home(){
    return(
        <>
        <main className="bg-green-700 flex justify-center">
            <section className="container grid grid-cols-2 text-white">
                <article className="flex flex-col gap-4 items-center justify-center py-4">
                    <h1 className="text-5xl font-bold">Seja bem vindo!</h1>
                    <p className="text-x1">Expresse aqui seus pensamentos e opiniões</p>
                    <button className="rounded text-white border-white border-solid border-2 py-2 px-4">Nova postagem</button>
                </article>
                
                <figure className="flex justify-center">
                    <img src="https://i.imgur.com/GOXBTaw.jpg" alt="" className="w-2/3 rounded"/>
                </figure>
            </section>
        </main>
        </>
    )
}

export default Home