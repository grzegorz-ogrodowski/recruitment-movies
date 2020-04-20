# recruitment-movies

Recruitment task for The Software House compnay

# JediMaster

This is Movies management API for create and get orders.

## Table of Contents

- [Installation](#installation)
- [Run project](#run-project)
- [Movies management](#movies-management)
  - [Add a movie](#add-a-movie)
  - [Get movie(s)](#get-movies)

## Installation

In main app directory

    yarn install

## Run project

In main app directory

    yarn start

## Movies management

### Add a movie

Example URI `[POST]`:

    http://<host>:<port>/movies

By default:

    http://localhost:8001/movies

JSON structure for body:

```json
{
  "genres": ["Comedy", "Drama"],
  "title": "Rick & Morty",
  "year": 2020,
  "director": "Pete Michels",
  "runtime": 25
}
```

In response there are three status codes than can be returned:
**201** - Movie has been created successfully
**400** - Movie has not been created successfully. There is problem with request valid data
**500** - Movie has not been created successfully. There is unexpected error

### Get movie(s)

Example URI `[GET]`:

    http://<host>:<port>/movies

By default:

    http://localhost:8801/movies

Example JSON request:

```json
{
  "genres": ["Comedy", "Crime"],
  "runtime": 100
}
```

Example JSON response:

```json
{
  "id": 64,
  "title": "God Bless America",
  "year": "2011",
  "runtime": "105",
  "genres": ["Comedy", "Crime"],
  "director": "Bobcat Goldthwait",
  "actors": "Joel Murray, Tara Lynne Barr, Melinda Page Hamilton, Mackenzie Brooke Smith",
  "plot": "On a mission to rid society of its most repellent citizens, terminally ill Frank makes an unlikely accomplice in 16-year-old Roxy.",
  "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMTc1MzA4NF5BMl5BanBnXkFtZTcwNzQwMTgzNw@@._V1_SX300.jpg"
}
```
