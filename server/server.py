#this code works across the local network
#responds to web UI in json format

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests
from os import curdir, sep
import urlparse, json

host = 'http://localhost:8001'  #entry point of geth node, running on the same computer as the web server
tcp_port = 8085

#To do: read lamp addresses from from file

#lamp_address = {'1':'http://192.168.0.100/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/1/state', '2':'http://192.168.0.100/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/2/state', '3':'http://192.168.0.100/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/3/state'}
#lamp1 = 'http://192.168.0.100/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/1/state'
#lamp2 = 'http://192.168.0.100/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/2/state'
#lamp3 = 'http://192.168.0.100/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/3/state'
bridge_address = 'http://192.168.0.230/api/tNpRZeZwa9QzHrEebHws8wXYT10SzEYlzQRXUOdO/lights/'
hue_values = {'yellow':'10000', 'red':'0', 'blue':'47000'}

print 'Running server on port ' + str(tcp_port)

#Load contract address from file
f = open ( 'contracts.txt' , 'r')
contracts = [ line.strip() for line in f]
pcoin_contract_address = contracts[0] 
print 'Contract address: ' + pcoin_contract_address

#Query blockchain lamp1for account numbers of users
data = '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
r = requests.post(host, data=data)
accounts = json.loads(r.text)
accounts = accounts["result"]
for user in accounts:
    print user

#user1 = accounts[0]
#user2 = accounts[1]
#user3 = accounts[2]
#user4 = accounts[3]
#print user1
#print user2
#print user3
#print user4

#Define transaction sender
#sender = user1
sender = accounts[0]

#To do: load method hashes from file
method_hash = {'validate':'0x98e0ae14000000000000000000000000', 'topup':'0x05ab421d000000000000000000000000', 'check_money': '0xa3825d99000000000000000000000000', 'register':'0xf9454f3f000000000000000000000000', 'reset':'0x6b8ab97d000000000000000000000000'}
#validate_method_hash = '0x98e0ae14000000000000000000000000' #changed!
#topup_method_hash = '0x05ab421d000000000000000000000000'
#check_money_method_hash = '0xa3825d99000000000000000000000000'
#register_method_hash = '0xf9454f3f000000000000000000000000' #changed!
#reset_method_hash = '0x6b8ab97d000000000000000000000000'


#Define the mimetypes
mimetypes = {'.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.jpeg':'image/jpeg', '.ico':'image/x-icon'}

def set_mimetype(path):

    try:
        extension = path[path.rfind(".") : len(path)]
        typeFound = mimetypes[extension]
    except:
        typeFound = 'text/html'
        print "Using default mimetype text/html"  
    else:
        print "mimetype recognized: " + typeFound
    return typeFound;

#substitute this part by using the accounts[]
def getAddress(user):
    try:
    #print user + " account is " + accounts[int(user[4]) - 1]
        account = accounts[int(user[4])-1]
    except:
        account = '0x0000000000000000000000000000000000000000'
        print "No account associated with user provided, using default"
    else:
        print "User " + user + " has account " + account
    return account;

    #if user == 'user1':
    #    return user1;
    #elif user == 'user2':
    #    return user2;
    #elif user == 'user3':
    #    return user3;
    #elif user == 'user4':
    #    return user4;
    #else:
    #    return '0x0000000000000000000000000000000000000000';

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):

        if self.path == '/':
            self.path = '/index.html'

        mimetype = set_mimetype(self.path)

        #if self.path.find(".css") > 0:
        #    mimetype = 'text/css'
        #elif self.path.find(".js") > 0:
        #    mimetype = 'application/javascript'
        #elif self.path.find(".jpeg") > 0:
        #    mimetype = 'image/jpeg'
        #else:
        #    mimetype = 'text/html'    

#        if self.path =='/':
#            self.path = '/index.html'
#            mimetype='text/html'
#        if self.path =='/bootstrap/css/bootstrap.min.css':
#            mimetype='text/css'
#        if self.path =='/bootstrap/js/bootstrap.min.js':
#            mimetype='application/javascript'
#        if self.path =='/block_interface.js':
#            mimetype='application/javascript'
#        if self.path =='/hue/lamp-icons.css':
#            mimetype='text/css'
#        if self.path =='/hue/lamp-icons.jpeg':
#            mimetype='image/jpeg'

        f = open(curdir + sep + self.path, "rb")
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
        print "user indicated is " + data["user"]
        user_address = getAddress(data["user"])

        if command == "validate":
            #deviceid_param = padded_hex(int(deviceid,64))
            deviceid_param = '000000000000000000000000000000000000000000000000000000000000000' + deviceid
            rpc_data = method_hash[command] + user_address[2:len(user_address)] + deviceid_param
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            user_level_found = int(contract_response["result"],0)
            print "user level found: " + str(user_level_found) #convert result from hex string to int
            #The response to the web UI
            self.wfile.write('{"result":"' + str(int(contract_response["result"],0)) +  '"}')

        elif command == "on":
            #Validation step was removed from here since it is already done in block_interface
            #deviceid_param = '000000000000000000000000000000000000000000000000000000000000000' + deviceid
            #rpc_data = method_hash["validate"] + user_address[2:len(user_address)] + deviceid_param
            #data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            #r = requests.post(host, data=data)
            #print r.text
            #contract_response = json.loads(r.text)
            #user_level_found = int(contract_response["result"],0)
            #print "user level found: " + str(user_level_found) #convert result from hex string to int
            #The response to the web UI


            #if user_level_found == 1 or user_level_found == 3 or user_level_found == 5 or user_level_found == 7:
            #    self.wfile.write('{"result":"sucess"}')

            data = '{"on":true, "sat":254, "bri":150,"hue":'+ hue_values[arg] +'}'
            #        else:
            #            data = '{"on":true}'
            
            #THIS ATTEMPT TO USE DICTIONARY DIDNT WORK SOME COMMANDS GET LOST!!!
            #address_temp = lamp_address[deviceid]
            #print "command sent to lamp id {} at address {}".format(deviceid,address_temp)
            r2 = requests.put(bridge_address + deviceid + '/state', data)
            
            #if deviceid == "1":
            #    r2 = requests.put(lamp1, data)
            #elif deviceid == "2":
            #    r2 = requests.put(lamp2, data)
            #elif deviceid == "3":
            #    r2 = requests.put(lamp3, data)

            self.wfile.write('{"result":"sucess"}')
            print r2.text

        elif command == "off":
            #THIS ATTEMPT TO USE DICTIONARY DIDNT WORK SOME COMMANDS GET LOST!!!
            #r2 = requests.put(lamp_address[deviceid], '{"on":false}' )
            #print r2.text
            r2 = requests.put(bridge_address + deviceid + '/state', '{"on":false}')

            #if deviceid == "1":
            #    r2 = requests.put(lamp1, '{"on":false}' )
            #elif deviceid == "2":
            #    r2 = requests.put(lamp2, '{"on":false}' )
            #elif deviceid == "3":
            #    r2 = requests.put(lamp3, '{"on":false}' )

            self.wfile.write('{"result":"sucess"}')
            print r2.text
            #else:
            #    print "Not enough rights!"
            #    self.wfile.write('{"result":"no rights"}')


        elif command == "topup":
            # Existance of user is not validated!!!
            print "tokens to load: " + str(tokens)
            tokens_param = padded_hex(int(tokens),64)
            print("Top up user: "+user+" with "+ tokens+" tokens");
            rpc_data = method_hash[command] + user_address[2:len(user_address)] + tokens_param[2:len(tokens_param)]
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            self.wfile.write('{"result":"' + 'ok' +  '"}')

        elif command == "register":
            # Existance of user is not validated!!!
            # Request to register to a lower level than current is not validated!!!
            print "Register: " + user + " with level " + level + " device " + deviceid
            level_param = padded_hex(int(level),64)
            #deviceid_param = padded_hex(int(deviceid,64))
            deviceid_param = '000000000000000000000000000000000000000000000000000000000000000' + deviceid
            #Check money first
            rpc_data = method_hash["check_money"] + user_address[2:len(user_address)] + level_param[2:len(level_param)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            has_money = int(contract_response["result"],0)
            if has_money > 0 :
                print "User has money, proceed to register"
                rpc_data = method_hash[command] + user_address[2:len(user_address)] + deviceid_param + level_param[2:len(level_param)]

                data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
                print data
                r = requests.post(host, data=data)
                print r.text
                contract_response = json.loads(r.text) #not forwarded to the web UI at the moment
                self.wfile.write('{"result":"' + 'has money' +  '" , "balance":"'+ str(has_money-int(level)*100)  +'  "  }  ')
            else:
                print "User has no money"
                self.wfile.write('{"result":"' + 'no money' +  '"}')


        elif command == "reset":
            rpc_data = method_hash[command] + user_address[2:len(user_address)]
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
