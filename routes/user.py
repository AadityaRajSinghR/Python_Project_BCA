from flask import Blueprint, render_template, session, redirect, url_for

user = Blueprint('user', __name__)

@user.route('/user_dashboard')
def user_dashboard_page():
    page = "Dashboard"
    user = session.get('user', None) or session.get('email', None)# Retrieve user data from the session
    if user and not session.get('is_admin', None):  # Check if the user is present
        return render_template('user/Dashboard.html', page=page, user=user)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in

@user.route('/transaction_history')
def user_transaction_history_page():
    page = "Transaction_History"
    if user and not session.get('is_admin', None):  # Check if the user is present
        return render_template('user/Transaction_History.html', page=page)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in
    
@user.route('/user_Loan_Apply')
def user_Loan_Apply_page():
    page = "Loan_Apply"
    if user and not session.get('is_admin', None):  # Check if the user is present
        return render_template('user/user_Loan_Apply.html', page=page)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in
    
    
@user.route('/online_banking')
def user_online_banking_page():
    page = "Online_Banking"
    if user and not session.get('is_admin', None):  # Check if the user is present
        return render_template('user/Online_Banking.html', page=page)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in
    
@user.route('/user_EMI_Calculator')
def user_EMI_Calculator_page():
    page = "EMI_Calculator"
    if user and not session.get('is_admin', None):  # Check if the user is present
        return render_template('user/EMI_Calculator.html', page=page)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in