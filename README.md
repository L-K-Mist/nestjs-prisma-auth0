# Instructions

Starter template for 😻 [nest](https://nestjs.com/) and [Prisma](https://www.prisma.io/).
Based on the excellent [nestjs-prisma-starter](https://github.com/fivethree-team/nestjs-prisma-starter). Here we assume you are already familiar with that codebase, and want to add Auth0 - and it's Social Login implimentation - to your application. 

If you are familiar with the starter, then most of the changes here happened in src/resolvers/auth/jwt.strategy.ts.


## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [type-graphql](https://github.com/19majkel94/type-graphql)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 Auth0 authentication based on the following How-To (but tweaked for graphQL instead of REST) w/ [Auth0 with NestJs](https://auth0.com/blog/developing-a-secure-api-with-nestjs-adding-authorization/)


## Overview

Mostly the same as the nestjs-prisma-starter; except: 
- some additional Auth0 env vars
- the need for a frontend that receives an Access-Token from Auth0
- a rule created in the Auth0 dashboard to connect some of the user's profile attributes (eg email) to the Access Token.



### Make sure your .env file includes Auth0 configs

See .env.example for details.



### Playground

The main test of the Auth0 functionality will come through executing the me query with the Auth0 token, generated and shared to some frontend application.

For this you need a frontend app that logs in, receives that Bearer token and attaches it to each request.

```
{
  "Authorization" : "Bearer YOURTOKEN"
}
```

### Auth0 Rule

Here's an example rule that pulls email, firstname and lastname form the Social Login Profile, and adds it to the Access Token; to be used in src/resolvers/auth/jwt.strategy.ts

```
function (user, context, callback) {
    const namespace = 'https://nestjs-api.com/';
    context.accessToken[namespace + 'email'] = user.email;
    context.accessToken[namespace + 'firstname'] = user.given_name;
    context.accessToken[namespace + 'lastname'] = user.family_name;
  return callback(null, user, context);
}
```
Note: the namespace is required, is not a real link, and you'll probably want to create your own one.
In this case we chose to make it the same as the AUTH0_AUDIENCE, so that the validate method in src/resolvers/auth/jwt.strategy.ts knows what to expect.





