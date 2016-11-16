#this code works across the local network

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests

pcoin_contract_address = '0x8dc03da3c476926e620fc9efd4c6137a02417354'
fer =  '0x14c1b2ed09229c2df7c04ec92115ece6d1eabe73'
jon = '0x50dad339ff9cf7e31cf2de1ea55ef54ca29b346c'
mike = '0xcb1f98d8885db7e6451de659bfe55f5ebf7f396f'

def some_function():
    print "some_function got called"

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
            print(user)
            if user == 'fer':
                user_address = fer
            elif user == 'jon':
                user_address = jon
            elif user == 'mike':
                user_address = mike
            else:
                user_address = '0x0000000000000000000000000000000000000000'

            #this parameter is only for the "validate" method of the contract
            rpc_data = '0x207c64fb000000000000000000000000' + user_address[2:len(user_address)]

            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post('http://localhost:8001', data=data)

            #this only works when the "validate" method was called
            result = r.text[len(r.text)-4]
            print('RightsLevel: ' + result)

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
            if user == 'fer':
                user_address = fer
            elif user == 'jon':
                user_address = jon
            elif user == 'mike':
                user_address = mike
            else:
                user_address = '0x0000000000000000000000000000000000000000'

            #first, check if user is already registered with the RightsLevel requested
            #this parameter is only for the "validate" method of the contract
            rpc_data = '0x207c64fb000000000000000000000000' + user_address[2:len(user_address)]
            data = '{"jsonrpc":"2.0","method":"eth_call","params":[{"to": "' + pcoin_contract_address + '", "data": "'+ rpc_data +'"}, "latest"],"id":1}'
            r = requests.post('http://localhost:8001', data=data)

            #this only works when the "validate" method was called
            result = r.text[len(r.text)-4]

            print s.path
            s.send_response(200)
            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("<html><head><title>Private blockchain</title></head>")
            s.wfile.write("<p>User: %s</p>" % user)

            if int(result) > 0:
                print('User already registered with rights level: ' + result)
                s.wfile.write("<p>was already registered with rights level: %s</p>" % result)
                s.wfile.write("</body></html>")
            else:
                print('User is not registered yet')
                s.wfile.write("<p>is not registered yet. Rights level requested: %s</p>" % level_requested)
                s.wfile.write("</body></html>")

                #check if there is enough money, and if so, register the user.



httpd = SocketServer.TCPServer(("", 8084), MyHandler)
httpd.serve_forever()
