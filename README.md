# Voting System using Block-Chain

A user can cast his vote by visiting this web platform. For web server scripting we have used python based web framework **`Django`**.



## How to run

1. Make sure you are connected to the internet.
2. Install all the (pip) dependency packages (main packages are listed in `requirements.txt`).

```bash
pip3 install -r requirements.txt 
```

3. Create a file named `config.yaml` in the same directory as `manage.py` file and add following content to it:

```yaml
   EMAIL_ADDRESS : <your email address>
   EMAIL_PASSWORD : <your email password>
```
Remember to assign your valid credentials. (See [References](#EmailCredentials))


4. Make sure email sending is allowed (while development process sending email every time is not a good idea because API allows us to send email only for limited no. of times.).


​		For this make sure `send_otp()` method in `views.py` file looks like this:

```python
...
[success, result] = send_email_otp(email_input)
# [success, result] = [True, '0']
...
```

​		and `get_parties()` method in same file (`views.py`) looks like this:

```python
...
send_email_private_key(request.session['email-id'], private_key)
# print(private_key)
...
```

5. Locate `manage.py` file and run `python manage.py runserver` in the same directory.

6. If a warning appear like this:

   ```bash
   You have 17 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
   Run 'python3 manage.py migrate' to apply them.
   ```

   then run `python manage.py migrate` in the same directory.

7. Locate the URL provided in the terminal and access that. by default it is [http://127.0.0.1:8000](http://127.0.0.1:8000).

8. To acess admin panel you need to create a superuser. For this run `python manage.py createsuperuser` in the same directory and follow the instructions.

## References

- <a name="EmailCredentials">Why and How to add Email credentials:</a>

  How and Why: https://www.youtube.com/watch?v=JRCJ6RtE3xU (Watch out first 2 minutes of this video)

  https://myaccount.google.com/apppasswords

  https://myaccount.google.com/lesssecureapps

  