from flask import Flask , render_template, request
import routes.admin as admin
import routes.home as home

app = Flask(__name__)

app.register_blueprint(home.home)
app.register_blueprint(admin.admin)



if __name__ == '__main__':
    app.run(debug=True)
