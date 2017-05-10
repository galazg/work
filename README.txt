----CONFIGURATION-----------------------------------------------------------------

server/config.txt 
Contains two lines: The first line is the address of the contract.
The second line is the address of the hue bridge.

server/block_interface.js
Specifies the address and port number of the computer where server.py runs.
Example:
var port = "8085";
var host = "http://192.168.0.102:" + port;


----ETHEREUM PRIVATE NETWORK-----------------------------------------------------
server/geth_launch is the script to run geth. Important parameters are: 
--datadir, path where the blockchain database is stored.
--networkid, identifier of the network. If not specified, it will connect to the live network!



----ETHEREUM ACCOUNTS-------------------------------------------------------------

The user interface is fixed to use 4 "Owner" accounts; Each "Owner" account is
associated to an ethereum user account. Hence, the node to which server.py is 
connected must have at least 4 user accounts. 




