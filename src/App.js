import React from 'react';
// import "./App.css";
import Rodape from './componentes/Rodape';

import './assets/css/cabecalho.css';
import './assets/css/flexbox.css';
import './assets/css/style.css';
import './assets/css/reset.css';

function App() {
  return (
    <div>
      <header class="cabecalhoPrincipal">
        <div class="container">
          <img src={require("./assets/img/icon-login.png")} />

          <nav class="cabecalhoPrincipal-nav">
            <a>Home</a>
            <a>Eventos</a>
            <a>Contato</a>
            <a class="cabecalhoPrincipal-nav-login" href="login.html">Login</a>
          </nav>
        </div>
      </header>

      <section class="conteudoImagem">
        <div>
          <h1>Gufos</h1>
          <h2>Área de eventos da Escola SENAI de Informática.</h2>
        </div>
      </section>

      <main class="conteudoPrincipal">
        <section id="conteudoPrincipal-eventos">
          <h1 id="conteudoPrincipal-eventos-titulo">Próximos Eventos</h1>
          <div class="container">
            <nav>
              <ul class="conteudoPrincipal-dados">
                <li class="conteudoPrincipal-dados-link eventos">
                  <h2>Título do Evento</h2>
                  <p>
                    Breve descrição sobre o evento. Lorem ipsum lorem ipsum
                    lorem ipsum.
                  </p>
                  <button>conectar</button>
                </li>

                <li class="conteudoPrincipal-dados-link eventos">
                  <h2>Título do Evento</h2>
                  <p>
                    Breve descrição sobre o evento. Lorem ipsum lorem ipsum
                    lorem ipsum.
                  </p>
                  <button>conectar</button>
                </li>

                <li class="conteudoPrincipal-dados-link eventos">
                  <h2>Título do Evento</h2>
                  <p>
                    Breve descrição sobre o evento. Lorem ipsum lorem ipsum
                    lorem ipsum.
                  </p>
                  <button>conectar</button>
                </li>

                <li class="conteudoPrincipal-dados-link eventos">
                  <h2>Título do Evento</h2>
                  <p>
                    Breve descrição sobre o evento. Lorem ipsum lorem ipsum
                    lorem ipsum.
                  </p>
                  <button>conectar</button>
                </li>
              </ul>
            </nav>
          </div>
        </section>

        <section id="conteudoPrincipal-visao">
          <h1 id="conteudoPrincipal-visao-titulo">Por Quê Participar?</h1>
          <div class="container">
            <p class="visao-texto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Nullam auctor suscipit eros sed blandit. <br />
              Fusce euismod neque sed dapibus sollicitudin. <br />Duis vel lacus
              vestibulum, molestie dui eu, bibendum nunc.
            </p>
          </div>
        </section>

        <section id="conteudoPrincipal-contato">
          <h1 id="conteudoPrincipal-contato-titulo">Contato</h1>
          <div class="container conteudo-contato-titulo">
            <div class="contato-mapa conteudo-contato-mapa"></div>
            <div class="contato-endereco conteudo-contato-endereco">
              Alameda Barão de Limeira, 539 <br />
              São Paulo - SP
            </div>
          </div>
        </section>
      </main>

      <Rodape/>
      
    </div>// final da Div Principal
  );
}

export default App;