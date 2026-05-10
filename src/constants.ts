export interface Comparison {
  A: string;
  B: string;
}

export interface Phase {
  name: string;
  comparisons: Comparison[];
}

export const GAME_DATA: { phases: Phase[] } = {
  "phases": [
    {
      "name": "BLOCO CF (Exatas & Engenharia)",
      "comparisons": [
        { "A": "Engenheiro de Produção Lean", "B": "Físico Computacional" },
        { "A": "Astrofísico", "B": "Médico - Telemedicina" },
        { "A": "Químico - Especialista em Química Verde", "B": "Economista Comportamental" },
        { "A": "Engenheiro Elétrico - Smart Grids", "B": "Especialista em Ciberdefesa" },
        { "A": "Engenheiro Agrônomo Digital", "B": "Advogado Digital - LGPD" },
        { "A": "Engenheiro Mecânico - Robótica", "B": "Jornalista de Dados" },
        { "A": "Engenheiro de Dados", "B": "Pedagogo - Designer Instrucional" },
        { "A": "Engenheiro de Segurança - ESG", "B": "Designer de UX Visual" },
        { "A": "Físico - Computação Quântica", "B": "Bioinformata" },
        { "A": "Engenheiro Civil Sustentável - BIM", "B": "Cantor - Criador de Conteúdo Musical" }
      ]
    },
    {
      "name": "BLOCO CB (Saúde & Biológicas)",
      "comparisons": [
        { "A": "Cirurgião-Dentista Digital", "B": "Engenheiro Mecânico - Automação" },
        { "A": "Médico Veterinário - Telemedicina", "B": "Bacteriologista Molecular" },
        { "A": "Botânico - Pesquisador em Clima", "B": "Estatístico Computacional" },
        { "A": "Fonoaudiólogo - Comunicação Humano-IA", "B": "Vendedor - Account Executive" },
        { "A": "Biólogo Molecular", "B": "Consultor de Experiências - Ecoturismo" },
        { "A": "Patologista - Medicina Molecular", "B": "Advogado Trabalhista Preventivo" },
        { "A": "Fisioterapeuta Digital - Reabilitação Virtual", "B": "Repórter - Criador de Conteúdo" },
        { "A": "Médico - Medicina de Precisão", "B": "Padre - Capelão" },
        { "A": "Farmacêutico Clínico", "B": "Curador de Arte Digital" },
        { "A": "Psiquiatra - Saúde Mental Digital", "B": "Compositor - Trilhas para Games" }
      ]
    },
    {
      "name": "BLOCO C (Finanças & Controle)",
      "comparisons": [
        { "A": "Estatístico - Cientista de Dados", "B": "Inventor - Maker" },
        { "A": "Matemático Financeiro - Quant", "B": "Farmacêutico - Farmacogenética" },
        { "A": "Bancário - Open Banking", "B": "Contador Estratégico" },
        { "A": "Calculista - Analista de Dados", "B": "Administrador - Gestor de Negócios" },
        { "A": "Fiscal de Renda - RPA Fiscal", "B": "Juiz de Direito - Digital" },
        { "A": "Contador - RPA Contábil", "B": "Deputado - Analista de Políticas" },
        { "A": "Fiscal Alfandegário - Supply Chain Global", "B": "Radialista - Produtor de Podcast" },
        { "A": "Técnico Contábil", "B": "Orientador Educacional - Coach de Carreira" },
        { "A": "Tesoureiro - Especialista em Finanças", "B": "Ator - Performer Digital" },
        { "A": "Controller - CFO", "B": "Flautista - Session Player" }
      ]
    },
    {
      "name": "BLOCO N (Negócios & Empreendedorismo)",
      "comparisons": [
        { "A": "Corretor de Imóveis - Proptech", "B": "Químico - Engenheiro de Materiais" },
        { "A": "Empreendedor Digital", "B": "Dentista - Odontologia 3D" },
        { "A": "Comerciante - E-commerce Manager", "B": "Contador - Consultor Fiscal Digital" },
        { "A": "Importador - Trader Internacional", "B": "Consultor de People Analytics" },
        { "A": "Atacadista - Gestor de Supply Chain", "B": "Gerente de Banco - Open Banking" },
        { "A": "Corretor de Bolsa - Trader Algorítmico", "B": "Assistente Social - Terapeuta Comunitário" },
        { "A": "Corretor de Seguros - Actuary", "B": "Professor - Facilitador de Aprendizagem" },
        { "A": "Head de Vendas - CRO", "B": "Juiz - Especialista em Direito Digital" },
        { "A": "Leiloeiro Digital", "B": "Artista Multimídia - NFT Artist" },
        { "A": "Negociante - Empreendedor", "B": "Músico - Produtor Musical" }
      ]
    },
    {
      "name": "BLOCO AD (Administração & Gestão)",
      "comparisons": [
        { "A": "Gestor Hotelero - Revenue Manager", "B": "Eletrotécnico - Especialista em Smart Grids" },
        { "A": "Gestor de Produção - Lean Manager", "B": "Veterinário - Especialista em One Health" },
        { "A": "Diretor Administrativo - COO", "B": "Estatístico - Cientista de Dados" },
        { "A": "Gestor Comercial - Head de Vendas Digitais", "B": "Corretor de Imóveis Digital" },
        { "A": "Gestor Público - GovTech", "B": "Gerente Hotelero - Hospitality Tech" },
        { "A": "Gestor Hospitalar - Saúde Digital", "B": "Publicitário - Growth Hacker" },
        { "A": "Gestor Educacional - Head de EdTech", "B": "Advogado - Compliance LGPD" },
        { "A": "Relações Públicas - Comunicação Estratégica", "B": "Missionário - Projetos Humanitários" },
        { "A": "CHRO - Head de People", "B": "Escultor Digital - Artista 3D" },
        { "A": "Gestor de ONGs - Impacto Social", "B": "Médico - Telemedicina" }
      ]
    },
    {
      "name": "BLOCO P (Jurídico & Social)",
      "comparisons": [
        { "A": "Advogado Criminalista - Digital", "B": "Astrofísico - Cientista de Dados Espaciais" },
        { "A": "Juiz - Direito Digital", "B": "Oftalmologista - Cirurgia Refrativa" },
        { "A": "Advogado Trabalhista - People Analytics", "B": "Bancário - Fintechs" },
        { "A": "Servidor Público - Gestor Público", "B": "Negociante - Trader" },
        { "A": "Assessor Político - Estrategista", "B": "Carreira Militar - Ciberdefesa" },
        { "A": "Sindicalista - Negociador", "B": "Promotor de Justiça - Digital" },
        { "A": "Tabelião - Registrador Digital", "B": "Historiador Digital" },
        { "A": "Escrivão - Analista Processual Digital", "B": "Assistente Social - Projetos Sociais" },
        { "A": "Promotor Público", "B": "Baterista - Músico Session" },
        { "A": "Cientista Político", "B": "Decorador - Design Biofílico" }
      ]
    }
  ]
};
