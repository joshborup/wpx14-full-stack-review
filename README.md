# The Famous Burrito Cake store

## clientside (frontend)

### dependencies

- axios
- react-router-dom
- redux
- react-redux
- node-sass
- http-proxy-middle

### routes

- Home => "/" => AuthComponent.js
- Store => "/store" => Store.js
- Profile => "/burrito_profile" => Profile.js

### file-structure

- src/
  - components/
    - AuthComponent.js
    - Store.js
    - Profile.js
  - App.js
  - index.js
  - reset.css
  - setupProxy.js
  - dux/
    - store.js
    - reducer.js

## serverside (backend)

### dependecies

    - express
    - express-session
    - dotenv
    - massive
    - bcrypt

### server file structure

- server/
  - index.js
  - controller/
    - cakeAndBurritoController.js
    - authController.js
  - middleware/
    - middleware.js => session check

### endpoints

**auth**

- login: => /api/spicy_burrito_purchase
- register: => /api/register_burrito
- logout: => /api/spicy_burrito_eaten
- userSession: => /api/burrito_info

**cake_burrito endpoints**

- get => /api/get_my_spicy_burritos
- get => /api/get_my_spicy_burrito/:id
- post => /api/never_gonna_give_you_up
- put => /api/burrito_central
- delete => /api/no_burrito

## secrets

```text
CONNECTION_STRING=
SESSION_SECRET=
SERVER_PORT=
```

## Database

- burrito_cake_eater

```sql
create table burrito_cake_eater(
    id serial primary key,
    email text not null unique,
    password text not null,
    username text
);
```

- burrito_cake_inventory

```sql
create table burrito_cake_inventory(
    id serial primary key,
    product text not null,
    price integer not null,
    description text not null,
    image text not null
)
```

- burrito_cake_orders

```sql
create table burrito_cake_orders(
id serial primary key,
order_date date default now(),
burrito_id integer references burrito_cake_inventory(id),
burrito_eater_id integer references burrito_cake_eater(id));
```
