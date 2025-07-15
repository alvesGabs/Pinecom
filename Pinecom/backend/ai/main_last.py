import ollama

# Inicia uma sessão com histórico
history = []

assistant_name = "Pine"
marketplace_name = "PIN&COM"
greetings = [
    'Hello! I am '+assistant_name+'! Your virtual seller from '+marketplace_name+'!'
]
commands_valid = [
    {"name": "get_produtcs", "value": 0}
                  ]

commands_menu = "1 - get_products: use this command to get a JSON with all products [100 answers]"

all_produtcs = [
    {"title": "Notebook Gamer", "price": 2500, "coin": "reais", "category": "Eletrônicos"},
    {"title": "Fone Bluetooth", "price": 350, "coin": "reais", "category": "Acessórios"},
    {"title": "Xbox Series X", "price": 4200, "coin": "reais", "category": "Games"},
    {"title": "Nintendo Switch", "price": 2300, "coin": "reais", "category": "Games"},
    {"title": "Mesa para Computador", "price": 800, "coin": "reais", "category": "Móveis"},
    {"title": "Luminária de Mesa", "price": 70, "coin": "reais", "category": "Casa"}
]

history.append({"role": "system", "content": "don't make large answers"})
history.append({"role": "system", "content": "You will be "+assistant_name+". A virtual seller! Your object is to help the client buys the better product of our markplace, based on them preferences. We have a lot of type of produtcs"})
history.append({"role": "system", "content": "This is the products of markplace: {"+str(all_produtcs)+"}"})
history.append({"role": "system", "content": "The format of your answer will be a json like this: to cliente: {'receiver': 'user', 'message': 'write here the answer to the client when necessary'}; to make a command: {'receiver': 'system', 'command': 'write here a command from a menu when necessary', 'message_to_user': 'if you thought a message to user in this context, put here and concatenate in the next message to user or ignore it'}. ALWAYS FOLLOW THE FORMAT, DON'T WRITE ANYTHING OUT OF THE JSON. Use double quotes"})
history.append({"role": "system", "content": "There is no commands to system, at moment"})

state = "client"

last_message = ""

history.append({"role": "assistant", "content": '{"receiver": "client", "message": "'+greetings[0]+'"}'})

print("Assistant: "+greetings[0])

while True:
    if state == "client":
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        
        # Adiciona a mensagem do usuário ao histórico
        message = {"role": "user", "content": "{'user_message': '"+user_input+"}"}
        history.append(message)
        last_message = message
    
    if state == "system":
        # Adiciona a mensagem do usuário ao histórico
        if '"command": "get_menu"' in last_message["content"]:
            message = {"role": "system", "content": "{'sytem_command_return': '"+str(commands_menu)+"'}"}
            history.append(message)
            last_message = message
            print("System: "+str(message["content"])+"")
        if '"command": "get_products"' in last_message["content"]:
            if commands_valid[0]["value"] == 0:
                message = {"role": "system", "content": "{'sytem_command_return': {"+str(all_produtcs)+"}"}
                history.append(message)
                last_message = message
                #print("System: {"+str(all_produtcs)+"}")
                commands_valid[0]["value"] = 100
                print("System: "+str(message["content"])+"")
            else:
                message = {"role": "system", "content": "{'sytem_command_return': 'you have this information with "+str(commands_valid[0]["value"])+" of valid'"}
                history.append(message)
                last_message = message
                commands_valid[0]["value"] -= 1
                print("System: "+str(message["content"])+"")
    
    # Chama o Ollama com o histórico completo
    response = ollama.chat(
        model="llama3",  # ou outro modelo disponível
        messages=history
    )
    
    # Pega a resposta do assistente
    assistant_reply = response["message"]["content"]
    print(f"Assistant: {assistant_reply}")
    if '"receiver": "client"' in assistant_reply:
        state = "client"
    if '"receiver": "system"' in assistant_reply:
        state = "system"
    
    # Adiciona a resposta ao histórico
    message = {"role": "assistant", "content": assistant_reply}
    history.append(message)
    last_message = message