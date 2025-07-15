import time
from database import DatabaseConnection
import ai_bot

class Common:
    def get_user_id_by_token(self, token):
        db_connection = DatabaseConnection()
        result = db_connection.select(
            "SELECT * FROM token WHERE token = '"+token+"'"
        )
        if len(result) == 1:
            user_result = db_connection.select(
                "SELECT * FROM cliente WHERE id = "+str(result[0][3])+""
            )
            if len(user_result) == 1:
                db_connection.close()
                return {"user_id": user_result[0][0]}
            else:
                db_connection.close()
                return {"user_id": "undefined", "error": "more than one users with this same id"}
        else:
            db_connection.close()
            return {"user_id": "undefined", "error": "token invalid"}
    def get_company_id_by_token(self, token):
        db_connection = DatabaseConnection()
        result = db_connection.select(
            "SELECT * FROM token WHERE token = '"+token+"'"
        )
        if len(result) == 1:
            company_result = db_connection.select(
                "SELECT * FROM empresa WHERE id = "+str(result[0][3])+""
            )
            if len(company_result) == 1:
                db_connection.close()
                return {"company_id": company_result[0][0]}
            else:
                db_connection.close()
                return {"company_id": "undefined", "error": "more than one users with this same id"}
        else:
            db_connection.close()
            return {"user_id": "undefined", "error": "token invalid"}
    
    def send_message(self, client_id, product_id, current_chat_history, message):
        db_connection = DatabaseConnection()
        settings = {
            "assistant_name": "Pine",
            "marketplace_name": "PIN&COM",
            "greetings": f'Olá! Qual é a sua dúvida?',
            "product_name": "VionX Pro 27 4K UltraView",
            "product_desciption": "Eleve sua experiência visual com o VionX Pro 27 UltraView, um monitor 4K UHD projetado para profissionais e entusiastas que exigem precisão e desempenho. Com tecnologia IPS, cobertura de 99% da gama sRGB e taxa de atualização de 120Hz, o VionX Pro oferece cores vivas, movimentos suaves e ângulos de visão amplos. Recursos como HDR10, bordas ultrafinas e suporte ajustável garantem conforto e imersão total, seja para edição de vídeo, jogos ou multitarefa. Com entradas HDMI 2.1, DisplayPort e USB-C com Power Delivery, é compatível com qualquer setup moderno. VionX Pro — onde clareza, performance e design se encontram."

        }
        bot = ai_bot.BotAgent(settings)
        chat_history, assistant_response = bot.send_message(message, current_chat_history)
        db_connection.query(
            f"UPDATE ai_chat SET history = '{chat_history}' WHERE cliente_id = {client_id} AND produto_id = {product_id}"
        )
        db_connection.close()
        print("mandado")
        return assistant_response