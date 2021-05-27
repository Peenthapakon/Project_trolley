
import serial
import time
import sys 
import subprocess



cmd = "rfcomm connect connect 98:D3:32:30:EB:0B "
device_id = "hci0" 
status, output = subprocess.getstatusoutput(cmd)
bt_mac = output

print(bt_mac)
print("number is ",sys.argv[1]) 



                 
                
