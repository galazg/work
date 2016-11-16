#this code works across the local network

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests

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
    def do_GET(s):

        #function = s.path[1:p]
        #print('Position of &: ' + str(p))
        #print('Function called: ' + function)

#        if s.path == '/validate':
        if s.path.find('validate') > 0:
            print('Function called: validate')
            p = s.path.find('&')
            user = s.path[p+1:len(s.path)]
            user_address = getAddress(user)
            #this parameter is only for the "validate" method of the contract
            rpc_data = '0x207c64fb000000000000000000000000' + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            #this only works when the "validate" method was called
            result = r.text[len(r.text)-4]
            print('RightsLevel: ' + result)
            print r.text
            print s.path
            s.send_response(200)
            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("<html><head><title>Private blockchain</title></head>")
            s.wfile.write("<body><p>Validate user.</p>")
            s.wfile.write("<p>User: %s</p>" % user)
            s.wfile.write("<p>Rights level: %s</p>" % result)
            s.wfile.write("</body></html>")

        elif s.path.find('register') > 0:
            print('Function called: register')
            p = s.path.find('&')
            q = s.path.find('=')
            user = s.path[p+1:q]
            level_requested = s.path[q+1:len(s.path)]
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
            print s.path
            s.send_response(200)
            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("<html><head><title>Private blockchain</title></head>")
            s.wfile.write("<p>User: %s</p>" % user)
            s.wfile.write("<p>Rights level requested: %s</p>" % level_requested)

            #if the user is already registered
            if int(result) > 0:
                print('User already registered with rights level: ' + result)
                s.wfile.write("<p>User was already registered with rights level: %s</p>" % result)
            else:
                #check if there is enough money, and if so, register the user.
                #build data parameter for "checkMoney" RPC call
                rpc_data = '0xa3825d99000000000000000000000000' + user_address[2:len(user_address)] + '000000000000000000000000000000000000000000000000000000000000000' + level_requested
                data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
                r = requests.post('http://localhost:8001', data=data)
                result = r.text[len(r.text)-4]

                #if enough money, register
                if int(result) == 1:
                    s.wfile.write("<p>The user has enough funds.</p>")
                    s.wfile.write("<p>The user has been registered and the tokens deducted.</p>")                    
                    s.wfile.write("</body></html>")
                    #send the register transaction!
                    rpc_data = '0x6d705ebb000000000000000000000000' + user_address[2:len(user_address)] + '000000000000000000000000000000000000000000000000000000000000000' + level_requested
                    data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
                    r = requests.post('http://localhost:8001', data=data)
                    print r.text
                else:
                    print('User does NOT exist or does NOT have enough funds.')
                    s.wfile.write("<p>User does NOT exist or does NOT have enough funds.</p>")
                    s.wfile.write("</body></html>")

        elif s.path.find('miner_start') > 0:
            print ('Start mining!')
            data = '{"jsonrpc":"2.0","method":"miner_start","params":[],"id":74}'
            r = requests.post('http://localhost:8001', data=data)
            print r.text
        elif s.path.find('miner_stop') > 0:
            print('Stop mining!')
        elif s.path.find('is_mining') > 0:
            data = '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
            r = requests.post('http://localhost:8001', data=data)
            print r.text

        elif s.path.find('reset') > 0:
            print('Function called: reset')
            p = s.path.find('&')
            user = s.path[p+1:len(s.path)]
            print(user)
            user_address = getAddress(user)
            #this parameter is only for the "reset" method of the contract
            rpc_data = '0x6b8ab97d000000000000000000000000' + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            print('Balances have been cleared.')
            print r.text
            print s.path
            s.send_response(200)
            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("<html><head><title>Private blockchain</title></head>")
            s.wfile.write("<body><p>The balances have been cleared.</p>")
            s.wfile.write("<p>User: %s</p>" % user)
            s.wfile.write("</body></html>")

        elif s.path.find('topup') > 0:
            print('Function called: sendTokens')
            p = s.path.find('&')
            q = s.path.find('=')
            user = s.path[p+1:q]
            print(user)
            user_address = getAddress(user)
            amount = s.path[q+1:len(s.path)]
            amount_hex = str(hex(int(amount)))
            amount_hex_trimmed = amount_hex[amount_hex.find('x')+1:len(amount_hex)]
            amount_hex_padded = '0000000000000000000000000000000000000000000000000000000000000000'
            amount2 = amount_hex_padded[0:len(amount_hex_padded)-len(amount_hex_trimmed)]+amount_hex_trimmed
            #this parameter is only for the "reset" method of the contract
            rpc_data = '0x05ab421d000000000000000000000000' + user_address[2:len(user_address)] + amount2
            data = '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"' + sender + '", "to":"' + pcoin_contract_address + '", "data": "' + rpc_data +'"}],"id":1}'
            r = requests.post('http://localhost:8001', data=data)
            print('Top up with tokens')
            print s.path
            s.send_response(200)
            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("<html><head><title>Private blockchain</title></head>")
            s.wfile.write("<body><p>Top up with tokens.</p>")
            s.wfile.write("<p>User: %s</p>" % user)
            s.wfile.write("<p>Amount loaded: %s</p>" % amount)
            s.wfile.write("</body></html>")


httpd = SocketServer.TCPServer(("", 8084), MyHandler)
httpd.serve_forever()
