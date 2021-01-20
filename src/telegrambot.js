const {Telegraf} = require('telegraf')
const LocalSession = require('telegraf-session-local')
const mine = require('./models/mine')
const TelegramUtils = require('./values')

const bot = new Telegraf('1596154496:AAF0DedWgR0WCCKRNhK-o2LWAbt6wDm3XvI')


const property = 'data'

const localSession = new LocalSession({
  // Database name/path, where sessions will be located (default: 'sessions.json')
  database: 'example_db.json',
  // Name of session property object in Telegraf Context (default: 'session')
  property: 'session',
  // Type of lowdb storage (default: 'storageFileSync')
  storage: LocalSession.storageFileAsync,
  // Format of storage/database (default: JSON.stringify / JSON.parse)
  format: {
    serialize: (obj) => JSON.stringify(obj, null, 2), // null & 2 for pretty-formatted JSON
    deserialize: (str) => JSON.parse(str),
  },
  // We will use `messages` array in our database to store user messages using exported lowdb instance from LocalSession via Telegraf Context
 
})

// Wait for database async initialization finished (storageFileAsync or your own asynchronous storage adapter)
localSession.DB.then(DB => {
  // Database now initialized, so now you can retrieve anything you want from it
 
  // console.log(DB.get('sessions').getById('1:1').value())
})

// Telegraf will use `telegraf-session-local` configured above middleware with overrided `property` name
bot.use(localSession.middleware(property))


bot.use((ctx, next) => {
    if(!ctx.data.message)
    {
        ctx.data.message = []
           
    }
    if(!ctx.data.number)
    {
        ctx.data.number = null
    }
    return next()
  })


bot.start((ctx)=>{
       
    ctx.reply("Welcome to Transfly Bot. Press any key to continue")
}
)


bot.hears("clear",(ctx)=>{
    ctx.data.message = []
    ctx.reply("DONE")
})



bot.on('text',(ctx)=>{
    if(ctx.data.message[0] == "minal")
    {
        // let usernumber  = ctx.message.text
        // if(usernumber == "8871748278")
        // {
        //     ctx.data.message.unshift("registereduser")
        //     //add ctx.chat.id to user field
        //     // ctx.chat.id
        //     // bot.telegram.sendMessage(ctx.chat.id,"yes")
        //     ctx.reply("Select the following options: \n 1. New Booking \n 2. Complaint/Enquiry ")
        // }
        // else
        // {
            
        //     ctx.reply("Mobile number not found! Please try again")
        // }
        ctx.data.message = [] 
        ctx.data.number = null

    }
    else if(ctx.data.message[1] == "invoice")
    {
        let option = ctx.message.text
        TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            if(val)
            {
                let vehiclearray = val
           for(let i = 0;i<vehiclearray.length;i++)
            {
            if(option == i)
            {
                ctx.data.message.unshift(vehiclearray[i])
            }
            }
            if(ctx.data.message[2] == "invoice")
            {
              TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                  if(val)
                  {
                    ctx.reply(val)
                    ctx.data.message = []  
                    ctx.data.number = null
                  }
                  else
                  {
                    ctx.data.message = []  
                    ctx.data.number = null
                  }
              }).catch((e)=>{
                ctx.data.message = []  
                ctx.data.number = null
              })  
             
            }
            else
             {
                ctx.data.message = []  
                ctx.data.number = null
               ctx.reply("Please select a valid option")
            }
            }
            else
            {
                ctx.data.message = []  
                ctx.data.number = null
            }
        }).catch((e)=>{
            ctx.data.message = []  
            ctx.data.number = null
        })
    }
    else if(ctx.data.message[0] == "invoice")
    {

        let option  = ctx.message.text
        if(option == "1")
        {
            TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
                if(val)
                {
                let vehiclearray = val
                let message = ""
                for(let i = 0;i<vehiclearray.length;i++)
                {
                     message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("one")
                }
                else 
                {
                    ctx.reply("Kindly registered the vehicles through Transfly app") 
                    ctx.data.message = []
                    ctx.data.number = null
                }
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                }
            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
            })
        }
        // else if(option == "2")
        // {
        //     let vehiclearray = ["MP04 5644","MP04 1234","OD12 2312"]
        //     let message = ""
        //     for(let i = 0;i<vehiclearray.length;i++)
        //     {
        //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
        //     }
        //     if(vehiclearray.length > 0)
        //     {
        //         ctx.reply(message)
        //         ctx.data.message.unshift("two")
        //     }
        //     else 
        //     {
        //         ctx.reply("Kindly registered the vehicles through Transfly app") 
        //         ctx.data.message = []
        //     }
        // }
        else if(option == "8")
        {

            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply("Select the following options: \n Press 1 for new booking \n Press 2 to know information on last challan cleared status \n" + 
            " Press 3 for On-Road Assistance \n Press  9 for go back to main menu ")
        }
        else if(option == "9")
        {

            ctx.reply("Press 1 for English")
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply("Please select a valid option")
        }
    }
    else if(ctx.data.message[1] == "ticket")
    {
        let option = ctx.message.text
        TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            if(val)
            {
                let vehiclearray = val
        for(let i = 0;i<vehiclearray.length;i++)
        {
            if(option == i)
            {
                ctx.data.message.unshift(vehiclearray[i])
            }
        }
        if(ctx.data.message[2] == "ticket")
        {
            TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[1]).then((val)=>{
                if(val)
                {
                    ctx.reply("Thank you, our emergency response team will soon get in touch with you")
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
            }).catch((e)=>{
                ctx.data.message = [] 
                ctx.data.number = null
            })
              
        }
        else
        {
            ctx.reply("Please select a valid option")
            ctx.data.message = [] 
            ctx.data.number = null
        }
            }
            else
            {
                ctx.data.message = [] 
                ctx.data.number = null
            }
        })

        
    }
    else if(ctx.data.message[0] == "ticket")
    {

        /**
         *  "Press 1 to raise a ticket for vehicle breakdown assistance" + "\n" +
                "Press 2 to raise a ticket for vehicle accident assistance" + "\n" +
                "Press 3 to raise a ticket for any other onroad assistance" + "\n" +
         * 
         */
        let option  = ctx.message.text
        if(option == "1")
        {
            TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
                if(val)
                {
                    
            let vehiclearray = val
            let message = ""
            for(let i = 0;i<vehiclearray.length;i++)
            {
                 message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            }
            if(vehiclearray.length > 0)
            {
                ctx.reply(message)
                ctx.data.message.unshift("vehicle breakdown")
            }
            else 
            {
                ctx.reply("Kindly registered the vehicles through Transfly app") 
                ctx.data.message = [] 
                ctx.data.number = null
            }
                }
                else 
                {
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
            }).catch((e)=>{
                ctx.data.message = [] 
                ctx.data.number = null
            })

        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
                if(val)
                {
                    let vehiclearray = val
                let message = ""
                for(let i = 0;i<vehiclearray.length;i++)
                {
                     message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicle accident")
                }
                else 
                {
                    ctx.reply("Kindly registered the vehicles through Transfly app") 
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                }
                else 
                {
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
            }).catch((e)=>{
                ctx.data.message = [] 
                ctx.data.number = null
            })
            
        }
        else if(option == "3")
        {
            TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
                if(val)
                {
                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                        ctx.data.message.unshift("other")
                    }
                    else 
                    {
                        ctx.reply("Kindly registered the vehicles through Transfly app") 
                        ctx.data.message = [] 
                         ctx.data.number = null
                    }
                }
                else 
                {
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
            }).catch((e)=>{
                ctx.data.message = [] 
                ctx.data.number = null
            })
           
        }
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply("Select the following options: \n Press 1 for new booking \n Press 2 to know information on last challan cleared status \n" + 
            " Press 3 for On-Road Assistance \n Press  9 for go back to main menu ")
        }
        else if(option == "9")
        {

            ctx.reply("Press 1 for English")
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply("Please select a valid option")
        }
    }
    else if(ctx.data.message[3] == "booking")
    {
        let option = ctx.message.text
        TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

            let vehiclearray = val
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == i)
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                    }
                }
        if(ctx.data.message[4] == "booking")
        {
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[1]
            let area  = ctx.data.message[2]
            let loading = ctx.data.message[3]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply("Thank you, your booking has been received")
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
            })
            
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null

        })

        

    
    }
    else if(ctx.data.message[2] == "booking")
    {
        let option = ctx.message.text

        if(ctx.data.message[0] == "Joda")
        {
            TelegramUtils.getMinesByArea("Joda").then((val)=>{
                if(val)
                {
                    let minearray = val
                    for(let i = 0; i < minearray.length ; i++)
            {
                if(option == i)
                {
                    ctx.data.message.unshift(minearray[i])
                }
            }
            if(ctx.data.message[3] == "booking")
            {
                // ctx.reply("Press 1 to enter vehicle number for which booking is required" + "\n" + 
                // "Press 2 to generate list from the Database"
                // )

                TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply("Kindly registered the vehicles through Transfly app") 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null
                })

            }
            else
            {
                ctx.reply("Please choose a valid option")
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
            })

            
        }
        else if(ctx.data.message[0] == "Barbil")
        {

            TelegramUtils.getMinesByArea("Barbil").then((val)=>{
                if(val)
                {
                    let minearray = val
                    for(let i = 0; i < minearray.length ; i++)
            {
                if(option == i)
                {
                    ctx.data.message.unshift(minearray[i])
                }
            }
            if(ctx.data.message[3] == "booking")
            {
                // ctx.reply("Press 1 to enter vehicle number for which booking is required" + "\n" + 
                // "Press 2 to generate list from the Database"
                // )

                TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply("Kindly registered the vehicles through Transfly app") 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null

                })

            }
            else
            {
                ctx.reply("Please choose a valid option")
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
            })

        }
        else if(ctx.data.message[0] == "Rugudi")
        {

            TelegramUtils.getMinesByArea("Rugudi").then((val)=>{
                if(val)
                {
                    let minearray = val
                    for(let i = 0; i < minearray.length ; i++)
            {
                if(option == i)
                {
                    ctx.data.message.unshift(minearray[i])
                }
            }
            if(ctx.data.message[3] == "booking")
            {
                // ctx.reply("Press 1 to enter vehicle number for which booking is required" + "\n" + 
                // "Press 2 to generate list from the Database"
                // )

                TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply("Kindly registered the vehicles through Transfly app") 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null

                })

            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply("Please choose a valid option")
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
            })

        }
        else if(ctx.data.message[0] == "Koida")
        {
            TelegramUtils.getMinesByArea("Koida").then((val)=>{
                if(val)
                {
                    let minearray = val
                    for(let i = 0; i < minearray.length ; i++)
            {
                if(option == i)
                {
                    ctx.data.message.unshift(minearray[i])
                }
            }
            if(ctx.data.message[3] == "booking")
            {
                // ctx.reply("Press 1 to enter vehicle number for which booking is required" + "\n" + 
                // "Press 2 to generate list from the Database"
                // )

                TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                    }
                    else 
                    {
                        ctx.reply("Kindly registered the vehicles through Transfly app") 
                        ctx.data.message = []
                        ctx.data.number = null
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null

                })

            }
            else
            {
                ctx.reply("Please choose a valid option")
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
            })

        }
        else if(ctx.data.message[0] == "Jamda")
        {
        TelegramUtils.getMinesByArea("Jamda").then((val)=>{
            if(val)
            {
                let minearray = val
                for(let i = 0; i < minearray.length ; i++)
        {
            if(option == i)
            {
                ctx.data.message.unshift(minearray[i])
            }
        }
        if(ctx.data.message[3] == "booking")
        {
            // ctx.reply("Press 1 to enter vehicle number for which booking is required" + "\n" + 
            // "Press 2 to generate list from the Database"
            // )

            TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = ""
                for(let i = 0;i<vehiclearray.length;i++)
                {
                     message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                }
                else 
                {
                    ctx.reply("Kindly registered the vehicles through Transfly app")
                    ctx.data.message = []
                    ctx.data.number = null 
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null

            })

        }
        else
        {
            ctx.reply("Please choose a valid option")
            ctx.data.message = []
            ctx.data.number = null
        }

    }
    else
    {
        ctx.data.message = []
        ctx.data.number = null
    }
        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
        })

           
        
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            //
        }
    }
    else if(ctx.data.message[1] == "booking")
    {

        let area  = ctx.message.text
        let nameArray = ["1","2","3","4","5","6","7"]
        if(area == "1")
        {
           //joda
           TelegramUtils.getMinesByArea("Joda").then((val)=>{

            if(val)
            {
                // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                let minearray = val
                let message = ""
                for(let i = 0;i<minearray.length;i++)
                {
                     message = message + "Press " + i + " to book your loading from " + minearray[i] + "\n"
                }
                ctx.data.message.unshift("Joda")
                ctx.reply(message)
     
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                    //please try again
            }

           }).catch((val)=>{

            ctx.data.message = []
            ctx.data.number = null
           })

          
        }
        else if(area == "2")
        {
            TelegramUtils.getMinesByArea("Barbil").then((val)=>{

                if(val)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + minearray[i] + "\n"
                    }
                    ctx.data.message.unshift("Barbil")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
               })
    
        }
        else if(area == "3")
        {
            //rugudi
            TelegramUtils.getMinesByArea("Rugudi").then((val)=>{

                if(val)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + minearray[i] + "\n"
                    }
                    ctx.data.message.unshift("Rugudi")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
               })
    
        }
        else if(area == "4")
        {
            //koida
            TelegramUtils.getMinesByArea("Koida").then((val)=>{

                if(val)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + minearray[i] + "\n"
                    }
                    ctx.data.message.unshift("Koida")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
               })
    
        }
        else if(area == "5")
        {
            //jamda
            TelegramUtils.getMinesByArea("Jamda").then((val)=>{

                if(val)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + minearray[i] + "\n"
                    }
                    ctx.data.message.unshift("Jamda")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
               })
    
        }
        else 
        {
            //please try again
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply("Please select a valid option")
        }
    }
    else if(ctx.data.message[0] == "booking")
    {
        let option  = ctx.message.text
        let message  = 
        "Press 1 to load from Joda" + "\n" +
        "Press 2 to load from Barbil" + "\n" +
        "Press 3 to load from Rugudi" + "\n" +
        "Press 4 to load from Koida" + "\n" +
        "Press 5 to load from Jamda" + "\n" +
        "Press 8 to go to Previous Menu" + "\n" +
        "Press 9 to go to Main Menu" + "\n" 
        if(option == "1")
        {
            ctx.data.message.unshift("Vizag")
            ctx.reply(message)
        }
        else if(option == "2")
        {
            ctx.data.message.unshift("Gopalpur")
            ctx.reply(message)
        }
        else if(option == "3")
        {
            ctx.data.message.unshift("Paradip")
            ctx.reply(message)
        }
        else if(option == "4")
        {
            ctx.data.message.unshift("Haldia")
            ctx.reply(message)
        }
        else if(option == "5")
        {
            ctx.data.message.unshift("Raigarh")
            ctx.reply(message)
        }
        else if(option == "6")
        {
            ctx.data.message.unshift("Raipur")
            ctx.reply(message)
        }
        else if(option == "8")
        {

            ctx.data.message = []

            ctx.data.message.unshift("registereduser")
            ctx.reply("Select the following options: \n Press 1 for new booking \n Press 2 to know information on last challan cleared status \n" + 
            " Press 3 for On-Road Assistance \n Press  9 for go back to main menu ")
        }
        else if(option == "9")
        {

            ctx.reply("Press 1 for English")
            ctx.data.number = null
            ctx.data.message= []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply("Please select a valid option")
        }
    }
    else if(ctx.data.message[0] == "registereduser")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
                ctx.data.message.unshift("booking")
                ctx.reply(
                "Press 1 for Vizag Loading" + "\n" +
                "Press 2 for Gopalpur Loading" + "\n" +
                "Press 3 for Paradip Loading" + "\n" +
                "Press 4 for Haldia Loading" + "\n" +
                "Press 5 for Raigarh Loading" + "\n" +
                "Press 6 for Raipur Loading" + "\n" +
                "Press 8 to go to Previous Menu" + "\n" +
                "Press 9 to go to Main Menu" + "\n" 
                )

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("invoice")
            ctx.reply(
                "Press 1 to select vehicle number for which Challan info is required" + "\n" +
                "Press 8 to go to Previous Menu" + "\n" +
                "Press 9 to go to Main Menu" + "\n" 
                )

        }
        else if(option == "3")
        {
            ctx.data.message.unshift("ticket")
            ctx.reply(
                "Press 1 to raise a ticket for vehicle breakdown assistance" + "\n" +
                "Press 2 to raise a ticket for vehicle accident assistance" + "\n" +
                "Press 3 to raise a ticket for any other onroad assistance" + "\n" +
                "Press 8 to go to Previous Menu" + "\n" +
                "Press 9 to go to Main Menu" + "\n" 
                )
        }
        else if(option == "9")
        {
            ctx.reply("Press 1 for English")
            ctx.data.number = null
            ctx.data.message = []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply("Please select a valid option")
        }
        
    }
    else if(ctx.data.message[0] == "english")
    {
        let number  = ctx.message.text

        TelegramUtils.isRegisteredUser(number).then((val)=>{
            if(val)
            {
                ctx.data.message.unshift("registereduser")
                ctx.data.number = number
                ctx.reply("Select the following options: \n Press 1 for new booking \n Press 2 to know information on last challan cleared status \n" + 
                " Press 3 for On-Road Assistance \n Press  9 for go back to main menu ")
            }
            else 
            {
                ctx.data.number = null
                ctx.data.message= []
                ctx.reply("Sorry, the number is not registered. Please register on our app or speak to customer care")
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply("Sorry, the number is not registered. Please register on our app or speak to customer care")
        })
     
    }
    else if(ctx.data.message[0] == "language")
    {
        let language  = ctx.message.text
        if(language == "1")
        {
            ctx.data.message.unshift("english")
            ctx.reply("Please type your registerd mobile number")
        }
        else
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply("Please select a valid option")
        }
    }
    else
    {
        ctx.reply("Press 1 for English")
        ctx.data.message = []
        ctx.data.number = null
        ctx.data.message.unshift("language")
    }
})
//bot.telegram.sendMessage("1265825981","hello")
bot.use((ctx)=>{
    ctx.data.message = [] 
    ctx.data.number = null

    ctx.reply("At the end, I'm just a bot. Don't do anything that I can't understand. Press any key to continue")
}
)

bot.launch()