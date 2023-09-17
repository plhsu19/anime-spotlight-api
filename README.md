# Anime List API

This is a RESTful API for managing a list of anime titles. It allows you to create, read, update, and delete anime titles from a database-like source.

## Getting Started

To get started with this API, you'll need to have Node.js and npm installed on your machine. You can install them from the official Node.js website: https://nodejs.org/

Once you have Node.js and npm installed, you can clone this repository and install the dependencies by running the following commands:

```
git clone https://github.com/plhsu19/anime-list-api.git 
cd anime-list-api 
npm install
```

After the dependencies are installed, you can start the API server by running:

```
npm start
```

This will start the server on port 3000 by default. You can access the API by sending HTTP requests to http://localhost:3000.

## API Endpoints

The following endpoints are available in this API:

- `GET /animes`: Get a list of all anime titles.
- `POST /animes`: Create a new anime title.
- `GET /animes/:id`: Get a specific anime title by ID.
- `PUT /animes/:id`: Update a specific anime title by ID.
- `DELETE /animes/:id`: Delete a specific anime title by ID.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.
