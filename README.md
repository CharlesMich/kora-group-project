## Kora 
Kora is a soft clone of Quora. It is an application where users can ask questions, leave responses to questions, and find spaces that match their interests. Kora was built using Python/flask for backend and React/Redux for frontend. 

Link to Kora: [Click here](https://kora-group-project.onrender.com)

## Index
[MVP Feature List](https://github.com/CharlesMich/kora-group-project/wiki/Feature-List-for-Quora) |
[Database Schema](https://github.com/CharlesMich/kora-group-project/wiki/Kora-Database-Diagram)|
[User Stories](https://github.com/CharlesMich/kora-group-project/wiki/User-Stories)|

## Technologies Used
<img src ="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />

## Splash Page
![splash](https://myaaprojects.s3.us-east-2.amazonaws.com/kora-splash.png)

## Questions Page
![product](https://myaaprojects.s3.us-east-2.amazonaws.com/Kora-questions.png)

## Answers Page
![Review](https://myaaprojects.s3.us-east-2.amazonaws.com/Kora-answers.png)

## Spaces Page
![Review](https://myaaprojects.s3.us-east-2.amazonaws.com/kora-spaces.png)

## Getting started
1. Clone this repository:


   `
      https://github.com/CharlesMich/kora-group-project.git
   `

3. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

4. Create a **.env** file based on the example with proper settings for your
   development environment

5. Make sure the SQLite3 database connection URL is in the **.env** file

6. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

7. Get into your pipenv, migrate your database, seed your database, and run your Flask app

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

8. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


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

# Features

## Questions
* Users can ask questions
* Users can read/view questions
* Users can delete their questions
* Users can update their questions

## Answers
* Users can write an answer to a questions
* Users can read/view answers to all questions
* Users can delete their answers
* Users can update their answers

## Spaces
* Users can add spaces
* Users can read/view spaces

## Follows
* Users can follow other users
* Users can unfollow other users
  
## End Points
| Request| Purpose | Return Value |
| ------------ | ------------- | ------------- 
| GET/api/auth/ | This fetch is sent upon initial app load and on subsequent refreshes. It returns an object representing the current user, if user is logged in | {'id': INT, 'username':STRING, 'email':STRING } |
| POST/api/login/ | This fetch is sent for a log in request. It returns an object representing the current user | { 'id': INT, 'username': STRING, 'email': STRING, 'first_name': STRING, 'last_name': STRING }|
| GET/api/logout/ | This fetch is sent upon a logout request. It returns a message about the logout | {'message': 'User logged out'} |
| GET/api/signup/ | This fetch is sent upon a signup request. It returns an object representing the new signed up user. | { 'id': INT, 'username': STRING, 'email': STRING, 'first_name': STRING, 'last_name': STRING } |
| GET/api/question/ | This fetch is sent to get all the questions to display on the questions page. (newest first) | { 'id': INT 'question': STRING, 'owner_id': INT, 'space_id': INT} |
| POST/api/question/new-question | This fetch is sent when a user posts a new question. It returns the users manage questions page with the new posted question | { 'id': INT, 'question': STRING, 'owner_id': INT, 'space_id': INT, "User_firstName": STRING, 'User_lastName': STRING } |
| POST/api/question/update-question/:questionId | This fetch is sent to update a question of the user. It returns the the updated question displayed on the manage questions page. | { 'id': INT, 'question': STRING, 'owner_id': INT, 'space_id': INT, "User_firstName": STRING, 'User_lastName': STRING } |
| POST/api/question/delete-question/:questionId | This fetch is sent to delete a question. It returns a successfully deleted message and the manage questions page does not contain the deleted question | {"message": "Successfully Deleted"} |
| GET/api/answer/ | This fetch is sent to get all answers. It returns an object with all the answers | {'id': INT, 'body': STRING 'user_id': INT, 'question_id': INT} |
| POST/api/answer/new/:questionId | This fetch is sent to answer a question. It returns an object with the new answer | {'id': INT, 'body': STRING, 'user_id': INT, 'question_id': INT, "User_firstName": STRING, 'User_lastName': STRING, "Question_question": STRING, "Question_ownerId": INT} |
| POST/api/answer/update-answers/:answerId | This fetch is sent to update an answer. It returns an object representing the updated answer. | {'id': INT, 'body': STRING, 'user_id': INT, 'question_id': INT, "User_firstName": STRING, 'User_lastName': STRING, "Question_question": STRING, "Question_ownerId": INT} |
| POST/api/answer/delete-answers/:answerId | This fetch is sent to delete an answer. It returns a sucessfully deleted message. | {"message": "Successfully Deleted"} |
| GET/api/spaces/ | This fetch is sent to gell all spaces. It returns an object representing all the spaces. | { 'id': INT, 'space_name': STRING,'description': STRING } |
| POST/api/spaces/ | This fetch is sent to create a new space. It returns an object representing the new space | {'id': INT, 'space_name': STRING, 'description': STRING } |
| POST/api/follows/add-follows/:userId| This fetch is sent to follow a user. It returns an object representing following user id and followed user id | { 'following_user_id': INT, 'followed_user_id': INT } |
| POST/api/follows/delete-follows/int:id | This fetch is sent to unfollow a user. It returns an object with a message, "successfully deleted" | {"message": "Successfully Deleted"} |


