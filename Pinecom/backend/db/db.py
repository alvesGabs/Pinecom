import sqlite3

class DatabaseConnection:
    def __init__(self):
        self.conn = sqlite3.connect('ecommerce.db')
        self.cursor = self.conn.cursor()
        pass

    def createTables(self):
        # Cliente
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS cliente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            cpf TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )
        ''')

        # Empresa
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS empresa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            cnpj TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )
        ''')

        # Produto
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS produto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            descricao TEXT,
            comentario TEXT,
            empresa_id INTEGER NOT NULL,
            FOREIGN KEY (empresa_id) REFERENCES empresa(id)
        )
        ''')

        #Token
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS token (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT,
            instanteCriado REAL,
            cliente_id INTEGER NOT NULL,
            FOREIGN KEY (cliente_id) REFERENCES cliente(id)
        )
        ''')

        self.conn.commit()

    def close(self):
        self.conn.close()

    def query(self, command):
        self.cursor.execute(command)

    def select(self, query):
        self.cursor.execute(query)
        resultado = self.cursor.fetchall()
        return resultado
