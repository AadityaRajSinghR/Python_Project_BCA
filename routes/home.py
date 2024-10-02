from flask import Blueprint, render_template, session, redirect, url_for

home = Blueprint('home', __name__)


# Home Routes
@home.route('/')
def index():
    return render_template('Home/index.html')

@home.route('/Login')
def Login():
    user = session.get('user', None ) or session.get('email', None)
    admin = session.get('user', None ) or session.get('email', None) or session.get('is_admin', None)  # Retrieve user data from the session
    if user:
        return redirect(url_for('user.user_dashboard_page'))
    elif admin:
        return redirect(url_for('admin.Dashboard'))
    else:
        return render_template('Home/Login.html')

@home.route('/Account_open')
def Account_open():
    page="Account_open"
    return render_template('Home/Account_open.html', page=page)

