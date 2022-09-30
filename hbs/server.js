const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const router = require('./router.js')

app.engine('hbs',hbs.engine({
    extname:'.hbs',
    partialsDir:__dirname+'/views/partials',
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout:'layout1.hbs'
}))

app.set('views','./views')
app.set('view engine','hbs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.use('/productos', router)


const PORT = 4000
app.listen(PORT, ()=>{console.log(`escuchando ${PORT}`)})