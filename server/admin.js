function topup(user,amount){
  //var user = document.getElementById("user").value;
  //var amount = document.getElementById("amount").value;
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


});
