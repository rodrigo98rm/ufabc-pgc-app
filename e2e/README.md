# 4

1. Clicar no botão de nova nota \newline
2. Clicar no botão de salvar nota \newline
[Resultado esperado 1] \newline
3. No alerta, clicar no botão "OK" \newline
4. Clicar no campo de texto do título \newline
5. Digitar "Nota teste 1" \newline
6. Clicar no botão de salvar nota \newline
[Resultado esperado 2] \newline
7. No alerta, clicar no botão "OK" \newline
[Resultado esperado 3] \newline



1. Um alerta com o texto "Preencha o título" deve estar visível. \newline
2. Um alerta com o texto "Preencha a descrição" deve estar visível. \newline
3. O texto "Erro" não deve estar visível, indicando que o alerta foi fechado com sucesso.


# 5 - Deve criar uma nota

1. Clicar no botão de nova nota \newline
2. Clicar no campo de texto do título \newline
3. Digitar "Nota teste 1" \newline
4. Clicar no campo de texto da descrição \newline
5. Digitar "Descricao teste 1" \footnote{O motivo para os caracteres "ç" e "ã" não serem utilizados será explorado na seção de Discussão} \newline
6. Clicar no botão de salvar nota \newline

1. O botão de nova nota deve estar visível, indicando que o app navegou de volta para a tela inicial, com a lista de notas. \newline
2. O título e a descrição da nota criada devem estar visíveis, indicando que a nota foi criada com sucesso e que a lista de notas foi atualizada para mostrá-la.


# 6 - Deve apagar uma nota

1. Criar uma nota (mesmos passos do Caso 5), com o título "Nota a ser apagada" e descrição "Descricao da nota a ser apagada" \newline
2. Na lista de notas, clicar no elemento com texto "Nota a ser apagada" \newline
3. Clicar no botão de apagar nota \newline
4. No alerta de confirmação, clicar no botão com texto "Apagar"


1. O botão de nova nota deve estar visível, indicando que o app navegou de volta para a tela inicial, com a lista de notas. \newline
2. O texto "Nota a ser apagada" não deve estar visível, indicando que a nota não está aparecendo na lista e, portanto, foi apagada com sucesso.

# 7 - Deve editar uma nota

1. Criar uma nota (mesmos passos do Caso 5), com o título "Nota a ser editada" e descrição "Descricao da nota a ser editada" \newline
2. Na lista de notas, clicar no elemento com texto "Nota a ser editada" \newline
3. Clicar no campo de texto do título \newline
4. Apagar todo o texto do campo \newline
5. Digitar "Nota editada" \newline
6. Clicar no campo de texto da descrição \newline
7. Apagar todo o texto do campo \newline
8. Digitar "Descricao da nota editada" \newline
9. Clicar no botão de salvar nota

1. Na lista de notas, o texto "Nota editada" deve estar visível \newline
2. O texto "Descricao da nota editada" deve estar visível

# 8 - Deve fixar uma nota
1. Criar uma nota (mesmos passos do Caso 5), com o título "Nota a ser fixada" e descrição "Descricao da nota a ser fixada" \newline
[Resultado esperado 1] \newline
2. Clicar no elemento com o texto "Nota a ser fixada" \newline
3. Clicar no botão switch para fixar a nota \newline
4. Clicar no botão de salvar nota
[Resultado esperado 2 e 3]


1. A nota deve estar visível na lista, procurando-a através de um identificador que inclui que inclui seu estado - se está fixada ou não \newline
2. O botão de nova nota deve estar visível, indicando que a navegação automática foi realizada de volta para a lista \newline
3. A nota deve estar visível na lista, procurando-a através do indicador de estado novamente. Neste caso, o indicador utilizado determina que a nota está fixada