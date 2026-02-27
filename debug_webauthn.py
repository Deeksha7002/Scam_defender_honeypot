from webauthn import generate_registration_options
from webauthn.helpers.structs import AuthenticatorSelectionCriteria, AuthenticatorAttachment

try:
    options = generate_registration_options(
        rp_id="localhost",
        rp_name="Test",
        user_id=b"123",
        user_name="test",
        authenticator_selection=AuthenticatorSelectionCriteria(
            authenticator_attachment=AuthenticatorAttachment.PLATFORM
        )
    )
    print(f"Type: {type(options)}")
    try:
        print(f"JSON: {options.json()}")
    except AttributeError:
        print("No .json() method")
        try:
            from webauthn.helpers import options_to_json
            print(f"options_to_json: {options_to_json(options)}")
        except ImportError:
             print("No options_to_json helper")
             try:
                 print(f"Pydantic v2: {options.model_dump_json()}")
             except AttributeError:
                 print("Not Pydantic v2 model_dump_json")

except Exception as e:
    print(f"Error: {e}")
