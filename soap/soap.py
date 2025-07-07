import requests
from xml.dom import minidom

url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"

def send_soap_request(action, body):
    headers = {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": action
    }
    response = requests.post(url, data=body, headers=headers)
    return response.content

def get_capital_city(country_code):
    body = f"""
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <m:CapitalCity xmlns:m="http://www.oorsprong.org/websamples.countryinfo">
          <m:sCountryISOCode>{country_code}</m:sCountryISOCode>
        </m:CapitalCity>
      </soap:Body>
    </soap:Envelope>
    """
    result = send_soap_request("http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/CapitalCity", body)
    dom = minidom.parseString(result)
    value = dom.getElementsByTagName("m:CapitalCityResult")[0].firstChild.nodeValue
    print(f"Capital de {country_code}: {value}")

def get_country_currency(country_code):
    body = f"""
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <m:CountryCurrency xmlns:m="http://www.oorsprong.org/websamples.countryinfo">
          <m:sCountryISOCode>{country_code}</m:sCountryISOCode>
        </m:CountryCurrency>
      </soap:Body>
    </soap:Envelope>
    """
    result = send_soap_request("http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/CountryCurrency", body)
    dom = minidom.parseString(result)
    currency_name = dom.getElementsByTagName("m:sName")[0].firstChild.nodeValue
    currency_code = dom.getElementsByTagName("m:sISOCode")[0].firstChild.nodeValue
    print(f"Moeda de {country_code}: {currency_name} ({currency_code})")

def get_country_flag(country_code):
    body = f"""
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <m:CountryFlag xmlns:m="http://www.oorsprong.org/websamples.countryinfo">
          <m:sCountryISOCode>{country_code}</m:sCountryISOCode>
        </m:CountryFlag>
      </soap:Body>
    </soap:Envelope>
    """
    result = send_soap_request("http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/CountryFlag", body)
    dom = minidom.parseString(result)
    flag_url = dom.getElementsByTagName("m:CountryFlagResult")[0].firstChild.nodeValue
    print(f"Bandeira de {country_code}: {flag_url}")

while True:
    print("Digite um número:")
    print("1- Capital de um país")
    print("2- Moeda de um país")
    print("3- Bandeira de um país")
    print("0- Sair")
    choice = input("Digite uma opção: ")

    if choice == "0":
        break

    country_code = input("Digite o código do país (ex: BR, US): ").upper()

    if choice == "1":
        get_capital_city(country_code)
    elif choice == "2":
        get_country_currency(country_code)
    elif choice == "3":
        get_country_flag(country_code)
    else:
        print("Opção inválida.")
