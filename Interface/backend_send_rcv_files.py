from flask import Flask, request, send_file, send_from_directory
from flask_cors import CORS
import os
import shutil
import json
import logging
import time
import requests
import zipfile

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/', methods=['POST'])
def receive_data():
    data = request.get_json(force=True)  # force=True will make sure it gets the data even if a client does not specify the mimetype

    # write columnChange data into a file
    with open('/home/bachir/Bureau/S8/HAI823I TER/scripts/dictionnaire.txt', 'w') as f:
        f.write(json.dumps(data['columnChange']))

    # write fileName into a file
    with open('/home/bachir/Bureau/S8/HAI823I TER/scripts/file_name.txt', 'w') as f:
        f.write(data['fileName'])

    # write fileType into a file
    with open('/home/bachir/Bureau/S8/HAI823I TER/scripts/file_type.txt', 'w') as f:
        f.write(data['fileType'])

    return 'Data received successfully'


@app.route('/', methods=['GET'])
def get_file():
    file_path = '/home/bachir/Bureau/S8/HAI823I TER/scripts/results/CIUSS_TKFH_2019.csv'

    while not os.path.exists(file_path):
        time.sleep(1)  # Wait for 1 second before checking again
    
    # Read the file and send it as a response
    with open(file_path, 'r') as f:
        file_data = f.read()
    
    return file_data


@app.route('/file', methods=['GET'])
def get_files():
    file_paths = [
        '/home/bachir/Bureau/S8/HAI823I TER/scripts/results/CIUSS_TKFH_2019.csv',
        '/home/bachir/Bureau/S8/HAI823I TER/scripts/results/ValidationReport.xlsx'
    ]
    zip_path = '/home/bachir/Bureau/S8/HAI823I TER/scripts/results/Result.zip'

    # Check if the ZIP archive already exists
    if not os.path.exists(zip_path):
        # Create a new ZIP archive
        with zipfile.ZipFile(zip_path, 'w') as zip_file:
            # Add each file to the archive
            for file_path in file_paths:
                if os.path.exists(file_path):
                    zip_file.write(file_path, os.path.basename(file_path))

    # Wait for the ZIP archive to be created
    while not os.path.exists(zip_path):
        time.sleep(1)  # Wait for 1 second before checking again

    return send_from_directory(directory=os.path.dirname(zip_path), path=os.path.basename(zip_path), as_attachment=True)


if __name__ == '__main__':
    app.run(port=5010, debug=True)

