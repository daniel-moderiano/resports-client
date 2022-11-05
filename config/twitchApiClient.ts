import { ClientCredentialsAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;

// Controls the authentication for API requests (i.e. app access token management)
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

// Use this client to actually make requests to the Twitch API.
const apiClient = new ApiClient({ authProvider });

export default apiClient;
