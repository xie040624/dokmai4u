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

-- Insert Admin (Or insert at tools/create_admin.js)
INSERT INTO Admin (FName, LName, Email, PhoneNumber, Role, Username, Password)
VALUES
('Thanakorn', 'Kansorn', 'superadmin@dokmai4u.com', '012-345-6789', 'SuperAdmin', 'root',
 '$2b$10$iX11cHTR1PBFOVrFXdl24.7rbVe6F2u5.D/hSMQYjoxmhwlZUtlJa');

-- Insert Categories
INSERT INTO Category (CName)
VALUES
('Bouquet'),
('Gift Set'),
('Category');

-- Insert Flowers
INSERT INTO Flower (FlowerName, Meaning, Price, srcImage, StartDate, EndDate, CID)
VALUES
('Rose', 'Symbol of love and passion', 199.00, 'rose.jpg', '2025-01-01', '2025-12-31', 1),
('Tulip', 'Perfect love and happiness', 249.00, 'tulip.jpg', '2025-04-01', '2025-06-30', 1),
('Sunflower', 'Warmth, positivity, and loyalty', 299.00, 'sunflower.jpg', '2025-04-01', '2025-04-30', 2);