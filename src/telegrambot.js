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
 
  ////(DB.get('sessions').getById('1:1').value())
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
    if(!ctx.data.language)
    {
        ctx.data.language = null
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
        //     ctx.reply("Select the following options: \n1. New Booking \n2. Complaint/Enquiry ")
        // }
        // else
        // {
            
        //     ctx.reply("Mobile number not found! Please try again")
        // }
        ctx.data.message = [] 
        ctx.data.number = null
        ctx.reply("Please select a valid option")


    }
    
    

    //
    else if(ctx.data.message[2] == "invoice" && ctx.data.language == "english")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                      ctx.reply(val + "\nPress any key to continue.")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
              ctx.reply(englisharr[55])
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
              ctx.reply(englisharr[55])
  
                })  
                // TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                //     if(val)
                //     {
                //         ctx.reply(englisharr[49])
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //     }
                //     else
                //     {
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //         ctx.reply(englisharr[55])
    
                //     }
                // }).catch((e)=>{
                //     ctx.data.message = [] 
                //     ctx.data.number = null
                //     ctx.reply(englisharr[55])
    
                // })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                      ctx.reply(val + "\nPress any key to continue.")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
              ctx.reply(englisharr[55])
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
              ctx.reply(englisharr[55])
  
                })  
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
    
            })
    
        }
    }
    else if(ctx.data.message[2] == "invoice" && ctx.data.language == "hindi")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                      ctx.reply(val + "\nकृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
              ctx.reply(getValue(55,ctx.data.language))
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
                  ctx.reply(getValue(55,ctx.data.language))
  
                })  
                // TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                //     if(val)
                //     {
                //         ctx.reply(englisharr[49])
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //     }
                //     else
                //     {
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //         ctx.reply(englisharr[55])
    
                //     }
                // }).catch((e)=>{
                //     ctx.data.message = [] 
                //     ctx.data.number = null
                //     ctx.reply(englisharr[55])
    
                // })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                       ctx.reply(val + "\nकृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
                      ctx.reply(getValue(55,ctx.data.language))
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
                  ctx.reply(getValue(55,ctx.data.language))
  
                })  
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
    
            })
    
        }
    }
    else if(ctx.data.message[2] == "invoice" && ctx.data.language == "telegu")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                      ctx.reply(val + "\nకొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి|")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
              ctx.reply(getValue(55,ctx.data.language))
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
                  ctx.reply(getValue(55,ctx.data.language))
  
                })  
                // TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                //     if(val)
                //     {
                //         ctx.reply(englisharr[49])
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //     }
                //     else
                //     {
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //         ctx.reply(englisharr[55])
    
                //     }
                // }).catch((e)=>{
                //     ctx.data.message = [] 
                //     ctx.data.number = null
                //     ctx.reply(englisharr[55])
    
                // })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(val + "\nకొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి|")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
                      ctx.reply(getValue(55,ctx.data.language))
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
                  ctx.reply(getValue(55,ctx.data.language))
  
                })  
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
    
            })
    
        }
    }
    else if(ctx.data.message[2] == "invoice" && ctx.data.language == "odhissa")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                      ctx.reply(val + "\nଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
              ctx.reply(getValue(55,ctx.data.language))
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
                  ctx.reply(getValue(55,ctx.data.language))
  
                })  
                // TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                //     if(val)
                //     {
                //         ctx.reply(englisharr[49])
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //     }
                //     else
                //     {
                //         ctx.data.message = [] 
                //         ctx.data.number = null
                //         ctx.reply(englisharr[55])
    
                //     }
                // }).catch((e)=>{
                //     ctx.data.message = [] 
                //     ctx.data.number = null
                //     ctx.reply(englisharr[55])
    
                // })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "invoice")
            {
                TelegramUtils.getInvoice(ctx.data.number,ctx.data.message[0]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(val + "\nଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|")
                      ctx.data.message = []  
                      ctx.data.number = null
                    }
                    else
                    {
                      ctx.data.message = []  
                      ctx.data.number = null
                      ctx.reply(getValue(55,ctx.data.language))
  
                    }
                }).catch((e)=>{
                  ctx.data.message = []  
                  ctx.data.number = null
                  ctx.reply(getValue(55,ctx.data.language))
  
                })  
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
    
            })
    
        }
    }

    else if(ctx.data.message[1] == "invoice" && ctx.data.language == "english")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(englisharr[0])
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                     message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55]) 
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[1] == "invoice" && ctx.data.language == "hindi")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                      message = message + vehiclearray[i] + " के लिए " + i + "दबाएं" + "\n"
                   // message = message + vehiclearray[i] + " కోసం " + i + "నొక్కండి" + "\n"
                    // message = message + vehiclearray[i] + " ପାଇଁ " + i + "ଦବାନ୍ତୁ" + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[1] == "invoice" && ctx.data.language == "telegu")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                   //   message = message + vehiclearray[i] + " के लिए " + i + "दबाएं" + "\n"
                    message = message + vehiclearray[i] + " కోసం " + i + "నొక్కండి" + "\n"
                    // message = message + vehiclearray[i] + " ପାଇଁ " + i + "ଦବାନ୍ତୁ" + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[1] == "invoice" && ctx.data.language == "odhissa")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                     // message = message + vehiclearray[i] + " के लिए " + i + "दबाएं" + "\n"
                   // message = message + vehiclearray[i] + " కోసం " + i + "నొక్కండి" + "\n"
                     message = message + vehiclearray[i] + " ପାଇଁ " + i + "ଦବାନ୍ତୁ" + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }


    else if(ctx.data.message[0] == "invoice" && ctx.data.language == "english")
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
            ctx.data.message.unshift("one")
            ctx.reply(englisharr[14] + "\n" + 
               englisharr[23])
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
       
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(englisharr[54]+" \n"+englisharr[6]+" \n"+ englisharr[24] +"\n" + 
                englisharr[27] + "\n"+ englisharr[46])
        }
        else if(option == "9")
        {

            ctx.reply(englisharr[5])
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[0] == "invoice" && ctx.data.language == "hindi")
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
            ctx.data.message.unshift("one")
            ctx.reply(getValue(14,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
       
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[0] == "invoice" && ctx.data.language == "telegu")
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
            ctx.data.message.unshift("one")
            ctx.reply(getValue(14,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
       
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[0] == "invoice" && ctx.data.language == "odhissa")
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
            ctx.data.message.unshift("one")
            ctx.reply(getValue(14,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
       
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }

    //
    else if(ctx.data.message[2] == "ticket" && ctx.data.language == "english")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "ticket")
            {
                TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(englisharr[49])
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(englisharr[55])
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
    
                })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "ticket")
            {
                 TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(englisharr[49])
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(englisharr[55])
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
    
                })        
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
    
            })
    
        }
    }
    else if(ctx.data.message[2] == "ticket" && ctx.data.language == "hindi")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "ticket")
            {
                TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(getValue(49,ctx.data.language))
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language))
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
    
                })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "ticket")
            {
                 TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(getValue(49,ctx.data.language))
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language))
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
    
                })        
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
    
            })
    
        }
    }
    else if(ctx.data.message[2] == "ticket" && ctx.data.language == "telegu")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "ticket")
            {
                TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(getValue(49,ctx.data.language))
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language))
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
    
                })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "ticket")
            {
                 TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(getValue(49,ctx.data.language))
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language))
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
    
                })        
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
    
            })
    
        }
    }
    else if(ctx.data.message[2] == "ticket" && ctx.data.language == "odhissa")
    {
        let option = ctx.message.text
        if(ctx.data.message[0] == "vehicleone")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
              
                let vehiclearray = val
            
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                           
                        }
                    }
    
            if(ctx.data.message[3] == "ticket")
            {
                TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(getValue(49,ctx.data.language))
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language))
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
    
                })              
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
             
            })
        }
        else
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
               for(let i = 0;i<vehiclearray.length;i++)
                    {
                        if(option == i)
                        {
                            ctx.data.message.unshift(vehiclearray[i])
                        }
                    }
            if(ctx.data.message[3] == "ticket")
            {
                 TelegramUtils.createTicket(ctx.data.number,ctx.data.message[0],ctx.data.message[2]).then((val)=>{
                    if(val)
                    {
                        ctx.reply(getValue(49,ctx.data.language))
                        ctx.data.message = [] 
                        ctx.data.number = null
                    }
                    else
                    {
                        ctx.data.message = [] 
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language))
    
                    }
                }).catch((e)=>{
                    ctx.data.message = [] 
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
    
                })        
            }
            else
            {
              
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }        
    
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
    
            })
    
        }
    }

    else if(ctx.data.message[1] == "ticket" && ctx.data.language == "english")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(englisharr[0])
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                     message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55]) 
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[1] == "ticket" && ctx.data.language == "hindi")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                    message = message + vehiclearray[i] + " के लिए " + i + " दबाएं" + "\n"
                    // message = message + vehiclearray[i] + " కోసం " + i + "నొక్కండి" + "\n"
                    // message = message + vehiclearray[i] + " ପାଇଁ " + i + "ଦବାନ୍ତୁ" + "\n"

                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language)) 
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[1] == "ticket" && ctx.data.language == "telegu")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                    // message = message + vehiclearray[i] + " के लिए " + i + "दबाएं" + "\n"
                    message = message + vehiclearray[i] + " కోసం " + i + " నొక్కండి" + "\n"
                    // message = message + vehiclearray[i] + " ପାଇଁ " + i + "ଦବାନ୍ତୁ" + "\n"

                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language)) 
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[1] == "ticket" && ctx.data.language == "odhissa")
    {
        let option  = ctx.message.text
        if(option == "1")
        {
            
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
            TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{

                let vehiclearray = val
                let message = "" + getValue((englisharr.length - 1),ctx.data.language) + "\n\n"
                for(let i = 0;i<vehiclearray.length;i++)
                {
                    // message = message + vehiclearray[i] + " के लिए " + i + "दबाएं" + "\n"
                    // message = message + vehiclearray[i] + " కోసం " + i + "నొక్కండి" + "\n"
                    message = message + vehiclearray[i] + " ପାଇଁ " + i + " ଦବାନ୍ତୁ" + "\n"

                }
                if(vehiclearray.length > 0)
                {
                    ctx.reply(message)
                    ctx.data.message.unshift("vehicletwo")
                }
                else 
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language)) 
                }

            }).catch((e)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }


    else if(ctx.data.message[0] == "ticket" && ctx.data.language == "english")
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
            ctx.data.message.unshift("vehicle breakdown")
            ctx.reply(englisharr[13] + "\n" + 
               englisharr[23])
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("vehicle accident")
            ctx.reply(englisharr[13] + "\n" + 
               englisharr[23])
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //         ctx.data.message.unshift("vehicle accident")
            //     }
            //     else 
            //     {
            //         ctx.reply(englisharr[90]) 
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //     }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
            
        }
        else if(option == "3")
        {
            ctx.data.message.unshift("other")
            ctx.reply(englisharr[13] + "\n" + 
               englisharr[23])
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //         let message = ""
            //         for(let i = 0;i<vehiclearray.length;i++)
            //         {
            //              message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //         }
            //         if(vehiclearray.length > 0)
            //         {
            //             ctx.reply(message)
            //             ctx.data.message.unshift("other")
            //         }
            //         else 
            //         {
            //             ctx.reply(englisharr[90]) 
            //             ctx.data.message = [] 
            //              ctx.data.number = null
            //         }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
           
        }
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(englisharr[54]+" \n"+englisharr[6]+" \n"+ englisharr[24] +"\n" + 
                englisharr[27] + "\n"+ englisharr[46])
        }
        else if(option == "9")
        {

            ctx.reply(englisharr[5])
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[0] == "ticket" && ctx.data.language == "hindi")
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
            ctx.data.message.unshift("vehicle breakdown")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("vehicle accident")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //         ctx.data.message.unshift("vehicle accident")
            //     }
            //     else 
            //     {
            //         ctx.reply(englisharr[90]) 
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //     }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
            
        }
        else if(option == "3")
        {
            ctx.data.message.unshift("other")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //         let message = ""
            //         for(let i = 0;i<vehiclearray.length;i++)
            //         {
            //              message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //         }
            //         if(vehiclearray.length > 0)
            //         {
            //             ctx.reply(message)
            //             ctx.data.message.unshift("other")
            //         }
            //         else 
            //         {
            //             ctx.reply(englisharr[90]) 
            //             ctx.data.message = [] 
            //              ctx.data.number = null
            //         }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
           
        }
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[0] == "ticket" && ctx.data.language == "telegu")
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
            ctx.data.message.unshift("vehicle breakdown")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("vehicle accident")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //         ctx.data.message.unshift("vehicle accident")
            //     }
            //     else 
            //     {
            //         ctx.reply(englisharr[90]) 
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //     }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
            
        }
        else if(option == "3")
        {
            ctx.data.message.unshift("other")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //         let message = ""
            //         for(let i = 0;i<vehiclearray.length;i++)
            //         {
            //              message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //         }
            //         if(vehiclearray.length > 0)
            //         {
            //             ctx.reply(message)
            //             ctx.data.message.unshift("other")
            //         }
            //         else 
            //         {
            //             ctx.reply(englisharr[90]) 
            //             ctx.data.message = [] 
            //              ctx.data.number = null
            //         }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
           
        }
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[0] == "ticket" && ctx.data.language == "odhissa")
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
            ctx.data.message.unshift("vehicle breakdown")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
                    
            // let vehiclearray = val
            // let message = ""
            // for(let i = 0;i<vehiclearray.length;i++)
            // {
            //      message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            // }
            // if(vehiclearray.length > 0)
            // {
            //     ctx.reply(message)
            //     ctx.data.message.unshift("vehicle breakdown")
            // }
            // else 
            // {
            //     ctx.reply(englisharr[90]) 
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //         ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("vehicle accident")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //         ctx.data.message.unshift("vehicle accident")
            //     }
            //     else 
            //     {
            //         ctx.reply(englisharr[90]) 
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            //     }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
            
        }
        else if(option == "3")
        {
            ctx.data.message.unshift("other")
            ctx.reply(getValue(13,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language))
            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
            //     if(val)
            //     {
            //         let vehiclearray = val
            //         let message = ""
            //         for(let i = 0;i<vehiclearray.length;i++)
            //         {
            //              message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //         }
            //         if(vehiclearray.length > 0)
            //         {
            //             ctx.reply(message)
            //             ctx.data.message.unshift("other")
            //         }
            //         else 
            //         {
            //             ctx.reply(englisharr[90]) 
            //             ctx.data.message = [] 
            //              ctx.data.number = null
            //         }
            //     }
            //     else 
            //     {
            //         ctx.data.message = [] 
            //         ctx.data.number = null
            // ctx.reply(englisharr[55])

            //     }
            // }).catch((e)=>{
            //     ctx.data.message = [] 
            //     ctx.data.number = null
            // ctx.reply(englisharr[55])

            // })
           
        }
        else if(option == "8")
        {
            ctx.data.message = []
            ctx.data.message.unshift("registereduser")
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    

    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicleone" && ctx.data.language == "english")
    {
        let option  = ctx.message.text

        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{
           
            let vehiclearray = val
           
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                      
                    }
                }

        if(ctx.data.message[5] == "booking")
        {
          
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(englisharr[51])
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                      ctx.reply(englisharr[55])

                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
               
               ctx.reply(englisharr[55])

            })
            
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
           
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
         
        })
    }
    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicleone" && ctx.data.language == "hindi")
    {
        let option  = ctx.message.text
       
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{
         
            let vehiclearray = val
           
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                      
                    }
                }

        if(ctx.data.message[5] == "booking")
        {
           
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(getValue(51,ctx.data.language))
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))

                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                
                ctx.reply(getValue(55,ctx.data.language))

            })
            
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            

        })
    }
    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicleone" && ctx.data.language == "telegu")
    {
        let option  = ctx.message.text
       
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{
         
            let vehiclearray = val
           
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                      
                    }
                }

        if(ctx.data.message[5] == "booking")
        {
           
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(getValue(51,ctx.data.language))
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))

                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                
                ctx.reply(getValue(55,ctx.data.language))

            })
            
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            

        })
    }
    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicleone" && ctx.data.language == "odhissa")
    {
        let option  = ctx.message.text
       
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{
         
            let vehiclearray = val
           
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == vehiclearray[i].substring(vehiclearray[i].length - 4))
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                      
                    }
                }

        if(ctx.data.message[5] == "booking")
        {
           
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(getValue(51,ctx.data.language))
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))

                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                
                ctx.reply(getValue(55,ctx.data.language))

            })
            
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            

        })
    }


    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicletwo" && ctx.data.language == "english")
    {
        let option = ctx.message.text
     
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{

            let vehiclearray = val
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == i)
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                    }
                }
        if(ctx.data.message[5] == "booking")
        {
           
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(englisharr[51])
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                    
                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
                
            })
            
        }
        else
        {
           
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])

        })

        

    
    }
    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicletwo" && ctx.data.language == "hindi")
    {
        let option = ctx.message.text
     
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{

            let vehiclearray = val
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == i)
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                    }
                }
        if(ctx.data.message[5] == "booking")
        {
            
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(getValue(51,ctx.data.language))
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            })
            
        }
        else
        {
            
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))

        })

        

    
    }
    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicletwo" && ctx.data.language == "telegu")
    {
        let option = ctx.message.text
     
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{

            let vehiclearray = val
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == i)
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                    }
                }
        if(ctx.data.message[5] == "booking")
        {
            
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(getValue(51,ctx.data.language))
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            })
            
        }
        else
        {
            
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))

        })

        

    
    }
    else if(ctx.data.message[4] == "booking" && ctx.data.message[0] == "vehicletwo" && ctx.data.language == "odhissa")
    {
        let option = ctx.message.text
     
        TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[1]).then((val)=>{

            let vehiclearray = val
           for(let i = 0;i<vehiclearray.length;i++)
                {
                    if(option == i)
                    {
                        ctx.data.message.unshift(vehiclearray[i])
                    }
                }
        if(ctx.data.message[5] == "booking")
        {
            
            let vehicle = ctx.data.message[0]
            let mine  = ctx.data.message[2]
            let area  = ctx.data.message[3]
            let loading = ctx.data.message[4]
            //confirm booking
            TelegramUtils.createBooking(ctx.data.number,vehicle,mine,loading).then((val)=>{
                if(val)
                {
                    ctx.reply(getValue(51,ctx.data.language))
                    ctx.data.message = [] 
                    ctx.data.number = null
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                }
            }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                
            })
            
        }
        else
        {
            
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }        

        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))

        })

        

    
    }
    


    else if(ctx.data.message[3] == "booking" && ctx.data.language == "english")
    {
        let option = ctx.message.text
      
        if(option == "1")
        {
            ctx.reply(englisharr[0])
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
          
                TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[0]).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                        ctx.data.message.unshift("vehicletwo")
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply(englisharr[55]) 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[3] == "booking" && ctx.data.language == "hindi")
    {
        let option = ctx.message.text
        
        if(option == "1")
        {
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
          
                TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[0]).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         
                         //<text>  के लिए <number>  दबाएं
                         message = message + vehiclearray[i] + " के लिए " + i + "दबाएं" + "\n"

                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                        ctx.data.message.unshift("vehicletwo")
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply(getValue(90,ctx.data.language)) 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[3] == "booking" && ctx.data.language == "telegu")
    {
        let option = ctx.message.text
        
        if(option == "1")
        {
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
          
                TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[0]).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         
                         //<text>  के लिए <number>  दबाएं
                         //<text> కోసం <number> నొక్కండి

                         message = message + vehiclearray[i] + " కోసం " + i + "నొక్కండి" + "\n"

                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                        ctx.data.message.unshift("vehicletwo")
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language)) 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[3] == "booking" && ctx.data.language == "odhissa")
    {
        let option = ctx.message.text
        
        if(option == "1")
        {
            ctx.reply(getValue(0,ctx.data.language))
            ctx.data.message.unshift("vehicleone")
        }
        else if(option == "2")
        {
          
                TelegramUtils.getVehiclesByMobile(ctx.data.number,ctx.data.message[0]).then((val)=>{

                    let vehiclearray = val
                    let message = ""
                    for(let i = 0;i<vehiclearray.length;i++)
                    {
                         
                         //<text>  के लिए <number>  दबाएं
                         //<text> ପାଇଁ <number> ଦବାନ୍ତୁ |

                         message = message + vehiclearray[i] + " ପାଇଁ " + i + "ଦବାନ୍ତୁ" + "\n"

                    }
                    if(vehiclearray.length > 0)
                    {
                        ctx.reply(message)
                        ctx.data.message.unshift("vehicletwo")
                    }
                    else 
                    {
                        ctx.data.message = []
                        ctx.data.number = null
                        ctx.reply(getValue(55,ctx.data.language)) 
                    }

                }).catch((e)=>{
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                })
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    

    else if(ctx.data.message[2] == "booking" && ctx.data.language == "english")
    {
        let option = ctx.message.text
       

        if(ctx.data.message[0] == "Joda")
        {
            TelegramUtils.getMinesByArea("Joda",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(englisharr[15] + "\n" + 
               englisharr[23]
                )

                

            }
            else
            {
                ctx.reply(englisharr[55])
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            })

            
        }
        else if(ctx.data.message[0] == "Barbil")
        {

            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(englisharr[15] + "\n" + 
               englisharr[23]
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(englisharr[55])
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            })

        }
        else if(ctx.data.message[0] == "Rugudi")
        {

            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(englisharr[15] + "\n" + 
               englisharr[23]
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            })

        }
        else if(ctx.data.message[0] == "Koida")
        {
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(englisharr[15] + "\n" + 
               englisharr[23]
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //         ctx.data.message = []
                //         ctx.data.number = null
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(englisharr[55])
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
            })

        }
        else if(ctx.data.message[0] == "Jamda")
        {
            try
            {
                TelegramUtils.getMinesByArea("Jamda",ctx.data.message[1]).then((val)=>{
          
                    if(val.length > 0)
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
                    ctx.reply(englisharr[15] + "\n" + 
                    englisharr[23])
        
                    // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{
        
                    //     let vehiclearray = val
                    //     let message = ""
                    //     for(let i = 0;i<vehiclearray.length;i++)
                    //     {
                    //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                    //     }
                    //     if(vehiclearray.length > 0)
                    //     {
                    //         ctx.reply(message)
                    //     }
                    //     else 
                    //     {
                    //         ctx.reply("Kindly registered the vehicles through Transfly app")
                    //         ctx.data.message = []
                    //         ctx.data.number = null 
                    //     }
        
                    // }).catch((e)=>{
                    //     ctx.data.message = []
                    //     ctx.data.number = null
        
                    // })
        
                }
                else
                {
                    ctx.reply(englisharr[55])
                    ctx.data.message = []
                    ctx.data.number = null
                }
        
            }
            else
            {
                ctx.reply(englisharr[55])
                ctx.data.message = []
                ctx.data.number = null
                
            }
                })
                .catch(()=>{
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                })
            }
            catch(e)
            {
                
            }
      

           
        
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
            //
        }
    }
    else if(ctx.data.message[2] == "booking" && ctx.data.language == "hindi")
    {
        let option = ctx.message.text

        if(ctx.data.message[0] == "Joda")
        {
            TelegramUtils.getMinesByArea("Joda",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null
                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

            
        }
        else if(ctx.data.message[0] == "Barbil")
        {

            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply( getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Rugudi")
        {

            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )


                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply( getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Koida")
        {
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )


                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //         ctx.data.message = []
                //         ctx.data.number = null
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Jamda")
        {
        TelegramUtils.getMinesByArea("Jamda",ctx.data.message[1]).then((val)=>{
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
            ctx.reply(getValue(15,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language)
            )


            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

            //     let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //     }
            //     else 
            //     {
            //         ctx.reply("Kindly registered the vehicles through Transfly app")
            //         ctx.data.message = []
            //         ctx.data.number = null 
            //     }

            // }).catch((e)=>{
            //     ctx.data.message = []
            //     ctx.data.number = null

            // })

        }
        else
        {
            ctx.reply(getValue(55,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
        }

    }
    else
    {
        ctx.data.message = []
        ctx.data.number = null
        ctx.reply(getValue(55,ctx.data.language))
    }
        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        })

           
        
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            //
        }
    }
    else if(ctx.data.message[2] == "booking" && ctx.data.language == "telegu")
    {
        let option = ctx.message.text

        if(ctx.data.message[0] == "Joda")
        {
            TelegramUtils.getMinesByArea("Joda",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null
                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

            
        }
        else if(ctx.data.message[0] == "Barbil")
        {

            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Rugudi")
        {

            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )


                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Koida")
        {
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )


                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //         ctx.data.message = []
                //         ctx.data.number = null
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Jamda")
        {
        TelegramUtils.getMinesByArea("Jamda",ctx.data.message[1]).then((val)=>{
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
            ctx.reply(getValue(15,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language)
            )


            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

            //     let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //     }
            //     else 
            //     {
            //         ctx.reply("Kindly registered the vehicles through Transfly app")
            //         ctx.data.message = []
            //         ctx.data.number = null 
            //     }

            // }).catch((e)=>{
            //     ctx.data.message = []
            //     ctx.data.number = null

            // })

        }
        else
        {
            ctx.reply(getValue(55,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
        }

    }
    else
    {
        ctx.data.message = []
        ctx.data.number = null
        ctx.reply(getValue(55,ctx.data.language))
    }
        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        })

           
        
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            //
        }
    }
    else if(ctx.data.message[2] == "booking" && ctx.data.language == "odhissa")
    {
        let option = ctx.message.text

        if(ctx.data.message[0] == "Joda")
        {
            TelegramUtils.getMinesByArea("Joda",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null
                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

            
        }
        else if(ctx.data.message[0] == "Barbil")
        {

            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )

                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Rugudi")
        {

            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )


                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.data.message = []
                //         ctx.data.number = null
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Koida")
        {
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[1]).then((val)=>{
                if(val.length > 0)
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
                ctx.reply(getValue(15,ctx.data.language) + "\n" + 
                getValue(23,ctx.data.language)
                )


                // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

                //     let vehiclearray = val
                //     let message = ""
                //     for(let i = 0;i<vehiclearray.length;i++)
                //     {
                //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
                //     }
                //     if(vehiclearray.length > 0)
                //     {
                //         ctx.reply(message)
                //     }
                //     else 
                //     {
                //         ctx.reply("Kindly registered the vehicles through Transfly app") 
                //         ctx.data.message = []
                //         ctx.data.number = null
                //     }

                // }).catch((e)=>{
                //     ctx.data.message = []
                //     ctx.data.number = null

                // })

            }
            else
            {
                ctx.reply(getValue(55,ctx.data.language))
                ctx.data.message = []
                ctx.data.number = null
            }

        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
            })
            .catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
            })

        }
        else if(ctx.data.message[0] == "Jamda")
        {
        TelegramUtils.getMinesByArea("Jamda",ctx.data.message[1]).then((val)=>{
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
            ctx.reply(getValue(15,ctx.data.language) + "\n" + 
            getValue(23,ctx.data.language)
            )


            // TelegramUtils.getVehiclesByMobile(ctx.data.number).then((val)=>{

            //     let vehiclearray = val
            //     let message = ""
            //     for(let i = 0;i<vehiclearray.length;i++)
            //     {
            //          message = message + "Press " + i + " for " + vehiclearray[i] + "\n"
            //     }
            //     if(vehiclearray.length > 0)
            //     {
            //         ctx.reply(message)
            //     }
            //     else 
            //     {
            //         ctx.reply("Kindly registered the vehicles through Transfly app")
            //         ctx.data.message = []
            //         ctx.data.number = null 
            //     }

            // }).catch((e)=>{
            //     ctx.data.message = []
            //     ctx.data.number = null

            // })

        }
        else
        {
            ctx.reply(getValue(55,ctx.data.language))
            ctx.data.message = []
            ctx.data.number = null
        }

    }
    else
    {
        ctx.data.message = []
        ctx.data.number = null
        ctx.reply(getValue(55,ctx.data.language))
    }
        })
        .catch((val)=>{
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        })

           
        
        }
        else
        {
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
            //
        }
    }
    

    else if(ctx.data.message[1] == "booking" && ctx.data.language == "english")
    {

        let area  = ctx.message.text
        let nameArray = ["1","2","3","4","5","6","7"]
        if(area == "1")
        {
           //joda
           TelegramUtils.getMinesByArea("Joda",ctx.data.message[0]).then((val)=>{

            if(val.length>0)
            {
                // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                let minearray = val
                let message = ""
                for(let i = 0;i<minearray.length;i++)
                {
                     message = message + "Press " + i + " to book your loading from " + englisharr[getNumber(minearray[i])] + "\n"
                }
                ctx.data.message.unshift("Joda")
              
                ctx.reply(message)
     
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
                    //please try again
            }

           }).catch((val)=>{

            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
           })

          
        }
        else if(area == "2")
        {
            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + englisharr[getNumber(minearray[i])] + "\n"
                    }
                    ctx.data.message.unshift("Barbil")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
               })
    
        }
        else if(area == "3")
        {
            //rugudi
            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        //here
                         message = message + "Press " + i + " to book your loading from " + englisharr[getNumber(minearray[i])]  + "\n"
                    }
                    ctx.data.message.unshift("Rugudi")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
               })
    
        }
        else if(area == "4")
        {
            //koida
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + englisharr[getNumber(minearray[i])] + "\n"
                    }
                    ctx.data.message.unshift("Koida")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
               })
    
        }
        else if(area == "5")
        {
            //jamda
            TelegramUtils.getMinesByArea("Jamda",ctx.data.message[0]).then((val)=>{

                if(val.length > 0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                         message = message + "Press " + i + " to book your loading from " + englisharr[getNumber(minearray[i])] + "\n"
                    }
                    ctx.data.message.unshift("Jamda")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(englisharr[55])
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(englisharr[55])
               })
    
        }
        else 
        {
            //please try again
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[1] == "booking" && ctx.data.language == "hindi")
    {

        let area  = ctx.message.text
        let nameArray = ["1","2","3","4","5","6","7"]
        if(area == "1")
        {
           //joda
           TelegramUtils.getMinesByArea("Joda",ctx.data.message[0]).then((val)=>{

            if(val.length>0)
            {
                // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                let minearray = val
                let message = ""
                for(let i = 0;i<minearray.length;i++)
                {
                     
                     message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  से लोड करने के लिए " + i + " दबाएँ " + "\n"
                }
                //<mine>  से लोड करने के लिए <number> दबाएँ

                ctx.data.message.unshift("Joda")
              
                ctx.reply(message)
     
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                    //please try again
            }

           }).catch((val)=>{

            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
           })

          
        }
        else if(area == "2")
        {
            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  से लोड करने के लिए " + i + " दबाएँ " + "\n"
                        }
                    ctx.data.message.unshift("Barbil")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "3")
        {
            //rugudi
            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  से लोड करने के लिए " + i + " दबाएँ " + "\n"
                        //here
                         }
                    ctx.data.message.unshift("Rugudi")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "4")
        {
            //koida
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  से लोड करने के लिए " + i + " दबाएँ " + "\n"
                          }
                    ctx.data.message.unshift("Koida")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "5")
        {
            //jamda
            TelegramUtils.getMinesByArea("Jamda",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  से लोड करने के लिए " + i + " दबाएँ " + "\n"
                          }
                    ctx.data.message.unshift("Jamda")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else 
        {
            //please try again
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[1] == "booking" && ctx.data.language == "telegu")
    {

        let area  = ctx.message.text
        let nameArray = ["1","2","3","4","5","6","7"]
        if(area == "1")
        {
           //joda
           TelegramUtils.getMinesByArea("Joda",ctx.data.message[0]).then((val)=>{

            if(val.length>0)
            {
                // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                let minearray = val
                let message = ""
                for(let i = 0;i<minearray.length;i++)
                {
                    message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి " + i + " నొక్కండి " + "\n"
                    //<mine> నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి <number> నొక్కండి 

                }
                ctx.data.message.unshift("Joda")
              
                ctx.reply(message)
     
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                    //please try again
            }

           }).catch((val)=>{

            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
           })

          
        }
        else if(area == "2")
        {
            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి " + i + " నొక్కండి " + "\n"
                    
                         }
                    ctx.data.message.unshift("Barbil")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "3")
        {
            //rugudi
            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        //here
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి " + i + " నొక్కండి " + "\n"
                    
                         }
                    ctx.data.message.unshift("Rugudi")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "4")
        {
            //koida
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి " + i + " నొక్కండి " + "\n"
                    
                        }
                    ctx.data.message.unshift("Koida")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "5")
        {
            //jamda
            TelegramUtils.getMinesByArea("Jamda",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి " + i + " నొక్కండి " + "\n"
                    
                         }
                    ctx.data.message.unshift("Jamda")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else 
        {
            //please try again
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[1] == "booking" && ctx.data.language == "odhissa")
    {

        let area  = ctx.message.text
        let nameArray = ["1","2","3","4","5","6","7"]
        if(area == "1")
        {
           //joda
           TelegramUtils.getMinesByArea("Joda",ctx.data.message[0]).then((val)=>{

            if(val.length>0)
            {
                // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                let minearray = val
                let message = ""
                for(let i = 0;i<minearray.length;i++)
                {
                    message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  ରୁ ଲୋଡିଂ କରିବା ପାଇଁ " + i + " ଦବାନ୍ତୁ " + "\n"
                    //<mine> ରୁ ଲୋଡିଂ କରିବା ପାଇଁ <number> ଦବାନ୍ତୁ।

                    }
                ctx.data.message.unshift("Joda")
              
                ctx.reply(message)
     
            }
            else
            {
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
                    //please try again
            }

           }).catch((val)=>{

            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
           })

          
        }
        else if(area == "2")
        {
            TelegramUtils.getMinesByArea("Barbil",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  ରୁ ଲୋଡିଂ କରିବା ପାଇଁ " + i + " ଦବାନ୍ତୁ " + "\n"
                   
                         }
                    ctx.data.message.unshift("Barbil")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "3")
        {
            //rugudi
            TelegramUtils.getMinesByArea("Rugudi",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        //here
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  ରୁ ଲୋଡିଂ କରିବା ପାଇଁ " + i + " ଦବାନ୍ତୁ " + "\n"
                   
                          }
                    ctx.data.message.unshift("Rugudi")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
    
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "4")
        {
            //koida
            TelegramUtils.getMinesByArea("Koida",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  ରୁ ଲୋଡିଂ କରିବା ପାଇଁ " + i + " ଦବାନ୍ତୁ " + "\n"
                   
                             }
                    ctx.data.message.unshift("Koida")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else if(area == "5")
        {
            //jamda
            TelegramUtils.getMinesByArea("Jamda",ctx.data.message[0]).then((val)=>{

                if(val.length>0)
                {
                    // let minearray = ["MGM Mines","KMC Mines","Essar Plant"]
                    let minearray = val
                    let message = ""
                    for(let i = 0;i<minearray.length;i++)
                    {
                        message = message + getValue(getNumber(minearray[i]),ctx.data.language) + "  ରୁ ଲୋଡିଂ କରିବା ପାଇଁ " + i + " ଦବାନ୍ତୁ " + "\n"
                   
                           }
                    ctx.data.message.unshift("Jamda")
                    ctx.reply(message)
         
                }
                else
                {
                    ctx.data.message = []
                    ctx.data.number = null
                    ctx.reply(getValue(55,ctx.data.language))
                        //please try again
                }
    
               }).catch((val)=>{
                ctx.data.message = []
                ctx.data.number = null
                ctx.reply(getValue(55,ctx.data.language))
               })
    
        }
        else 
        {
            //please try again
            ctx.data.message = []
            ctx.data.number = null
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    
    
    
    else if(ctx.data.message[0] == "booking" && ctx.data.language == "english")
    {
        let option  = ctx.message.text
        let message  = 
        englisharr[16] + "\n" +
        englisharr[25] + "\n" +
        englisharr[33] + "\n" +
        englisharr[38] + "\n" +
        englisharr[41] + "\n" +
        englisharr[45] + "\n" +
        englisharr[46] + "\n" 
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
            ctx.reply(englisharr[54]+" \n"+englisharr[6]+" \n"+ englisharr[24] +"\n" + 
            englisharr[27] + "\n"+ englisharr[46])
        }
        else if(option == "9")
        {

            ctx.reply(englisharr[5])
            ctx.data.number = null
            ctx.data.message= []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(englisharr[55])
        }
    }
    else if(ctx.data.message[0] == "booking" && ctx.data.language == "hindi")
    {
        let option  = ctx.message.text
        let message  = 
        getValue(16,ctx.data.language) + "\n" +
        getValue(25,ctx.data.language) + "\n" +
        getValue(33,ctx.data.language) + "\n" +
        getValue(38,ctx.data.language) + "\n" +
        getValue(41,ctx.data.language) + "\n" +
        getValue(45,ctx.data.language) + "\n" +
        getValue(46,ctx.data.language) + "\n" 
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
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.number = null
            ctx.data.message= []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[0] == "booking" && ctx.data.language == "telegu")
    {
        let option  = ctx.message.text
        let message  = 
        getValue(16,ctx.data.language) + "\n" +
        getValue(25,ctx.data.language) + "\n" +
        getValue(33,ctx.data.language) + "\n" +
        getValue(38,ctx.data.language) + "\n" +
        getValue(41,ctx.data.language) + "\n" +
        getValue(45,ctx.data.language) + "\n" +
        getValue(46,ctx.data.language) + "\n" 
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
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.number = null
            ctx.data.message= []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(getValue(55,ctx.data.language))
        }
    }
    else if(ctx.data.message[0] == "booking" && ctx.data.language == "odhissa")
    {
        let option  = ctx.message.text
        let message  = 
        getValue(16,ctx.data.language) + "\n" +
        getValue(25,ctx.data.language) + "\n" +
        getValue(33,ctx.data.language) + "\n" +
        getValue(38,ctx.data.language) + "\n" +
        getValue(41,ctx.data.language) + "\n" +
        getValue(45,ctx.data.language) + "\n" +
        getValue(46,ctx.data.language) + "\n" 
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
            ctx.reply(getValue(54,ctx.data.language)+" \n"+getValue(6,ctx.data.language)+" \n"+ getValue(24,ctx.data.language) +"\n" + 
            getValue(27,ctx.data.language) + "\n"+ getValue(46,ctx.data.language))
        }
        else if(option == "9")
        {

            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.number = null
            ctx.data.message= []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(getValue(55,ctx.data.language))
        }
    }

    else if(ctx.data.message[0] == "registereduser" && ctx.data.language == "english")
    {
        TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            if(val.length > 0)
            {
                let option  = ctx.message.text
        if(option == "1")
        {
                ctx.data.message.unshift("booking")
                ctx.reply(
                englisharr[7]+ "\n" +
                englisharr[18] + "\n" +
                englisharr[28] + "\n" +
                englisharr[35] + "\n" +
                englisharr[39] + "\n" +
                englisharr[42] + "\n" +
                englisharr[45] + "\n" +
                englisharr[46] + "\n" 
                )

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("invoice")
            ctx.reply(
                englisharr[englisharr.length - 2] + "\n" +
                englisharr[45] + "\n" +
                englisharr[46] + "\n" 
                )

        }
        else if(option == "3")
        {
            ctx.data.message.unshift("ticket")
            ctx.reply(
                englisharr[17] + "\n" +
                englisharr[26] + "\n" +
                englisharr[34] + "\n" +
                englisharr[45] + "\n" +
                englisharr[46] + "\n" 
                )
        }
        else if(option == "9")
        {
            ctx.reply(englisharr[5])
            ctx.data.number = null
            ctx.data.message = []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(englisharr[55])
        }
            }
            else
            {
                ctx.data.number = null
                ctx.data.message = []
                ctx.reply(getValue(90,ctx.data.language))
                
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message = []
            ctx.reply(getValue(90,ctx.data.language))
        })
        
        
    }
    else if(ctx.data.message[0] == "registereduser" && ctx.data.language == "hindi")
    {
        TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            if(val.length > 0)
            {
                let option  = ctx.message.text
        if(option == "1")
        {
                ctx.data.message.unshift("booking")
                ctx.reply(
                getValue(7,ctx.data.language)+ "\n" +
                getValue(18,ctx.data.language) + "\n" +
                getValue(28,ctx.data.language) + "\n" +
                getValue(35,ctx.data.language) + "\n" +
                getValue(39,ctx.data.language) + "\n" +
                getValue(42,ctx.data.language) + "\n" +
                getValue(45,ctx.data.language) + "\n" +
                getValue(46,ctx.data.language) + "\n" 
                )

        }
        else if(option == "2")
        {
            ctx.data.message.unshift("invoice")
            ctx.reply(
                getValue(englisharr.length - 2,ctx.data.language)  + "\n" +
                getValue(45,ctx.data.language) + "\n" +
                getValue(46,ctx.data.language)  + "\n" 
                )

        }
        else if(option == "3")
        {
            ctx.data.message.unshift("ticket")
            ctx.reply(
                getValue(17,ctx.data.language) + "\n" +
                getValue(26,ctx.data.language) + "\n" +
                getValue(34,ctx.data.language)+ "\n" +
                getValue(45,ctx.data.language) + "\n" +
                getValue(46,ctx.data.language)  + "\n" 
                )
        }
        else if(option == "9")
        {
            ctx.reply(getValue(5,ctx.data.language))
            ctx.data.number = null
            ctx.data.message = []
            ctx.data.message.unshift("language")
        }
        else 
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(getValue(55,ctx.data.language))
        }  
            }
            else
            {
                ctx.data.number = null
                ctx.data.message = []
                ctx.reply(getValue(90,ctx.data.language))
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message = []
            ctx.reply(getValue(90,ctx.data.language))
        })
      
        
    }
    else if(ctx.data.message[0] == "registereduser" && ctx.data.language == "telegu")
    {
        TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            if(val.length > 0)
            {
                let option  = ctx.message.text
                if(option == "1")
                {
                        ctx.data.message.unshift("booking")
                        ctx.reply(
                        getValue(7,ctx.data.language)+ "\n" +
                        getValue(18,ctx.data.language) + "\n" +
                        getValue(28,ctx.data.language) + "\n" +
                        getValue(35,ctx.data.language) + "\n" +
                        getValue(39,ctx.data.language) + "\n" +
                        getValue(42,ctx.data.language) + "\n" +
                        getValue(45,ctx.data.language) + "\n" +
                        getValue(46,ctx.data.language) + "\n" 
                        )
        
                }
                else if(option == "2")
                {
                    ctx.data.message.unshift("invoice")
                    ctx.reply(
                        getValue(englisharr.length - 2,ctx.data.language)  + "\n" +
                        getValue(45,ctx.data.language) + "\n" +
                        getValue(46,ctx.data.language)  + "\n" 
                        )
        
                }
                else if(option == "3")
                {
                    ctx.data.message.unshift("ticket")
                    ctx.reply(
                        getValue(17,ctx.data.language) + "\n" +
                        getValue(26,ctx.data.language) + "\n" +
                        getValue(34,ctx.data.language)+ "\n" +
                        getValue(45,ctx.data.language) + "\n" +
                        getValue(46,ctx.data.language)  + "\n" 
                        )
                }
                else if(option == "9")
                {
                    ctx.reply(getValue(5,ctx.data.language))
                    ctx.data.number = null
                    ctx.data.message = []
                    ctx.data.message.unshift("language")
                }
                else 
                {
                    ctx.data.number = null
                    ctx.data.message= []
                    ctx.reply(getValue(55,ctx.data.language))
                }
            }
            else
            {
                ctx.data.number = null
                ctx.data.message = []
                ctx.reply(getValue(90,ctx.data.language))
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message = []
            ctx.reply(getValue(90,ctx.data.language))
        })
       
        
    }
    else if(ctx.data.message[0] == "registereduser" && ctx.data.language == "odhissa")
    {
        TelegramUtils.getVehiclesByMobile2(ctx.data.number).then((val)=>{
            if(val.length > 0)
            {
                let option  = ctx.message.text
                if(option == "1")
                {
                        ctx.data.message.unshift("booking")
                        ctx.reply(
                        getValue(7,ctx.data.language)+ "\n" +
                        getValue(18,ctx.data.language) + "\n" +
                        getValue(28,ctx.data.language) + "\n" +
                        getValue(35,ctx.data.language) + "\n" +
                        getValue(39,ctx.data.language) + "\n" +
                        getValue(42,ctx.data.language) + "\n" +
                        getValue(45,ctx.data.language) + "\n" +
                        getValue(46,ctx.data.language) + "\n" 
                        )
        
                }
                else if(option == "2")
                {
                    ctx.data.message.unshift("invoice")
                    ctx.reply(
                        getValue(englisharr.length - 2,ctx.data.language)  + "\n" +
                        getValue(45,ctx.data.language) + "\n" +
                        getValue(46,ctx.data.language)  + "\n" 
                        )
        
                }
                else if(option == "3")
                {
                    ctx.data.message.unshift("ticket")
                    ctx.reply(
                        getValue(17,ctx.data.language) + "\n" +
                        getValue(26,ctx.data.language) + "\n" +
                        getValue(34,ctx.data.language)+ "\n" +
                        getValue(45,ctx.data.language) + "\n" +
                        getValue(46,ctx.data.language)  + "\n" 
                        )
                }
                else if(option == "9")
                {
                    ctx.reply(getValue(5,ctx.data.language))
                    ctx.data.number = null
                    ctx.data.message = []
                    ctx.data.message.unshift("language")
                }
                else 
                {
                    ctx.data.number = null
                    ctx.data.message= []
                    ctx.reply(getValue(55,ctx.data.language))
                }
            }
            else
            {
                ctx.data.number = null
                ctx.data.message = []
                ctx.reply(getValue(90,ctx.data.language))
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message = []
            ctx.reply(getValue(90,ctx.data.language))
        })
       
        
    }
   
    else if(ctx.data.message[0] == "english")
    {
        let number  = ctx.message.text
        ctx.data.language = "english"

        TelegramUtils.isRegisteredUser(number).then((val)=>{
            if(val)
            {
                ctx.data.message.unshift("registereduser")
                ctx.data.number = number
                ctx.reply(englisharr[54]+" \n"+englisharr[6]+" \n"+ englisharr[24] +"\n" + 
                englisharr[27] + "\n"+ englisharr[46])
            }
            else 
            {
                ctx.data.number = null
                ctx.data.message= []
                ctx.reply(englisharr[47])
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(englisharr[47])
        })
     
    }
    else if(ctx.data.message[0] == "hindi")
    {
        let number  = ctx.message.text
        ctx.data.language = "hindi"

        TelegramUtils.isRegisteredUser(number).then((val)=>{
            if(val)
            {
                ctx.data.message.unshift("registereduser")
                ctx.data.number = number
                ctx.reply(hindiarr[54]+" \n"+hindiarr[6]+" \n"+ hindiarr[24] +"\n" + 
                hindiarr[27] + "\n"+ hindiarr[46])
            }
            else 
            {
                ctx.data.number = null
                ctx.data.message= []
                ctx.reply(hindiarr[47])
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(hindiarr[47])
        })
     
    }
    else if(ctx.data.message[0] == "telegu")
    {
        let number  = ctx.message.text
        ctx.data.language = "telegu"

        TelegramUtils.isRegisteredUser(number).then((val)=>{
            if(val)
            {
                ctx.data.message.unshift("registereduser")
                ctx.data.number = number
                ctx.reply(teleguarr[54]+" \n"+teleguarr[6]+" \n"+ teleguarr[24] +"\n" + 
                teleguarr[27] + "\n"+ teleguarr[46])
            }
            else 
            {
                ctx.data.number = null
                ctx.data.message= []
                ctx.reply(teleguarr[47])
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(teleguarr[47])
        })
     
    }
    else if(ctx.data.message[0] == "odhissa")
    {
        let number  = ctx.message.text
        ctx.data.language = "odhissa"

        TelegramUtils.isRegisteredUser(number).then((val)=>{
            if(val)
            {
                ctx.data.message.unshift("registereduser")
                ctx.data.number = number
                ctx.reply(odhissaarr[54]+" \n"+odhissaarr[6]+" \n"+ odhissaarr[24] +"\n" + 
                odhissaarr[27] + "\n"+ odhissaarr[46])
            }
            else 
            {
                ctx.data.number = null
                ctx.data.message= []
                ctx.reply(odhissaarr[47])
            }
        }).catch(()=>{
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(odhissaarr[47])
        })
     
    }

    else if(ctx.data.message[0] == "language")
    {
        let language  = ctx.message.text
        if(language == "1")
        {
            ctx.data.message.unshift("english")
            ctx.reply(englisharr[53])
        }
        else if(language == "2")
        {
            ctx.data.message.unshift("hindi")
            ctx.reply(hindiarr[53])
        }
        else if(language == "3")
        {
            ctx.data.message.unshift("telegu")
            ctx.reply(teleguarr[53])
        }
        else if(language == "4")
        {
            ctx.data.message.unshift("odhissa")
            ctx.reply(odhissaarr[53])
        }
        else
        {
            ctx.data.number = null
            ctx.data.message= []
            ctx.reply(englisharr[55])
        }
    }
    else
    {
        ctx.reply(englisharr[5]  )
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


let englisharr = ["Please enter last four digits of your registered vehicle",
"Please select the vehicle number for this Loading",
"Please select your vehicle number from the list",
"Please select your vehicle number",
"Press 0 to speak to our customer care representative",
"Welcome to TransFly:\n\nPress 1 for English \nहिंदी के लिए 2 दबाएँ । \nతెలుగు కోసం మూడు నొక్కండి \nଓଡ଼ିଆ ପାଇଁ 4 ଦବାନ୍ତୁ।",
"Press 1 for New Loading",
"Press 1 for Vizag Loading",
"Press 1 to book your loading from Balaji Crusher",
"Press 1 to book your loading from KP Mines or Thakurani Mines",
"Press 1 to book your loading from MGM Mines",
"Press 1 to book your loading from NE Mines",
"Press 1 to book your loading from RP Sahu Mines",
"Press 1 to enter vehicle number for which assistance is required",
"Press 1 to enter vehicle number for which Challan info is required",
"Press 1 to enter vehicle number for which Loading is required",
"Press 1 to Load from Joda",
"Press 1 to raise a ticket for vehicle breakdown assistance",
"Press 2 for Gopalpur Loading",
"Press 2 to book your loading from Kalinga Plant",
"Press 2 to book your loading from KMC Mines",
"Press 2 to book your loading from MDH mines",
"Press 2 to book your loading from SN Mohanty mines",
"Press 2 to generate list from the Database",
"Press 2 to know information on last challan cleared status",
"Press 2 to Load from Badbil",
"Press 2 to raise a ticket for vehicle accident assistance",
"Press 3 for On-Road Assistance",
"Press 3 for Paradip Loading",
"Press 3 to book your loading from AMTC mines",
"Press 3 to book your loading from Essar Plant",
"Press 3 to book your loading from KJS Ahluwalia mines",
"Press 3 to book your loading from KN Ram mines",
"Press 3 to Load from Rugudi",
"Press 3 to raise a ticket for any other onroad assistance",
"Press 4 for Haldia Loading",
"Press 4 to book your loading from D-top mines",
"Press 4 to book your loading from Geetarani mines",
"Press 4 to Load from Koida",
"Press 5 for Raigarh Loading",
"Press 5 to book your loading from JN Pattnaik Mines",
"Press 5 to Load from Jamda",
"Press 6 for Raipur Loading",
"Press 6 to book your loading from Essel Minings",
"Press 7 to book your loading from PTA mines",
"Press 8 to go to Previous Menu",
"Press 9 to go back to main menu",
"Sorry, the number is not registered. Please register on our app or speak to customer care: \nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n18002702356.\n\nPress any key to continue",
"Thank you, information has been sent to your registred mobile number. Press any key to continue",
"Thank you, our emergency response team will soon get in touch with you. Press any key to continue",
"Thank you, please hold on while we get the list of your registred vehicles. Press any key to continue",
"Thank you, your booking has been received. Press any key to continue",
"The mentioned number did not match. Press any key to continue",
"Please type your registered mobile number",
"Select from the following options",
"The selected option seems not to be available/valid for now, please try another option.",
"BARBIL",
"JAMDA",
"JODA",
"KOIRA",
"RUGUDI",
"KP MINES",
"KALINGA PLANT",
"KN RAM MINES",
"BALAJI CRUSHER",
"MGM",
"KMC MINES",
"ESSAR PLANT",
"NE MINES",
"NE Mines ORAGHAT",
"SN MOHANTY",
"AMTC/JSW",
"GEETARANI",
"JN PATTNAIK MINES",
"ESSEL MININGS",
"PTA MINES",
"RP SAHU",
"MDH",
"KJS AHLUWALIA",
"D-TOP",
"VIZAG",
"PARADIP",
"GOPALPUR",
"RAIGARH",
"RAIPUR",
"HALDIA",
"Vehicle Breakdown",
"Vehicle Accident",
"Other On-Road Support",
"Loading Problem",
"Kindly register the vehicles through Transfly app.\nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n\nPress any key to continue",
"Press 1 to continue to Challan and Invoice information",
"Here is the best match currently, please select from the below options to proceed:"
]


let hindiarr = 
[
    "कृपया अपने रजिस्टर्ड वाहन के लास्ट चार नंबर एंटर करें।",
"कृपया इस लोडिंग के लिए अपना वाहन सिलेक्ट करें।",
"कृपया सूचि में से अपना वाहन सिलेक्ट करें।",
"कृपया अपना वाहन सिलेक्ट करें।",
"कस्टमर केयर रेप्रेज़ेंटेटिव से बात करने के लिए 0 दबाएँ।",
"Welcome to TransFly:\n\nPress 1 for English \nहिंदी के लिए 2 दबाएँ । \nతెలుగు కోసం మూడు నొక్కండి \nଓଡ଼ିଆ ପାଇଁ 4 ଦବାନ୍ତୁ।",
"नयी लोडिंग के लिए 1 दबाएँ। ",
"वाईज़ैग लोडिंग के लिए 1 दबाएँ।",
"बालाजी क्रशर से लोड करने के लिए 1 दबाएँ। ",
"के पी माइन या ठकुरानी माइन से लोडिंग करने के लिए 1 दबाएँ।",
"एम् जी एम् माइन से लोडिंग करने के लिए 1 दबाएँ।",
"एन ई माइन से लोड करने के लिए 1 दबाएँ।",
"आर पी साहू माइन से लोड करने के लिए 1 दबाएँ।",
"जिस वाहन के लिए सहायता चाहते हैं उसका नंबर एंटर करने के लिए 1 दबाएँ।" ,
"जिस वाहन की चालान सूचना जानना चाहते हैं उसका नंबर एंटर करने के लिए 1 दबाएँ।",
"जिस गाड़ी के लिए लोडिंग चाहिए उसका नंबर एंटर करने लिए 1 दबाएँ।",
"जोड़ा से लोड करने के लिए 1 दबायें।",
"वाहन खराबी (ब्रेकडॉऊन) सहायता के लिए 1 दबाएँ।",
"गोपालपुर लोडिंग के लिए 2 दबाएँ।",
"कलिंगा प्लांट से लोड करने के लिए 2 दबाएँ।",
"के एम् सी माइंस से लोडिंग करने के लिए 2 दबाएँ।", 
"एम् डी एच माइन से लोड करने के लिए 2 दबाएँ।",
"एस एन मोहंती माइन से लोड करने के लिए 2 दबाएँ।",
"सिस्टम से आपके रजिस्टर किये हुए वाहनों की लिस्ट के लिए 2 दबाएँ।",
"आपके लास्ट क्लियर किये गए चालान की सूचना के लिए 2 दबाएँ। ",
"बड़बिल से लोड करने के लिए 2 दबाएँ।",
"वाहन दुर्घटना (एक्सीडेंट) सहायता के लिए 2 दबाएँ।",
"ऑन-रोड सहायता के लिए 3 दबाएँ।",
"पारादीप लोडिंग के लिए 3 दबाएँ।",
"ऐ एम् टी सी माइन से लोड करने के लिए 3 दबाएँ।",
"ऐस आर प्लांट से लोडिंग के लिए 3 दबाएँ।",
"के जे ऐस आहलुवालीआ माइन से लोड करने के लिए 3 दबाएँ।",
"के एन राम माइन से लोड करने के लिए 3 दबाएँ।",
"रुगुड़ी से लोड करने के लिए 3 दबाएँ।",
"किसी भी अन्य प्रकार की ऑन-रोड सहायता के लिए ३ दबाएँ।",
"हल्दीआ लोडिंग के लिए 4 दबाएँ।",
"डी-टॉप माइन से लोड करने के लिए 4 दबाएँ।",
"गीतारानी माइन से लोड करने के लिए 4 दबाएँ।",
"कोईडा से लोड करने के लिए 4 दबाएँ।",
"रायगढ़ लोडिंग के लिए 5 दबाएँ।",
"जे एन पटनायक माइन से लोड करने के लिए 5 दबाएँ।",
"जामदा से लोड करने के लिए 5 दबाएँ।",
"रायपुर लोडिंग के लिए 6 दबाएँ।",
"एस्सेल माईनिंग्स से लोड करने के लिए 6 दबाएँ।",
"पी टी ऐ माइन से लोड करने के लिए 7 दबाएँ।",
"पिछले मेनू में जाने के लिए 8 दबाएँ।",
"मेन मेनू में जाने के लिए 9 दबाएँ।",
"माफ़ कीजिये, यह नंबर रजिस्टर्ड नहीं है। कृपया हमारे ऐप्प पर या कस्टमर केयर से बात करके नंबर रजिस्टर करें।\nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n18002702356.\n\nकृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|",
"धन्यवाद, सूचना आपके रजिस्टर्ड मोबाइल नंबर पर भेजी जा चुकी है। कृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|",
"धन्यवाद, हमारी ऐमरजेंसी रेस्पॉन्स टीम आपको जल्द ही कॉन्टैक्ट करेगी। कृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|", 
"कृपया प्रतीक्षा करें, हम आपके रजिस्टर किये हुए वाहनों की लिस्ट सिस्टम से निकाल रहे है। कृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|",
"धन्यवाद, आपकी बुकिंग रिसीव कर ली गयी है। कृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|",
"आपके द्वारा ऐंटर किया गया नंबर मैच नहीं हुआ। कृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें|", 
"कृपया अपना रजिस्टर्ड मोबाइल नंबर एंटर करें। ",
"कृपया अपना ऑप्शन सेलेक्ट करें। ",
"सेलेक्ट किया गया ऑप्शन उपलब्ध / मान्य नहीं है, कृपया अन्य ऑप्शन का चयन करें",
"बड़बिल",
"जामदा ",
"जोड़ा ",
"कोइड़ा",
"रुगुड़ी",
"के पी माईन्स (ठकुरानी)",
"कलिंगा प्लांट",
"के एन राम माईन्स",
"बालाजी क्रशर",
"एम् जी एम्",
"के एम् सी माईन्स ",
"एस आर प्लांट ",
"एन ई माईन्स ",
"एन ई माईन्स ओराघाट ",
"एस एन मोहंती ",
"ए एम् टी सी/जे एस डब्ल्य ू ",
"गीतारानी ",
"जे एन पटनायक माईन्स ",
"एस्सेल माईनिंग्स ",
"पी टी ए माईन्स ",
"आर पी साहू ",
"एम् डी एच ",
"के जे एस आहलुवालिआ ",
"डी-टॉप ",
"वाईज़ैग ",
"पारादीप ",
"गोपालपुर ",
"राईगढ़ ",
"राईपुर ",
"हल्दीआ ",
"वाहन खराबी ",
"वाहन एक्सीडेंट ",
"अन्य ऑन-रोड़ सहायता ",
"लोडिंग प्रॉब्लम ",
"कृपया ट्रांसफ्लाय ऐप्प पर अपने वाहनों का रजिस्ट्रेशन करें| \nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n\nकृपया आगे बढ़ने के लिए कोई भी अक्षर टाइप करें| ",
"चलान तथा इनवॉइस जानकारी के लिए 1 दबाएँ",
"वर्तमान में यह सबसे निकटतम मैच है, कृपया आगे बढ़ने के लिए नीचे दिए गए विकल्पों में से चुनें:"



]

let teleguarr = [
   " దయచేసి మీ రిజిస్టర్డ్ వెహికిల్ యొక్క చివరి నాలుగు అంకెలు ఎంటర్ చేయండి ",
"దయచేసి ఈ లోడింగ్ కోసం వెహికల్ నెంబర్ ఎంచుకోండి ",
"దయచేసి జాబితా నుండి మీ వెహికల్ నెంబర్ ఎంచుకోండి ",
"దయచేసి మీ వెహికల్ నెంబర్ ఎంచుకోండి ",
 "మా కస్టమర్ కేర్ ప్రతినిధితో మాట్లాడడానికి సున్న నొక్కండి ",
"Welcome to TransFly:\n\nPress 1 for English \nहिंदी के लिए 2 दबाएँ । \nతెలుగు కోసం మూడు నొక్కండి \nଓଡ଼ିଆ ପାଇଁ 4 ଦବାନ୍ତୁ।",
"కొత్త లోడింగ్ కోసం ఒకటి నొక్కండి ",
"వైజాగ్ లోడింగ్ కోసం ఒకటి నొక్కండి ",
"బాలాజీ క్రషర్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి ఒకటి నొక్కండ ి  ",
"కె.పి మైన్స్ లేదా ఠాకురాణి మైన్స్  నుండి మీ లోడింగ్  బుక్ చేసుకోవడానికి ఒకటి నొక్కండి ",
"ఎం  జి ఎం మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి ఒకటి నొక్కండి  ",
"ఎన్ ఈ  మైన్స్ నుండి  మీ లోడింగ్ బుక్ చేసుకోవడానికి ఒకటి నొక్కండి  ",
"ఆర్ పి సాహూ మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి ఒకటి నొక్కండి  ",
"సహాయం అవసరమయ్యే వెహికల్ నెంబర్ నమోదు చేయడానికి  ఒకటి నొక్కండి  ",
"చలాన్ వివరాలు అవసరమయ్యే వెహికల్ నెంబర్ నమోదు చేయడానికి  ఒకటి నొక్కండి ", 
"లోడింగ్ అవసరమయ్యే వెహికల్ నెంబర్ నమోదు చేయడానికి ఒకటి నొక్కండి ",
"జోడ నుంచి లోడ్ చేయడానికి ఒకటి నొక్కండి ",
"వెహికల్ బ్రేక్ డౌన్ సహాయం కోసం ఒకటి నొక్కండి",
"గోపాల్‌పూర్ లోడింగ్ కోసం రెండు నొక్కండి ",
"కళింగ  ప్లాంట్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి రెండు నొక్కండి ",
"కె ఎం సి మైన్స్  నుండి  మీ లోడింగ్ బుక్ చేసుకోవడానికి రెండు నొక్కండి ",
"ఎం డి హెచ్ మైన్స్  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి రెండు నొక్కండి ",
"ఎస్ ఎన్ మొహంతి మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి రెండు నొక్కండి ",
"డేటాబేస్ నుండి లిస్ట్  రూపొందించడానికి  రెండు నొక్కండి ",
"చివరి చలాన్ క్లియర్ చేసిన స్థితిపై వివరాలు తెలుసుకోవడానికి రెండు నొక్కండి ",
"బర్‌బిల్ నుంచి లోడ్ చేయడానికి రెండు నొక్కండి ",
"వెహికల్ యాక్సిడెంట్ సహాయం కోసం రెండు నొక్కండి ",
"ఆన్ రోడ్ సహాయం కోసం మూడు నొక్కండి ",
"పారాదీప్ లోడింగ్ కోసం మూడు నొక్కండి ",
"AMTC మైన్స్ నుండి  మీ లోడింగ్ బుక్ చేసుకోవడానికి మూడు నొక్కండి ",
"ఎస్సార్ ప్లాంట్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి మూడు నొక్కండి ",
"కే‌జే‌ఎస్ అహ్లువాలియా మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి మూడు నొక్కండి",
"కెన్ రాం మైన్స్ నుండి  మీ లోడింగ్ బుక్ చేసుకోవడానికి మూడు నొక్కండి ",
"రుగుడి  నుంచి లోడింగ్ చేయడానికి మూడు నొక్కండి ",
"రహదారి  సహాయం కోసం మరేదైనా మూడు నొక్కండి ",
"హల్దియా లోడింగ్ కోసం నాలుగు నొక్కండి ",
"డి టాప్ మైన్స్  నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి నాలుగు నొక్కండి ",
"గీతారాణి మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి నాలుగు నొక్కండి ",
"కోయిడా నుండి లోడింగ్ చేయడానికి నాలుగు నొక్కండి ",
"రాయ్‌గర్ లోడింగ్ కోసం ఐదు నొక్కండి ",
"జెన్ పాట్నాయక్ మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి ఐదు నొక్కండి ",
"జంధ నుంచి లోడ్ చేయడానికి ఐదు నొక్కండి",
"రాయ్‌పుర్ లోడింగ్ కోసం ఆరు నొక్కండి ",
"ఎసెల్ మైనింగ్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి ఆరు నొక్కండ ి ",
"PTA  మైన్స్ నుండి మీ లోడింగ్ బుక్ చేసుకోవడానికి ఏడు నొక్కండి ",
"మునుపటి మెనుకు వెళ్లడానికి ఎనిమిది నొక్కండి ",
"మెయిన్ మెనుకు వెళ్లడానికి  తొమ్మిది నొక్కండి ",
"క్షమించండి, ఈ నెంబర్ రిజిస్టర్ కాలేదు. దయచేసి మా యాప్ లో రిజిస్టర్ చేయండి లేదా కస్టమర్ కేర్ తో మాట్లాడండి|\nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n18002702356.\n\nకొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి|",
"ధన్యవాదం మీ రిజిస్టర్డ్ మొబైల్  నెంబర్‌కు సమాచారం  పంపబడినది| కొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి| ",
"ధన్యవాదం మా ఎమర్జెన్సీ ప్రతిస్పందన బృందం త్వరలో మీతో సంప్రదిస్తారు| కొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి| ", 
"ధన్యవాదం దయచేసి వేచి ఉండండి మీ రిజిస్టర్డ్ వెహికల్స్ జాబితాలు మేము పొందు పరిచాము| కొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి| ",
"ధన్యవాదం  మీ బుకింగ్ మాకు అందినది| కొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి| ",
"ఎంటర్ చేసిన నెంబర్ మ్యాచ్  అవలేదు| కొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి| ",
"దయచేసి మీ రిజిస్టర్డ్ మొబైల్ నంబర్‌ను ఎంటర్ చేయండ ి ",
"దయచేసి మీ ఆప్షన్ సెలెక్ట్ చేయండి ",
"ఎంచుకున్న ఎంపిక అందుబాటులో లేదు / చెల్లుబాటు కాదు, దయచేసి మరొక ఎంపికను ఎంచుకోండి.",
"బర్‌బిల్ ",
"జంధ ",
"జోడ ",
"కోయిడా ",
"రుగుడి  ",
"కె.పి మైన్స్ (ఠాకురాణి) ",
"కళింగ  ప్లాంట్ ",
"కెన్ రాం మైన్స్  ",
"బాలాజీ క్రషర ్ ",
"ఎం  జి ఎం మైన్స్",
"కె ఎం సి మైన్స్ ",
"ఎస్సార్ ప్లాంట్ ",
"ఎన్ ఈ  మైన్స ్",
"ఎన్ ఈ  మైన్స్ ఒరఘాట్",
"ఎస్ ఎన్ మొహంతి మైన్స్",
"AMTC/JSW మైన్స్",
"గీతారాణి మైన్స్",
"జెన్ పాట్నాయక్ మైన్స్",
"ఎసెల్ మైనింగ్స్ ",
"PTA  మైన్స్",
"ఆర్ పి సాహూ మైన్స్",
"ఎం డి హెచ్ మైన్స్ ",
"కే‌జే‌ఎస్ అహ్లువాలియా మైన్స్",
"డి టాప్ మైన్స్ ",
"వైజాగ్ ",
"పారాదీప్",
"గోపాల్‌పూర్",
"రాయ్‌గర్",
"రాయ్‌పుర్",
"హల్దియా",
"వెహికల్ బ్రేక్ డౌన్",
"వెహికల్ యాక్సిడెంట్ ",
"ఇతర రహదారి  సహాయం",
"లోడింగ్ ప్రాబ్లెమ్",
"దయచేసి ట్రాన్స్ ఫ్లై యాప్ ద్వారా వాహనాలను రిజిస్ట్రేషన్ చేయండి| \nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n\nకొనసాగడానికి దయచేసి ఏదైనా అక్షరాన్ని టైప్ చేయండి|",
"చల్లాన్ మరియు ఇన్వాయిస్స సమాచారం కోసం 1 నొక్కండి",
"ఇది ప్రస్తుతం దగ్గరి మ్యాచ్, దయచేసి కొనసాగడానికి క్రింది ఎంపికల నుండి ఎంచుకోండి:"


]


let odhissaarr = [
   " ଦୟାକରି ରେଜିଷ୍ଟର ହୋଇଥିବା ଗାଡି ର ଲାଷ୍ଟ ଚାରୋଟି ଡିଜିଟ୍ ଏଣ୍ଟର କରନ୍ତୁ।",
   "ଦୟାକରି ଏହି ଲୋଡିଂ କରିବା ପାଇଁ ଆପଣଙ୍କ ଗାଡି ନମ୍ବର ସିଲେକ୍ଟ କରନ୍ତୁ। ",
   "ଦୟାକରି ଲିଷ୍ଟ ରୁ ଆପଣଙ୍କର ଗାଡି ନମ୍ବର ସିଲେକ୍ଟ କରନ୍ତୁ। ",
   "ଦୟାକରି ଆପଣଙ୍କର ଗାଡି ସିଲେକ୍ଟ କରନ୍ତୁ। ",
   "କଷ୍ଟମର୍ କେଆର ସହିତ କଥା ହେବା ପାଇଁ 0 ଦବାନ୍ତୁ। ",
   "Welcome to TransFly:\n\nPress 1 for English \nहिंदी के लिए 2 दबाएँ । \nతెలుగు కోసం మూడు నొక్కండి \nଓଡ଼ିଆ ପାଇଁ 4 ଦବାନ୍ତୁ।",
   "ନୂଆ ଲୋଡିଂ କରିବା ପାଇଁ ଏକ ଦବାନ୍ତୁ।",
   "ଭାଇଯ୍ୟାଗ୍ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ।",
   "ବାଲାଜୀ କ୍ରସର ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ।",
   "କେପି ମାଇନ୍ସ କିମ୍ବା ଠାକୁରାଣୀ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଏମ୍ ଜି ଏମ୍ ମାଇନ୍ସ ରୁ  ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଏନ୍ଇ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଆର୍ ପି ସାହୁ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଯେଉଁ ଗାଡି ପାଇଁ ସହାୟତା ଚାହୁଁଛନ୍ତି, ସେହି ନମ୍ବର ଏଣ୍ଟର କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଯେଉଁ ଗାଡ଼ି ର ଚାଲାଣ ସୂଚନା ଜାଣିବା ପାଇଁ ଚାହୁଁଛନ୍ତି ତାର ନମ୍ବର ଏଣ୍ଟର କରିବା ପାଇଁ ଏକ ଦବାନ୍ତୁ। ",
   "ଗାଡି ନମ୍ବର ଏଣ୍ଟର କରି ଲୋଡିଙ୍ଗ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଯୋଡା ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 1 ଦବାନ୍ତୁ।",
   "ଗାଡ଼ି ଖରାପ୍ ସହାୟତା ପାଇଁ 1 ଦବାନ୍ତୁ। ",
   "ଗୋପାଳପୁର ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 2 ଦବାନ୍ତୁ।",
   "କଳିଙ୍ଗ ପ୍ଲାଣ୍ଟ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "କେ ଏମ୍ ସି ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "ଏମ୍ ଡି ଏଚ୍ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "ଏସ ଏନ୍ ମହାନ୍ତି ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "ଡାଟାବେସ୍ ରୁ ଆପଣଙ୍କ ରେଜିଷ୍ଟର ହୋଇଥିବା ଗାଡ଼ି ର ଲିଷ୍ଟ ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "ଆପଣଙ୍କର ପୂର୍ବ କ୍ଲିଅରିଙ୍ଗ ଚାଲାଣ ସମ୍ବନ୍ଧରେ ଜାଣିବା ପାଇଁ 2 ଦବାନ୍ତୁ।",
   "ବଡ଼ବିଲ ରୁ ଲୋଡିଂ ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "କୌଣସି ଯାନ ଦୁର୍ଘଟଣା ରେ ସହାୟତା ପାଇଁ 2 ଦବାନ୍ତୁ। ",
   "ଅନ- ରୋଡ ସହାୟତା ପାଇଁ ଦୟାକରି 3 ଦବାନ୍ତୁ। ",
   "ପାରାଦ୍ଵୀପ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 3 ଦବାନ୍ତୁ।",
   "ଏଏମ୍ ଟିସି ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 3 ଦବାନ୍ତୁ। ",
   "ଏସାର ପ୍ଲାଣ୍ଟ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 3 ଦବାନ୍ତୁ। ",
   "କେ ଜେ ଏସ୍ ଆହ୍ଲୁୱାଲିଆ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 3 ଦବାନ୍ତୁ। ",
   "କେ ଏନ୍ ରାମ ମାଇନ୍ସ ରୁ  ଲୋଡିଂ କରିବା ପାଇଁ 3 ଦବାନ୍ତୁ।",
   "ରୁଗୁଡ଼ି ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 3 ଦବାନ୍ତୁ। ",
   "ବାକି ସବୁ ଅନ- ରୋଡ ସହାୟତା ପାଇଁ 3 ଦବାନ୍ତୁ। ", 
   "ହଳଦିଆ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 4 ଦବାନ୍ତୁ।",
   "ଡି- ଟପ୍ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 4 ଦବାନ୍ତୁ। ",
   "ଗୀତାରାନି ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 4 ଦବାନ୍ତୁ। ",
   "କୋଇଡା ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 4 ଦବାନ୍ତୁ। ",
   "ରାଏଗଡ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 5 ଦବାନ୍ତୁ।",
   "ଜେ ଏନ୍ ପଟ୍ଟନାୟକ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 5 ଦବାନ୍ତୁ। ",
   "ଜାମଦା ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 5 ଦବାନ୍ତୁ। ",
   "ରାୟପୁର ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 6 ଦବାନ୍ତୁ। ",
   "ଏସେଲ୍ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 6 ଦବାନ୍ତୁ। ",
   "ପିଟିଏ ମାଇନ୍ସ ରୁ ଲୋଡିଂ କରିବା ପାଇଁ 7 ଦବାନ୍ତୁ। ",
   "ପୂର୍ବ ମେନ୍ୟୁ କୁ ଯିବା ପାଇଁ 8 ଦବାନ୍ତୁ। ",
   "ମେନ୍ ମେନ୍ୟୁ କୁ ଯିବାପାଇଁ 9 ଦବାନ୍ତୁ। ",
   "କ୍ଷମା କରିବେ, ଏହି ନମ୍ବର ରେଜିଷ୍ଟର ନାହିଁ। ଦୟାକରି ଆମ ଆପ ରେ କିମ୍ବା କଷ୍ଟମର୍ କେଆର ସହିତ କଥା ହୋଇ ନମ୍ବର ରେଜିଷ୍ଟର କରନ୍ତୁ।\nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n18002702356.\n\nଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|",
   "ଧନ୍ୟବାଦ୍, ସୂଚନାଟି ଆପଣଙ୍କର ରେଜିଷ୍ଟର ମୋବାଇଲ ନମ୍ବର କୁ ପଠା ଯାଇଛି। ଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ| ",
   "ଧନ୍ୟବାଦ୍, ଆମର ଏମର୍ଜେନ୍ସୀ ରେସ୍ପନ୍ସ ଟିମ୍ ଆପଣଙ୍କୁ ଶୀଘ୍ର ସମ୍ପର୍କ କରିବେ। ଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|",
   "ଧନ୍ୟବାଦ୍, ଦୟାକରି ଅପେକ୍ଷା କରନ୍ତୁ। ଆମେ ଆପଣଙ୍କର ରେଜିଷ୍ଟର କରାହେଇଥିବା ଗାଡ଼ି ଗୁଡ଼ି କୁ ଲିଷ୍ଟ ସିଷ୍ଟମ୍ ରୁ ବାହାର କରୁଛୁ। ଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|",
   "ଧନ୍ୟବାଦ୍, ଆପଣଙ୍କର ବୁକିଙ୍ଗ ରିସିଭ ହୋଇଯାଇଛି। ଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|",
   "କ୍ଷମା କରିବେ, ଆପଣଙ୍କ ଦ୍ଵାରା ଦିଆ ହୋଇଥିବା ନମ୍ବର ମ୍ୟାଚ୍ କରୁନାହିଁ। ଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|",
   "ଦୟାକରି ଆପଣଙ୍କର ରେଜିଷ୍ଟର ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ | ",
   "ଦୟାକରି ଆପଣଙ୍କର ବିକଳ୍ପ ଚୟନ କରନ୍ତୁ ",
   "ମନୋନୀତ ବିକଳ୍ପଟି ଉପଲବ୍ଧ ନାହିଁ/ ବୈଧ ନୁହେଁ, ଦୟାକରି ଅନ୍ୟ ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ | ",
   "ବଡ଼ବିଲ ",
   "ଜାମଦା ",
   "ଯୋଡା ",
   "କୋଇଡା ",
   "ରୁଗୁଡ଼ି ",
   "କେପି ମାଇନ୍ସ (ଠାକୁରାଣୀ) ",
   "କଳିଙ୍ଗ ପ୍ଲାଣ୍ଟ ",
   "କେ ଏନ୍ ରାମ ମାଇନ୍ସ ",
   "ବାଲାଜୀ କ୍ରୁସର ",
   "ଏମ୍ ଜି ଏମ୍ ମାଇନ୍ସ ",
   "କେ ଏମ୍ ସି ମାଇନ୍ସ ",
   "ଏସାର ପ୍ଲାଣ୍ଟ ",
   "ଏନ୍ଇ ମାଇନ୍ସ ",
   "ଏନ୍ଇ ମାଇନ୍ସ ଓରାଘାଟ ",
   "ଏସ ଏନ୍ ମହାନ୍ତି ମାଇନ୍ସ ",
   "AMTC/JSW ମାଇନ୍ସ  ",
   "ଗୀତାରାନି ମାଇନ୍ସ ",
   "ଜେ ଏନ୍ ପଟ୍ଟନାୟକ ମାଇନ୍ସ ",
   "ଏସେଲ୍ ମାଇନିଂସ୍ ",
   "ପିଟିଏ ମାଇନ୍ସ ",
   "ଆର୍ ପି ସାହୁ",
   "ଏମ୍ ଡି ଏଚ୍ ମାଇନ୍ସ",
   "କେ ଜେ ଏସ୍ ଆହ୍ଲୁୱାଲିଆ ମାଇନ୍ସ ",
   "ଡି- ଟପ୍ ମାଇନ୍ସ ",
   "ଭାଇଯ୍ୟାଗ୍ ",
   "ପାରାଦ୍ଵୀପ ",
   "ଗୋପାଳପୁର ",
   "ରାଏଗଡ ",
   "ରାୟପୁର ",
   "ହଳଦିଆ ",
   "ଗାଡ଼ି ଖରାପ୍ ",
   "ବାହନ ଦୁର୍ଘଟଣା ",
   "ବାକି ସବୁ ଅନ- ରୋଡ ସହାୟତା ",
   "ଲୋଡିଂ ପ୍ରୋବଲମ୍ ",
   "ଦୟାକରି ଟ୍ରାନ୍ସଫ୍ଲାଏ ଆପ୍ ମାଧ୍ୟମରେ ଯାନଗୁଡ଼ିକୁ ପଞ୍ଜିକରଣ କରନ୍ତୁ: Odia| \nhttps://play.google.com/store/apps/details?id=com.truck.transfly \n\nଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ଯେକୌଣସି ଅକ୍ଷର ଟାଇପ୍ କରନ୍ତୁ|",
   " ଚାଲାଣ ଏବଂ ଇନଭଏସ୍ ସୂଚନା କରିବାକୁ 1 ଦବାନ୍ତୁ|",
   "ଏହା ସମ୍ପ୍ରତି ନିକଟତମ ମ୍ୟାଚ୍, ଅଗ୍ରଗତି କରିବାକୁ ଦୟାକରି ନିମ୍ନରେ ଥିବା ବିକଳ୍ପଗୁଡିକରୁ ବାଛନ୍ତୁ:"


]

function getNumber(text)
{
    return englisharr.indexOf(text.toUpperCase())
}



function getValue(index,language)
{
    if(language == "english")
    {
        return englisharr[index]
    }
    else if(language == "hindi")
    {
        return hindiarr[index]
    }
    else if(language == "telegu")
    {
        return teleguarr[index]
    }
    else 
    {
        return odhissaarr[index]
    }
}


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))