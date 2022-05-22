# ApexHauz API

ApexHauz project REST API

## Project Overview

ApexHauz is a platform where people can create and/or search properties for sale or rent  

## Features

- User can sign up
- User can sign in
- User can reset password
- User can post a property advert
- User can update the details of their property advert

- User can mark  his/her posted advert as sold
- User can delete his/her property advert
- User can view all property adverts
- User can view all properties of a specific type - 2 bedrooms, 3 bedrooms, mini flat etc*
- User can view a specific property advert

- User can report a posted advert as fraudulent
- User can add pictures to a posted advert

## Tools

- NodeJS
- ExpressJS
- MySQL
- JWT => Token management
- bcryptjs => Password hashing
- joi => validation
- Multer => handles image file input
- Cloudinary => storing images  

### Dev tools

- nodemon => for running the project in development mode
- Jest => for testing
- Swagger => for documentation

## starting the app

### Install dependencies

- npm install

### setup the environment variables

- Create an .env file in the root directory
- Set the .env file using the format and details in the .env.examples file  

### start the server

- npm start -- starts the server

- npm run dev -- starts the server in dev mode

- In the local developement the server will run on localhost:5000 if not changeed  

## API Endpoint Specification

POST /v1/auth/signup: Create user account

Request body:

{
    email: "johndoe@example.com", //required

    first_name: "John",

    last_name: "Doe",

    phone: "+233244556677"

    password: "mypassword", //required

    address: "My address",

    is_admin: false
}

Response spec:

{

    "status": "success",

    "data": {

        "token": "token-generated-with-jwt-npm-package",

        "id": Integer,  // id of the newly created user

        "first_name": String,

        "last_name": String,

        "email": String,

        "address": String,

        "phone": String,

        "is_admin": boolean

    }

}

POST /v1/auth/login: Login a user

Request body:

{

    email: "johndoe@example.com",

    password: "Mypassword"

}

Response Spec:

{

    "status": "success",

    "data": {

        "token": "token-generated-with-jwt-npm-package",

        "id": Integer,  // id of the newly created user

        "first_name": String,

        "last_name": String,

        "email": String,

        "address": String,

        "phone": String,

        "is_admin": boolean

    }

}

POST /v1/property: Create a property advert

Request body:

{

        "status": String, // available or sold. Default is available

        "type": String, //required

        "state": String,

        "city": String,

        "address": String, // required

        "price": Float, // required

        "created_on": DateTime,

}

Response spec:

{

    "status": "success",

    "data": {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }

}

POST /v1/property/<:property_id>/upload: Uploads property images  

Request body: multipart // form data

{
    fieldName: "images" // Shared name of the multipart form fields to process.
}

Response spec:

{

    "status": "success",

    "data": {

        "img_urls": Array,

    }

}

PATCH /v1/property/<:property-id>: Update property data  

#### Note: Only include fields you will like to update in your request object  

Request body:

{

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

}

Response spec:

{

    "status": "success",

    "data": {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }

}

PATCH /v1/property/<:property-id>/sold: Marks a property as sold

Response spec:

{

    "status": "success",

    "data": {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }

}}

DELETE /v1/property/<:property-id>: Delete a property advert

Response spec

{

    "status": "success",

    "data": {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }

}

GET /v1/property/<:property-id>: Get a specific property by ID

{

    "status": "success",

    "data": {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }

}



GET /v1/property: Get all properties

Response spec

{

    "status": "success",

    "data": [

        {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }, {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }
        ...

    ]

}

GET /property/search?type=propertyType: Get all properties with a specific type

Response spec

Response spec:

{

    "status": "success",

    "data": [

        {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }, {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }
        ...

    ]

}

POST /v1/property/:id/report: Reports a property as fraudulent  

Request body:  

{

    "reason: String,

    "description": String

}

Response body:

{

    "status": "success",

    "data": {

        "id": Integer,

        "owner_id: Integer,

        "status": String,

        "type": String,

        "state": String,

        "city": String,

        "address": String,

        "price": Float,

        "images_url": Array,

        "created_on": DateTime,

    }

}
