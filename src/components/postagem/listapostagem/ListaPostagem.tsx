import { useContext, useEffect, useState } from "react";
import CardPostagem from "../cardpostagem/CardPostagem";
import { buscar } from "../../../service/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

function ListaPostagens() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [postagens, setPostagens] = useState<Postagem[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()    
    }, [postagens.length])

    async function buscarPostagens() {
        try {

            setIsLoading(true)

            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if(error.toString().includes('401') || error.toString().includes('403')){
                    handleLogout()
            }
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <>

            {isLoading && (
                <div className="flex justify-center w-full my-8">
                       <SyncLoader color="#312e81" size ={32}/> 
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    {(!isLoading && postagens.length === 0) && (<span className="text-3xl text-center my-8">Nenhuma Postagem foi encontrada!</span>)}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            postagens.map((postagens) => (
                                <CardPostagem key={postagens.id} postagem={postagens}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;