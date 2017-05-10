function topup(user,amount){
  command_obj.command = "topup"
  command_obj.user = user;
  command_obj.tokens = amount;
  if(user=="" || amount==""){
    window.alert("Missing data");
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);  //host is defined in block_interface.js
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      //console.log(obj.result)
    }
  };
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}


function reset(user){
  command_obj.command = "reset"
  command_obj.user = user;

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", host, true);  //host is defined in block_interface.js
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var obj = JSON.parse(this.responseText);
      console.log(obj.result)
    }
  };
  //xhttp.open("GET", "http://localhost:8085/topup&" + user + "=" + amount, true);
  var data = JSON.stringify(command_obj);
  xhttp.send(data);
}


$(function(){

$('#mtopup').on('click', function (e) {
  var user = document.getElementById("user").value;
  var amount = document.getElementById("amount").value;

  if((user=="")||(amount=="")){
    alert("Missing data");
  }
  else{
    alert(amount +" tokens will be sent to " + user);
    topup(user,amount);
  }
}); //topup listener


$('#mreset').on('click', function (e) {
  var user = document.getElementById("user").value;

  if(user==""){
    alert("Missing data");
  }
  else{
    alert("The rights of " + user + " will be reset");
    reset(user);
  }
}); //reset listener


$('#mreset_all').on('click', function (e) {
    alert("The rights of all users will be reset");
    reset("user1");
    reset("user2");
    reset("user3");
    reset("user4");
}); //reset_all listener


}); //


