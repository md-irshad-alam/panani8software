# Panini8 Assignment

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Deployed Links](#deployed-links)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Panini8 Assignment is a web application that allows users to view, create, and manage blog posts. The application includes features for user authentication, CRUD operations on blog posts, and the ability to like and comment on posts.

## Features
- *User Authentication*: Signup and signin functionality
- *Blog Feed*: Display all blogs with options to filter
- *CRUD Operations*: Create, Read, Update, Delete blog posts
- *Like and Comment*: Users can like and comment on posts

## Tech Stack
- *Frontend*: React, Tailwind CSS
- *Backend*: Express.js, MongoDB
- *Authentication*: JSON Web Tokens (JWT), Bcrypt

## Installation
To run this project locally, follow these steps:
1. *Clone the repository*
   bash
   git clone https://github.com/md-irshad-alam/panani8software.git
   

3. *Navigate to the project directory*
   bash
   cd Panini8_assignment
   

4. *Install dependencies for the backend*
   bash
   cd backend
   npm install
   

5. *Install dependencies for the frontend*
   bash
   cd ../frontend
   npm install
   

6. *Set up environment variables* (create a .env file in the backend directory)
   plaintext
   PORT= your_port_number
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   

7. *Run the backend server*
   bash
   cd backend
   npm run server
   

8. *Run the frontend application*
   bash
   cd ../frontend
   npm run dev
   

## Usage
Once the application is running, navigate to http://localhost:3000 in your browser to access the frontend. You can sign up or sign in to start using the blog features.

## Deployed Links
- *Frontend*: [Your Frontend Deployment Link](https://panini8-assignment.vercel.app/)
- *Backend*: [Your Backend Deployment Link](https://panini8-assignment.onrender.com)

## Screenshots
![Homepage](https://github.com/kundan761/Panini8_assignment/blob/main/frontend/public/screenshots/Screenshot%202025-04-17%20020749.png)
![Signup Page](https://github.com/kundan761/Panini8_assignment/blob/main/frontend/public/screenshots/Screenshot%202025-04-17%20020830.png)
![Login Page](https://github.com/kundan761/Panini8_assignment/blob/main/frontend/public/screenshots/Screenshot%202025-04-17%20020851.png)
![Create Blog Page](https://github.com/kundan761/Panini8_assignment/blob/main/frontend/public/screenshots/Screenshot%202025-04-17%20021043.png)
![User Profile](https://github.com/kundan761/Panini8_assignment/blob/main/frontend/public/screenshots/Screenshot%202025-04-17%20020808.png)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License
This project is licensed under the MIT License.
