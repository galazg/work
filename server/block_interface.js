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

  // enable checkboxes to be able to uncheck them
  $('#user'+p+'check4v').prop("disabled", false);
  $('#user'+p+'check2v').prop("disabled", false);
  $('#user'+p+'check1v').prop("disabled", false);
  //unckeck
  $('#user'+p+'check4v').bootstrapToggle('off');
  $('#user'+p+'check2v').bootstrapToggle('off');
  $('#user'+p+'check1v').bootstrapToggle('off');
  // disable checkboxes
  $('#user'+p+'check4v').prop("disabled", true);
  $('#user'+p+'check2v').prop("disabled", true);
  $('#user'+p+'check1v').prop("disabled", true);

}

$(function(){

$('#mreset_all').on('click', function (e) {
    alert("All users will be reset to level 0");
    register("fer",0);
    register("jon",0);
    register("mike",0);
});


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

$('#but-yel-u1').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("fer","yellow");
});
$('#but-red-u1').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("fer","red");
});
$('#but-blu-u1').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("fer","blue");
});

$('#but-yel-u2').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("mike","yellow");
});
$('#but-red-u2').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("mike","red");
});
$('#but-blu-u2').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("mike","blue");
});

$('#but-yel-u3').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("jon","yellow");
});
$('#but-red-u3').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("jon","red");
});
$('#but-blu-u3').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_lights("jon","blue");
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
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
      //document.getElementById("status").innerHTML = "The token balance and rights of user " + user + " have been cleared";
    }
  };
  //xhttp.open("GET", "http://localhost:8085/reset&" + user, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function command_lights(user,color){
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
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
      //document.getElementById("status").innerHTML = "User " + user + " has rights level " +level ;

      if(color=="yellow")
        if((level&4)==4)
          //document.getElementById("status_command").innerHTML="User "+user+" can command yellow";
          set_lamps("yellow");
        else
          alert("User CANNOT command yellow");
          //document.getElementById("status_command").innerHTML="User "+user+" can NOT command yellow";
      else if(color=="red")
        if((level&2)==2)
          //document.getElementById("status_command").innerHTML="User "+user+" can command red";
          set_lamps("red");
        else
          alert("User CANNOT command red");
          //document.getElementById("status_command").innerHTML="User "+user+" can NOT command red";
      else if(color=="blue")
        if((level&1)==1)
          //document.getElementById("status_command").innerHTML="User "+user+" can command blue";
          set_lamps("blue");
        else
          alert("User CANNOT command blue");
          //document.getElementById("status_command").innerHTML="User "+user+" can NOT command blue";

    }
  };
  //xhttp.open("GET", "http://localhost:8085/validate&" + user, true);
  var data = JSON.stringify(command_obj);
  //console.log(data)
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
      /*document.getElementById("status").style.font = "italic bold 20px arial,serif";
      document.getElementById("status").innerHTML = "User " + user + " has rights level " +level ;
      if(level==0){
        document.getElementById("status").innerHTML = "User " + user + " has rights level 0 or does not exist";
      }*/

      //MOVE SOMEWHERE ELSE FOR OPTIMIZATION
      var p=1;
      if(user=='mike') p=2;
      else if(user=='jon') p=3;

      //enable checkboxes to be able to toggle them programmaticaly
      $('#user'+p+'check4v').prop("disabled", false);
      $('#user'+p+'check2v').prop("disabled", false);
      $('#user'+p+'check1v').prop("disabled", false);

      if((level&4)==4) $('#user'+p+'check4v').bootstrapToggle('on'); else $('#user'+p+'check4v').bootstrapToggle('off');
      if((level&2)==2) $('#user'+p+'check2v').bootstrapToggle('on'); else $('#user'+p+'check2v').bootstrapToggle('off');
      if((level&1)==1) $('#user'+p+'check1v').bootstrapToggle('on'); else $('#user'+p+'check1v').bootstrapToggle('off');

      //disable checkboxes after toggling them with the values retrieved from blockchain
      $('#user'+p+'check4v').prop("disabled", true);
      $('#user'+p+'check2v').prop("disabled", true);
      $('#user'+p+'check1v').prop("disabled", true);

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
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
/*      if(obj.result == "already registered") {
        document.getElementById("status").innerHTML = "Error: user " + user + " was already registered with rights level " + level;
      }*/

      /*if(obj.result == "no money"){
        document.getElementById("status").innerHTML = "Error: user " + user + " does not exist or does not have enough tokens";
      }
      else if(obj.result == "has money"){
        document.getElementById("status").innerHTML = "User " + user + " is now registered with rights level " + level;
      }*/

    }
  };
  //xhttp.open("GET", "http://localhost:8085/register&" + user + "=" + level, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function load(){
  for (i = 1; i <=3; i++) {
    $('#user'+i+'check4v').prop("disabled", true);
    $('#user'+i+'check2v').prop("disabled", true);
    $('#user'+i+'check1v').prop("disabled", true);
   }

   set_lamps("white");
}


function set_lamps(color){
  var c = document.getElementById("lamps");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = color ;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(250, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = color ;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(400, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = color ;
  ctx.fill();

}
