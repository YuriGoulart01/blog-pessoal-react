import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar } from "../../../service/Service";

function FormTema () {

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

    function atualizarEstado (e:ChangeEvent<HTMLInputElement>){
        setTemas({
            ...tema, [e.target.name]: e.target.value
        })
    }

    function retornar(){
        navigate('/temas')
    }

    async function gerarNovoTema(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined){
            try {
                await atualizar(`/temas`, tema, setTemas, { headers:{
                    Authorization: token
                }})
                alert('O Tema foi atualizado.')
            } catch (error: any) {
                    if(error.toString().includes('401') || error.toString().includes('403')){
                    handleLogout()
                }
            }
        } else {
            alert('Erro ao cadastrar o tema.')
        }
        setIsLoading(false)
        retornar()
    }

    return (
        <>
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">Cadastrar tema</h1>
            <form className="w-1/2 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input type="text" placeholder="Descreva aqui seu tema." name="descricao" className="border-2 border-slate-700 rounded p-2"/>
                </div>
                <button className="rounded text-slate-100 bg-green-600 hover:bg-green-800 w-1/2 py-2 mx-auto flex justify-center" type="submit">Cadastrar</button>
            </form>
        </div>
        </>
    )
}

export default FormTema;