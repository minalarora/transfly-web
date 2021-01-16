const {Telegraf} = require('telegraf')
const LocalSession = require('telegraf-session-local')

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
    return next()
  })


bot.start((ctx)=>{
       
    ctx.reply("Welcome to Transfly Bot")
}
)




bot.on('text',(ctx)=>{
    if(ctx.data.message[0] == "number")
    {
        let usernumber  = ctx.message.text
        if(usernumber == "8871748278")
        {
            ctx.data.message.unshift("registereduser")
            //add ctx.chat.id to user field
            // ctx.chat.id
            // bot.telegram.sendMessage(ctx.chat.id,"yes")
            ctx.reply("Select the following options: \n 1. New Booking \n 2. Complaint/Enquiry ")
        }
        else
        {
            
            ctx.reply("Mobile number not found! Please try again")
        }

    }
    else if(ctx.data.message[0] == "registereduser")
    {
        let number  = ctx.message.text
        if(number == "1")
        {

        }
        else if(number == "2")
        {

        }
        else 
        {
            ctx.reply("Please select a valid option")
        }
    }
    else
    {
        ctx.reply("Hello user, Please tell me your registerd mobile number?")
        ctx.data.message = []
        ctx.data.message.unshift("number")
    }
})
//bot.telegram.sendMessage("1265825981","hello")
bot.use((ctx)=>{
    ctx.data.message = []   
    ctx.reply("At the end, I'm just a bot. Don't do anything that I can't understand")
}
)

bot.launch()