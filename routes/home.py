from flask import Blueprint, render_template

home = Blueprint('home', __name__)


# Home Routes
@home.route('/')
def index():
    return render_template('Home/index.html')

@home.route('/Login')
def Login():
    return render_template('Home/Login.html')

@home.route('/Account_open')
def Account_open():
    page="Account_open"
    return render_template('Home/Account_open.html', page=page)