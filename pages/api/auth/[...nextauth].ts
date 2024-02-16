import NextAuth from 'next-auth'

const tenantName = process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
const tenantGuid = process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME
const userFlow = process.env.USER_FLOW

const options = {
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signOut: '/auth/signout',
  },
  providers: [
    {
      id: 'azure-ad-b2c',
      name: 'Azure B2C',
      type: 'oauth',
      version: '2.0',
      debug: true,
      scope: 'offline_access openid',
      params: {
        grant_type: 'authorization_code',
      },
      accessTokenUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
      // requestTokenUrl: `https://login.microsoftonline.com/${process.env.AUTH_TENANT_GUID}/oauth2/v2.0/token`,
      authorizationUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?response_type=code+id_token&response_mode=form_post`,
      profileUrl: 'https://graph.microsoft.com/oidc/userinfo',
      profile: (profile) => {
        console.log('THE PROFILE', profile)

        return {
          id: profile.oid,
          fName: profile.given_name,
          lName: profile.surname,
          email: profile.emails.length ? profile.emails[0] : null,
        }
      },
      client_id: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      idToken: true,
      state: false,
    },
  ],
}

// @ts-ignore
export default (req, res) => NextAuth(req, res, options)
