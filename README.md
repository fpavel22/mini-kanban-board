# Task Management Board

This is a simple task management board built with React, styled with Sass, and using Firebase as the backend. It allows you to create boards, and tasks within those boards.

## Features

The following features have been implemented in this application:

- **CRUD operations:** You can create new boards, and read, create, edit and update tasks in each board.
- **Responsive design:** The application is responsive on mobile and tablet devices.
- **Priority feature:** You can set the priority of a task to low, normal, or high, and the task's color will change accordingly.
- **Drag-and-drop:** You can drag tasks within and between boards using the `dnd-kit` library (work in progress).

## Usage

To use this application, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install the dependencies using `npm install`.
3. Set up a Firebase project and add your Firebase configuration to `src/firebase/config.js` (or create a .env file in the root folder).
4. Start the development server using `npm start`.
