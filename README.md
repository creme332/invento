# invento 🤠

A basic inventory management app built with MERN stack.

![Screenshot of website](screenshots/homepage.png)

[Live Preview ▶](https://invent0.web.app)

> 🟡 **Note**: Backend is running on a free instance on Render and may take some time to spin up.

## Features
- Jamstack architecture with RESTful API
- Sorting and filtering capabilities for categories
- CRUD operations on items and categories
- Dashboard with detailed statistics and graphs
- Form validation on client-side and server-side
- User authentication to delete item/category
- Mobile-responsive UI
- SEO optimized

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

To install backend dependencies:
```bash
cd server
npm install
```

If you don't already have a MongoDB database named `invento`, create one with MongoDB Atlas. Set the initial collection as `Collection0`.

In the `server` folder create a `.env` file  with the following contents:
```bash
# Replace with mongo connection string
MONGO_STRING="mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/invento?retryWrites=true&w=majority"
ADMIN_KEY="1234" # Admin key to delete item/category
```
> 🔴 **Note**: Do not forget the `invento?` option in your connection string.

Create required database and add sample data:

```bash
node populatedb
```

> 🟢 **Note**: You may now delete the previously created collection `Collection0`.

To start local server:

```bash
npm run dev
```

Backend is deployed at [http://localhost:3001](http://localhost:3001).

### Frontend

To install dependencies for frontend:
```bash
cd client
npm install
```

To run the development server locally:
```bash
npm run dev
```

Frontend is deployed at [http://localhost:3000](http://localhost:3000).

## Diagrams
![wireframe of website](/design/wireframe.excalidraw.png)

![Schema](/design/erd.png)

## Usage

### API endpoints
The API is deployed at https://invento-backend.onrender.com/.

| Endpoint                         | Meaning                                            |
| -------------------------------- | -------------------------------------------------- |
| `GET /items`                     | Get the list of items in the inventory.            |
| `GET /items/total`               | Get the total number of items in the inventory.    |
| `GET /items/grouped-by-status`   | Get the number of items for each status.           |
| `GET /items/grouped-by-category` | Get the number of items for each category.         |
| `GET /item/{id}`                 | Get the item with ID `id`.                         |
| `GET /items/recent/{n}`          | Get the last `n` items created.                    |
| `GET /categories`                | Get the list of item categories.                   |
| `GET /category/{id}`             | Get the category with ID `id`.                     |
| `GET /categories/total`          | Get the total number of categories.                |
| `POST /item/create`              | POST request for creating an item.                 |
| `POST /category/create`          | POST request for creating a category.              |
| `POST /item/{id}/update`         | POST request for updating an item with ID `id`.    |
| `POST /category/{id}/update`     | POST request for updating a category with ID `id`. |
| `POST /item/{id}/delete`         | POST request for deleting an item with ID `id`.    |
| `POST /category/{id}/delete`     | POST request for deleting a category with ID `id`. |

## To-do
- [ ] Create a utils function to fetch items, categories
- [ ] Sorting and filtering capabilities for items
- [ ] Add image upload feature
- [ ] Require user authentication to upload image
- [ ] Use typescript in backend
- [ ] Deploy frontend to firebase
