contract pCoin2 {
	struct userWallet {
	uint tokens;
	uint device1;
	uint device2;
	uint device3;
	}
	mapping (address => userWallet) public balances;
	function pCoin2() {
		balances[msg.sender].tokens = 1000000;
	}
	function sendTokens(address receiver, uint amount) returns(bool successful) {
		balances[receiver].tokens += amount;
		return true;
	}
	function register(address payingUser, uint deviceid, uint rights) returns(uint flag) {
		uint cost = 100 * rights;
		if (balances[payingUser].tokens < cost) return 0;
		balances[payingUser].tokens -= cost;
		if(deviceid==1)	balances[payingUser].device1 = rights;
		else if(deviceid==2) balances[payingUser].device2 = rights;
		else if(deviceid==3) balances[payingUser].device3 = rights;
		else return 0; //device id was wrong
		return 1; //this means the transaction was successful
	}
	function checkMoney(address payingUser, uint rightsLevelReq) constant returns(uint flag) {
		uint cost = 100 * rightsLevelReq;
		if (balances[payingUser].tokens < cost) return 0;
		return balances[payingUser].tokens; //this means the user has enough money
	}

  function validate(address user, uint deviceid) constant returns(uint level){
		if(deviceid==1)			return balances[user].device1;
		else if(deviceid==2) 	return balances[user].device2;
		else if(deviceid==3) 	return balances[user].device3;
		return 0; //device id was wrong
  }
  function reset(address user) returns(bool successful){
      //balances[user].tokens = 0;
      balances[user].device1 = 0;
      balances[user].device2 = 0;
      balances[user].device3 = 0;
      return true;
  }
}
