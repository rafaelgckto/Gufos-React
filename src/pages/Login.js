import React, { Component } from 'react';
import Axios from 'axios';
import '../assets/css/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
            erroMensagem: ""
        }
    }

    EfetuaLogin(event) {
        event.preventDefault();

        // Primeiro parâmetro URL da requisição
        Axios.post('http://localhost:5000/api/login', {
            // Segundo parâmetro são os dados
            email: this.state.email,
            senha: this.state.senha
        }).then(data => {
            // Criando uma condição que analiza o status da requisição
            if (data.status === 200) {
                localStorage.setItem('usuario-gufos', data.data.token);
                console.log("Meu token é " + data.data.token);
            }
        }).catch(erro => { // Criando um tratamento para o erro
            this.setState({
                erroMensagem: "E-mail ou senha inválidos!"
            });
        });
    }

    AtualizaStateCampo(event) {
        // this.setState({
        //     email: this.state.email
        // });

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <section className="container flex">
                    <div className="img__login">
                        <div className="img__overlay"></div>
                    </div>

                    <div className="item__login">
                        <div className="row">
                            <div className="item">
                                <img src={require("../assets/img/icon-login.png")} className="icone__login" />
                            </div>
                            <div className="item" id="item__title">
                                <p className="text__login" id="item__description">
                                    Bem-vindo! Faça login para acessar sua conta.
                                </p>
                            </div>
                            <form onSubmit={this.EfetuaLogin.bind(this)}>
                                <div className="item">
                                    {/* Input E-mail */}
                                    <input
                                        value={this.state.email}
                                        onChange={this.AtualizaStateCampo.bind(this)}
                                        className="input__login"
                                        placeholder="E-mail"
                                        type="text"
                                        name="email"
                                        id="login__email"
                                    />
                                </div>
                                <div className="item">
                                    {/* Input Senha */}
                                    <input
                                        value={this.state.senha}
                                        onChange={this.AtualizaStateCampo.bind(this)}
                                        className="input__login"
                                        placeholder="Password"
                                        type="password"
                                        name="senha"
                                        id="login__password"
                                    />
                                </div>
                                <div className="item">
                                    <button type="submit" class="btn btn__login" id="btn__login">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/*
                <script>
                    console.log(document);
                    id
                    console.log(document.getElementById("login__email"));
                    classe
                    console.log(document.getElementsByClassName("input__login"));

                    var a = 10;
                    var b = "Texto";

                    buscar a referencia do botao
                    var btnLogin = document.querySelector("#btn__login");

                    btnLogin.addEventListener("click", function(event) {
                    event.preventDefault();
                    console.log("Hello World!");
                    console.log(document.querySelector("#login__email").value);
                    });

                    var inputSenha = document.querySelector("#login__password");
                            
                    inputSenha.addEventListener("keyup", function() {
                        caso a senha tenha menos do que 6 caracteres, fica vermelho, querido
                        if (inputSenha.value.length < 6) {
                            inputSenha.style.borderBottomColor = "red";
                        } 
                        else {
                            inputSenha.style.borderBottomColor = "green";
                        }
                    });
                </script>
                */}
            </div>
        );
    }
}

export default Login;