# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/


# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Questions

### Create Questions

* As a logged in user, I want to be able to post new questions.
  * When I'm on the `/new-question` page:
    * I can write and submit a new Question.
      * So that I can ask a question to the whole world.

### Viewing Questions

* As a logged in _or_ logged out user, I want to be able to view a selection of the most recent Questions.
  * When I'm on the `/` page:
    * I can view the ten most recently posted questions.
      * So that I can read and answer questions already posted.

* As a logged in _or_ logged out user, I want to be able to view a specific question and its associated answers and follows.
  * When I'm on the `/:id` page:
    * I can view the content of the question, as well as the associated answers and follows.
      * So that I can read and interact with the questions and answers already posted.

### Updating Questions

* As a logged in user, I want to be able to edit my question by clicking an Edit button associated with the question anywhere that question appears.
  * When I'm on the `/`, `/:id`, or `/profile/:id` pages:
    * I can click "Edit" to make permanent changes to questions I have posted.
      * So that I can fix any errors I make in my question.

### Deleting Questions

* As a logged in user, I want to be able to delete my question by clicking a Delete button associated with the question anywhere that question appears.
  * When I'm on the `/`, `/:id`, or `/profile/:id` pages:
    * I can click "Delete" to permanently delete a question I have posted.
      * So that when I realize I don't want to ask that question anymore, I can remove it.

## Answers

### Create Answers

* As a logged in user, I want to be able to post an answer to a question.
  * When I'm on the `/:id` page:
    * I can write and submit a new answer.
      * So that I can reply to a question with an answer or follow-up questions.

### Viewing Answers

* As a logged in _or_ logged out user, I want to be able to view a specific question and its associated answers and follows.
  * When I'm on the `/:id` page:
    * I can view the content of the question, as well as the associated answers and follows ordered by date, oldest being at the top.
      * So that I can read and interact with the questions and answers already posted.

### Updating Answers

* As a logged in user, I want to be able to edit my answer by clicking an Edit button associated with the answer anywhere that answer appears.
  * When I'm on the `/` or `/:id` pages:
    * I can click "Edit" to make permanent changes to answers I have posted.
      * So that I can fix any errors I make in my question.

### Deleting Answers

* As a logged in user, I want to be able to delete my answer by clicking a Delete button associated with the answer anywhere that answer appears.
  * When I'm on the `/` or `/:id` pages:
    * I can click "Delete" to permanently delete an answer I have posted.
      * So that when I realize I don't want to answer that question anymore, I can remove what I wrote before.


## Tags

### Create Tags

* As a logged in user, I want to be able to create or add a tag to my question.
  * When I'm on the `/:id` page:
    * I can create a new tag and add it to my question.
      * So that the question can have relevant tags applied to it.

### Viewing Tags

* As a logged in _or_ logged out user, I want to be able to view a specific tag and its associated questions.
  * When I'm on the `/tag/:id` page:
    * I can view the tag, as well as the associated questions, ordered by newest.
      * So that I can read and interact with the questions related to that tag.


## Follows

### Create Follows

* As a logged in user, I want to be able to create a follow on a question.
  * When I'm on the `/:id` page:
    * I can create a follow on a question.
      * So that I can follow a specific question.

### Delete Follows

* As a logged in user, I want to be able to delete a follow off of a question that I had previously followed.
  * When I'm on the `/:id` page:
    * I can view the follow and remove it from the question.
      * So that I can stop following that question.
