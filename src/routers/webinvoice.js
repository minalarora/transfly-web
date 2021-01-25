const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const AreaManager = require('../models/areamanager')
const Booking = require('../models/booking')
const Fieldstaff = require('../models/fieldstaff')
const Finance = require('../models/finance')
const Invoice = require('../models/invoice')
const Mine = require('../models/mine')
const Ticket = require('../models/ticket')
const Transporter = require('../models/transporter')
const Vehicle = require('../models/vehicle')
const VehicleOwner = require("../models/vehicleowner")
const firebase  = require('../values')

const jwt = require('jsonwebtoken')
const auth = require("../auth/auth")
var cookieParser = require('cookie-parser')
const vehicle = require('../models/vehicle')

router.use(cookieParser())

router.get('/webspecificinvoice/:id', async (req, res) => {
    try {

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {
            const id = req.params.id
            const invoice = await Invoice.findOne({ id })
            if (invoice != null) {
                let data = {
                    invoice: {}
                }


                let t = invoice.toObject()

                const mine = await Mine.findOne({ id: invoice.mineid })
                const vehicleowner = await VehicleOwner.findOne({ id: invoice.owner })
                t.mine = mine.name
                t.vehicleowner = vehicleowner.name
                t.city = mine.area
                data.invoice = { ...t }

                return res.render('invoice', { data })

            } else {

                return res.redirect("/webinvoiceall")
            }
        } else {

            return res.redirect("/")
        }
    } catch (e) {

        return res.redirect("/")
    }
})

router.get('/webinvoiceall', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        if (admin) {


            let page = null
            if (req.query.page) {
                page = parseInt(req.query.page)
            }
            else {
                page = 1
            }


            if (page < 1) {
                page = 1;
            }
            let invoice = await Invoice.find({}, null, { skip: (page * 150 - 150), limit: 150 }).exec()

            let data = {

            }
            if (req.query.from && req.query.to) {
                console.log("from", req.query.from)
                console.log("to", req.query.to)
                invoice = await Invoice.find({}).exec()
                const from = new Date(req.query.from)
                const to = new Date(req.query.to)
                let filterInvoices = invoice.filter((invoice) => {
                    let invoiceDate = new Date(invoice.createdAt)
                    return (invoiceDate >= from && invoiceDate <= to)
                })
                data.invoice = filterInvoices

            }
            else {
                data.invoice = invoice

            }
            data.prev = page - 1
            data.next = page + 1
            data.page = page

            //  when invocies finished or no invoices exist
            if (invoice.length == 0) {
                if (page == 1) { // this runs when no invoice exist so just rendering page with empty data
                    return res.render("invoicelist", { data })
                } else {

                    res.redirect('/webinvoiceall?page=' + (page - 1))
                }
            }


            return res.render('invoicelist', { data })

        } else {
            return res.redirect("/")
        }
        // if (admin) {
        //     const invoice = await Invoice.find({})
        //     let data = {
        //         invoice: []
        //     }

        //     for (var i = 0; i < invoice.length; i++) {


        //         let t = invoice[i].toObject()

        //         const mine = await Mine.findOne({ id: invoice[i].mineid })
        //         const vehicleowner = await VehicleOwner.findOne({ mobile: invoice[i].vehicleownermobile })
        //         t.mine = mine.name
        //         t.vehicleowner = vehicleowner.name
        //         t.city = mine.area
        //         data.invoice.push(t)

        //     }

        //     console.log(data)
        //     return res.render('invoicelist', { data })
        // }
        // else {
        //     console.log('admin not found in all invoice')
        // }
    } catch (e) {

        return res.redirect("/")
    }
})

router.get('/mobinvoicevehicleowner', async (req, res) => {
    try {

        let invoice = await Invoice.find({ vehicleownermobile: req.query.mobile }).exec()

        let data = {
            invoice: []
        }
        if (req.query.from && req.query.to) {


            const from = new Date(parseInt(req.query.from))
            const to = new Date(parseInt(req.query.to))
            console.log(from)
            console.log(to)
            let filterInvoices = invoice.filter((invoice) => {
                let invoiceDate = new Date(invoice.createdAt)
                return (invoiceDate >= from && invoiceDate <= to)
            })
            data.invoice = filterInvoices

        }
        else {
            data.invoice = []

        }

        return res.render('webview_vehicleowner_invoice', { data })

    }
    catch (e) {
        let data = {
            invoice: []
        }
        data.invoice = []
        return res.render('webview_vehicleowner_invoice', { data })

    }
})

router.get('/mobinvoiceareamanager', async (req, res) => {
    try {

        let user = await AreaManager.findOne({ mobile: req.query.mobile })
        if (user && user.status == 2) {
            await user.populate(
                {
                    path: 'mines'
                    ,
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                }).execPopulate()

            let minearray = user.mines.map((mine) => {
                return mine.id
            })
            //mongoose.find({title: {$in: sd}})

            if (req.query.from && req.query.to) {
                await Invoice.find({ mineid: { $in: minearray } }).sort({ createdAt: -1 }).exec(function (err, invoices) {
                    const from = new Date(parseInt(req.query.from))
                    const to = new Date(parseInt(req.query.to))
                    let filterInvoices = invoices.filter((invoice) => {
                        let invoiceDate = new Date(invoice.createdAt)
                        return (invoiceDate >= from && invoiceDate <= to)
                    })
                    let data = {
                        invoice: []
                    }
                    data.invoice = filterInvoices
                    return res.render('webview_others_invoice', { data })
                })
            }

            else {
                let data = {
                    invoice: []
                }
                data.invoice = []
                return res.render('webview_others_invoice', { data })
            }
        }
        else {
            let data = {
                invoice: []
            }
            data.invoice = []
            return res.render('webview_others_invoice', { data })
        }
    }
    catch (e) {
        let data = {
            invoice: []
        }
        data.invoice = []
        return res.render('webview_others_invoice', { data })
    }

})

router.get('/mobinvoicefieldstaff', async (req, res) => {
    try {

        let user = await Fieldstaff.findOne({ mobile: req.query.mobile })
        if (user && user.status == 2) {
            await user.populate(
                {
                    path: 'mines'
                    ,
                    options: {
                        sort: {
                            createdAt: -1
                        }
                    }
                }).execPopulate()

            let minearray = user.mines.map((mine) => {
                return mine.id
            })
            //mongoose.find({title: {$in: sd}})

            if (req.query.from && req.query.to) {
                await Invoice.find({ mineid: { $in: minearray } }).sort({ createdAt: -1 }).exec(function (err, invoices) {
                    const from = new Date(parseInt(req.query.from))
                    const to = new Date(parseInt(req.query.to))
                    let filterInvoices = invoices.filter((invoice) => {
                        let invoiceDate = new Date(invoice.createdAt)
                        return (invoiceDate >= from && invoiceDate <= to)
                    })
                    let data = {
                        invoice: []
                    }
                    data.invoice = filterInvoices
                    return res.render('webview_others_invoice', { data })
                })
            }

            else {
                let data = {
                    invoice: []
                }
                data.invoice = []
                return res.render('webview_others_invoice', { data })
            }
        }
        else {
            let data = {
                invoice: []
            }
            data.invoice = []
            return res.render('webview_others_invoice', { data })
        }
    }
    catch (e) {
        let data = {
            invoice: []
        }
        data.invoice = []
        return res.render('webview_others_invoice', { data })
    }

})


router.get('/mobinvoicetransporter', async (req, res) => {
    try {
        let user = await Transporter.findOne({ mobile: req.query.mobile })
        if (user && user.status == 2) {
            let invoice = await Invoice.find({ transporter: user.id }).exec()

            let data = {
                invoice: []
            }
            if (req.query.from && req.query.to) {


                const from = new Date(parseInt(req.query.from))
                const to = new Date(parseInt(req.query.to))
                let filterInvoices = invoice.filter((invoice) => {
                    let invoiceDate = new Date(invoice.createdAt)
                    return (invoiceDate >= from && invoiceDate <= to)
                })
                data.invoice = filterInvoices

            }
            else {
                data.invoice = []

            }

            return res.render('webview_others_invoice', { data })
        }
        else {
            let data = {
                invoice: []
            }
            data.invoice = []
            return res.render('webview_others_invoice', { data })
        }
    }
    catch (e) {
        let data = {
            invoice: []
        }
        data.invoice = []
        return res.render('webview_others_invoice', { data })
    }
})




router.get('/webfinanceinvoice', async (req, res) => {
    try {
        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        let user_type = "";
        if (admin) {
            user_type = "admin"
        }
        else {
            user_type = "finance"
        }
       
        if (finance || admin) {
            let status = req.query.status;
           
            if (status) {
               
                let page = null
                if (req.query.page) {
                    page = parseInt(req.query.page)
                  
                }
                else {
                    page = 1
                }


                if (page < 1) {
                    page = 1;
                }
                let invoice = await Invoice.find({ status: req.query.status }, null, { skip: (page * 150 - 150), limit: 150 }).exec()

                let data = {
                    user_type,
                    invoice: []
                }
                if (req.query.from && req.query.to) {
                  
                    invoice = await Invoice.find({ status: req.query.status }).exec()
                    const from = new Date(req.query.from)
                    const to = new Date(req.query.to)
                    let filterInvoices = invoice.filter((invoice) => {
                        let invoiceDate = new Date(invoice.createdAt)
                        return (invoiceDate >= from && invoiceDate <= to)
                    })
                    invoice = filterInvoices

                }
                else {
                    invoice = invoice

                }

                data.prev = page - 1
                data.next = page + 1
                data.page = page


                //when invocies finished or no invoices exist
                if (invoice.length == 0) {
                    if (page == 1 && status == "PENDING") { // this runs when no invoice exist so just rendering page with empty data
                        return res.render("finance_pending_invoices", { data })
                    } else if (page == 1 && status == "COMPLETED") {
                        return res.render("finance_invoice_list", { data })
                    } else {

                        res.redirect('/webfinanceinvoice?status=' + status + '&page=' + (page - 1))
                    }
                }
                for (var i = 0; i < invoice.length; i++) {

                    let t = invoice[i].toObject()

                    const mine = await Mine.findOne({ id: invoice[i].mineid })
                    const vehicleowner = await VehicleOwner.findOne({ id: invoice[i].owner })
                    t.mine = mine.name
                    t.vehicleowner = vehicleowner.name
                    t.city = mine.area
                    data.invoice.push(t)

                }

                data.prev = page - 1
                data.next = page + 1
                data.page = page
                if (status == "PENDING") {

                    return res.render('finance_pending_invoices', { data })
                } else {

                    return res.render('finance_invoice_list', { data })
                }

            } else {

                console.log("5")
                return res.redirect("/webfinance")
            }
        } else {
            return res.redirect('/')
        }
    } catch (e) {

        console.log("error", e.message)
        return res.redirect('/')
    }
})

router.get('/webupdatependinginvoice/:id', async (req, res) => {
    try {

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        let user_type = "";
        if (admin) {
            user_type = "admin"
        }
        else {
            user_type = "finance"
        }
        if (finance || admin) {
            const id = req.params.id
            const invoice = await Invoice.findOne({ id })
            if (invoice != null) {
                let data = {
                    user_type,
                    invoice: {}
                }


                let t = invoice.toObject()

                const mine = await Mine.findOne({ id: invoice.mineid })
                const vehicleowner = await VehicleOwner.findOne({ id: invoice.owner })
                t.mine = mine.name
                t.vehicleowner = vehicleowner.name
                t.city = mine.area
                data.invoice = { ...t }
                return res.render('update_pending_invoice', { data })

            } else {

                return res.redirect('/')
            }
        }
    } catch (e) {

        return res.redirect('/')
    }
})

router.post('/webupdatependinginvoice/:id', async (req, res) => {
    try {

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        let user_type = "";
        if (admin) {
            user_type = "admin"
        }
        else {
            user_type = "finance"
        }
        if (finance || admin) {

            const id = req.params.id
            const invoice = await Invoice.findOne({ id })
            if (invoice != null) {
                const updates = Object.keys(req.body)

                const allowedUpdates = ['id', 'vehicleno', 'tonnage', 'rate', 'amount', 'hsd', 'cash', 'tds',
                    'officecharge', 'shortage', 'balanceamount', 'challantotransporter', 'balanceamountcleared', 'status' ,'modeofpayment','transportername', 
                ]
                const isValidOperation = updates.every((update) => {
                    return allowedUpdates.includes(update)
                })
                if (!isValidOperation) {

                } else {


                    updates.forEach((update) => {


                        invoice[update] = req.body[update]


                    })

                    if(invoice["challantotransporter"]!="NA")
                    {
                        invoice["status"] = "COMPLETED"
                    }
                  
                    await invoice.save()

                    let user = await VehicleOwner.findOne({id:invoice.owner})
                    user.firebase.forEach((token)=>{
                        try
                        {
                            firebase.sendFirebaseMessage(token,"TRANSFLY","Your Challan for booking from  " + invoice.minename + " to " + invoice.loading + " has been completed.")
                   
                        }
                        catch(e)
                        {
            
                        }
                     })

                    return res.redirect('/webfinanceinvoice?status=PENDING&page=1')

                }

            } else {

                return res.redirect('/')
            }
        }
    } catch (e) {

        return res.redirect('/')
    }
})

router.get('/webcompletedinvoice/:id', async (req, res) => {
    try {

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        let user_type = "";
        if (admin) {
            user_type = "admin"
        }
        else {
            user_type = "finance"
        }
        if (finance || admin) {
            const id = req.params.id
            const invoice = await Invoice.findOne({ id })
            if (invoice != null) {
                let data = {
                    user_type,
                    invoice: {}
                }


                let t = invoice.toObject()

                const mine = await Mine.findOne({ id: invoice.mineid })
                const vehicleowner = await VehicleOwner.findOne({ id: invoice.owner })

                t.mine = mine.name
                t.vehicleowner = vehicleowner.name
                t.city = mine.area
                data.invoice = { ...t }
                return res.render('finance_completed_invoice', { data })

            } else {

                return res.redirect('/')
            }
        }
    } catch (e) {

        return res.redirect('/')

    }
})


router.get('/webupdatecompletedinvoice/:id', async (req, res) => {
    try {

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        let user_type = "";
        if (admin) {
            user_type = "admin"
        }
        else {
            user_type = "finance"
        }
        if (finance || admin) {
            const id = req.params.id
            const invoice = await Invoice.findOne({ id })
            if (invoice != null) {
                let data = {
                    user_type,
                    invoice: {}
                }


                let t = invoice.toObject()

                const mine = await Mine.findOne({ id: invoice.mineid })
                const vehicleowner = await VehicleOwner.findOne({ id: invoice.owner })
                console.log(vehicleowner)
                t.mine = mine.name
                t.vehicleowner = vehicleowner.name
                t.city = mine.area
                data.invoice = { ...t }
                return res.render('finance_update_completed_invoice', { data })

            } else {

                return res.redirect('/')
            }
        }
    } catch (e) {

        return res.redirect('/')
    }
})

router.post('/webupdatecompletedinvoice/:id', async (req, res) => {
    try {

        const token = req.cookies['Authorization']
        const decoded = jwt.verify(token, 'transfly')
        const finance = await Finance.findOne({ id: decoded._id, "tokens.token": token })
        const admin = await Admin.findOne({ id: decoded._id, "tokens.token": token })
        let user_type = "";
        if (admin) {
            user_type = "admin"
        }
        else {
            user_type = "finance"
        }
        if (finance || admin) {

            const id = req.params.id
            const invoice = await Invoice.findOne({ id })
            if (invoice != null) {
                const updates = Object.keys(req.body)

                const allowedUpdates = ['id', 'vehicleno', 'tonnage', 'rate', 'amount', 'hsd', 'cash', 'tds',
                    'officecharge', 'shortage', 'balanceamount', 'challantotransporter', 'balanceamountcleared', 'status'
                ]
                const isValidOperation = updates.every((update) => {
                    return allowedUpdates.includes(update)
                })
                if (!isValidOperation) {

                } else {


                    updates.forEach((update) => {


                        invoice[update] = req.body[update]


                    })

                    await invoice.save()

                    return res.redirect('/webcompletedinvoice/' + id)

                }

            } else {
                return res.redirect('/');
            }
        }
    } catch (e) {

        return res.redirect('/')
    }
})


module.exports = router