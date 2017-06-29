var user1 = personal.listAccounts[0]
var user2 = personal.listAccounts[1]
var user3 = personal.listAccounts[2]
var user4 = personal.listAccounts[3]

//var pCoinAdd = "0x41f8ae8180bd3c4a5da2f40282cc89fb89bb0ccc"
//var interface_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"rightsLevel","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
//var pcoin = eth.contract(interface_).at(pCoinAdd);

//var pCoinAdd2 = "0x6e6f3c389179214600c251bdc4418ba10388fc39" //deployed 10 May 17
var pCoinAdd2 = "0x190a46029ff1693bbfedda664fd49fdd926f8ca1" //deployed 29 June 17

var interface2_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"device1","type":"uint256"},{"name":"device2","type":"uint256"},{"name":"device3","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"deviceid","type":"uint256"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"deviceid","type":"uint256"},{"name":"rights","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var pcoin2 = eth.contract(interface2_).at(pCoinAdd2);

miner.start(1);

//Check if the IP's are correct!
admin.addPeer("enode://987db617c1814a88d669d0b5ddcba2cde43e804d49fe5fd3935d187b77cfbf9f4c1fbb3d3f22e2d805cf2e9e18b7f91defeb07b571e5145b08a796e2080c451d@192.168.0.102:30303")
admin.addPeer("enode://71c66ad45bda07b4e302cdf04a785c1565c6a3347b61427946a26f7c04d8cf1659298f51b1cdc5808ea456892f3ab719f8e954c9cac7b07963e185ea61c532da@192.168.0.106:30303")
admin.addPeer("enode://dbdb85fcd0931a779527ef2c3aad4c2b026e7ce2313263c110ee8638a3263a6848b228c9074ca0062dcbc3b2c0b055950e376d03a8914f0144a03aa332257569@192.168.0.105:30303")
admin.addPeer("enode://149a73c24ee0b1aa44f410492b9ff523c1bad8e2a35509bed94f6edd8b460bfbfa66c9ad3069f866afdbc32070191de3cae8e343807f5e51c8ada2535b263b35@192.168.0.103:30303")
admin.addPeer("enode://a5fb2c7b0237b37ca3355a715bd72a01ed9c495bf96fca457d43a4a153334896132ebf98ad728cef7facf4bd956bbf9fab2ce12793928250971649ba5f0d0888@192.168.0.104:30303")




function checkWork() {
    if (eth.getBlock("pending").transactions.length > 0) {
        if (eth.mining) return;
        console.log("== Pending transactions! Mining...");
        miner.start(1);
    } else {
        miner.stop();  // This param means nothing
        console.log("== No transactions! Mining stopped.");
    }
}

eth.filter("latest", function(err, block) { checkWork(); });
eth.filter("pending", function(err, block) { checkWork(); });

