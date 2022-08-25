# "Volunteer Up Community" To Protect The World 🌏🙌

This platform highlights the volunteer events one of the volunteers has organized to bring together other volunteers. The venue and other specifics of the event are listed individually. The volunteer must register and log into the system to create the event because it is always essential to provide accurate information. Nevertheless, the system has the following capabilities:
* View All Published Events
* Search Published Events
* Register, Log In & Log Out 
* Retrieve Published & Drafted Events By Volunteer
* Create New Events (As either Publish or Save as Draft) 
* Delete Events

Showcases of final implementation of the system.

<a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vuqbu0d6i571fynd0h3q.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vuqbu0d6i571fynd0h3q.png" width="100%" height="auto"></a>
<a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w6ehuvxqc1a3b95x4s39.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w6ehuvxqc1a3b95x4s39.png" width="50%" height="auto"></a><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gn1y2slpj5txaugywqxq.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gn1y2slpj5txaugywqxq.png" width="50%" height="auto"></a>

# Overview video

Here's a short video that explains the project and how it uses Redis:

[![Watch the video on YouTube](https://github.com/redis-developer/basic-analytics-dashboard-redis-bitmaps-nodejs/blob/cb8c2178a6c5a019c42aa91739ad9bfdbb2d558c/docs/YTThumbnail.png)](https://www.youtube.com/watch?v=Ugym4yUeIhA)

## How it works
### How the data is stored:

#### User creation

* Before create the new user, check if the user with that email already exits or not by using `hgetall` by passing the email and returns the all fields (`firstName, lastName, displayName, email, password`) and values of the hash stored at key.
* If the user is not exsits, generate the random userId using `ulid()` which will be used as the key in Redis. 
* Hashed the password before store in Redis cloud using `hash()` method of `bcrypt` library.
* Then create the user using `execute` command and as a `HSET` which sets feild in the hash stored at key to value (`user:${email}`).

```js
        // Create user account
        const createUser = await redisClient.execute([
            'HSET',
            `user:${email}`,
            'id',
            `${userId}`,
            'firstName',
            `${firstName}`,
            'lastName',
            `${lastName}`,
            'email',
            `${email}`,
            'password',
            `${hashedPassword}`,
            'displayName',
            `${displayName}`,
        ]);
```

#### Event creation

* The event data is stored in various keys and various data types.
    * Some of the keys are sortable like `startDate`, `endDate`, `createdAt`, `updatedAt`.  
    * Data Types used:
        * text
        * string
        * date
        * boolean
     * And saved the event schema as a `HASH`.
        * So that, able to retrieve the data fastly. 
```js
    const eventSchema = new Schema(EventRepository, {
    title: { type: 'text' },
    description: { type: 'text' },
    category: { type: 'string' },
    venue: { type: 'string' },
    startDate: { type: 'date', sortable: true },
    endDate: { type: 'date', sortable: true },
    imageUrl: { type: 'string' },
    userId: { type: 'string' },
    createdAt: { type: 'date', sortable: true },
    updatedAt: { type: 'date', sortable: true },
    visibility: { type: 'boolean' },
}, {
    dataStructure: 'HASH'
});
```
The key for each event is auto generated when storing the data. That key is stored as `entityId`. 

### How the data is accessed:

#### User Data Retrieve
```js 
const user = await redisClient.hgetall(`user:${email}`);
```

## How to run it locally?
### Prerequisites

- React - v18.2.0
- Node - v15.5.0
- NPM - v7.3.0
- Express - v4.18.1

### Local installation

First, clone the project (`git clone https://github.com/Dulyaaa/Volunteer-Up-Community.git`)

#### Frontend
Go to `Frontend` folder (`cd Frontend`) and then:

```
# install dependencies
npm install

# Run application
npm start
```

#### Backend
Go to `Backend` folder (`cd Backend`) and then:

```
# install dependencies
npm install

# Run application
npm start
```

## Deployment

To make deploys work, you need to create free account on [Redis Cloud](https://redis.info/try-free-dev-to)

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://redis-dev-hackthon-frontend.herokuapp.com/)


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


# Redis Analytics Bitmaps demo

## How it works
### How the data is stored:

* The event data is stored in various keys and various data types.
    * For each of time spans:
        * year: like 2021
        * month: like 2021-03 (means March of 2021)
        * day: like 2021-03-03 (means 3rd March of 2021)
        * weekOfMonth: like 2021-03/4 (means 4th week of March 2021)
        * anytime
        
    * and for each of scopes:
        * source
        * action
        * source + action
        * action + page
        * userId + action
        * global
        
    * and for each of data types (types):
        * count (Integer stored as String)
        * bitmap
        * set
        
Is generated key like: `rab:{type}[:custom:{customName}][:user:{userId}][:source:{source}][:action:{action}][:page:{page}]:timeSpan:{timeSpan}`, where values in `[]` are optional.
* For each generated key like `rab:count:*`, data is stored like: `INCR {key}`
    * E.g `INCR rab:count:action:addToCart:timeSpan:2015-12/3`
* For each generated key like: `rab:set:*`, data is stored like: `SADD {key} {userId}`
    * E.g `SADD rab:set:action:addToCart:timeSpan:2015-12/3 8`
* For each generated key like `rab:bitmap:*`, data is stored like: `SETBIT {key} {userId} 1`.
    * E.g `SETBIT rab:bitmap:action:addToCart:timeSpan:2015-12/3 8 1`
* Cohort data:
    * We store users who register and then bought some products (action order matters).
    * For each buy action in December we check if user performed register action before (register counter must be greater than zero).
    * If so, we set user bit to 1 like: `SETBIT rab:bitmap:custom:cohort-buy:timeSpan:{timeSpan} {userId} 1`
    * E.g User Id 2 bought 2 products on 2015-12-17. He won't be stored.
    * E.g User Id 10 bought 1 product on 2015-12-17 and registered on 2015-12-16. He will be stored like: `SETBIT rab:bitmap:custom:cohort-buy:timeSpan:2015-12 10 1`.
    * We assume that user cannot buy without register.
* Retention data:
    * Retention means users who bought on two different dates
    * For each buy action we check if user bought more products anytime than bought on particular day (current purchase not included).
    * If so, we add user id to set like: `SADD rab:set:custom:retention-buy:timeSpan:{timeSpan} {userId}`
    * E.g User Id 5 bought 3 products on 2015-12-15. His retention won't be stored (products bought on particular day: 2, products bought anytime: 0).
    * E.g User Id 3 bought 1 product on 2015-12-15 and before - 1 product on 2015-12-13. His retention will be stored (products bought on particular day: 0, products bought anytime: 1) like: `SADD rab:set:custom:retention-buy:timeSpan:2015-12 3`.

### How the data is accessed:

* Total Traffic: 
    * December: `BITCOUNT rab:bitmap:custom:global:timeSpan:2015-12`
    * X week of December: `BITCOUNT rab:bitmap:custom:global:timeSpan:2015-12/{X}`
        * E.g `BITCOUNT rab:bitmap:custom:global:timeSpan:2015-12/3`

* Traffic per Page ({page} is one of: homepage, product1, product2, product3):
    * December: `BITCOUNT rab:bitmap:action:visit:page:{page}:timeSpan:2015-12`
        * E.g `BITCOUNT rab:bitmap:action:visit:page:homepage:timeSpan:2015-12`
    * X week of December: `BITCOUNT rab:bitmap:action:visit:page:{page}:timeSpan:2015-12/{X}`
        * E.g `BITCOUNT rab:bitmap:action:visit:page:product1:timeSpan:2015-12/2`

* Traffic per Source ({source} is one of: google, Facebook, email, direct, referral, none):
    * December: `BITCOUNT rab:bitmap:source:{source}:timeSpan:2015-12`
        * E.g `BITCOUNT rab:bitmap:source:referral:timeSpan:2015-12`
    * X week of December: `BITCOUNT rab:bitmap:source:{source}:timeSpan:2015-12/{X}`
        * E.g `BITCOUNT rab:bitmap:source:google:timeSpan:2015-12/1`

* Trend traffic ({page} is one of: homepage, product1, product2, product3):
    * December: from `BITCOUNT rab:bitmap:action:visit:{page}:timeSpan:2015-12-01` to `BITCOUNT rab:bitmap:action:visit:{page}:timeSpan:2015-12-31`
    * 1 Week of December: Similar as above, but from 2015-12-01 to 2015-12-07
    * 2 Week of December: Similar as above, but from 2015-12-08 to 2015-12-14
    * 3 Week of December: Similar as above, but from 2015-12-15 to 2015-12-21
    * 4 Week of December: Similar as above, but from 2015-12-22 to 2015-12-28
    * 5 Week of December: Similar as above, but from 2015-12-29 to 2015-12-31
        * E.g `BITCOUNT rab:bitmap:action:visit:homepage:timeSpan:2015-12-29` => `BITCOUNT rab:bitmap:action:visit:homepage:timeSpan:2015-12-30` => `BITCOUNT rab:bitmap:action:visit:homepage:timeSpan:2015-12-31`

* Total products bought:
    * December: `GET rab:count:action:buy:timeSpan:2015-12`
    * X week of December: `GET rab:count:action:buy:timeSpan:2015-12/{X}`
        * E.g `GET rab:count:action:buy:timeSpan:2015-12/1`

* Total products added to cart:
    * December: `GET rab:count:action:addToCart:timeSpan:2015-12`
    * X week of December: `GET rab:count:action:addToCart:timeSpan:2015-12/{X}`
        * E.g `GET rab:count:action:addToCart:timeSpan:2015-12/1`

* Shares of products bought ({productPage} is on of product1, product2, product3):
    * December: `GET rab:count:action:buy:page:{productPage}:timeSpan:2015-12`
        * E.g `GET rab:count:action:buy:page:product3:timeSpan:2015-12`
    * X week of December: `GET rab:count:action:buy:page:{productPage}:timeSpan:2015-12/{X}`
        * E.g `GET rab:count:action:buy:page:product1:timeSpan:2015-12/2`

* Customer and Cohort Analysis:
    * People who registered: `BITCOUNT rab:bitmap:action:register:timeSpan:2015-12`
    * People who register then bought (order matters): `BITCOUNT rab:bitmap:custom:cohort-buy:timeSpan:2015-12`
    * Dropoff: (People who register then bought / People who register) * 100 [%]

* Customers who bought only specified product ({productPage} is one of: product1, product2, product3): `SMEMBERS rab:set:action:buy:page:{productPage}:timeSpan:2015-12`
    * E.g `SMEMBERS rab:set:action:buy:page:product2:timeSpan:2015-12`
* Customers who bought Product1 and Product2: `SINTER rab:set:action:buy:page:product1:timeSpan:anytime rab:set:action:buy:page:product2:timeSpan:anytime`
* Customer Retention (customers who bought on the different dates): `SMEMBERS rab:set:custom:retention-buy:timeSpan:anytime`
``



