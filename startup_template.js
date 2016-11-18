var fer = "0x9ec2f830dae76d1b5d4d3e32daf1d96a4e51d05d"
var jon = "0x3beb7c45f3ae37930982841c34f3098ea6e2360f"
var mike = "0x1b69f21849d0942fab15de236def687b05d29472"

var pCoinAdd = "0x54967a8db5b8bdf8600eea533a06f3172d026e56"
var interface_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"rightsLevel","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]
var pcoin = eth.contract(interface_).at(pCoinAdd);


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
