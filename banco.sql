CREATE TABLE usuarios(
    email VARCHAR(110),
    password VARCHAR(50)
);

INSERT INTO usuarios(
    email, password
) VALUES (
"teste@mail.com","1234"
);

SELECT * FROM usuarios WHERE email = 'teste@mail.com';
DELETE FROM usuarios WHERE email = 'teste@mail.com';