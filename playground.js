// const {Telegraf} = require('telegraf')
// const LocalSession = require('telegraf-session-local')

// const bot = new Telegraf('1596154496:AAF0DedWgR0WCCKRNhK-o2LWAbt6wDm3XvI')


// const property = 'data'

// const localSession = new LocalSession({
//   // Database name/path, where sessions will be located (default: 'sessions.json')
//   database: 'example_db.json',
//   // Name of session property object in Telegraf Context (default: 'session')
//   property: 'session',
//   // Type of lowdb storage (default: 'storageFileSync')
//   storage: LocalSession.storageFileAsync,
//   // Format of storage/database (default: JSON.stringify / JSON.parse)
//   format: {
//     serialize: (obj) => JSON.stringify(obj, null, 2), // null & 2 for pretty-formatted JSON
//     deserialize: (str) => JSON.parse(str),
//   },
//   // We will use `messages` array in our database to store user messages using exported lowdb instance from LocalSession via Telegraf Context
 
// })

// // Wait for database async initialization finished (storageFileAsync or your own asynchronous storage adapter)
// localSession.DB.then(DB => {
//   // Database now initialized, so now you can retrieve anything you want from it
 
//   // console.log(DB.get('sessions').getById('1:1').value())
// })

// // Telegraf will use `telegraf-session-local` configured above middleware with overrided `property` name
// bot.use(localSession.middleware(property))




// bot.use((ctx, next) => {
//         ctx.state.role = ctx.message
//         ctx.data.name = "SD"
//         if(ctx.data.message)
//         {
//         ctx.data.message.unshift(ctx.message.text)
//         }
//         else 
//         {
//                 ctx.data.message = []
//                 ctx.data.message.unshift(ctx.message.text) 
//         }
//         return next()
//       })


// bot.start((ctx)=>{
       
//         ctx.reply("Hello Minaal Arora start")
// }
// )

// bot.help((ctx)=>{
       
//         ctx.reply("Hello Minaal Arora help")
// }
// )

// bot.hears('Hi',(ctx)=>{
//         ctx.reply("hello")
// })

// bot.hears('copy',(ctx)=>{
//         ctx.reply(ctx.message.text)
// })


// bot.hears('who',(ctx)=>{
//      //   ctx.reply(ctx.message.from.username)
//      ctx.reply('not working')
// })

// bot.on('text',(ctx)=>{
//         // ctx.session.counter = ctx.session.counter || 0
//         // ctx.session.counter++
//         // ctx.reply("text message" + ctx.session.counter)
//         console.log("session",ctx.data)
//         console.log("state",ctx.state.role)
// })

// bot.use((ctx)=>{
       
//         ctx.reply("Hello Minaal Arora")
// }
// )

// bot.launch()

let arr= []

console.log(1 =="1")