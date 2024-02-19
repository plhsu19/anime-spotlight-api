# Anime Spotlight API

Anime Spotlight API is a backend service designed to support the [Anime Spotlight](https://github.com/plhsu19/anime-spotlight-ui) web application, providing CRUD RESTful APIs for managing anime data. Built with Node.js and Express.js, the service is optimized for simplicity and efficient backend management. 

## Features

- **CRUD Operations**: Supports create, read, update, and delete operations for anime data.
- **RESTful Architecture**: Designed with REST principles for integration with frontend applications.
- **Data Validation**: Incorporates thorough request validation to ensure data integrity.
- **Error Handling**: Implements robust error handling for improved reliability and debugging.

## Getting Started

### Prerequisites

- Node.js
- npm (Node.js package manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/plhsu19/anime-spotlight-api.git
cd anime-spotlight-api
npm install
```

### Running the Server

To start the server in development mode with live reloading, run:

```bash
npm run start:dev
```

This will serve the server on `localhost:8080` by default.

For production mode, run:

```bash
npm start
```

## API Endpoints

Below is a detailed look at the available endpoints and their functionalities, including an example to illustrate how to use the "Get Anime by ID" endpoint.

- **Get All Animes** (`GET /animes`): Fetches a list of all anime titles.
- **Get Anime by ID** (`GET /animes/:id`): Retrieves detailed information about a specific anime by its ID.
- **Create New Anime** (`POST /animes`): Allows the creation of a new anime entry.
- **Update Existing Anime** (`PUT /animes/:id`): Updates the details of an existing anime entry.
- **Delete Anime** (`DELETE /animes/:id`): Removes an anime entry from the system.

### Get Anime by ID (`GET /animes/:id`)

Retrieves detailed information about a specific anime by its ID.

### Example Usage

To fetch details for an anime with the ID of 10, you would make the following request:

```bash
curl --location 'localhost:8080/animes/10'
```

Example Successful Response (status code: 200)

```json
{
  "success": true,
  "data": {
    "anime": {
      "id": 10,
      "title": "Example Anime Title",
      "enTitle": "Example Anime English Title",
      "description": "This is a mock description for an example anime. It includes plot points, character development, and thematic elements that captivate the audience.",
      "rating": 8.5,
      "startDate": "2021-01-01",
      "endDate": "2021-06-01",
      "subtype": "TV",
      "status": "finished",
      "posterImage": "https://example.com/poster_image.jpg",
      "coverImage": "https://example.com/cover_image.jpg",
      "episodeCount": 24,
      "categories": [
        "Adventure",
        "Fantasy",
        "Magic"
      ]
    }
  }
}
```

This example demonstrates how to retrieve and display information for a specific anime using its ID, providing an insight into the type of data returned by the API.

### Create New Anime (`POST /animes`)

Allows the creation of a new anime entry in the database.

### Example Usage

To create a new anime entry, you would make the following request:

```bash
curl --location --request POST 'http://localhost:8080/animes' \
--header 'Content-Type: application/json' \
--data '{
  "title": "New Anime Title",
  "enTitle": "New Anime English Title",
  "description": "Description of the new anime, including plot points and character development.",
  "rating": 9.0,
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "subtype": "TV",
  "status": "upcoming",
  "posterImage": "https://example.com/new_poster_image.jpg",
  "coverImage": "https://example.com/new_cover_image.jpg",
  "episodeCount": 12,
  "categories": ["Action", "Adventure", "Fantasy"]
}'

```

### Example Successful Response (status code: 201)

```json
{
  "success": true,
  "data": {
    "anime": {
      "id": 11,
      "title": "New Anime Title",
      "enTitle": "New Anime English Title",
      "description": "Description of the new anime, including plot points and character development.",
      "rating": 9.0,
      "startDate": "2023-01-01",
      "endDate": "2023-12-31",
      "subtype": "TV",
      "status": "upcoming",
      "posterImage": "https://example.com/new_poster_image.jpg",
      "coverImage": "https://example.com/new_cover_image.jpg",
      "episodeCount": 12,
      "categories": ["Action", "Adventure", "Fantasy"]
    }
  }
}

```

This example demonstrates how to create a new anime entry using the API, providing an insight into the required data structure and the type of response data returned by the API.

## Error Handling

Comprehensive error handling for validation errors (400), not found errors (404), and server errors (500), ensuring a smooth user experience.

### 400 Bad Request

Example: Requesting with invalid field data:

```json
{
  "success": false,
  "message": "\"rating\" must be less than or equal to 10, \"status\" must be one of [current, finished, upcoming]"
}
```

### 404 Not Found

Example: Requesting a non-existent anime ID:

```json
{
  "success": false,
  "message": "Anime with id 999 was not found"
}
```

### 500 Internal Server Error

Example: A server-side issue that prevents request processing:

```json
{
  "success": false,
  "message": "Something went wrong, please try again later or contact support."
}
```

## **Data Storage and Model Class**

For ease of development, data is stored in a local JSON file (**`animes.json`**), simulating a database's functionality in a lightweight manner. The **`Anime.js`** model class encapsulates anime entity properties and provides methods for data manipulation, offering an MVC-like model for server interactions.

## Contributing

Contributions are welcome!

- **Reporting Bugs**: If you encounter any bugs or missing features, please feel free to raise an issue in the repository.
- **Making Contributions**:  If you'd like to contribute:
    1. **Fork** the repository.
    2. **Create a new branch** for your changes.
    3. **Open a pull request** against the main branch when you're ready to submit your changes, and ask for a review.

## License

This project is open source - see the [MIT License](LICENSE) file for details.

## Contact

For any inquiries or contributions, please contact Pei-Lun Hsu at **peilun.hsu.tw@gmail.com**.