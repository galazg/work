#this code works across the local network

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import requests

pcoin_contract_address = '0x8dc03da3c476926e620fc9efd4c6137a02417354'
fer =  '0x14c1b2ed09229c2df7c04ec92115ece6d1eabe73'
jon = '0x50dad339ff9cf7e31cf2de1ea55ef54ca29b346c'


def some_function():
    print "some_function got called"

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(s):

        p = s.path.index('&')
        function = s.path[1:p]

        print(p)
        print(function)

#        if s.path == '/validate':
        if function == 'validate':
            # Insert your code here
            user = s.path[p+1:len(s.path)]
            print(user)
            if user == 'fer':
                user_address = fer
            elif user == 'jon':
                user_address = jon
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
            s.wfile.write("<body><p>This is a test.</p>")
            # If someone went to "http://something.somewhere.net/foo/bar/",
            # then s.path equals "/foo/bar/".
            s.wfile.write("<p>User: %s</p>" % user)
            s.wfile.write("<p>Rights level: %s</p>" % result)
            s.wfile.write("</body></html>")

httpd = SocketServer.TCPServer(("", 8084), MyHandler)
httpd.serve_forever()
