29 June 2017
Added the launch script ~/work/server/rungeth.py.
The "Skeletal demo" contract source files were added to the ~/work/contract  folder.
These files are needed in case the contract needs to be redeployed.
The scripts to launch geth in the rest of the NUCs from NUC1 have not been updated.


11 May 2017
The "Skeletal demo" now runs on the same blockchain database as the "Full demo".
The instructions below were updated to reflect this change.
The scripts to launch geth in the rest of the NUCs from NUC1 have not been updated.


----RUNNING THE SKELETAL DEMO-----------------------------------------------------------------
1. See the "LAUNCH GETH NODE" section of this file.
2. Once the geth node is running, check in the geth console that:
   - There are at least 4 user accounts. Use the command:
     > personal.listAccounts 
     otherwise server.py will not work properly.
   - The coinbase account has ether. Use the command:
     > eth.getBalance(personal.listAccounts[0])
3. Run "python ~/work/server/server.py" 
4. To run the demonstrator page, open a browser window http://host:server_tcp_port
   where host is the ip where server.py is running and 
   server_tcp_port is the port specified in the file server/config.json
5. To run the administrative page (to load tokens into owner accounts), 
   open a browser window http://host:server_tcp_port/admin.html
   where host is the ip of the machine where server.py is running and
   server_tcp_port is the port specified in the file server/config.json 

----CONFIGURATION-----------------------------------------------------------------

server/config.json
Contains the address of the contract, geth rpc port, web server port and hue bridge port.

server/block_interface.js
Must contain the address and port number of the computer where server.py runs.
These parameters must match the server/config.json file.
*Example:
var port = "8085";
var host = "http://192.168.0.102:" + port;


geth_dependencies/start.js
A script that runs when geth is launched (if the --preload parameter is specified).
It loads a function to run the miner only when there are pending transactions.
Also it instantiates the contract used by the demo, in case it is necessary to
interact with the contract directly from the geth console.



----SKELETAL DEMO CONTRACT SOURCE FILES-----------------------------------------
contract/token2.sol             contains the source code of the contract. 
contract/token2_deployment.txt  contains the deployment code.
contract/token2_abi.txt         contains the ABI interface .
contract/token2_hashes          contains the function hashes.
Note: The deployment code and ABI were obtained from an online compiler
https://remix.ethereum.org/
The contract address must be specified in server/config.json 

*Checksums at the time this README file was written:
1437913872 1326 token2_abi.txt
699958636 5762 token2_deployment.txt
1772815741 1208 token2_hashes.txt
2475329826 1596 token2.sol



----LAUNCH GETH NODE-----------------------------------------------------
The database where the contract is deployed is (datadir): ~/fulldemoblockchain
To launch the geth node, run the following script:
$ python ~/work/server/rungeth.py
Make sure the appropriate parameters are defined in:
~/work/geth_dependencies/geth_parameters.json
NOTE: NEW SCRIPTS ARE REQUIRED TO LAUNCH THE REST OF THE NODES REMOTELY!


----TROUBLESHOOTING------------------------------------------------------------
* Rights are not being saved.
  - Check that the coinbase acccount exists using >eth.coinbase in the geth console.
  - Check that the coinbase account has ether balance using > eth.getBalance(personal.listAccounts[0]).
    If it has no balance, run > miner.start() for a few minutes, then > miner.stop()
    Make sure that the mining process is not interrupted prematurely by any scripts, for instance,
    the script to only mine when there are pending transactions.
* geth console does not launch
  - Check if there is a "failed to unlock account" message in the terminal. 
    Make sure the password of the coinbase account is correct in the password file 
    specified in ~/work/geth_dependencies/geth_parameters.json