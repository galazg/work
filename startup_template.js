var fer = "0x9ec2f830dae76d1b5d4d3e32daf1d96a4e51d05d"
var jon = "0x3beb7c45f3ae37930982841c34f3098ea6e2360f"
var mike = "0x1b69f21849d0942fab15de236def687b05d29472"

var pCoinAdd = "0x54967a8db5b8bdf8600eea533a06f3172d026e56"
var interface_ = [{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"validate","outputs":[{"name":"level","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"tokens","type":"uint256"},{"name":"rightsLevel","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"reset","outputs":[{"name":"successful","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"register","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"payingUser","type":"address"},{"name":"rightsLevelReq","type":"uint256"}],"name":"checkMoney","outputs":[{"name":"flag","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]
var pcoin = eth.contract(interface_).at(pCoinAdd);


//blockchain1
admin.addPeer("enode://fec2f1d66eaee9d16644fcf1e543eff652a0843b281ff8dc0f78209f9ffd88d3744dece114099f765df3d7bf26c86e392737b136c4069eaa46e7c8b91c3f34d3@35.160.81.200:30303")
//blockchain2
admin.addPeer("enode://1e9a3f0da7b3c59b609146928396a56df92a80586fe7846c51462d83f84b59f67c7486f450bcd825134ba6c8261fb86d66981c58eb6576d9ce2ee6262ac59e23@35.162.198.58:30303")
//blockchain3
admin.addPeer("enode://ae298c94480f47189dbcb0e8d330c7d2a41d01a82c07f7fa0b6a2247016fe19be2a2527bed9c8fb66e0e4a37e1a457acca0c7ca407c27b91d2604d333311ec00@35.160.136.196:30303")


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
