import serial
import time
import sys 
import subprocess
# import commands


cmd = "rfcomm  -a | grep connected | awk '{print $1,$4}'"
device_id = "hci0" 
status, output = subprocess.getstatusoutput(cmd)
#status, output = commands.getstatusoutput(cmd)
bt_mac = output

print(bt_mac)
# print("number is ",sys.argv[1]) 



                 
