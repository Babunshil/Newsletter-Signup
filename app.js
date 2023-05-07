const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true}));
//To render static file 
app.use(express.static("public"));


app.get("/" , (req , res)=> {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" , (req , res)=> {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/17218b7da4";

  const options = {
    method: "POST",
    auth: "babun2:c890c5685ef8422d944e415d28332485-us11"
  }

  const request =  https.request(url , options , (response)=>{

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data" , (data)=>{
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})

app.listen(process.env.PORT || 3000 , ()=> {
  console.log("server is running on port 3000");
})


// API key 
// c890c5685ef8422d944e415d28332485-us11

// list Id 
// 17218b7da4