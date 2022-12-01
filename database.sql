drop database BREAKOUTBRICK;

CREATE DATABASE BREAKOUTBRICK;
USE BREAKOUTBRICK;



CREATE TABLE useraccount (
	id_account int,
    username varchar(100),
    pass varchar(100),
    PRIMARY KEY(id_account)
);

CREATE TABLE ball (
    id_account int,
    ball_x int,
    ball_y int,
    speed int,
    radius int,
    FOREIGN KEY(id_account) REFERENCES useraccount(id_account)
);

CREATE TABLE paddle (
	paddle_id int,
    id_account int,
    paddle_x int,
    paddle_y int,
    paddle_height int,
    paddle_width int,
    paddle_speed int,
    FOREIGN KEY(id_account) REFERENCES useraccount(id_account)
);


CREATE TABLE score (
	score_id int,
    id_account int,
    score_value int,
    score_unit int,
    FOREIGN KEY(id_account) REFERENCES useraccount(id_account)
);




