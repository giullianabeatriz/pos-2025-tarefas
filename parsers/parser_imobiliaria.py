import json

with open("imobiliaria.json", "r", encoding="utf-8") as f:
    dados= json.load(f)

imoveis= dados["imobiliaria"]["imovel"]

print("MENU")
for idx, imovel in enumerate(imoveis, start=1):
    print(f"{idx}-{imovel['descricao'].capitalize()}({imovel['proprietario']['nome']})")

try:
    escolha= int(input("\nDigite o número do imóvel que deseja ver: "))
    if 1 <= escolha <= len(imoveis):
        selecionado= imoveis[escolha - 1]
        print("\nDETALHES DO IMÓVEL")
        print(f"Descrição: {selecionado['descricao']}")
        print(f"Proprietário: {selecionado['proprietario']['nome']}")
        print(f"Email: {selecionado['proprietario']['email']}")
        print("Telefone:", end=" ")
        telefones= selecionado['proprietario']['telefone']
        if isinstance(telefones, list):
            print(", ".join(telefones))
        else:
            print(telefones)

        print("\nEndereço:")
        endereco= selecionado["endereco"]
        for campo in ["rua", "bairro", "cidade", "numero"]:
            if campo in endereco:
                print(f"{campo.capitalize()}:{endereco[campo]}")

        print("\nCaracterísticas:")
        print(f"  Tamanho: {selecionado['caracteristicas']['tamanho']}m²")
        print(f"  Quartos: {selecionado['caracteristicas']['numQuartos']}")
        print(f"  Banheiros: {selecionado['caracteristicas']['numBanheiros']}")
        print(f"\nValor: R${selecionado['valor']}")
    else:
        print("Id inválido.")
except ValueError:
    print("Entrada inválida. Digite um número.")
