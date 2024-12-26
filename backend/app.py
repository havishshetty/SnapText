from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract
import google.generativeai as genai
from io import BytesIO
import pymongo
from bson import ObjectId

genai.configure(api_key="OMG LOL")

app = Flask(__name__)
CORS(app)

@app.route("/upload_image", methods=["POST"])
def upload_image():
    try:
        file = request.files["image"]
        img = Image.open(BytesIO(file.read()))

        extracted_text = pytesseract.image_to_string(img)

        model = genai.GenerativeModel("gemini-1.5-flash")
        gemini_response = model.generate_content("Please Tell me the answer for this text you either explain in detail or tell the answer please use plain text only dont add any bold text ie text enclosed by ** ** If its code give the code"+extracted_text)

        return jsonify({"success": True, "result": gemini_response.text})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
