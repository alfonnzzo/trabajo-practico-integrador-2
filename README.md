# API REST de gestión de contenidos

API en Node.js y Express sobre MongoDB para administrar **usuarios, artículos, comentarios y etiquetas**, con autenticación por JWT en cookie `httpOnly` y permisos por rol.

**Stack:** Node.js · Express · MongoDB · Mongoose · JSON Web Tokens · bcrypt

## Qué resuelve

- **20 endpoints REST** repartidos entre usuarios, artículos, comentarios y etiquetas.
- **Autenticación con JWT** guardado en una cookie `httpOnly`, `secure` en producción y `sameSite: strict`, para que el token no sea legible desde JavaScript ni viaje en peticiones de otros sitios.
- **Contraseñas hasheadas con bcrypt.** El rol se asigna del lado del servidor, nunca desde el body de la petición.
- **Permisos por rol:** cada usuario edita solamente sus propios recursos; el administrador accede a todo.
- Respuestas de login idénticas para usuario inexistente y contraseña incorrecta, para no filtrar qué usuarios existen.

## Estructura

```
src/
├── config/       conexión a MongoDB
├── controllers/  auth · user · article · comments · tag
├── helpers/      bcrypt y firma de JWT
├── middlewares/  autenticación y validación de entrada
├── models/       esquemas de Mongoose
└── routes/       routers montados bajo /api
app.js            servidor y middlewares globales
```

## Cómo correrlo

```bash
npm install
cp .env.example .env    # completar la URI de MongoDB, el secreto del JWT y el puerto
node app.js
```

La API queda escuchando en el puerto definido en el `.env`, con todas las rutas bajo `/api`.
