// Arquivo de configuração de rotas

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';// Importando a página categoria

import Categoria from './pages/Categorias';// Importando a página categoria
import Evento from './pages/Eventos';// Importando a página evento
import Usuario from './pages/Usuarios';// Importando a página usuário
import Login from './pages/Login';//Importando a página login
import NotFound from './pages/NotFound';// Importando a página 404

const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />{/* caminho de busca*/}
                <Route path="/categoria" component={Categoria} />
                <Route path="/evento" component={Evento} />
                <Route path="/usuario" component={Usuario} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

// Trocar a renderização chamando a váriavel declarada acima
ReactDOM.render(Rotas, document.getElementById('root'));

serviceWorker.unregister();
