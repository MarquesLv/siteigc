// Banco de dados de minerais/rochas
// Nota: em um projeto maior, isso pode vir de um JSON externo ou API
window.MINERALS = [
  {
    id: "queluzito",
    name: "Queluzito",
    image: "https://i.postimg.cc/RZmgmYns/queluzito.jpg",
    formula: "Rocha de Manganês (Espessartita, Rodonita)",
    hardness: "Variável (5.5 - 6.5)",
    color: "Rosa, avermelhado, preto",
    crystalSystem: "N/A (Rocha Metamórfica)",
    description:
      "Uma rocha metamórfica rica em silicatos de manganês, encontrada na região de Conselheiro Lafaiete, MG. É a rocha que deu origem ao nome da cidade de Queluzito.",
    occurrence:
      "Associada a depósitos de manganês no Quadrilátero Ferrífero, Minas Gerais, Brasil.",
    uses: "Fonte histórica de manganês, mineral de coleção (rodonita).",
  },
  {
    id: "quartzo-biotita-xisto",
    name: "Quartzo-Biotita Xisto",
    image: "https://i.postimg.cc/J7kw49GM/quartzo.jpg",
    formula: "Quartzo (SiO₂) + Biotita",
    hardness: "Variável",
    color: "Cinza a preto, com brilho prateado",
    crystalSystem: "N/A (Rocha Metamórfica)",
    description:
      "Rocha metamórfica que exibe xistosidade (foliação) devido à orientação paralela dos cristais de biotita (mica preta). Os grãos de quartzo formam camadas intercaladas.",
    occurrence:
      "Comum em terrenos metamórficos de médio a alto grau em todo o mundo.",
    uses:
      "Pode ser usada como pedra de revestimento, mas seu principal interesse é geológico.",
  },
  {
    id: "laterita-aurifera",
    name: "Laterita Aurífera",
    image: "https://i.postimg.cc/SNMPk81s/laterita-au.jpg",
    formula: "Óxidos de Fe/Al + Ouro (Au)",
    hardness: "Baixa (friável)",
    color: "Amarelo, vermelho, marrom",
    crystalSystem: "N/A (Solo/Rocha Residual)",
    description:
      "Um tipo de solo/rocha superficial formado pela intensa meteorização de rochas em climas tropicais. O ouro, sendo resistente, concentra-se residualmente durante este processo.",
    occurrence:
      "Zonas de intemperismo em regiões com rochas-fonte de ouro, como na Amazônia e partes de Minas Gerais.",
    uses: "Minério de ouro de baixo custo de extração (garimpo).",
  },
  {
    id: "minerio-ferro-n4",
    name: "Minério de Ferro - N4",
    image: "https://i.postimg.cc/Gm9xb1mj/mineirodeferron4.jpg",
    formula: "Principalmente Hematita (Fe₂O₃)",
    hardness: "Alta (compacto)",
    color: "Cinza-azulado metálico",
    crystalSystem: "N/A (Minério)",
    description:
      "Refere-se ao minério de ferro de altíssimo teor (acima de 66% Fe) extraído do corpo N4 da Serra dos Carajás, no Pará. É considerado um dos melhores minérios de ferro do mundo.",
    occurrence: "Província Mineral de Carajás, Pará, Brasil.",
    uses:
      "Principal matéria-prima para a produção de aço de alta qualidade na siderurgia global.",
  },
  {
    id: "hematita-dura",
    name: "Hematita Dura",
    image: "https://i.postimg.cc/pXP9HNB1/hametitadura.jpg",
    formula: "Fe₂O₃",
    hardness: "5.5 - 6.5",
    color: "Cinza-aço, preto",
    crystalSystem: "Trigonal",
    description:
      "Uma variedade de hematita maciça, compacta e de alta dureza. É um tipo de minério de ferro de alto teor, frequentemente encontrado em corpos de minério que não sofreram muita alteração.",
    occurrence:
      "Comum em grandes depósitos de ferro, como no Quadrilátero Ferrífero (MG) e em Carajás (PA).",
    uses: "Minério de ferro de alta qualidade para a indústria siderúrgica.",
  },
  {
    id: "hematita",
    name: "Hematita",
    image: "https://i.postimg.cc/g0bFCpVx/hematita.jpg",
    formula: "Fe₂O₃",
    hardness: "5.5 - 6.5",
    color: "Preto a cinza-aço, vermelho em pó",
    crystalSystem: "Trigonal",
    description:
      "O mais importante minério de ferro. Seu nome vem da palavra grega para 'sangue' (haima), pois sua forma em pó é vermelha. Pode ocorrer em formas especular (brilhante), terrosa ou compacta.",
    occurrence:
      "Encontrada em rochas sedimentares, metamórficas e ígneas. O Brasil e a Austrália são os maiores produtores mundiais.",
    uses:
      "Principal fonte de ferro para a produção de aço, pigmentos (ocre), e como gema.",
  },
  {
    id: "itabirito",
    name: "Itabirito",
    image: "https://i.postimg.cc/65xP6c7P/itabirito.jpg",
    formula: "Hematita (Fe₂O₃) + Quartzo (SiO₂)",
    hardness: "Variável (5.5 - 7)",
    color: "Bandas de cinza-metálico e vermelho/branco",
    crystalSystem: "N/A (Rocha Metamórfica)",
    description:
      "Uma rocha metamórfica laminada, composta por camadas alternadas de hematita e quartzo. É um tipo de Formação Ferrífera Bandada (BIF) e o principal minério de ferro do Quadrilátero Ferrífero.",
    occurrence:
      "O nome vem da cidade de Itabirito, em Minas Gerais, coração do Quadrilátero Ferrífero.",
    uses:
      "A mais importante fonte de minério de ferro em Minas Gerais e uma das mais importantes do mundo.",
  },
];
