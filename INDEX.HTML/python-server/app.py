from flask import Flask, request, jsonify
from flask_cors import CORS
from mercadopago_api import criar_preferencia

app = Flask(__name__)
CORS(app)

@app.route("/criar-preferencia", methods=["POST"])
def criar_preferencia_route():
    dados = request.get_json()
    itens = dados.get("itens", [])
    pagamento = criar_preferencia(itens)
    return jsonify({
        "init_point": pagamento["init_point"],
        "additional_info": pagamento
    })