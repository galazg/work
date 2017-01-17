var user1 = personal.listAccounts[0]
var user2 = personal.listAccounts[1]
var user3 = personal.listAccounts[2]

var pCoinAdd = "0x41f8ae8180bd3c4a5da2f40282cc89fb89bb0ccc"
var interface_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"rightsLevel","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var pcoin = eth.contract(interface_).at(pCoinAdd);

var pCoinAdd2 = "0x697b8fad3292e594a4312dc94a17e2dced12e97e"
var interface2_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"device1","type":"uint256"},{"name":"device2","type":"uint256"},{"name":"device3","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"deviceid","type":"uint256"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"deviceid","type":"uint256"},{"name":"rights","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var pcoin2 = eth.contract(interface2_).at(pCoinAdd2);


//miner.start(1);

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
