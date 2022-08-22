#!/bin/bash

# LOAD PARAMETERS
source parameters

if [ $env = "dev" ]; then
	echo "Nothinbg to do for \"dev\" environment..."
	exit 2
fi

# DELETE OLD STACK IF EXIST
trap "echo; echo \"DELETING THE STACK\"; bash destroy.sh -e ${env} -p ${projectName} -g ${gitUsername}; exit" INT

# GET URL FROM S3 AND SET VARIABLES
aws s3 cp ${urls} ./urls.json
Url=$(cat urls.json | jq ".app.${env}" | tr -d '"')
ApiUrl=$(cat urls.json | jq ".administration.${env}" | tr -d '"')

# GET SECTRETS
secret=$(aws secretsmanager get-secret-value --secret-id ${AwsSecretName} --cli-connect-timeout 1)
FontAwesomeKey=$(echo ${secret} | jq .SecretString | jq -rc . | jq -rc '.FontAwesomeKey')
AcmArn=$(echo ${secret} | jq .SecretString | jq -rc . | jq -rc '.AcmArn')
HostedZoneId=$(echo ${secret} | jq .SecretString | jq -rc . | jq -rc '.HostedZoneId')

# UPLOAD SOURCE TO S3
aws s3 mb s3://${URI}-source/
sed "s/__FontAwesomeKey__/${FontAwesomeKey}/g" ${rootFolder}/.npmrc.template >${rootFolder}/.npmrc
aws s3 sync ${rootFolder} s3://${URI}-source/ --exclude "node_modules/*" --exclude "build/*" --exclude "deploy/*" --exclude ".github/*" --exclude ".git"

# SAM BUILD AND DEPLOY
Parameters="ParameterKey=URI,ParameterValue=${URI} ParameterKey=AcmArn,ParameterValue=${AcmArn} ParameterKey=Url,ParameterValue=${Url} ParameterKey=HostedZoneId,ParameterValue=${HostedZoneId}"

sam build -t ./template.yml --parameter-overrides ${Parameters}
sam deploy --template-file .aws-sam/build/template.yaml --stack-name ${URI} --disable-rollback --resolve-s3 --parameter-overrides ${Parameters} --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --tags projectName=${projectName} env=${env} creator=${gitUsername}

# BUILT REACT WITH CODEBUILD
DistributionId=$(aws cloudformation describe-stacks --stack-name $URI --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionID'].OutputValue" --output text)
aws codebuild start-build --project-name "${URI}-builder" --environment-variables-override name=ApiUrl,value=${ApiUrl},type=PLAINTEXT name=DistributionId,value=${DistributionId},type=PLAINTEXT name=DeployBucket,value=${Url},type=PLAINTEXT
