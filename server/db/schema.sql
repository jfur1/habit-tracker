USE habit_tracker;

CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT,
    `first_name` VARCHAR(75),
    `last_name` VARCHAR(75),
    `email` VARCHAR(95) NOT NULL,
    `password` VARCHAR(36) NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`) 
VALUES
("John", "Furlong", "johnfurlong24@gmail.com", "testpwd"),
("Bill", "Gates", "billgates@gmail.com", "mypwd123"),
("Jane", "Doe", "janedoe@gmail.com", "secretpwd");

CREATE TABLE IF NOT EXISTS `habits` (
    `habit_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `schedule` VARCHAR(255) NOT NULL,
    `frequency` INT NOT NULL,
    `units` VARCHAR(45) NOT NULL,
    `type` bool NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `color` VARCHAR(32) NOT NULL,
    `icon` INT NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
);

INSERT INTO `habits` (`user_id`, `title`, `schedule`, `frequency`, `units`, `type`, `description`, `color`, `icon`)
VALUES
(3, 'Go for a Walk', 'Sun Mon Tue Wed Thu Fri Sat', 2, 'times', true, 'try and go for a walk twice a day', '#fff', '0'),
(1, 'Code for 1 hour', 'Sun Mon Wed Fri', 1, 'times', true, 'Spend 1 hour practicing code', '#fff', '3'), 
(2, 'Read', 'Mon Wed Fri', 20, 'pages', true, 'Read at least 20 papes of my book!', '#bbb', '5');


CREATE TABLE IF NOT EXISTS `entries` (
	`entry_id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `ymd` DATE NOT NULL ,
    `dowIdx` INT NOT NULL,
    `habit_id` INT NOT NULL,
	`frequency` INT NOT NULL,
    `units` VARCHAR(45) NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`habit_id`) REFERENCES habits(`habit_id`),
    FOREIGN KEY (`user_id`) REFERENCES users(`user_id`)
);

INSERT INTO `entries` (`user_id`, `ymd`, `dowIdx`, `habit_id`, `frequency`, `units`)
VALUES
(1, '2022-12-05', 1, 2, 1, 'times'),
(2, '2022-12-05', 1, 1, 1, 'times'),
(1, '2022-12-05', 1, 3, 1, 'times');

