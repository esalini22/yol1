Desafío Técnico para yol1
Se usó como base el repositorio esalini22/movieapp, el cual está construido con React.js y Express.js
No se utilizó una base de datos relacional, ya que se consideró demasiado compleja y costosa de implementar para el caso dado. Tampoco se utilizó una base de datos no relacional (como MongoDB), ya que también se consideró costosa de implementar. Los datos estan en un archivo db.json

Written in React.js and Express.js.

React.js version: 18.2.0

Node.js version: v22.16.0

Built with Vite 4.5.3

After cloning the repository, run the command npm install inside both the backend and frontend folders.

To build the application, run the command npm run build:ui inside the backend folder

To run the application, run the command npm start inside the backend folder

You are going to need a .env file inside the backend folder with the following format:

```
PORT=<your desired port>
SECRET=secret
```