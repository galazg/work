----CONFIGURATION-----------------------------------------------------------------

server/config.txt 
Contains two lines: The first line is the address of the contract.
The second line is the address of the hue bridge.

server/block_interface.js
Specifies the address and port number of the computer where server.py runs.
Example:
var port = "8085";
var host = "http://192.168.0.102:" + port;

geth_dependencies/start.js
A script that runs when geth is launched (if the --preload parameter is specified).
It loads a function to run the miner only when there are pending transactions.
Also it instantiates the contract used by the demo, in case it is necessary to
interact with the contract directly from the geth console.



----CONTRACT FOR THE DEMO--------------------------------------------------------
token2_philips_contract.txt contains the source code of the contract. 
token2_notes.txt contains the deployment code, ABI interface and method hashes.
Note: The deployment code and ABI were obtained from an online compiler
https://remix.ethereum.org/
The contract address must be specified in server/config.txt 
10 May 17 deployed at 0x6e6f3c389179214600c251bdc4418ba10388fc39.



----ETHEREUM PRIVATE NETWORK-----------------------------------------------------
server/geth_launch is the script to run geth. Important parameters are: 
--datadir, path where the blockchain database is stored.
--networkid, identifier of the network. If not specified, it will connect to the live network!



----ETHEREUM ACCOUNTS-------------------------------------------------------------

The user interface is fixed to use 4 "Owner" accounts; Each "Owner" account is
associated to an ethereum user account. Hence, the node to which server.py is 
connected must have at least 4 user accounts. 




