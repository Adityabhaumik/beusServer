const app = require('express')
const auth = require('../middleware/sellerAuth')
const sellerProducts = require('../selleruser/sellerProducts')
const router = new app.Router()
const multer = require('multer')

router.post('/sellerProduct/upload',auth, async (req,res)=>{
    console.log('----------------------------THE SELLER-USER REGISTRATION ROUTER IS WORKING-----------------------------')
    const product = new sellerProducts ({
        ...req.body,
         owner: req.user._id      
    })
     try{
         await product.save()
         res.status(201).send(product)
     }catch(e){
 
             res.status(400).send(e)
         
     }
});

router.get('/sellerProducts/view', async (req,res) =>{
    sellerProducts.find({}).then((products) =>{
        res.send(products)
    })
})

//uploading product images

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpge|png)$/)){
            return cb(new Error('USE ONLY JPG JPGE OR PNG'))
        }
    cb(undefined,true)
    }

})

router.post('/sellerProducts/pic',auth,upload.single('pic'),async (req,res) =>{
    
    req.user.pic = req.file.buffer
    await req.user.save()
    res.status(200).send('product saved')
},(error ,req , res , next) =>{
    res.status(400).send({error})
}
)




module.exports = router