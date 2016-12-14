pragma solidity ^0.4.2;
contract myToken {
	struct userWallet {
	uint tokens;
	uint rightsLevel;
	}
	mapping (address => userWallet) public balances;
	function myToken() {
		balances[msg.sender].tokens = 1000000;
		balances[msg.sender].rightsLevel = 7;
	}
	function sendTokens(address receiver, uint amount) returns(bool successful) {
		//if (balances[msg.sender].tokens < amount) return false;
		//balances[msg.sender].tokens -= amount;
		balances[receiver].tokens += amount;
		return true;
	}
	function register(address payingUser, uint rightsLevelReq) returns(uint flag) {
		uint cost = 100 * rightsLevelReq;
		if (balances[payingUser].tokens < cost) return 0;
		balances[payingUser].tokens -= cost;
		//balances[msg.sender].tokens += cost;
		balances[payingUser].rightsLevel = rightsLevelReq;
		return 1; //this means the transaction was successful
	}
	function checkMoney(address payingUser, uint rightsLevelReq) constant returns(uint flag) {
		uint cost = 100 * rightsLevelReq;
		if (balances[payingUser].tokens < cost) return 0;
		return 1; //this means the user has enough money
	}
  function validate(address user) constant returns(uint level){
      return balances[user].rightsLevel;
  }
  function getTokenBalance(address user) constant returns(uint tokens_){
      return balances[user].tokens;
  }
  function reset(address user) returns(bool successful){
      //balances[user].tokens = 0;
      balances[user].rightsLevel = 0;
      return true;
  }
  function resetTokens(address user) returns(bool successful){
      balances[user].tokens = 0;
      //balances[user].rightsLevel = 0;
      return true;
  }
}
