export const upgradeUrl = (uri: string) => {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  const regex = new RegExp(expression)
  const isURL = uri.match(regex)
  if (isURL) {
    if (!uri.startsWith('http')) {
      return `http://${uri}/`
    }
    return uri
  }
  return `https://duck.com/?q=${encodeURI(uri)}`
}