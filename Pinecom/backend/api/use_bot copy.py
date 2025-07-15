import ai_bot as ai_bot
import json

settings = {
    "assistant_name": "Pine",
    "marketplace_name": "PIN&COM",
    "greetings": 'Olá! Qual é a sua dúvida?',
    "product_name": "VionX Pro 27 4K UltraView",
    "product_desciption": "Eleve sua experiência visual com o VionX Pro 27 UltraView, um monitor 4K UHD projetado para profissionais e ena gama sRGB e taxa de atualização de 120Hz, o VionX Pro oferece cores vivas, movimentos suaves e ângulos de visão amplos. Recursos como HDR10, bordas ultrafinas e suporte ajustável garantem conforto e imersão total, seja para edição de vídeo, jogos ou multitarefa. Com entradas HDMI 2.1, DisplayPort e USB-C com Power Delivery, é compatível com qualquer setup moderno. VionX Pro — onde clareza, performance e design se encontram."
}
bot = ai_bot.BotAgent()
chat_history = json.dumps(bot.chat_history)
while True:
    chat_history, message = bot.send_message(input("Você: "), chat_history)
    print("Assistente:", message)