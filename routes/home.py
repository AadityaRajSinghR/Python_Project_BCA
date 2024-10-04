from flask import Blueprint, render_template, session, redirect, url_for

home = Blueprint('home', __name__)


# Home Routes
@home.route('/')
def index():
    return render_template('Home/index.html')

@home.route('/Login')
def Login():
    # Retrieve user data from the session
    user = session.get('user')
    email = session.get('email')
    is_admin = session.get('is_admin')

    if user and email:  # Check if the user and email are present
        if is_admin:  # If the user is also an admin
            return redirect(url_for('admin.Dashboard'))
        else:
            return redirect(url_for('user.user_dashboard_page'))
    else:
        return render_template('Home/Login.html')


@home.route('/Account_open')
def Account_open():
    page="Account_open"
    return render_template('Home/Account_open.html', page=page)

