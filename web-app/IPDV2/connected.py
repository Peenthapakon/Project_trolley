
import serial
import time
import sys 
import subprocess



cmd = "rfcomm -i show | grep rfcomm | awk '{print $1,$4}'"
device_id = "hci0" 
status, output = subprocess.getstatusoutput(cmd)
bt_mac = output

print(bt_mac)



                 
                
