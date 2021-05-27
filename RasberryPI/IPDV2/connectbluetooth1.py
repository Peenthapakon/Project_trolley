
import serial
import time
import sys 
import subprocess



cmd = "rfcomm connect connect  "+sys.argv[1]
device_id = "hci0" 
status, output = subprocess.getstatusoutput(cmd)
bt_mac = output

print(bt_mac)
print("number is ",sys.argv[1]) 



                 
                
