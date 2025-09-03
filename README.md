# Estante Virtual de Minerais e Rochas - IGC/UFMG

Este é um site estático para exibir uma coleção virtual de minerais e rochas do Instituto de Geociências da UFMG.

## Funcionalidades

- Busca por nome de mineral/rocha
- Ordenação (A-Z, Z-A)
- Filtros (Favoritos)
- Paginação
- Modal com detalhes
- Tema escuro/claro
- Menu mobile responsivo
- Animações CSS/JS
- Formulário de contato com envio de email

## Estrutura

- `index.html` - Página inicial
- `catalogo.html` - Catálogo completo
- `sobre.html` - Sobre o projeto
- `contato.html` - Formulário de contato
- `assets/css/styles.css` - Estilos personalizados
- `assets/js/data.js` - Dados dos minerais
- `assets/js/app.js` - Lógica da aplicação

## Configuração do EmailJS (para formulário de contato)

1. Acesse [EmailJS](https://www.emailjs.com/) e crie uma conta.
2. Crie um serviço de email (ex: Gmail).
3. Crie um template de email com variáveis: `{{from_name}}`, `{{from_email}}`, `{{message}}`.
4. No arquivo `contato.html`, substitua:
   - `YOUR_PUBLIC_KEY` pela sua chave pública
   - `YOUR_SERVICE_ID` pelo ID do serviço
   - `YOUR_TEMPLATE_ID` pelo ID do template

## Como executar

Abra qualquer arquivo HTML no navegador. O site é totalmente estático e não requer servidor.

## Exemplo de referência

Inspirado em: https://didatico.igc.usp.br/

## Licença

Projeto acadêmico - IGC/UFMG
