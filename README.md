# Instructions

Starter template for 😻 [nest](https://nestjs.com/) and [Prisma](https://www.prisma.io/).
Based on the excellent fivethree-team/nestjs-prisma-starter. Here we assume you are already familiar with that codebase, and want to add Auth0 and it's Social Login implimentation to your application. 


## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [type-graphql](https://github.com/19majkel94/type-graphql)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 Auth0 authentication based on the following How-To (but tweaked for graphQL instead of REST) w/ [passport-jwt](https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/)


## Overview

Mostly the same as the nestjs-prisma-starter; except: 
- some additional Auth0 env vars
- the need for a frontend that receives an Access-Token from Auth0
- a rule created in the Auth0 dashboard to connect some of the user's profile attributes (eg email) to the Access Token.



### 4. Make sure your .env file includes Auth0 configs

See .env.example for details.



## Playground

The main test of the Auth0 functionality will come through executing the me query with the Auth0 token, generated and shared to some frontend application.

For this you need a frontend app that logs in, receives that Bearer token and attaches it to each request.



```
{
  "Authorization" : "Bearer YOURTOKEN"
}
```


