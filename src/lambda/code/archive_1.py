import json
import aws_encryption_sdk
from aws_encryption_sdk import CommitmentPolicy
import os

def lambda_handler(event, context):
    print('## EVENT')
    print(event)

    key_alias = os.environ.get('KEY_ALIAS')
    key_arn = os.environ.get('KEY_ARN')
    
    client = aws_encryption_sdk.EncryptionSDKClient(commitment_policy=CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT)
    # Create an AWS KMS master key provider
    kms_kwargs = dict(key_ids=[key_arn])
    master_key_provider = aws_encryption_sdk.StrictAwsKmsMasterKeyProvider(**kms_kwargs)

    # Encrypt the plaintext source data
    ciphertext, encryptor_header = client.encrypt(source=source_plaintext, key_provider=master_key_provider)

    # Decrypt the ciphertext
    cycled_plaintext, decrypted_header = client.decrypt(source=ciphertext, key_provider=master_key_provider)

    ciphertext = base64.b64decode(ciphertext)
    
    cycled_plaintext, decrypted_header = encrypt_client.decrypt(source=ciphertext, key_provider=master_key_provider)
    
    email = event['request']['userAttributes']['email']
    code = cycled_plaintext.decode('utf-8')
    
    print('## EMAIL')
    print(email)
    print('## CODE')
    print(code)
    
    return event