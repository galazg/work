var port = "8085";
var host = "http://localhost:" + port;
//var host = "http://bcsvyvr5m.westeurope.cloudapp.azure.com:8545";

var command_obj = {"command":"", "user":"", "level":"", "tokens":"", "arg":""};

function on(){
  var user = document.getElementById("user").value;
  command_obj.command = "on";
  command_obj.user = user;
  command_obj.arg = document.getElementById("color").value;
  if(user==""){
    window.alert("Missing data");
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      //console.log(obj.result)
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
      //document.getElementById("status").innerHTML = "The token balance and rights of user " + user + " have been cleared";
    }
  };
  //xhttp.open("GET", "http://localhost:8085/reset&" + user, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function off(){
  var user = document.getElementById("user").value;
  command_obj.command = "off";
  command_obj.user = user;
  if(user==""){
    window.alert("Missing data");
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      //console.log(obj.result)
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
      //document.getElementById("status").innerHTML = "The token balance and rights of user " + user + " have been cleared";
    }
  };
  //xhttp.open("GET", "http://localhost:8085/reset&" + user, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function reset(){
  var user = document.getElementById("user").value;
  command_obj.command = "reset";
  command_obj.user = user;
  if(user==""){
    window.alert("Missing data");
    return;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      //console.log(obj.result)
      document.getElementById("status").style.font = "italic bold 20px arial,serif";
      document.getElementById("status").innerHTML = "The token balance and rights of user " + user + " have been cleared";
    }
  };
  //xhttp.open("GET", "http://localhost:8085/reset&" + user, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}


function validate(){
  var user = document.getElementById("user").value;
  command_obj.command = "validate"
  command_obj.user = user;
  if(user==""){
    window.alert("Missing data");
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      console.log(obj);
      console.log("User has rights level: " + parseInt(obj.result));
      document.getElementById("status").style.font = "italic bold 20px arial,serif";
      document.getElementById("status").innerHTML = "User " + user + " has rights level " + parseInt(obj.result);
      if(parseInt(obj.result)==0){
        document.getElementById("status").innerHTML = "User " + user + " has rights level 0 or does not exist";
      }
    }
  };
  //xhttp.open("GET", "http://localhost:8085/validate&" + user, true);
  var data = JSON.stringify(command_obj);
  //console.log(data)
  xhttp.send(data);
}

function topup(){
  var user = document.getElementById("user").value;
  var amount = document.getElementById("amount").value;
  command_obj.command = "topup"
  command_obj.user = user;
  command_obj.tokens = amount;
  if(user=="" || amount==""){
    window.alert("Missing data");
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      //console.log(obj.result)
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
      //document.getElementById("status").innerHTML = amount + " tokens have been sent to user " + user;

    }
  };
  //xhttp.open("GET", "http://localhost:8085/topup&" + user + "=" + amount, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function register(){
  var user = document.getElementById("user").value;
  var level = document.getElementById("level").value;
  command_obj.command = "register"
  command_obj.user = user;
  command_obj.level = level;
  if(user=="" || level==""){
    window.alert("Missing data");
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      //console.log(obj.result)
      document.getElementById("status").style.font = "italic bold 20px arial,serif";
/*      if(obj.result == "already registered") {
        document.getElementById("status").innerHTML = "Error: user " + user + " was already registered with rights level " + level;
      }*/
      if(obj.result == "no money"){
        document.getElementById("status").innerHTML = "Error: user " + user + " does not exist or does not have enough tokens";
      }
      else if(obj.result == "has money"){
        document.getElementById("status").innerHTML = "User " + user + " is now registered with rights level " + level;
      }
    }
  };
  //xhttp.open("GET", "http://localhost:8085/register&" + user + "=" + level, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}