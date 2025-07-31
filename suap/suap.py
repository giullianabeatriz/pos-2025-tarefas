import requests
from getpass import getpass
from tabulate import tabulate

api_url = "https://suap.ifrn.edu.br/api/"
ano = input("Ano letivo: ")
periodo = input("Período letivo: ")

username = input("Usuário: ")
password = getpass("Senha: ")

auth_response = requests.post(
    api_url + "v2/autenticacao/token/",
    json={"username": username, "password": password}
)
auth_response.raise_for_status()
token = auth_response.json().get("access")

headers = {"Authorization": f"Bearer {token}"}

url = f"{api_url}ensino/meu-boletim/{ano}/{periodo}/"
response = requests.get(url, headers=headers)
response.raise_for_status()
boletim = response.json()

if "results" in boletim:
    tabela = []
    for disciplina in boletim["results"]:
        tabela.append([
            disciplina.get("disciplina", "—"),
            disciplina.get("nota_etapa_1", {}).get("nota", "—"),
            disciplina.get("nota_etapa_2", {}).get("nota", "—"),
            disciplina.get("nota_etapa_3", {}).get("nota", "—"),
            disciplina.get("nota_etapa_4", {}).get("nota", "—"),
            disciplina.get("media_final_disciplina", "—"),
            disciplina.get("situacao", "—")
        ])

    print(tabulate(
        tabela,
        headers=["Disciplina", "1ª Etapa", "2ª Etapa", "3ª Etapa", "4ª Etapa", "Média Final", "Situação"],
        tablefmt="grid"
    ))
else:
    print("Boletim não encontrado ou sem dados.")
