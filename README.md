# 🐦 IBird - Consulta de Aves

O **IBird** é um projeto web desenvolvido para a disciplina de Desenvolvimento de Sistemas (Front-End). O objetivo principal é realizar o consumo assíncrono de uma API externa para buscar avistamentos recentes de aves em qualquer região do mundo.

---

## ✨ Funcionalidades

- **Busca por Região:** Permite pesquisar aves por códigos de países e estados (Ex: `BR` para Brasil, `BR-SP` para São Paulo, `US` para Estados Unidos).
- **Atalhos Rápidos (Sugestões):** Botões pré-configurados para buscas instantâneas nas regiões mais comuns.
- **Tratamento de Erros:** Feedbacks visuais na tela caso o usuário digite uma região inválida ou a API não retorne dados.
- **Design Glassmorphism:** Interface translúcida com desfoque de fundo (`backdrop-filter`).
- **Cards Dinâmicos:** Exibição detalhada contendo nome comum, nome científico, local exato, data formatada e quantidade de indivíduos avistados.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica.
- **CSS3:** Flexbox, CSS Grid e propriedades visuais avançadas.
- **JavaScript (Vanilla):** ES6+, manipulação de DOM, requisições assíncronas com `fetch` e `async/await`.
- **eBird API 2.0:** Fonte oficial dos dados ornitológicos ([Documentação da API](https://documenter.getpostman.com/view/664302/S1ENwy59)).
