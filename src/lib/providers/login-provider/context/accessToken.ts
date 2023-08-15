export let GlobalAccessToken: string | null = null;
export const setGlobalAccessToken = (accessToken: string | null) => {
  GlobalAccessToken = accessToken;
};
