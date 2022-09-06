import requests
import paho.mqtt.client as mqtt
import json

CAMUNDA_BASE = 'https://camunda.matmacsystem.it/engine-rest/'
BROKER = "server.matmacsystem.it"
PORT = 1883
TOPIC = "camunda/order/request"


def on_connect(client, userdata, flags, rc):
    client.subscribe(TOPIC)


def on_message(client, userdata, msg):
    print("Received from topic: " + msg.topic + " - Message: " + msg.payload.decode())
    user_in = input("Send the menu? (Y/N): ")
    if user_in == 'y' or user_in == 'Y':
        url = CAMUNDA_BASE + 'message'
        menu = json.loads(msg.payload.decode())
        order_menu = []
        for m in menu:
            order_menu.append(m['id'])
        messageObject = {"messageName": "getPatientOrder", "businessKey": "default",
                         "processVariables": {"order": {"value": order_menu, "type": "string"}}}
        x = requests.post(url, json=messageObject)
        print(x.text)


def start_mqtt_listener():
    client = mqtt.Client("mtds-test-subscriber")
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(BROKER, PORT)
    client.loop_forever()


#Main Process
start = input("Start the process? (Y/N): ")
if start == 'y' or start == 'Y':
    cf = input('Insert CF: ')
    start_payload = {"variables": {"cf": {"value": cf,"type": "String"}, "hid": {"value": "001","type": "String"}},"businessKey": "default"}
    url = CAMUNDA_BASE + 'process-definition/key/mangia-tranquillo/start'
    x = requests.post(url, json=start_payload)
    start_mqtt_listener()
