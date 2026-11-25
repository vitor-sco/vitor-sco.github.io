{
/* ================= utilidades ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "id" + Date.now() + Math.random().toString(16).slice(2));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const CFG = window.PORTFOLIO_CONFIG || {};
let lang = "pt";
try { const s = localStorage.getItem("pf-lang"); if (s) lang = s; } catch (e) {}
if (lang !== "en") lang = "pt";
const L = (o, k) => (o && (o[k + "_" + lang] || o[k + "_pt"] || o[k])) || "";

function toast(msg, err) {
  const t = $("#toast"); t.textContent = msg; t.classList.toggle("err", !!err); t.classList.add("show");
  clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 2600);
}
const ICON = {
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 15 6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/></svg>',
  del: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  cert: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="9" r="5"/><path d="m9 13-2 8 5-3 5 3-2-8"/></svg>',
  edu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/></svg>',
  dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14"/></svg>',
  in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z"/></svg>',
  gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
};

/* ================= textos fixos ================= */
const T = {
  pt: {
    nav_about: "Sobre", nav_career: "Carreira", nav_projects: "Projetos", nav_edu: "Formação", nav_contact: "Contato",
    cta_projects: "Ver projetos", cta_cv: "Baixar CV", cv_none: "CV em breve",
    career_t: "Da operação ao dado", career_p: "Comecei no centro de distribuição, passei por finanças e cheguei ao BI. Por isso entendo o processo por trás de cada número.",
    stack_t: "Ferramentas do dia a dia", stack_p: "Do tratamento da base ao painel que a operação usa, e as integrações entre eles.",
    bi_t: "Cases de dashboards", bi_p: "Cada projeto mostra o problema de negócio, como foi modelado, as medidas DAX principais e o que muda para quem decide. Clique para abrir o case.",
    sql_t: "Desafios de SQL", sql_p: "Perguntas reais de Compras, Finanças e Supply respondidas com SQL: a pergunta, a query e o resultado.",
    edu_t: "Formação e certificações", edu_p: "Economia para entender o negócio, cursos técnicos para entender a operação.",
    contact_t: "Vamos conversar sobre dados?", foot: "Feito com dados, café e Power BI.",
    sample_bi: "Projetos de exemplo com dados fictícios, que serão substituídos pelos cases finais.",
    sample_sql: "Desafios de exemplo com dados fictícios, que serão substituídos pelos desafios finais.",
    open_case: "Abrir case", problem: "Problema", solution: "Solução", result: "Resultado", dax: "Medidas DAX principais",
    dl_pbix: "Baixar o .pbix", question: "Pergunta de negócio", result_t: "Resultado", insight: "O que isso mostra", repo: "Ver no GitHub",
    copy: "Copiar", copied: "Query copiada", empty_bi: "Os cases de Power BI estão sendo finalizados e aparecem aqui em breve.",
    empty_sql: "Os desafios de SQL estão sendo finalizados e aparecem aqui em breve.", in_progress: "em andamento", close: "Fechar"
  },
  en: {
    nav_about: "About", nav_career: "Career", nav_projects: "Projects", nav_edu: "Education", nav_contact: "Contact",
    cta_projects: "See projects", cta_cv: "Download CV", cv_none: "CV coming soon",
    career_t: "From operations to data", career_p: "I started in a distribution center, moved into finance and then into BI, so I understand the process behind every number.",
    stack_t: "Everyday tools", stack_p: "From cleaning the data to the dashboard operations actually use, plus the integrations in between.",
    bi_t: "Dashboard case studies", bi_p: "Each project shows the business problem, how it was modeled, the key DAX measures and what changes for decision makers. Click to open a case.",
    sql_t: "SQL challenges", sql_p: "Real Procurement, Finance and Supply questions answered with SQL: the question, the query and the result.",
    edu_t: "Education and certifications", edu_p: "Economics to understand the business, technical courses to understand operations.",
    contact_t: "Let's talk about data?", foot: "Built with data, coffee and Power BI.",
    sample_bi: "Sample projects with fictional data, to be replaced by the final case studies.",
    sample_sql: "Sample challenges with fictional data, to be replaced by the final challenges.",
    open_case: "Open case", problem: "Problem", solution: "Solution", result: "Outcome", dax: "Key DAX measures",
    dl_pbix: "Download .pbix", question: "Business question", result_t: "Result", insight: "What it shows", repo: "View on GitHub",
    copy: "Copy", copied: "Query copied", empty_bi: "The Power BI case studies are being finalized and will appear here soon.",
    empty_sql: "The SQL challenges are being finalized and will appear here soon.", in_progress: "in progress", close: "Close"
  }
};
const t = k => T[lang][k] || T.pt[k] || k;

const STATS = [
  { n: 65, pre: "~60–", suf: "%", pt: "menos tempo na qualificação de fornecedores", en: "less time spent on supplier qualification" },
  { n: 100, pre: "", suf: " mil+", sufEn: "k+", pt: "fornecedores no buscador que desenvolvi em Power BI", en: "suppliers in the Power BI search tool I built" },
  { n: 10, pre: "~", suf: "", pt: "projetos usando esse buscador", en: "projects using that search tool" },
  { n: 50, pre: "R$ ", suf: " mi", sufEn: "M", pt: "por mês em POs e contas a pagar no Mercado Livre", en: "a month in POs and payables at Mercado Livre" }
];

const CAREER = [
  { when_pt: "jun 2025 – nov 2026", when_en: "Jun 2025 – Nov 2026", dur_pt: "1 ano e 6 meses", dur_en: "1 yr 6 mos", co: "Accenture Brasil",
    role_pt: "Procurement Analyst (Data & BI), Pleno", role_en: "Procurement Analyst (Data & BI), Mid-level",
    b_pt: ["Reduzi em <mark>~60–65%</mark> o tempo de qualificação de fornecedores com automações e integrações entre Excel, Power BI, Pipefy e GraphQL", "Desenvolvi um buscador de fornecedores em Power BI com <mark>mais de 100 mil registros</mark>, usado por ~10 projetos", "Criei e mantive dashboards financeiros e operacionais com DAX e Power Query, transformando necessidades de compras em soluções analíticas", "Levantei requisitos com as áreas de negócio e transformei problemas operacionais em indicadores e ferramentas de decisão"],
    b_en: ["Cut supplier qualification time by <mark>~60–65%</mark> with automations and integrations across Excel, Power BI, Pipefy and GraphQL", "Built a Power BI supplier search tool with <mark>100k+ records</mark>, used by ~10 projects", "Built and maintained financial and operational dashboards with DAX and Power Query, turning procurement needs into analytical solutions", "Gathered requirements with business teams and turned operational problems into KPIs and decision tools"] },
  { when_pt: "jul 2023 – jun 2025", when_en: "Jul 2023 – Jun 2025", dur_pt: "2 anos", dur_en: "2 yrs", co: "Accenture Brasil",
    role_pt: "Procurement Analyst (Data & BI), Júnior", role_en: "Procurement Analyst (Data & BI), Junior",
    b_pt: ["Desenvolvi e atualizei relatórios e dashboards em Power BI e Excel para acompanhar indicadores operacionais e financeiros de clientes", "Tratei e organizei bases de dados com Power Query, melhorando a qualidade das informações usadas nas análises", "Apoiei análises de fornecedores e identifiquei oportunidades de melhoria nos processos de suprimentos", "Participei da automação de rotinas e da padronização de controles"],
    b_en: ["Built and updated Power BI and Excel reports and dashboards to track clients' operational and financial KPIs", "Cleaned and organized datasets with Power Query, improving the quality of data used in analyses", "Supported supplier analyses and identified improvement opportunities in supply processes", "Took part in automating routines and standardizing controls"] },
  { when_pt: "abr 2023 – jul 2023", when_en: "Apr 2023 – Jul 2023", dur_pt: "4 meses", dur_en: "4 mos", co: "Mercado Livre",
    role_pt: "Assistente Financeiro Sr.", role_en: "Senior Finance Assistant",
    b_pt: ["Controlei pedidos de compra (POs) no Ariba e acompanhei despesas das operações de São Paulo, com movimentações acima de <mark>R$ 50 milhões por mês</mark>", "Gerenciei as 4 principais contas de despesa (3PL, agências, aluguéis e condomínios), incluindo rateio contábil e contas razão no SAP", "Acompanhei indicadores de prazo e entrega e garanti o fluxo da pré-fatura ao pagamento sem atrasos, usando Jira e planilhas de controle"],
    b_en: ["Managed purchase orders (POs) in Ariba and tracked São Paulo operations spend, with volumes above <mark>R$ 50M a month</mark>", "Owned the 4 main expense accounts (3PL, agencies, rent and building fees), including cost allocation and GL accounts in SAP", "Tracked deadline and delivery KPIs and ensured the pre-invoice to payment flow ran on time, using Jira and control sheets"] },
  { when_pt: "jul 2022 – abr 2023", when_en: "Jul 2022 – Apr 2023", dur_pt: "10 meses", dur_en: "10 mos", co: "Riachuelo",
    role_pt: "Assistente de Faturamento", role_en: "Billing Assistant",
    b_pt: ["Emiti notas fiscais no SAP para transferências entre lojas e CDs e para a saída de cargas do Centro de Distribuição de Guarulhos", "Acompanhei indicadores de <mark>OTIF</mark>, produtividade de faturamento e quebra de OLPN", "Propus melhorias para reduzir o lead time do faturamento"],
    b_en: ["Issued invoices in SAP for store and DC transfers and for outbound loads at the Guarulhos Distribution Center", "Tracked <mark>OTIF</mark>, billing productivity and OLPN break KPIs", "Proposed improvements to reduce billing lead time"] },
  { when_pt: "set 2021 – jul 2022", when_en: "Sep 2021 – Jul 2022", dur_pt: "11 meses", dur_en: "11 mos", co: "Riachuelo",
    role_pt: "Auxiliar Administrativo", role_en: "Administrative Assistant",
    b_pt: ["Controlei insumos, entrada e pagamento de notas fiscais de fornecedores, expedição e roteirização para filiais do CD de Guarulhos"],
    b_en: ["Handled supplies, supplier invoice intake and payment, shipping and routing to branches from the Guarulhos DC"] }
];

const EDUCATION = [
  { t_pt: "Bacharelado em Ciências Econômicas", t_en: "Bachelor's in Economics", s: "Universidade Anhembi Morumbi", y: "2022 – 2027", live: true },
  { t_pt: "Técnico em Recursos Humanos", t_en: "Technical degree in Human Resources", s: "ETEC – Escola Técnica Estadual de São Paulo", y: "2020" },
  { t_pt: "Técnico em Administração", t_en: "Technical degree in Business Administration", s: "ETEC – Escola Técnica Estadual de São Paulo", y: "2018 – 2019" }
];

const LINKS = { linkedin: "https://www.linkedin.com/in/vitorhc", github: "https://github.com/vitor-sco", email: CFG.contactEmail || "" };

const STACK_GROUPS = { bi: { pt: "BI e visualização", en: "BI and visualization" }, data: { pt: "Dados e código", en: "Data and code" }, sys: { pt: "Sistemas e ERPs", en: "Systems and ERPs" }, auto: { pt: "Automação e integração", en: "Automation and integration" } };

/* ================= conteúdo editável (padrões) ================= */
const DEFAULTS = {
  settings: {
    profile: {
      headline_pt: "Analista de BI e Dados | Power BI (DAX, Power Query) · SQL · Excel Avançado | Dashboards, KPIs e Automação para Compras, Finanças e Supply | BI Analyst · Data Analyst · MIS Analyst",
      headline_en: "BI and Data Analyst | Power BI (DAX, Power Query) · SQL · Advanced Excel | Dashboards, KPIs and Automation for Procurement, Finance and Supply | BI Analyst · Data Analyst · MIS Analyst",
      about_pt: "Transformo dados de operação em decisões mais rápidas e em horas de trabalho economizadas.\n\nSou Analista de BI e Dados com mais de 3 anos de experiência na Accenture, atendendo operações de compras de clientes multinacionais. Meu trabalho é pegar um processo manual ou um volume grande de dados e transformar isso em uma ferramenta que as pessoas realmente usam.\n\nAntes da Accenture, trabalhei com finanças no Mercado Livre (contas a pagar e POs em operações acima de R$ 50 milhões por mês) e com faturamento e logística na Riachuelo.\n\n> Essa trajetória me deu algo que considero meu diferencial: entendo o processo de negócio por trás do dado, do pedido de compra até o pagamento e o OTIF da entrega.",
      about_en: "I turn operational data into faster decisions and saved work hours.\n\nI'm a BI and Data Analyst with 3+ years at Accenture, supporting procurement operations for multinational clients. My job is to take a manual process or a large volume of data and turn it into a tool people actually use.\n\nBefore Accenture, I worked in finance at Mercado Livre (payables and POs in operations above R$ 50M a month) and in billing and logistics at Riachuelo.\n\n> That path gave me what I see as my edge: I understand the business process behind the data, from the purchase order to payment and delivery OTIF.",
      seeking_pt: "Estou buscando oportunidades como Analista de BI, Analista de Dados ou Analista MIS, principalmente nas áreas de Finanças, Compras e Supply Chain.",
      seeking_en: "I'm looking for BI Analyst, Data Analyst or MIS Analyst roles, mainly in Finance, Procurement and Supply Chain."
    },
    badge: { enabled: true, text_pt: "Disponível para BI, Dados e MIS", text_en: "Open to BI, Data and MIS roles" },
    cv: { url: "", name: "", updated_at: "" },
    stack: { items: [
      { name: "Power BI", group: "bi" }, { name: "DAX", group: "bi" }, { name: "Power Query", group: "bi" }, { name: "Excel Avançado", group: "bi" },
      { name: "SQL", group: "data" }, { name: "Python (Pandas, NumPy)", group: "data" },
      { name: "SAP", group: "sys" }, { name: "Ariba", group: "sys" }, { name: "Jira", group: "sys" },
      { name: "Pipefy", group: "auto" }, { name: "GraphQL", group: "auto" }
    ] }
  },
  certificates: [],
  bi: [
    { sample: true, title_pt: "Spend Analytics de Compras", title_en: "Procurement Spend Analytics", tags: "Power BI, DAX, Modelo estrela, Curva ABC",
      summary_pt: "Onde está o gasto por categoria, fornecedor e centro de custo, com curva ABC e fila de renegociação.", summary_en: "Where spend sits by category, supplier and cost center, with an ABC curve and a renegotiation queue.",
      problem_pt: "Compras negociava sem saber quais fornecedores concentravam o gasto nem como o spend evoluía contra o orçado.", problem_en: "Procurement negotiated without knowing which suppliers concentrated spend or how spend tracked against budget.",
      solution_pt: "Modelo estrela com fato de pedidos e dimensões de fornecedor, categoria, calendário e centro de custo. Curva ABC dinâmica e drill-through por fornecedor.", solution_en: "Star schema with a purchase-order fact and supplier, category, calendar and cost-center dimensions. Dynamic ABC curve and supplier drill-through.",
      result_pt: "Lista priorizada de fornecedores para renegociar e acompanhamento mensal do spend contra o orçado em uma única tela.", result_en: "A prioritized supplier list for renegotiation and monthly spend-vs-budget tracking on a single page.",
      dax: "Spend = SUM ( fPedidos[ValorTotal] )\n\nSpend YoY % =\nVAR Atual = [Spend]\nVAR Anterior = CALCULATE ( [Spend], SAMEPERIODLASTYEAR ( dCalendario[Data] ) )\nRETURN DIVIDE ( Atual - Anterior, Anterior )\n\n% Acumulado ABC =\nVAR Atual = [Spend]\nVAR Tab = ADDCOLUMNS ( ALLSELECTED ( dFornecedor[Fornecedor] ), \"@s\", [Spend] )\nRETURN DIVIDE ( SUMX ( FILTER ( Tab, [@s] >= Atual ), [@s] ), SUMX ( Tab, [@s] ) )" },
    { sample: true, title_pt: "OTIF e Lead Time de Entregas", title_en: "Delivery OTIF and Lead Time", tags: "Power BI, Power Query, Supply",
      summary_pt: "Pontualidade e completude das entregas por fornecedor, rota e mês, com alerta de quem puxa o OTIF para baixo.", summary_en: "On-time and in-full delivery by supplier, route and month, flagging who drags OTIF down.",
      problem_pt: "O OTIF era calculado à mão em planilhas e só ficava pronto dias depois do fechamento do mês.", problem_en: "OTIF was calculated by hand in spreadsheets and was only ready days after month-end.",
      solution_pt: "Power Query unindo pedidos e recebimentos, medida de OTIF por linha de pedido e matriz fornecedor × mês com formatação condicional.", solution_en: "Power Query joining orders and receipts, an order-line OTIF measure and a supplier × month matrix with conditional formatting.",
      result_pt: "OTIF atualizado diariamente e os 5 fornecedores com mais atraso visíveis na primeira tela.", result_en: "OTIF refreshed daily, with the 5 most delayed suppliers on the first page.",
      dax: "OTIF % =\nDIVIDE (\n    CALCULATE ( COUNTROWS ( fEntregas ),\n        fEntregas[NoPrazo] = TRUE (), fEntregas[Completa] = TRUE () ),\n    COUNTROWS ( fEntregas )\n)\n\nLead Time Médio (dias) =\nAVERAGEX ( fEntregas, fEntregas[DataEntrega] - fEntregas[DataPedido] )" },
    { sample: true, title_pt: "Contas a Pagar e Aging", title_en: "Accounts Payable and Aging", tags: "Power BI, DAX, Finanças",
      summary_pt: "Títulos em aberto por faixa de vencimento, DPO e previsão de saída de caixa das próximas semanas.", summary_en: "Open invoices by aging bucket, DPO and cash outflow forecast for the coming weeks.",
      problem_pt: "Finanças não tinha visão consolidada do que vencia na semana e pagava juros por atrasos evitáveis.", problem_en: "Finance had no consolidated view of what was due each week and paid interest on avoidable late payments.",
      solution_pt: "Faixas de aging calculadas no modelo, calendário de vencimentos e visão de caixa semanal por centro de custo.", solution_en: "Aging buckets calculated in the model, a due-date calendar and a weekly cash view by cost center.",
      result_pt: "Uma tela única para a reunião semanal de pagamentos, com os títulos críticos no topo.", result_en: "A single page for the weekly payment meeting, with critical invoices at the top.",
      dax: "Valor em Aberto = CALCULATE ( SUM ( fTitulos[Valor] ), fTitulos[Status] = \"ABERTO\" )\n\nDPO (dias) =\nVAR Compras = CALCULATE ( SUM ( fTitulos[Valor] ), DATESINPERIOD ( dCalendario[Data], MAX ( dCalendario[Data] ), -90, DAY ) )\nRETURN DIVIDE ( [Valor em Aberto], Compras ) * 90" },
    { sample: true, title_pt: "Scorecard de Fornecedores", title_en: "Supplier Scorecard", tags: "Power BI, DAX, Ranking",
      summary_pt: "Nota de cada fornecedor em prazo, qualidade, preço e risco, com ranking e histórico.", summary_en: "Each supplier scored on delivery, quality, price and risk, with ranking and history.",
      problem_pt: "A avaliação de fornecedores era subjetiva e mudava conforme quem avaliava.", problem_en: "Supplier evaluation was subjective and changed depending on who did it.",
      solution_pt: "Critérios com pesos configuráveis por parâmetro, nota de 0 a 100 por fornecedor e tooltip com o detalhe de cada critério.", solution_en: "Criteria with what-if parameter weights, a 0–100 score per supplier and tooltips with each criterion's detail.",
      result_pt: "Critério único e transparente para homologar, desenvolver ou substituir fornecedores.", result_en: "One transparent standard to approve, develop or replace suppliers.",
      dax: "Score Fornecedor =\n  [Nota Prazo]     * 'Peso Prazo'[Valor]\n+ [Nota Qualidade] * 'Peso Qualidade'[Valor]\n+ [Nota Preço]     * 'Peso Preço'[Valor]\n+ [Nota Risco]     * 'Peso Risco'[Valor]\n\nRanking = RANKX ( ALLSELECTED ( dFornecedor[Fornecedor] ), [Score Fornecedor] )" }
  ],
  sql: [
    { sample: true, level: "Intermediário", title_pt: "Curva ABC de fornecedores", title_en: "Supplier ABC curve", tags: "CTE, Window functions",
      question_pt: "Quais fornecedores concentram a maior parte do gasto de 2026?", question_en: "Which suppliers concentrate most of 2026 spend?",
      query: "-- Gasto por fornecedor e % acumulado\nWITH spend AS (\n  SELECT f.nome AS fornecedor,\n         SUM(p.valor_total) AS gasto\n  FROM pedidos p\n  JOIN fornecedores f ON f.id = p.fornecedor_id\n  WHERE p.data_pedido >= '2026-01-01'\n  GROUP BY f.nome\n)\nSELECT fornecedor,\n       gasto,\n       ROUND(100.0 * SUM(gasto) OVER (ORDER BY gasto DESC)\n             / SUM(gasto) OVER (), 1) AS pct_acumulado\nFROM spend\nORDER BY gasto DESC\nLIMIT 5;",
      result: { columns: ["fornecedor", "gasto", "pct_acumulado"], rows: [["Transportadora Alfa", "4.820.000", "18,4"], ["Embalagens Sul", "3.910.000", "33,3"], ["LogPrime", "3.120.000", "45,2"], ["Metalúrgica Vale", "2.480.000", "54,7"], ["TechParts", "1.970.000", "62,2"]] },
      insight_pt: "5 fornecedores somam 62% do gasto. São os primeiros da fila de negociação.", insight_en: "5 suppliers account for 62% of spend. They go first in the negotiation queue." },
    { sample: true, level: "Básico", title_pt: "OTIF mensal", title_en: "Monthly OTIF", tags: "CASE, Agregação",
      question_pt: "Como o OTIF das entregas evoluiu mês a mês?", question_en: "How did delivery OTIF evolve month over month?",
      query: "SELECT DATE_TRUNC('month', e.data_prevista) AS mes,\n       COUNT(*) AS entregas,\n       ROUND(100.0 * AVG(\n         CASE WHEN e.data_entrega <= e.data_prevista\n               AND e.qtd_entregue = e.qtd_pedida\n              THEN 1 ELSE 0 END), 1) AS otif_pct\nFROM entregas e\nWHERE e.data_prevista >= '2026-07-01'\nGROUP BY 1\nORDER BY 1;",
      result: { columns: ["mes", "entregas", "otif_pct"], rows: [["2026-07", "1.240", "91,2"], ["2026-08", "1.312", "88,7"], ["2026-09", "1.288", "86,9"], ["2026-10", "1.351", "92,4"]] },
      insight_pt: "O OTIF caiu em agosto e setembro e voltou em outubro. Vale cruzar com os fornecedores que entraram no período.", insight_en: "OTIF dropped in August and September and recovered in October. Worth crossing with suppliers onboarded in that period." },
    { sample: true, level: "Intermediário", title_pt: "Aging de contas a pagar", title_en: "Accounts payable aging", tags: "CASE, Datas",
      question_pt: "Quanto temos em aberto em cada faixa de atraso?", question_en: "How much is open in each overdue bucket?",
      query: "SELECT CASE\n         WHEN CURRENT_DATE - t.vencimento <= 0  THEN 'A vencer'\n         WHEN CURRENT_DATE - t.vencimento <= 30 THEN '1-30 dias'\n         WHEN CURRENT_DATE - t.vencimento <= 60 THEN '31-60 dias'\n         ELSE '60+ dias'\n       END AS faixa,\n       COUNT(*) AS titulos,\n       SUM(t.valor) AS valor_aberto\nFROM titulos_pagar t\nWHERE t.status = 'ABERTO'\nGROUP BY 1\nORDER BY MIN(CURRENT_DATE - t.vencimento);",
      result: { columns: ["faixa", "titulos", "valor_aberto"], rows: [["A vencer", "412", "6.340.000"], ["1-30 dias", "58", "820.000"], ["31-60 dias", "17", "195.000"], ["60+ dias", "6", "88.000"]] },
      insight_pt: "81 títulos vencidos somam R$ 1,1 mi. Os 6 com mais de 60 dias vão para a pauta da semana.", insight_en: "81 overdue invoices add up to R$ 1.1M. The 6 older than 60 days go on this week's agenda." },
    { sample: true, level: "Avançado", title_pt: "Variação do gasto por categoria", title_en: "Spend change by category", tags: "LAG, Window, Subquery",
      question_pt: "Quais categorias mais cresceram no último mês?", question_en: "Which categories grew the most last month?",
      query: "WITH mensal AS (\n  SELECT c.categoria,\n         DATE_TRUNC('month', p.data_pedido) AS mes,\n         SUM(p.valor_total) AS gasto\n  FROM pedidos p\n  JOIN categorias c ON c.id = p.categoria_id\n  GROUP BY 1, 2\n)\nSELECT * FROM (\n  SELECT categoria, mes, gasto,\n         ROUND(100.0 * (gasto - LAG(gasto) OVER w)\n               / NULLIF(LAG(gasto) OVER w, 0), 1) AS var_mom_pct\n  FROM mensal\n  WINDOW w AS (PARTITION BY categoria ORDER BY mes)\n) x\nWHERE mes = '2026-10-01'\nORDER BY var_mom_pct DESC;",
      result: { columns: ["categoria", "gasto", "var_mom_pct"], rows: [["Frete", "1.840.000", "22,5"], ["Embalagens", "960.000", "8,1"], ["MRO", "410.000", "-3,4"], ["TI", "720.000", "-11,0"]] },
      insight_pt: "Frete subiu 22,5% em um mês, puxado pelo volume de fim de ano. É a primeira categoria a revisar.", insight_en: "Freight rose 22.5% in a month, driven by year-end volume. It is the first category to review." }
  ]
};

/* ================= camada de dados ================= */
const DB = { mode: "demo", sb: null, session: null };
let STATE = null;
const TABLES = { certificates: "certificates", bi: "bi_projects", sql: "sql_challenges" };
const DEMO_KEY = "pf-demo-v1";

function demoSeed() {
  const s = clone(DEFAULTS);
  const wrap = list => list.map((d, i) => ({ id: uid(), enabled: true, sort: i, data: d }));
  return { settings: s.settings, certificates: wrap(s.certificates), bi: wrap(s.bi), sql: wrap(s.sql) };
}
function demoSave() { try { localStorage.setItem(DEMO_KEY, JSON.stringify(STATE)); } catch (e) { toast("O navegador não deixou salvar (armazenamento cheio ou bloqueado).", true); } }
function loadScript(src) { return new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }

async function initDB() {
  if (CFG.supabaseUrl && CFG.supabaseAnonKey) {
    try {
      if (!window.supabase) await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js");
      DB.sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey);
      DB.mode = "live";
      const { data } = await DB.sb.auth.getSession(); DB.session = data.session;
    } catch (e) { console.warn("Supabase indisponível, usando modo demonstração", e); DB.mode = "demo"; }
  }
}
async function loadAll() {
  if (DB.mode === "demo") {
    let s = null; try { s = JSON.parse(localStorage.getItem(DEMO_KEY)); } catch (e) {}
    STATE = s && s.settings ? s : demoSeed();
  } else {
    const sb = DB.sb;
    const q = tb => sb.from(tb).select("*").order("sort", { ascending: true });
    const [st, c, b, s] = await Promise.all([sb.from("settings").select("*"), q("certificates"), q("bi_projects"), q("sql_challenges")]);
    const err = st.error || c.error || b.error || s.error; if (err) throw err;
    const settings = clone(DEFAULTS.settings);
    (st.data || []).forEach(r => { settings[r.key] = Object.assign({}, settings[r.key] || {}, r.value); });
    STATE = { settings, certificates: c.data || [], bi: b.data || [], sql: s.data || [] };
  }
  ["bi", "sql", "certificates"].forEach(k => STATE[k].sort((a, b) => a.sort - b.sort));
}
async function saveSetting(key, value) {
  STATE.settings[key] = value;
  if (DB.mode === "demo") return demoSave();
  const { error } = await DB.sb.from("settings").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}
async function saveRow(list, row) {
  const arr = STATE[list]; const i = arr.findIndex(r => r.id === row.id);
  if (i >= 0) arr[i] = row; else arr.push(row);
  if (DB.mode === "demo") return demoSave();
  const { error } = await DB.sb.from(TABLES[list]).upsert({ id: row.id, enabled: row.enabled, sort: row.sort, data: row.data });
  if (error) throw error;
}
async function deleteRow(list, id) {
  STATE[list] = STATE[list].filter(r => r.id !== id);
  if (DB.mode === "demo") return demoSave();
  const { error } = await DB.sb.from(TABLES[list]).delete().eq("id", id);
  if (error) throw error;
}
async function uploadFile(file, folder) {
  if (DB.mode === "demo") {
    if (file.type.startsWith("image/") || file.type === "application/pdf") {
      if (file.size > 1.5e6) throw new Error("no modo demonstração o limite é 1,5 MB por arquivo");
      return await new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(file); });
    }
    return URL.createObjectURL(file);
  }
  const safe = file.name.normalize("NFD").replace(/[^\w.-]+/g, "-").toLowerCase();
  const path = `${folder}/${Date.now()}-${safe}`;
  const bucket = CFG.bucket || "portfolio";
  const { error } = await DB.sb.storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type || undefined });
  if (error) throw error;
  return DB.sb.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

/* ================= renderização pública ================= */
Object.assign(T.pt, { talk: "Fale comigo", menu: "Menu", nav_impact: "Impacto", hc_years: "3+ anos transformando dados em decisão", hc_text: "Power BI, SQL e automação para Compras, Finanças e Supply.", scroll: "Role para descobrir", hold: "Segure o clique para energizar", focus: "Foco em", focus_v: "Compras · Finanças · Supply Chain", tools: "Ferramentas", impact_t: "Resultados medidos, não promessas", view: "Ver case", more_gh: "Mais trabalhos no GitHub", st_label: ["Automação", "Buscador", "Adoção", "Volume"], edu_label: ["Graduação", "Técnico", "Técnico"], ongoing: "Em andamento" });
Object.assign(T.en, { talk: "Let's talk", menu: "Menu", nav_impact: "Impact", hc_years: "3+ years turning data into decisions", hc_text: "Power BI, SQL and automation for Procurement, Finance and Supply.", scroll: "Scroll to explore", hold: "Hold click to energize", focus: "Focus", focus_v: "Procurement · Finance · Supply Chain", tools: "Tools", impact_t: "Measured results, not promises", view: "View case", more_gh: "More work on GitHub", st_label: ["Automation", "Search tool", "Adoption", "Volume"], edu_label: ["Degree", "Technical", "Technical"], ongoing: "In progress" });
const CAREER_YR = [["2026", "Accenture Brasil"], ["2025", "Accenture Brasil"], ["2023", "Mercado Livre"], ["2023", "Riachuelo"], ["2022", "Riachuelo"]];

function shotSVG(seed, label) {
  let x = (seed * 9301 + 49297) % 233280; const rnd = () => (x = (x * 9301 + 49297) % 233280) / 233280;
  const bars = Array.from({ length: 12 }, () => 30 + rnd() * 130);
  const line = Array.from({ length: 14 }, () => 30 + rnd() * 80);
  const lp = line.map((v, i) => `${470 + i * 21.5},${380 - v}`).join(" ");
  const kpi = [0, 1, 2, 3].map(i => `<g transform="translate(${40 + i * 182},72)"><rect width="166" height="80" rx="4" fill="#0f1115" stroke="#1d2027"/><rect x="14" y="16" width="54" height="6" rx="3" fill="#2a2e37"/><text x="14" y="58" font-family="Inter Tight,sans-serif" font-size="28" font-weight="300" fill="${i === 0 ? "#cfe6ff" : "#e9e5e2"}">${(rnd() * 90 + 10).toFixed(1)}${i % 2 ? "%" : "k"}</text></g>`).join("");
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(label)}"><defs><linearGradient id="a${seed}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#cfe6ff" stop-opacity=".28"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></linearGradient><radialGradient id="r${seed}" cx="${30 + rnd() * 40}%" cy="0%" r="90%"><stop offset="0" stop-color="#1b2633"/><stop offset="1" stop-color="#08090b"/></radialGradient></defs><rect width="800" height="500" fill="url(#r${seed})"/><rect width="800" height="44" fill="#0b0c0f"/><circle cx="26" cy="22" r="5" fill="#cfe6ff"/><rect x="42" y="18" width="110" height="8" rx="4" fill="#2a2e37"/><rect x="640" y="15" width="60" height="14" rx="7" fill="#1d2027"/><rect x="708" y="15" width="60" height="14" rx="7" fill="#1d2027"/>${kpi}<rect x="40" y="170" width="402" height="290" rx="4" fill="#0c0e11" stroke="#1d2027"/>${bars.map((h, i) => `<rect x="${62 + i * 31.5}" y="${436 - h * 1.5}" width="18" height="${h * 1.5}" fill="${i === 3 ? "#cfe6ff" : "#e9e5e2"}" opacity="${i === 3 ? 1 : .16 + (i % 4) * .08}"/>`).join("")}<rect x="458" y="170" width="302" height="290" rx="4" fill="#0c0e11" stroke="#1d2027"/><polygon points="470,440 ${lp} ${470 + 13 * 21.5},440" fill="url(#a${seed})"/><polyline points="${lp}" fill="none" stroke="#cfe6ff" stroke-width="2"/>${line.map((v, i) => i % 4 === 0 ? `<circle cx="${470 + i * 21.5}" cy="${380 - v}" r="3.5" fill="#fff"/>` : "").join("")}</svg>`;
}
const enabled = list => (STATE[list] || []).filter(r => r.enabled);
const isNum = v => /^[-+−]?\s?(R\$\s?)?[\d.,]+\s?%?$/.test(String(v).trim());
const tagList = s => String(s || "").split(",").map(x => x.trim()).filter(Boolean);
const pad2 = n => String(n).padStart(2, "0");

function highlightSQL(src) {
  const KW = /^(select|from|where|join|left|right|inner|outer|full|on|group|by|order|having|limit|as|with|and|or|not|in|is|null|case|when|then|else|end|over|partition|window|desc|asc|distinct|union|all|insert|into|values|update|set|delete|create|table|view|between|like|exists|cross|offset|true|false)$/i;
  const FN = /^(sum|count|avg|min|max|round|coalesce|nullif|lag|lead|row_number|rank|dense_rank|ntile|date_trunc|extract|cast|concat|upper|lower|abs|current_date|now|first_value|last_value|datediff|dateadd|year|month)$/i;
  let out = "", last = 0, m; const re = /(--[^\n]*)|('(?:[^']|'')*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)/g;
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index)); last = re.lastIndex;
    if (m[1]) out += `<span class="c">${esc(m[1])}</span>`;
    else if (m[2]) out += `<span class="s">${esc(m[2])}</span>`;
    else if (m[3]) out += `<span class="n">${esc(m[3])}</span>`;
    else if (KW.test(m[4])) out += `<span class="k">${esc(m[4].toUpperCase())}</span>`;
    else if (FN.test(m[4])) out += `<span class="f">${esc(m[4].toUpperCase())}</span>`;
    else out += esc(m[4]);
  }
  return out + esc(src.slice(last));
}
function tableHTML(res) {
  if (!res || !res.columns || !res.columns.length) return "";
  const rows = res.rows || [];
  const numCol = res.columns.map((_, i) => rows.length > 0 && rows.every(r => isNum(r[i] ?? "")));
  return `<div class="scroll"><table class="tbl"><thead><tr>${res.columns.map((c, i) => `<th class="${numCol[i] ? "num" : ""}">${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r, k) => `<tr style="animation-delay:${(k * 0.07).toFixed(2)}s">${res.columns.map((_, i) => `<td class="${numCol[i] ? "num" : ""}">${esc(r[i] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function renderStatic() {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$(".lang button").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
  const lab = t("st_label");
  $("#stats").innerHTML = STATS.map((s, i) => { const suf = lang === "en" && s.sufEn ? s.sufEn : s.suf; return `<div class="stat"><span class="mono">(${pad2(i + 1)}) ${esc(lab[i])}</span><strong data-n="${s.n}" data-pre="${esc(s.pre)}" data-suf="${esc(suf)}">${esc(s.pre)}${s.n}${esc(suf)}</strong><p>${esc(s[lang])}</p></div>`; }).join("");
  $("#timeline").innerHTML = CAREER.map((j, i) => `<article class="job" data-y="${CAREER_YR[i][0]}" data-co="${esc(CAREER_YR[i][1])}"><div class="job-when mono"><b>${esc(j["when_" + lang])}</b>${esc(j["dur_" + lang])}</div><div><h3>${esc(j["role_" + lang])}</h3><div class="co mono">${esc(j.co)}</div><ul>${j["b_" + lang].map(b => `<li>${b}</li>`).join("")}</ul></div></article>`).join("");
  const el = t("edu_label");
  $("#eduList").innerHTML = EDUCATION.map((e, i) => `<div class="edu-card"><span class="mono">(${pad2(i + 1)}) ${esc(el[i])}${e.live ? " · " + esc(t("ongoing")) : ""}</span><h3>${esc(e["t_" + lang])}</h3><p>${esc(e.s)}<br>${esc(e.y)}</p></div>`).join("");
  $("#contactBtns").innerHTML = `<a href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn<span class="mono">/in/vitorhc ↗</span></a><a href="${LINKS.github}" target="_blank" rel="noopener">GitHub<span class="mono">vitor-sco ↗</span></a>` + (LINKS.email ? `<a href="${esc("mailto:" + LINKS.email)}">E-mail<span class="mono">${esc(t("talk"))} ↗</span></a>` : "");
  $("#menuSide").innerHTML = `<span>${esc(t("talk"))}</span>${LINKS.email ? `<a href="${esc("mailto:" + LINKS.email)}">${esc(LINKS.email)}</a>` : ""}<a href="${LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${LINKS.github}" target="_blank" rel="noopener">GitHub ↗</a>`;
  $("#orb").href = LINKS.email ? "mailto:" + LINKS.email : LINKS.linkedin;
  $("#mailTxt").textContent = LINKS.email;
  $("#year").textContent = new Date().getFullYear();
}

let heroShown = false;
function renderDynamic() {
  const S = STATE.settings, P = S.profile || {};
  $("#badgeSlot").innerHTML = S.badge && S.badge.enabled ? `<div class="badge"><b></b>${esc(L(S.badge, "text"))}</div>` : "";
  const parts = L(P, "headline").split("|").map(s => s.trim()).filter(Boolean);
  const words = (parts[0] || "").split(" "); const cut = Math.max(1, Math.ceil(words.length / 2.5));
  const htKey = lang + "|" + (parts[0] || ""), ht = $("#heroTitle");
  if (ht.dataset.k !== htKey) { ht.dataset.k = htKey; ht.innerHTML = `<span class="ln"><span${heroShown ? ' style="transform:none"' : ""}>${esc(words.slice(0, cut).join(" "))}</span></span><span class="ln"><span${heroShown ? ' style="transform:none"' : ""}>${esc(words.slice(cut).join(" "))}</span></span>`; }
  $("#heroTags").innerHTML = parts.slice(1, 3).flatMap(p => p.split("·")).map(s => s.trim()).filter(Boolean).slice(0, 5).map(s => `<li>${esc(s)}</li>`).join("");
  const cv = S.cv || {}, cvBtn = $("#cvBtn");
  cvBtn.href = cv.url || "#"; cvBtn.setAttribute("aria-disabled", cv.url ? "false" : "true");
  cvBtn.querySelector("span").textContent = cv.url ? t("cta_cv") : t("cv_none");
  const paras = L(P, "about").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  $("#aboutLead").textContent = paras[0] || "";
  $("#aboutBody").innerHTML = paras.slice(1).map(p => p.startsWith(">") ? `<p class="edge">${esc(p.replace(/^>\s?/, ""))}</p>` : `<p>${esc(p)}</p>`).join("");
  $("#seeking").textContent = L(P, "seeking");
  const items = (S.stack && S.stack.items) || [];
  $("#stackGrid").innerHTML = Object.keys(STACK_GROUPS).map((g, gi) => { const its = items.filter(i => (i.group || "bi") === g); return its.length ? `<div class="stack-col"><h3 data-n="(${pad2(gi + 1)})">${esc(STACK_GROUPS[g][lang])}</h3><ul>${its.map(i => `<li>${esc(i.name)}</li>`).join("")}</ul></div>` : ""; }).join("");
  const mqItems = items.map(i => `<span class="mq-item">${esc(i.name)}<i></i></span>`).join("");
  $$(".mq-track").forEach(tr => { tr.innerHTML = mqItems + mqItems + mqItems; });
  const bi = enabled("bi");
  $("#biGrid").innerHTML = bi.length ? bi.map((r, i) => { const d = r.data; return `<button type="button" class="case" data-case="${esc(r.id)}" data-i="${i}" aria-label="${esc(t("open_case") + ": " + L(d, "title"))}"><div class="case-shot"><span class="case-num mono">(${pad2(i + 1)})</span>${d.cover ? `<img src="${esc(d.cover)}" alt="" loading="lazy">` : shotSVG(i + 3, L(d, "title"))}</div><div class="case-meta"><h3>${esc(L(d, "title"))}</h3><span class="tags">${tagList(d.tags).slice(0, 3).map(esc).join(" / ")}</span><p>${esc(L(d, "summary"))}</p></div></button>`; }).join("") : `<div class="wrap" style="width:100%"><div class="empty">${esc(t("empty_bi"))}</div></div>`;
  $("#biSample").textContent = bi.some(r => r.data.sample) ? t("sample_bi") : "";
  renderSQL(false);
  const certs = enabled("certificates");
  $("#certList").innerHTML = certs.map(r => { const d = r.data; const inner = `<span class="cert-ic">${ICON.cert}</span><span><b>${esc(d.title)}</b><small>${esc([d.issuer, d.date].filter(Boolean).join(" · "))}</small></span>`; return d.url ? `<a class="cert" href="${esc(d.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="cert">${inner}</div>`; }).join("");
  bindCases(); bindHover();
  if (window.FX) FX.rebuild();
}

let sqlActive = 0, typing = null;
function typeCode(el, src) {
  cancelAnimationFrame(typing);
  if (reduced) { el.innerHTML = highlightSQL(src); return; }
  const t0 = performance.now(), dur = Math.min(1100, 250 + src.length * 2.2);
  const step = now => { const p = Math.min(1, (now - t0) / dur), k = Math.floor(src.length * p); el.innerHTML = highlightSQL(src.slice(0, k)) + (p < 1 ? '<span class="caret"></span>' : ""); if (p < 1) typing = requestAnimationFrame(step); };
  typing = requestAnimationFrame(step);
}
function renderSQL(animate) {
  const list = enabled("sql"), wrap = $("#sqlWrap");
  if (!list.length) { wrap.innerHTML = `<div class="empty" style="grid-column:1/-1;border:0">${esc(t("empty_sql"))}</div>`; $("#sqlSample").textContent = ""; return; }
  if (sqlActive >= list.length) sqlActive = 0;
  const d = list[sqlActive].data;
  wrap.innerHTML = `<div class="sql-list" role="tablist" aria-label="SQL">${list.map((r, i) => `<button type="button" role="tab" class="sql-tab ${i === sqlActive ? "on" : ""}" aria-selected="${i === sqlActive}" tabindex="${i === sqlActive ? 0 : -1}" data-sql="${i}"><small>(${pad2(i + 1)}) ${esc(r.data.level || "")}</small><b>${esc(L(r.data, "title"))}</b></button>`).join("")}</div>
  <div class="console" role="tabpanel"><div class="console-bar mono"><span class="dot"></span><span>query_${pad2(sqlActive + 1)}.sql</span><span>${esc(d.tags || "")}</span></div>
  <div class="console-q"><h3>${esc(L(d, "title"))}</h3><p><span class="mono">${esc(t("question"))}</span>${esc(L(d, "question"))}</p></div>
  <div style="position:relative"><pre class="code"><code id="sqlCode">${animate ? "" : highlightSQL(d.query || "")}</code></pre><button type="button" class="copy" id="copySql">${esc(t("copy"))}</button></div>
  <div class="result"><h4>${esc(t("result_t"))}</h4>${tableHTML(d.result)}</div>
  ${L(d, "insight") ? `<div class="insight"><h4>${esc(t("insight"))}</h4><p>${esc(L(d, "insight"))}</p></div>` : ""}
  ${d.repo_url ? `<div class="insight"><a class="btn" href="${esc(d.repo_url)}" target="_blank" rel="noopener">${esc(t("repo"))} ↗</a></div>` : ""}</div>`;
  if (animate) typeCode($("#sqlCode"), d.query || "");
  $("#sqlSample").textContent = list.some(r => r.data.sample) ? t("sample_sql") : "";
  $$("[data-sql]").forEach(b => b.addEventListener("click", () => { if (+b.dataset.sql === sqlActive) return; sqlActive = +b.dataset.sql; renderSQL(true); bindHover(); }));
  $(".sql-list").addEventListener("keydown", e => { const k = e.key; if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(k)) return; e.preventDefault(); const dir = (k === "ArrowDown" || k === "ArrowRight") ? 1 : -1; sqlActive = (sqlActive + dir + list.length) % list.length; renderSQL(true); bindHover(); const on = $(".sql-tab.on"); on.focus(); on.scrollIntoView({ block: "nearest", inline: "nearest" }); });
  $("#copySql").addEventListener("click", async () => { try { await navigator.clipboard.writeText(d.query || ""); toast(t("copied")); } catch (e) { toast("Selecione a query e copie manualmente.", true); } });
}

/* modal */
let lastFocus = null;
function openModal(html) { lastFocus = document.activeElement; const m = $("#modal"); $("#modalBox").innerHTML = `<button type="button" class="modal-close">${esc(t("close"))} ✕</button>` + html; m.classList.add("open"); document.body.style.overflow = "hidden"; if (window.FX) FX.stop(); $(".modal-close").focus(); $(".modal-close").addEventListener("click", closeModal); bindHover(); }
function closeModal() { $("#modal").classList.remove("open"); if (!$("#admin").classList.contains("open")) { document.body.style.overflow = ""; if (window.FX) FX.start(); } if (lastFocus) lastFocus.focus(); }
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape") { if ($("#modal").classList.contains("open")) closeModal(); else if (document.body.classList.contains("menu-open")) toggleMenu(false); } });

function bindCases() {
  $$("[data-case]").forEach(el => {
    el.addEventListener("click", () => {
      const r = STATE.bi.find(x => x.id === el.dataset.case); if (!r) return; const d = r.data, idx = +el.dataset.i;
      const gal = (d.gallery || []).filter(Boolean), dl = d.pbix || d.pbix_url;
      openModal(`<div class="m-hero">${d.cover ? `<img src="${esc(d.cover)}" alt="">` : shotSVG(idx + 3, L(d, "title"))}</div><div class="m-body"><div class="tags">(${pad2(idx + 1)}) ${tagList(d.tags).map(esc).join(" / ")}</div><h2>${esc(L(d, "title"))}</h2><p>${esc(L(d, "summary"))}</p>
      <div class="m-grid"><div><h4>${t("problem")}</h4><p>${esc(L(d, "problem"))}</p></div><div><h4>${t("solution")}</h4><p>${esc(L(d, "solution"))}</p></div><div><h4>${t("result")}</h4><p>${esc(L(d, "result"))}</p></div></div>
      ${gal.length ? `<div class="gallery">${gal.map(g => `<img src="${esc(g)}" alt="" loading="lazy">`).join("")}</div>` : ""}
      ${d.dax ? `<p class="m-dax">${t("dax")}</p><pre class="code" style="border:1px solid var(--line);border-radius:6px"><code>${esc(d.dax)}</code></pre>` : ""}
      ${dl ? `<div style="margin-top:28px"><a class="btn primary" href="${esc(dl)}" target="_blank" rel="noopener">${ICON.dl}${t("dl_pbix")}</a></div>` : ""}
      ${d.sample ? `<p class="sample mono">${t("sample_bi")}</p>` : ""}</div>`);
    });
  });
}

/* ================= menu, cursor, magnetismo ================= */
function toggleMenu(open) {
  const o = open ?? !document.body.classList.contains("menu-open");
  document.body.classList.toggle("menu-open", o); $("#menuBtn").setAttribute("aria-expanded", String(o));
  if (window.FX) o ? FX.stop() : FX.start();
}
function goTo(id) {
  const el = document.getElementById(id); if (!el) return;
  toggleMenu(false);
  if (window.FX && FX.lenis) FX.lenis.scrollTo(el, { offset: 0, duration: 1.6 }); else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
}
function nav() {
  const hdr = $("#hdr"), onScroll = () => hdr.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $$("[data-go]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); goTo(a.dataset.go); }));
  $("#menuBtn").addEventListener("click", () => toggleMenu());
  $$(".lang button").forEach(b => b.addEventListener("click", () => { if (lang === b.dataset.lang) return; lang = b.dataset.lang; try { localStorage.setItem("pf-lang", lang); } catch (e) {} renderStatic(); renderDynamic(); }));
}
let curEl = null, cx = -100, cy = -100;
function cursor() {
  if (reduced || !matchMedia("(pointer: fine)").matches) return;
  document.body.classList.add("has-cursor"); curEl = $(".cur");
  const qx = window.gsap ? gsap.quickTo(curEl, "x", { duration: .45, ease: "power3" }) : v => { curEl.style.left = v + "px"; };
  const qy = window.gsap ? gsap.quickTo(curEl, "y", { duration: .45, ease: "power3" }) : v => { curEl.style.top = v + "px"; };
  if (window.gsap) gsap.set(curEl, { x: -100, y: -100, xPercent: 0 });
  addEventListener("mousemove", e => { cx = e.clientX; cy = e.clientY; qx(cx); qy(cy); }, { passive: true });
  bindHover();
}
function bindHover() {
  if (!curEl) return;
  $$("a,button,input,textarea,select,label").forEach(el => { if (el._hov) return; el._hov = 1; const isCase = el.classList.contains("case"); el.addEventListener("mouseenter", () => { curEl.classList.add(isCase ? "view" : "link"); if (isCase) $(".cur-label").textContent = t("view"); }); el.addEventListener("mouseleave", () => curEl.classList.remove("view", "link")); });
}
function magnetic() {
  if (reduced || !matchMedia("(pointer: fine)").matches || !window.gsap) return;
  $$(".magnetic").forEach(el => {
    const xT = gsap.quickTo(el, "x", { duration: .6, ease: "elastic.out(1,.4)" }), yT = gsap.quickTo(el, "y", { duration: .6, ease: "elastic.out(1,.4)" });
    el.addEventListener("mousemove", e => { const b = el.getBoundingClientRect(); xT((e.clientX - b.left - b.width / 2) * .35); yT((e.clientY - b.top - b.height / 2) * .35); });
    el.addEventListener("mouseleave", () => { xT(0); yT(0); });
  });
}

/* ================= efeitos de scroll (GSAP + Lenis) ================= */
const FX = window.FX = { lenis: null, ctx: null, heroP: 0, vel: 0, ready: false,
  stop() { if (this.lenis) this.lenis.stop(); }, start() { if (this.lenis) this.lenis.start(); },
  init() {
    if (!window.gsap || !window.ScrollTrigger || reduced) { document.documentElement.classList.add("no-anim"); return; }
    gsap.registerPlugin(ScrollTrigger);
    if (window.Lenis) {
      this.lenis = new Lenis({ lerp: .085, wheelMultiplier: 1, smoothWheel: true });
      this.lenis.on("scroll", e => { ScrollTrigger.update(); this.vel = e.velocity || 0; });
      gsap.ticker.add(time => this.lenis.raf(time * 1000)); gsap.ticker.lagSmoothing(0);
    }
    this.marquee(); this.ready = true; this.rebuild();
    let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => this.rebuild(), 250); });
  },
  splitWords(el, cls) {
    const txt = el.textContent; el.setAttribute("aria-label", txt);
    el.innerHTML = txt.split(/(\s+)/).map(w => /^\s+$/.test(w) ? w : (cls === "w" ? `<span class="w" aria-hidden="true"><span>${esc(w)}</span></span>` : `<span class="sw" aria-hidden="true">${esc(w)}</span>`)).join("");
  },
  rebuild() {
    if (!this.ready) return;
    if (this.ctx) this.ctx.revert();
    this.ctx = gsap.context(() => {
      // títulos que sobem palavra por palavra
      $$(".split").forEach(el => { this.splitWords(el, "w"); gsap.from(el.querySelectorAll(".w>span"), { yPercent: 115, rotate: 4, duration: 1.2, ease: "expo.out", stagger: .05, scrollTrigger: { trigger: el, start: "top 88%" } }); });
      // texto do Sobre que acende com o scroll
      const lead = $("#aboutLead"); this.splitWords(lead, "sw");
      gsap.to(lead.querySelectorAll(".sw"), { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: lead, start: "top 78%", end: "bottom 42%", scrub: true } });
      gsap.from("#aboutBody > *, .about-side", { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", stagger: .08, scrollTrigger: { trigger: ".about-grid", start: "top 80%" } });
      // listras
      $$(".stripes").forEach(s => gsap.to(s.querySelectorAll("i"), { scaleY: 1, ease: "none", stagger: .08, scrollTrigger: { trigger: s, start: "top 95%", end: "bottom 45%", scrub: true } }));
      // contadores
      $$("#stats strong").forEach(el => { const o = { v: 0 }, n = +el.dataset.n; gsap.to(o, { v: n, duration: 2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" }, onUpdate: () => { el.textContent = el.dataset.pre + Math.round(o.v) + el.dataset.suf; } }); });
      gsap.from(".stat, .stack-col", { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", stagger: .07, scrollTrigger: { trigger: ".stats", start: "top 85%" } });
      gsap.from(".edu-card, .cert", { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", stagger: .07, scrollTrigger: { trigger: "#eduList", start: "top 85%" } });
      // carreira: ano fixo que muda
      $$(".job").forEach(job => {
        gsap.from(job, { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: job, start: "top 88%" } });
        ScrollTrigger.create({ trigger: job, start: "top 55%", end: "bottom 55%", onToggle: s => { if (s.isActive) this.setYear(job.dataset.y, job.dataset.co); } });
      });
      // grade 2x2 dos cases
      $$(".case").forEach((c, i) => gsap.from(c, { y: 80, opacity: 0, duration: 1.3, ease: "expo.out", delay: (i % 2) * .12, scrollTrigger: { trigger: c, start: "top 90%" } }));
      $$(".case-shot>img,.case-shot>svg").forEach(img => gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      $$(".case-shot").forEach(s => gsap.fromTo(s, { clipPath: "inset(14% 10% 14% 10% round 6px)" }, { clipPath: "inset(0% 0% 0% 0% round 6px)", ease: "none", scrollTrigger: { trigger: s, start: "top bottom", end: "top 45%", scrub: true } }));
      // SQL digitando ao entrar
      ScrollTrigger.create({ trigger: "#sqlWrap", start: "top 70%", once: true, onEnter: () => { const c = $("#sqlCode"), l = enabled("sql")[sqlActive]; if (c && l) typeCode(c, l.data.query || ""); } });
      gsap.from("#sqlWrap", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: "#sqlWrap", start: "top 85%" } });
      // hero: título sobe e cena mergulha
      ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "bottom top", scrub: true, onUpdate: s => { this.heroP = s.progress; } });
      gsap.to(".hero-top", { yPercent: -60, opacity: 0, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "60% top", scrub: true } });
      gsap.to(".hero-bottom, .hero-scroll", { y: -80, opacity: 0, ease: "none", scrollTrigger: { trigger: "#hero", start: "20% top", end: "70% top", scrub: true } });
      // nome gigante
      gsap.from(".giant span", { yPercent: 100, ease: "none", stagger: .1, scrollTrigger: { trigger: ".giant", start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.from(".orb", { scale: .4, rotate: -30, opacity: 0, duration: 1.4, ease: "elastic.out(1,.6)", scrollTrigger: { trigger: ".contact-row", start: "top 85%" } });
      gsap.from(".contact-links a", { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: .08, scrollTrigger: { trigger: ".contact-links", start: "top 90%" } });
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  },
  setYear(y, co) {
    const el = $("#yr"); if (el.dataset.v === y) return; el.dataset.v = y; $("#yrCo").textContent = co;
    const from = el.textContent, chars = "0123456789"; let f = 0;
    const tick = () => { f++; el.textContent = y.split("").map((c, i) => f > 4 + i * 3 ? c : chars[Math.floor(Math.random() * 10)]).join(""); if (f < 4 + y.length * 3) requestAnimationFrame(tick); };
    if (from !== y) tick();
  },
  marquee() {
    const tracks = $$(".mq-track"); const pos = tracks.map(() => 0); let dir = 1;
    gsap.ticker.add(() => {
      const v = this.vel; if (v > .2) dir = 1; else if (v < -.2) dir = -1;
      const boost = 1 + Math.min(6, Math.abs(v) * .35);
      tracks.forEach((tr, i) => {
        const w = tr.scrollWidth / 3; if (!w) return;
        pos[i] -= (i ? -1 : 1) * dir * .9 * boost;
        if (pos[i] <= -w) pos[i] += w; if (pos[i] > 0) pos[i] -= w;
        tr.style.transform = `translate3d(${pos[i]}px,0,0) skewX(${Math.max(-8, Math.min(8, -v * .25))}deg)`;
      });
    });
  },
  intro() {
    const ld = $("#loader"), num = $("#ldNum"), bar = $("#ldBar"), words = $$(".ld-words span");
    const finish = () => { ld.remove(); document.body.classList.remove("is-loading"); heroShown = true; if (window.Scene) Scene.introDone = true; };
    if (!window.gsap || reduced) { $$(".hero-title .ln>span").forEach(s => s.style.transform = "none"); finish(); return; }
    this.stop();
    const o = { v: 0 }, tl = gsap.timeline();
    tl.to(o, { v: 100, duration: 2.4, ease: "power2.inOut", onUpdate: () => { const v = Math.round(o.v); num.textContent = String(v).padStart(3, "0"); bar.style.width = v + "%"; words.forEach((w, i) => w.classList.toggle("on", v >= i * 33)); } })
      .to(".ld-frame, .ld-words, .ld-num", { opacity: 0, y: -20, duration: .5, ease: "power2.in" })
      .to(ld, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "-=.1")
      .add(() => { if (window.Scene) Scene.intro(); }, "-=.9")
      .fromTo(".hero-title .ln>span", { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.4, ease: "expo.out", stagger: .1 }, "-=.5")
      .from(".hero-tags li, .hero-card > *, .hdr > *, .hero-scroll", { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: .05 }, "-=1.1")
      .add(() => { finish(); this.start(); ScrollTrigger.refresh(); });
  }
};

/* ================= cena 3D: cristal sobre oceano de pontos ================= */
const Scene = window.Scene = { introDone: false, intro() {} };
function scene() {
  const canvas = $("#scene"); if (!window.THREE || !canvas) return;
  let renderer; try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" }); } catch (e) { return; }
  const small = innerWidth < 760;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.25 : 1.75));
  renderer.setClearColor(0x060709, 1); renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  const sc = new THREE.Scene(); sc.fog = new THREE.FogExp2(0x060709, .07);
  const cam = new THREE.PerspectiveCamera(42, 1, .1, 100); cam.position.set(0, 1.25, 7.5);
  const ICE = new THREE.Color(0xcfe6ff);

  // oceano de pontos
  const seg = small ? 140 : 230, SIZE = 44;
  const pg = new THREE.PlaneGeometry(SIZE, SIZE, seg, seg); pg.rotateX(-Math.PI / 2);
  const U = { uT: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uGlow: { value: 1 }, uC: { value: new THREE.Vector3(0, 0, 0) } };
  const ocean = new THREE.Points(pg, new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `uniform float uT,uPx,uGlow;uniform vec3 uC;varying float vA;varying float vL;
      void main(){vec3 p=position;float t=uT*.55;
        float h=sin(p.x*.35+t)*.28+sin(p.z*.42-t*1.1)*.24+sin((p.x+p.z)*.9+t*1.6)*.08+sin(p.x*1.7-p.z*1.3+t*2.1)*.035;
        p.y=h-.6;float d=distance(p.xz,uC.xz);vL=(exp(-d*.55)*1.6+exp(-abs(p.x-uC.x)*1.4)*smoothstep(-14.,2.,p.z)*.35)*uGlow;
        vec4 mv=modelViewMatrix*vec4(p,1.);float z=-mv.z;vA=smoothstep(26.,4.,z)*(.35+h*.9);
        gl_PointSize=(1.1+vL*1.6)*uPx*(9./z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vA;varying float vL;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;
      vec3 c=mix(vec3(.38,.45,.56),vec3(.85,.93,1.),clamp(vL,0.,1.));gl_FragColor=vec4(c,smoothstep(.5,0.,r)*clamp(vA+vL*.6,0.,1.));}` }));
  sc.add(ocean);

  // cristal
  const crystal = new THREE.Group(); sc.add(crystal);
  const base = new THREE.IcosahedronGeometry(1, 1);
  const pa = base.attributes.position, map = new Map();
  const key = (x, y, z) => `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
  for (let i = 0; i < pa.count; i++) {
    const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i), k = key(x, y, z);
    if (!map.has(k)) { const s = 1 + (Math.sin(x * 12.9 + y * 78.2 + z * 37.7) * 43758.5 % 1) * .22; map.set(k, s); }
    const s = map.get(k); pa.setXYZ(i, x * s * .82, y * s * 1.45, z * s * .82);
  }
  base.computeVertexNormals();
  const body = new THREE.Mesh(base, new THREE.MeshPhysicalMaterial({ color: 0x0e141c, metalness: .35, roughness: .22, clearcoat: 1, clearcoatRoughness: .15, flatShading: true, emissive: 0x0a1622, emissiveIntensity: .6 }));
  crystal.add(body);
  const edgeMat = new THREE.LineBasicMaterial({ color: ICE, transparent: true, opacity: .9, toneMapped: false });
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(base, 1), edgeMat); edges.scale.setScalar(1.002); crystal.add(edges);
  // brilho interno
  const gc = document.createElement("canvas"); gc.width = gc.height = 128; const g2 = gc.getContext("2d"); const rg = g2.createRadialGradient(64, 64, 0, 64, 64, 64);
  rg.addColorStop(0, "rgba(207,230,255,.9)"); rg.addColorStop(.25, "rgba(143,196,255,.35)"); rg.addColorStop(1, "rgba(143,196,255,0)"); g2.fillStyle = rg; g2.fillRect(0, 0, 128, 128);
  const glowMat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gc), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: .55 });
  const glow = new THREE.Sprite(glowMat); glow.scale.set(5.5, 5.5, 1); crystal.add(glow);
  // estilhaços
  const shards = new THREE.Group(); crystal.add(shards);
  const shGeo = new THREE.TetrahedronGeometry(.045, 0);
  for (let i = 0; i < (small ? 14 : 26); i++) { const m = new THREE.Mesh(shGeo, new THREE.MeshBasicMaterial({ color: ICE, toneMapped: false, transparent: true, opacity: .8 })); const a = Math.random() * Math.PI * 2, r = 1.7 + Math.random() * 1.4; m.userData = { a, r, y: (Math.random() - .5) * 2.6, s: .15 + Math.random() * .35 }; m.scale.setScalar(.5 + Math.random() * 1.2); shards.add(m); }
  // luzes
  sc.add(new THREE.AmbientLight(0x9fb4cc, .25));
  const key1 = new THREE.DirectionalLight(0xcfe6ff, 1.6); key1.position.set(3, 5, 4); sc.add(key1);
  const rim = new THREE.DirectionalLight(0x8fc4ff, 1.2); rim.position.set(-4, 2, -3); sc.add(rim);
  const pl = new THREE.PointLight(0xcfe6ff, 2.2, 8); crystal.add(pl);

  // pós-processamento
  let composer = null, bloom = null;
  if (THREE.EffectComposer && THREE.UnrealBloomPass) {
    composer = new THREE.EffectComposer(renderer); composer.addPass(new THREE.RenderPass(sc, cam));
    bloom = new THREE.UnrealBloomPass(new THREE.Vector2(512, 512), small ? .9 : 1.15, .7, .12); composer.addPass(bloom);
  }

  let W = 1, H = 1, mx = 0, my = 0, sx = 0, sy = 0, hold = 0, holdT = 0, visible = true, introK = Scene.introDone ? 1 : 0;
  const place = () => { const w = innerWidth; crystal.userData.x = w < 760 ? 0 : w < 1100 ? 1.5 : 2.35; crystal.userData.y = w < 760 ? 2.55 : 1.55; crystal.userData.s = w < 760 ? .55 : 1; };
  const size = () => { W = canvas.clientWidth; H = canvas.clientHeight; renderer.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); if (composer) { composer.setSize(W, H); } place(); };
  size(); addEventListener("resize", size);
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth * 2 - 1; my = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  const hero = $("#hero");
  hero.addEventListener("pointerdown", e => { if (e.target.closest("a,button")) return; hold = 1; });
  addEventListener("pointerup", () => { hold = 0; });
  if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(hero);
  Scene.intro = () => { if (window.gsap) { const o = { k: 0 }; gsap.to(o, { k: 1, duration: 3.2, ease: "expo.out", onUpdate: () => { introK = o.k; } }); } else introK = 1; };
  if (Scene.introDone) introK = 1;
  const clock = new THREE.Clock(); let tAcc = 0;
  const frame = () => {
    requestAnimationFrame(frame); const dt = Math.min(clock.getDelta(), .05); if (!visible) return;
    tAcc += dt; U.uT.value = tAcc;
    holdT += ((hold ? 1 : 0) - holdT) * (hold ? .04 : .08);
    sx += (mx - sx) * .05; sy += (my - sy) * .05;
    const p = FX.heroP || 0, k = introK;
    const cxp = crystal.userData.x, cyp = crystal.userData.y;
    crystal.position.set(cxp + sx * .25, cyp + Math.sin(tAcc * .8) * .12 + p * 1.6 + (1 - k) * -2.6, 0);
    crystal.scale.setScalar(crystal.userData.s * (.6 + .4 * k) * (1 + holdT * .12));
    body.rotation.y += dt * (.25 + holdT * 2.2); body.rotation.x = Math.sin(tAcc * .3) * .15 + sy * .25; edges.rotation.copy(body.rotation);
    shards.children.forEach(m => { const u = m.userData; const a = u.a + tAcc * u.s * (1 + holdT * 4); const r = u.r * (1 + holdT * .9); m.position.set(Math.cos(a) * r, u.y + Math.sin(tAcc * u.s * 2) * .2, Math.sin(a) * r); m.rotation.x += dt * u.s * 3; m.rotation.y += dt * u.s * 2; });
    const pulse = .85 + Math.sin(tAcc * 2.2) * .15;
    edgeMat.opacity = (.35 + .35 * pulse) * k + holdT * .4; glowMat.opacity = (.4 + .2 * pulse + holdT * .6) * k; pl.intensity = (1.6 + pulse + holdT * 4) * k;
    U.uC.value.copy(crystal.position); U.uGlow.value = (.7 + holdT * 1.4) * k + .15;
    if (bloom) bloom.strength = (small ? .9 : 1.15) + holdT * 1.2;
    cam.position.set(sx * .45, 1.25 - p * 1.1 + (1 - k) * 2.5, 7.5 - p * 1.5); cam.lookAt(crystal.userData.x * .35, 1.05 - p * .4, 0);
    sc.fog.density = .07 + p * .06;
    composer ? composer.render() : renderer.render(sc, cam);
  };
  frame();
}

/* ================= ADMIN ================= */
const FIELDS = {
  certificates: [{ k: "title", t: "text", l: "Nome do certificado", req: 1 }, { k: "issuer", t: "text", l: "Instituição" }, { k: "date", t: "text", l: "Data", ph: "nov/2026" }, { k: "url", t: "url", l: "Link da credencial" }],
  bi: [{ k: "title", t: "pair", l: "Título", req: 1 }, { k: "summary", t: "pairArea", l: "Resumo (aparece no card)" }, { k: "tags", t: "text", l: "Tags (separadas por vírgula)", ph: "Power BI, DAX, Finanças" },
    { k: "problem", t: "pairArea", l: "Problema" }, { k: "solution", t: "pairArea", l: "Solução" }, { k: "result", t: "pairArea", l: "Resultado" },
    { k: "dax", t: "code", l: "Medidas DAX principais" }, { k: "cover", t: "image", l: "Imagem de capa (print do dashboard)" }, { k: "gallery", t: "images", l: "Mais prints (galeria)" },
    { k: "pbix", t: "file", l: "Arquivo .pbix", accept: ".pbix" }, { k: "pbix_url", t: "url", l: "Ou link externo do .pbix (GitHub, Drive)" }],
  sql: [{ k: "title", t: "pair", l: "Título", req: 1 }, { k: "level", t: "select", l: "Nível", opts: ["Básico", "Intermediário", "Avançado"] }, { k: "tags", t: "text", l: "Conceitos usados", ph: "CTE, Window functions" },
    { k: "question", t: "pairArea", l: "Pergunta de negócio" }, { k: "query", t: "code", l: "Query SQL" }, { k: "result", t: "csv", l: "Resultado (primeira linha com as colunas, valores separados por ;)" },
    { k: "insight", t: "pairArea", l: "O que o resultado mostra" }, { k: "repo_url", t: "url", l: "Link do GitHub" }]
};
const LIST_NAMES = { certificates: ["Certificados", "certificado"], bi: ["Projetos Power BI", "projeto"], sql: ["Desafios SQL", "desafio"] };
let admTab = "profile", editing = null, draft = null;

function adminOpen() {
  FX.stop(); document.body.classList.add("admin-on"); $("#admin").classList.add("open");
  if (DB.mode === "live" && !DB.session) return renderLogin();
  renderAdmin();
}
function adminClose() { document.body.classList.remove("admin-on"); $("#admin").classList.remove("open"); FX.start(); renderDynamic(); }
function leaveAdmin(e) { if (e) e.preventDefault(); history.replaceState(null, "", location.pathname + location.search); adminClose(); }
function route() { if (location.hash === "#admin") adminOpen(); else if ($("#admin").classList.contains("open")) adminClose(); }

function renderLogin() {
  $("#admin").innerHTML = `<form class="login" id="loginForm"><h2>Área admin</h2><p>Entre com o e-mail e a senha do usuário que você criou no Supabase.</p><div class="form"><div class="fld"><label for="lgE">E-mail</label><input id="lgE" type="email" autocomplete="username" required value="${esc(LINKS.email)}"></div><div class="fld"><label for="lgP">Senha</label><input id="lgP" type="password" autocomplete="current-password" required></div><p class="err-msg" id="lgErr" role="alert"></p><div class="actions"><button class="btn primary sm" type="submit">Entrar</button><a class="btn sm" href="#top" id="lgBack">Voltar ao site</a></div></div></form>`;
  $("#lgBack").addEventListener("click", leaveAdmin);
  $("#loginForm").addEventListener("submit", async e => {
    e.preventDefault(); $("#lgErr").textContent = "";
    const { data, error } = await DB.sb.auth.signInWithPassword({ email: $("#lgE").value.trim(), password: $("#lgP").value });
    if (error) { $("#lgErr").textContent = "E-mail ou senha incorretos. Confira e tente de novo."; return; }
    DB.session = data.session; await loadAll(); renderAdmin();
  });
  bindHover();
}

function renderAdmin() {
  const tabs = [["profile", "Perfil e selo"], ["cv", "Currículo"], ["stack", "Stack"], ["certificates", "Certificados"], ["bi", "Projetos Power BI"], ["sql", "Desafios SQL"]];
  $("#admin").innerHTML = `<div class="adm-top"><h1>Admin do portfólio</h1><a class="btn sm" href="#top" id="admView">Ver o site</a>${DB.mode === "live" ? `<button class="btn sm" type="button" id="admOut">Sair</button>` : ""}</div>
  ${DB.mode === "demo" ? `<div class="adm-demo">Modo demonstração: o Supabase ainda não está conectado, então as mudanças ficam salvas só neste navegador. Depois de preencher o config.js, tudo passa a ser salvo de verdade.</div>` : ""}
  <div class="adm"><nav class="adm-nav" aria-label="Seções do admin">${tabs.map(([k, l]) => `<button type="button" data-tab="${k}" class="${admTab === k ? "on" : ""}">${l}</button>`).join("")}</nav><section class="adm-panel" id="admPanel"></section></div>`;
  $("#admView").addEventListener("click", leaveAdmin);
  if ($("#admOut")) $("#admOut").addEventListener("click", async () => { await DB.sb.auth.signOut(); DB.session = null; await loadAll(); renderLogin(); });
  $$("[data-tab]").forEach(b => b.addEventListener("click", () => { admTab = b.dataset.tab; editing = null; renderAdmin(); }));
  const P = $("#admPanel");
  if (admTab === "profile") panelProfile(P); else if (admTab === "cv") panelCV(P); else if (admTab === "stack") panelStack(P); else if (editing) panelEdit(P); else panelList(P);
  bindHover();
}
const fld = (id, label, val, type = "text", extra = "") => `<div class="fld"><label for="${id}">${label}</label>${type === "area" ? `<textarea id="${id}" ${extra}>${esc(val)}</textarea>` : `<input id="${id}" type="${type}" value="${esc(val)}" ${extra}>`}</div>`;
async function guard(fn, okMsg) { try { await fn(); toast(okMsg); } catch (e) { console.error(e); toast("Não foi possível salvar: " + (e.message || "erro desconhecido"), true); } }

function panelProfile(P) {
  const p = STATE.settings.profile, b = STATE.settings.badge;
  P.innerHTML = `<h2>Perfil e selo</h2><p>Textos do topo e do Sobre, em português e inglês. No Sobre, separe os parágrafos com uma linha em branco. O primeiro parágrafo vira a frase de destaque, e um parágrafo que começa com &gt; vira o bloco do diferencial.</p>
  <form class="form" id="pf">
    <div class="row"><label class="switch"><input type="checkbox" id="bdOn" ${b.enabled ? "checked" : ""} aria-label="Mostrar selo"><span></span></label><div class="t"><b>Selo "Disponível para oportunidades"</b><small>Aparece no topo do site quando está ligado</small></div></div>
    <div class="f2">${fld("bdPt", "Texto do selo (PT)", b.text_pt)}${fld("bdEn", "Texto do selo (EN)", b.text_en)}</div>
    <div class="f2">${fld("hlPt", "Headline (PT)", p.headline_pt, "area")}${fld("hlEn", "Headline (EN)", p.headline_en, "area")}</div>
    <div class="fld"><small>A headline é dividida pelo caractere |. O primeiro trecho vira o título grande, e o resto vira as etiquetas abaixo dele.</small></div>
    <div class="f2">${fld("abPt", "Sobre (PT)", p.about_pt, "area", 'style="min-height:300px"')}${fld("abEn", "Sobre (EN)", p.about_en, "area", 'style="min-height:300px"')}</div>
    <div class="f2">${fld("skPt", "O que busco (PT)", p.seeking_pt, "area")}${fld("skEn", "O que busco (EN)", p.seeking_en, "area")}</div>
    <div class="actions"><button class="btn primary sm" type="submit">Salvar perfil</button></div></form>`;
  $("#bdOn").addEventListener("change", e => guard(() => saveSetting("badge", Object.assign({}, STATE.settings.badge, { enabled: e.target.checked })), e.target.checked ? "Selo ligado" : "Selo desligado"));
  $("#pf").addEventListener("submit", e => { e.preventDefault(); guard(async () => {
    await saveSetting("badge", { enabled: $("#bdOn").checked, text_pt: $("#bdPt").value.trim(), text_en: $("#bdEn").value.trim() });
    await saveSetting("profile", { headline_pt: $("#hlPt").value.trim(), headline_en: $("#hlEn").value.trim(), about_pt: $("#abPt").value.trim(), about_en: $("#abEn").value.trim(), seeking_pt: $("#skPt").value.trim(), seeking_en: $("#skEn").value.trim() });
  }, "Perfil salvo"); });
}

function panelCV(P) {
  const cv = STATE.settings.cv || {};
  P.innerHTML = `<h2>Currículo</h2><p>O arquivo enviado aqui é o que o botão "Baixar CV" entrega. Enviar um arquivo novo substitui o anterior.</p>
  <div class="form"><div class="row"><div class="t"><b>${cv.url ? esc(cv.name || "CV atual") : "Nenhum CV enviado"}</b><small>${cv.updated_at ? "Atualizado em " + esc(new Date(cv.updated_at).toLocaleString("pt-BR")) : "Até você enviar um arquivo, o botão do site mostra \"CV em breve\""}</small></div>${cv.url ? `<a class="btn sm" href="${esc(cv.url)}" target="_blank" rel="noopener">Abrir</a><button class="btn sm danger" type="button" id="cvDel">Remover</button>` : ""}</div>
  <div class="fld"><label for="cvFile">Enviar CV em PDF</label><input id="cvFile" type="file" accept="application/pdf"></div></div>`;
  $("#cvFile").addEventListener("change", e => { const f = e.target.files[0]; if (!f) return; guard(async () => { const url = await uploadFile(f, "cv"); await saveSetting("cv", { url, name: f.name, updated_at: new Date().toISOString() }); panelCV(P); }, "CV enviado"); });
  if ($("#cvDel")) $("#cvDel").addEventListener("click", () => confirmDlg("Remover o CV?", "O botão do site volta a mostrar \"CV em breve\".", "Remover", () => guard(async () => { await saveSetting("cv", { url: "", name: "", updated_at: "" }); panelCV(P); }, "CV removido")));
  bindHover();
}

function panelStack(P) {
  const items = clone(STATE.settings.stack.items || []);
  const hide = 'style="position:absolute;left:-9999px"';
  const draw = () => {
    P.innerHTML = `<h2>Stack</h2><p>Ferramentas mostradas no site, agrupadas por categoria.</p><div class="rows" id="stRows">${items.map((it, i) => `<div class="row"><div class="fld t" style="min-width:160px"><label for="stN${i}" ${hide}>Nome</label><input id="stN${i}" type="text" value="${esc(it.name)}" data-i="${i}" data-k="name" placeholder="Nome da ferramenta"></div><div class="fld" style="min-width:200px"><label for="stG${i}" ${hide}>Grupo</label><select id="stG${i}" data-i="${i}" data-k="group">${Object.keys(STACK_GROUPS).map(g => `<option value="${g}" ${it.group === g ? "selected" : ""}>${STACK_GROUPS[g].pt}</option>`).join("")}</select></div><button type="button" class="ic" data-mv="${i}" data-d="-1" aria-label="Subir">${ICON.up}</button><button type="button" class="ic" data-mv="${i}" data-d="1" aria-label="Descer">${ICON.down}</button><button type="button" class="ic del" data-rm="${i}" aria-label="Remover">${ICON.del}</button></div>`).join("")}</div>
    <div class="actions" style="margin-top:16px"><button class="btn sm" type="button" id="stAdd">Adicionar ferramenta</button><button class="btn primary sm" type="button" id="stSave">Salvar stack</button></div>`;
    $$("#stRows [data-k]").forEach(el => el.addEventListener("input", () => { items[+el.dataset.i][el.dataset.k] = el.value; }));
    $$("[data-rm]", P).forEach(b => b.addEventListener("click", () => { items.splice(+b.dataset.rm, 1); draw(); }));
    $$("[data-mv]", P).forEach(b => b.addEventListener("click", () => { const i = +b.dataset.mv, j = i + +b.dataset.d; if (j < 0 || j >= items.length) return; [items[i], items[j]] = [items[j], items[i]]; draw(); }));
    $("#stAdd").addEventListener("click", () => { items.push({ name: "", group: "bi" }); draw(); $(`#stN${items.length - 1}`).focus(); });
    $("#stSave").addEventListener("click", () => guard(() => saveSetting("stack", { items: items.filter(i => i.name.trim()).map(i => ({ name: i.name.trim(), group: i.group })) }), "Stack salva"));
    bindHover();
  };
  draw();
}

function panelList(P) {
  const key = admTab, [title, one] = LIST_NAMES[key], rows = STATE[key];
  const label = d => d.title_pt || d.title || "(sem título)";
  P.innerHTML = `<h2>${title}</h2><p>Ligue ou desligue cada item para mostrar ou esconder no site sem apagar. Use as setas para mudar a ordem.</p>
  <div class="rows">${rows.length ? rows.map((r, i) => `<div class="row ${r.enabled ? "" : "off"}"><label class="switch" title="Mostrar no site"><input type="checkbox" data-on="${esc(r.id)}" ${r.enabled ? "checked" : ""} aria-label="Mostrar no site"><span></span></label><div class="t"><b>${esc(label(r.data))}</b><small>${r.enabled ? "Visível no site" : "Escondido"}${r.data.sample ? " · exemplo" : ""}</small></div><button type="button" class="ic" data-mv="${i}" data-d="-1" aria-label="Subir">${ICON.up}</button><button type="button" class="ic" data-mv="${i}" data-d="1" aria-label="Descer">${ICON.down}</button><button type="button" class="ic" data-ed="${esc(r.id)}" aria-label="Editar">${ICON.edit}</button><button type="button" class="ic del" data-del="${esc(r.id)}" aria-label="Excluir">${ICON.del}</button></div>`).join("") : `<div class="empty">Nenhum ${one} cadastrado ainda.</div>`}</div>
  <div class="actions" style="margin-top:16px"><button class="btn primary sm" type="button" id="lsAdd">Adicionar ${one}</button>${key !== "certificates" && !rows.length ? `<button class="btn sm" type="button" id="lsSeed">Carregar os 4 exemplos</button>` : ""}</div>`;
  $$("[data-on]", P).forEach(c => c.addEventListener("change", () => { const r = rows.find(x => x.id === c.dataset.on); guard(async () => { await saveRow(key, Object.assign({}, r, { enabled: c.checked })); panelList(P); }, c.checked ? "Item visível no site" : "Item escondido"); }));
  $$("[data-mv]", P).forEach(b => b.addEventListener("click", () => { const i = +b.dataset.mv, j = i + +b.dataset.d; if (j < 0 || j >= rows.length) return; guard(async () => { [rows[i], rows[j]] = [rows[j], rows[i]]; rows.forEach((r, k) => { r.sort = k; }); for (const r of rows) await saveRow(key, r); panelList(P); }, "Ordem salva"); }));
  $$("[data-ed]", P).forEach(b => b.addEventListener("click", () => { editing = clone(rows.find(x => x.id === b.dataset.ed)); renderAdmin(); }));
  $$("[data-del]", P).forEach(b => b.addEventListener("click", () => { const r = rows.find(x => x.id === b.dataset.del); confirmDlg(`Excluir "${label(r.data)}"?`, "Isso apaga o item de vez. Para só esconder, use o botão de ligar e desligar.", "Excluir", () => guard(async () => { await deleteRow(key, r.id); panelList(P); }, "Item excluído")); }));
  $("#lsAdd").addEventListener("click", () => { editing = { id: uid(), enabled: true, sort: rows.length, data: {}, isNew: true }; renderAdmin(); });
  if ($("#lsSeed")) $("#lsSeed").addEventListener("click", () => guard(async () => { for (const [i, d] of DEFAULTS[key].entries()) await saveRow(key, { id: uid(), enabled: true, sort: i, data: clone(d) }); panelList(P); }, "Exemplos carregados"));
  bindHover();
}

function panelEdit(P) {
  const key = admTab, [, one] = LIST_NAMES[key]; draft = editing.data; const f = FIELDS[key];
  const html = f.map(x => {
    const id = "f_" + x.k, v = draft[x.k];
    if (x.t === "pair") return `<div class="f2">${fld(id + "_pt", x.l + " (PT)", draft[x.k + "_pt"] || "", "text", x.req ? "required" : "")}${fld(id + "_en", x.l + " (EN)", draft[x.k + "_en"] || "")}</div>`;
    if (x.t === "pairArea") return `<div class="f2">${fld(id + "_pt", x.l + " (PT)", draft[x.k + "_pt"] || "", "area")}${fld(id + "_en", x.l + " (EN)", draft[x.k + "_en"] || "", "area")}</div>`;
    if (x.t === "code") return `<div class="fld"><label for="${id}">${x.l}</label><textarea id="${id}" class="mono" spellcheck="false">${esc(v || "")}</textarea></div>`;
    if (x.t === "csv") { const r = v && v.columns ? [v.columns, ...(v.rows || [])].map(a => a.join(" ; ")).join("\n") : ""; return `<div class="fld"><label for="${id}">${x.l}</label><textarea id="${id}" class="mono" spellcheck="false" placeholder="fornecedor ; gasto&#10;Alfa ; 1.000">${esc(r)}</textarea><small>Dá para colar direto do Excel: as tabulações também são aceitas como separador.</small></div>`; }
    if (x.t === "select") return `<div class="fld"><label for="${id}">${x.l}</label><select id="${id}">${x.opts.map(o => `<option ${v === o ? "selected" : ""}>${o}</option>`).join("")}</select></div>`;
    if (x.t === "image") return `<div class="fld"><label for="${id}">${x.l}</label><div class="file-pick">${v ? `<img src="${esc(v)}" alt="">` : ""}<input id="${id}" type="file" accept="image/*" data-up="${x.k}">${v ? `<button class="btn sm" type="button" data-clr="${x.k}">Remover imagem</button>` : ""}</div><small>O formato 16:9 fica melhor. Sem imagem, o site mostra uma ilustração de dashboard.</small></div>`;
    if (x.t === "images") return `<div class="fld"><label for="${id}">${x.l}</label><div class="thumbs">${(v || []).map((g, i) => `<figure><img src="${esc(g)}" alt=""><button type="button" data-gdel="${i}" aria-label="Remover imagem">×</button></figure>`).join("")}</div><input id="${id}" type="file" accept="image/*" multiple data-gal="${x.k}"></div>`;
    if (x.t === "file") return `<div class="fld"><label for="${id}">${x.l}</label><div class="file-pick">${v ? `<a class="btn sm" href="${esc(v)}" target="_blank" rel="noopener">Arquivo atual</a><button class="btn sm" type="button" data-clr="${x.k}">Remover arquivo</button>` : ""}<input id="${id}" type="file" accept="${x.accept || ""}" data-up="${x.k}"></div><small>O plano gratuito do Supabase aceita até 50 MB por arquivo. Para arquivos maiores, use o link externo.</small></div>`;
    return fld(id, x.l, v || "", x.t, x.ph ? `placeholder="${esc(x.ph)}"` : "");
  }).join("");
  P.innerHTML = `<h2>${editing.isNew ? "Novo " + one : "Editar " + one}</h2><p>Os campos em inglês são opcionais. Quando ficam vazios, o site mostra o texto em português.</p><form class="form" id="edf">${html}<div class="row"><label class="switch"><input type="checkbox" id="edOn" ${editing.enabled ? "checked" : ""} aria-label="Mostrar no site"><span></span></label><div class="t"><b>Mostrar no site</b></div></div><div class="actions"><button class="btn primary sm" type="submit">Salvar ${one}</button><button class="btn sm" type="button" id="edCancel">Cancelar</button></div></form>`;
  const collect = () => {
    f.forEach(x => {
      const id = "f_" + x.k;
      if (x.t === "pair" || x.t === "pairArea") { draft[x.k + "_pt"] = $("#" + id + "_pt").value.trim(); draft[x.k + "_en"] = $("#" + id + "_en").value.trim(); }
      else if (x.t === "csv") { const lines = $("#" + id).value.split("\n").map(l => l.trim()).filter(Boolean).map(l => l.split(/\s*[;\t]\s*/)); draft[x.k] = lines.length ? { columns: lines[0], rows: lines.slice(1) } : null; }
      else if (!["image", "images", "file"].includes(x.t)) draft[x.k] = $("#" + id).value.trim();
    });
    editing.enabled = $("#edOn").checked;
  };
  $$("[data-up]", P).forEach(inp => inp.addEventListener("change", () => { const file = inp.files[0]; if (!file) return; collect(); guard(async () => { draft[inp.dataset.up] = await uploadFile(file, key); panelEdit(P); }, "Arquivo enviado. Clique em Salvar para confirmar."); }));
  $$("[data-gal]", P).forEach(inp => inp.addEventListener("change", () => { const files = [...inp.files]; if (!files.length) return; collect(); guard(async () => { const k = inp.dataset.gal; draft[k] = draft[k] || []; for (const file of files) draft[k].push(await uploadFile(file, key)); panelEdit(P); }, "Imagens enviadas. Clique em Salvar para confirmar."); }));
  $$("[data-clr]", P).forEach(b => b.addEventListener("click", () => { collect(); draft[b.dataset.clr] = ""; panelEdit(P); }));
  $$("[data-gdel]", P).forEach(b => b.addEventListener("click", () => { collect(); draft.gallery.splice(+b.dataset.gdel, 1); panelEdit(P); }));
  $("#edCancel").addEventListener("click", () => { editing = null; renderAdmin(); });
  $("#edf").addEventListener("submit", e => { e.preventDefault(); collect(); delete draft.sample; guard(async () => { await saveRow(key, { id: editing.id, enabled: editing.enabled, sort: editing.sort, data: draft }); editing = null; renderAdmin(); }, "Salvo"); });
  bindHover();
}

function confirmDlg(title, msg, okLabel, onOk) {
  const m = $("#modal"), box = $("#modalBox");
  box.innerHTML = `<div class="dlg" role="alertdialog" aria-labelledby="dlgT"><h3 id="dlgT">${esc(title)}</h3><p>${esc(msg)}</p><div class="actions"><button class="btn sm danger" type="button" id="dlgOk">${esc(okLabel)}</button><button class="btn sm" type="button" id="dlgNo">Cancelar</button></div></div>`;
  box.style.width = "auto"; m.classList.add("open"); m.style.zIndex = 500; $("#dlgNo").focus();
  const close = () => { m.classList.remove("open"); m.style.zIndex = ""; box.style.width = ""; };
  $("#dlgNo").addEventListener("click", close); $("#dlgOk").addEventListener("click", () => { close(); onOk(); });
  bindHover();
}

/* ================= início ================= */
(async () => {
  ["#admin", "#modal", "#menu"].forEach(s => $(s).setAttribute("data-lenis-prevent", ""));
  STATE = demoSeed();
  if (CFG.supabaseUrl && CFG.supabaseAnonKey) { STATE.bi = []; STATE.sql = []; } // evita piscar os exemplos antes dos dados reais
  renderStatic(); renderDynamic(); nav(); cursor(); magnetic();
  try { scene(); } catch (e) { console.warn(e); }
  FX.init();
  FX.intro();
  await initDB();
  try { await loadAll(); } catch (e) { console.error(e); toast("Não foi possível carregar os dados do Supabase. Mostrando o conteúdo padrão.", true); DB.mode = "demo"; STATE = demoSeed(); }
  renderDynamic();
  addEventListener("hashchange", route); route();
})();
}
