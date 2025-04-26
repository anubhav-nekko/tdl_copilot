# bedrock_module.py
import json
import boto3  # type: ignore

def load_dict_from_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

# If you're running on EC2 with an attached IAM role,
# you may not need explicit access keys.
# Otherwise, you can still load from secrets.json:
secrets_file = "secrets.json"  # or wherever you store this
SECRETS = load_dict_from_json(secrets_file)

aws_access_key_id = SECRETS["aws_access_key_id"]
aws_secret_access_key = SECRETS["aws_secret_access_key"]
INFERENCE_PROFILE_CLAUDE = SECRETS["INFERENCE_PROFILE_CLAUDE"]
REGION = SECRETS["REGION"]

bedrock_runtime = boto3.client(
    "bedrock-runtime",
    region_name=REGION,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)

def call_claude_api(system_message: str, user_query: str) -> str:
    """
    Call the Claude model via Amazon Bedrock.
    """
    messages = system_message + user_query
    payload = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 4096,
        "messages": [
            {
                "role": "user",
                "content": messages
            }
        ]
    }

    try:
        response = bedrock_runtime.invoke_model(
            modelId=INFERENCE_PROFILE_CLAUDE,  # The ARN or model ID for your inference profile
            contentType="application/json",
            accept="application/json",
            body=json.dumps(payload)
        )
        response_body = json.loads(response["body"].read())
        # Adjust parsing if needed based on the model's actual return structure
        return response_body["content"][0]["text"]
    except Exception as e:
        return f"An error occurred: {str(e)}"
