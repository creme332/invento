# invento

A basic inventory management app built with MERN.


![Screenshot of website](image.png)

[Live Preview ▶]()

## Features

## Installation

Clone repository using Git (or otherwise):
```bash
git clone git@github.com:creme332/invento.git
```

Navigate to project:
```bash
cd invento
```
### Backend
To install dependencies:
```bash
cd server
npm install
```

In the `server` folder create a `.env` file  with the following contents:
```bash
# your mongo connection string
MONGO_STRING="239482"
```
> 🟢 Note: If you don't already have a MongoDB database, create one named `invento` with MongoDB Atlas.
To populate database:
```
node populatedb <your MongoDB url>
```
> 🟢 Note: On Windows you need to wrap `<your MongoDB url>` inside double (")

To start local server:

```bash
npm run devstart
```

Backend is deployed at [http://localhost:3001](http://localhost:3001).

### Frontend

To install dependencies for frontend:
```bash
cd client
npm install
```

To run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Diagrams
![](/design/wireframe.excalidraw.png)

## Usage

### API endpoints

| Endpoint                     | Meaning                                          |
| ---------------------------- | ------------------------------------------------ |
| `GET /items`                 | Get the list of items in inventory.              |
| `GET /item/{id}`             | Get the item with ID `id`.                       |
| `GET /categories`            | Get the list of item categories.                 |
| `GET /category/{id}`         | Get the category with ID `id`.                   |
| `POST /item/create`          | POST request for creating item.                  |
| `POST /category/create`      | POST request for creating category.              |
| `POST /item/{id}/update`     | POST request for updating item with ID `id`.     |
| `POST /category/{id}/update` | POST request for updating category with ID `id`. |
| `POST /item/{id}/delete`     | POST request for deleting item with ID `id`.     |
| `POST /category/{id}/delete` | POST request for deleting category with ID `id`. |

## To-do
- [ ] add chartjs animations

## References
