export function extractErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.response?.data?.errors) {
    return Object.values(error.response.data.errors)[0]
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Erro inesperado.'
}
