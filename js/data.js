
const DATA = {
  nome: "Aires Adlay",
  iniciais: "AA",                         // ou troque o avatar por uma <img>
  usuario: "aires",                        // aparece no painel: voce@portfolio
  tagline: "estudante de Ciência da Computação · dev desktop, Linux e C",
  cargo: "Dev Web em formação · Bacharel em Ciência da Computação",
  bio: "Estudo Ciência da Computação na UFSJ e desenvolvimento web — Windows, Linux, desenvolvimento frontend e backend. Como freelancer, foco em desenvolvimento web, trabalhando com html, css, js, Node.js.",
  skills: ["C", "Linux", "Desktop", "HTML/CSS/JS", "Windows", "Hardware", "Node.js"],

  projetos: [
    { titulo: "Central Machine", tag: "sistema web · cliente",
      desc: "Central de operações para uma empresa de entregas com motoboys, integrada à API da plataforma de despacho. Monitora as rotas ao vivo no mapa e dispara alarmes de desvio, atraso na coleta e tempo de entrega excedido; analisa relatórios de atrasos; atualiza o cadastro de entregadores em lote; e gera histórico e ranking de desempenho. Atende várias centrais com login e permissões próprios, abre no celular como app e roda em servidor Linux com HTTPS.",
      stack: ["Node.js", "JavaScript", "API REST", "Playwright", "Mapas / GPS", "PWA", "Linux (VPS)", "Testes automatizados"], link: "" },
    { titulo: "Blog A.J", tag: "web · full stack",
      desc: "Blog com API REST própria: publicação de artigos, busca por título e conteúdo, curtidas limitadas a uma por visitante e exclusão protegida por senha de administrador. Back-end em Express com MongoDB Atlas, validação de entrada e configuração por variáveis de ambiente.",
      stack: ["Node.js", "Express", "MongoDB", "Mongoose", "HTML", "CSS", "JavaScript"],
      link: "https://github.com/aires10200/Blog-A.J" },
    { titulo: "Brassaria Internacional", tag: "web",
      desc: "Redesenho do site da cervejaria: páginas inicial, portfólio, institucional e cadastro de eventos, com front-end integrado a uma API Spring Boot.",
      stack: ["HTML", "CSS", "JavaScript", "API Spring Boot"], link: "" },
   
  ],

  conquistas: [
    { quando: "2025",     texto: "Ingresso no bacharelado em Ciência da Computação — UFSJ." },
    { quando: "ago/2026", texto: "Finalização do curso de desenvolvimento web." },
    { quando: "nov/2026", texto: "Primeiro cliente!" }
  ],

  objetivos: [
    "Fechar projetos freelance de sites e sistemas web para pequenas empresas",
    "Aprofundar em back-end com Node.js e bancos de dados (PostgreSQL)",
    "Publicar um projeto open source no GitHub"
  ],

  contato: {
    disponibilidade: "Disponível para estágio e freelas",
    email: "airesadlay2@gmail.com",
    links: [
      { nome: "GitHub",   url: "https://github.com/aires10200" },
      { nome: "LinkedIn", url: "https://www.linkedin.com/in/airesadlay" }
    ]
  }
};
