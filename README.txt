11 May 2017
The "Skeletal demo" now runs on the same blockchain database as the "Full demo".
The instructions below were updated to reflect this change.
The scripts to launch geth in the rest of the NUCs from NUC1 have not been updated.


----RUNNING THE SKELETAL DEMO-----------------------------------------------------------------
1. Run the geth node following the instructions in ~/fulldemoapp/README.txt section "Launch geth"
2. Run "python ~/work/server/server.py" 


----CONFIGURATION-----------------------------------------------------------------

server/config.json
Contains the address of the contract, geth rpc port, web server port and hue bridge port.

server/block_interface.js
Must contain the address and port number of the computer where server.py runs.
Example:
var port = "8085";
var host = "http://192.168.0.102:" + port;
These parameters must match the server/config.json file.

geth_dependencies/start.js
A script that runs when geth is launched (if the --preload parameter is specified).
It loads a function to run the miner only when there are pending transactions.
Also it instantiates the contract used by the demo, in case it is necessary to
interact with the contract directly from the geth console.



----SKELETAL DEMO CONTRACT--------------------------------------------------------
token2_philips_contract.txt contains the source code of the contract. 
token2_notes.txt contains the deployment code, ABI interface and method hashes.
Note: The deployment code and ABI were obtained from an online compiler
https://remix.ethereum.org/
The contract address must be specified in server/config.json 



----ETHEREUM PRIVATE NETWORK-----------------------------------------------------
server/geth_launch is the script to run geth. Important parameters are: 
--datadir, path where the blockchain database is stored.
--networkid, identifier of the network. If not specified, it will connect to the live network!
NOTE: this instruction is no longer valid. The contract was deployed in ~/fulldemoblockchain


----ETHEREUM ACCOUNTS-------------------------------------------------------------

The user interface is fixed to use 4 "Owner" accounts; Each "Owner" account is
associated to an ethereum user account. Hence, the node to which server.py is 
connected must have at least 4 user accounts. 




