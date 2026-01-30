# 🧾 Post-mortem — Controle Financeiro (Vue 3)
# 📌 Contexto

Este projeto foi desenvolvido com o objetivo inicial de aprender Vue 3, mas rapidamente evoluiu para um exercício completo de:

arquitetura frontend

separação de responsabilidades

testes automatizados

decisões de performance

experiência do usuário

A proposta foi simular problemas reais de aplicações financeiras, mesmo sendo uma aplicação client-side.

🎯 Objetivos iniciais

Aprender Vue 3 com Composition API

Utilizar TypeScript de forma consistente

Criar uma aplicação útil, não apenas um CRUD genérico

Manter o código testável desde o início

# ✅ O que funcionou bem
# 1️⃣ Uso da Store como domínio

A decisão de concentrar toda a regra de negócio na store (Pinia) foi acertada.

Componentes ficaram simples

Seletores parametrizados evitaram estado duplicado

Testes de regra de negócio ficaram diretos e previsíveis

Isso facilitou a evolução para múltiplas visões (Dashboard vs Monthly Summary).

# 2️⃣ Testes escritos junto com a evolução da UI

Ao invés de “testar no final”, os testes foram:

escritos conforme novas features surgiam

ajustados quando a arquitetura mudava

usados como ferramenta de validação de decisões

Isso evitou regressões silenciosas, especialmente ao:

refatorar filtros

introduzir scroll lógico

adicionar exportação CSV

# 3️⃣ Janela de renderização como solução de performance

Ao invés de renderizar todos os meses:

a UI passou a renderizar apenas uma janela fixa

scroll (wheel / drag / swipe) apenas move a janela

Isso manteve:

performance previsível

código simples

testes estáveis

Sem necessidade de bibliotecas externas.

# 4️⃣ Testes de interações avançadas

Implementar e testar:

mouse wheel

drag com mouse

swipe touch

trouxe aprendizados importantes sobre:

diferença entre eventos Vue e DOM nativos

limitações do jsdom

uso correto de dispatchEvent vs trigger

Esses pontos normalmente só aparecem em projetos reais.

# ⚠️ Dificuldades encontradas
# 1️⃣ Escopo de Pinia em testes

Misturar:

setActivePinia

createPinia no mount

gerou bugs difíceis de detectar.

A solução foi:

usar uma instância de Pinia por teste

sempre passar a instância explicitamente

# 2️⃣ Limitações do <script setup> em testes

Métodos definidos em <script setup>:

não ficam acessíveis em wrapper.vm

não podem ser espionados diretamente

Isso exigiu uma mudança de mentalidade:

testar efeitos observáveis, não métodos internos

# 3️⃣ Testes frágeis baseados em texto

Usar wrapper.text() para tudo:

causou falsos negativos

quebrou testes com pequenas mudanças visuais

A introdução de data-testid resolveu esse problema.

# 🔄 Decisões que eu faria diferente hoje
# 1️⃣ Introduzir data-testid desde o início

Isso teria:

simplificado os testes iniciais

evitado refactors posteriores

# 2️⃣ Padronizar helpers de teste mais cedo

Criar helpers como:

setupDashboardTest()
setupPiniaWithSeed()


desde o começo teria reduzido repetição.

# 3️⃣ Documentar arquitetura em paralelo

A documentação veio no final, mas poderia ter sido:

escrita incrementalmente

usada como guia de decisão

# 📚 Principais aprendizados técnicos

Vue 3 favorece composição, não herança

Pinia funciona melhor como camada de domínio

Testes devem focar em comportamento

Performance não precisa ser complexa para ser eficaz

UX e arquitetura caminham juntas

# 🏁 Conclusão

Este projeto deixou de ser apenas um exercício de Vue e se tornou um estudo completo de:

frontend moderno

decisões arquiteturais conscientes

testes bem pensados

evolução incremental sem perda de qualidade

Ele pode servir como:

base para aplicações reais

material de portfólio

referência pessoal para projetos futuros

# 📌 Próximos passos possíveis

Persistência via API

Autenticação

Gráficos financeiros

Exportação avançada (por período, por categoria)

Mas, neste ponto, o projeto cumpre plenamente seu objetivo.