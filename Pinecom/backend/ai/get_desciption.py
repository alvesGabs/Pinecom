import os
import subprocess
import threading
import time
import pyperclip

class PageReader():
    def __init__(self):
        self.url = ""
        self.product = {
            "name": "",
            "description": "",
            "value": ""
        }
    def download_page(self):
        os.system("cd ./temp && wget "+self.url)

    def get_info(self):
        input("PRESS ENTER TO START")
        self.url = pyperclip.paste()#input("type here the url (amazon): ")
        download_page_thread = threading.Thread(target=self.download_page)
        download_page_thread.start()
        time.sleep(5)
        os.system("cd ./temp && cat * | grep -o '<title>.*</title>' >> return.txt")
        os.system("cd ./temp && cat * | grep -o '<p> <span>.*</span>  </p>' >> return.txt")
        time.sleep(0.5)
        return_file = open("./temp/return.txt")
        return_file_content = return_file.readlines()
        self.product["name"] = return_file_content[0].strip().strip("</title>").strip("<title>").strip("| : Amazon.com.br")
        self.product["description"] = return_file_content[1].strip().strip("<p> <span>").strip("</span>  </p>")
        #self.product["value"] = return_file_content[2].strip()
        return_file.close()
        os.system("cd ./temp && rm *")
        print("product:", str(self.product))


pag = PageReader()
pag.get_info()