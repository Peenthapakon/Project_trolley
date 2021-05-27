
import serial
import time
import sys 
import subprocess
#import commands



cmd = "rfcomm -i show | grep rfcomm | awk '{print $1,$4}'"
device_id = "hci0" 
status, output = subprocess.getstatusoutput(cmd)
#status, output = commands.getstatusoutput(cmd)
bt_mac = output

tray1 = serial.Serial("/dev/rfcomm"+sys.argv[1], baudrate=9600)
tray1.write(str(sys.argv[2]).encode('utf8'))
print(bt_mac)
print("number is ",sys.argv[2]) 



                 
                
