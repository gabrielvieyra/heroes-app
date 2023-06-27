# Heroes App

Proyecto creado con react que te permite crear tu propio equipo de héroes. Para poder utilizar la aplicación, el usuario debe estar autenticado, en el caso de ingresar a una ruta privada será automáticamente redireccionado a la pantalla de login.

**Demo:** link de la demo (TODO)

### Caracteristicas generales:

- Login:
  - La aplicación cuenta con un formulario para loguearse utilizando el servicio de autenticación de Firebase
  - El formulario de login muestra un mensaje de error si algunos de los inputs están vacíos, si alguno de los datos enviados no son correctos, si ocurrio algun error que no permitió realizar la petición
- Registro:
  - La aplicación cuenta con un formulario para registrarse utilizando el servicio de autenticación de Firebase
  - El formulario de registro muestra un mensaje de error si algunos de los inputs están vacíos, si alguno de los datos enviados no son correctos, si ocurrio algun error que no permitió realizar la petición
- Home:
  - Muestra un listado de cards con los miembros del equipo con nombre, imagen, powerstats, botones para ver más detalles del héroe o eliminarlo del equipo
  - Muestra cual es la habilidad mas fuerte del equipo
  - Muestra la suma de los powerstats de los integrantes del equipo
  - Muestra el peso y la altura promedio del equipo
  - Muestra un aviso si no hay ningun heroe en el equipo
- Buscador de héroes:
  - Vas a poder buscar a tus héroes favoritos y agregarlos a tu equipo
  - Si se busca por un texto ej "messi" y no hay ningun heroe que coincida con dicho texto se muestra un mensaje comentando que el héroe que está buscando no se encontró
  - Al realizar una búsqueda no se tendrá en cuenta si la persona ha introducido el texto en mayúsculas o minúsculas
- Cada vez que el usuario intente agregar un héroe al equipo se valida que:
  - El personaje no forme parte del equipo
  - No se haya alcanzado el límite de seis miembros
  - No se haya alcanzado el límite de tres miembros con orientación buena, ni de tres con orientación mala
  - En el caso de no pasar alguna validación de estas, al intentar agregar un héroe se va a informar cual es el error
- Detalles de los heroes:
  - Entre los detalles de los héroes se muestran algunos aspectos como nombre, alter egos, alineación, lugar de trabajo, altura, peso, color de pelo, color de los ojos
- La información se obtiene desde una API
- Creacion e implementacion de custom hooks con el fin de optimizar el código
- Manejo de las rutas con React Router Dom
- Manejo del estado de la aplicación mediante Context API
- La página web es responsive

### Usuario para ingresar:

- email: lionelmessi@test.com
- password: testtest

### Instalación:

1. Clonar el repositorio en tu ordenador

```
git clone https://github.com/gabrielvieyra/heroes-app.git
```

2. Instalar las dependencias del proyecto

```
npm install
```

3. Iniciar el servidor local

```
npm run dev
```

4. ¡Listo!

### Tecnologías utilizadas:

- HTML
- Sass
- TypeScript
- React
- Firebase
- Git / Github

### Imágenes:

![GIF de muestra.](/public/heroes-app.gif 'Vista del proyecto.')

<!-- --------------------------------------------------------------------------------------------------------------------------------------  -->

<!--
- Organizacion del proyecto:

- TODO:
- deployarlo / agregar gif al readme / agregar demo al readme
- tests unitarios del curso de react?

- Commits:
- actualizo el readme
- resuelvo errores de eslint
-->
