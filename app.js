var express=require("express");
var app=express();
var bodyParser = require('body-parser');
const request2 = require('request');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

var mob,mob1;

var otp;

app.listen(3000,process.env.IP,function(){
    console.log("Server has started");

}
);
app.get("/",function(req,res){
    res.render("login");
    
});


app.get("/intro",function(req,res){
    res.render("intro");
    
});



app.post('/otp', function(req, res) 
{
     mob = req.body.otp;
     mob1=mob;
    var msg=function() { 
          
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    };

     otp=msg()
     console.log(otp);
    var url = "	http://bhashsms.com/api/sendmsg.php?user=&pass=&sender=&phone=" + mob + "&text=" + otp  + "&priority=ndnd&stype=normal" // This is an api by Bash to send otp , please purchase alternative of it ( working no good) 
    var options = {
        url: url,
        method: 'GET',
    };
    request2(options, function (e, resp, body) {
        if (e) {
            console.log("Error : While sending Bhash SMS ", e);
        } else {
            console.log("SMS sent seccussfully !");
        }
        
    });
    res.render("verify");

    
});

app.get("/result",function(req,res){
    res.render("result",{mobile:mob1});
    
});

app.get("/index",function(req,res){
    res.render("index",{mobile2:mob});
    
});


app.post('/verify',function(req,res)
    {
        var verify=req.body.verify;
        if(verify==otp)
        {
            //res.send("You have successfully logged in!");
            res.render("intro");
        }
        else
        {
            res.send("Otp is wrong enter again");

        }
    });
