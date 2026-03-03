export type Question = { id: string; label: string; type: 'text' | 'textarea' | 'date' | 'select' };

export function generateCaseSummary(
  formTitle: string,
  clientName: string,
  questions: Question[],
  answers: Record<string, string>
) {
  const answeredItems = questions
    .map((question) => `- ${question.label}: ${answers[question.id] || 'Não informado'}`)
    .join('\n');

  return [
    `Resumo automático de triagem — ${formTitle}`,
    `Cliente: ${clientName}`,
    'Pontos informados:',
    answeredItems,
    'Próximo passo sugerido: revisar fatos, definir estratégia jurídica inicial e agendar consulta.'
  ].join('\n');
}
