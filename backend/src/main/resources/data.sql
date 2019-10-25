INSERT INTO users (username, password, enabled) VALUES
    ('user', '$2a$10$I.oBrHlRreiZzo1300CxsemvwySwqcDWsbe.j4jwPifkeGKcMk7DC', true), -- pass: user1
    ('user2', '$2a$10$gVhepXkwaK.U5.4qr05u..XzluX0ZE.XsqBj/5ZwnTfVtN.H/I962', true), -- pass: user2
    ('customer', '$2a$10$CK2BO7ZerGFGeNng28cjeuFgWcozeVcT5p7hV1DKpcPnh/zqNhDeC', true), -- pass: customer
    ('customer2', '$2a$10$lCxVgVoPtgyIDKcn45YYz.SEkvciBLijFD72spsyfm/fOtrvlEUza', true); -- pass: customer2

INSERT INTO visitors (user_id, email) VALUES
    (1, 'a@b.com'),
    (2, 'b@c.com');

INSERT INTO professions (name_en, name_hu) VALUES
    ('Information technology', 'Informatika'),
    ('Sales', 'Kereskedelem');

INSERT INTO customers (user_id, email, first_name, last_name, phone_number, profession_id, position) VALUES
    (3, 'c@d.com', 'John', 'Doe', '06201231233', 1, '{ "latitude": 47.498, "longitude": 19.03, "timestamp": "" }'),
    (4, 'd@e.com', 'Jane', 'Doe', '0620654968', 2, '{ "latitude": 47.493, "longitude": 19.088, "timestamp": "" }');

INSERT INTO authorities (username, authority) VALUES
    ('user', 'ROLE_VISITOR'),
    ('user2', 'ROLE_VISITOR'),
    ('customer', 'ROLE_CUSTOMER'),
    ('customer2', 'ROLE_CUSTOMER');
