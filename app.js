const fs = require('fs');
const os = require('os');
const argv = require('yargs').argv;
const rlSync = require('readline-sync');
const chalk = require('chalk');
const gstring = require('gradient-string');

let pad_ = () => {
  let st = '';
  for(let i = 0; i < (process.stdout.columns/2 -4); i++){
    st += '_';
  }
  return st;
}
let head_str = pad_() + 'devLog' + pad_() + '\n';
console.log(gstring.atlas(head_str));

let file = null, dev = {};
//open file to read
if(!fs.existsSync('devlog.json')){
  console.log(chalk.underline('Setup'));
  //Get basic data about user
  //Name
  console.log('What is your full name?');
  dev.name = rlSync.prompt();
  //Organization
  console.log('Which organization do you work for?');
  dev.organization = rlSync.prompt();
  //Designation
  console.log('What is your designation?');
  dev.designation = rlSync.prompt();
  //Email
  console.log('What is your email address?');
  dev.email = rlSync.questionEMail();
  fs.writeFileSync('devlog.json', JSON.stringify(dev));
}
else {
  dev = JSON.parse(fs.readFileSync('devlog.json'));
}

if(argv.add || argv.a){
  console.log('Enter the description of task completed:');
  let desc = rlSync.prompt();
  let dt = new Date();
  if(!dev[dt.toDateString()]){
    dev[dt.toDateString()] = [];
  }
  dev[dt.toDateString()].push({
    'time': dt.toString(),
    'description': desc,
  });
  fs.writeFileSync('devlog.json', JSON.stringify(dev))
}
else if(argv.help ||argv.h){
  console.log('Use --add or -a to add tasks to the log. --help or -h for help');
}
else{
  console.log('Invalid use of argument. Use --help or -h for help');
}
