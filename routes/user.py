from flask import Blueprint, render_template, session, redirect, url_for

user = Blueprint('user', __name__)

@user.route('/user_dashboard')
def user_dashboard_page():
    page = "Dashboard"
    user = session.get('user', None) or session.get('email', None)  # Retrieve user data from the session
    if user:
        return render_template('user/Dashboard.html', page=page, user=user)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in
