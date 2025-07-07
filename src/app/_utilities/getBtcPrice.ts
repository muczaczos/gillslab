export const getBTCPriceEUR = async (): Promise<number | null> => {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur',
    )
    const data = await res.json()
    return data.bitcoin.eur
  } catch (e: unknown) {
    return null
  }
}
