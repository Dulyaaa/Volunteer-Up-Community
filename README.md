# "Volunteer Up Community" To Protect The World 🌏🙌

This platform highlights the volunteer events one of the volunteers has organized to bring together other volunteers. The venue and other specifics of the event are listed individually. The volunteer must register and log into the system to create the event because it is always essential to provide accurate information. Nevertheless, the system has the following capabilities:
* View All Published Events
* Search Published Events
* Register, Log In & Log Out 
* Retrieve Published & Drafted Events By Volunteer
* Create New Events (As either Publish or Save as Draft) 
* Delete Events

Showcases of final implementation of the system.

<!-- <a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vuqbu0d6i571fynd0h3q.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vuqbu0d6i571fynd0h3q.png" width="100%" height="auto"></a>
<a href="https://user-images.githubusercontent.com/57215584/186807215-92e4f92e-ebcd-4c2a-a4be-c5efb0a30a9b.png"><img src="https://user-images.githubusercontent.com/57215584/186807215-92e4f92e-ebcd-4c2a-a4be-c5efb0a30a9b.png" width="50%" height="auto"></a><a href="https://user-images.githubusercontent.com/57215584/186808105-aede870c-ba24-4727-99eb-86ba2dd3f2fc.png"><img src="https://user-images.githubusercontent.com/57215584/186808105-aede870c-ba24-4727-99eb-86ba2dd3f2fc.png" width="50%" height="auto"></a>
<a href="https://user-images.githubusercontent.com/57215584/186808274-7fec4f00-1a55-4af0-935c-059344466e80.png"><img src="https://user-images.githubusercontent.com/57215584/186808274-7fec4f00-1a55-4af0-935c-059344466e80.png" width="50%" height="auto"></a><a href="https://user-images.githubusercontent.com/57215584/186808391-606d3c3c-a403-4898-9651-f5c1b69ebd3c.png"><img src="https://user-images.githubusercontent.com/57215584/186808391-606d3c3c-a403-4898-9651-f5c1b69ebd3c.png" width="50%" height="auto"></a>
 -->

**_Home Page_**
>![HomePage](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vuqbu0d6i571fynd0h3q.png)

**_All Events Page_**
><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b2ed2hbuimbfu0uvl0km.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b2ed2hbuimbfu0uvl0km.png" width="50%" height="auto"></a>

**_Log In Page_**
><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7sfj5saq95u0zk9hz6yz.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7sfj5saq95u0zk9hz6yz.png" width="50%" height="auto"></a>

**_Sign Up Page_**
><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ek10rfedb1dwrlysemef.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ek10rfedb1dwrlysemef.png" width="50%" height="auto"></a>

**_Profile Page_**
><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w6ehuvxqc1a3b95x4s39.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w6ehuvxqc1a3b95x4s39.png" width="50%" height="auto"></a>

**_Create New Event Page_**
><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4tzyt54bb8odnkc700q8.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4tzyt54bb8odnkc700q8.png" width="50%" height="auto"></a>

**_Update & Delete Event Page_**
><a href="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3tylih9973e7if8iu4sc.png"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3tylih9973e7if8iu4sc.png" width="50%" height="auto"></a>

#### Mern Architecture

![MERN Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vhunlb7zvx1jx03ko490.png)

#### High Level Architecture
![High Level Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/536ngf4aizx0iepj7l19.png)


# Overview video

Here's a short video that explains the project and how it uses Redis:

[![Watch the video on YouTube](https://user-images.githubusercontent.com/57215584/187068277-db2e622e-fa37-410e-a84c-5c08d2bd3ce8.png)](https://www.youtube.com/watch?v=U0lHaCXKK-g&t=36s)

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
* `Redis OM` is provided a object mapping for Redis which means that the Redis data types like `hash`(which I used here) maps to javaScript objects. And through `RediSearch` module make it easier to search over these hashes. 
* To access the data used the `hgetall` to get all the information. 
```js 
const user = await redisClient.hgetall(`user:${email}`);
```

#### Log In
```js
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get the user details from Redis
        const user = await redisClient.hgetall(`user:${email}`);

        // Check if user with that email exists
        const userEmail = await redisClient.hgetall(`user:${email}`);
        if (userEmail.email !== email) {
            return res.status(409).send({
                error: true,
                message: 'Account with that email not exists.',
                data: '',
            });
        }

        const validaPassword = await compare(password, user.password);
        if (!user.email || !validaPassword) {
            return res.status(401).send({
                error: true,
                message: 'Invlaid email or password.',
            });
        }

        // Generate a token for the user to perform other operations
        const token = await generateToken({ userKey: `user:${email}`, userId: user.id })
        return res.status(200).send({
            error: false,
            message: 'Login successfully. You will redirect shortly.',
            data: { token, user },
        });
    } catch (error) {
        return `Server error, please try again later. ${error}`;
    }
};
```

#### Get All Events
* `GET` route used to retrieve the data.
* Used the `search()` method on `eventRepository` to retrieve and it returns the all events.
* Except the `visibility == "false"` (means drafted posts) posts will retrieve.
* It sorts out the events by (`createdAt`) event created date which auto create when creating the event. 
```js
const allEvents = await eventRepository
            .search()
            .where('visibility')
            .equal(true)
            .sortDescending('createdAt')
            .return.page(offset, count);

```

#### Get Event By ID
* `GET` route used to retrieve the data.
* Just, `fetch()` method used on `eventRepository` to retrieve the event details by passing the `eventId`.
```js
        // Fetch a single event by ID
        const event = await eventRepository.fetch(eventId);
```

#### Delete Event
* `DELETE` route used to retrieve the data.
* `remove()` method used to delete the event by passing the that event's `eventId`.
```js
        if (eventRepository.remove(eventId)) {
            return res.status(200).send({
                error: false,
                message: 'Event deleted successfully',
            });
        }
```

#### Get Draft Event Posts By User
* `GET` route used to retrieve the drafted data. 
```js
        // Fetch all host events sorting by the date created which ensures that the latest one come up first
        const userDraftEvents = await eventRepository
            .search()
            .where('userId')
            .equal(userId)
            .where('visibility')
            .equal(false)
            .sortDescending('createdAt')
            .return.page(offset, count);
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
