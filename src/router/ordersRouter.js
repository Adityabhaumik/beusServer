const app = require('express')
const auth = require('../middleware/consumerAuth')
const orders = require('../consumeruser/orders')
const router = new app.Router()


router.post('/orders/upload',auth, async (req,res)=>{
    console.log('----------------------------THE SELLER-USER REGISTRATION ROUTER IS WORKING-----------------------------')
    const order = new orders({
        ...req.body,
         owner: req.user._id      
    })
     try{
         await order.save()
         res.status(201).send(order)
     }catch(e){
 
             res.status(400).send(e)
         
     }
});

router.get('/order/view', async (req,res) =>{
    orders.find({}).then((orders) =>{
        res.send(orders)
    })
})



module.exports = router