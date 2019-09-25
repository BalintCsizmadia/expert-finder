DROP TABLE IF EXISTS comment_answers;
DROP TABLE IF EXISTS post_comments;
DROP TABLE IF EXISTS post_topics;
DROP TABLE IF EXISTS post_users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS course_topics;
DROP TABLE IF EXISTS course_reviews;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS advertisements;
DROP TABLE IF EXISTS student_answers;
DROP TABLE IF EXISTS course_answers;
DROP TABLE IF EXISTS course_questions;
DROP TABLE IF EXISTS course_videos;
DROP TABLE IF EXISTS course_student;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS company_authorities;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS student_teacher_reviews;
DROP TABLE IF EXISTS teacher_student_reviews;
DROP TABLE IF EXISTS user_reviews;
DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS simple_users;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT,
	enabled BOOLEAN NOT NULL
);

CREATE TABLE simple_users (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	email TEXT UNIQUE, -- NOT NULL
	first_name TEXT, -- NOT NULL
	last_name TEXT, -- NOT NULL
	birth_date DATE, -- NOT NULL
	registration_date DATE, -- NOT NULL
	experience INTEGER NOT NULL DEFAULT '0',
	description TEXT,
	FOREIGN KEY(user_id) REFERENCES users(id),
	CONSTRAINT email_not_empty CHECK (email <> ''),
	CONSTRAINT firstname_not_empty CHECK (first_name <> ''),
	CONSTRAINT lastname_not_empty CHECK (last_name <> '')
);

CREATE TABLE authorities (
    username TEXT NOT NULL,
    authority TEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username),
    UNIQUE (username, authority)
);

CREATE TABLE user_reviews (
    id SERIAL PRIMARY KEY,
    reviewer_id INTEGER NOT NULL,
    reviewed_id INTEGER NOT NULL,
    pov_one INTEGER NOT NULL,
    pov_two INTEGER NOT NULL,
    pov_three INTEGER NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_id) REFERENCES users(id)
);

-- TEACHER -> STUDENT : motivation, communication, attitude
-- STUDENT -> TEACHER : knowledge, friendliness, clarity


CREATE TABLE companies (
    id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE,
	registration_date DATE NOT NULL,
	email TEXT NOT NULL UNIQUE,
	active BOOLEAN NOT NULL DEFAULT 'false',
	subscription TEXT NOT NULL,
	payment_date DATE,
	description TEXT,
	FOREIGN KEY(user_id) REFERENCES users(id),
	CONSTRAINT name_not_empty CHECK (name <> ''),
	CONSTRAINT email_not_empty CHECK (email <> '')
);

CREATE TABLE courses (
	id SERIAL PRIMARY KEY,
	teacher_id INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE,
	is_validated BOOLEAN NOT NULL DEFAULT 'false',
	FOREIGN KEY (teacher_id) REFERENCES users(id),
	CONSTRAINT name_not_empty CHECK (name <> '')
);

CREATE TABLE course_student (
    course_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    PRIMARY KEY (course_id, student_id)
);

CREATE TABLE course_videos (
	id SERIAL PRIMARY KEY,
	course_id INTEGER NOT NULL,
	name TEXT NOT NULL,
	video TEXT NOT NULL,
	description TEXT,
	FOREIGN KEY (course_id) REFERENCES courses(id),
	CONSTRAINT name_not_empty CHECK (name <> ''),
	CONSTRAINT video_not_empty CHECK (video <> '')
);

CREATE TABLE course_questions (
	id SERIAL PRIMARY KEY,
	course_id INTEGER NOT NULL,
	question TEXT NOT NULL,
	question_type TEXT NOT NULL,
	FOREIGN KEY (course_id) REFERENCES courses(id),
	CONSTRAINT question_not_empty CHECK (question <> '')
);

CREATE TABLE course_answers (
	id SERIAL PRIMARY KEY,
	answer TEXT NOT NULL,
	question_id INTEGER NOT NULL,
	is_right BOOLEAN NOT NULL,
    experience INTEGER,
	FOREIGN KEY (question_id) REFERENCES course_questions(id),
	CONSTRAINT answer_not_empty CHECK (answer <> '')
);

CREATE TABLE student_answers (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    answer_id INTEGER NOT NULL,
    wa_answer TEXT,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (question_id) REFERENCES course_questions(id),
    FOREIGN KEY (answer_id) REFERENCES course_answers(id)
);

CREATE TABLE advertisements (
	id SERIAL PRIMARY KEY,
	company_id INTEGER NOT NULL,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	FOREIGN KEY (company_id) REFERENCES companies(id),
	CONSTRAINT name_not_empty CHECK (name <> ''),
	CONSTRAINT description_not_empty CHECK (description <> '')
);

CREATE TABLE schedules (
	id SERIAL PRIMARY KEY,
	teacher_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	date DATE NOT NULL,
	start_time INTEGER NOT NULL,
	FOREIGN KEY (teacher_id) REFERENCES users(id),
	FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE TABLE course_reviews (
	id SERIAL PRIMARY KEY,
	course_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	rating INTEGER NOT NULL,
	description TEXT,
	FOREIGN KEY (course_id) REFERENCES courses(id),
	FOREIGN KEY (student_id) REFERENCES users(id),
	CONSTRAINT rating_between_one_five CHECK (rating >= 1 AND rating <= 5)
);

CREATE TABLE course_topics (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    post_content TEXT NOT NULL,
    rating INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES simple_users(id)
);

CREATE TABLE post_users (
    post_id INTEGER NOT NULL,
    voter_id INTEGER NOT NULL,
    vote BOOLEAN NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (voter_id) REFERENCES users(id),
    PRIMARY KEY (post_id, voter_id)
);

CREATE TABLE post_topics (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE post_comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    comment_text TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);