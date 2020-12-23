// var cron = require('node-cron');
 
// cron.schedule(' * * *', () => {
//     console.log('running a task every day');
//   });





var CronJob = require('cron').CronJob

const job = new CronJob('00 30 18 * * *', async function() {
	const d = new Date();
	console.log('Midnight:', d);
}, null,true,'UTC');

job.start();