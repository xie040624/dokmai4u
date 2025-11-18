CREATE DATABASE IF NOT EXISTS dokmai4u;
USE dokmai4u;

-- Admin Table
CREATE TABLE IF NOT EXISTS Admin (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    FName VARCHAR(50) NOT NULL,
    LName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    Role ENUM('SuperAdmin', 'Admin') DEFAULT 'Admin',
    Username VARCHAR(50) UNIQUE NOT NULL,
    -- HashedPassword 
    Password VARCHAR(255) NOT NULL
);

-- Category Table
CREATE TABLE IF NOT EXISTS Category (
    CID INT AUTO_INCREMENT PRIMARY KEY,
    CName VARCHAR(50) NOT NULL
);

-- Flower Table
CREATE TABLE IF NOT EXISTS Flower (
    FlowerID INT AUTO_INCREMENT PRIMARY KEY,
    FlowerName VARCHAR(50) NOT NULL,
    Meaning VARCHAR(100) NOT NULL,
    Price FLOAT NOT NULL,
    srcImage VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    CID INT,
    CONSTRAINT fk_flower_category
        FOREIGN KEY (CID) REFERENCES Category(CID)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- Login Table
CREATE TABLE IF NOT EXISTS Login (
    LoginID INT AUTO_INCREMENT PRIMARY KEY,
    LoginDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    AdminID INT,
    CONSTRAINT fk_login_admin
        FOREIGN KEY (AdminID) REFERENCES Admin(AdminID)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- Insert Admin
INSERT INTO `Admin` (`FName`,`LName`,`Email`,`PhoneNumber`,`Role`,`Username`,`Password`) VALUES ('Thanakorn','Kansorn','thanakorn.kar@dokmai4u.com','-','SuperAdmin','thanakorn','$2b$10$/71MBT1aswSUwJD/JbXmVOqjoxYxB6gLjsC1.U39mNf9XUxcQsuWi');
INSERT INTO `Admin` (`FName`,`LName`,`Email`,`PhoneNumber`,`Role`,`Username`,`Password`) VALUES ('Pakorn','Nimnuan','pakorn.nim@dokmai4u.com','-','Admin','pakorn','$2b$10$hz8mvnClZ8Fg9PYgc/UP6.poyOok2AmS2QTc.9D4XLF9BsiJ97O96');
INSERT INTO `Admin` (`FName`,`LName`,`Email`,`PhoneNumber`,`Role`,`Username`,`Password`) VALUES ('Nitichot','Chaiyasit','nitichot.cha@dokmai4u.com','-','Admin','nitichot','$2b$10$RNDqTnB2XXw235YD877VNuVcPdUwM9qAii898L5pehHLwMjuGCr62');
INSERT INTO `Admin` (`FName`,`LName`,`Email`,`PhoneNumber`,`Role`,`Username`,`Password`) VALUES ('Supakit','Suwan','supakit.suw@dokmai4u.com','-','Admin','supakit','$2b$10$eNwS0cEDKNtapuPOhc19He8JWTzouzNdTI9YveWFKZjCcBJiNnSkS');

-- Insert Categories
INSERT INTO `category` (`CName`) VALUES ('Category');
INSERT INTO `category` (`CName`) VALUES ('Bouquet');
INSERT INTO `category` (`CName`) VALUES ('Gift Set');
INSERT INTO `category` (`CName`) VALUES ('Flower Vase');
INSERT INTO `category` (`CName`) VALUES ('Wedding');

-- Insert Flowers
INSERT INTO `flower` (`FlowerName`,`Meaning`,`Price`,`srcImage`,`StartDate`,`EndDate`,`CID`) VALUES ('Rose','Symbol of love and passion',199,'rose.jpg','2024-01-01','2025-12-31',5);
INSERT INTO `flower` (`FlowerName`,`Meaning`,`Price`,`srcImage`,`StartDate`,`EndDate`,`CID`) VALUES ('Tulip','Perfect love and happiness',249,'tulips.jpg','2024-01-01','2024-02-14',2);
INSERT INTO `flower` (`FlowerName`,`Meaning`,`Price`,`srcImage`,`StartDate`,`EndDate`,`CID`) VALUES ('Sunflower','Warmth, positivity, and loyalty',299,'sunflower.jpg','2024-04-01','2024-04-30',3);
