import os, sys
from http.server import BaseHTTPRequestHandler, HTTPServer
import xml.etree.ElementTree as ET
import io

sys.stdout = open("C:\\Windows\\Temp\\out.log", "w", 1)
sys.stderr = open("C:\\Windows\\Temp\\err.log", "w", 1)

class myHandler(BaseHTTPRequestHandler):

    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        return

    def do_GET(self):

        i = self.path[2:]
        params =  i.split("=")

        message = params[0]
        #print (i)
		#os.chdir("C:\\Program Files\\Adobe\\Adobe Illustrator CC 2017\\CEP\\extensions\\ru.list.don'\\")
        if params[0] == 'input':
            self.do_HEAD()
            cutpath = ("\\\\storage\\zakaz\\" + params[1][:-3] + "000-" + params[1][:-3] + "999\\" + params[1] + "\\input\\")
            #print (cutpath)
            #self.wfile.write(bytes(pathNamb, "utf8"))
            os.system("start C:\\Windows\\explorer.exe " + cutpath)
            return
        
        if params[0] == 'xml':
            tree = ET.parse("\\\\storage\\zakaz\\" + params[1][:-3] + "000-" + params[1][:-3] + "999\\" + params[1] + "\\xml\\" + 'specification_' + params[1] + '.xml')
            root = tree.getroot()
            #print(self.address_string())
            #self.fp = io.BufferedIOBase()
            #self.fp.write(bytes(ET.tostring(root, encoding='utf8').decode('utf8')))
            #print((ET.tostring(root, encoding='utf8').decode('utf8')))
            self.do_HEAD()
            
            self.wfile.write(bytes(ET.tostring(root, encoding='utf8').decode('utf8'), 'utf8'))
            return

        self.wfile.write(bytes(message, "utf8"))
        return



server = HTTPServer(('127.0.0.1', 8081), myHandler)
server.serve_forever()