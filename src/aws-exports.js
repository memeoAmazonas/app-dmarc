const config = {
  aws_project_region: __AWS_CONFIG__.AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: __AWS_CONFIG__.AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: __AWS_CONFIG__.AWS_COGNITO_REGION,
  aws_user_pools_id: __AWS_CONFIG__.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: __AWS_CONFIG__.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
}

export default config;
