import json
import aws_encryption_sdk
from aws_encryption_sdk import CommitmentPolicy
import os
import base64
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def lambda_handler(event, context):
    print('## EVENT')
    print(event)

    key_alias = os.environ.get('KEY_ALIAS')
    key_arn = os.environ.get('KEY_ARN')

    print('## CHECK 1')
    ciphertext = event['request']['code']
    ciphertext = base64.b64decode(ciphertext)
    print('## CIPHERTEXT')
    print(ciphertext)
    
    print('## CHECK 2')
    client = aws_encryption_sdk.EncryptionSDKClient(commitment_policy=CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT)
    # Create an AWS KMS master key provider
    print('## CHECK 3')
    kms_kwargs = dict(key_ids=[key_arn])
    print('## CHECK 4')
    print('## KMS_KWARGS')
    print(kms_kwargs)
    master_key_provider = aws_encryption_sdk.StrictAwsKmsMasterKeyProvider(**kms_kwargs)
    print('## CHECK 5')
    # ciphertext = base64.b64decode(ciphertext)
    # print('## CIPHERTEXT DECODED')
    # print(ciphertext)

    # Decrypt the ciphertext
    cycled_plaintext = client.decrypt(source=ciphertext, key_provider=master_key_provider)
    print('## CHECK 6')
    
    email = event['request']['userAttributes']['email']
    code = cycled_plaintext[0].decode()
    
    if event['triggerSource'] == 'CustomEmailSender_SignUp':
        # send the confirmation code to the email
        message = Mail(
            from_email='taketakellc@gmail.com',
            to_emails=email,
            subject='THIS BETTER FUCKING WORK',
            html_content=f"Your confirmation code is <strong>{code}</strong>"
        )

        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e.message)
    
    return event