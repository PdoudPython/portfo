from flask import Flask, render_template, url_for, request, redirect, jsonify
import csv
import checkpass
import requests

app = Flask(__name__)
#to run the server, 

@app.route("/")
def my_home(username=None, post_id=None):
    return render_template('index.html')

@app.route("/<string:page_name>")
def html_page(page_name):
    return render_template(page_name)

def write_to_file(data):
    with open('database.txt', mode='a') as database:
        email = data["email"]
        subject = data['subject']
        message = data["message"]
        file = database.write(f'\n{email}, {subject}, {message}')

def write_to_csv(data):
    with open('database.csv', mode='a', newline='') as database2:
        email = data["email"]
        subject = data['subject']
        message = data["message"]
        csv_writer = csv.writer(database2, delimiter=',', quotechar=';', quoting= csv.QUOTE_MINIMAL)
        csv_writer.writerow([email,subject,message])
    
@app.route('/submit_form', methods=['POST', 'GET'])
def submit_form():
    if request.method == 'POST':
        try:
            data = request.form.to_dict()
            write_to_csv(data)
            return redirect('/thankyou.html')
        except:
            return 'did not save to database'
    else:
        return "Something went wrong, try again!"

@app.route('/check_password', methods=['POST'])
def check_password():
    if request.method == 'POST':
        password = request.form['password']
        count = checkpass.pwned_api_check(password)
        if count:
            result = f"{password} was found {count} times... you should probably change the password..."
        else:
            result = f"{password} was not found! Looks like it's a good password!"
        return render_template('work.html', password_result=result)
    return "Something went wrong, try again!"

@app.route('/calculator')
def calculator():
    return render_template('calculator.html')

@app.route('/weather_checker')
def weather_checker():
    return render_template('weather_checker.html')

@app.route('/converter')
def converter():
    return render_template('converter.html')
