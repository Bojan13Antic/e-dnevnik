E-DNEVNIK is an application for managing and modifying classes, professors, students and their grades in one typical elementary school in Serbia.
This is a web application basically for schools, but it can be used in other "grade-like" organizations. It uses React and a basic JSON database.

In order to run the app you will need to connect the database file:
### npx json-server --watch data/db.json --port 8000

After that all you need to do is log in with a profile and you can start exploring. Inside of the database that I have provided here, you can find all profiles to log in but I suggest you start exploring with an admin profile (name: admin, password: admin // very creative :) ), since it has a lot more options and permissions.

The app is fully customizable since all you have at the start of a new project is a plain database with the list of all possible subjects in a school. After that, with admin permission, you can add professors, students, classes, and the algorithm does the rest - the database is further modified directly through the app and the components are rendered accordingly (you can theoretically put any number of students, professors and classes).

The basic functionalities after you set up the database (enter the student profiles, professors, classes etc.) is:
-admin profile can see all the grades from all the students but not modify them, as well as add or delete professors, students and/or classes
-professor profile can see and grade only the students on the subjects he is assigned on, or only see the grades from class he is ahead of
-student profile can only see their own grades and not be able to modify them
