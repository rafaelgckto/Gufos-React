import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';// Importar a biblioteca MDB

// Importar o CSS

// Importar os Componentes da página
import Rodape from '../componentes/Rodape';
import { METHODS } from 'http';
import { timeout } from 'q';

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaCategorias: [],
            titulo: '',
            loading: false,
            erroMsg: '',
            modal: false,
            editarModal: {
                categoriaId: '',
                titulo: ''
            }
        }

        // Chamar funções do projeto
        this.AtualizaEstadoTitulo = this.AtualizaEstadoTitulo.bind(this);
        this.BuscarCategorias = this.BuscarCategorias.bind(this);
        this.CadastrarCategoria = this.CadastrarCategoria.bind(this);
    }

    // Add Toggle
    Toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    /* 
        Função que faz a requisição para a api
        Atribui os dados recebidos ao state listaCategorias
        Caso ocorra um erro, exibe no console do navegador
    */
    BuscarCategorias() {
        // Setar state loading
        this.setState({ loading: true });

        fetch('http://localhost:5000/api/categorias')
            .then(resposta => resposta.json())
            .then(data => {
                this.setState({ listaCategorias: data });

                // Setar state do loading
                this.setState({ loading: false });
            })
            .catch((erro) => {
                // Setar state do loading não aparecer
                this.setState({ loading: false });

                console.log(erro);
            });
    }

    CadastrarCategoria(event) {
        event.preventDefault();// Faz cessar comportamentos padrões da página 

        fetch('http://localhost:5000/api/categorias', {
            method: 'POST',// Declara o método que será utilizado
            body: JSON.stringify({ titulo: this.state.titulo }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    console.log("Categoria cadastrada com sucesso!");// Mensagem de sucesso
                }
            })
            .catch(erro => console.log(erro))
            .then(this.BuscarCategorias);
    }

    AlterarCategoria = (categoria) => {
        this.setState({
            editarModal: {
                categoriaId: categoria.categoriaId,
                titulo: categoria.titulo
            }
        });

        // Abrir Modal
        this.Toggle();
    }

    SalvarAlteracoes = (event) => {
        event.preventDefault(); // Faz cessar comportamentos padrões da página

        fetch('http://localhost:5000/api/categorias/' + this.state.editarModal.categoriaId, {
            method: 'PUT',
            body: JSON.stringify(this.state.editarModal),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(resposta => resposta.json())
            .then(
                setTimeout(() => {
                    this.BuscarCategorias();
                }, 2000)
            )
            .catch(error => console.log(error));

        // Fechar o Modal
        this.Toggle();
    }

    DeletarCategoria = (id) => {
        console.log("Excluindo");

        fetch('http://localhost:5000/api/categorias/' + id, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(resposta => resposta.json())
            .then(resposta => {
                console.log(resposta);
                this.BuscarCategorias();// Atualiza Categoria
                this.setState(() => ({ lista: this.state.lista }));
            })
            .catch(error => {
                console.log(error);
                this.setState({ erroMsg: "Não foi possível excluir, verifique se não há evento já cadastrado nessa Categoria" });
            });
    }

    // Recebe um evento, e recebo o valor do campo titulo
    AtualizaEstadoTitulo(event) {
        this.setState({ titulo: event.target.value });// titulo vai receber um estado de evento
    }

    // Atualizar título do Modal
    AtualizarEditarModalTitulo(input) {
        this.setState({
            editarModal: {
                categoriaId: this.state.editarModal.categoriaId,
                titulo: input.target.value
            }
        });
    }

    // Assim que a página for carregada, chama a função buscarCategoria
    componentDidMount() {
        this.BuscarCategorias();
    }

    render() {
        let { loading } = this.state;// Add variável Loading

        return (
            <div className='App'>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={require("../assets/img/icon-login.png")} />

                        <nav className="cabecalhoPrincipal-nav">
                            Administrador
                        </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Ação</th>
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
                                                    <td>
                                                        <button onClick={obj => this.AlterarCategoria(categoria)}>Alterar</button>
                                                        <button type="submit" onClick={i => this.DeletarCategoria(categoria.categoriaId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))
                                    }

                                </tbody>
                            </table>
                        </div>

                        {/* Add condições de Loading */}
                        {loading && <i className="fa fa-spin fa-spinner fa-2x"></i>}

                        {/* Exibir msg de erro */}
                        {this.state.erroMsg && <div className="text-danger">
                            {this.state.erroMsg}
                        </div>}

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">
                                Cadastrar Tipo de Evento
                                </h2>
                            {/* 
                                    Adicionar eventos no formulários
                                    Adicionar evento para submeter requisição e chamar a função a ser
                                */}
                            <form onSubmit={this.CadastrarCategoria}>
                                <div className="container">
                                    <input
                                        value={this.state.titulo}// O valor digitado no input vai para 
                                        onChange={this.AtualizaEstadoTitulo}// Evento do formulário
                                        type="text"
                                        id="nome-tipo-evento"
                                        placeholder="tipo do evento"
                                    />
                                    <button
                                        type="submit"
                                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>

                <MDBContainer>
                    <form onSubmit={this.SalvarAlteracoes}>
                        <MDBModal isOpen={this.state.modal} toggle={this.Toggle}>
                            <MDBModalHeader toggle={this.Toggle}>Alterar <b>{this.state.editarModal.titulo}</b></MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput
                                    label="Categoria"
                                    value={this.state.editarModal.titulo}
                                    onChange={this.AtualizarEditarModalTitulo.bind(this)}
                                />
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.Toggle}>Fechar</MDBBtn>
                                <MDBBtn type="submit" color="primary">Alterar</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </form>
                </MDBContainer>

                <Rodape />

            </div>
        )
    }
}

export default Categoria; // Por padrão recebe o return e envia para o return e envia para o navegador