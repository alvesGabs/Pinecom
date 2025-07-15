import database


db_connection = database.DatabaseConnection()
history = '{"history_list": [{"role": "assistant", "content": "Ol\u00e1! Qual \u00e9 a sua d\u00favida?"}'
db_connection.query(
    f"DELETE FROM ai_chat WHERE cliente_id = 1 AND produto_id = 2"
)