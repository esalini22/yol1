Desafío Técnico para yol1

Se usó como base el repositorio esalini22/movieapp, el cual está construido con React.js y Express.js.

Se utilizaron estas tecnologías ya que son sencillas de utilizar para un proyecto pequeño, y son con las que estoy más familiarizado para este tipo de proyectos.

No se utilizó una base de datos relacional, ya que se consideró demasiado compleja y costosa de implementar para el caso dado. Tampoco se utilizó una base de datos no relacional (como MongoDB), ya que también se consideró costosa de implementar. Los datos estan en un archivo db.json

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

La API no puede utilizarse desde Postman, ya que está bloqueada para utilizarse SOLO a través de navegadores.

Usuarios de prueba disponibles:

- admin@yol1.com (password: password123)

- user@yol1.com (password: password123, rut: 12345678-9)

- user2@yol1.com (password: password123, rut: 98765432-1)

Limitaciones: los datos están hardcodeados en un JSON, no hay funcionalidades para editar o ingresar datos a este. 
Por falta de tiempo, no se realizó alguna funcionalidad de testing o logging.
Por falta de tiempo, se revisa el rol al momento de consultar un Rut desde el frontend, no el backend, con su respectivo manejo de errores.