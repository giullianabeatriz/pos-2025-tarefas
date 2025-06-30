import users

def main():
    print("Gerenciador de Usuários")
    print("1- Listar usuários")
    print("2- Criar usuário")
    print("3- Ver usuário")
    print("4- Atualizar usuário")
    print("5- Deletar usuário")
    print("0- Sair")

    while True:
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            all_users = users.list()
            for user in all_users:
                print(f"{user['id']}: {user['name']}")

        elif opcao == "2":
            name = input("Nome: ")
            email = input("Email: ")
            new_user = users.create({"name": name, "email": email})
            print("Usuário criado:", new_user)

        elif opcao == "3":
            user_id = input("ID do usuário: ")
            try:
                user = users.read(user_id)
                print("Dados do usuário:", user)
            except Exception as e:
                print("Erro:", e)

        elif opcao == "4":
            user_id = input("Id do usuário: ")
            name = input("Novo nome: ")
            email = input("Novo email: ")
            try:
                updated = users.update(user_id, {"name": name, "email": email})
                print("Usuário atualizado:", updated)
            except Exception as e:
                print("Erro:", e)

        elif opcao == "5":
            user_id = input("Id do usuário: ")
            try:
                result = users.delete(user_id)
                print(result)
            except Exception as e:
                print("Erro:", e)

        elif opcao == "0":
            print("Saindo.")
            break

        else:
            print("Opção inválida.")

if __name__ == "__main__":
    main()
