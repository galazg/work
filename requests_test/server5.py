#this code works across the local network
#responds to web UI in json format

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests
from os import curdir, sep
import urlparse, json

host = 'http://localhost:8001'
bridge = 'http://192.168.0.198/api/4aIiIAlJt2VZyKoLPyVwBImjYTRgeyNfOytY2L4R/lights/1/state'

pcoin_contract_address = '0xf03f59fa47ec6680a3b6d84c7a62471553b72840'
fer =  '0x14c1b2ed09229c2df7c04ec92115ece6d1eabe73'
jon = '0x50dad339ff9cf7e31cf2de1ea55ef54ca29b346c'
mike = '0xcb1f98d8885db7e6451de659bfe55f5ebf7f396f'
sender = fer

validate_method_hash = '0x207c64fb000000000000000000000000'
topup_method_hash = '0x05ab421d000000000000000000000000'
check_money_method_hash = '0xa3825d99000000000000000000000000'
register_method_hash = '0x6d705ebb000000000000000000000000'
reset_method_hash = '0x6b8ab97d000000000000000000000000'

def getAddress(user):
    if user == 'fer':
        return fer;
    elif user == 'jon':
        return jon;
    elif user == 'mike':
        return mike;
    else:
        return '0x0000000000000000000000000000000000000000';

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):

        if self.path =='/':
        	#Open the static file requested and send it
            self.path = '/testjson.html'
            mimetype='text/html'
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
        arg = data["arg"]
        print data
        user_address = getAddress(data["user"])

        if command == "validate":
            rpc_data = validate_method_hash + user_address[2:len(user_address)]
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
            rpc_data = topup_method_hash + user_address[2:len(user_address)] + tokens_param[2:len(tokens_param)]
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            self.wfile.write('{"result":"' + 'ok' +  '"}')

        if command == "register":
            # Existance of user is not validated!!!
            # Request to register to a lower level than current is not validated!!!
            print "Register: " + user + " with level " + level
            level_param = padded_hex(int(level),64)
            #Check money first
            rpc_data = check_money_method_hash + user_address[2:len(user_address)] + level_param[2:len(level_param)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post(host, data=data)
            print r.text
            contract_response = json.loads(r.text)
            has_money = int(contract_response["result"],0)
            if has_money == 1:
                print "User has money, proceed to register"
                rpc_data = register_method_hash + user_address[2:len(user_address)] + level_param[2:len(level_param)]
                data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
                r = requests.post(host, data=data)
                print r.text
                contract_response = json.loads(r.text) #not forwarded to the web UI at the moment
                self.wfile.write('{"result":"' + 'has money' +  '"}')
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

httpd = SocketServer.TCPServer(("", 8085), MyHandler)
httpd.serve_forever()
