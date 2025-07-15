import ollama
import json

class BotAgent:
    def __init__(self, initial_settings = None):
        self.settings = {}
        if initial_settings != None:
            self.settings = initial_settings
        else:
            self.settings["assistant_name"] = "Pine"
            self.settings["marketplace_name"] = "PIN&COM"
            self.settings["greetings"] = f'Olá! Eu sou {self.settings["assistant_name"]}! Seu vendedor virtual do {self.settings["marketplace_name"]}!'
            self.settings["product_name"] = "VionX Pro 27 4K UltraView"
            self.settings["product_desciption"] = "Eleve sua experiência visual com o VionX Pro 27 UltraView, um monitor 4K UHD projetado para profissionais e entusiastas que exigem precisão e desempenho. Com tecnologia IPS, cobertura de 99% da gama sRGB e taxa de atualização de 120Hz, o VionX Pro oferece cores vivas, movimentos suaves e ângulos de visão amplos. Recursos como HDR10, bordas ultrafinas e suporte ajustável garantem conforto e imersão total, seja para edição de vídeo, jogos ou multitarefa. Com entradas HDMI 2.1, DisplayPort e USB-C com Power Delivery, é compatível com qualquer setup moderno. VionX Pro — onde clareza, performance e design se encontram."
        #print(self.settings)
        self.chat_history = {
            "history_list": []
        }
        system = f'Você vai ser {self.settings["assistant_name"]}! Você vai ajudar o usuário a entender mais sobre o produto {self.settings["product_name"]}! A descrição do produto é: {self.settings["product_desciption"]}. Responda de forma direta e sem enrolação. Não fuja das informações do produto contidas na descrição. Não fale nada que o usuário não pergunte. Seja atencioso e mesmo que venha uma pergunta boba ou muito simples, responda com seriedade e respeito. Não fale sobre outros produtos, caso o usuário pergunte fale que vc somente tem conhecimento sobre esse. Caso o usuário saia muito do assunto, fale que você somente pode falar sobre o produto. Molde sua personalidade com base no usuario que esta conversando'
        self.chat_history["history_list"].append({"role": "system", "content": system})
        self.chat_history["history_list"].append({"role": "assistant", "content": self.settings["greetings"]})
    
    def send_message(self, message, chat_history_json = None):
        print(chat_history_json)
        if chat_history_json != None:
            self.chat_history = json.loads(chat_history_json)
        print(self.chat_history)
        message_json = {"role": "user", "content": message}
        self.chat_history["history_list"].append(message_json)
        print(self.chat_history)
        response = ollama.chat(
            model="llama3",  # ou outro modelo disponível
            messages=self.chat_history['history_list']
        )
        response_json = {"role": "assistant", "content": response["message"]["content"]}
        self.chat_history["history_list"].append(response_json)
        chat_history_json = json.dumps(self.chat_history)
        return chat_history_json, response["message"]["content"]