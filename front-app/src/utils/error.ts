export function translateError(detail: string): string {
  switch (detail) {
    case "Bad Request":
      return "Requisição inválida";
    case "Document not found":
      return "Documento não encontrado";
    case "Duplicate document":
      return "Documento duplicado";
    case "Invalid document":
      return "Documento inválido";
    case "Invalid base64 string":
      return "String base64 inválida";
    case "Invalid CSV file":
      return "Arquivo CSV inválido";
    case "Vector not found":
      return "Vetor não encontrado";
    case "Face not found":
      return "Rosto não encontrado";
    case "JWT expired":
      return "JWT expirado";
    case "JWT invalid signature":
      return "Assinatura JWT inválida";
    case "Rollcall token not found":
      return "Token de chamada não encontrado";
    case "Websocket not connected":
      return "Websocket não conectado";
    case "No attendances found for the given date":
      return "Nenhuma presença encontrada para a data fornecida";
    case "Invalid image":
      return "Imagem inválida";
    default:
      return "Erro desconhecido";
  }
}