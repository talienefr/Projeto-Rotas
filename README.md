# Documentação do Sistema de Gestão de Funcionários e Canteiros
  Este sistema foi desenvolvido para cadastrar e organizar dados de funcionários, canteiros de obra, alojamentos, veículos e os vínculos entre funcionários e canteiros. Abaixo estão as   funcionalidades e instruções de uso.
  

## 📍 Página Inicial
  - Acesso ao menu com botões para cada funcionalidade

## 📍 Cadastro de Funcionário
  - Campos: nome, CPF, telefone, função, período, canteiro e alojamento
  - Requer canteiro e alojamento cadastrados previamente

## 📍 Cadastro de Canteiro:
   - Preenchimento por endereço com CEP.
   - Tenta converter endereço em coordenadas automaticamente.
   - Se falhar, usuário preenche latitude e longitude manualmente.
     
## 📍 Cadastro de Alojamento:
   - Similar ao canteiro, com tentativa de geocodificação automática.
   - Permite preenchimento manual de coordenadas.
     
## 📍 Cadastro de Veículos:
   - Campos: tipo, placa, capacidade, canteiro (opcional).
   - Valida formato da placa (ex: ABC1234).
     
## 📍 Vínculo Funcionário <-> Canteiro:
   - Seleção de funcionário e canteiro, período e status ativo.
   - Lista vínculos existentes com opção de remoção.
     
## 📍 Validações:
   - Todos os formulários têm verificação de campos obrigatórios e formatos válidos.
     
## 📍 Navegação:
   - Todos os formulários possuem botão para retornar ao menu principal

# Estrutura do Banco de Dados

## Funcionários
   - id (PK)
   - nome
   - cpf (UNIQUE)
   - telefone
   - funcao
   - periodo
   - canteiro_id (FK ? canteiros.id)
   - alojamento_id (FK ? alojamentos.id)
 ## Canteiros
   - id (PK)
   - nome
   - rua
   - numero
   - bairro
   - cidade
   - estado
   - cep
   - latitude
   - longitude
   - status
## Alojamentos
   - id (PK)
   - nome
   - rua
   - numero
   - bairro
   - cidade
   - estado
   - cep
   - localizacao
   - capacidade
   - latitude
   - longitude
## Veículos
   - id (PK)
   - tipo
   - placa (UNIQUE)
   - capacidade
   - canteiro_id (FK ? canteiros.id)
## Funcionários_canteiros
   - id (PK)
   - funcionario_id (FK ? funcionarios.id)
   - canteiro_id (FK ? canteiros.id)
   - periodo_trabalho
   - ativo (0 ou 1)
## Relacionamentos:
- Um funcionário pertence a um alojamento e um canteiro.
- Um funcionário pode estar vinculado a vários canteiros via funcionarios_canteiros.
- Veículos podem ser atribuídos a canteiros
