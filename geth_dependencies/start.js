var fer = personal.listAccounts[0]
//var jon = personal.listAccounts[1]
//var mike = personal.listAccounts[2]

var pCoinAdd = "0x41f8ae8180bd3c4a5da2f40282cc89fb89bb0ccc"
var interface_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"rightsLevel","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var pcoin = eth.contract(interface_).at(pCoinAdd);

//miner.start();

admin.addPeer("enode://987db617c1814a88d669d0b5ddcba2cde43e804d49fe5fd3935d187b77cfbf9f4c1fbb3d3f22e2d805cf2e9e18b7f91defeb07b571e5145b08a796e2080c451d@192.168.0.101:30303")



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

checkWork();

