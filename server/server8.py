#this code works across the local network
#responds to web UI in json format

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests
from os import curdir, sep
import urlparse, json

host = 'http://localhost:8001'  #entry point of geth node, running on the same computer as the web server
tcp_port = 8085
# bridge = 'http://192.168.0.198/api/4aIiIAlJt2VZyKoLPyVwBImjYTRgeyNfOytY2L4R/lights/1/state'

print 'Running server on port ' + str(tcp_port)

#pcoin_contract_address = '0x9d22edeb4a57987e3709a08bdda9be7690497f0a' #added levels 0-7 MAC
#pcoin_contract_address = '0x41f8ae8180bd3c4a5da2f40282cc89fb89bb0ccc' #added levels 0-7 PC

f = open ( 'contracts.txt' , 'r')
contracts = [ line.strip() for line in f]

# pcoin_contract_address = '0x697b8fad3292e594a4312dc94a17e2dced12e97e' #redefined with deviceid
pcoin_contract_address = contracts[0] #redefined with deviceid
print 'Contract address: ' + pcoin_contract_address

data = '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
r = requests.post(host, data=data)
#print r.text
accounts = json.loads(r.text)
accounts = accounts["result"]
# for i in accounts_:
#     print i


#fer =  '0x14c1b2ed09229c2df7c04ec92115ece6d1eabe73' #MAC
#jon = '0x50dad339ff9cf7e31cf2de1ea55ef54ca29b346c' #MAC
#mike = '0xcb1f98d8885db7e6451de659bfe55f5ebf7f396f' #MAC

# user1 = '0x4b306668a147951526918da5240432ad67f967c0' #PC
# user2 = '0x4338155e90a9711e058d160f6723bf1032881410' #PC
# user3 = '0x93c3a68e2c431c75a7a2c3ed49f83eb1a04210b2' #PC
# user4 = '0xe404f3faa02ffebebd17c1b5783134f1a7d3af7c' #this will have no money
user1 = accounts[0]
user2 = accounts[1]
user3 = accounts[2]
user4 = accounts[3]

print user1
print user2
print user3
print user4


sender = user1
#sender = '0x168b9bea655f59c73f55da2da227ac2ba6ccb691' #master account in node1 (nuc)

#pcoin
#validate_method_hash = '0x207c64fb000000000000000000000000'
#topup_method_hash = '0x05ab421d000000000000000000000000'
#check_money_method_hash = '0xa3825d99000000000000000000000000'
#register_method_hash = '0x6d705ebb000000000000000000000000'
#reset_method_hash = '0x6b8ab97d000000000000000000000000'

#pcoin2
validate_method_hash = '0x98e0ae14000000000000000000000000' #changed!
topup_method_hash = '0x05ab421d000000000000000000000000'
check_money_method_hash = '0xa3825d99000000000000000000000000'
register_method_hash = '0xf9454f3f000000000000000000000000' #changed!
reset_method_hash = '0x6b8ab97d000000000000000000000000'


def getAddress(user):
    if user == 'user1':
        return user1;
    elif user == 'user2':
        return user2;
    elif user == 'user3':
        return user3;
    elif user == 'user4':
        return user4;
    else:
        return '0x0000000000000000000000000000000000000000';

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        mimetype='text/html'
        if self.path =='/':
        	#Open the static file requested and send it
            self.path = '/index3.html'
            mimetype='text/html'
        if self.path =='/bootstrap/css/bootstrap.min.css':
            mimetype='text/css'
        if self.path =='/bootstrap/js/bootstrap.min.js':
            mimetype='application/javascript'
        if self.path =='/block_interface.js':
            mimetype='application/javascript'

        f = open(curdir + sep + self.path)
        print curdir + sep + self.path
        self.send_response(200)
        self.send_header('Content-type',mimetype)
        self.end_headers()
        self.wfile.write(f.read())
        f.close()


    def do_POST(self):
        content_len = int(self.headers.getheader('content-length'))
        post_body = self.rfile.read(content_len)
        self.send_response(200)
        self.end_headers()
        data = json.loads(post_body) # data is the json object received from the web ui
        command = data["command"]
        user = data["user"]
        level = data["level"]
        tokens = data["tokens"]
        deviceid = data["deviceid"] #new
        arg = data["arg"]
        print data
        user_address = getAddress(data["user"])

        if command == "validate":
            #deviceid_param = padded_hex(int(deviceid,64))
            deviceid_param = '000000000000000000000000000000000000000000000000000000000000000' + deviceid
            rpc_data = validate_method_hash + user_address[2:len(user_address)] + deviceid_param
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            user_level_found = int(contract_response["result"],0)
            print user_level_found #convert result from hex string to int
            #The response to the web UI
            self.wfile.write('{"result":"' + str(int(contract_response["result"],0)) +  '"}')

        if command == "on" or command == "off":
            rpc_data = validate_method_hash + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            user_level_found = int(contract_response["result"],0)
            print user_level_found #convert result from hex string to int
            #The response to the web UI

            if user_level_found == 3:
                self.wfile.write('{"result":"sucess"}')
                if command == "on":
                    if arg != "":
                        data = '{"on":true, "sat":254, "bri":254,"hue":'+ arg +'}'
                    else:
                        data = '{"on":true}'
                    r2 = requests.put(bridge, data)
                    print r2.text

                elif command =="off":
                    r2 = requests.put(bridge, '{"on":false}' )
                    print r2.text
            else:
                print "Not enough rights!"
                self.wfile.write('{"result":"no rights"}')


        if command == "topup":
            # Existance of user is not validated!!!
            print "tokens to load: " + str(tokens)
            tokens_param = padded_hex(int(tokens),64)
            print("Top up user: "+user+" with "+ tokens+" tokens");
            rpc_data = topup_method_hash + user_address[2:len(user_address)] + tokens_param[2:len(tokens_param)]
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            self.wfile.write('{"result":"' + 'ok' +  '"}')

        if command == "register":
            # Existance of user is not validated!!!
            # Request to register to a lower level than current is not validated!!!
            print "Register: " + user + " with level " + level + " device " + deviceid
            level_param = padded_hex(int(level),64)
            #deviceid_param = padded_hex(int(deviceid,64))
            deviceid_param = '000000000000000000000000000000000000000000000000000000000000000' + deviceid
            #Check money first
            rpc_data = check_money_method_hash + user_address[2:len(user_address)] + level_param[2:len(level_param)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            has_money = int(contract_response["result"],0)
            if has_money > 0 :
                print "User has money, proceed to register"
                rpc_data = register_method_hash + user_address[2:len(user_address)] + deviceid_param + level_param[2:len(level_param)]

                data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
                print data
                r = requests.post(host, data=data)
                print r.text
                contract_response = json.loads(r.text) #not forwarded to the web UI at the moment
                self.wfile.write('{"result":"' + 'has money' +  '" , "balance":"'+ str(has_money-int(level)*100)  +'  "  }  ')
            else:
                print "User has no money"
                self.wfile.write('{"result":"' + 'no money' +  '"}')


        if command == "reset":
            rpc_data = reset_method_hash + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text) #not forwarded to the web UI at the moment
            self.wfile.write('{"result":"' + 'reset successful' +  '"}')

        return

def padded_hex(i, l):
    given_int = i
    given_len = l

    hex_result = hex(given_int)[2:] # remove '0x' from beginning of str
    num_hex_chars = len(hex_result)
    extra_zeros = '0' * (given_len - num_hex_chars) # may not get used..

    return ('0x' + hex_result if num_hex_chars == given_len else
            '?' * given_len if num_hex_chars > given_len else
            '0x' + extra_zeros + hex_result if num_hex_chars < given_len else
            None)

httpd = SocketServer.TCPServer(("", tcp_port), MyHandler)
httpd.serve_forever()
