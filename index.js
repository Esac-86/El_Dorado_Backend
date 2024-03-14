const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use('/dorado', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada.' });
});


app.use(cookieParser());
app.use(session({
  secret: '123', // Cambia esto con una cadena de texto segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Configúralo como true si estás utilizando HTTPS
}));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
