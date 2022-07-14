const express= require("express")
const app= express()
const bodyParser= require("body-parser")
const https= require("https")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})
app.post("/signup.html", function(req,res){
  const fname= req.body.fname
  const lname= req.body.lname
  const emailId= req.body.email
  //console.log(fname, lname, email)
  const data={
    members:[
        {
          email_address:emailId,
          status: "subscribed",
          merge_fields:{
            FNAME: fname,
            LNAME: lname
          }
        }
    ]
  }
  const jsonData= JSON.stringify(data)
  const url="https://us8.api.mailchimp.com/3.0/lists/d4ba0b05e9"
  const options= {
    method:"POST",
    auth: "vineeth:49f9cba3f01e98a67577b4399d37bbc9-us8"
  }
  const request= https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data))
      //console.log(response.statuscode)
      if(response.statusCode===200)
      {
        res.sendFile(__dirname+"/success.html")
      }
      else
      {
        res.sendFile(__dirname+"/failure.html")
      }
    })
  })
  request.write(jsonData)
  request.end()

})
app.post("/",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on 3000")
})

//apikey---49f9cba3f01e98a67577b4399d37bbc9-us8
//d4ba0b05e9--audid
