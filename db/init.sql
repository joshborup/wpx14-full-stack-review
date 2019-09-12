drop table if exists burrito_cake_eater;
drop table if exists burrito_cake_inventory;

create table burrito_cake_eater
(
    id serial primary key,
    email text not null unique,
    password text not null,
    username text
);

insert into burrito_cake_eater
    (email, password, username)
values
    ('joshua.borup@devmounta.in', '$2b$12$5IO/9I6BtjUxBpfhO5NfB.bFrThXwmwJazIueoK7SsB2iP1kH8Uia', 'joshborup');

create table burrito_cake_inventory
(
    id serial primary key,
    product text not null,
    price integer not null,
    description text not null,
    image text not null
);

insert into burrito_cake_inventory
    (product, price, description, image)
values
    ('Giant cake burrito', 5, 'Super Gross!', 'http://2.bp.blogspot.com/-kOtDt8ccro0/VEsZTW9FOmI/AAAAAAAAOU0/uVOF6SGk2W4/s1600/DSC_0078.JPG')
,
    ('Burrito Birthday Surprise', 10, 'Grosser Than the Giant Cake Burrito', 'https://graybarnbaking.files.wordpress.com/2018/10/burrito-cake0001.jpg?w=529'),
    ('not a cake burrito', 32, 'I dont think this is a cake burrito but tell us after you try it!', 'https://cdn8.littlethings.com/app/uploads/2014/11/45830546508e7a52acdf6c838c764434_650x-600x404.jpg');


create table burrito_cake_orders
(
    id serial primary key,
    order_date date default now(),
    burrito_id integer references burrito_cake_inventory(id),
    burrito_eater_id integer references burrito_cake_eater(id)
);

insert into burrito_cake_orders
    (burrito_id, burrito_eater_id)
values
    (1, 1),
    (3, 1);

select order_date, product, burrito_cake_orders.burrito_eater_id as user_id, burrito_cake_inventory.id as burrito_id, price, description, image
from burrito_cake_orders
    join burrito_cake_inventory on (burrito_cake_orders.id = burrito_cake_inventory.id)
where burrito_cake_orders.burrito_eater_id = 1;