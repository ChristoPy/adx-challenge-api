

# Mini E-Commerce System API

This project is a small e-commerce system with an administration panel to manage products and monitor active carts. The API is developed using the NestJS framework and uses a MongoDB database to store the products. 

For the required for this project, it uses the following technologies:
* NestJS
* Mongoose
* MongoDB
* TypeScript
* JWT
* Cloudinary API

All products are cached in memory to reduce the number of database queries. The cache is updated when a product is created, updated or deleted.  
Redis is not used in this case, but it can be easily added to the project by using the `@nestjs/redis` package and changing the `CacheModule` import in `app.module.ts` to `RedisModule`.

Only the `name`, `price` and `quantity` fields are required when creating or updating a product. The `image` field is optional and should be a base64 encoded image. If the `image` field is provided, the API will use the Cloudinary API to upload the image. Else each front-end application will show a placeholder image.

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.
4. Start the server using `npm run start:dev`

## API Endpoints

The following endpoints are available:

### Admin
#### Login
`POST /auth/login`

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWEyODg4NzU1ZDVjNWYzYWI3OWVlMyIsImlhdCI6MTYyNjQ2NjQ2OSwiZXhwIjoxNjI2"
}
```

#### Veirfy Token
`POST /auth/verify`
`Authorization: Bearer <access_token>`

Response: `200 OK` or `401 Unauthorized`

### Products

#### Get all products

`GET /products`

Response:

```json
[
  {
    "_id": "60aa2888755d5c5f3ab79ee3",
    "name": "Product 1",
    "price": 1099,
    "quantity": 100,
    "image": "https://example.com/product1.jpg"
  },
  {
    "_id": "60aa2888755d5c5f3ab79ee4",
    "name": "Product 2",
    "price": 2099,
    "quantity": 50
  }
]
```

#### Get a product by ID

`GET /products/:id`

Response:

```json
{
  "_id": "60aa2888755d5c5f3ab79ee3",
  "name": "Product 1",
  "price": 1099,
  "quantity": 100,
  "image": "https://example.com/product1.jpg"
}
```

#### Create a product (Admin only)

`POST /products`
`Authorization: Bearer <access_token>`

Request Body:

```json
{
  "name": "Product 3",
  "price": 3099,
  "quantity": 75,
  "image": "base64 encoded image"
}
```

Response:

```json
{
  "_id": "60aa2888755d5c5f3ab79ee5",
  "name": "Product 3",
  "price": 3099,
  "quantity": 75,
  "image": "https://example.com/product3.jpg"
}
```

#### Update a product (Admin only)

`PATCH /products/:id`
`Authorization: Bearer <access_token>`

Request Body:

```json
{
  "name": "Product 3 updated",
  "price": 3599,
  "quantity": 100,
  "image": "base64 encoded image"
}
```

Response:

```json
{
  "_id": "60aa2888755d5c5f3ab79ee5",
  "name": "Product 3 updated",
  "price": 3599,
  "quantity": 100,
  "image": "https://example.com/product3.jpg"
}
```

#### Delete a product (Admin only)

`DELETE /products/:id`
`Authorization: Bearer <access_token>`

Response:

```json
{
  "_id": "60aa2888755d5c5f3ab79ee5",
  "name": "Product 3 updated",
  "price": 3599,
  "quantity": 100,
  "image": "https://example.com/product3.jpg"
}
```
