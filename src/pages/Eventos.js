import React, { Component } from 'react';
import '../App.css';

class Evento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaEventos: [],
            titulo: "",
            dataEvento: "",
            acessoLivre: "",
            categoria: ""
        }

        // Chamar funções do projeto
        this.BuscarEventos = this.BuscarEventos.bind(this);
        this.AtualizarEstadoTitulo = this.AtualizarEstadoTitulo.bind(this);
        this.AtualizarEstadoData = this.AtualizarEstadoData.bind(this);
        this.AtualizarEstadoAcesso = this.AtualizarEstadoAcesso.bind(this);
        this.CadastrarEvento = this.CadastrarEvento.bind(this);
        this.DeletarEvento = this.DeletarEvento.bind(this);
    }

    /*
        Função que faz a requisição para a API
        Atribui os dados recebidos ao state listaEvento
        Caso ocorra um erro, exibe no console do navegador
    */
    // Listar eventos da API
    BuscarEventos() {
        fetch('http://localhost:5000/api/eventos')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEventos: data }))
            .catch((erro) => console.log(erro));
    }

    // Recebe um evento, e recebe o valor do campo
    AtualizarEstadoTitulo(event) {
        this.setState({ titulo: event.target.value });// titulo vai receber um estado de evento
    }

    AtualizarEstadoData(event) {
        this.setState({ dataEvento: event.target.value });// dataEvento vai receber um estado de evento
    }

    AtualizarEstadoAcesso(event) {
        this.setState({ acessoLivre: event.target.value });// acessolivre vai receber um estado de evento
    }

    CadastrarEvento(event) {
        event.preventDefault();// Faz cessar comportamentos padrões da página

        fetch('http://localhost:5000/api/eventos', {
            method: 'POST',// Declara o método que será utilizado
            body: JSON.stringify({
                titulo: this.state.titulo,
                dataEvento: this.state.dataEvento,
                acessoLivre: this.state.acessoLivre
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                console.log("Evento cadastrado com sucesso!");// Mensagem de sucesso
            }
        }).catch(erro => console.log(erro)).then(this.BuscarEventos());
    }

    DeletarEvento = (id) => {
        console.log("Excluindo");

        fetch('http://localhost:5000/api/eventos' + id, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(resposta => resposta.json())
            .then(resposta => {
                console.log(resposta);
                this.ListaAtualizada();
                this.setState(() => ({ lista: this.state.lista }));
            })
            .catch(error => console.log(error))
            .then(this.BuscarEventos);
    }

    // Assim que a página for carregada, chama a função BuscarEventos()
    componentDidMount() {
        this.BuscarEventos();
    }

    // Renderizar o corpo da página
    render() {
        return (
            <div className='App'>

                <header class="cabecalhoPrincipal">
                    <div class="container">
                        <img src="./assets/img/icon-login.png" />

                        <nav class="cabecalhoPrincipal-nav">
                            Administrador
                            </nav>
                    </div>
                </header>

                <main class="conteudoPrincipal">
                    <section class="conteudoPrincipal-cadastro">
                        <h1 class="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div class="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {/* Utilizar função e map para preencher a lista */}

                                    {/* Percorre o array listaEvento e preenche o corpo da '' com o ID e o título de cada evento */}
                                    {
                                        this.state.listaEventos.map(function (evento) {
                                            return (
                                                <tr key={evento.eventoId}>
                                                    <td>{evento.eventoId}</td>
                                                    <td>{evento.titulo}</td>
                                                    <td>{evento.dataEvento}</td>
                                                    <td>{evento.acessoLivre ? "Público" : "Privado"}</td>
                                                    <td>{evento.categoria.titulo}</td>
                                                    <td>
                                                        <button type="submit" onClick={i => this.DeletarEvento(evento.eventoId)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <form onSubmit={this.CadastrarEvento}>
                            <div className="container" id="conteudoPrincipal-cadastro">
                                <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                                <div className="container">
                                    <input
                                        value={this.state.titulo}
                                        onChange={this.AtualizarEstadoTitulo}
                                        type="text"
                                        id="evento__titulo"
                                        placeholder="título do evento"
                                    />
                                    <input
                                        value={this.state.dataEvento}
                                        onChange={this.AtualizarEstadoData}
                                        type="date"
                                        id="evento__data"
                                        placeholder="dd/MM/yyyy"
                                    />
                                    <select
                                        value={this.state.acessoLivre}
                                        onChange={this.AtualizarEstadoAcesso}
                                        id="option__acessolivre">
                                        <option value="1">Publico</option>
                                        <option value="0">Privado</option>
                                    </select>
                                    <select
                                        id="option__tipoevento">
                                        <option value="0">Tipo do Evento</option>
                                        <option value="1"></option>
                                    </select>
                                    <textarea
                                        rows="3"
                                        cols="50"
                                        placeholder="descrição do evento"
                                        id="evento__descricao"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </section>
                </main>

                {/* <Rodape /> */}
            </div>
        )
    }
}

export default Evento;