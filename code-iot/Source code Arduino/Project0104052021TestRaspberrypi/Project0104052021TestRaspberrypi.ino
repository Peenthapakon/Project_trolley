
#include <SoftwareSerial.h>
SoftwareSerial BTSerial(2, 3);// RX | TX เซ็ทพิน บลูทูธ

int A1_0 = 10;
int A1_1 = 11;

int A2_0 = 5;
//int A2_1 = 5;

int A3_0 = 6;
//int A3_1 = 6;

int A4_0 = 7;
//int A4_0 = 7;

int A5_0 = A1; // ใส่เลข พิน
int A6_0 = A2; //ใส่เลข พิน
int A7_0 = A3; // ใส่เลข พิน

String message = "";

void setup() {
  Serial.begin(9600);
  BTSerial.begin(9600);

  pinMode(A1_0, OUTPUT);
  pinMode(A1_1, OUTPUT);

  pinMode(A2_0, OUTPUT);
  pinMode(A3_0, OUTPUT);
  pinMode(A4_0, OUTPUT);

  pinMode(A5_0, OUTPUT);
  pinMode(A6_0, OUTPUT);
  pinMode(A7_0, OUTPUT);

  defalt();
}

void unlock(int val) {
  switch (val) {
    case 1:
      digitalWrite(A1_0, LOW);
      digitalWrite(A1_1, HIGH);
      delay(500);
      digitalWrite(A1_0, HIGH);
      digitalWrite(A1_1, LOW);
      delay(500);
      digitalWrite(A1_0, HIGH);
      digitalWrite(A1_1, HIGH);
      break;
    case 2:
      digitalWrite(A2_0, LOW);
      delay(500);
      digitalWrite(A2_0, HIGH);
      break;
    case 3:
      digitalWrite(A3_0, LOW);
      delay(500);
      digitalWrite(A3_0, HIGH);
      break;
    case 4:
      digitalWrite(A4_0, LOW);
      delay(500);
      digitalWrite(A4_0, HIGH);
      break;
    case 5:
      digitalWrite(A5_0, LOW);
      delay(500);
      digitalWrite(A5_0, HIGH);
      break;
    case 6:
      digitalWrite(A6_0, LOW);
      delay(500);
      digitalWrite(A6_0, HIGH);
      break;
    case 7:
      digitalWrite(A7_0, LOW);
      delay(500);
      digitalWrite(A7_0, HIGH);
      break;
  }
}

void defalt() {
  digitalWrite(A1_0, HIGH);
  digitalWrite(A1_1, HIGH);

  digitalWrite(A2_0, HIGH);
  digitalWrite(A3_0, HIGH);
  digitalWrite(A4_0, HIGH);

  digitalWrite(A5_0, HIGH);
  digitalWrite(A6_0, HIGH);
  digitalWrite(A7_0, HIGH);
}

void allOn() {
  unlock(1);
  unlock(2);
  unlock(3);
  unlock(4);
  unlock(5);
  unlock(6);
  unlock(7);
}

void ProcessMessage(String val)
{
  if (val == "1")
  {
    Serial.println("unlock");
    unlock(1);
  }

  if (val == "2")
  {
    Serial.println("Lighting 1 ON!!!");
    unlock(2);
  }

  if (val == "3")
  {
    Serial.println("Lighting 2 ON!!!");
    unlock(3);
  }

  if (val == "4")
  {
    Serial.println("Lighting 3 ON!!!");
    unlock(4);
  }

  if (val == "5")
  {
    Serial.println("Lighting 4 ON!!!");
    unlock(5);
  }

  if (val == "6")
  {
    Serial.println("Lighting 5 ON!!!");
    unlock(6);
  }

  if (val == "7")
  {
    Serial.println("Lighting 6 ON!!!");
    unlock(7);
  }

  if (val == "10")
  {
    Serial.println("All ON!!!");
    allOn();
  }
}

void loop() {
  // if there's any serial available, read it:
  if (BTSerial.available()) {
    //char c = (char)BTSerial.read();
    String code = BTSerial.readString();
    //Serial.println(c);
    // look for the newline. That's the end of your sentence:

      message.trim();
      ProcessMessage(code);
      Serial.println(code);
      message = "";
  }
}
