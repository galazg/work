#this code works across the local network

import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
from os import curdir, sep


def some_function():
    print "some_function got called"

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(s):
        if s.path =='/':
        	#Open the static file requested and send it
            s.path = '/test.html'
            mimetype='text/html'
            f = open(curdir + sep + s.path)
            print curdir + sep + s.path
            s.send_response(200)
            s.send_header('Content-type',mimetype)
            s.end_headers()
            s.wfile.write(f.read())
            f.close()
        elif s.path == '/validate':
            # Insert your code here
            print s.path

            s.send_response(200)

            s.send_header("Content-type", "text/html")
            s.end_headers()
            s.wfile.write("<html><head><title>Title goes here.</title></head>")
            s.wfile.write("<body><p>This is a test.</p>")
            # If someone went to "http://something.somewhere.net/foo/bar/",
            # then s.path equals "/foo/bar/".
            s.wfile.write("<p>You accessed path: %s</p>" % s.path)
            s.wfile.write("</body></html>")

httpd = SocketServer.TCPServer(("", 8082), MyHandler)
httpd.serve_forever()
