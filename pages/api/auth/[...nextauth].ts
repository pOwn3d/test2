import NextAuth, { AuthOptions } from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

export const authOptions: AuthOptions = {
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: "offline_access openid" } },
      checks: ["state"],
      // authorization: {
      //   params: {
      //     scope: "offline_access openid",
      //   },
      // },
      // checks: ["pkce"],
      // wellKnown: 'https://devacseo.b2clogin.com/devacseo.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_nextauthflow',
      // issuer: 'https://devacseo.b2clogin.com/2510c8e0-7ed4-4d74-8138-91f355882e7e/v2.0/',
      // authorization: { url:'https://devacseo.b2clogin.com/devacseo.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_nextauthflow', params: { scope: "openid" } },
      // token: 'https://devacseo.b2clogin.com/devacseo.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_signupsignin1',
      // jwks_endpoint: 'https://devacseo.b2clogin.com/devacseo.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_signupsignin1',
      // checks: ["pkce"],
      // client: {
      //   token_endpoint_auth_method: "none",
      // }
    }),
  ],
  debug: true,
  // cookies: {
  //   pkceCodeVerifier: {
  //     name: "next-auth.pkce.code_verifier",
  //     options: {
  //       sameSite: "none",
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  // },
  // pages: {
  //   // sign<In: '/auth/azure-login-check',
  // },
  // secret:process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   async jwt({ token, account, profile }) {
  //     return token
  //   },
  //   async session({ session, token, user }) {
  //
  //     return session
  //   }
  // },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },
  //   async session({ session, user, token }) {
  //     return session
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token
  //   }
  // }
};

export default NextAuth(authOptions)


