from flask import Flask , render_template, request
import routes.admin as admin
import routes.home as home
import routes.Email_OTP as OTP_s
import routes.Mobile_OTP as OTP_Mobile

app = Flask(__name__)

app.register_blueprint(home.home)
app.register_blueprint(admin.admin)
app.register_blueprint(OTP_s.OTP_s)
app.register_blueprint(OTP_Mobile.OTP_Mobile)



if __name__ == '__main__':
    app.run(debug=True)
