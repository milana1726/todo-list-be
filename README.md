## Description

An API for managing a to-do list.

## Project setup

```bash
Use `node 20.x` or higher.
Clone this repo: `$ git clone https://github.com/rolling-scopes-school/milana1726-EPAMPLLT.git`.
Switch to branch: `$ git checkout todolist-be`.
Go to downloaded folder: `$ cd todolist-be`.
Install dependencies: `$ npm install`.
```
## Environment Variables

```bash
Create a .env file in the project root with the following content:

PORT=3000
MONGO_URI='mongodb+srv://User1:a5fDbzuVpJsHOr7y@cluster0.kgydsxf.mongodb.net/todolist?retryWrites=true&w=majority'
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## API Endpoints

```bash
#Get all todos (with/without pagination):
GET /todos/?(page=1&limit=10)

# Get a todo by ID:
GET /todos/:id

# Create a new todo:
POST /todos

# Update a todo by ID:
PATCH /todos/:id

# Delete a todo by ID:
DELETE /todos/:id
```
### Request Bodies

```bash
#Create a todo:
{
  "message": "Buy groceries", //required field
  "completed": false
}
#Update a todo:
{
  "message": "Go to the gym",
  "completed": true
}
```
### Response Examples

```bash
#Single todo:
{
    "_id": "681c9d32cb9c22521d434ce8",
    "message": "Task #1",
    "completed": true,
    "__v": 0
}
#All todos:
[
    {
        "_id": "681c9d32cb9c22521d434ce8",
        "message": "Task #1",
        "completed": true,
        "__v": 0
    },
    {
        "_id": "681caafad3b9b7a127e99eb7",
        "message": "Task #2",
        "completed": false,
        "__v": 0
    },
]
```
### Error Response Format

```bash
{
    "statusCode": 404,
    "message": {
        "message": "Todo #681c9d32cb9c22521d434ce0 not found!",
        "error": "Not Found",
        "statusCode": 404
    }
}
```