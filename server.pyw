import os, sys
from http.server import BaseHTTPRequestHandler, HTTPServer

sys.stdout = open("C:\\Windows\\Temp\\out.log", "w", 1)
sys.stderr = open("C:\\Windows\\Temp\\err.log", "w", 1)

class myHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()

        path = self.path
        message = path

		#os.chdir("C:\\Program Files\\Adobe\\Adobe Illustrator CC 2017\\CEP\\extensions\\ru.list.don'\\")
        if path != '/':
            cutpath = ("\\\\storage\\zakaz\\" + path[1:-3] + "000-" + path[1:-3] + "999\\" + path[1:] + "\\input\\")
            #print (pathNamb)
            #self.wfile.write(bytes(pathNamb, "utf8"))
            os.system("start C:\\Windows\\explorer.exe " + cutpath)
            return

        self.wfile.write(bytes(message, "utf8"))
        return



server = HTTPServer(('127.0.0.1', 8081), myHandler)
server.serve_forever()