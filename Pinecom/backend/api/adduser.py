from database import DatabaseConnection

db_connection = DatabaseConnection()
db_connection.query(
    "INSERT INTO cliente (nome, email, cpf, senha) VALUES ('andre', 'andre@ifpr.com', '12312323', 'bananinha')"
)
db_connection.close()