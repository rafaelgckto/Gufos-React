import React, { Component } from 'react';
import '../App.css';
import Rodape from '../componentes/Rodape';

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCategorias: [],
            titulo: ''
        }
    }

    /* 
        Função que faz a requisição para a api
        Atribui os dados recebidos ao state listaCategorias
        Caso ocorra um erro, exibe no console do navegador
    */
    buscarCategorias() {
        fetch('http://localhost:5000/api/categorias')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaCategorias : data}))
            .catch((erro) => console.log(erro));
    }

    // Assim que a página for carregada, chama a função buscarCategoria
    componentDidMount(){
        this.buscarCategorias();
    }

    render() {
        return (
            <div className='App'>

                <div>
                    <header class="cabecalhoPrincipal">
                        <div class="container">
                            <img src={require("../assets/img/icon-login.png")} />

                            <nav class="cabecalhoPrincipal-nav">
                                Administrador
                                </nav>
                        </div>
                    </header>

                    <main class="conteudoPrincipal">
                        <section class="conteudoPrincipal-cadastro">
                            <h1 class="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                            <div class="container" id="conteudoPrincipal-lista">
                                <table id="tabela-lista">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Título</th>
                                        </tr>
                                    </thead>

                                    <tbody id="tabela-lista-corpo">

                                        {/* Utilizar função e map para preencher a lista */}

                                        {
                                            // Percorre o array listaCategoria e preenche o corpo da
                                            // com o ID e o título de cada categoria
                                            this.state.listaCategorias.map(function(categoria){
                                                return(
                                                    <tr key={categoria.categoriaId}>
                                                        <td>{categoria.categoriaId}</td>
                                                        <td>{categoria.titulo}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div class="container" id="conteudoPrincipal-cadastro">
                                <h2 class="conteudoPrincipal-cadastro-titulo">
                                    Cadastrar Tipo de Evento
                                    </h2>
                                <form>
                                    <div class="container">
                                        <input
                                            type="text"
                                            id="nome-tipo-evento"
                                            placeholder="tipo do evento"
                                        />
                                        <button
                                            class="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                                            Cadastrar
                                          </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </main>
                </div>

                <Rodape />

            </div>
        )
    }
}

export default Categoria; // Por padrão recebe o return e envia para o return e envia para o navegador