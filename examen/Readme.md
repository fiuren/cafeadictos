Crearemos una pagina web que conste de los siguientes elementos:
Titular llamado "header.js" y un pie de pagina llamado"footer.js"

Vinculamos los .js al index mediante el enlace "script src" junto con la oja de estilos y fontawesome.
Vamos a crear un mismo esquema de header y footer para todas las páginas html que tenga nuestra web, tan solo tendremos que indicar en el "head" los vinculos a los archivos .js

Ambos .js trabajan del mismo modo, de manera que la explicacion de un caso es aplicable al otro.

Header.js:

declamaramos el nombre de la variable o constante que vayamos a utilizar; en este caso:

*const headerTemplate = document.createElement('template');* ya hemos creado nuestra constante en este caso.

y a continucación indicamos que vaya vinculada a la pagina html mediante la siguiente sintaxis:
*headerTemplate.innerHTML = `*

una vez creada y declarada, dentro de ella le damos las caracteristicas CSS y HTML que le corresponda como bien se puede apreciar en color naranja.

Una vez que hayamos terminado con las caracteristicas técnicas y estéticas hacemos que ese archivo .js se introduzca dentro de los nuevos elementos HTML que se vayan a crear mediante la siguiente sentencia:

*class Header extends HTMLElement {
  constructor() {
    super();
  }*

  A continuacion, hacemos que devuelva la llamada al archivo:
   
   *connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(headerTemplate.content);
  }*
  en la funcion de Callback, declaramos que el archivo no se pueda modificar si es llamado a otros archivos .js ya que lo hemos declarado como "closed". Si lo que queremos es realizar lo contrario cambiamos ese elemento por "open".

  y por último definimos por completo el archivo .js y le damos un nombre, en este caso corresponde a "header-componentes".
  *customElements.define('header-component', Header);*

<img src="https://user-images.githubusercontent.com/89069423/143441269-0b70a2fe-749a-4e9e-8881-f8502ad26565.png"/>
<img src="https://user-images.githubusercontent.com/89069423/143441351-a6cb50e4-1bf4-4ae6-a154-d251c47f4e03.png"/>

