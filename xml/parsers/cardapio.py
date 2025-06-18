from xml.dom.minidom import parse

dom = parse("cardapio.xml")
cardapio = dom.documentElement
pratos = cardapio.getElementsByTagName('prato')

print("CARDÁPIO")
for prato in pratos:
    id_prato = prato.getAttribute("id")
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue.strip()
    print(f"{id_prato} - {nome}")

escolhido = input("\nDigite o ID do prato que deseja: ").strip().upper()

encontrado = False
for prato in pratos:
    if prato.getAttribute("id") == escolhido:
        nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue.strip()
        descricao = prato.getElementsByTagName('descricao')[0].firstChild.nodeValue.strip()
        ingredientes = prato.getElementsByTagName('ingredientes')[0].firstChild.nodeValue.strip()
        preco = prato.getElementsByTagName('preco')[0].firstChild.nodeValue.strip()
        calorias = prato.getElementsByTagName('calorias')[0].firstChild.nodeValue.strip()
        tempo = prato.getElementsByTagName('tempoPreparo')[0].firstChild.nodeValue.strip()

        print("\nDETALHES DO PRATO")
        print(f"ID: {escolhido}")
        print(f"Nome: {nome}")
        print(f"Descrição: {descricao}")
        print(f"Ingredientes: {ingredientes}")
        print(f"Preço: {preco}")
        print(f"Calorias: {calorias}")
        print(f"Tempo de Preparo: {tempo}")
        encontrado = True
        break

if not encontrado:
    print("Prato não encontrado. Verifique o Id digitado.")
