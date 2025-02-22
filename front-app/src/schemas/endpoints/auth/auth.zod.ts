/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import {
  z as zod
} from 'zod'

/**
 * @summary Oauth:Google.Jwt.Authorize
 */
export const oauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGetQueryParams = zod.object({
  "scopes": zod.array(zod.string()).optional()
})

export const oauthGoogleJwtAuthorizeApiAuthGoogleAuthorizeGetResponse = zod.object({
  "authorization_url": zod.string()
})

/**
 * The response varies based on the authentication backend used.
 * @summary Oauth:Google.Jwt.Callback
 */
export const oauthGoogleJwtCallbackApiAuthGoogleCallbackGetQueryParams = zod.object({
  "code": zod.string().or(zod.null()).optional(),
  "code_verifier": zod.string().or(zod.null()).optional(),
  "state": zod.string().or(zod.null()).optional(),
  "error": zod.string().or(zod.null()).optional()
})

export const oauthGoogleJwtCallbackApiAuthGoogleCallbackGetResponse = zod.any()

/**
 * @summary Auth:Jwt.Login
 */
export const authJwtLoginApiAuthLoginPostResponse = zod.any()

/**
 * @summary Auth:Jwt.Logout
 */
export const authJwtLogoutApiAuthLogoutPostResponse = zod.any()

