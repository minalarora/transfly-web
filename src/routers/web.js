const express = require('express')
const router  = new express.Router()
const Admin = require('../models/admin')
const AreaManager = require('../models/areamanager')
const Booking = require('../models/booking')
const Fieldstaff = require('../models/fieldstaff')
const Finance = require('../models/finance')
const Invoice  = require('../models/invoice')
const Mine =  require('../models/mine')
const Ticket =  require('../models/ticket')
const Transporter = require('../models/transporter')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require("../models/vehicleowner")

const jwt= require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
 
router.use(cookieParser())


router.get('/',async (req,res)=>{
    let data ={}
    return res.render('login',data)
})

router.post('/',async (req,res)=>{
    try
    {
        const admin  = await Admin.findByMobile(req.body.mobile,req.body.password)
        if(admin == null)
        {
          console.log('admin not found')  
        }
        else
        {
            let token = await admin.generateToken()
            return res.status(200).cookie('Authorization',token).redirect('/webadmin')
        }
    }
    catch(e)
    {
        //error
        console.log(e)
    }
})


router.get('/webadmin', async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            var data = {
                admin : admin.getPublicProfile()
            }
            console.log(data)
           return res.render("app_admin_profile",{data})
        }
        else
        {
            console.log('admin not found')
        }  

    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webadminedit',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            var data = {
                admin : admin.getPublicProfile()
            }
           return res.render("app_admin_profile_update",{data})
        }
        else
        {
            console.log('admin not found')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


router.post('/webadminedit',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const updates = Object.keys(req.body)
            const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
            'accountno','ifsc','bankname','city','pan','aadhaar','ename','erelation','emobile']
            const isValidOperation = updates.every((update)=>{
                                       return allowedUpdates.includes(update)
                                                            })
        if(!isValidOperation)
        {
            console.log('invalid operation')
        }
        else
        {
            updates.forEach((update)=>{
                admin[update] = req.body[update] 
             })

             await admin.save()
             return res.redirect('/webadmin')
        }
            
           
        }
        else
        {
            console.log('admin not found')
        }
       
    }
    catch(e)
    {
        console.log(e)
    }
})


router.get('/webmine',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mines= await Mine.find({})  
        
            let data ={
                mine: mines,
                cities: [ 'Bhopal','Funcity']
            }
           return res.render('mines_list',{data})
            
        }
        else
        {
            console.log('admin not found in web mine')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})


router.get('/webspecificmine/:id',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const id = req.params.id
            const mine = await Mine.findOne({id})
            if(mine!=null)
            {
                await mine.populate('invoices').execPopulate()
                let data = {
                    mine: mine,
                    invoices: mine.invoices
                }
              return  res.render('mine',{data})
                 
            }
            else
            {
               console.log('mine not found')
            }
        }
        else
        {
            console.log('admin not found in single mine')
        }
                 
    }
    catch(e)
    {
        console.log(e)
    }
})

router.post('/webspecificmine/:id',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const updates = Object.keys(req.body)
            const allowedUpdates =  ['id','name','area','trailer','active','tyres','bodytype','loading','rate','etl','latitude',
            'longitude','landmark']
            const isValidOperation = updates.every((update)=>{
                                       return allowedUpdates.includes(update)
                                                            })
        if(!isValidOperation)
        {
            console.log('invalid operation')
        }
        else
        {
            const id = req.params.id
            const mine = await Mine.findOne({id})
            if(mine)
            {
                updates.forEach((update)=>{
                    if(update == "active")
                    {
                       mine[update] = Boolean(req.body[update])
                    }
                    else
                    {
                    mine[update] = req.body[update] 
                    }
                    
                })
                await mine.save() 
                return res.redirect('/webspecificmine/'+ id)
            }
            else
            {
                console.log('mine not found')
            }
        }
        }
        else
        {
            console.log(e)
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webfinanceall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const finance= await Finance.find({})  
            let data ={
                finance: finance
            }
           return res.render('finance_official_list',{data})
        }
        else
        {
            console.log('admin not found in all finance')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecificfinance/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const finance = await Finance.findOne({mobile})
             if(finance!=null)
            {
                let data = {
                    finance: finance
                }
                return res.render('finance_official_profile',{data})
                  
            }
            else
            {
                console.log('finance member not found')
            }    
        }
        else
        {
            console.log('admin not found in single finance')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webtransporterall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const transporter= await Transporter.find({})  
        
            let data ={
                transporter: []
            }
            for(var i = 0;i<transporter.length;i++)
            {
                await transporter[i].populate('mines').execPopulate()
                let t =  transporter[i].toObject()
                t.mine = transporter[i].mines
                data.transporter.push(t)
              
            }

           

            console.log(data.transporter[0].mine)

            
            
           
           return res.render('transporter_list',{data})
        }
        else
        {
            console.log('admin not found in all transporter')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecifictransporter/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const transporter = await Transporter.findOne({mobile})
             if(transporter!=null)
            {
                let data = {
                    transporter: transporter
                }
                return res.render('transporter_profile',{data})
                  
            }
            else
            {
                console.log('transporter member not found')
            }    
        }
        else
        {
            console.log('admin not found in single transporter')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webareamanagerall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const areamanager= await AreaManager.find({})  
        
            let data ={
                areamanager: []
            }
            for(var i = 0;i<areamanager.length;i++)
            {
                await areamanager[i].populate('mines').execPopulate()
                let t =  areamanager[i].toObject()
                t.mine = areamanager[i].mines
                data.areamanager.push(t)
              
            }

           

            console.log(data.areamanager[0].mine)

            
            
           
           return res.render('area_manager_list',{data})
        }
        else
        {
            console.log('admin not found in all area manager')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecificareamanager/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const areamanager = await AreaManager.findOne({mobile})
             if(areamanager!=null)
            {
                await areamanager.populate('mines').execPopulate()
                let t =areamanager.toObject()
                t.mines = areamanager.mines


                let data = {
                    areamanager: t
                }
                console.log(data)
            return res.render('area_manager_profile',{data})
                  
            }
            else
            {
                console.log('areamanager member not found')
            }    
        }
        else
        {
            console.log('admin not found in single areamanager')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webfieldstaffall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const fieldstaff= await Fieldstaff.find({})  
            let data ={
                fieldstaff: fieldstaff
            }
            console.log(data)
           return res.render('fieldstaff_list',{data})
        }
        else
        {
            console.log('admin not found in all fieldstaff')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecificfieldstaff/:mobile',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const mobile = req.params.mobile
            const fieldstaff = await Fieldstaff.findOne({mobile})
             if(fieldstaff!=null)
            {
                let data = {
                    fieldstaff: fieldstaff
                }
                return res.render('fieldstaff_single',data)
                  
            }
            else
            {
                console.log('fieldstaff member not found')
            }    
        }
        else
        {
            console.log('admin not found in single fieldstaff')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webinvoiceall',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const invoice= await Invoice.find({})  
            let data ={
                invoice: invoice
            }
           return res.render('invoice_list',data)
        }
        else
        {
            console.log('admin not found in all invoice')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

router.get('/webspecificinvoice/:id',async (req,res)=>{
    try
    {
        const token = req.cookies['Authorization']
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        if(admin)
        {
            const id = req.params.id
            const invoice = await Invoice.findOne({id})
             if(invoice!=null)
            {
                let data = {
                    invoice: invoice
                }
                return res.render('invoice_single',data)
                  
            }
            else
            {
                console.log('invoice member not found')
            }    
        }
        else
        {
            console.log('admin not found in single invoice')
        }
    }
    catch(e)
    {
        console.log(e)
    }
})




/////////////

router.get('/',async (req,res)=>{
    console.log('login form')
   return res.render('login',{
        admin : 'sd'
    })
})


router.post('/',async (req,res)=>{
    try
    {
        console.log(req.body)
        const admin  = await Admin.findByMobile(req.body.mobile,req.body.password)
        if(admin == null)
        {
            console.log('null')
           
            return res.status(400).redirect('/?error=invalid')
        }
        let token  = await admin.generateToken()
        console.log("earlier",token)
        token  = "admin:" + token
       
       
        return res.status(200).cookie('Authorization',token).redirect('/webadmin')
        

    }
    catch(e)
    {

    }
})


router.get('/webadmin',async (req,res)=>{
    console.log("runner")
    const data=req.cookies['Authorization']
     const usertype = data.split(':')[0]
     const token  = data.split(':')[1]
     console.log("later",token)
   
   // return res.status(200).cookie('Authorization',req.token).render("app_admin_profile",admin.getPublicProfile())

})



router.get('/admin/edit',async (req,res)=>{
    try
    {
        console.log(req.cookies)
        try
        {
            const data=req.cookies['Authorization']
            const usertype = data.split(':')[0]
            const token  = data.split(':')[1]
            const decoded=jwt.verify(token,'transfly')
            const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
            //res.user = admin
            res.render('app_admin_profile_update',admin)
            
        }
        catch(error)
        {
            res.status(400).send(error)
        }
        
       
    }
    catch(e)
    {

    }
})

router.post('/admin/edit',async (req,res)=>{
    try
    {
        const data=req.cookies['Authorization']
        const usertype = data.split(':')[0]
        const token  = data.split(':')[1]
        const decoded=jwt.verify(token,'transfly')
        const admin=await Admin.findOne({mobile:decoded._id,"tokens.token" : token})
        req.user= admin
        const updates = Object.keys(req.body)
        console.log(req.body);
        const allowedUpdates = ['firstname','lastname','mobile','email','password','status',
        'accountno','ifsc','bankname','city','pan','aadhaar','ename','erelation','emobile']
        const isValidOperation = updates.every((update)=>{
                return allowedUpdates.includes(update)
        })
        if(!isValidOperation)
        {
            return res.status(400).send("Invalid")
        }
            
            updates.forEach((update)=>{
                req.user[update] = req.body[update] 
             })

             await req.user.save()
           return  res.status(200).send(req.user.getPublicProfile()) 
        //res.user = admin
       // res.render('app_admin_profile_update',admin)
        
    }
    catch(error)
    {
        res.status(400).send(error)
    }
    
})

router.post('/me',async (req,res)=>{
    try
    {
            console.log(req.body)
            const admin  = await Admin.findByMobile(req.body.mobile,req.body.password)
            if(admin == null)
            {
                console.log('null')
               
                return res.status(400).redirect('/?error=invalid')
            }
            let token  = await admin.generateToken()
            console.log(admin)
            token  = "admin:" + token
           
            return res.status(200).cookie('Authorization',token).redirect('/')
            //return res.status(200).cookie('Authorization',token).render("app_admin_profile",admin.getPublicProfile())
    }
    catch(e)
    {
        console.log(e)
        return res.status(400).redirect('/?error=invalid')
    }
}
)


module.exports = router