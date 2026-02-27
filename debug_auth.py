from webauthn import generate_authentication_options
from webauthn.helpers import options_to_json

try:
    options = generate_authentication_options(rp_id="localhost")
    print(f"Auth Options JSON: {options_to_json(options)}")
except Exception as e:
    print(f"Auth Error: {e}")
