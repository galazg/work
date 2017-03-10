var port = "8085";
//var host = "http://localhost:" + port;  //use this when running on same computer as the eth node
var host = "http://192.168.0.201:" + port;
//var host = "http://bcsvyvr5m.westeurope.cloudapp.azure.com:8545";

var command_obj = {"command":"", "user":"", "level":"", "tokens":"", "arg":"", "deviceid":""};

var register_device_selected=0;
var validate_device_selected=0;
var owner_selected=0;

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

// function register_disable(p){
//   // $('#reset'+p).removeClass("btn-default");
//   // $('#reset'+p).addClass("btn-primary");
//   // $('#reset'+p).removeClass("disabled");
//   $('#user'+p+'check4').prop("disabled", true);
//   $('#user'+p+'check2').prop("disabled", true);
//   $('#user'+p+'check1').prop("disabled", true);
//
//   // enable checkboxes to be able to uncheck them
//   $('#user'+p+'check4v').prop("disabled", false);
//   $('#user'+p+'check2v').prop("disabled", false);
//   $('#user'+p+'check1v').prop("disabled", false);
//   //unckeck
//   $('#user'+p+'check4v').bootstrapToggle('off');
//   $('#user'+p+'check2v').bootstrapToggle('off');
//   $('#user'+p+'check1v').bootstrapToggle('off');
//   // disable checkboxes
//   $('#user'+p+'check4v').prop("disabled", true);
//   $('#user'+p+'check2v').prop("disabled", true);
//   $('#user'+p+'check1v').prop("disabled", true);
//
// }


function lamps_off(){
  lamp_off(1); 
  lamp_off(2); 
  lamp_off(3); 
}


$(function(){

$('#owner1').on('click', function (e) {
  document.getElementById("owner_dropdown").innerHTML = "Owner: Leszek";
  document.getElementById("status_label").innerHTML = "No new information to display";

  owner_selected=1;
  reset_checks(1);
  reset_checks(2);
  reset_checks(3);
  set_lamps(1,"white");
  set_lamps(2,"white");
  set_lamps(3,"white");
  load_register_checks("user1",1);
  load_register_checks("user1",2);
  load_register_checks("user1",3);
  lamps_off();
});
$('#owner2').on('click', function (e) {
  document.getElementById("owner_dropdown").innerHTML = "Owner: Fernando";
  document.getElementById("status_label").innerHTML = "No new information to display";
  owner_selected=2;
  reset_checks(1);
  reset_checks(2);
  reset_checks(3);
  set_lamps(1,"white");
  set_lamps(2,"white");
  set_lamps(3,"white");
  load_register_checks("user2",1);
  load_register_checks("user2",2);
  load_register_checks("user2",3);
  lamps_off();

});
$('#owner3').on('click', function (e) {
  document.getElementById("owner_dropdown").innerHTML = "Owner: Mike";
  document.getElementById("status_label").innerHTML = "No new information to display";
  owner_selected=3;
  reset_checks(1);
  reset_checks(2);
  reset_checks(3);
  set_lamps(1,"white");
  set_lamps(2,"white");
  set_lamps(3,"white");
  load_register_checks("user3",1);
  load_register_checks("user3",2);
  load_register_checks("user3",3);
  lamps_off();

});
$('#owner4').on('click', function (e) {
  document.getElementById("owner_dropdown").innerHTML = "Owner: Giovanni";
  document.getElementById("status_label").innerHTML = "No new information to display";
  owner_selected=4;
  reset_checks(1);
  reset_checks(2);
  reset_checks(3);
  set_lamps(1,"white");
  set_lamps(2,"white");
  set_lamps(3,"white");
  load_register_checks("user4",1);
  load_register_checks("user4",2);
  load_register_checks("user4",3);
  lamps_off();

});

// $('#rdevice1').on('click', function (e) {
//   document.getElementById("register_dropdown").innerHTML = "Device 1";
//   register_device_selected =1;
// });
// $('#rdevice2').on('click', function (e) {
//   document.getElementById("register_dropdown").innerHTML = "Device 2";
//   register_device_selected =2;
//
// });
// $('#rdevice3').on('click', function (e) {
//   document.getElementById("register_dropdown").innerHTML = "Device 3";
//   register_device_selected =3;
// });

$('#mreset_all').on('click', function (e) {
    alert("All devices rights will be reset to 0");
    register("user1",1,0);
    register("user2",1,0);
    register("user3",1,0);
    register("user1",2,0);
    register("user2",2,0);
    register("user3",2,0);
    register("user1",3,0);
    register("user2",3,0);
    register("user3",3,0);
});


// $('#mvalidate').on('click', function (e) {
//     //alert("received by component handler: "+$('#user').val());
//     validate($('#user').val());
// });
//
// $('#mregister').on('click', function (e) {
//     //alert("received by component handler: "+$('#user').val());
//     //validate($('#user').val());
// });

$('#register1').on('click', function (e) {
  register_device_selected=1;
  register_device();
});
$('#register2').on('click', function (e) {
  register_device_selected=2;
  register_device();
});
$('#register3').on('click', function (e) {
  register_device_selected=3;
  register_device();
});




$('#validate1').on('click', function (e) {
    validate_device_selected = 1;
    validate_device();
});
$('#validate2').on('click', function (e) {
    validate_device_selected = 2;
    validate_device();
});
$('#validate3').on('click', function (e) {
    validate_device_selected = 3;
    validate_device();
});




$('#but-yel-u1').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(1,4);

});
$('#but-red-u1').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(1,2);
});
$('#but-blu-u1').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(1,1);

});

$('#but-yel-u2').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(2,4);
});
$('#but-red-u2').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(2,2);
});
$('#but-blu-u2').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(2,1);
});

$('#but-yel-u3').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(3,4);
});
$('#but-red-u3').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(3,2);
});
$('#but-blu-u3').on('click', function (e){
  //document.getElementById("status_command").innerHTML = "User 1 command Yellow";
  command_device(3,1);
});



$('#reset1').on('click', function (e) {
  // $(this).addClass("disabled");
  // $(this).removeClass("btn-primary");
  // $(this).addClass("btn-default");

  register_device_selected=1;
  reset_checks(1);
  register_device();

});
$('#reset2').on('click', function (e) {
  // $(this).addClass("disabled");
  // $(this).removeClass("btn-primary");
  // $(this).addClass("btn-default");
  register_device_selected=2;
  reset_checks(2);
  register_device();
});
$('#reset3').on('click', function (e) {
  // $(this).addClass("disabled");
  // $(this).removeClass("btn-primary");
  // $(this).addClass("btn-default");
  register_device_selected=3;
  reset_checks(3);
  register_device();
});

});




function register_device(){
  var level = calculate_level(register_device_selected);
  switch(owner_selected){
    case 1:
      register("user1",register_device_selected,level);
      break;
    case 2:
      register("user2",register_device_selected,level);
      break;
    case 3:
      register("user3",register_device_selected,level);
      break;
    case 4:
      register("user4",register_device_selected,level);
      break;
    default:
      alert("No owner selected");
      return;
  }
//  alert("Owner "+ owner_selected+ " has registered device "+register_device_selected+ " (level "+level+")");
  //reset_checks(register_device_selected);
  return 1;
}

function validate_device(){
  switch(owner_selected){
    case 1:
      validate("user1",validate_device_selected);
      break;
    case 2:
      validate("user2",validate_device_selected);
      break;
    case 3:
      validate("user3",validate_device_selected);
      break;
    case 4:
      validate("user4",validate_device_selected);
      break;
    default:
      alert("No owner selected");
      return;
  }
  return 1;
}




function reset_checks(p){
  // $('#register'+p).removeClass("btn-default");
  // $('#register'+p).addClass("btn-primary");
  // $('#register'+p).removeClass("disabled");
  // $('#user'+p+'check4').prop("disabled", false);
  // $('#user'+p+'check2').prop("disabled", false);
  // $('#user'+p+'check1').prop("disabled", false);
  // $('#user'+p+'check4').prop("checked", false);
  // $('#user'+p+'check2').prop("checked", false);
  // $('#user'+p+'check1').prop("checked", false);

  $('#user'+p+'check4').bootstrapToggle('off');
  $('#user'+p+'check2').bootstrapToggle('off');
  $('#user'+p+'check1').bootstrapToggle('off');

  // $('#user'+p+'check4v').prop("checked", false);
  // $('#user'+p+'check2v').prop("checked", false);
  // $('#user'+p+'check1v').prop("checked", false);

//validate checks
  // $('#user'+p+'check4v').prop("disabled", false);
  // $('#user'+p+'check2v').prop("disabled", false);
  // $('#user'+p+'check1v').prop("disabled", false);
  // $('#user'+p+'check4v').bootstrapToggle('off');
  // $('#user'+p+'check2v').bootstrapToggle('off');
  // $('#user'+p+'check1v').bootstrapToggle('off');
  // $('#user'+p+'check4v').prop("disabled", true);
  // $('#user'+p+'check2v').prop("disabled", true);
  // $('#user'+p+'check1v').prop("disabled", true);
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




function command_device(device,color){
  switch(owner_selected){
    case 1:
      command_lights("user1",device,color);
      break;
    case 2:
      command_lights("user2",device,color);
      break;
    case 3:
      command_lights("user3",device,color);
      break;
    case 4:
      command_lights("user4",device,color);
      break;
    default:
      alert("No owner selected");
      return;
  }
}

function command_lights(user,device,color){
  //      command_lights("user1",device,color);
  command_obj.command = "validate"
  command_obj.user = user;
  command_obj.deviceid = device.toString();

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
      console.log("color: "+color);
      //document.getElementById("status").style.font = "italic bold 20px arial,serif";
      //document.getElementById("status").innerHTML = "User " + user + " has rights level " +level ;

      if(color==4)
        if((level&4)==4){
          //document.getElementById("status_command").innerHTML="User "+user+" can command yellow";
          set_lamps(device,"yellow");
          lamp_on(device,"12750"); //the number is the hue of yellow?
		}
        else
          alert("Device not capable of turning YELLOW");
          //document.getElementById("status_command").innerHTML="User "+user+" can NOT command yellow";
      else if(color==2)
        if((level&2)==2){
          //document.getElementById("status_command").innerHTML="User "+user+" can command red";
          set_lamps(device,"red");
          lamp_on(device,"0"); //the number is the hue of blue?

      	}
        else
          alert("Device not capable of turning RED");
          //document.getElementById("status_command").innerHTML="User "+user+" can NOT command red";
      else if(color==1)
        if((level&1)==1){
          //document.getElementById("status_command").innerHTML="User "+user+" can command blue";
          set_lamps(device,"blue");
          lamp_on(device,"47000"); //the number is the hue of blue?
      	}
        else
          alert("Device not capable of turning BLUE");
          //document.getElementById("status_command").innerHTML="User "+user+" can NOT command blue";

    }
  };
  //xhttp.open("GET", "http://localhost:8085/validate&" + user, true);
  var data = JSON.stringify(command_obj);
  //console.log(data)
  xhttp.send(data);
}

function lamp_on(device,hue){
 // return; //DO NOT SEND ANY COMMANDS TO HUE LAMPS. THIS FEATURE WILL BE ADDED LATER!!!!!!!!!!!!!
  command_obj.command = "on";
  command_obj.user = "";
  command_obj.arg = hue;
  command_obj.deviceid = device.toString();

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      console.log(obj.result)
    }
  };
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function lamp_off(device){
 // return; //DO NOT SEND ANY COMMANDS TO HUE LAMPS. THIS FEATURE WILL BE ADDED LATER!!!!!!!!!!!!!
  command_obj.command = "off";
  command_obj.user = "";
  command_obj.arg = "";
  command_obj.deviceid = device.toString();

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      console.log(obj.result)
    }
  };
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}

function validate(user,device){
  //alert("username "+user+" read from input box");
  command_obj.command = "validate"
  command_obj.user = user;
  command_obj.deviceid = device.toString();

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
      // var p=1;
      // if(user=='mike') p=2;
      // else if(user=='jon') p=3;

      var device_s = device.toString();

      //enable checkboxes to be able to toggle them programmaticaly
      $('#user'+device_s+'check4v').prop("disabled", false);
      $('#user'+device_s+'check2v').prop("disabled", false);
      $('#user'+device_s+'check1v').prop("disabled", false);

      if((level&4)==4) $('#user'+device_s+'check4v').bootstrapToggle('on'); else $('#user'+device_s+'check4v').bootstrapToggle('off');
      if((level&2)==2) $('#user'+device_s+'check2v').bootstrapToggle('on'); else $('#user'+device_s+'check2v').bootstrapToggle('off');
      if((level&1)==1) $('#user'+device_s+'check1v').bootstrapToggle('on'); else $('#user'+device_s+'check1v').bootstrapToggle('off');

      //disable checkboxes after toggling them with the values retrieved from blockchain
      $('#user'+device_s+'check4v').prop("disabled", true);
      $('#user'+device_s+'check2v').prop("disabled", true);
      $('#user'+device_s+'check1v').prop("disabled", true);

    }
  };
  //xhttp.open("GET", "http://localhost:8085/validate&" + user, true);
  var data = JSON.stringify(command_obj);
  //console.log(data)
  xhttp.send(data);
}




function load_register_checks(user,device){
  //alert("username "+user+" read from input box");
  command_obj.command = "validate"
  command_obj.user = user;
  command_obj.deviceid = device.toString();

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
      // var p=1;
      // if(user=='mike') p=2;
      // else if(user=='jon') p=3;

      var device_s = device.toString();


      if((level&4)==4) $('#user'+device_s+'check4').bootstrapToggle('on'); else $('#user'+device_s+'check4').bootstrapToggle('off');
      if((level&2)==2) $('#user'+device_s+'check2').bootstrapToggle('on'); else $('#user'+device_s+'check2').bootstrapToggle('off');
      if((level&1)==1) $('#user'+device_s+'check1').bootstrapToggle('on'); else $('#user'+device_s+'check1').bootstrapToggle('off');

    }
  };
  //xhttp.open("GET", "http://localhost:8085/validate&" + user, true);
  var data = JSON.stringify(command_obj);
  //console.log(data)
  xhttp.send(data);
}



function register(user,device,level){
  //var user = document.getElementById("user").value;
  //var level = document.getElementById("level").value;
  command_obj.command = "register"
  command_obj.user = user;
  command_obj.deviceid = device.toString();
  command_obj.level = level.toString();

  console.log(user);
  console.log(level);
  console.log(device)
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

      if(obj.result == "no money"){
        document.getElementById("status_label").innerHTML = "Error: " + (user == "user1" ? "Leszek" : (user == "user2" ? "Fernando" : (user == "user3" ? "Mike" : (user == "user4" ? "Giovanni" : "Unknown")))) +" does not have enough tokens";
      }
      else if(obj.result == "has money"){
        document.getElementById("status_label").innerHTML = "The device has been registered, " + level * 100 + " tokens have been charged. Account balance: " + obj.balance + " tokens." ;
      }



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

   set_lamps(1,"white");
   set_lamps(2,"white");
   set_lamps(3,"white");

   lamps_off();

}


function set_lamps(device,color){
  var lamp = document.getElementById("hue_lamp" + device);
  lamp.className = "lamp " + color;
}

/*
function set_lamps(device,color){
  var c = document.getElementById("lamps");
  var ctx = c.getContext("2d");

  switch(device){
    case 1:
      ctx.beginPath();
      ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = color ;
      ctx.fill();
      break;
    case 2:
      ctx.beginPath();
      ctx.arc(250, 75, 50, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = color ;
      ctx.fill();
      break;
    case 3:
      ctx.beginPath();
      ctx.arc(400, 75, 50, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = color ;
      ctx.fill();
      break;
  }
}
*/
