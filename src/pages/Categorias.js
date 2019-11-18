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

        // Chamar funções do projeto
        this.AtualizaEstadoTitulo = this.AtualizaEstadoTitulo.bind(this);
        this.BuscarCategorias = this.BuscarCategorias.bind(this);
        this.CadastrarCategoria = this.CadastrarCategoria.bind(this);
    }

    /* 
        Função que faz a requisição para a api
        Atribui os dados recebidos ao state listaCategorias
        Caso ocorra um erro, exibe no console do navegador
    */
    BuscarCategorias() {
        fetch('http://localhost:5000/api/categorias')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaCategorias: data }))
            .catch((erro) => console.log(erro));
    }

    // Recebe um evento, e recebo o valor do campo titulo
    AtualizaEstadoTitulo(event) {
        this.setState({ titulo: event.target.value });// titulo vai receber um estado de evento
    }

    CadastrarCategoria(event) {
        event.preventDefault();// Faz cessar comportamentos padrões da página 

        fetch('http://localhost:5000/api/categorias', {
            method: 'POST',// Declara o método que será utilizado
            body: JSON.stringify({ titulo: this.state.titulo }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                console.log("Categoria cadastrada com sucesso!");// Mensagem de sucesso
            }
        }).catch(erro => console.log(erro)).then(this.BuscarCategorias());
    }

    // Assim que a página for carregada, chama a função buscarCategoria
    componentDidMount() {
        this.BuscarCategorias();
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
                                            this.state.listaCategorias.map(function (categoria) {
                                                return (
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
                                {/* 
                                    Adicionar eventos no formulários
                                    Adicionar evento para submeter requisição e chamar a função a ser
                                */}
                                <form onSubmit={this.CadastrarCategoria}>
                                    <div class="container">
                                        <input
                                            value={this.state.titulo}// O valor digitado no input vai para 
                                            onChange={this.AtualizaEstadoTitulo}// Evento do formulário
                                            type="text"
                                            id="nome-tipo-evento"
                                            placeholder="tipo do evento"
                                        />
                                        <button
                                            type="submit"
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