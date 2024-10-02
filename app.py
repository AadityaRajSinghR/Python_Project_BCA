from flask import Flask
import routes.admin as admin
import routes.user as user
import routes.home as home
import routes.Email_OTP as OTP_s
import routes.Mobile_OTP as OTP_Mobile
import routes.sendMail as sendMail

import routes.login as login
import routes.logout as logout

app = Flask(__name__)
app.secret_key = 'MySecretKey'

app.register_blueprint(home.home)
app.register_blueprint(admin.admin)
app.register_blueprint(user.user)
app.register_blueprint(OTP_s.OTP_s)
app.register_blueprint(OTP_Mobile.OTP_Mobile)
app.register_blueprint(sendMail.success_mail)
app.register_blueprint(login.login)
app.register_blueprint(logout.logout)

# Data Insertion
import backend.insert_data as insert_data
app.register_blueprint(insert_data.insert_data)



if __name__ == '__main__':
    app.run(debug=True)
