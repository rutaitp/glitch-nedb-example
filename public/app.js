window.addEventListener('load', () => {
  let feed = document.getElementById('feed');

  //fetch all messages from the server
  fetch('/messages')
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      let messages = data.data;

      //loop through the data and create a new p
      for (let i = 0; i < messages.length; i++) {
        console.log(messages[i]);
        let message = messages[i].message;
        let time = messages[i].time;
        let newMessage = document.createElement('p');
        let newMessageContent = time + ": " + message;
        newMessage.innerHTML = newMessageContent;

        //append to feed
        feed.appendChild(newMessage);
      }
    })
    .catch(err => {
      console.log(err);
    });

  let msgButton = document.getElementById('msg-submit');
  msgButton.addEventListener('click', () => {
    // console.log('hello');
    let msgValue = document.getElementById('msg-input').value;
    console.log(msgValue);

    //Create an object to send
    let messageObject = {
      "message": msgValue
    }

    //Stringify data
    let messageObjectJSON = JSON.stringify(messageObject);
    // console.log(messageObjectJSON)

    //Create a fetch POST request
    fetch('/new-message', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: messageObjectJSON
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        //add new message to the page
        let message = data.message.message;
        let time = data.message.time;
        let newMessage = document.createElement('p');
        let newMessageContent = time + ": " + message;
        newMessage.innerHTML = newMessageContent;

        //append it to the feed, to the top
        // feed.appendChild(newMessage);
        feed.insertBefore(newMessage, feed.firstChild);
      });
  });
});
