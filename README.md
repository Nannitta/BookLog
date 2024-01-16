# Prueba Técnica - BookLog

<img src='./client/assets/logo.png' width='150'/>

![MockUp](./client/assets/mockup.png)

<ol id='menu'>
  <li>
    <a href='#📁-sobre-el-proyecto'>Sobre el proyecto</a>
      <ul>
      <li><a href='#objetivo-general'>Objetivo general</a></li>
      <li><a href='#⚙️-back-end'>Back-End</a></li>
      <li><a href='#🎨-front-end'>Front-End</a></li>
    </ul>
  </li>
  <li>
    <a href="#📑-antes-de-empezar">Antes de empezar</a>
    <ul>
      <li><a href='#🔨-instalación'>Instalación</a></li>
      <li><a href='#🎯-endpoints'>Endpoints</a></li>
    </ul>
  </li>
  <li>
    <a href="#💻-tecnologías-utilizadas">Tecnologías utilizadas</a>
  </li>
</ol>

</br>

# 📁 Sobre el proyecto

## Objetivo general
Desarrollar una aplicación completa utilizando Node.js, Express, Firebase y React Native.

Construir una API REST utilizando Node.js y Express, integrar Firebase Firestore como base de datos, y desarrollar una aplicación móvil utilizando React Native para consumir y mostrar los datos de la API.

### ⚙️ Back-End
Crear un proyecto en Firebase y configurar Firebase Firestore como base de datos. crear una API REST utilizando Node.js y Express. La API debe tener los siguientes endpoints:
- **GET /books:** Devuelve una lista de todos los libros almacenados en Firebase Firestore.
- **GET /books/{id}:** Devuelve los detalles de un libro específico según su ID.
- **POST /books:** Crea un nuevo libro con la información proporcionada en la solicitud.
- **PUT /books/{id}:** Actualiza la información de un libro existente según su ID.
- **DELETE /books/{id}:** Elimina un libro específico según su ID.

Utilizar la biblioteca firebase-admin de Node.js para interactuar con Firebase Firestore y realizar las operaciones CRUD necesarias.

### 🎨 Front-end
Crear una interfaz de usuario en la aplicación móvil utilizando componentes de React Native. La interfaz de usuario debe mostrar los libros obtenidos de la API REST desarrollada en el back.

Mostrar la lista de libros en una pantalla principal.
- Permitir al usuario ver los detalles de un libro al hacer clic en él.
- Proporcionar la funcionalidad para agregar un nuevo libro.
- Permitir al usuario editar y eliminar libros existentes.

</br>


# 📑 Antes de empezar

### 🔨 Instalación
* Clonar el repositorio

    ```
    git clone git@github.com:Nannitta/BookLog.git
    ```

* Cambiar a la carpeta `server` e instalar las dependencias necesarias
  
    ```
    cd server/

    npm install
    ```

* Arrancar el servidor

    ```
    npm run dev
    ```
* En otra terminal cambiamos a la carpeta `client` e instalamos las dependencias necesarias
  
    ```
    cd client/

    npm install
    ```

* Arrancar el servidor
    ```
    expo start
    ```

### 🎯 Endpoints

<table style="border: 1px white solid">
	<tbody>
		<tr>
			<td style="border: 1px gray solid">METHOD</td>
			<td style="border: 1px gray solid">URL</td>
			<td style="border: 1px gray solid">DESCRIPCIÓN</td>
		</tr>
		<tr>
			<td style="border: 1px gray solid">GET</td>
			<td style="border: 1px gray solid">books/</td>
			<td style="border: 1px gray solid">Obtener todos los libros</td>
		</tr>
		<tr>
			<td style="border: 1px gray solid">GET</td>
			<td style="border: 1px gray solid">books/:idBook</td>
			<td style="border: 1px gray solid">Obtener un libro según su ID</td>
		</tr>
		<tr>
			<td style="border: 1px gray solid">POST</td>
			<td style="border: 1px gray solid">books/addBook</td>
			<td style="border: 1px gray solid">Añadir un libro</td>
		</tr>
		<tr>
			<td style="border: 1px gray solid">PUT</td>
			<td style="border: 1px gray solid">books/edit/:idBook</td>
			<td style="border: 1px gray solid">Editar un libro existente</td>
		</tr>
    <tr>
			<td style="border: 1px gray solid">DELETE</td>
			<td style="border: 1px gray solid">books/:idBook</td>
			<td style="border: 1px gray solid">Borrar un libro</td>
		</tr>
	</tbody>
</table>

#### GET books/
```json
[
  {
    "id": "p5UQvaTsksyjdNA8rMiL",
    "title": "El pozo de la ascensión",
    "author": "Brandon Sanderson",
    "yearRelease": "2007",
    "editorial": "Nova",
    "resume": "Durante mil años nada ha cambiado: han caído las cenizas...",
    "cover": "pNkEgHrMzYqUfWv.webp",
    "createdAt": {
      "_seconds": 1705014000,
      "_nanoseconds": 429000000
    },
    "modifiedAt": {
      "_seconds": 1705014000,
      "_nanoseconds": 710000000
    }
  },
  {
    "id": "wYETLakGFpugtRcYEaiM",
    "title": "El señor de los anillos: La comunidad del anillo",
    "author": "J. R. R. Tolkien",
    "yearRelease": "2001",
    "editorial": "Minotauro",
    "resume": "En la adormecida e idílica Comarca, un joven hobbit...",
    "cover": "lTjMvRzNkQwXsH.webp",
    "createdAt": {
      "_seconds": 1705014000,
      "_nanoseconds": 335000000
    },
    "modifiedAt": {
      "_seconds": 1705014000,
      "_nanoseconds": 490000000
    }
  }
]
```

#### GET books/:idBook
```json
{
  "editorial": "Plaza y Jane Editores",
  "resume": "Un cometa del color de la sangre hiende el cielo cargado...",
  "cover": "NVedyWWRAKXcOrN.webp",
  "yearRelease": "2003",
  "author": "George R. R. Martin",
  "createdAt": {
    "_seconds": 1705421219,
    "_nanoseconds": 589000000
  },
  "title": "Choque de reyes"
}
```

#### POST books/addBook
```json
"body": {
	"mode": "formdata",
	"formdata": [
		{
			"key": "title",
			"value": "Los pilares de la tierra",
			"type": "text"
		},
		{
			"key": "author",
			"value": "Ken Follett",
			"type": "text"
		},
		{
			"key": "yearRelease",
			"value": "1989",
			"type": "text"
		},
		{
			"key": "resume",
			"value": "El gran maestro de la narrativa de acción...",
			"type": "text"
		},
		{
			"key": "editorial",
			"value": "Plaza y Janes Editores",
			"type": "text"
		},
		{
			"key": "cover",
			"type": "file",
			"src": "/C:/Users/User/Images/9788401328510.webp"
		}
	]
}
```

#### PUT books/edit/:idBook
```json
"request": {
	"method": "PUT",
	"header": [],
	"body": {
		"mode": "formdata",
		"formdata": [
			{
				"key": "cover",
				"type": "file",
				"src": "/C:/Users/nanaa/Downloads/9788401032431.webp",
				"disabled": true
			},
			{
				"key": "title",
				"value": "bbbbbb",
				"type": "text"
			}
		]
  }
}
```
</br>


# 💻 Tecnologías utilizadas
![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Git](https://img.shields.io/badge/Git-F05032.svg?style=for-the-badge&logo=Git&logoColor=white)

<a href="#menu">Volver arriba</a>