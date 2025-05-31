export const createUrl = (
  endpoint: string,
  params: Record<string, string>
): string => {
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  return url;
};
