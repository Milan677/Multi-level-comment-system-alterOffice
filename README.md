


# Multi-level Comment System

## Objective
The goal of this project is to design and implement a set of API endpoints for a social media platform that handles multi-level comments on posts. This system allows users to create comments, reply to existing comments, and retrieve comments with pagination. Additionally, the project includes user authentication and rate limiting to ensure secure and efficient API usage. The entire project is dockerized and can be deployed to a hosting service.

## Features
### User Registration & Login
* Users can register with a username, email, and password.
* Users must log in to access comment APIs.

### Comment System
* Users can add new comments to posts.
* Users can reply to existing comments.
* Comments can be retrieved with pagination.

### Security
* User authentication is implemented using JWT (JSON Web Tokens).
* Rate limiting is applied to prevent abuse.

## API Endpoints:

### User Authentication
  
`1.Registration`
* Endpoint :
    ```http
    POST /api/user/register
    ```
* Request body :
    ```javascript
      {
        "userName":"Prashant Kumar Mohanty",
        "email":"prashant@gmail.com",
        "password":"prashant"
      }
    ```
* Response :
    ```javascript
    {
      "msg": "A new user recently added"
    }
    ```

`2.Login`
* Endpont : 
    ```http
    POST /api/user/login
    ```
* Request body :
    ```javascript
    {
     "email":"prashant@gmail.com",
     "password":"prashant"
    }
    ```
* The above API can return a json data which contains a text `message` and a acess `token` as response.
* Response :
    ```javascript
      {
         "msg": "Login succesfull !",
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwNjIwYjIwNjQ0NzVkZTRjMTJjMzEiLCJpYXQiOjE3MjQwODI4MTAsImV4cCI6MTcyNDA5MDAxMH0.uISnR300htxiWn6EYdTCkYw3lOf9QLw6kaH2kCoMbng"
      }
    ```
## New post creation by user
* Endpoint :
    ```http
    POST /api/create-post
    ```
* Request body :
    ```javascript
      {
        "title":"post 3",
        "content":"This is the content of post 3"
      }
    ```
* Response :
    ```javascript
    {
       "msg": "new post created",
       "post": {
            "title": "post 3",
            "content": "This is the content of post 3",
            "userId": "66c0620b2064475de4c12c31",
            "_id": "66c3808bd1c5330fd2500c6d",
            "__v": 0
       }
    }
    ```  
## Comments APIs :

### 1.Create comment API :
* Endpoint :
    ```http
    POST /api/posts/:postId/comments
    ```
   | Parameter | Type        | Example |
   | --------  | --------    | -------- |
   | postId    | ObjectID    | 66c0eee4c8cb1ec550460530|


* Request body :
    ```javascript
      {
        "text":"Feeling very well by looking your post"
      }
    ```
* Response :
    ```javascript
    {
        "msg": "new comment added",
        "comment": {
            "text": "Feeling very well by looking your post",
            "userId": "66c0620b2064475de4c12c31",
            "postId": "66c0eee4c8cb1ec550460530",
            "parentId": null,
            "replies": [],
            "_id": "66c36c200d08dc8d43eff541",
            "createdAt": "2024-08-19T16:00:32.737Z",
            "__v": 0
        }
    }
    ```

### 2.Reply to Existing Comment API :
* Endpoint :
    ```http
    POST /api/posts/:postId/comments/:commentId/reply
    ```
   | Parameter | Type        | Example |
   | --------  | --------    | -------- |
   | postId    | ObjectID    | 66c0eee4c8cb1ec550460530|
   | commentId | ObjectID    | 66c0ffbd6a802612ed71a4bc|

* Request body :
    ```javascript
      {
        "text":"You are osm"
      }
    ```
* Response :
    ```javascript
    {
        "msg": "new comment added",
        "comment": {
            "text": "You are osm",
            "userId": "66c0620b2064475de4c12c31",
            "postId": "66c0eee4c8cb1ec550460530",
            "parentId":"66c0ffbd6a802612ed71a4bc",
            "replies": [],
            "_id": "66c36c200d08dc8d43eff541",
            "createdAt": "2024-08-19T16:00:32.737Z",
            "__v": 0
        }
    }
    ```
### 3.Get Comments for a Specific post API:
 * This API can return all the comments for a target post.
 * The endpoint require two query params i.e `sortBy` and `sortOrder`.
 * You can choose the following fileds for sortBy :
      - createdAt 
 * You can choose following for sortOrder :
   - `asc` for ascending.
   - `desc` for descending.

 * Endpoint :
    ```http
    GET /api/posts/:postId/comments?sortBy=createdAt&sortOrder=asc
    ```
   | Parameter | Type        | Example |
   | --------  | --------    | -------- |
   | postId    | ObjectID    | 66c0eee4c8cb1ec550460530|
   | sortBy    | String (optional)   | createdAt |
   | sortOrder   | String (optional)   | asc or desc|
   
* Response :
    ```javascript
    [
     {
        "_id": "66c0f5ae634dbe83c74a86f3",
        "text": "nice pic",
        "userId": "66c0efddc8cb1ec550460533",
        "postId": "66c0eee4c8cb1ec550460530",
        "parentId": null,
        "replies": [
            {
                "_id": "66c360f8fd5b984a75ee7103",
                "text": "Thank you for your comment",
                "createdAt": "2024-08-19T15:12:56.300Z"
            }
        ],
        "createdAt": "2024-08-17T19:10:38.074Z",
        "__v": 0,
        "totalReplies": 1
     },
     {
        "_id": "66c0f6e8857de564de78ad21",
        "text": "very nice pic",
        "userId": "66c0efddc8cb1ec550460533",
        "postId": "66c0eee4c8cb1ec550460530",
        "parentId": null,
        "replies": [
            {
                "_id": "66c1ade87046a7bf65700e0b",
                "text": "when you are going to gym",
                "createdAt": "2024-08-18T08:16:40.491Z"
            },
            {
                "_id": "66c1adbe7046a7bf65700e05",
                "text": "you hve nic muscle",
                "createdAt": "2024-08-18T08:15:58.148Z"
            }
        ],
        "createdAt": "2024-08-17T19:15:52.531Z",
        "__v": 0,
        "totalReplies": 4
     },
     {
        "_id": "66c36c200d08dc8d43eff541",
        "text": "Feeling very well by looking your post",
        "userId": "66c0620b2064475de4c12c31",
        "postId": "66c0eee4c8cb1ec550460530",
        "parentId": null,
        "replies": [],
        "createdAt": "2024-08-19T16:00:32.737Z",
        "__v": 0,
        "totalReplies": 0
     }
   ]  
    ``` 
### 4.Expand Parent-Level Comments API with Pagination:
* This api should return all the replies to a specific parent commnet with pagination feature.
* The endpoint require two query params i.e `page` and `pageSize`.
* Endpoint :
    ```http
    GET /api/posts/:postId/comments/:commentId/expand?page=1&pageSize=2
    ```
   | Parameter    | Type        | Example  |
   | --------     | --------    | -------- |
   | postId       | ObjectID    | 66c0eee4c8cb1ec550460530|
   | commentId    | ObjectID    | 66c0f6e8857de564de78ad21|
   | page   | Number   | 1|
   | pageSize   | Number   | 3 |
   
* Response :
    ```javascript
   [
    {
        "_id": "66c1adbe7046a7bf65700e05",
        "text": "you hve nic muscle",
        "userId": "66c0efddc8cb1ec550460533",
        "postId": "66c0eee4c8cb1ec550460530",
        "parentId": "66c0f6e8857de564de78ad21",
        "replies": [
            {
                "_id": "66c1b122b3210bbc350cb11d",
                "text": "thank you ",
                "createdAt": "2024-08-18T08:30:26.809Z"
            },
            {
                "_id": "66c1b155b3210bbc350cb123",
                "text": "can u hep me for making me stronger?",
                "createdAt": "2024-08-18T08:31:17.220Z"
            }
        ],
        "createdAt": "2024-08-18T08:15:58.148Z",
        "__v": 0,
        "totalReplies": 3
    },
    {
        "_id": "66c1ade87046a7bf65700e0b",
        "text": "when you are going to gym",
        "userId": "66c0efddc8cb1ec550460533",
        "postId": "66c0eee4c8cb1ec550460530",
        "parentId": "66c0f6e8857de564de78ad21",
        "replies": [],
        "createdAt": "2024-08-18T08:16:40.491Z",
        "__v": 0,
        "totalReplies": 0
    }
  ]  
    ``` 