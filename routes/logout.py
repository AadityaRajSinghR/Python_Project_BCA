# LogOut Code
from flask import Blueprint, session, redirect, url_for
logout = Blueprint('logout', __name__)


@logout.route('/logout')
def logout_page():
    session.clear()
    return redirect(url_for('home.index'))