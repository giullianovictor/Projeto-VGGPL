import mercadopago

sdk = mercadopago.SDK("TEST-992616698462121-062112-d164d94f83fde7804c98fcdf379e4c38-352347917")

request_options = mercadopago.config.RequestOptions()
request_options.custom_headers = {
    'x-idempotency-key': '<SOME_UNIQUE_VALUE>'
}

def criar_preferencia(itens):
    # itens é uma lista de dicionários com nome, quantidade e preco
    payment_data = {
        "items": [
            {
                "title": item["nome"],
                "quantity": item["quantidade"],
                "unit_price": float(item["preco"]),
                "currency_id": "BRL"
            } for item in itens
        ],
        "auto_return": "all"
    }

    result = sdk.preference().create(payment_data, request_options)
    payment = result["response"]
    return payment
