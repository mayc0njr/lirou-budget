# 💰 Controle Financeiro — Vue 3 + TypeScript

Aplicação frontend (client-side) desenvolvida com Vue 3, focada em arquitetura limpa, performance e testes automatizados, simulando decisões reais de aplicações financeiras modernas.

Projeto criado com fins educacionais, mas estruturado em nível profissional, podendo servir como base para aplicações reais ou como material de portfólio.

# ✨ Funcionalidades

Cadastro de transações financeiras (entrada / saída)

Dashboard operacional com lista e filtros

Resumo mensal por:

total de entradas

total de saídas

categorias

Visualização de múltiplos meses em sequência

Navegação fluida entre meses:

mouse wheel / trackpad

drag com mouse

swipe touch (mobile)

Renderização eficiente (janela de meses)

Testes automatizados (store, componentes e interações)

🛠️ Stack Tecnológica

Vue 3 (Composition API)

TypeScript

Pinia (gerenciamento de estado)

Vue Router

Tailwind CSS

Vitest

@vue/test-utils

jsdom

# 🧱 Arquitetura

O projeto segue princípios de separação de responsabilidades e domínio desacoplado da UI.

Estrutura de pastas (resumida)
src/
 ├─ components/
 │   ├─ TransactionForm.vue
 │   ├─ TransactionsTable.vue
 │   ├─ MonthlyBlock.vue
 │
 ├─ views/
 │   ├─ Dashboard.vue
 │   ├─ MonthlySummary.vue
 │
 ├─ stores/
 │   └─ transactions.ts
 │
 ├─ types/
 │   └─ Transaction.ts
 │
 ├─ router/
 │   └─ index.ts

# 🧠 Store (Pinia)

A store concentra toda a regra de negócio da aplicação:

Armazena transações

Calcula totais

Filtra por mês

Agrupa por categoria

Não depende de componentes ou rotas

Seletores parametrizados
getMonthlyIncome(month)
getMonthlyExpense(month)
getMonthlyBalance(month)
getCategoryTotalsByMonthAndType(month, type)


Vantagens:

Evita estado duplicado

Facilita testes

Permite múltiplas visões simultâneas dos dados

# 🧩 Componentes Principais
TransactionForm.vue

Componente controlado

Emite evento submit(transaction)

Não conhece a store

Facilmente reutilizável (modal, drawer, etc.)

Dashboard.vue

Tela operacional

Captura eventos do formulário

Interage com a store

Renderiza lista filtrada de transações

MonthlySummary.vue

Tela analítica

Exibe dados agregados por mês

Navegação entre meses com scroll eficiente

Não renderiza transações individuais

MonthlyBlock.vue

Responsável por um único mês

Usa apenas seletores da store

Base para virtualização futura

# 🚀 Performance
Janela de renderização

Para evitar renderização excessiva de meses:

WINDOW_SIZE = 3
visibleMonths = allMonths.slice(start, start + WINDOW_SIZE)


Benefícios:

Render mínimo

Escala para muitos meses

UX fluida mesmo com grandes volumes de dados

O scroll (wheel / drag / swipe) move a janela, não o DOM inteiro.

# 🧪 Testes Automatizados
Filosofia

Testar comportamento, não layout.

Não testamos:

estilos

classes CSS

Tailwind

Testamos:

regras de negócio

fluxo de dados

interações do usuário

# Tipos de testes
🧪 Store (unitários)

Cobrem:

totais mensais

meses vazios

categorias inexistentes

entradas vs saídas

valores zero

edge cases financeiros

Arquivos:

transactions.spec.ts

transactions.edge.spec.ts

🧪 Componentes

TransactionForm.spec.ts

MonthlyBlock.spec.ts

🧪 Views (integração)

Dashboard.spec.ts

MonthlySummary.spec.ts

🧪 Interações avançadas

Swipe touch (mobile)

Drag com mouse

Scroll via wheel

Regra aplicada:

Eventos Vue (@event) → trigger()

Eventos DOM (addEventListener) → dispatchEvent()

🧪 data-testid

Para tornar os testes mais estáveis e resilientes a refactors visuais:

id → inputs únicos (ex.: ano / mês)

data-testid → listas e elementos repetidos

Exemplo:

<div data-testid="monthly-block"></div>
<div data-testid="months-container"></div>

# ▶️ Rodando o projeto
Instalar dependências
npm install

Rodar em desenvolvimento
npm run dev

Rodar testes
npm run test

# 📈 Possíveis Evoluções

Animações de transição entre meses

Suporte a teclado (← →)

Virtualização completa

Gráficos por categoria

Exportação CSV

Persistência via API

# 🏁 Conclusão

Este projeto demonstra:

Uso avançado de Vue 3 + TypeScript

Arquitetura frontend escalável

Preocupação com performance desde o início

Testes bem estruturados

Separação clara entre domínio e UI

Pode ser utilizado como:

Projeto de estudo avançado

Material de portfólio