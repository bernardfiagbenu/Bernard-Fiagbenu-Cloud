const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generatePaperPDF() {
  const outputPath = path.join(__dirname, '../public/research-paper.pdf');
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
    info: {
      Title: "Artificial Intelligence and Machine Learning in Ghana's Economy: Opportunities in Deep Learning, Natural Language Processing, and Generative AI",
      Author: 'Bernard Fiagbenu',
      Subject: 'Applied Artificial Intelligence in African Economic Sectors',
      Keywords: 'Artificial Intelligence, Deep Learning, Natural Language Processing, Generative AI, Ghana, Economic Development',
    },
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Styling helpers
  const primaryColor = '#111111';
  const secondaryColor = '#444444';
  const accentRule = '#888888';

  // Title
  doc
    .fillColor(primaryColor)
    .font('Helvetica-Bold')
    .fontSize(16)
    .text("Artificial Intelligence and Machine Learning in Ghana's Economy: Opportunities in Deep Learning, Natural Language Processing, and Generative AI", {
      align: 'center',
      lineGap: 4,
    });

  doc.moveDown(0.75);

  // Author & Affiliation
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor(secondaryColor)
    .text('Bernard Fiagbenu', { align: 'center' })
    .text('Computer Scientist | Accra, Ghana', { align: 'center' });

  doc.moveDown(0.5);

  // Horizontal divider
  doc
    .strokeColor(accentRule)
    .lineWidth(0.5)
    .moveTo(54, doc.y)
    .lineTo(541, doc.y)
    .stroke();

  doc.moveDown(0.75);

  // Abstract Heading
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(primaryColor)
    .text('Abstract', { align: 'left' });

  doc.moveDown(0.25);

  const abstractText =
    "This paper investigates the economic and technical opportunities of artificial intelligence (AI) and machine learning (ML) within Ghana's developing economy, with a specific focus on deep learning architectures, local-language natural language processing (NLP), and emerging generative AI tools. While macroeconomic shifts across sub-Saharan Africa emphasize digital transformation, domestic adoption remains constrained by fragmented datasets, computational resource scarcity, and linguistic exclusion. Through a sectoral analysis across agriculture, financial technology, supply chain logistics, healthcare, and public administration, we evaluate how modern deep learning models can be adapted to resource-constrained environments. We examine grassroots and institutional initiatives, including low-resource NLP efforts for Ghanaian languages (such as Twi, Ga, Ewe, and Dagbani) led by Ghana NLP, and capacity-building programs supported by international research frameworks such as the Google DeepMind AI Research Foundation Grant at Ghanaian universities. Additionally, we analyze China Xpress, an operational logistics tracking platform for China-Ghana maritime freight, as an empirical practitioner case study demonstrating the efficiency gains of digital transparency in cross-border supply chains. Finally, we formulate a proposed mixed-methods evaluation methodology and outline strategic policy recommendations for data governance, public compute infrastructure, and localized ethical guidelines to ensure equitable technological advancement.";

  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(primaryColor)
    .text(abstractText, {
      align: 'justify',
      lineGap: 2.5,
    });

  doc.moveDown(0.5);

  doc
    .font('Helvetica-Bold')
    .fontSize(9.5)
    .fillColor(primaryColor)
    .text('Keywords: ', { continued: true })
    .font('Helvetica')
    .text('Artificial Intelligence, Deep Learning, Natural Language Processing, Low-Resource Languages, Ghana, Supply Chain Logistics, Economic Development');

  doc.moveDown(0.75);

  // Helper for section headings
  function addSection(title) {
    doc.moveDown(0.75);
    doc
      .font('Helvetica-Bold')
      .fontSize(12)
      .fillColor(primaryColor)
      .text(title);
    doc.moveDown(0.35);
  }

  function addSubSection(title) {
    doc.moveDown(0.5);
    doc
      .font('Helvetica-Bold')
      .fontSize(10.5)
      .fillColor(primaryColor)
      .text(title);
    doc.moveDown(0.25);
  }

  function addParagraph(text) {
    doc
      .font('Helvetica')
      .fontSize(9.5)
      .fillColor(primaryColor)
      .text(text, {
        align: 'justify',
        lineGap: 2.5,
      });
    doc.moveDown(0.4);
  }

  // Section 1
  addSection('1. Introduction');
  addParagraph(
    "Developing nations across sub-Saharan Africa face a dual imperative: accelerating productivity across traditional primary sectors while establishing technological infrastructure to participate in the global digital economy. In Ghana, where agriculture employs nearly 38% of the labor force and micro, small, and medium-sized enterprises (MSMEs) account for approximately 70% of gross domestic product (Ghana Statistical Service, 2023), technological productivity shocks have outsized economic implications. Artificial intelligence (AI) and machine learning (ML) present transformative mechanisms for automating routine operational workflows, optimizing supply chains, predicting agricultural outcomes, and democratizing access to technical and educational knowledge."
  );
  addParagraph(
    "Despite rapid global advances in deep learning, multimodal vision architectures, and large language models (LLMs), the deployment of these technologies in developing economies encounters substantial practical friction. Standard deep learning architectures require extensive high-bandwidth data pipes, high-performance GPU clusters, and massive curated corpora—predominantly in standardized high-resource languages such as English, Mandarin, and Spanish. In Ghana, digital systems operate within conditions of intermittent mobile bandwidth, expensive compute infrastructure, and rich linguistic diversity comprising over 80 indigenous languages and dialects."
  );
  addParagraph(
    "This research paper addresses three core questions: (1) In which core sectors of Ghana's domestic economy can machine learning yield immediate, measurable productivity gains? (2) How can natural language processing be effectively operationalized for indigenous Ghanaian languages to prevent linguistic disenfranchisement? and (3) What infrastructural, educational, and institutional funding mechanisms—such as university research grants and corporate AI labs—are required to sustain localized research and deployment?"
  );

  // Section 2
  addSection('2. Literature Review');
  addSubSection('2.1 Foundations of Deep Learning, NLP, and Generative AI');
  addParagraph(
    "The evolution of machine learning over the past decade from hand-engineered feature extraction toward hierarchical representation learning has unlocked unprecedented performance across perception and generative tasks. Deep convolutional neural networks (CNNs) and vision transformers (ViTs) provide state-of-the-art visual classification, enabling mobile cameras to act as portable diagnostic instruments for agronomy and pathology. In natural language processing, the advent of the Transformer architecture (Vaswani et al., 2017) and self-supervised masked pre-training (Devlin et al., 2019) eliminated earlier limitations of recurrent neural architectures in capturing long-range contextual dependencies."
  );
  addParagraph(
    "Most recently, autoregressive foundational language models and generative artificial intelligence (Brown et al., 2020) have shifted software paradigms from specialized single-task pipelines toward adaptable general-purpose reasoning engines. However, the efficacy of generative models remains fundamentally tethered to training distribution coverage. When models encounter domain concepts, legal frameworks, or languages poorly represented in web-scale crawls, performance degrades sharply, displaying severe hallucinations or outright inability to parse user intents."
  );

  addSubSection('2.2 AI Adoption Patterns in Africa and Ghana');
  addParagraph(
    "Academic literature addressing artificial intelligence adoption in Africa highlights both extraordinary greenfield opportunity and distinct infrastructural bottlenecks (Owoyemi et al., 2020; Gwagwa et al., 2020). Unlike industrialized nations burdened with legacy computational infrastructure, developing African economies have demonstrated notable capacity for technology leapfrogging—most visibly observed in the continental proliferation of mobile money payments bypassing traditional retail banking branch networks (Jack & Suri, 2014; Bank of Ghana, 2023)."
  );
  addParagraph(
    "In Ghana, national AI engagement has matured significantly with the drafting of the Ghana National Artificial Intelligence Strategy led by the Ministry of Communications and Digitalisation (MoCD, 2023). Academic institutions, including the University of Ghana, Kwame Nkrumah University of Science and Technology (KNUST), and the Ghana Communication Technology University (GCTU), have introduced specialized curricula in data science and intelligent systems. However, empirical adoption across enterprise and public institutions remains nascent, primarily clustered in automated fintech risk engines, pilot agricultural disease monitors, and informal customer support automation."
  );

  addSubSection('2.3 Economic Impact of Machine Learning in Developing Economies');
  addParagraph(
    "Economic analysis by multilateral institutions suggests that artificial intelligence could add trillions of dollars to global economic output over the coming decades (PwC, 2018; McKinsey & Company, 2023). For emerging markets, the growth vector differs markedly from advanced economies. Rather than replacing high-cost knowledge labor, AI in developing contexts serves as a capacity multiplier: expanding access to clinical diagnostic expertise where doctor-to-patient ratios are constrained (World Health Organization, 2022), providing personalized pedagogical assistance in overcrowded classrooms, and reducing information asymmetry in fragmented agricultural and commercial markets."
  );

  // Section 3
  addSection('3. Sectoral Applications in Ghana');
  addSubSection('3.1 Agriculture and Food Security');
  addParagraph(
    "Agriculture remains the bedrock of rural livelihood across Ghana's northern and forest belts. Smallholder farmers face severe threats from climate variability, pest invasions (such as the fall armyworm, Spodoptera frugiperda), and soil nutrient depletion. Computer vision applications operating on commodity mobile smartphones enable farmers to photograph foliar lesions on staple crops—including cassava, maize, and cocoa—and receive immediate diagnostic classifications and targeted intervention advice. When combined with localized meteorological forecasts and satellite telemetry, machine learning algorithms allow agricultural cooperatives to optimize planting schedules, mitigate yield losses, and verify crop health for micro-insurance coverage."
  );

  addSubSection('3.2 Financial Technology and Mobile Money');
  addParagraph(
    "Ghana has emerged as one of the most dynamic digital financial ecosystems in sub-Saharan Africa, driven by the Bank of Ghana's mobile money interoperability architecture. Millions of citizens previously excluded from formal banking maintain verifiable transaction records via mobile wallets. Supervised machine learning algorithms enable fintech institutions to compute non-traditional credit scores based on payment regularities, airtime purchasing patterns, and utility disbursements. Furthermore, real-time anomaly detection models safeguard digital payment channels against SIM-swap fraud, unauthorized transactional routing, and synthetic identity manipulation, thereby stabilizing systemic trust in cashless commerce."
  );

  addSubSection('3.3 Logistics and Supply Chain Transparency: Practitioner Case Study');
  addParagraph(
    "Cross-border commerce between Asia and West Africa represents an indispensable trade corridor for Ghanaian retailers, construction firms, and light manufacturing enterprises. Freight forwarding, container tracking, and maritime customs documentation have historically been plagued by severe opacity, manual manifest ledgering, and communication latency between Asian suppliers and local consignees in Accra and Kumasi."
  );
  addParagraph(
    "Case Study: China Xpress (https://shipingtracker.vercel.app/). Developed as a full-stack logistics tracking web platform, China Xpress addresses this operational friction for cross-border China-Ghana cargo. The application implements an instant tracking-number lookup interface for clients alongside a secure staff administration portal for real-time manifest record management. By digitizing supplier parcel states, status transitions, and container milestones, the platform eliminates informal, error-prone manual messaging and drastically reduces dispute rates between cargo agents and commercial importers. This demonstrates how targeted, full-stack software architectures solve foundational logistics transparency challenges, laying the necessary structured data groundwork for subsequent predictive routing and transit-time forecasting models."
  );

  addSubSection('3.4 Healthcare and Telemedicine');
  addParagraph(
    "The distribution of medical specialists in Ghana is heavily concentrated in metropolitan centers such as Accra and Kumasi, leaving peripheral district hospitals and community-based health planning and services (CHPS) compounds with limited diagnostic support. Machine learning tools adapted for edge mobile devices allow community health officers to screen ultrasound imagery, evaluate retinal scans for diabetic retinopathy, and triage dermatological infections. Natural language processing further enables voice-driven symptom intake in regional dialects, bridging clinical literacy divides and improving patient triage speed."
  );

  addSubSection('3.5 Education and Public Service Delivery');
  addParagraph(
    "In public administration and primary education, AI systems offer immediate efficiency dividends. Generative language models, constrained by verified pedagogical syllabi, provide personalized tutoring to secondary school students preparing for West African Examinations Council (WAEC) assessments. In civil administration, automated optical character recognition (OCR) and document indexing streamline business registration, land title searches, and revenue collection across regional municipal assemblies."
  );

  // Section 4
  addSection('4. Local-Language Natural Language Processing');
  addParagraph(
    "A fundamental barrier to widespread technological adoption in Ghana is the historic Anglocentric bias of computing interfaces. While English is the official language of government and commercial administration, extensive segments of the population conduct daily trade, informal business, and interpersonal communication in indigenous Niger-Congo languages, notably Akan (Twi and Fante), Ga, Ewe, and Dagbani. Commercial large language models trained overwhelmingly on Western internet crawls exhibit near-total failure when processing syntactic idioms, morphologically rich structures, and tonal distinctions inherent to these African languages."
  );
  addParagraph(
    "To counter this linguistic divide, grassroots research organizations such as Ghana NLP (Azunre et al., 2021) and the continent-wide Masakhane research collective (Nekoto et al., 2020) have spearheaded low-resource language preservation and NLP tool construction. Initiatives like the Khaya translation and speech engine have demonstrated the feasibility of training neural machine translation (NMT) and automatic speech recognition (ASR) pipelines directly on Ghanaian languages. Expanding these efforts is essential for deploying interactive voice-response (IVR) systems, judicial translation assistance, and accessible financial services to non-literate populations."
  );

  // Section 5
  addSection('5. Institutional Support, Grants, and Research Capacity');
  addParagraph(
    "Sustaining cutting-edge computer science research in developing nations necessitates reliable institutional funding, computational resources, and academic-industry collaboration. Historically, Ghanaian tertiary institutions have faced acute budget constraints, limiting university departments to theoretical curricula with scarce access to high-performance GPU hardware."
  );
  addParagraph(
    "International research partnerships have begun closing this capacity deficit. Notably, institutional programs such as the Google DeepMind AI Research Foundation Grant have provided critical funding to Ghanaian institutions—including the Department of Computer Engineering at Ghana Communication Technology University (GCTU)—to establish modern artificial intelligence teaching laboratories, support graduate student stipends, and fund specialized compute access. Similarly, Google's establishment of the Africa Applied AI Lab in Accra and its collaborative curriculum delivery with Data Science Africa (DSA) across 15 continental universities have fostered domestic talent pipelines. These programs demonstrate that strategic institutional grants can transform local universities into productive research hubs capable of publishing peer-reviewed computational work and incubating practical commercial startups."
  );

  // Section 6
  addSection('6. Challenges to AI Deployment');
  addSubSection('6.1 Data Availability, Quality, and Sovereignty');
  addParagraph(
    "Machine learning algorithms are fundamentally bounded by data quality. In Ghana, public data collection remains fragmented across paper records, unstandardized Excel spreadsheets, and isolated ministerial databases. Data siloing hinders the aggregation of longitudinal health records or standardized traffic telemetry. Furthermore, issues of national data sovereignty require clear legislative frameworks governing whether citizen biometric and economic data can be processed on foreign cloud servers."
  );

  addSubSection('6.2 Computational Infrastructure and Connectivity');
  addParagraph(
    "Modern deep learning workflows require stable electrical power and high-throughput network connectivity. While Ghana maintains robust subsea fiber connectivity along the Atlantic coast, domestic electricity grids experience periodic outages and mobile internet data remains expensive relative to median daily incomes. AI systems designed for national deployment must therefore prioritize lightweight, quantized on-device architectures (such as MobileNet, ONNX, and edge-compiled models) that operate reliably under intermittent offline conditions."
  );

  addSubSection('6.3 Talent Retention and Brain Drain');
  addParagraph(
    "Ghanaian software engineers and computer science graduates possessing advanced machine learning competencies frequently receive lucrative remote or relocation opportunities from technology firms in Europe and North America. While remittances provide short-term foreign exchange benefits, the domestic technology ecosystem suffers from a scarcity of senior research mentors and principal engineers capable of architecting complex local AI systems."
  );

  addSubSection('6.4 Algorithmic Bias and Ethical Governance');
  addParagraph(
    "Importing pre-trained commercial AI models into Ghanaian institutional workflows presents acute algorithmic bias risks. Facial recognition models calibrated on Caucasian or Asian phenotypes exhibit elevated false-positive rates on darker complexions. Credit-scoring models trained on Western banking conventions fail to account for informal market savings arrangements (such as Susu groups). Domestic regulatory bodies must establish empirical auditing standards to verify fairness prior to institutional deployment."
  );

  // Section 7
  addSection('7. Proposed Evaluation Methodology');
  addParagraph(
    "To rigorously assess the return on investment (ROI) and socio-economic impact of deploying targeted AI applications across Ghanaian economic sectors, we propose a mixed-methods empirical evaluation framework combining quantitative performance metrics with qualitative stakeholder assessments."
  );
  addParagraph(
    "Quantitative Evaluation: Model accuracy, precision-recall boundaries, inference latency on commodity hardware (ARM-based mobile chipsets), and operational cost per transaction. In supply chain environments such as China Xpress, key metrics include dispute reduction percentages, manifest reconciliation time, and end-to-end package visibility latency."
  );
  addParagraph(
    "Qualitative & Field Evaluation: Structured ethnographic interviews with end-users (farmers, clinic nurses, freight forwarders, smallholder traders) assessing usability, linguistic accessibility, system trust, and operational friction. A randomized control trial (RCT) methodology across participating and non-participating merchant cohorts provides rigorous empirical verification of economic welfare gains."
  );

  // Section 8
  addSection('8. Policy Recommendations');
  addParagraph(
    "To maximize the developmental benefits of artificial intelligence while minimizing systemic risks, we recommend that Ghanaian policymakers, industry leaders, and academic institutions pursue four coordinated interventions:"
  );
  addParagraph(
    "1. Accelerate National Open Data Mandates: Formalize open data protocols across the Ministry of Food and Agriculture, Ministry of Transport, and Ghana Health Service, anonymizing and publishing public datasets to empower local researchers and builders."
  );
  addParagraph(
    "2. Establish National High-Performance Computing (HPC) Nodes: Subsidize shared GPU compute clusters at premier public universities (e.g., University of Ghana, KNUST, GCTU) to prevent foreign cloud vendor lock-in and democratize model training."
  );
  addParagraph(
    "3. Incentivize Indigenous Language NLP Research: Allocate dedicated research funding through the Ghana Tertiary Education Commission (GTEC) for language preservation and phonetic audio corpus building across Akan, Ga, Ewe, and northern dialects."
  );
  addParagraph(
    "4. Implement Algorithmic Accountability and Governance Guidelines: Operationalize the National AI Strategy with statutory algorithmic auditing requirements for high-stakes lending, public surveillance, and employment decision algorithms."
  );

  // Section 9
  addSection('9. Conclusion');
  addParagraph(
    "Artificial intelligence and machine learning represent powerful economic catalysts for Ghana and the broader West African sub-region. When deliberately engineered to accommodate the physical realities of the local economy—intermittent connectivity, resource-constrained mobile hardware, low-resource languages, and unique commercial supply chain structures—deep learning and generative models can unlock substantial productivity gains. By combining rigorous theoretical research, institutional grants such as the Google DeepMind AI Research Foundation Grant, and pragmatic software engineering platforms exemplified by operational tools like China Xpress, Ghana is well-positioned to evolve from a consumer of foreign algorithms into an active producer of robust, context-aware computational innovations."
  );

  // References
  doc.moveDown(0.75);
  doc
    .font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(primaryColor)
    .text('References');
  doc.moveDown(0.35);

  const references = [
    'Azunre, P., Salvi, S., Dontoh, G., & Addo, P. (2021). A roadmap for natural language processing in Ghanaian languages. In Proceedings of the African NLP Workshop at EACL 2021.',
    'Bank of Ghana. (2023). Summary of economic and financial data: Mobile money interoperability report. Bank of Ghana Research Department, Accra.',
    'Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., ... & Amodei, D. (2020). Language models are few-shot learners. Advances in Neural Information Processing Systems, 33, 1877-1901.',
    'Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. In Proceedings of NAACL-HLT 2019 (pp. 4171-4186).',
    'Ghana Statistical Service. (2023). Annual GDP and economic survey report 2022-2023. Government of Ghana, Accra.',
    'Gwagwa, A., Kachoka, O., Siminyu, K., & Smith, M. (2020). Artificial intelligence (AI) deployments in sub-Saharan Africa: A rights-based approach. International Journal of Law and Information Technology, 28(4), 313-338.',
    'Jack, W., & Suri, T. (2014). Risk sharing and transactions costs: Evidence from Kenya’s mobile money revolution. American Economic Review, 104(1), 183-223.',
    'McKinsey & Company. (2023). The economic potential of generative AI: The next productivity frontier. McKinsey Global Institute.',
    'Ministry of Communications and Digitalisation (MoCD). (2023). National Artificial Intelligence Strategy for Ghana (Draft Framework). Republic of Ghana.',
    'Nekoto, W., Marivate, V., Matsila, T., Fasubaa, T., Fagbohungbe, T., Akinfaderin, A., ... & Abbott, J. (2020). Participatory research for low-resource natural language processing: A case study in African languages. In Findings of EMNLP 2020 (pp. 2144-2160).',
    'Owoyemi, A., Owoyemi, J., Osiyemi, A., & Boyd, A. (2020). Artificial intelligence for healthcare in Africa. Frontiers in Digital Health, 2, 6.',
    'PwC. (2018). Sizing the prize: What’s the real value of AI for your business and how can you capitalise? PricewaterhouseCoopers Global.',
    'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30.',
    'World Bank. (2022). Ghana digital economy diagnostic: Accelerating digital transformation in West Africa. World Bank Group, Washington, D.C.',
    'World Health Organization. (2022). Global health workforce statistics database: Ghana country profile. WHO Regional Office for Africa.',
  ];

  references.forEach((ref) => {
    doc
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor(primaryColor)
      .text(ref, {
        lineGap: 2,
        indent: -18,
        paragraphGap: 4,
      });
  });

  doc.end();

  stream.on('finish', () => {
    const stats = fs.statSync(outputPath);
    console.log(`PDF successfully generated: ${(stats.size / 1024).toFixed(2)} KB at ${outputPath}`);
  });
}

generatePaperPDF();
