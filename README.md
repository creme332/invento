# invento 🤠

A basic inventory management app built with MERN stack.


![Screenshot of website](image.png)

[Live Preview ▶]()

## Features
-  Table with sorting and search capabilites
-  CRUD operations on items and categories
-  Dashboard with detailed statistics and graphs
-  Mobile-responsive UI
-  Data validation both on frontend and backend

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
```
> 🔴 **Note**: Do not forget the `invento?` option in your connection string.

To add sample data to your database:

To populate your database:
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

To run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Diagrams
![wireframe of website](/design/wireframe.excalidraw.png)

## Usage

### API endpoints

| Endpoint                         | Meaning                                          |
| -------------------------------- | ------------------------------------------------ |
| `GET /items`                     | Get the list of items in the inventory.          |
| `GET /items/total`               | Get the total number of items in the inventory.  |
| `GET /items/grouped-by-status`   | Get the number of items for each status.         |
| `GET /items/grouped-by-category` | Get the number of items for each category.       |
| `GET /item/{id}`                 | Get the item with ID `id`.                       |
| `GET /categories`                | Get the list of item categories.                 |
| `GET /category/{id}`             | Get the category with ID `id`.                   |
| `POST /item/create`              | POST request for creating item.                  |
| `POST /category/create`          | POST request for creating category.              |
| `POST /item/{id}/update`         | POST request for updating item with ID `id`.     |
| `POST /category/{id}/update`     | POST request for updating category with ID `id`. |
| `POST /item/{id}/delete`         | POST request for deleting item with ID `id`.     |
| `POST /category/{id}/delete`     | POST request for deleting category with ID `id`. |

## To-do
- [ ] When category is deleted, table is not updated. Might be due to sorting.
- [ ] when a category is created, ensure that it is unique name.
- [ ] Create items form
- [ ] Add appropriate click handlers to item page
- [ ] Complete dedicated item page (use unsplash api for images)
- [ ] Editing category not possible yet
- [ ] add endpoint for total categories and total items
- [ ] Display total items and total categories in items and categories page. `All items(10)`
- [ ] Add an error message in all pages when server is down
- [ ] Require user authentication to upload image
- [ ] Add image upload feature
- [ ] create dependency chart
- [ ] use typescript in backend
- [ ] Add page transitions with framer motion
- [ ] For barchart, display only top 5 categories
- [ ] Deploy to firebase


## References
