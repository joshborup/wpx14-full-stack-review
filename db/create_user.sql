insert into burrito_cake_eater
    (email, password, username)
values
    ($1, $2, $3);
select email, username
from burrito_cake_eater
where email = $1;