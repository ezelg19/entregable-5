const express = require('express')
const { Router } = express
const router = Router()

class Producto {
    constructor() {
        this.productos = []
    }

    save(obj) {
        const contenidoArchivo = this.getAll()
        if (contenidoArchivo.length !== 0) {

            contenidoArchivo.push({ ...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1 })
            console.log('Objeto guardado en la Base de Datos!')
        } else {
            contenidoArchivo.push({ ...obj, id: 1 })
            console.log('Objeto guardado en la Base de Datos!')
        }
    }
    actualizar(obj){
        const contenidoArchivo = this.getAll()
        const a = contenidoArchivo.filter(item => item.id === obj.id)
        contenidoArchivo[contenidoArchivo.indexOf(a[0])] = obj
    }
    getById(id) {
        const contenidoArchivo = this.getAll()
        const producto = contenidoArchivo.filter(item => item.id === id)
        return producto
    }

    getAll() {
        try {
            return this.productos
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    deleteById(id) {
        let contenidoArchivo = this.getAll()
        const a = contenidoArchivo.filter(item => item.id !== id)
        this.productos = a
    }

    deleteAll() {
        this.productos = []
    }
}
const productos = new Producto()

router.get('/', (req, res) => {
    res.render('list', {
        productsExist: productos.getAll().length,
        products: productos.getAll()
    })
})

router.post("/", (req, res) => {
    try {
        const title = req.body.title; const price = req.body.price; const thumbnail = req.body.thumbnail
        productos.save({ title: title, price: price, thumbnail: thumbnail })
        res.status(201).redirect('./')
    }
    catch (error) { res.status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    res.render('producto', {
        productsExist: productos.getById(parseInt(id)),
        products: productos.getById(parseInt(id))
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params
    const guardado = {title:req.body.title, price:req.body.price, thumbnail:req.body.thumbnail, id:parseInt(id)}
    productos.actualizar(guardado)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    productos.deleteById(parseInt(id))
})

module.exports = router;