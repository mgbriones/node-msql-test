import { Router } from "express";
import { createEmployees, deleteEmployees, getEmployee, getEmployees, updateEmployees } from "../controllers/employees.controller.js";

const router = Router();

// Para facilitar el manejo de las funciones de cada ruta 
// estas se separan y importan desde la carpeta controler.

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployees);


// PUT vs PATCH
// put permite hacer actualizaciones, pero hay que cambiar todos los datos
// En cambio patch permite hacer cambios parciales.

// router.put("/employees/:id", updateEmployees); // esta ruta se reemplaza por PATCH
router.patch("/employees/:id", updateEmployees);

router.delete("/employees/:id", deleteEmployees);

export default router;
