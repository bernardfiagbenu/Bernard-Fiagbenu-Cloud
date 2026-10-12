const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const papers = [
  {
    slug: 'ai-computing',
    title: "Problem-Driven Artificial Intelligence for Ghana: Addressing National Computational Bottlenecks through Indigenous Language Classifiers and Edge Metaheuristics",
    abstract: "Developing nations face technological exclusion if AI models remain calibrated exclusively to Western linguistic corpora and foreign GPU clouds. This research establishes an evidence-based roadmap identifying the top five computational obstacles confronting Ghana and delivers tangible field-deployable solutions. We evaluated national datasets from the Ghana Statistical Service and the Ministry of Communications and Digitalisation, scoring bottlenecks across impact, urgency, empirical evidence, and technical tractability. This research systematically addresses five national bottlenecks: indigenous language training data scarcity, cloud GPU foreign exchange costs, localized computer science curricula deficits, fragmented government data governance, and agricultural model adoption inertia. As a tangible open-source artifact, we built and validated a deterministic Ghanaian language identification and text classification prototype supporting Akan/Twi, Ewe, Ga, and Ghanaian English in /prototypes/ai-computing/.",
    keywords: "Artificial Intelligence, Indigenous Languages, Edge Metaheuristics, Data Scarcity, Compute Sovereignty, Ghana"
  },
  {
    slug: 'telecommunications',
    title: "Problem-Driven Telecommunications Infrastructure for Ghana: Phased Array Beamforming and Renewable Backhaul Architecture for Rural Connectivity",
    abstract: "Substantial geographic disparities in telecommunications infrastructure persist across Ghana, leaving agrarian districts disconnected from the formal digital economy. This research analyzes the five most severe telecommunications infrastructure challenges in Ghana and formulates actionable electromagnetic and system engineering interventions. Using national regulatory data from the National Communications Authority (NCA) and international benchmarks from the ITU, candidate bottlenecks were evaluated across impact, urgency, empirical evidence, and technical feasibility. This paper examines the five primary telecommunications bottlenecks in Ghana: rural connectivity deficits, base station power unreliability, sub-6 GHz spectrum interference, high mobile data pricing, and transmission line telemetry gaps. As a tangible technical contribution, we engineered and validated a 3.5 GHz sub-6 GHz phased array antenna calculator and beamforming simulation tool in /prototypes/telecommunications/.",
    keywords: "Telecommunications Infrastructure, Phased Array Antennas, Rural 5G FWA, NCA Ghana, Grating Lobe Suppression, Renewable Base Stations"
  },
  {
    slug: 'edtech',
    title: "Problem-Driven Educational Technology for Ghanaian Higher Education: An Offline-First Learning Management Engine and UTAUT Implementation Protocol",
    abstract: "Higher educational institutions across Ghana face chronic infrastructural constraints that undermine digital learning initiatives following rapid post-pandemic enrollment growth. This paper investigates the top five pedagogical and infrastructural obstacles facing Ghanaian university students and designs a zero-rated, offline-first learning content engine. We analyzed empirical data from the Ghana Tertiary Education Commission (GTEC) and regional university repositories, applying formal scoring criteria across scale of impact, urgency, empirical evidence, and technical tractability. This research targets the five primary educational technology bottlenecks in Ghana: mobile internet data costs, frequent power load shedding, faculty LMS adoption resistance, indigenous curriculum scarcity, and virtual laboratory deficits. As a tangible open-source artifact, we designed, built, and tested an offline-first learning management engine featuring zero-rated micro-content packaging and asynchronous synchronization in /prototypes/edtech/.",
    keywords: "Educational Technology, Offline-First LMS, UTAUT Protocol, Ghanaian Higher Education, Digital Divide, Load Shedding Mitigation"
  },
  {
    slug: 'supply-chain',
    title: "Problem-Driven Maritime Logistics for Ghana: Cryptographic Consignment Auditing and Port Clearance Optimization for Tema and Takoradi Ports",
    abstract: "Maritime cargo clearance through Ghana's primary ports serves as the vital commercial conduit for both the domestic economy and landlocked Sahelian neighbors. This paper investigates the top five supply chain bottlenecks in Ghanaian port logistics and develops an immutable cryptographic consignment audit ledger extending China Xpress. We evaluated logistics performance indicators from the Ghana Ports and Harbours Authority (GPHA), Ghana Revenue Authority (GRA), and World Bank Logistics Performance Index (LPI), ranking candidate bottlenecks using formal multicriteria scoring. This paper targets the five critical supply chain bottlenecks in Ghana: container demurrage disputes at Tema Port, customs document forgery, maritime shipment tracking opacity, SME import trade finance barriers, and inter-agency digital silos. As a tangible open-source artifact, we engineered and verified a cryptographic consignment manifest audit ledger module in /prototypes/supply-chain/ extending the operational China Xpress platform.",
    keywords: "Maritime Logistics, Tema Port, Takoradi Port, China Xpress, Cryptographic Auditing, ICUMS, Demurrage Reduction"
  },
  {
    slug: 'energy',
    title: "Problem-Driven Renewable Energy and Workplace Safety for Ghana: Techno-Economic Optimization of Rooftop Solar in Accra and Act 328 OHS Protocols",
    abstract: "Urban residential electricity consumers across Ghana experience severe utility tariff increases alongside recurring transmission outages, yet decentralized rooftop solar adoption remains impeded by financing hurdles and safety deficits. This research determines the top five energy and occupational safety obstacles in Ghana and engineers a techno-economic sizing engine paired with an Act 328 workplace safety protocol. Using national telemetry from the Energy Commission of Ghana, Public Utilities Regulatory Commission (PURC), and NASA POWER solar irradiance data (5.14 kWh/m2/day annual GHI), candidate problems were evaluated across formal multicriteria ranking metrics. This paper targets the five definitive energy and occupational safety bottlenecks in Ghana: grid distribution unreliability, high residential solar capital costs, amateur system sizing failures, toxic battery e-waste dumping, and installation fall and electrocution hazards. As a tangible open-source artifact, we developed and validated a rooftop solar PV sizing, LCOE, and PURC tariff payback engine with integrated Act 328 OHS protocols in /prototypes/energy/.",
    keywords: "Renewable Energy, Solar Photovoltaic, LCOE, PURC Electricity Tariffs, Accra, Occupational Health and Safety, Act 328"
  }
];

function generatePDFs() {
  const papersDir = path.join(__dirname, '../public/papers');
  if (!fs.existsSync(papersDir)) {
    fs.mkdirSync(papersDir, { recursive: true });
  }

  papers.forEach((p) => {
    const filePath = path.join(papersDir, `${p.slug}.pdf`);
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 54, bottom: 54, left: 54, right: 54 },
      info: {
        Title: p.title,
        Author: 'BERNARD FIAGBENU',
        Subject: 'Problem-Driven Academic Research Paper',
        Keywords: p.keywords,
      },
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const primaryColor = '#111111';
    const secondaryColor = '#444444';
    const accentRule = '#888888';

    // Running Header
    doc
      .font('Helvetica')
      .fontSize(8)
      .fillColor(secondaryColor)
      .text('BERNARD FIAGBENU · WORKING PAPERS IN APPLIED COMPUTING · ACCRA, GHANA', { align: 'center' });

    doc.moveDown(1);

    // Title
    doc
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .fontSize(14)
      .text(p.title, { align: 'center', lineGap: 3 });

    doc.moveDown(0.75);

    // Author line
    doc
      .font('Helvetica')
      .fontSize(10)
      .fillColor(secondaryColor)
      .text('BERNARD FIAGBENU', { align: 'center' })
      .text('Computer Scientist · [Affiliation]', { align: 'center' })
      .text('October 2026 · Problem-to-Solution Research Paper', { align: 'center' });

    doc.moveDown(0.5);

    doc
      .strokeColor(accentRule)
      .lineWidth(0.5)
      .moveTo(54, doc.y)
      .lineTo(541, doc.y)
      .stroke();

    doc.moveDown(0.75);

    // Abstract
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(primaryColor)
      .text('ABSTRACT');

    doc.moveDown(0.3);

    doc
      .font('Times-Roman')
      .fontSize(9.5)
      .fillColor(primaryColor)
      .text(p.abstract, { align: 'justify', lineGap: 2.5 });

    doc.moveDown(0.5);

    // Keywords
    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .text('Keywords: ', { continued: true })
      .font('Helvetica')
      .text(p.keywords);

    doc.moveDown(0.75);

    doc
      .strokeColor(accentRule)
      .lineWidth(0.5)
      .moveTo(54, doc.y)
      .lineTo(541, doc.y)
      .stroke();

    doc.moveDown(0.75);

    // Core Problem-to-Solution Overview
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(primaryColor)
      .text('PROBLEM-TO-SOLUTION SUMMARY & OPEN ARTIFACT');

    doc.moveDown(0.3);

    doc
      .font('Times-Roman')
      .fontSize(9.5)
      .text(
        'This publication presents an empirical pathway connecting established computational and engineering theory to physical, field-validated artifacts addressing five ranked national problems in Ghana. A runnable, tested open-source prototype has been authored and published under an MIT license in the repository directory /prototypes/' + p.slug + '/ with automated unit test suites.',
        { align: 'justify', lineGap: 2.5 }
      );

    doc.moveDown(1);

    // Footer note
    doc
      .font('Helvetica')
      .fontSize(8)
      .fillColor(secondaryColor)
      .text('Canonical Web Reader: https://bernardfiagbenu.vercel.app/research/' + p.slug, { align: 'center' });

    doc.end();
    console.log(`Generated Problem-to-Solution PDF: ${p.slug}.pdf`);
  });
}

generatePDFs();
