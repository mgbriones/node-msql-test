// En este archivo se encuentran las funcionalidades de cada ruta 
// (solo con respecto a los empleados), a modo que todo quede 
// mas legible

import { json } from 'express'
import {pool} from '../db.js'

export const getEmployees = async (req, res) => {
    try{
        const [rows] = await pool.query('select * from employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha salido mal'            
        })
    }

}

export const getEmployee = async (req, res) => {
    try{

        const [rows] = await pool.query('select * from employee where id= ?', [req.params.id])
        
        if (rows.length <= 0) return res.status(404).json({
            mensaje: 'Empleado no encontrado'
        })
        
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha salido mal'            
        })
    }
}

export const createEmployees = async (req, res) => {
    try{

        const {name, salary} = req.body
        //el arreglo dice que datos se estan pasando, 
        // en este caso name y salary
        const [rows] = await pool.query('insert into employee (name, salary) values (?, ?)', [name, salary]) 
        res.send({
            id: rows.insertId,
            name,
            salary,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha salido mal'            
        })
    }
}

export const deleteEmployees = async (req, res) => {
    try{

        const [result] = await pool.query('delete from employee where id = ?', [req.params.id])
    
        if (result.affectedRows <= 0 ) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
        
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha salido mal'            
        })
    }
}

export const updateEmployees = async (req, res) => {
    try{

        const {id} = req.params
        const {name, salary} = req.body
        
        // Esta seria la consulta si usaramos PUT:
        // const [result] = await pool.query('update employee set name = ?, salary = ? where id = ?', [name, salary, id])
    
        // Esta es la consulta si usaramos PATCH:
        const [result] = await pool.query('update employee set name = IFNULL(?, name), salary = IFNULL(?, salary) where id = ?', [name, salary, id])
            // Con IFNULL(?, name) podemos elegir, 
            // en caso que no tengamos un dato, lo deja tal cual estaba.
    
    
        if (result.affectedRows == 0 ) return res.status(404).json({
            message: 'Empleado no encontrado'
        })
    
        const [rows] = await pool.query('select * from employee where id = ?', [id])
    
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha salido mal'            
        })
    }
}