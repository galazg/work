import platform
import json
from pprint import pprint
from subprocess import call


prefix = '~/' if platform.system()=='Linux' else 'c:/'
with open('../geth_dependencies/geth_parameters.json') as data_file:    
    data = json.load(data_file)

#pprint(data)

dependenciesdir = prefix + data["dependencies"]

command = 'geth --networkid {} --datadir {}'.format(data["networkid"],prefix+data["datadir"])

if data["initialize"]["run"]:
	command+= ' init {}'.format(dependenciesdir+data["initialize"]["filename"])

else:
    command+= ' --preload {}'.format(dependenciesdir+data["loadscript"]["filename"]) if data["loadscript"]["run"] else ''

    #adjust to the number of accounts to unlock. Temporary! until i figure out how to use a wallet
    command+= ' --unlock "0" --password {}'.format(dependenciesdir+data["unlock"]["filename"]) if data["unlock"]["run"] else ''
    
    command+= ' --rpc --rpcapi "{}" --rpccorsdomain "{}"'.format(data["rpc"]["rpcapi"],data["rpc"]["rpccorsdomain"]) if data["rpc"]["run"] else ''
    command+= ' --mine' if data["miner"]["run"] else ''
    command+= ' --nodiscover'
    command+= ' --maxpeers 0'

    command+= ' --verbosity 5 console 2>> {}'.format(dependenciesdir+'logfile.txt') if data["logfile"]["run"] else ' console'
       
print command
call([command],shell=True),
