export const DDL_LABEL = `Input DDL(One table at a time)`;

export const DDL_PLACEHOLDER = `CREATE TABLE students ( 
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    age INT DEFAULT 18, 
    gpa DECIMAL(3,2) CHECK (gpa <= 4.0), 
    PRIMARY KEY (id) 
    );`;
