from http.server import BaseHTTPRequestHandler
import json
import os
import google.generativeai as genai

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            body = json.loads(post_data)
            prompt = body.get('prompt')
            if not prompt:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'No se proporcionó un prompt'}).encode())
                return

            api_key = os.environ.get("GOOGLE_API_KEY")
            if not api_key:
                raise ValueError("La variable de entorno GOOGLE_API_KEY no está configurada.")
            
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-1.5-flash-latest')
            response = model.generate_content(prompt)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'text': response.text}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
        
        return