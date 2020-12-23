// const {nanoid} = require('nanoid')


// // const mySchema = new Schema({
// //     _id: {
// //       type: String,
// //       default: () => nanoid()
// //     }
// //   })


//   console.log(nanoid())


// //   import { nanoid } from 'nanoid/async'

// // async function createUser () {
// //   user.id = await nanoid()
// // }

// const { customAlphabet }  =  require('nanoid/async')
// const nanoid = customAlphabet('1234567890', 10)
// async function createUser () {
//   let value = await nanoid()
//   console.log(value)
// }

const { customAlphabet }  =  require('nanoid')
const nanoid = customAlphabet('1234567890', 10)
 function createUser2 () {
  let value = nanoid()
  console.log(parseInt(value))
}

createUser2()