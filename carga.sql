CREATE TABLE carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL
);
INSERT INTO carros (nome, marca) VALUES ('Celta', 'Chevrolet');
INSERT INTO carros (nome, marca) VALUES ('Uno', 'Fiat');
INSERT INTO carros (nome, marca) VALUES ('Hilux', 'Toyota');