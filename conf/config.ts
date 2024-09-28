const conf = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_ENDPOINT),
  appwriteProjectId: String(process.env.PROJECT_ID),
  appwriteApiKey: String(process.env.API_KEY),
}

export default conf;