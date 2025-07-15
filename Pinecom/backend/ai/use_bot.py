import ai_bot as ai_bot

bot = ai_bot.BotAgent()
settings = {
    "assistant_name": "Pine",
    "marketplace_name": "PIN&COM",
    "greetings": f'Olá! Qual é a sua dúvida?',
    "product_name": "VionX Pro 27 4K UltraView",
    "product_desciption": "Eleve sua experiência visual com o VionX Pro 27 UltraView, um monitor 4K UHD projetado para profissionais e entusiastas que exigem precisão e desempenho. Com tecnologia IPS, cobertura de 99% da gama sRGB e taxa de atualização de 120Hz, o VionX Pro oferece cores vivas, movimentos suaves e ângulos de visão amplos. Recursos como HDR10, bordas ultrafinas e suporte ajustável garantem conforto e imersão total, seja para edição de vídeo, jogos ou multitarefa. Com entradas HDMI 2.1, DisplayPort e USB-C com Power Delivery, é compatível com qualquer setup moderno. VionX Pro — onde clareza, performance e design se encontram."

}
print("Assistente:", settings["greetings"])
chat_history = None
while True:
    chat_history, message = bot.send_message(chat_history, input("Você: "))
    print("Assistente:", message)