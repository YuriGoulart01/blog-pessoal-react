import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { cadastrarUsuario } from "../../service/Service"

function Cadastro() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmarSenha, setConfirmarSenha] = useState<string>('')
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0
        nome: ''
        usuario: ''
        senha: ''
        foto: ''
    })

    function retornarUsuario(){
        navigate('/')
    }

    useEffect(() => {
        if(usuario.id !== 0){
            retornarUsuario()
        }
    },[usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e:FormEvent<HTMLFormElement>){
        e.preventDefault()

        if (confirmarSenha === usuario.senha && usuario.senha.lenght >= 8) {
            setIsLoading(true)
            try {
                await cadastrarUsuario(`usuarios/cadastrar`, usuario, setUsuario)
                alert('usuario cadastrado com sucesso')
            } catch (error) {
                alert ('Erro ao cadastrar o usuario')
            }
        } else {
            alert ('As senhas não conferem')
            setUsuario({...usuario, senha: ''})
            setConfirmarSenha('')
        }
        setIsLoading(false)
    }

    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                <div className="bg-[url:('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-center"></div>
                <form className="flex justify-center items-center flex-col w-2/3 gap-3">
                    <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" name="nome" value={usuario.nome} placeholder="Nome" className="border-2 border-slate-700 rounded p-2" onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" id="usuario" name="usuario" placeholder="Usuario" className="border-2 border-slate-700 rounded p-2" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Foto</label>
                        <input type="text" id="foto" name="foto" placeholder="Foto" className="border-2 border-slate-700 rounded p-2" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Senha</label>
                        <input type="text" id="senha" name="senha" placeholder="Senha" className="border-2 border-slate-700 rounded p-2" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome">Confirmar senha</label>
                        <input type="text" id="confirmarSenha" name="confirmarSenha" placeholder="Confirmar senha" className="border-2 border-slate-700 rounded p-2" />
                    </div>
                    <div className="flex justify-around w-full gap-8">
                        <button type="reset" className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2">Cancelar</button>
                        <button type="submit" className="rounded text-white bg-green-600 hover:bg-green-700 w-1/2 py-2 flex justify-center">Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Cadastro