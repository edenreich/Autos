### Usage

clone this repoistory:
```sh
$ git clone https://github.com/edenreich/Autos.git [foldername]
``` 

in the root folder on the command line:
```sh
$ docker-compose up -d
```

if you want to seed the database with some dummy data:
```sh
$ docker exec -it node1 npm run seed
```

### Endpoints

Here are the endpoints to use this application.
for all the endpoints you need to pass a valid json object and the headers Content-Type should be set to application/json.

#### Users

| Http Verb | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /users | retrieves all users. |
| GET | /users/:id | retrieves a single user. |
| POST | /users/create | creates a given user. |
| PUT | /users/update | updates a given user. |
| DELETE | /users/delete | deletes a given user. |

#### Cars

| Http Verb | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /cars | retrieves all cars. |
| GET | /cars/:id | retrieves a single car. |
| POST | /cars/create | creates a given car. |
| PUT | /cars/update | updates a given car. |
| DELETE | /cars/delete | deletes a given car. |

#### Locations

| Http Verb | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /locations | retrieves all locations. |
| GET | /locations/:id | retrieves a single location. |
| POST | /locations/create | creates a given locations. |
| PUT | /locations/update | updates a given locations. |
| DELETE | /locations/delete | deletes a given locations. |

#### Inquiries

| Http Verb | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /inquiries | retrieves all inquiries. |
| GET | /inquiries/:id | retrieves single inquiry. |
| POST | /inquiries/create | creates a given inquiry. |
| PUT | /inquiries/update | updates a given inquiry. |
| DELETE | /inquiries/delete | deletes a given inquiry. |

### Examples

#### Create /locations/create

```json
{
	"location": {
		"name": "Hannover",
		"street": "Musterstreet",
		"zip": "D-12345",
		"tel": "0123456789"
	}
}
```

#### Response

```json
{
    "success": true,
    "data": {
        "name": "Hannover",
        "street": "Musterstreet",
        "zip": "D-12345",
        "tel": "0123456789",
        "id": 5,
        "updated_at": "2018-08-28T11:49:14.213Z",
        "created_at": "2018-08-28T11:49:14.213Z"
    },
    "message": "success!",
    "status": 200
}
```

For easy use please import the postman collection that found in the postman folder.

#### TODO

- Implement authentication / guards.
- Automate the process of checking incomming inquiries.
- Build a dashboard to display the locations of the cars using ajax long polling.
- Implement Caching Service with redis.
- Write automation testing using mocha.
