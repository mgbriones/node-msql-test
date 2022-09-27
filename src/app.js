import express from "express";
import { pool } from "./db.js";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";


const app = express();

// Primero se reciben los datos, se pasan a JSON y 
// luego se los paso a las rutas
app.use(express.json())


// Para utilizar las rutas desde ROUTES se tiene que pedir.
app.use(indexRoutes);
app.use('/api', employeesRoutes); //el primer elemento representa la ruta que se quiere seguir


// En caso que el usuario pida una ruta que no existe
// se le envia el siguiente mensaje
app.use( (req, res, next) => {
    res.status(404).json({
        message: 'Endpoint no encontrado'
    })
})

export default app