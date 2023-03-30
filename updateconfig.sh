#!/bin/bash

aws cognito-idp update-user-pool \
     --user-pool-id us-east-2_b9RJN7YgC \
     --auto-verified-attributes=email \
     --lambda-config "CustomEmailSender={LambdaVersion=V1_0,LambdaArn=arn:aws:lambda:us-east-2:107762387091:function:sam-app-HelloWorldFunction-Vpk8T8NLcF4W}, \
                      KMSKeyID=arn:aws:kms:us-east-2:107762387091:key/0dde1bc7-b590-455b-8149-b913badaf4da"
