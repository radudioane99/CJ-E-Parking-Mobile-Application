#Libraries
import RPi.GPIO as GPIO
import time
import requests

apiHost = 'https://828a-46-214-35-36.ngrok.io'
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)

#set GPIO Pins
GPIO_TRIGGER1 = 4
GPIO_ECHO1 = 27

GPIO_TRIGGER2 = 23
GPIO_ECHO2 = 25
 
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER1, GPIO.OUT)
GPIO.setup(GPIO_ECHO1, GPIO.IN)
GPIO.setup(GPIO_TRIGGER2, GPIO.OUT)
GPIO.setup(GPIO_ECHO2, GPIO.IN)

def send_request(number):
    response = requests.get(apiHost + '/Locations/GetNumber/' + str(number))
    response.close()
    
def distance(triggerPin, echoPin):
    # set Trigger to HIGH
    GPIO.output(triggerPin, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(triggerPin, False)
 
    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(echoPin) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(echoPin) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance
 
if __name__ == '__main__':
    try:
        while True:
            dist1 = distance(GPIO_TRIGGER1, GPIO_ECHO1)
            print ("Measured Distance sensor 1 = %.1f cm" % dist1)
            if dist1 < 10:
              send_request(1)

            dist2 = distance(GPIO_TRIGGER2, GPIO_ECHO2)
            print ("Measured Distance sensor 2 = %.1f cm" % dist2)
            if dist2 < 10:
              send_request(-1)
            time.sleep(2)
 
        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        GPIO.cleanup()