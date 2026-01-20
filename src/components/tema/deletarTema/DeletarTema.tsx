import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../service/Service"
import { ClipLoader } from "react-spinners"

function DeletarTema(){

    const navigate = useNavigate()

    const [tema, setTemas] = useState<Tema>({} as Tema)

    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)

    const token = usuario.token

    const {id} = useParams<{ id: string }>();

    async function buscarPorId(id:string) {
        try {
            await buscar(`/temas/${id}`, setTemas, { headers: {Authorization: token}})
        } catch (error: any) {
            if(error.toString().includes('401') || error.toString().includes('403')){
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, { headers:{Authorization: token}})
            alert ('Tema apagado com sucesso.')
        } catch (error: any) {
            if(error.toString().includes('401') || error.toString().includes('403')){
                handleLogout()
            }else{
                alert('Erro ao deletar o tema.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate('/temas')
    }

    return(
        <>
        <div className="Container w-1/3 mx-auto">
            <h1 className="text-4x1 text-center my-4">Deletar tema</h1>
            <p className="text-center font-semibold mb-4">Voce tem certeza que deseja deletar o tema a seguir ?</p>
            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                <header className="py-2 px-6 bg-green-700 text-white font-bold text-2xl">Tema</header>
                <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>
                <div className="flex">
                    <button className="text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2" onClick={retornar}>Não</button>
                    <button className="w-full text-slate-100 bg-green-600 hover:bg-green-800 flex items-center justify-center" onClick={deletarTema}>{isLoading ? <ClipLoader color="#ffffff" size={24}/>: <span>Sim</span>}</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default DeletarTema