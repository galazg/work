#this code works across the local network
#responds to web UI in json format

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests
from os import curdir, sep
import urlparse, json

pcoin_contract_address = '0xf03f59fa47ec6680a3b6d84c7a62471553b72840'
fer =  '0x14c1b2ed09229c2df7c04ec92115ece6d1eabe73'
jon = '0x50dad339ff9cf7e31cf2de1ea55ef54ca29b346c'
mike = '0xcb1f98d8885db7e6451de659bfe55f5ebf7f396f'
sender = fer

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

#        if self.path == '/validate':
        if self.path.find('validate') > 0:
            print('Function called: validate')
            p = self.path.find('&')
            user = self.path[p+1:len(self.path)]
            user_address = getAddress(user)
            #this parameter is only for the "validate" method of the contract
            rpc_data = '0x207c64fb000000000000000000000000' + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            #this only works when the "validate" method was called
            print('RightsLevel: ' + r.text[len(r.text)-4])
            print r.text
            print self.path
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(r.text)
            #self.wfile.write(user + " has rights level " + result)

            #self.wfile.write("<html><head><title>Private blockchain</title></head>")
            #self.wfile.write("<body><p>Validate user.</p>")
            #self.wfile.write("<p>User: %s</p>" % user)
            #self.wfile.write("<p>Rights level: %s</p>" % result)
            #self.wfile.write("</body></html>")

        elif self.path.find('register') > 0:
            print('Function called: register')
            p = self.path.find('&')
            q = self.path.find('=')
            user = self.path[p+1:q]
            level_requested = self.path[q+1:len(self.path)]
            print(user)
            print(level_requested)
            user_address = getAddress(user)
            #first, validate if user is already registered with the RightsLevel requested
            #this parameter is only for the "validate" method of the contract
            rpc_data = '0x207c64fb000000000000000000000000' + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            #response after initial validation
            print r.text
            #get the rightsLevel from the response
            result = r.text[len(r.text)-4]
            print result
            print self.path
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            #self.wfile.write("<html><head><title>Private blockchain</title></head>")
            #self.wfile.write("<p>User: %s</p>" % user)
            #self.wfile.write("<p>Rights level requested: %s</p>" % level_requested)


            #if the user is already registered
            if int(result) > 0:
                self.wfile.write('{"result":"already registered"}')
                #print('User already registered with rights level: ' + result)
                #self.wfile.write("<p>User was already registered with rights level: %s</p>" % result)
            else:
                #check if there is enough money, and if so, register the user.
                #build data parameter for "checkMoney" RPC call
                rpc_data = '0xa3825d99000000000000000000000000' + user_address[2:len(user_address)] + '000000000000000000000000000000000000000000000000000000000000000' + level_requested
                data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
                r = requests.post('http://localhost:8001', data=data)
                result = r.text[len(r.text)-4]

                #if enough money, register
                if int(result) == 1:
                    self.wfile.write('{"result":"register successful"}')
                    #self.wfile.write("<p>The user has enough funds.</p>")
                    #self.wfile.write("<p>The user has been registered and the tokens deducted.</p>")
                    #self.wfile.write("</body></html>")
                    #send the register transaction!
                    rpc_data = '0x6d705ebb000000000000000000000000' + user_address[2:len(user_address)] + '000000000000000000000000000000000000000000000000000000000000000' + level_requested
                    data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
                    r = requests.post('http://localhost:8001', data=data)
                    print r.text
                else:
                    self.wfile.write('{"result":"no money"}')
                    print('User does NOT exist or does NOT have enough funds.')
                    #self.wfile.write("<p>User does NOT exist or does NOT have enough funds.</p>")
                    #self.wfile.write("</body></html>")


        elif self.path.find('miner_start') > 0:
            print ('Start mining!')
            data = '{"jsonrpc":"2.0","method":"miner_start","params":[],"id":74}'
            r = requests.post('http://localhost:8001', data=data)
            print r.text
        elif self.path.find('miner_stop') > 0:
            print('Stop mining!')
        elif self.path.find('is_mining') > 0:
            data = '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
            r = requests.post('http://localhost:8001', data=data)
            print r.text

        elif self.path.find('reset') > 0:
            print('Function called: reset')
            p = self.path.find('&')
            user = self.path[p+1:len(self.path)]
            print(user)
            user_address = getAddress(user)
            #this parameter is only for the "reset" method of the contract
            rpc_data = '0x6b8ab97d000000000000000000000000' + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            print('Balances have been cleared.')
            print r.text
            print self.path
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(r.text)
            #self.wfile.write("<html><head><title>Private blockchain</title></head>")
            #self.wfile.write("<body><p>The balances have been cleared.</p>")
            #self.wfile.write("<p>User: %s</p>" % user)
            #self.wfile.write("</body></html>")

        elif self.path.find('topup') > 0:
            print('Function called: sendTokens')
            p = self.path.find('&')
            q = self.path.find('=')
            user = self.path[p+1:q]
            print(user)
            user_address = getAddress(user)
            amount = self.path[q+1:len(self.path)]
            amount_hex = str(hex(int(amount)))
            amount_hex_trimmed = amount_hex[amount_hex.find('x')+1:len(amount_hex)]
            amount_hex_padded = '0000000000000000000000000000000000000000000000000000000000000000'
            amount2 = amount_hex_padded[0:len(amount_hex_padded)-len(amount_hex_trimmed)]+amount_hex_trimmed
            #this parameter is only for the "reset" method of the contract
            rpc_data = '0x05ab421d000000000000000000000000' + user_address[2:len(user_address)] + amount2
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            print('Top up with tokens')
            print self.path
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            #self.wfile.write("<html><head><title>Private blockchain</title></head>")
            #self.wfile.write("<body><p>Top up with tokens.</p>")
            #self.wfile.write("<p>User: %s</p>" % user)
            #self.wfile.write("<p>Amount loaded: %s</p>" % amount)
            #self.wfile.write("</body></html>")
            self.wfile.write(r.text)
        return

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length'))
        post_body = self.rfile.read(content_len)
        self.send_response(200)
        self.end_headers()
        data = json.loads(post_body)
        # data is the json object received from the web ui
        print data
        # this is how the elements of the json object are used
        print data["command"]
        # need to construct the json object that will be sent to the geth node, with the parameters received from web ui

        #an example of the JSON format to be sent
        self.wfile.write('{"jsonrpc":"2.0","method":"validate"}')
        return

httpd = SocketServer.TCPServer(("", 8084), MyHandler)
httpd.serve_forever()
