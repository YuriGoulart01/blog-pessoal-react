function Home(){
    return(
        <>
        <main>
            <section style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                backgroundColor:"#1d5705",
                }}>
                <article style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    color:"white"
                }}>
                    <h1>Seja bem vindo!</h1>
                    <p>Expresse aqui seus pensamentos e opiniões</p>
                    <button style={{
                        border:"1rem",
                        padding:"0.5rem",
                        borderRadius: "1rem"
                    }}>Nova postagem</button>
                </article>
                
                <figure>
                    <img src="https://i.imgur.com/GOXBTaw.jpg" alt="" width={"80%"} style={{borderRadius: "1rem"}}/>
                </figure>
            </section>
        </main>
        </>
    )
}

export default Home