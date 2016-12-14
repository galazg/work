var port = "8085";
var host = "http://localhost:" + port;
//var host = "http://bcsvyvr5m.westeurope.cloudapp.azure.com:8545";

var command_obj = {"command":"", "user":"", "level":"", "tokens":"", "arg":""};


function calculate_level(p){
  var level=0;
  if ($('#user'+p+'check4').is(':checked')) level+=4;
  if ($('#user'+p+'check2').is(':checked')) level+=2;
  if ($('#user'+p+'check1').is(':checked')) level+=1;
  /*if (level==0) {
    alert("Cannot register empty selection");
    return 0;
  }*/
  return level;
};

function register_disable(p){
  $('#reset'+p).removeClass("btn-default");
  $('#reset'+p).addClass("btn-primary");
  $('#reset'+p).removeClass("disabled");
  $('#user'+p+'check4').prop("disabled", true);
  $('#user'+p+'check2').prop("disabled", true);
  $('#user'+p+'check1').prop("disabled", true);
  $('#user'+p+'check4v').prop("checked", false);
  $('#user'+p+'check2v').prop("checked", false);
  $('#user'+p+'check1v').prop("checked", false);
}

$(function(){

$('#mvalidate').on('click', function (e) {
    //alert("received by component handler: "+$('#user').val());
    validate($('#user').val());
});

$('#mregister').on('click', function (e) {
    //alert("received by component handler: "+$('#user').val());
    //validate($('#user').val());
});

$('#validate1').on('click', function (e) {
    validate('fer');
});
$('#validate2').on('click', function (e) {
    validate('mike');
});
$('#validate3').on('click', function (e) {
    validate('jon');
});

$('#register1').on('click', function (e) {
  var level = calculate_level(1);
  //if(level>0){
    $(this).addClass("disabled");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-default");
    register_disable(1);
    register("fer",level);
    alert("The user has been registered with level "+level);
  //}
  //else return;
});
$('#register2').on('click', function (e) {
  var level = calculate_level(2);
  //if(level>0){
    $(this).addClass("disabled");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-default");
    register_disable(2);
    register("mike",level);
    alert("The user has been registered with level "+level);
  //}
  //else return;
});
$('#register3').on('click', function (e) {
  var level = calculate_level(3);
  //if(level>0){
    $(this).addClass("disabled");
    $(this).removeClass("btn-primary");
    $(this).addClass("btn-default");
    register_disable(3);
    register("jon",level);
    alert("The user has been registered with level "+level);
  //}
  //else return;
});


$('#reset1').on('click', function (e) {
  $(this).addClass("disabled");
  $(this).removeClass("btn-primary");
  $(this).addClass("btn-default");
  reset_checks(1);
});
$('#reset2').on('click', function (e) {
  $(this).addClass("disabled");
  $(this).removeClass("btn-primary");
  $(this).addClass("btn-default");
  reset_checks(2);
});
$('#reset3').on('click', function (e) {
  $(this).addClass("disabled");
  $(this).removeClass("btn-primary");
  $(this).addClass("btn-default");
  reset_checks(3);
});

});

function reset_checks(p){
  $('#register'+p).removeClass("btn-default");
  $('#register'+p).addClass("btn-primary");
  $('#register'+p).removeClass("disabled");
  $('#user'+p+'check4').prop("disabled", false);
  $('#user'+p+'check2').prop("disabled", false);
  $('#user'+p+'check1').prop("disabled", false);
  //$('#user'+p+'check4').prop("checked", false);
  //$('#user'+p+'check2').prop("checked", false);
  //$('#user'+p+'check1').prop("checked", false);
  //$('#user'+p+'check4v').prop("checked", false);
  //$('#user'+p+'check2v').prop("checked", false);
  //$('#user'+p+'check1v').prop("checked", false);
  $('#user'+p+'check4').bootstrapToggle('off');
  $('#user'+p+'check2').bootstrapToggle('off');
  $('#user'+p+'check1').bootstrapToggle('off');
  $('#user'+p+'check4v').bootstrapToggle('off');
  $('#user'+p+'check2v').bootstrapToggle('off');
  $('#user'+p+'check1v').bootstrapToggle('off');

}

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


function validate(user){
  //alert("username "+user+" read from input box");
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
      var level = parseInt(obj.result);
      console.log(obj);
      console.log("User has rights level: " + level);
      document.getElementById("status").style.font = "italic bold 20px arial,serif";
      document.getElementById("status").innerHTML = "User " + user + " has rights level " +level ;
      if(level==0){
        document.getElementById("status").innerHTML = "User " + user + " has rights level 0 or does not exist";
      }
      //alert("level: "+level);
      //console.log("User is: "+user);
      //console.log((level&4)==4);
      //console.log((level&2)==2);
      //console.log((level&1)==1);

      //MOVE SOMEWHERE ELSE FOR OPTIMIZATION
      var p=1;
      if(user=='mike') p=2;
      else if(user=='jon') p=3;
      if((level&4)==4) $('#user'+p+'check4v').bootstrapToggle('on'); else $('#user'+p+'check4v').bootstrapToggle('off');
      if((level&2)==2) $('#user'+p+'check2v').bootstrapToggle('on'); else $('#user'+p+'check2v').bootstrapToggle('off');
      if((level&1)==1) $('#user'+p+'check1v').bootstrapToggle('on'); else $('#user'+p+'check1v').bootstrapToggle('off');

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

function register(user,level){
  //var user = document.getElementById("user").value;
  //var level = document.getElementById("level").value;
  command_obj.command = "register"
  command_obj.user = user;
  command_obj.level = level.toString();

  console.log(user);
  console.log(level);
  /*if(user=="" || level==""){
    window.alert("Missing data");
    return;
  }*/
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
