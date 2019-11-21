// Define a constante usuarioAutenticado que vai receber o valor do token armazenados 
export const usuarioAutenticado = () => localStorage.getItem('usuario-gufos') !== null;

export const parseJwt = () => {
    // Define a variável base64 que vai receber o payload do token
    var base64 = localStorage.getItem('usuario-gufos').split('.')[1];

    /* Converte a base64 para string através do método atob
       E converte a string para JSON */
    return JSON.parse(window.atob(base64));
}