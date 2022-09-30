const express = require('express')
const router = require('./router.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('views','./views');
app.set('view engine', 'pug');

app.get('/',(req,res)=>{
    res.render('index.pug')
})

app.use('/productos', router)


const PORT = 4000
app.listen(PORT,()=>console.log(`server en el puerto ${PORT}`))