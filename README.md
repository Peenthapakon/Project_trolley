# ระบบรถเข็นจ่ายยา
วิธีใช้งานระบบรถเข็นจ่ายยา
Install Ubutu MATE 
- link https://cdimage.ubuntu.com/ubuntu-mate/releases/16.04/release/
# 1. Install Nodejs  for  Rasberry pi 
Step 1 Update System
- sudo apt update
- sudo apt -y upgrade

Step 2: Add Node.js APT Repository
- sudo apt update
- sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
- curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

Step 3: Install Node.js 12 
- sudo apt -y install nodejs

Step 4: check -version
- node --version
# 2. Install Apache Mariadb Phpmyadmin
Step 1 ติดตั้ง Apache 2 
- sudo apt-get install apache2 php 

Step 2 ติดตั้ง MySQL Server
- sudo apt-get install maraidbserver

Step 3 ตั้งค่า MySQL Server
- sudo mysql_secure_installation
- ![image](https://user-images.githubusercontent.com/73109808/119920829-27956080-bf97-11eb-8eda-331ae2ece5b5.png)

Step 4 สร้างUser
- sudo mysql -u root -p
- USE mysql;
- GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '123456' WITH GRANT OPTION;
- FLUSH PRIVILEGES;
- EXIT;
Step 5 ติดตั้ง Phpmyadmin
- sudo apt-get install phpMyAdmin
- sudo apt install php libapache2modphp

Step 6 ตั้งค่า Phpmyadmin
- sudo nano /etc/apache2/apache2.conf
- ![image](https://user-images.githubusercontent.com/73109808/119921286-ecdff800-bf97-11eb-9b52-5dd6b0b74144.png)
- Include /etc/phpmyadmin/apache.conf
- ![image](https://user-images.githubusercontent.com/73109808/119921356-0c772080-bf98-11eb-8cfe-e94ad7d3fb46.png)

# 3. Connect PhpMyadmin
Step 1 restart Apache
- sudo service apache2 restart
Step 2 ทดสอบ PhpMyadmin
- http://localhost/phpmyadmin/index.php

# 4. Deploy Project
Step 1 Clone ไฟล์ Project 
- คัดที่อยู่ไฟล์ project บน github
- ![image](https://user-images.githubusercontent.com/73109808/119922222-95db2280-bf99-11eb-9de7-632940c4d7cc.png)
- เปิด Terminal บนหน้าจอ พิมพ์คำสั่ง
- $ git clone ตามด้วย URL
```bash
git clone https://github.com/Peenthapakon/Project_trolley.git
```
  
Step 2 Start project
- cd 
- sudo npm i
- npm i
Step 3 
Step 4 
Step 5 
Step 6 
Step 7 
Step 8 
Step 9 


