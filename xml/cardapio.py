from xml.dom.minidom import parse

dom = parse("cardapio.xml")

cardapio = dom.documentElement

pratos = cardapio.getElementsByTagName('prato')

print("Selecione o prato desejado")
id_prato = 0
for prato in pratos:
    id_prato = id_prato + 1
    titulo = prato.getElementsByTagName('título')[0].firstChild.nodeValue
    print(f"{id_prato} - {prato}")

informacoes = int(input("Digite o id desejado"))

