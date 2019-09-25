INSERT INTO users (username, password, enabled) VALUES
    ('matteo', '$2a$04$rQEGRkmhYgiVz8n6cwM00OSei7zr3c1AdpGDhTqfn2x5It3rC/uTy', true), --1
    ('balint', '$2a$04$pxPucsFlobeOrZSqbFdgx.8Mn5PhJX6apJzuBI5VElimJHRcgzTEq', true), --2
    ('csanad', '$2a$04$uUK5k5HofChxb2/xYZ/Yoema6Py0Rw6pWn8SOynvKImyUPWGW7yK6', true), --3
    ('uszkai', '$2a$04$Psu.WEJiSQ0qX9O4QLe4uOYyQqXP7xII7TGgg9pC0RYglZzwu3Q.y', true), --4
    ('norbi', '$2a$04$/xXRsGXGE/sU7swhtDmyq.kCTDyicJHIBQl7M3YmFHLHmtOAZUSXS', true); --5

INSERT INTO users (username, password, enabled) VALUES
    ('kohrobi', '$2a$04$sSneTQcV4U1Bv1CTpdFcEeL79ObP/Dwci.o3NwXUTiVuTDnYzZemq', true), --6
    ('pakkko', '$2a$04$/HUPO77ug5EIJkJCSfpzhOG8XDNip9m4kb61Nu9TYSzv2OILEjPXq', true),  --7
    ('hitachi', '$2a$04$rAIJdDCU/721uR2uzYCb3ezLBMLpq1qoyc26OM.MGBINLIiLeC8MG', true), -- '12month', '2018-07-16', true), --1
    ('intel', '$2a$04$rZUQN6w4n5F.fEHtYbAvI.Ufclo8mPPc7Y1fmTLWB8/OW1UpM2LGm', true);--'6month', '2018-07-29', true); --2

INSERT INTO simple_users (user_id, email, first_name, last_name, birth_date, registration_date, experience) VALUES
    (1, 'matteo@gmail.com', 'Máté', 'Hricz', '1993-04-26', '2018-07-02', '100000'), --1
    (2, 'balint@gmail.com', 'Bálint', 'Csizmadia', '1988-03-16', '2018-07-02', '100000'), --2
    (3, 'csanad@gmail.com', 'Csanád', 'Hegedűs', '1996-11-12', '2018-07-02', '100000'), --3
    (4, 'uszkai@gmail.com', 'Dávid', 'Uszkai', '1987-02-17', '2018-07-10', '12000'), --4
    (5, 'norbi@gmail.com', 'Norbert', 'Csecskedy', '1986-04-11', '2018-07-16', '12450'); --5

INSERT INTO simple_users (user_id, email, first_name, last_name, birth_date, registration_date, experience) VALUES
    (6, 'kohrobi@gmail.com', 'Róbert', 'Kohányi', '1987-06-18', '2018-07-21', '17203'), --6
    (7, 'pakkko@gmail.com', 'Pál', 'Monoczki', '1982-02-20', '2018-08-03', '18123');  --7

INSERT INTO authorities (username, authority) VALUES
    ('matteo', 'ROLE_ADMIN'),
    ('balint', 'ROLE_ADMIN'),
    ('csanad', 'ROLE_ADMIN'),
    ('uszkai', 'ROLE_STUDENT'),
    ('norbi', 'ROLE_STUDENT'),
    ('kohrobi', 'ROLE_TEACHER'),
    ('pakkko', 'ROLE_TEACHER'),
    ('hitachi', 'ROLE_COMPANY'),
    ('intel', 'ROLE_COMPANY');


INSERT INTO user_reviews (reviewer_id, reviewed_id, pov_one, pov_two, pov_three, description, date) VALUES
    (6, 4, 3, 4, 3, 'It was good', '2018-01-01'), --1
    (6, 5, 5, 5, 5, 'It was exceptional', '2018-04-16'), --2
    (7, 4, 4, 3, 4, 'Very good student', '2018-08-01'); --3


INSERT INTO companies (user_id, name, registration_date, email, active, subscription, payment_date) VALUES
    (8, 'Hitachi', '2018-07-16', 'support@hitachi.com', true, '12month', '2018-07-16'), --1
    (9, 'Intel', '2018-07-26', 'info@intel.com', true, '6month', '2018-07-29'); --2


INSERT INTO advertisements (company_id, name, description) VALUES
    (1, 'BACKEND JAVA Developer needed ASAP', 'If you''re familiar with JAVA, this job is for you!'), --1
    (1, 'FRONTEND JavaScript & Angular dev', 'If you''re experienced in these technologies, apply'), --2
    (2, 'Project Manager or Scrum Master', 'We''re looking for an experienced leader personality to lead our team'), --3
    (2, 'Mobile Application Developer', 'Develop mobile apps in NativeScript with a great team!'), --4
    (2, 'Promotion Agent', 'We need an ambitious person to promote our projects to other companies!'), --5
    (2, 'Website Designer', 'If you''re an expert in CSS, SCSS, HTML, JavaScript, we are looking for you!'), --6
    (2, 'Software Developer needed', 'We are looking for a software developer who knows Python'); --7

INSERT INTO schedules (teacher_id, student_id, date, start_time) VALUES
    (6, 4, '2018-07-28', 9), --1
    (6, 4, '2018-07-28', 10), --2
    (6, 5, '2018-07-28', 11), --3
    (6, 5, '2018-07-28', 12), --4
    (7, 4, '2018-07-29', 14), --5
    (7, 5, '2018-07-29', 16), --6
    (7, 5, '2018-07-29', 17); --7

INSERT INTO courses (teacher_id, name, is_validated) VALUES
    (6, 'Python for dummies', true), --1
    (6, 'Python for beginners', true), --2
    (6, 'Python intermediate', true), --3
    (6, 'Python upper intermediate', true), --4
    (6, 'All about JAVA collections', false), --5
    (7, 'C# basics', true), --6
    (7, 'C# for rookies', true), --7
    (7, 'C# intermediate', false), --8
    (6, 'Python for the best', true); --9

INSERT INTO course_student (course_id, student_id) VALUES
    (1, 4),
    (2, 4),
    (3, 4),
    (5, 4),
    (6, 5),
    (7, 5),
    (9, 5);

INSERT INTO course_questions (course_id, question, question_type) VALUES
    (1, 'Can you create classes in Python?', 'YN'), --1
    (1, 'Are arguments pass-by-value in Python?', 'YN'), --2
    (1, 'Do you have to declare the type of the variables?', 'YN'), --3
    (1, 'You can delete a file with Python', 'TF'), --4
    (1, 'You can create global variables in Python', 'TF'), --5
    (1, 'You can communicate with servers via Python', 'TF'), --6
    (1, 'What is the syntax for defining a function?', 'SA'), --7
    (1, 'How do you define a dictionary?', 'SA'), --8
    (1, 'What is the syntax of printing the last letter of a string?', 'SA'), --9
    (1, 'Select the available types in Python', 'MA'), --10
    (1, 'Select the true statements', 'MA'), --11
    (1, 'Select the available built-in functions in Python', 'MA'), --12
    (1, 'Describe iterators', 'WA'), --13
    (1, 'Describe decorators', 'WA'), --14
    (2, 'Can you define a variable without giving it a type?', 'YN'), --15
    (2, 'You can use ''break'' in a while cycle', 'TF'), --16
    (3, 'Can you iterate through a dictionary?', 'YN'), --17
    (3, 'You can use ''continue'' in a while cycle', 'TF'), --18
    (4, 'Can you copy a class?', 'YN'), --19
    (4, 'You can develop an AI in Python.', 'TF'), --20
    (5, 'Can you sort a HashMap?', 'YN'), --21
    (5, 'You can remove an item from a List while iterating over it with a for cycle.', 'TF'), --22
    (6, 'Can you debug in C#?', 'YN'), --23
    (6, 'You can write unit tests in C#.', 'TF'), --24
    (7, 'Can you access threads in C#?', 'YN'), --25
    (7, 'You can create a GUI with C#.', 'TF'), --26
    (7, 'Describe user interface', 'WA'), --27
    (9, 'Python is an object-oriented programming language.', 'TF'), --28
    (9, 'You can define the type of variables', 'TF'), --29
    (9, 'You can delete a file with Python', 'TF'); --30

INSERT INTO course_answers (question_id, answer, is_right, experience) VALUES
    (1, 'Yes', true, 200), --1
    (1, 'No', false, 0), --2
    (2, 'Yes', true, 400), --3
    (2, 'No', false, 0), --4
    (3, 'Yes', false, 0), --5
    (3, 'No', true, 300), --6
    (4, 'True', true, 400),  --7
    (4, 'False', false, 0), --8
    (5, 'True', true, 200), --9
    (5, 'False', false, 0), --10
    (6, 'True', true, 400), --11
    (6, 'False', false, 0), --12
    (7, 'define function[]:', false, 0), --13
    (7, 'function{}:', false, 0), --14
    (7, 'def function():', true, 400), --15
    (8, 'Dictionary dict = ["key1" : "value1", "key2" : "value2"]', false, 0), --16
    (8, 'dict = {"key1" : "value1", "key2" : "value2"}', true, 200), --17
    (8, 'dict = "DICTIONARY("key1" :: "value1", "key2" :: "value2")', false, 0), --18
    (9, 'print(string[-1:])', true, 400), --19
    (9, 'print(string(--1))', false, 0), --20
    (9, 'print(string(1-;])', false, 0), --21
    (10, 'Set', true, 400), --22
    (10, 'Book', false, 0), --23
    (10, 'Tuple', true, 500), --24
    (10, 'Shelf', false, 0), --25
    (10, 'Table', false, 0), --26
    (11, 'Python is pass-by-value', true, 400), --27
    (11, 'You can pass-by-reference, if you want to', false, 0), --28
    (11, 'Python can not be object-oriented', false, 0), --29
    (11, 'Python is fully os-independent', false, 0), --30
    (11, 'You can define methods in classes', true, 400), --31
    (12, 'array.remove(arrayItem)', true, 500), --32
    (12, 'array.append(arrayItem)', true, 200), --33
    (12, 'dictionary.delete(dictionaryItem)', false, 0), --34
    (12, 'del(dictionary[dictionaryItem])', true, 400), --35
    (12, 'dictionary.pop(dictionaryItem)', false, 0), --36
    (13, 'An iterator is an object that implements next, which is expected to return the next element of the iterable object that returned it, and raise a StopIteration exception when no more elements are available.', true, 300), --37
    (14, 'A decorator is the name used for a software design pattern. Decorators dynamically alter the functionality of a function, method, or class without having to directly use subclasses or change the source code of the function being decorated.', true, 300), --38
    (15, 'Yes', true, 400), --39
    (15, 'No', false, 0), --40
    (16, 'True', true, 200), --41
    (16, 'False', false, 0), --42
    (17, 'Yes', true, 400), --43
    (17, 'No', false, 0), --44
    (18, 'True', true, 200), --45
    (18, 'False', false, 0), --46
    (19, 'Yes', true, 400), --47
    (19, 'No', false, 0), --48
    (20, 'True', true, 200), --49
    (20, 'False', false, 0), --50
    (21, 'Yes', false, 0), --51
    (21, 'No', true, 500), --52
    (22, 'True', false, 0), --53
    (22, 'False', true, 300), --54
    (23, 'Yes', true, 400), --55
    (23, 'No', false, 0), --56
    (24, 'True', true, 200), --57
    (24, 'False', false, 0), --58
    (25, 'Yes', true, 400), --59
    (25, 'No', false, 0), --60
    (26, 'True', true, 200), --61
    (26, 'False', false, 0), --62
    (27, 'A platform that lets you interract with the system', true, 300), --63
    (28, 'True', false, 300), --64
    (28, 'False', true, 300), --65
    (29, 'True', false, 300), --66
    (29, 'False', true, 300), --67
    (30, 'True', true, 300), --68
    (30, 'False', false, 300); --69


INSERT INTO student_answers (student_id, course_id, question_id, answer_id) VALUES
    (4, 2, 15, 39),
    (4, 2, 16, 42),
    (4, 3, 17, 43),
    (4, 3, 18, 46),
    (4, 7, 25, 59),
    (4, 7, 26, 61);

INSERT INTO student_answers (student_id, course_id, question_id, answer_id, wa_answer) VALUES
    (4, 7, 27, 63, 'An interface for users');


INSERT INTO course_videos (course_id, name, video, description) VALUES
    (1, 'Understanding the python syntax', 'https://www.youtube.com/watch?v=N4mEzFDjqtA', 'In this video you will learn the basic syntax of python.'),
    (1, 'Basic OOP in Python', 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM', 'This video will show you how to use classes.'),
    (1, 'Python matrix tutorial', 'https://www.youtube.com/watch?v=Go-FfGhxbSM', 'This video will teach you how to use matrixes.'),
    (2, 'Python algorithms 1', 'https://www.youtube.com/watch?v=ob4faIum4kQ', 'Learn how to make algorithms.'),
    (2, 'Python algorithms 2', 'https://www.youtube.com/watch?v=zeULw-a7Mw8', 'Binary search.'),
    (2, 'Python algorithms 3', 'https://www.youtube.com/watch?v=CB_NCoxzQnk', 'Quick sort.'),
    (3, 'Python game tutorial', 'https://www.youtube.com/watch?v=l90vKQMDHPU', 'Learn how to create a basic game.'),
    (3, 'Python tic-tac-toe tutorial', 'https://www.youtube.com/watch?v=mMO-spo20jU', 'Learn to write tic-tac-toe.'),
    (3, 'Python maze game', 'https://www.youtube.com/watch?v=-0q_miviUDs', 'Basic maze game.'),
    (4, 'Python AI programming', 'https://www.youtube.com/watch?v=GsAVf3fn3yM', 'AI in Python.'),
    (4, 'Advanced guide', 'https://www.youtube.com/watch?v=E_kZDvwofHY', 'Python advanced.'),
    (4, 'Logging', 'https://www.youtube.com/watch?v=jxmzY9soFXg', 'Python logging.'),
    (5, 'Java Collections', 'https://www.youtube.com/watch?v=jU5ACV5MucM', 'Learn to use basic collections in Java.'),
    (5, 'Java servlets', 'https://www.youtube.com/watch?v=CRvcm7GKrF0', 'Learn to deal with servlets.'),
    (5, 'Communicating with Databases', 'https://www.youtube.com/watch?v=2i4t-SL1VsU', 'This video will teach you how to connect to databases.'),
    (6, 'Beginner guide to C#', 'https://www.youtube.com/watch?v=pSiIHe2uZ2w', 'Introduction to the language.'),
    (6, 'Another one', 'https://www.youtube.com/watch?v=UI2RRcsR83s', 'Deepening our knowledge.'),
    (6, 'Delegates', 'https://www.youtube.com/watch?v=ifbYA8hyvjc', 'Learn delegates'),
    (7, 'Deepen your knowledge', 'https://www.youtube.com/watch?v=lisiwUZJXqQ', 'Some more advanced tips and tricks'),
    (7, 'Advanced Async', 'https://www.youtube.com/watch?v=ZTKGRJy5P2M', 'Progress reports, cancelling tasks'),
    (7, 'Generics', 'https://www.youtube.com/watch?v=U4E5j45swiI', 'Learn generics.'),
    (8, 'Windows forms', 'https://www.youtube.com/watch?v=J4J3ZcXRN_E', 'Create a basic GUI.'),
    (8, 'Game', 'https://www.youtube.com/watch?v=o8hPt8s_bwU', 'Learn to develop a game.'),
    (8, 'OOP Game', 'https://www.youtube.com/watch?v=decfmj7b5Vg', 'Learn to develop an OOP game'),
    (9, 'Basic OOP in Python', 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM', 'This video will show you how to use classes.'),
    (9, 'Python matrix tutorial', 'https://www.youtube.com/watch?v=Go-FfGhxbSM', 'This video will teach you how to use matrixes.'),
    (9, 'Python algorithms 1', 'https://www.youtube.com/watch?v=ob4faIum4kQ', 'Learn how to make algorithms.');

INSERT INTO course_reviews (course_id, student_id, rating, description) VALUES
    (1, 4, 5, 'Great course! Learned a lot from it!'),
    (1, 5, 5, 'Helped me a lot in starting python!'),
    (2, 4, 4, 'Hard, but great!'),
    (2, 5, 5, 'Very nice!'),
    (3, 4, 5, 'Liked it a lot.'),
    (3, 5, 5, 'Best course ever'),
    (4, 4, 5, 'Wow! GREAT!'),
    (4, 5, 5, 'Just what I needed'),
    (5, 4, 5, 'Perfect!'),
    (5, 5, 5, 'Great job!'),
    (6, 4, 5, 'Thanks for the course!'),
    (6, 5, 5, 'I Love it!'),
    (7, 4, 5, 'Thank youuuuu!'),
    (7, 5, 5, 'I''d give it 6 out of 5, if I could.'),
    (9, 5, 4, 'Could be better');

INSERT INTO course_topics (course_id, name) VALUES
    (1, 'Programming'),
    (1, 'English'),
    (1, 'Information Technology'),
    (2, 'Programming'),
    (2, 'English'),
    (2, 'Information Technology'),
    (3, 'Programming'),
    (3, 'English'),
    (3, 'Information Technology'),
    (4, 'Programming'),
    (4, 'English'),
    (4, 'Information Technology'),
    (5, 'Programming'),
    (5, 'English'),
    (5, 'Information Technology'),
    (6, 'Programming'),
    (6, 'English'),
    (6, 'Information Technology'),
    (7, 'Programming'),
    (7, 'English'),
    (7, 'Information Technology'),
    (8, 'Programming'),
    (8, 'English'),
    (8, 'Information Technology'),
    (9, 'Python');

INSERT INTO posts (user_id, user_name, post_content, rating) VALUES
    (3, 'csanad', 'Hi everyone, if you are interested in Python You should check out this article: https://gist.github.com/sloria/7001839', 3),
    (4, 'uszkai', 'Hey! What''s up? Here is a really good post about BlockChain and Java : https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa', 8),
    (2, 'balint', 'Hey FixedChancers! If you are interested in JavaScript here is a nice github repo which explains everythin from the basics: https://github.com/wesbos/es6-articles', 15),
    (5, 'norbi', 'If you have some free time and want to read something interesting you should check this out: https://codeburst.io/the-2018-web-developer-roadmap-826b1b806e8d', 12),
    (1, 'matteo', 'In case you need a fake online REST API for testing and prototyping: https://jsonplaceholder.typicode.com/', 20),
    (4, 'uszkai', 'If you need some extra help with your project feel free to write me a message! Check out my profile', 22),
    (2, 'balint', 'Hey FixedChance Society! I am stuck with my angular project and I was wondering if someone could help me.', 5),
    (1, 'matteo', 'Hey Everyone! I just finished the Java Collections course and it really helped me a lot so I recommend it to you if you want to know more about Collections!!', 0),
    (3, 'csanad', 'Please someone recommend me a good Java teacher here!!', 6),
    (5, 'norbi', 'Hey Fellas! Here is a RESTful API Design — Step By Step Guide: https://hackernoon.com/restful-api-design-step-by-step-guide-2f2c9f9fcdbf', 14);


INSERT INTO post_users (post_id, voter_id, vote) VALUES
    (1, 5, true),
    (3, 7, false),
    (6, 2, true),
    (2, 9, true),
    (5, 3, false),
    (1, 8, true),
    (2, 5, false),
    (7, 9, true),
    (7, 2, false),
    (9, 5, true),
    (8, 2, true);


INSERT INTO post_topics (post_id, name) VALUES
    (1, 'Python'),
    (1, 'Programming'),
    (1, 'Github'),
    (2, 'Blockchain'),
    (2, 'Java'),
    (2, 'Programming'),
    (3, 'JavaScript'),
    (3, 'Github'),
    (3, 'Programming'),
    (4, 'Web'),
    (4, 'Development'),
    (4, 'Programming'),
    (5, 'REST'),
    (5, 'API'),
    (5, 'Programming'),
    (6, 'Mentoring'),
    (6, 'Help'),
    (6, 'Programming'),
    (7, 'Angular'),
    (7, 'Help'),
    (7, 'Programming'),
    (8, 'Java'),
    (8, 'Collections'),
    (8, 'Programming'),
    (9, 'Java'),
    (9, 'Teacher'),
    (9, 'Course'),
    (10, 'REST'),
    (10, 'API'),
    (10, 'Programming');


INSERT INTO post_comments (user_id, post_id, comment_text) VALUES
    (2, 1, 'Very helpful!'),
    (4, 2, 'Thanks'),
    (1, 3, 'Thank for the advice'),
    (3, 6, 'That is very helpful'),
    (6, 4, 'Thanks for the useful link'),
    (2, 7, 'Thanks'),
    (5, 8, 'That is a good recommendation'),
    (2, 9, 'Check out kohrobi''s profile!'),
    (1, 9, 'Thank you!!'),
    (5, 5, 'I needed this!');