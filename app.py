from flask import Flask , render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('Home/index.html')

@app.route('/Login')
def Login():
    return render_template('Home/Login.html')

@app.route('/Account_open')
def Account_open():
    page="Account_open"
    return render_template('Home/Account_open.html', page=page)


# Admin
@app.route('/Dashboard')
def Dashboard():
    page="Dashboard"
    return render_template('Admin/Dashboard.html', page=page)

@app.route('/Admin_Accoun_open')
def Admin_Account_open():
    page="Account_open"
    return render_template('Admin/Account_open.html', page=page)

@app.route('/All_users')
def All_users():
    page="All_users"
    return render_template('Admin/All_users.html', page=page)

@app.route('/Loan_Apply')
def Loan_Apply():
    page="Loan_Apply"
    return render_template('Admin/Loan_Apply.html', page=page)

@app.route('/Loan_Applications')
def Loan_Application():
    page="Loan_Applications"
    return render_template('Admin/Loan_Applications.html', page=page)

@app.route('/EMI_Calculator')
def EMI_Calculator():
    page="EMI_Calculator"
    return render_template('Admin/EMI_Calculator.html', page=page)



if __name__ == '__main__':
    app.run(debug=True)
