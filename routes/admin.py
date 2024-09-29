from flask import Blueprint, render_template

from backend.getData import fetch_all_data

admin = Blueprint('admin', __name__)



# Admin Routes
@admin.route('/Dashboard')
def Dashboard():
    page="Dashboard"
    return render_template('Admin/Dashboard.html', page=page)

@admin.route('/Admin_Accoun_open')
def Admin_Account_open():
    page="Account_open"
    return render_template('Admin/Account_open.html', page=page)

@admin.route('/All_users')
def All_users():
    page="All_users"
    users = fetch_all_data()
    return render_template('Admin/All_users.html', page=page, users=users)

@admin.route('/Loan_Apply')
def Loan_Apply():
    page="Loan_Apply"
    return render_template('Admin/Loan_Apply.html', page=page)

@admin.route('/Loan_Applications')
def Loan_Application():
    page="Loan_Applications"
    return render_template('Admin/Loan_Applications.html', page=page)

@admin.route('/EMI_Calculator')
def EMI_Calculator():
    page="EMI_Calculator"
    return render_template('Admin/EMI_Calculator.html', page=page)
