CampusFlow — Student Management System

DIWA2110: Web Application Development

Institution: Limkokwing University of Creative Technology (LUCT)
Location: Maseru, Lesotho
Faculty: Faculty of Information and Communication Technology
Programme: Diploma in Information Technology
Semester: 3
Assignment: Individual Assignment (10%)
Lecturer: Mr Hlabeli Batloung





1. Project Overview

CampusFlow is a web-based Student Management System developed using React and JavaScript. It provides an interactive dashboard for managing student records through a clear, user-friendly interface.

The application demonstrates fundamental JavaScript programming concepts and React development techniques, including components, state management, event handling, functions, form validation, and modal dialogs.





2. Project Objectives

Develop an interactive student management application using React.

Apply JavaScript data types, variables, functions, and array methods.

Display student information in a structured dashboard.

Implement adding, editing, and deleting student records.

Validate user input and provide meaningful feedback.

Create a responsive interface for desktop and mobile screens.

Demonstrate testing, version control, and deployment readiness.





3. Application Features

Student Dashboard

Displays student records and summary statistics for total students, enrolled students, pending students, and inactive students.

Student Record Management

Users can add new students, edit existing records, and delete records after confirmation.

Student Information

Each student record includes:

Student ID

Full name

Age

Email address

Course of study

Enrollment status

Search and Filtering

Users can search student records and filter them by enrollment status.

Form Validation

The application checks required fields, validates age and email formats, and prevents duplicate student IDs.

Data Persistence

Student records are stored using browser localStorage, allowing data to remain available after a page refresh in the same browser.

Responsive Interface

The interface uses CSS styling and responsive layouts to support different screen sizes.





4. Technologies Used

React — reusable user interface components and state-driven rendering.

JavaScript (ES Modules) — application logic and student record operations.

JSX — describing the React interface.

CSS3 — layout, styling, animations, hover effects, and responsive design.

Vite — development server and production build tool.

ESLint — code quality checks.

localStorage — browser-based persistence of student records.

Git and GitHub — version control and source code hosting.

Netlify or Vercel — intended deployment platform.





5. JavaScript Concepts Demonstrated

Data Types

Strings: student IDs, names, email addresses, course names, and enrollment statuses.

Numbers: student ages and dashboard counts.

Booleans: validation results and conditional states.

Arrays: collections of student records.

Objects: individual student records containing related properties.

Variable Declarations

const is suitable for values whose variable bindings should not be reassigned, such as fixed configuration values and function references.

let is suitable for variables that need reassignment.

var can be explained when discussing older JavaScript declaration styles and function scope; it is not necessary to use it when const and let are more appropriate.

Functions and Programming Logic

The application uses functions to handle student operations, form submission, validation, and user interactions. Parameters pass information into functions, return values provide results, and conditional statements handle different situations.

Array methods such as map, filter, and find are suitable for displaying, searching, filtering, and locating student records.

React Concepts

Functional React components

JSX

Props where components pass data or callbacks to other components

useState for managing interactive data

Event handlers for form submission and button clicks

Conditional rendering for dialogs, messages, and empty states




6. Installation and Setup

Requirements

Node.js and npm

A code editor such as Visual Studio Code

A modern web browser

Install dependencies

Open a terminal in the project folder and run:

npm install

Start the development server

npm run dev

Open the local address displayed in the terminal.

Run code checks

npm run lint

Create a production build

npm run build

Preview the production build

npm run preview




7. Testing Checklist

The following tests should be performed and their actual results recorded before submission.

Test
Add a valid student

Expected result
The student appears in the dashboard 

Test
Edit a student

Expected result
The updated information is displayed

Test
Request student deletion

Expected result
A confirmation dialog appears

Test
Confirm deletion

Expected result
The selected student is removed

Test
Cancel deletion

Expected result
The student remains in the list

Test
Submit empty required fields

Expected result
Validation prevents submission

Test
Enter an invalid age

Expected result
A validation message appears

Test
Enter an invalid email

Expected result
A validation message appears

Test
Enter a duplicate student ID

Expected result
The duplicate is rejected

Test
Search for a student

Expected result
Matching records are displayed

Test
Filter by enrollment status

Expected result
Only matching records are displayed

Test
Refresh the page

Expected result
Previously saved records remain in the same browser

Test
Search for a nonexistent student

Expected result
An appropriate empty state is displayed

Test
Resize to a mobile screen

Expected result
The interface remains usable

Test
Run npm run lint

Expected result
No ESLint issues are reported

Test
Run npm run build

Expected result
The production build completes successfully



8. Project Structure

CampusFlow-Assignment11/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── students.js
├── index.html
├── package.json
├── package-lock.json
└── README.md

Additional configuration files may be present in the project.





9. Data Storage and Limitations

The application uses browser localStorage rather than a remote database. Saved records are associated with the browser and website origin. Clearing browser storage or using a different browser may result in different records being displayed.

The project is designed as a frontend student management application and does not require a backend database for the stated assignment requirements.





10. Version Control and Deployment

The complete project should be uploaded to a GitHub repository, excluding node_modules.

The application should be deployed to Netlify or Vercel and tested using its public URL.

GitHub repository: To be added after publishing.
Live application: To be added after deployment.





11. Conclusion

CampusFlow applies JavaScript and React concepts to a practical student management scenario. The project combines interactive record management, validation, browser-based persistence, responsive styling, and deployment preparation in one application.

The final submission should include the completed source code, this README, a GitHub repository link, and a verified public deployment link.