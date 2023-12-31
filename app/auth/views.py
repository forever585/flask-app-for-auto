from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import (
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_rq import get_queue

from app import db
from app.auth.forms import (
    ChangeEmailForm,
    ChangePasswordForm,
    CreatePasswordForm,
    LoginForm,
    RegistrationForm,
    RequestResetPasswordForm,
    ResetPasswordForm,
)
from app.email import send_email
from app.models import User

auth = Blueprint('auth', __name__)


@auth.route('/signin', methods=['GET', 'POST'])
def signin():
    """Log in an existing user."""
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.password_hash is not None and \
                user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            flash('You are now logged in. Welcome back!', 'success')
            return redirect(request.args.get('next') or url_for('client.index'))
        else:
            flash('Invalid email or password.', 'error')
    return render_template('auth/signin.html', form=form)


@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    """Register a new user, and send them a confirmation email."""
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data,
            password=form.password.data,
            confirmed=True)
        db.session.add(user)
        db.session.commit()
        # token = user.generate_confirmation_token()
        # confirm_link = url_for('auth.confirm', token=token, _external=True)
        # get_queue().enqueue(
        #     send_email,
        #     recipient=user.email,
        #     subject='Confirm Your Account',
        #     template='auth/email/confirm',
        #     user=user,
        #     confirm_link=confirm_link)
        # flash('A confirmation link has been sent to {}.'.format(user.email),
        #       'warning')
        return redirect(url_for('auth.signin'))
    return render_template('auth/signup.html', form=form)


@auth.route('/signout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('guest.index'))


@auth.route('/manage', methods=['GET', 'POST'])
@auth.route('/manage/info', methods=['GET', 'POST'])
@login_required
def manage():
    """Display a user's account information."""
    return render_template('auth/manage.html', user=current_user, form=None)


@auth.route('/forgot', methods=['GET', 'POST'])
def reset_password_request():
    """Respond to existing user's request to reset their password."""
    if not current_user.is_anonymous:
        # return redirect(url_for('client.index'))
        pass
    form = RequestResetPasswordForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            token = user.generate_password_reset_token()
            reset_link = url_for(
                'auth.reset_password', token=token, _external=True)
            print('111111111111111111111111')
            get_queue().enqueue(
                send_email,
                recipient=user.email,
                subject='Reset Your Password',
                template='auth/email/reset_password',
                user=user,
                reset_link=reset_link,
                next=request.args.get('next'))
            print('222222222222222222222')
        flash('A password reset link has been sent to {}.'.format(
            form.email.data), 'warning')
        return redirect(url_for('auth.login'))
    return render_template('auth/forgot.html', form=form)


@auth.route('/forgot/<token>', methods=['GET', 'POST'])
def reset_password(token):
    """Reset an existing user's password."""
    if not current_user.is_anonymous:
        return redirect(url_for('client.index'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None:
            flash('Invalid email address.', 'form-error')
            return redirect(url_for('client.index'))
        if user.reset_password(token, form.new_password.data):
            flash('Your password has been updated.', 'form-success')
            return redirect(url_for('auth.login'))
        else:
            flash('The password reset link is invalid or has expired.',
                  'form-error')
            return redirect(url_for('client.index'))
    return render_template('auth/reset_password.html', form=form)


@auth.route('/manage/change-password', methods=['GET', 'POST'])
@login_required
def change_password():
    """Change an existing user's password."""
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.old_password.data):
            current_user.password = form.new_password.data
            db.session.add(current_user)
            db.session.commit()
            flash('Your password has been updated.', 'form-success')
            return redirect(url_for('client.index'))
        else:
            flash('Original password is invalid.', 'form-error')
    return render_template('auth/manage.html', form=form)


@auth.route('/manage/change-email', methods=['GET', 'POST'])
@login_required
def change_email_request():
    """Respond to existing user's request to change their email."""
    form = ChangeEmailForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.password.data):
            new_email = form.email.data
            token = current_user.generate_email_change_token(new_email)
            change_email_link = url_for(
                'auth.change_email', token=token, _external=True)
            get_queue().enqueue(
                send_email,
                recipient=new_email,
                subject='Confirm Your New Email',
                template='auth/email/change_email',
                # current_user is a LocalProxy, we want the underlying user
                # object
                user=current_user._get_current_object(),
                change_email_link=change_email_link)
            flash('A confirmation link has been sent to {}.'.format(new_email),
                  'warning')
            return redirect(url_for('client.index'))
        else:
            flash('Invalid email or password.', 'form-error')
    return render_template('auth/manage.html', form=form)


@auth.route('/manage/change-email/<token>', methods=['GET', 'POST'])
@login_required
def change_email(token):
    """Change existing user's email with provided token."""
    if current_user.change_email(token):
        flash('Your email address has been updated.', 'success')
    else:
        flash('The confirmation link is invalid or has expired.', 'error')
    return redirect(url_for('client.index'))


@auth.route('/confirm-account')
@login_required
def confirm_request():
    """Respond to new user's request to confirm their account."""
    token = current_user.generate_confirmation_token()
    confirm_link = url_for('auth.confirm', token=token, _external=True)
    get_queue().enqueue(
        send_email,
        recipient=current_user.email,
        subject='Confirm Your Account',
        template='auth/email/confirm',
        # current_user is a LocalProxy, we want the underlying user object
        user=current_user._get_current_object(),
        confirm_link=confirm_link)
    flash('A new confirmation link has been sent to {}.'.format(
        current_user.email), 'warning')
    return redirect(url_for('client.index'))


@auth.route('/confirm-account/<token>')
@login_required
def confirm(token):
    """Confirm new user's account with provided token."""
    if current_user.confirmed:
        return redirect(url_for('client.index'))
    if current_user.confirm_account(token):
        flash('Your account has been confirmed.', 'success')
    else:
        flash('The confirmation link is invalid or has expired.', 'error')
    return redirect(url_for('client.index'))


@auth.route(
    '/join-from-invite/<int:user_id>/<token>', methods=['GET', 'POST'])
def join_from_invite(user_id, token):
    """
    Confirm new user's account with provided token and prompt them to set
    a password.
    """
    if current_user is not None and current_user.is_authenticated:
        flash('You are already logged in.', 'error')
        return redirect(url_for('client.index'))

    new_user = User.query.get(user_id)
    if new_user is None:
        return redirect(404)

    if new_user.password_hash is not None:
        flash('You have already joined.', 'error')
        return redirect(url_for('client.index'))

    if new_user.confirm_account(token):
        form = CreatePasswordForm()
        if form.validate_on_submit():
            new_user.password = form.password.data
            db.session.add(new_user)
            db.session.commit()
            flash('Your password has been set. After you log in, you can '
                  'go to the "Your Account" page to review your account '
                  'information and settings.', 'success')
            return redirect(url_for('auth.login'))
        return render_template('auth/join_invite.html', form=form)
    else:
        flash('The confirmation link is invalid or has expired. Another '
              'invite email with a new link has been sent to you.', 'error')
        token = new_user.generate_confirmation_token()
        invite_link = url_for(
            'auth.join_from_invite',
            user_id=user_id,
            token=token,
            _external=True)
        get_queue().enqueue(
            send_email,
            recipient=new_user.email,
            subject='You Are Invited To Join',
            template='auth/email/invite',
            user=new_user,
            invite_link=invite_link)
    return redirect(url_for('client.index'))


@auth.before_app_request
def before_request():
    """Force user to confirm email before accessing login-required routes."""
    if current_user.is_authenticated \
            and not current_user.confirmed \
            and request.endpoint[:8] != 'auth.' \
            and request.endpoint != 'static':
        return redirect(url_for('auth.unconfirmed'))


@auth.route('/unconfirmed')
def unconfirmed():
    """Catch users with unconfirmed emails."""
    if current_user.is_anonymous or current_user.confirmed:
        return redirect(url_for('client.views.index'))
    return render_template('auth/unconfirmed.html')
