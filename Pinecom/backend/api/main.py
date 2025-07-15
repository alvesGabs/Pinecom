from flask import Flask, jsonify, request
import jwt
import datetime
import time
import json
import ai_bot
from flask_cors import CORS

from database import DatabaseConnection
from common import Common

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = open("./secret_key.txt").readlines()[0].strip()
common = Common()

# Rota para listar todos os produtos
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    user_type = data.get("type")
    db_connection = DatabaseConnection()
    if user_type == "cliente":
        result = db_connection.select(
            f"SELECT * FROM cliente WHERE email ='{email}' AND senha = '{password}'"
        )
    elif user_type == "empresa":
        result = db_connection.select(
            f"SELECT * FROM empresa WHERE email ='{email}' AND senha = '{password}'"
        )
    else:
        return jsonify({"error": "usuário não encontrado"})
    if len(result) > 0:
        new_token = jwt.encode(
            {
                'email': email,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
            },
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        db_connection.query(
            f"INSERT INTO token (token, instanteCriado, cliente_id) VALUES ('{new_token}', {time.time()}, {result[0][0]})"
        )
        db_connection.close()
        return jsonify({"token": new_token})
    else:
        db_connection.close()
        return jsonify({"error": "usuário não encontrado"})

@app.route('/register-client', methods=['POST'])
def register_client():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    cpf = data.get("cpf")
    password = data.get("password")

    print(f"name: {name}")
    print(f"email: {email}")
    print(f"cpf: {cpf}")
    print(f"password: {password}")

    db_connection = DatabaseConnection()
    verify_select = db_connection.select(
        "SELECT id FROM cliente WHERE email='{email}' "
    )
    if len(verify_select) == 0:
        db_connection.query(
            f"INSERT INTO cliente (nome, email, cpf, senha) VALUES ('{name}', '{email}', '{cpf}', '{password}')"
        )
        db_connection.close()
        return jsonify({"status": "ok"})
    db_connection.close()
    return jsonify({"status": "error"})

@app.route('/register-company', methods=['POST'])
def register_company():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    cnpj = data.get("cnpj")
    password = data.get("password")

    db_connection = DatabaseConnection()
    verify_select = db_connection.select(
        "SELECT id FROM empresa WHERE email='{email}' "
    )
    if len(verify_select) == 0:
        db_connection.query(
            f"INSERT INTO empresa (nome, email, cnpj, senha) VALUES ('{name}', '{email}', '{cnpj}', '{password}')"
        )
        db_connection.close()
        return jsonify({"status": "ok"})
    db_connection.close()
    return jsonify({"status": "error"})

@app.route('/register-product', methods=['POST'])
def register_product():
    data = request.get_json()
    token = data.get("token")
    name = data.get("name")
    price = data.get("price")
    image = data.get("image")
    description = data.get("description")
    company_id = common.get_company_id_by_token(token)["company_id"]

    if company_id != "undefined":
        db_connection = DatabaseConnection()
        db_connection.query(
            f"INSERT INTO produto (nome, preco, descricao, imagem, comentario, empresa_id) VALUES ('{name}', '{price}', '{description}', '{image}', '', {company_id})"
        )
        db_connection.close()
        return jsonify({"status": "ok"})

@app.route('/get-my-info', methods=['POST'])
def get_my_info():
    data = request.get_json()
    token = data.get("token")
    db_connection = DatabaseConnection()
    result = db_connection.select(
        f"SELECT * FROM token WHERE token = '{token}'"
    )
    if len(result) == 1:
        user_result = db_connection.select(
            f"SELECT * FROM cliente WHERE id = {result[0][3]}"
        )
        if len(user_result) == 1:
            return jsonify(
                {"user": {
                    "name": user_result[0][1],
                    "email": user_result[0][2]
                }})
    return jsonify(
        {"error": "token invalid"}
    )

@app.route('/get-chat', methods=['POST'])
def get_chat():
    data = request.get_json()
    token = data.get("token")
    product_id = data.get("product_id")
    user_id = common.get_user_id_by_token(token)["user_id"]
    if user_id != "undefined":
        db_connection = DatabaseConnection()
        result = db_connection.select(
            f"SELECT * FROM ai_chat WHERE cliente_id = {user_id} AND produto_id = {product_id}"
        )
        if len(result) == 1:
            chat_history_json = result[0][3]
            chat_history = json.loads(chat_history_json)
            messages = chat_history["history_list"]
            if len(messages) > 0:
                messages_list = []
                for message in messages:
                    if message["role"] != "system":
                        message_json = {
                            "sender": message["role"],
                            "message": message["content"]
                        }
                        messages_list.append(message_json)
                db_connection.close()
                return jsonify({"chat_id": result[0][0],
                                "messages": messages_list})
        else:
            result_product = db_connection.select(
                f"SELECT * FROM produto WHERE id = {product_id}"
            )
            settings = {
                "assistant_name": "Pine",
                "marketplace_name": "PIN&COM",
                "greetings": f'Olá! Qual é a sua dúvida?',
                "product_name": result_product[0][1],
                "product_desciption": result_product[0][3]
            }
            bot = ai_bot.BotAgent(settings)
            chat_history = bot.chat_history
            chat_history_json = json.dumps(chat_history)
            db_connection.query(
                f"INSERT INTO ai_chat (cliente_id, produto_id, history, instanteCriado) VALUES ({user_id}, {product_id}, '{chat_history_json}', {time.time()})"
            )
            result_chat = db_connection.select(
                f"SELECT * FROM ai_chat WHERE cliente_id = {user_id} AND produto_id = {product_id}"
            )
            db_connection.close()
            return jsonify({"chat_id": result_chat[0][0],
                            "messages": [{
                                "sender": "assistant",
                                "message": "Olá! Qual é a sua dúvida?"
                                }
                            ]})
    return jsonify(
        {
            "status": 404
        }
    )
        

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.get_json()
    token = data.get("token")
    message = data.get("message")
    product_id = data.get("product_id")
    user_id = common.get_user_id_by_token(token)["user_id"]
    db_connection = DatabaseConnection()
    result = db_connection.select(
        f"SELECT * FROM ai_chat WHERE cliente_id = {user_id} AND produto_id = {product_id}"
    )
    chat_history_json = result[0][3]
    assistant_response = common.send_message(user_id, product_id, chat_history_json, message)
    return jsonify({"status": 200, "assistant_message": assistant_response})

@app.route('/get-product', methods=['POST'])
def get_product():
    data = request.get_json()
    product_id = data.get("product_id")
    db_connection = DatabaseConnection()
    result_product = db_connection.select(
        f"SELECT * FROM produto WHERE id = {product_id}"
    )
    return jsonify({
        "status": 200,
        "product_name": result_product[0][1],
        "product_price": result_product[0][2],
        "product_description": result_product[0][3],
        "product_image": result_product[0][4]
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)