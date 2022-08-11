# Phonebook Fullstack Open Exercise

You can find the SPA running at https://phonebook-fsopen-crs1138.herokuapp.com/

## Application structure

The application consists of two elements.

1. Server-side (backend) - located in folder `/part3/phonebook-backend`
2. Browser-side (frontend) - located in folder `/part3/phonebook-frontend`

The frontend part provides the user interface that enables the user to interact
with the backend.

## Deployment to production

1. Make sure a Git repo exits in the backend folder.
2. Make changes as required to the backend code.
3. Run `npm run deploy:full` script. This script will replace the
   `/part3/phonebook-backend/build` folder with the freshly compiled version of
   the frontend code. Commit all the changes to the backend and publish these to
   the Heroku server.

## Development

### Backend

To start a development server in your local environment, you can run
`npm run dev`. This will launch a `nodemon` script that will automatically refresh on any change to the `index.js`. This will use the frontend code stored in the folder `/part3/phonebook-backend/build`.

### Frontend

You need to run the backend server in your local environment before making changes to the frontend code.

1. Start the backend server by running `npm run dev` from
   `/part3/phonebook-backend/` folder.
2. Launch `npm start` from the `/part3/phonebook-frontend` folder
