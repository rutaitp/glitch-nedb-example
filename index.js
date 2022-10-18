//1. setup express server
let express = require('express');
let app = express();

//nedb
let Datastore = require('nedb');
let db = new Datastore('messages.db');
db.loadDatabase();

//1.2first route
// app.get('/', (req, res)=>{
//   res.send('The main page');
// });

//Data array
let messages = [
  {
    message: "This is the first chirp message",
    time: "Mon Oct 18 2022 15:36:27 GMT+0300 (Eastern European Summer Time)"
  },
  {
    message: "Hello hello!",
    time: "Mon Oct 18 2022 15:37:05 GMT+0300 (Eastern European Summer Time)"
  }
];

//2. Serve public page
app.use('/', express.static('public'));
//helps parse json data back
app.use(express.json());

//GET all the messages
app.get('/messages', (req, res)=>{
  // let messagesData = {
  //   data: messages
  // }
  // res.json(messagesData);

  //get messages from the database
  db.find({}, (err, docs)=>{
    if(err){
      res.json({task: "task failed"});
    }else{
      let messagesData = {
        data: docs
      }
      res.json(messagesData);
    }
  });
});

//POST route
app.post('/new-message', (req, res)=>{
  console.log(req.body);

  //prepare data to add inside an array
  let messageData = req.body;
  messageData.time = Date();

  //push into array
  messages.push(messageData);
  console.log(messages);

  let messageObj = {
    "task": "success",
    "message": messageData
  }

  //insert into the database
  db.insert(messageData, (err, newDocs)=>{
    if(err){
      res.json({task: "task failed"});
    }else{
      res.json(messageObj);
    }
  });

  // res.json(messageObj);
});

//1.3 Listen
let port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Server listening on localhost:${port}`);
});
