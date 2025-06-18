import json
from xml.dom.minidom import parse

dom = parse("imobiliaria.xml")
imobiliaria = dom.documentElement
imoveis = imobiliaria.getElementsByTagName("imovel")

dados_json = {
    "imobiliaria": {
        "imovel": []
    }
}

for imovel in imoveis:
    item = {}
    item["descricao"] = imovel.getElementsByTagName("descricao")[0].firstChild.nodeValue.strip()

    proprietario_tag = imovel.getElementsByTagName("proprietario")[0]
    nome = proprietario_tag.getElementsByTagName("nome")[0].firstChild.nodeValue.strip()
    
    emails = proprietario_tag.getElementsByTagName("email")
    telefones = proprietario_tag.getElementsByTagName("telefone")

    email = emails[0].firstChild.nodeValue.strip() if emails and emails[0].firstChild else ""
    
    telefones_list = [t.firstChild.nodeValue.strip() for t in telefones if t.firstChild]
    telefone_valor = telefones_list[0] if len(telefones_list) == 1 else telefones_list

    item["proprietario"] = {
        "nome": nome,
        "email": email,
        "telefone": telefone_valor
    }

    endereco_tag = imovel.getElementsByTagName("endereco")[0]
    endereco = {}
    for tag in ["rua", "bairro", "cidade", "numero"]:
        el = endereco_tag.getElementsByTagName(tag)
        if el and el[0].firstChild:
            valor = el[0].firstChild.nodeValue.strip()
            if tag == "numero" and valor.isdigit():
                endereco[tag] = int(valor)
            else:
                endereco[tag] = valor
    item["endereco"] = endereco

    caract_tag = imovel.getElementsByTagName("caracteristicas")[0]
    tamanho = caract_tag.getElementsByTagName("tamanho")[0].firstChild.nodeValue.strip().replace("m", "")
    num_quartos = caract_tag.getElementsByTagName("numQuartos")[0].firstChild.nodeValue.strip()
    num_banheiros = caract_tag.getElementsByTagName("numBanheiros")[0].firstChild.nodeValue.strip()

    item["caracteristicas"] = {
        "tamanho": int(tamanho),
        "numQuartos": int(num_quartos),
        "numBanheiros": int(num_banheiros)
    }

    valor = imovel.getElementsByTagName("valor")[0].firstChild.nodeValue.strip().replace("R$", "").replace(".", "").replace(",", ".")
    item["valor"] = valor.strip()

    dados_json["imobiliaria"]["imovel"].append(item)

with open("imobiliaria.json", "w", encoding="utf-8") as f:
    json.dump(dados_json, f, indent=2, ensure_ascii=False)

print("Arquivo json gerado com sucesso!")
