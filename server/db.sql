  DROP database gym;
  CREATE database gym;
  Use gym;

  CREATE TABLE Trainers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    gender VARCHAR(10),
    phone VARCHAR(20)
  );

  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    dob DATE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL,
    weight INT,
    height INT,
    trainerId INT,
    FOREIGN KEY (trainerId) REFERENCES Trainers(id)
  );

  CREATE TABLE memberWeight (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    weight INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (memberId) REFERENCES users(id) on delete cascade
  );

  CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    trainerId INT,
    memberId INT,
    FOREIGN KEY (trainerId) REFERENCES Trainers(id),
    FOREIGN KEY (trainerId) REFERENCES Trainers(id)
  );



Update users set role = 'admin' where firstName = 'admin';


  -- INSERT INTO users (email, gender, dob, password, firstName, lastName, role, weight, height)
  -- VALUES ('admin@admin.com', 'Male', '1990-01-01', "admin", 'Admin', 'Admin', 'admin', NULL, NULL);