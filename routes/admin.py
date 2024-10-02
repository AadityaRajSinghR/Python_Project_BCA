from flask import Blueprint, render_template, session, redirect, url_for
from backend.getData import fetch_all_data

admin = Blueprint('admin', __name__)

# Admin Routes

@admin.route('/Dashboard')
def Dashboard():
    page = "Dashboard"
    adminLog = session.get('is_admin', None)  # Check admin session data inside the route
    if adminLog:
        return render_template('Admin/Dashboard.html', page=page)
    else:
        return redirect(url_for('home.Login'))  # Redirect to login if not logged in
    

@admin.route('/Admin_Accoun_open')
def Admin_Account_open():
    page = "Account_open"
    adminLog = session.get('is_admin', None)  # Check admin session data inside the route
    if adminLog:
        return render_template('Admin/Account_open.html', page=page)
    else:
        return redirect(url_for('home.Login'))


@admin.route('/All_users')
def All_users():
    page = "All_users"
    adminLog = session.get('is_admin', None)  # Check admin session data inside the route
    users = fetch_all_data()  # Fetch all users data from DB
    if adminLog:
        return render_template('Admin/All_users.html', page=page, users=users)
    else:
        return redirect(url_for('home.Login'))
    

@admin.route('/Loan_Apply')
def Loan_Apply():
    page = "Loan_Apply"
    adminLog = session.get('is_admin', None)  # Check admin session data inside the route
    if adminLog:
        return render_template('Admin/Loan_Apply.html', page=page)
    else:
        return redirect(url_for('home.Login'))


@admin.route('/Loan_Applications')
def Loan_Application():
    page = "Loan_Applications"
    adminLog = session.get('is_admin', None)  # Check admin session data inside the route
    if adminLog:
        return render_template('Admin/Loan_Applications.html', page=page)
    else:
        return redirect(url_for('home.Login'))


@admin.route('/EMI_Calculator')
def EMI_Calculator():
    page = "EMI_Calculator"
    adminLog = session.get('is_admin', None)  # Check admin session data inside the route
    if adminLog:
        return render_template('Admin/EMI_Calculator.html', page=page)
    else:
        return redirect(url_for('home.Login'))
