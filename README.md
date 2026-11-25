# Portfólio — Vitor Hugo Correia

Site one-page bilíngue (PT/EN) com cena 3D (cristal sobre oceano de partículas), preloader, scroll suave e animações (GSAP + Lenis), cases de Power BI, desafios de SQL e área admin em `seusite/#admin`.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Estrutura do site |
| `assets/style.css` | Visual |
| `assets/app.js` | Conteúdo fixo (carreira, formação, números), efeitos e admin |
| `config.js` | Conexão com o Supabase |
| `supabase/schema.sql` | Tabelas, regras de segurança e pasta de arquivos |

Sem o `config.js` preenchido, o site roda em **modo demonstração**: mostra os exemplos e o admin salva só no seu navegador.

## 1. Configurar o Supabase (uma vez, cerca de 10 minutos)

1. Entre no Supabase e clique em **New project**. Nome sugerido: `portfolio`.
2. Abra **SQL Editor → New query**, cole todo o conteúdo de `supabase/schema.sql` e clique em **Run**.
   O e-mail que pode editar o site está na primeira função do arquivo. Troque-o antes de rodar se for usar outro login.
3. Vá em **Authentication → Users → Add user → Create new user**. Use o mesmo e-mail do passo 2, crie uma senha e marque **Auto Confirm User**.
4. Vá em **Authentication → Sign In / Providers** e **desligue "Allow new users to sign up"**. Assim ninguém mais consegue criar conta.
5. Vá em **Project Settings → API** e copie a **Project URL** e a chave **anon public**.
6. Cole as duas no `config.js`:

```js
window.PORTFOLIO_CONFIG = {
  supabaseUrl: "https://SEU-PROJETO.supabase.co",
  supabaseAnonKey: "eyJ...",
  bucket: "portfolio",
  contactEmail: "..."
};
```

A chave anon pode ficar pública. Quem protege os dados são as regras do `schema.sql`: qualquer pessoa pode ler, mas só o seu login pode editar.

## 2. Publicar no GitHub Pages

1. Crie um repositório público no GitHub. Se ele se chamar `vitor-sco.github.io`, o site fica em `https://vitor-sco.github.io`.
2. Envie todos os arquivos desta pasta, mantendo a estrutura.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
4. Em 1 ou 2 minutos o site estará no ar.

## 3. Usar o admin

1. Acesse `https://seu-site/#admin` e entre com o e-mail e a senha do passo 3.
2. Em **Projetos Power BI** e **Desafios SQL**, clique em **Carregar os 4 exemplos** para começar com os modelos, ou em **Adicionar** para criar do zero.
3. O que dá para fazer pelo admin:
   - **Perfil e selo:** headline, Sobre e "O que busco" em PT e EN, além de ligar ou desligar o selo "Disponível".
   - **Currículo:** enviar o PDF. O mais recente é sempre o que o botão "Baixar CV" entrega.
   - **Stack:** adicionar, remover e reordenar ferramentas.
   - **Certificados, Power BI e SQL:** cadastrar, editar, excluir, ligar e desligar a exibição e reordenar.
4. Projetos de Power BI aceitam capa, galeria de prints e o `.pbix`, que pode ser enviado (até 50 MB no plano gratuito) ou colocado como link do GitHub ou Drive.
5. Para o resultado de um desafio SQL, cole a tabela com a primeira linha sendo as colunas. Os valores podem ser separados por `;` ou colados direto do Excel.

## 4. Evitar que o Supabase pause

O plano gratuito do Supabase pausa projetos com pouca atividade em 7 dias. O arquivo `.github/workflows/keep-alive.yml` faz uma leitura no banco a cada 3 dias pelo GitHub Actions.

1. No repositório, vá em **Settings → Secrets and variables → Actions → New repository secret**.
2. Crie `SUPABASE_URL` (a Project URL) e `SUPABASE_ANON_KEY` (a chave anon public).
3. Em **Actions → Manter Supabase ativo → Run workflow**, rode uma vez para testar.

## O que é fixo no código

A carreira, a formação e os 4 números de impacto ficam em `assets/app.js` (constantes `CAREER`, `EDUCATION` e `STATS`), em PT e EN. Para mudar, edite o arquivo e faça um novo commit.
