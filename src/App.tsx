import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import { AuthProvider } from './contexts/AuthContext'
import ListaTemas from './components/tema/listaTemas/ListaTema'
import FormTema from './components/tema/formTema/FormTema'
import DeletarTema from './components/tema/deletarTema/DeletarTema'
import FormPostagem from './components/postagem/formpostagem/FormPostagem'
import ListaPostagens from './components/postagem/listapostagem/ListaPostagem'
import DeletarPostagem from './components/postagem/deletarpostagem/DeletarPostagem'
import Perfil from './pages/perfil/Perfil'

function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
          <Route path='/home' element = {<Home/>}/>
          <Route path='/temas' element = {<ListaTemas/>}/>
          <Route path="/cadastrartema" element={<FormTema />} />
          <Route path="/editartema/:id" element={<FormTema />} />
          <Route path="/deletartema/:id" element={<DeletarTema />} />
          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/cadastrarpostagem" element={<FormPostagem />} />
          <Route path="/editarpostagem/:id" element={<FormPostagem />} />
          <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
