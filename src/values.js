const mine = require("./models/mine")

let adminid = 10000
let areamanagerid = 20000
let bookingid = 30000
let fieldstaffid = 40000
let financeid = 50000
let invoiceid = 60000
let mineid = 70000
let ticketid = 80000
let transporterid = 90000


function getAdminId()
{
    adminid++
    return adminid
} 


function getAreaManagerId()
{
    areamanagerid++
    return areamanagerid
}

function getBookingId()
{
    bookingid++
    return bookingid
}


function getFieldStaffId()
{
    fieldstaffid++
    return fieldstaffid
}


function getFinanceId()
{
    financeid++
    return financeid
}

function getInvoiceId()
{
    invoiceid++
    return invoiceid
}

function getMineId()
{
    mineid++
    return mineid
}

function getTickedId()
{
    ticketid++
    return ticketid
}


function getTransporterId()
{
    transporterid++
    return transporterid
}

module.exports = {
    getAdminId,
    getAreaManagerId,
    getBookingId,
    getFieldStaffId,
    getFinanceId,
    getInvoiceId,
    getMineId,
    getTickedId,
    getTransporterId
}

{
    invoicelist: [
        {
                id:
        },
        {
            id:
        },
        {

        }
    ]
}
