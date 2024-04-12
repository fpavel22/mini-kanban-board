# Task Management Board

This project is a task management board built with React. It uses Redux for state management, Sass for styling, and Firebase for data storage. This task management board allows you to create boards, each board having four built-in columns. Once a board is created, tasks can be created inside that board. Moving tasks between board columns is possible thanks to `dnd-kit` library.

## Features

A summary of the features implemented in this application:

- **CRUD operations:** You can create new boards and read, create, edit and update tasks in each board.
- **Responsive design:** The web app is responsive on mobile and tablet devices.
- **Priority feature:** You can set the priority of a task to `low`, `normal`, or `high`, each with different styling.
- **Drag-and-drop:** You can drag tasks between board columns.

## Future ideas

- **Add timestamps and display tasks creation date** - currently, this information is not available for individual tasks and it could be useful.
- **Edit/delete boards** - once a board has been created, it cannot be deleted, nor edited.
- **Sorting tasks** - might be useful to sort tasks by the number of total subtasks, priority or creation date.

## Usage

To use this application on your local machine, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install the dependencies using `npm install` or `npm ci`.
3. Set up a Firebase project and add your Firebase configuration to `src/firebase/config.js` (or create a .env file in the root folder).
4. Start the development server using `npm start`.

## Live demo

Currently, the application can be seen/used by clicking the link below:

https://task-management-board.web.app/
