const express = require('express')
const app = express()
const sellerUser = require('./src/selleruser/sellerUser')
const sellerProduct = require('./src/selleruser/sellerProducts')
const sellerUserRouter = require('./src/router/sellerUserRouters')
const sellerProductRouter = require('./src/router/sellerproductsRouter')
const consumerUser = require('./src/consumeruser/consumerUser')
const consumerUserRouter = require('./src/router/consumerUserRouter')
const ordersRouter = require('./src/router/ordersRouter')
require('./src/db/mongoose')
const port = process.env.PORT;

app.use(express.json())
app.use(sellerUserRouter)
app.use(sellerProductRouter)
 app.use(consumerUserRouter)
 app.use(ordersRouter)

app.listen(port,()=>{
    console.log('server is up at port '+port)
})
