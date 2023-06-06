from flask import Flask, request
from translate import translate_to_mavproxy_command
import subprocess

app = Flask(__name__)
testing=True

@app.route('/send-data', methods=['POST'])
def send_command():
    data = request.get_json()
    print(data)
    mavproxy_command = translate_to_mavproxy_command(data)

    if mavproxy_command and not testing:
        subprocess.call(['mavproxy.py', '--master=/dev/ttyAMA0', '--baudrate', '57600', '--aircraft', 'MyCopter', '--', mavproxy_command])
        return {"status": "success"}
    else:
         print(['mavproxy.py', '--master=/dev/ttyAMA0', '--baudrate', '57600', '--aircraft', 'MyCopter', '--', mavproxy_command])
         return {"status": "failed to execute command or in testing mode"}


        

if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000)