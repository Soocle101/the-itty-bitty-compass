// ============================================================================
// GLOBAL POLITICAL INVENTORY — EMPIRICAL DATA ENGINE (data.js)
// ============================================================================

const CATEGORY_META = [
    { id: "Taxation & Fiscal", count: 10, desc: "Income tax brackets, wealth taxes, corporate tax rates, capital gains, estate taxes, and national deficits." },
    { id: "Labor & Welfare", count: 10, desc: "Minimum wage, collective bargaining, UBI, welfare work rules, paid family leave, gig work, and Social Security." },
    { id: "Healthcare", count: 8, desc: "Medicare for All vs. public option vs. market care, drug pricing, medical debt, vaccines, and mental health." },
    { id: "Housing & Finance", count: 10, desc: "Rent control, institutional home buyers, zoning density, transit, the Federal Reserve, crypto, and antitrust." },
    { id: "Energy & Climate", count: 9, desc: "Fossil fuels vs. renewables, EV mandates, nuclear power, carbon pricing, public lands, and NEPA permitting." },
    { id: "Civil Liberties & Tech", count: 10, desc: "Free speech, platform moderation, NSA surveillance, encryption, facial recognition, Right to Repair, and AI." },
    { id: "Crime & Justice", count: 11, desc: "Second Amendment & gun laws, police funding, qualified immunity, death penalty, cash bail, and drug policy." },
    { id: "Culture & Education", count: 14, desc: "Abortion, youth gender medicine, school sports, DEI, reparations, school vouchers, student loans, and secularism." },
    { id: "Immigration & Trade", count: 12, desc: "Border enforcement, undocumented status, asylum, tariffs, China trade, industrial policy, and the UN." },
    { id: "Defense & Governance", count: 11, desc: "Pentagon budget, NATO, foreign military aid, Voter ID, Electoral College, Citizens United, and the Supreme Court." }
];

// Format: [Category, TopicTitle, PlainEnglishContext, [ [Statement, Econ, Social, Auth, Diplo], ... ]]
// Econ:  -2 = Left, +2 = Right | Social: -2 = Progressive, +2 = Traditional
// Auth:  -2 = Libertarian, +2 = Order/Auth | Diplo: -2 = Globalist, +2 = Nationalist
const QUESTION_BANK = [
    // --- 1-10: TAXATION & FISCAL POLICY ---
    ["Taxation & Fiscal", "Income Tax Structure", "How the federal government should tax personal earnings across different income brackets.", [
        ["High earners should pay significantly higher marginal tax rates to fund expanded public programs and reduce economic inequality.", -2, -1, 1, 0],
        ["We should keep a moderately graduated income tax where rates rise with income, while keeping rates competitive enough to encourage work.", 0, 0, 0, 0],
        ["A low, flat tax rate—or shifting toward a consumption tax—is fairer and encourages greater investment and economic growth.", 2, 0, -1, 0]
    ]],
    ["Taxation & Fiscal", "Taxing Billionaire Wealth", "Whether taxes should apply only when assets are sold or annually on total net worth.", [
        ["An annual wealth tax should be applied to ultra-high net worth individuals, including large unrealized stock holdings.", -2, -1, 1, 0],
        ["Wealth should be taxed when assets are sold or passed down, while closing loopholes that let billionaires avoid paying income tax.", 0, 0, 0, 0],
        ["Taxing unrealized gains or accumulated net worth penalizes investment and harms capital formation across the economy.", 2, 0, -1, 0]
    ]],
    ["Taxation & Fiscal", "Corporate Income Taxes", "How business profits should be taxed relative to other developed countries.", [
        ["Corporate tax rates should be raised substantially, with strict penalties on companies shifting profits to overseas tax havens.", -2, 0, 1, 0],
        ["Corporate tax rates should stay near the international average while closing special-interest deductions.", 0, 0, 0, 0],
        ["Corporate taxes should be kept as low as possible so businesses reinvest their capital into domestic jobs, equipment, and higher wages.", 2, 0, -1, 0]
    ]],
    ["Taxation & Fiscal", "Estate & Inheritance Taxes", "How wealth passed down from parents to heirs upon death should be treated.", [
        ["Large inheritances should be heavily taxed so wealth does not concentrate into a permanent generational aristocracy.", -2, -1, 1, 0],
        ["Only multi-million-dollar estates should face an estate tax, with clear exemptions for family-owned farms and small businesses.", 0, 0, 0, 0],
        ["The estate tax should be repealed entirely because families have already paid taxes on that money when it was first earned.", 2, 1, -1, 0]
    ]],
    ["Taxation & Fiscal", "Capital Gains Tax Rates", "Whether profits from long-term investments should be taxed differently than wages.", [
        ["Income from stocks and real estate investments should be taxed at the exact same rate as wages earned from working.", -2, 0, 0, 0],
        ["Long-term investments should keep a modestly lower tax rate for middle-class savers, while raising rates on top earners.", 0, 0, 0, 0],
        ["Capital gains taxes should be reduced or eliminated to encourage entrepreneurship, risk-taking, and retirement saving.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "Sales Taxes vs. Income Taxes", "Balancing taxes on what people earn versus what people buy.", [
        ["Sales taxes fall hardest on low-income households; public revenue should come primarily from progressive income and wealth taxes.", -2, -1, 0, 0],
        ["A balanced mix of income and state sales taxes works well as long as essentials like groceries and medicine are exempt.", 0, 0, 0, 0],
        ["Taxing consumption rather than income is the least destructive way to raise revenue because it rewards saving and production.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "IRS Funding & Tax Enforcement", "How tax collection and compliance audits should be administered.", [
        ["The IRS should receive expanded funding specifically to audit complex corporate partnerships and high-income tax evasion.", -2, 0, 1, 0],
        ["Tax enforcement should focus on modernizing taxpayer customer service and simplifying filing rather than expanding intrusive audits.", 0, 0, 0, 0],
        ["The tax code should be simplified so drastically that the size and enforcement power of the IRS can be significantly reduced.", 2, 0, -2, 0]
    ]],
    ["Taxation & Fiscal", "Corporate Stock Buybacks", "When companies use profits to repurchase their own shares on the stock market.", [
        ["Corporate stock buybacks should be heavily restricted so companies direct profits into worker pay and long-term research.", -2, 0, 1, 0],
        ["Stock buybacks should remain legal but subject to a modest excise tax and transparency rules.", 0, 0, 0, 0],
        ["Stock buybacks are a normal, efficient way for companies to return unused capital to shareholders to reinvest elsewhere.", 2, 0, -1, 0]
    ]],
    ["Taxation & Fiscal", "National Debt & Deficit Spending", "How the federal government should handle annual budget deficits.", [
        ["Public investment in healthcare, climate, and education is more urgent than balancing the budget, and deficits can be managed through taxes on the wealthy.", -2, 0, 0, 0],
        ["Deficits should be reduced gradually through a bipartisan combination of targeted spending restraint and revenue reforms.", 0, 0, 0, 0],
        ["Runaway government spending is a major threat to economic stability; we need strict spending caps and a balanced-budget amendment.", 2, 1, -1, 0]
    ]],
    ["Taxation & Fiscal", "Charitable Giving vs. Public Programs", "The role of private philanthropy compared to tax-funded social services.", [
        ["Essential social needs should be guaranteed through tax-funded public institutions rather than relying on private billionaire philanthropy.", -2, -1, 1, 0],
        ["Tax deductions for charitable giving are helpful complements to public safety-net programs.", 0, 0, 0, 0],
        ["Local charities, churches, and community groups help people far more effectively and humanely than federal bureaucracies.", 2, 1, -1, 0]
    ]],

    // --- 11-20: LABOR, WAGES & WELFARE ---
    ["Labor & Welfare", "Federal Minimum Wage", "How baseline hourly pay for entry-level workers should be determined.", [
        ["The federal government should mandate a living minimum wage nationwide and automatically adjust it each year for inflation.", -2, -1, 1, 0],
        ["Minimum wages should be set primarily at the state or local level to match regional differences in the cost of living.", 0, 0, 0, 0],
        ["Wages should be determined by market supply and demand so entry-level workers and small businesses aren't priced out of jobs.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Labor Unions & Collective Bargaining", "Rules governing how workers organize and negotiate with employers.", [
        ["Federal law should make it much easier for workers to unionize and penalize companies that interfere with organizing drives.", -2, -1, 1, 0],
        ["Workers should have the right to form a union by secret ballot, and also the right not to join or pay union fees if they choose.", 0, 0, 0, 0],
        ["Compulsory union rules reduce business flexibility, and collective bargaining by government employees should be restricted to protect taxpayers.", 2, 1, -1, 0]
    ]],
    ["Labor & Welfare", "Universal Basic Income (UBI)", "Proposals to provide every adult citizen with a recurring unconditional cash grant.", [
        ["A universal basic income floor should be established to guarantee economic security as automation reshapes the workforce.", -2, -1, 0, 0],
        ["Financial aid should be targeted to low-income households, the elderly, and people with disabilities rather than sent to everyone.", 0, 0, 0, 0],
        ["Unconditional cash payments discourage workforce participation and would require unsustainable tax increases or inflation.", 2, 1, 0, 0]
    ]],
    ["Labor & Welfare", "Welfare Work Requirements", "Whether able-bodied adults should be required to work or train to receive public benefits.", [
        ["Food, housing, and medical assistance are basic necessities that should be provided without bureaucratic work-reporting hurdles.", -2, -1, 0, 0],
        ["Safety-net programs should require able-bodied adults without young dependents to work, look for work, or attend job training.", 0, 0, 0, 0],
        ["Welfare benefits should be strictly time-limited and tied to work requirements to promote self-sufficiency and protect taxpayers.", 2, 1, 0, 0]
    ]],
    ["Labor & Welfare", "Paid Family & Medical Leave", "How time off for childbirth or family illness should be funded.", [
        ["The federal government should guarantee at least 12 weeks of paid family and medical leave funded through a national social insurance pool.", -2, -1, 1, 0],
        ["Paid leave should be expanded through employer tax credits and flexible state-level insurance programs.", 0, 0, 0, 0],
        ["Paid leave benefits should be offered voluntarily by employers as part of competitive compensation rather than mandated by law.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Gig Economy & App-Based Workers", "Whether rideshare and delivery drivers should be treated as employees or independent contractors.", [
        ["App-based companies should be required to classify regular drivers and couriers as employees with guaranteed wages and benefits.", -2, 0, 1, 0],
        ["Gig workers should remain independent contractors, with companies contributing to portable health and retirement benefit accounts.", 0, 0, 0, 0],
        ["Independent contracting gives people complete flexibility to work when they want, and government re-classification destroys those opportunities.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Workweek Hours & Overtime", "Rules governing standard full-time work hours and overtime pay.", [
        ["We should expand overtime pay eligibility and move toward a shorter 32-hour standard workweek without reducing pay.", -2, -1, 1, 0],
        ["Keep the 40-hour standard workweek while updating overtime salary thresholds periodically for inflation.", 0, 0, 0, 0],
        ["Workers and employers should be free to negotiate flexible schedules and comp-time without rigid federal hour rules.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Corporate Governance & Worker Representation", "Who should hold decision-making power on corporate boards of directors.", [
        ["Large corporations should be required to include worker-elected representatives on their boards of directors.", -2, -1, 1, 0],
        ["Companies should be encouraged to offer voluntary employee stock ownership plans, while keeping board selection with shareholders.", 0, 0, 0, 0],
        ["Corporations belong to the shareholders who risked their capital, and boards should focus strictly on long-term financial returns.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Social Security Solvency", "How to keep the Social Security retirement system financially solvent over the next 30 years.", [
        ["Eliminate the income cap on Social Security payroll taxes so high earners pay into the system on all of their income, and expand benefits.", -2, 0, 1, 0],
        ["Use a balanced combination of payroll tax adjustments and gradual benefit formula updates for high-income retirees.", 0, 0, 0, 0],
        ["Allow younger workers to invest a portion of their payroll taxes into personal retirement accounts that they own and control.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Childcare & Early Education", "How families should afford childcare and preschool.", [
        ["Provide universal, publicly funded childcare and pre-kindergarten so no family pays more than a small fraction of their income.", -2, -1, 1, 0],
        ["Expand the Child Tax Credit and offer sliding-scale childcare vouchers for working low- and middle-income families.", 0, 0, 0, 0],
        ["Cut licensing red tape that drives up daycare costs and support families through broad tax relief so parents can choose home or private care.", 2, 2, -1, 0]
    ]],

    // --- 21-28: HEALTHCARE & PUBLIC HEALTH ---
    ["Healthcare", "Health Insurance Structure", "How medical coverage should be organized and paid for in the United States.", [
        ["Replace private health insurance with a universal, single-payer Medicare for All system that covers every resident.", -2, -1, 1, 0],
        ["Maintain a mixed system where people can keep private or employer insurance, while offering a public option and subsidies for the uninsured.", 0, 0, 0, 0],
        ["Foster a competitive private healthcare market with tax-free Health Savings Accounts (HSAs), interstate insurance sales, and upfront price transparency.", 2, 0, -1, 0]
    ]],
    ["Healthcare", "Prescription Drug Costs", "How to lower the cost of prescription medications while maintaining medical innovation.", [
        ["The federal government should cap prescription drug prices directly across all insurance plans and override patents if prices remain excessive.", -2, 0, 1, 0],
        ["Medicare should negotiate prices on high-cost drugs that lack competition, while preserving patent incentives for new cures.", 0, 0, 0, 0],
        ["Government price controls reduce investment in new treatments; instead, speed up FDA approval of generic drugs and reform pharmacy middlemen.", 2, 0, -1, 0]
    ]],
    ["Healthcare", "Medical Debt Relief", "How unpaid hospital bills and medical debt should be handled.", [
        ["Use public funds to cancel existing medical debt and prohibit medical bills from ever appearing on consumer credit reports.", -2, -1, 1, 0],
        ["Require nonprofit hospitals to provide generous charity care to low-income patients and ban predatory medical billing practices.", 0, 0, 0, 0],
        ["Require hospitals and doctors to publish binding upfront prices before treatment so patients and insurers can shop for affordable care.", 2, 0, -1, 0]
    ]],
    ["Healthcare", "Public Health & Vaccine Requirements", "How governments should balance contagious disease prevention with personal medical choice.", [
        ["Public schools, healthcare facilities, and large employers should enforce comprehensive vaccine requirements to protect community health.", -1, -1, 2, 0],
        ["Maintain standard childhood vaccine requirements for public schools while allowing documented medical or personal exemptions.", 0, 0, 0, 0],
        ["Medical decisions must be strictly voluntary; neither governments nor employers should mandate vaccines as a condition of work or schooling.", 1, 1, -2, 0]
    ]],
    ["Healthcare", "Severe Mental Illness & Street Homelessness", "When the state should intervene with individuals experiencing severe untreated psychosis in public.", [
        ["Expand voluntary, community-based mental health housing and peer support while strictly limiting involuntary psychiatric commitment.", -2, -1, -2, 0],
        ["Fund both voluntary outpatient clinics and court-supervised inpatient treatment for individuals who cannot care for their basic safety.", 0, 0, 0, 0],
        ["Expand state psychiatric hospitals and use civil commitment laws to get severely mentally ill individuals off the streets into mandatory care.", 0, 1, 2, 0]
    ]],
    ["Healthcare", "Organ Donation Shortage", "How to increase the supply of kidneys and organs for patients on transplant waiting lists.", [
        ["Switch to an automatic 'opt-out' organ donor registry for all adults while keeping organ allocation strictly public and non-commercial.", -1, 0, 1, 0],
        ["Keep organ donation opt-in and voluntary, while reimbursing living donors fully for lost wages, travel, and medical expenses.", 0, 0, 0, 0],
        ["Allow regulated financial compensation or tax credits for living kidney donors to eliminate the transplant waiting list.", 2, 0, -1, 0]
    ]],
    ["Healthcare", "Nutrition & Excise Taxes", "Whether taxes and regulations should be used to discourage unhealthy food and beverages.", [
        ["Levy excise taxes on sugary drinks and ultra-processed foods, and restrict their marketing to reduce chronic disease.", -1, 0, 2, 0],
        ["Require clear front-of-package nutrition and ingredient disclosures without adding special taxes to groceries.", 0, 0, 0, 0],
        ["Adults are responsible for their own diets; the government should never use punitive taxes to steer personal food choices.", 1, 0, -2, 0]
    ]],
    ["Healthcare", "FDA Drug Approval & Right to Try", "How strictly the FDA should gatekeep experimental medical treatments.", [
        ["The FDA should enforce rigorous multi-stage safety and efficacy trials before any pharmaceutical can be marketed to patients.", -1, 0, 1, 0],
        ["Keep strong safety standards while using fast-track approvals for breakthrough therapies targeting rare or fatal diseases.", 0, 0, 0, 0],
        ["Expand 'Right to Try' laws and reform the FDA so informed patients and their doctors can access experimental treatments without bureaucratic delays.", 2, 0, -2, 0]
    ]],

    // --- 29-38: HOUSING, INFRASTRUCTURE & FINANCE ---
    ["Housing & Finance", "Rent Control & Tenant Protections", "How cities and states should address rising apartment rents.", [
        ["Enact national or state rent stabilization laws that cap annual rent increases and prohibit evictions without just cause.", -2, -1, 1, 0],
        ["Provide targeted rental assistance to low-income families while removing barriers to building new apartment supply.", 0, 0, 0, 0],
        ["Rent control discourages new construction and maintenance; the best way to lower rents is to let builders increase housing supply freely.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Institutional Investors in Housing", "Large investment firms purchasing single-family homes to rent them out.", [
        ["Ban large private equity firms and corporate landlords from buying single-family homes so families aren't outbid.", -2, 0, 1, 0],
        ["Remove tax advantages for large institutional home buyers while supporting first-time homebuyers.", 0, 0, 0, 0],
        ["Restricting who can buy or rent property distorts the housing market and reduces the supply of single-family rental homes.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Zoning Laws & Housing Density", "Whether single-family neighborhoods should be opened to duplexes and apartments.", [
        ["Override restrictive local zoning laws to allow multi-family apartments and public social housing near transit and jobs.", -2, -1, 1, 0],
        ["Incentivize cities to allow gentle density (like duplexes and backyard cottages) while respecting local infrastructure capacity.", 0, 0, 0, 0],
        ["Zoning decisions belong entirely to local homeowners and municipalities, not state or federal mandates.", 1, 1, 0, 0]
    ]],
    ["Housing & Finance", "Public Transit vs. Road Infrastructure", "How transportation budgets should be divided between highways and mass transit.", [
        ["Prioritize funding for frequent bus networks, passenger rail, and bike infrastructure over expanding highway lanes.", -2, -1, 1, 0],
        ["Balance transportation funding between maintaining highways and expanding mass transit in dense metropolitan corridors.", 0, 0, 0, 0],
        ["Focus transportation funds on roads, bridges, and highways that the vast majority of commuters and freight actually use.", 2, 1, -1, 0]
    ]],
    ["Housing & Finance", "The Federal Reserve & Monetary Policy", "How the central bank should manage interest rates and the money supply.", [
        ["The Federal Reserve should be more accountable to elected officials and prioritize full employment alongside green public investment.", -2, 0, 1, 0],
        ["The Federal Reserve must remain politically independent so it can control inflation and stabilize the financial system.", 0, 0, 0, 0],
        ["The Federal Reserve's money printing causes boom-and-bust cycles; its mandate should be strictly limited to price stability and audited regularly.", 2, 0, -2, 0]
    ]],
    ["Housing & Finance", "Cryptocurrency & Decentralized Finance", "How digital assets like Bitcoin and stablecoins should be regulated.", [
        ["Enforce strict banking and environmental regulations on cryptocurrency platforms to curb speculation, scams, and tax evasion.", -2, 0, 2, 0],
        ["Create clear consumer-protection and tax rules for crypto exchanges while allowing legitimate blockchain innovation.", 0, 0, 0, 0],
        ["Protect the right of individuals to hold self-custody digital assets and transact peer-to-peer without heavy-handed state interference.", 2, 0, -2, 0]
    ]],
    ["Housing & Finance", "Central Bank Digital Currency (CBDC)", "Whether the Federal Reserve should issue a digital dollar directly to citizens.", [
        ["A public digital dollar could provide free, instant payment accounts to unbanked citizens and modernize financial transfers.", -1, 0, 2, 0],
        ["Faster payment systems should operate through regulated private banks with strong statutory privacy protections.", 0, 0, 0, 0],
        ["Prohibit a retail Central Bank Digital Currency because it would give the government dangerous power to monitor or restrict personal spending.", 1, 0, -2, 0]
    ]],
    ["Housing & Finance", "Banking Regulation & Bailouts", "How to handle large financial institutions at risk of collapse.", [
        ["Break up 'too big to fail' mega-banks, reinstate strict separation between commercial and investment banking, and offer public postal banking.", -2, 0, 1, 0],
        ["Enforce strong capital reserve requirements and stress tests on large banks while protecting ordinary depositors through FDIC insurance.", 0, 0, 0, 0],
        ["Eliminate government bailouts so bank shareholders and bondholders bear the full cost of risky financial decisions.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Antitrust & Corporate Mergers", "How aggressively the government should block corporate mergers and dominant firms.", [
        ["Aggressively break up dominant corporations across tech, agriculture, and retail to reduce corporate concentration and protect workers.", -2, 0, 1, 0],
        ["Block mergers and monopolistic practices when evidence shows they raise prices or reduce choices for consumers.", 0, 0, 0, 0],
        ["Large companies often lower prices through economies of scale; antitrust shouldn't be used to punish successful businesses unless they collude.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Occupational Licensing", "Government licenses required to work in trades like cosmetology, contracting, or interior design.", [
        ["Strong licensing and certification rules are important to guarantee consumer safety, worker training, and service quality.", -1, 0, 1, 0],
        ["Require licenses for health, legal, and structural safety professions, while making licenses portable across state lines.", 0, 0, 0, 0],
        ["Eliminate unnecessary occupational licensing laws that act as guilds blocking low-income entrepreneurs from starting work.", 2, 0, -2, 0]
    ]],

    // --- 39-47: ENERGY, CLIMATE & ENVIRONMENT ---
    ["Energy & Climate", "Oil, Gas & Renewable Transition", "How quickly the energy grid and economy should transition away from fossil fuels.", [
        ["Phase out new oil, gas, and coal leases rapidly and invest heavily in wind, solar, and grid storage to reach net-zero emissions.", -2, -2, 1, -1],
        ["Pursue a gradual transition that grows renewable energy while maintaining domestic oil and natural gas for reliability and affordability.", 0, 0, 0, 0],
        ["Maximize domestic oil, natural gas, and coal production to lower energy costs for families and achieve full energy independence.", 2, 2, -1, 2]
    ]],
    ["Energy & Climate", "Electric Vehicles & Auto Emissions", "Government policies encouraging or mandating electric vehicles (EVs).", [
        ["Set strict tailpipe emission timelines that transition new passenger vehicle sales to zero-emission electric models.", -2, -1, 2, -1],
        ["Support EV charging infrastructure and optional consumer incentives, without banning gas or hybrid vehicles.", 0, 0, 0, 0],
        ["Eliminate EV subsidies and emissions mandates so car buyers can freely choose gasoline, hybrid, or electric vehicles.", 2, 1, -2, 1]
    ]],
    ["Energy & Climate", "Nuclear Energy Expansion", "The role of nuclear power plants in the clean-energy mix.", [
        ["Focus energy investments on wind, solar, and efficiency rather than building new nuclear plants that carry waste and cost risks.", -1, -1, 0, 0],
        ["Keep existing nuclear reactors operating safely and fund research into next-generation modular nuclear reactors.", 0, 0, 0, 0],
        ["Streamline nuclear regulatory approvals to rapidly build new nuclear power plants for reliable, carbon-free baseload electricity.", 2, 1, -1, 1]
    ]],
    ["Energy & Climate", "Carbon Pricing & Climate Regulations", "Whether industrial carbon emissions should be taxed or capped.", [
        ["Enforce binding carbon reduction targets and charge corporate polluters a fee for every ton of greenhouse gas emitted.", -2, -1, 1, -1],
        ["Use clean-energy tax incentives and R&D grants to make green technology cheaper rather than imposing direct carbon taxes.", 0, 0, 0, 0],
        ["Oppose carbon taxes and climate regulations that raise utility bills and put domestic manufacturers at a disadvantage against foreign competitors.", 2, 1, -1, 2]
    ]],
    ["Energy & Climate", "Federal Public Lands", "How federal lands in the American West and Alaska should be managed.", [
        ["Expand national monuments and wilderness protections, keeping public lands permanently off-limits to drilling, mining, and logging.", -2, -1, 1, 0],
        ["Manage federal lands for multiple uses—balancing national park conservation, recreation, and regulated resource leases.", 0, 0, 0, 0],
        ["Open federal lands to domestic mineral, timber, and energy production, or transfer management authority to the states.", 2, 1, -1, 1]
    ]],
    ["Energy & Climate", "Infrastructure Permitting Reform", "How environmental impact reviews (NEPA) should be handled for big building projects.", [
        ["Maintain strict environmental reviews and community lawsuit rights so pipelines, highways, and mines don't harm local ecosystems.", -2, -1, 1, 0],
        ["Keep core environmental protections, but set firm one-to-two-year deadlines on permitting reviews so clean energy and transit can be built.", 0, 0, 0, 0],
        ["Overhaul environmental permitting laws to stop activist lawsuits from delaying energy pipelines, mines, factories, and roads for years.", 2, 1, -1, 1]
    ]],
    ["Energy & Climate", "Agriculture & Environmental Rules", "Environmental regulations on livestock, fertilizers, and farming.", [
        ["Enforce stricter rules on agricultural runoff and factory-farm emissions while shifting subsidies toward sustainable and plant-based farming.", -2, -2, 1, -1],
        ["Provide voluntary conservation incentives to help farmers reduce runoff and improve soil health without hurting food production.", 0, 0, 0, 0],
        ["Roll back federal water and emissions rules on farms and ranches that drive up operating costs and grocery prices.", 2, 2, -1, 1]
    ]],
    ["Energy & Climate", "International Climate Agreements", "How domestic climate policy should relate to global accords like the Paris Agreement.", [
        ["Commit to ambitious international climate treaties and contribute funding to help developing countries transition to clean energy.", -2, -2, 0, -2],
        ["Participate in international climate agreements provided major emitters like China and India are held to transparent standards.", 0, 0, 0, -1],
        ["Withdraw from international climate accords that burden our economy while foreign competitors continue building coal plants.", 2, 2, 0, 2]
    ]],
    ["Energy & Climate", "Plastics & Packaging Regulations", "Government restrictions on single-use plastics and consumer packaging.", [
        ["Phase out single-use plastics and require manufacturers to fund nationwide recycling and compostable packaging.", -2, -1, 1, 0],
        ["Invest in better municipal recycling infrastructure and litter reduction without banning everyday plastic products.", 0, 0, 0, 0],
        ["Avoid bans and taxes on plastic bags, straws, and containers that raise costs and inconvenience consumers and small restaurants.", 2, 1, -1, 0]
    ]],

    // --- 48-57: CIVIL LIBERTIES, SPEECH & TECHNOLOGY ---
    ["Civil Liberties & Tech", "Free Speech & Offensive Expression", "Where the legal line should be drawn on controversial or hateful speech.", [
        ["Laws should restrict hate speech and organized disinformation that target vulnerable groups or undermine democratic safety.", -1, -2, 2, 0],
        ["The government must protect all speech, no matter how offensive, unless it directly incites imminent violence or defamation.", 0, 0, 0, 0],
        ["Free speech protections must be absolute, and both government agencies and major institutions must stop policing viewpoint diversity.", 0, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "Social Media Content Moderation", "How major online platforms should handle controversial political content.", [
        ["Social media companies should be held accountable for curbing hate speech, election disinformation, and algorithmic amplification of extremism.", -1, -1, 2, 0],
        ["Private platforms have the right to enforce reasonable community rules, but should offer transparent appeals and algorithmic choice.", 0, 0, 0, 0],
        ["Major platforms function as the modern public square and should be barred from de-platforming users for lawful political viewpoints.", 0, 1, -1, 0]
    ]],
    ["Civil Liberties & Tech", "National Security Surveillance", "Intelligence powers to monitor digital communications to prevent terrorism and cyberattacks.", [
        ["National security agencies need broad authority to monitor communications metadata and foreign-linked networks to prevent attacks.", 0, 0, 2, 1],
        ["Foreign intelligence collection is necessary, but querying any citizen's communications must require an individual court warrant.", 0, 0, 0, 0],
        ["End warrantless mass surveillance programs completely and enforce strict Fourth Amendment privacy protections on all digital data.", 0, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "End-to-End Encryption", "Whether tech companies should build law-enforcement access into encrypted messaging apps.", [
        ["Tech companies should be required to provide court-authorized access to encrypted messages when investigating serious crimes.", 0, 1, 2, 0],
        ["Law enforcement should rely on targeted metadata and device warrants without weakening mathematical encryption standards.", 0, 0, 0, 0],
        ["Individuals have an absolute right to strong end-to-end encryption, and government-mandated backdoors must be prohibited.", 0, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "Facial Recognition in Policing", "Use of automated facial recognition cameras by police departments.", [
        ["Ban government and police use of facial recognition technology in public spaces to prevent mass surveillance and false arrests.", 0, -1, -2, 0],
        ["Allow police to run facial recognition searches only against mugshot databases after a violent crime, with human verification.", 0, 0, 0, 0],
        ["Allow law enforcement to use live facial recognition and license-plate readers broadly to locate fugitives and missing persons.", 0, 1, 2, 0]
    ]],
    ["Civil Liberties & Tech", "Whistleblowers & Classified Leaks", "How the legal system should treat individuals who leak classified government operations.", [
        ["Whistleblowers who expose unconstitutional spying or human rights abuses to the public serve democracy and deserve legal protection.", 0, -1, -2, -1],
        ["Whistleblowers should be protected when reporting misconduct to congressional oversight committees, not when publishing secrets online.", 0, 0, 0, 0],
        ["Leaking classified defense or intelligence documents endangers national security and must be prosecuted strictly under the law.", 0, 1, 2, 1]
    ]],
    ["Civil Liberties & Tech", "Right to Repair Electronics & Equipment", "Whether manufacturers must supply parts and manuals to independent repair shops.", [
        ["Require electronics, auto, and farm-equipment makers to make parts, diagnostic tools, and repair manuals available to owners and independent shops.", -1, 0, -1, 0],
        ["Encourage authorized repair partnerships and basic consumer repairability while protecting proprietary software security.", 0, 0, 0, 0],
        ["Manufacturers should be free to design integrated hardware and set their own warranty and service rules without government mandates.", 2, 0, 1, 0]
    ]],
    ["Civil Liberties & Tech", "Consumer Data Privacy", "Rules governing how tech companies and data brokers collect and sell personal information.", [
        ["Enact strict data minimization laws that ban surveillance advertising and prohibit companies from selling personal data.", -2, -1, 1, 0],
        ["Establish a clear national privacy standard giving consumers the right to view, delete, and opt out of personal data sales.", 0, 0, 0, 0],
        ["Targeted advertising funds free online services; avoid heavy compliance regulations that hurt small internet businesses.", 2, 0, -1, 0]
    ]],
    ["Civil Liberties & Tech", "Artificial Intelligence Regulation", "How governments should approach rapidly advancing AI models.", [
        ["Establish a federal regulatory agency to test and license large AI models for safety, bias, copyright, and labor displacement before release.", -2, -1, 2, 0],
        ["Enforce existing fraud, copyright, and national security laws on AI applications without restricting open-source research.", 0, 0, 0, 0],
        ["Keep AI development open and deregulated so domestic startups and researchers stay ahead of global competitors.", 2, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "Online Age Verification", "Whether websites containing adult content or social media should verify user ages via government ID.", [
        ["Protect user privacy and free expression online by opposing laws that force adults to upload government IDs to browse the web.", 0, -2, -2, 0],
        ["Use privacy-preserving, device-level parental controls rather than requiring websites to collect personal identification documents.", 0, 0, 0, 0],
        ["Require strict age-verification checks for adult websites and require parental consent for minors to open social media accounts.", 0, 2, 2, 0]
    ]],

    // --- 58-68: GUNS, CRIME & CRIMINAL JUSTICE ---
    ["Crime & Justice", "Firearm Regulations & Rifles", "Laws governing the sale and ownership of semi-automatic firearms.", [
        ["Enact universal background checks, waiting periods, red-flag laws, and ban the sale of semi-automatic assault-style rifles and high-capacity magazines.", -1, -2, 2, 0],
        ["Enforce comprehensive background checks, safe-storage incentives, and red-flag laws for dangerous individuals while respecting legal gun ownership.", 0, 0, 0, 0],
        ["Protect the Second Amendment by opposing bans on semi-automatic rifles, magazine limits, and federal firearm registries.", 1, 2, -2, 0]
    ]],
    ["Crime & Justice", "Carrying Firearms in Public", "Rules on carrying concealed handguns outside the home for self-defense.", [
        ["Restrict carrying concealed firearms in public to law enforcement and individuals who demonstrate a specific, verified safety need.", -1, -1, 2, 0],
        ["Allow law-abiding adults to obtain a concealed carry permit after passing a background check and hands-on firearm safety training.", 0, 0, 0, 0],
        ["Recognize Constitutional Carry nationwide so law-abiding gun owners can carry for self-defense without government permits or fees.", 1, 1, -2, 0]
    ]],
    ["Crime & Justice", "Policing & Public Safety Budgets", "How cities should allocate resources between police officers and social interventions.", [
        ["Shift portions of policing budgets into unarmed crisis-response teams, youth employment, and community violence intervention programs.", -2, -2, -2, 0],
        ["Maintain fully staffed police departments while funding co-responder mental health teams, body cameras, and higher training standards.", 0, 0, 0, 0],
        ["Increase police hiring, retention pay, and proactive patrol presence to deter street crime and restore order in high-crime neighborhoods.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Police Accountability & Qualified Immunity", "Legal standards for suing police officers accused of violating civil rights.", [
        ["End qualified immunity so individuals can sue police officers directly in civil court when their constitutional rights are violated.", -1, -1, -2, 0],
        ["Reform qualified immunity and decertify abusive officers, while protecting officers who act within clear department policy.", 0, 0, 0, 0],
        ["Preserve qualified immunity so police officers can make split-second safety decisions without fear of personal financial ruin.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Civil Asset Forfeiture", "Laws allowing police to seize cash or property suspected of connection to a crime.", [
        ["Abolish civil asset forfeiture completely; the government should never permanently seize someone's property without convicting them of a crime.", 0, 0, -2, 0],
        ["Require a clear criminal conviction before seized assets can be forfeited, and send proceeds to general public funds rather than police budgets.", 0, 0, 0, 0],
        ["Allow law enforcement to use asset forfeiture aggressively to strip financial resources from drug cartels and organized crime rings.", 0, 1, 2, 0]
    ]],
    ["Crime & Justice", "Capital Punishment (Death Penalty)", "Whether the death penalty should be used for the most heinous crimes.", [
        ["Abolish the death penalty nationwide and replace it with life imprisonment due to the risk of executing innocent people.", -1, -2, -2, 0],
        ["Reserve capital punishment strictly for extreme cases of terrorism or mass murder proven with irrefutable DNA evidence.", 0, 0, 0, 0],
        ["Uphold and expedite the death penalty for heinous murders, child killers, and lethal cartel traffickers.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Cash Bail & Pretrial Release", "How courts decide whether a suspect waits in jail before their trial.", [
        ["End money bail so no one is held in jail before trial simply because they cannot afford to pay cash.", -2, -2, -1, 0],
        ["Replace cash bail with individualized risk assessments—detaining violent suspects while releasing low-risk nonviolent defendants.", 0, 0, 0, 0],
        ["Maintain strict bail and pretrial detention rules for repeat and violent offenders to stop criminals from re-offending while awaiting trial.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Sentencing & Prison Philosophy", "Whether the criminal justice system should emphasize rehabilitation or incapacitation.", [
        ["Repeal mandatory minimum sentences, reduce prison populations, and focus correctional facilities on rehabilitation and job training.", -2, -2, -2, 0],
        ["Give judges flexibility on nonviolent offenses while keeping firm sentences for violent and gun-related crimes.", 0, 0, 0, 0],
        ["Enforce truth-in-sentencing and mandatory minimum prison terms for violent and repeat offenders to protect law-abiding citizens.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Private Correctional Facilities", "Whether state and federal governments should contract with private prison companies.", [
        ["Ban for-profit private prisons and immigration detention centers so no company has a financial incentive to lock people up.", -2, -1, -1, 0],
        ["Phase out private prisons where public facilities are available, or tie private contracts strictly to inmate rehabilitation outcomes.", 0, 0, 0, 0],
        ["Allow governments to contract with private correctional facilities to relieve prison overcrowding and manage costs efficiently.", 2, 1, 1, 0]
    ]],
    ["Crime & Justice", "Drug Policy & Addiction", "How the legal system should handle cannabis and illicit narcotics.", [
        ["Legalize cannabis, decriminalize personal possession of other drugs, and treat addiction purely through public health and harm-reduction clinics.", -1, -2, -2, 0],
        ["Legalize and regulate cannabis for adults, while keeping hard drugs like fentanyl and meth illegal and expanding court-monitored rehab.", 0, 0, 0, 0],
        ["Enforce strict criminal laws against illicit drug use and impose severe penalties on fentanyl and narcotics traffickers.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Consensual Adult Sex Work", "How the law should treat prostitution between consenting adults.", [
        ["Decriminalize consensual adult sex work so workers can report violence to police and access healthcare without fear of arrest.", -1, -2, -2, 0],
        ["Avoid jailing vulnerable individuals selling sex while focusing law enforcement on buyers, pimps, and human traffickers.", 0, 0, 0, 0],
        ["Keep prostitution illegal across the board to deter exploitation, trafficking, and neighborhood disorder.", 1, 2, 2, 0]
    ]],

    // --- 69-82: CULTURE, EDUCATION & SOCIAL VALUES ---
    ["Culture & Education", "Abortion & Reproductive Laws", "Where the law should stand on abortion access and fetal protection.", [
        ["Guarantee the legal right to abortion nationwide by statute, covered by public and private health insurance.", -1, -2, -1, 0],
        ["Allow abortion during the first trimester and in cases of rape, incest, or threat to the mother's life, with restrictions on late-term procedures.", 0, 0, 0, 0],
        ["Enact strong legal protections for unborn life from conception, while increasing support for adoption and maternal care.", 1, 2, 2, 0]
    ]],
    ["Culture & Education", "Youth Gender Medicine", "Medical policies regarding puberty blockers and hormone treatments for minors under 18.", [
        ["Decisions regarding gender-affirming medical care for youth should be made by families and their doctors without state bans.", -1, -2, -1, 0],
        ["Support mental health counseling for youth while requiring comprehensive longitudinal medical evaluations before any physical interventions.", 0, 0, 0, 0],
        ["Prohibit puberty blockers, cross-sex hormones, and transition surgeries for minors under the age of 18.", 1, 2, 2, 0]
    ]],
    ["Culture & Education", "Athletic Categories in Schools", "How eligibility for girls' and women's school and college sports should be defined.", [
        ["Allow transgender students to participate in school sports teams that align with their gender identity.", -1, -2, 0, 0],
        ["Encourage inclusive co-ed and intramural leagues while letting athletic associations set fairness standards for elite varsity competition.", 0, 0, 0, 0],
        ["Require by law that female athletic categories in schools and colleges be reserved strictly for biological females.", 1, 2, 1, 0]
    ]],
    ["Culture & Education", "Affirmative Action & DEI Programs", "How universities, employers, and agencies should handle diversity and equal opportunity.", [
        ["Maintain proactive Diversity, Equity, and Inclusion (DEI) initiatives and equity programs to close systemic racial and gender gaps.", -2, -2, 1, 0],
        ["Enforce strict anti-discrimination laws and base outreach or admissions boost on socioeconomic disadvantage rather than race.", 0, 0, 0, 0],
        ["Require strictly colorblind, merit-based hiring and admissions, and eliminate institutional DEI offices and racial preferences.", 2, 2, 0, 0]
    ]],
    ["Culture & Education", "Addressing Historical Racial Disparities", "How the country should address wealth gaps rooted in historical discrimination.", [
        ["Establish targeted federal reparations and community wealth-building programs for descendants of enslaved Americans.", -2, -2, 1, 0],
        ["Invest in universal economic uplift—better schools, small business capital, and infrastructure—in all low-income communities regardless of race.", 0, 0, 0, 0],
        ["Ensure equal rights under the law today, without government programs that divide citizens by race or assign collective historical guilt.", 2, 2, 0, 0]
    ]],
    ["Culture & Education", "School Choice & Education Vouchers", "Whether parents should be able to use public education funds for private or religious schools.", [
        ["Keep all public education funding inside public schools, increasing teacher pay and resources rather than funding private school vouchers.", -2, -1, 1, 0],
        ["Support public school improvements alongside public charter schools and magnet programs that offer parents options within the public system.", 0, 0, 0, 0],
        ["Enact universal Education Savings Accounts so funding follows the child to any public, private, religious, or home school parents choose.", 2, 2, -1, 0]
    ]],
    ["Culture & Education", "School Curriculums & Parental Oversight", "How public schools should handle lessons on history, social issues, and parental rights.", [
        ["Curriculums and library books should be chosen by professional educators and librarians, teaching an honest, inclusive history without censorship.", -1, -2, 0, 0],
        ["Provide parents full transparency into classroom materials and allow opt-outs for sensitive health topics, while avoiding partisan book bans.", 0, 0, 0, 0],
        ["Give parents strong oversight over school boards and focus classrooms on core academics and civic pride rather than political activism.", 1, 2, 2, 1]
    ]],
    ["Culture & Education", "Higher Education & Student Loans", "How to handle existing student debt and the high cost of college.", [
        ["Make public colleges tuition-free and cancel significant portions of federal student loan debt to relieve young workers.", -2, -1, 1, 0],
        ["Lower student loan interest rates, offer income-based repayment, and expand funding for vocational and trade schools.", 0, 0, 0, 0],
        ["Oppose blanket student loan forgiveness—which shifts costs onto taxpayers who didn't go to college—and hold universities financially accountable for overpriced degrees.", 2, 1, -1, 0]
    ]],
    ["Culture & Education", "Religion & Secularism in Public Life", "The relationship between religious faith and government institutions.", [
        ["Maintain a strict separation of church and state, keeping government policies, courts, and public schools completely secular.", -1, -2, 0, 0],
        ["Protect the First Amendment right of religious individuals and institutions to practice their faith freely without government endorsement.", 0, 0, 0, 0],
        ["Recognize the nation's Judeo-Christian heritage in public life and strongly protect religious charities, schools, and businesses from secular mandates.", 1, 2, 2, 1]
    ]],
    ["Culture & Education", "Family Structure & Social Policy", "How tax and social policies should relate to marriage and family formation.", [
        ["Ensure tax, healthcare, and family benefits support all households equally—whether single parents, unmarried partners, or married couples.", -1, -2, -1, 0],
        ["Respect diverse personal choices in private life while eliminating marriage penalties in the tax and welfare codes.", 0, 0, 0, 0],
        ["Public policy and cultural institutions should actively encourage stable, married two-parent families as the strongest foundation for raising children.", 1, 2, 1, 1]
    ]],
    ["Culture & Education", "Medical Aid in Dying (Assisted Suicide)", "Whether terminally ill adults should be permitted to request life-ending medication.", [
        ["Competent adults suffering from terminal illness should have the legal right to request medical aid in dying with dignity.", 0, -2, -2, 0],
        ["Focus on high-quality palliative hospice care and the right to refuse artificial life support, with strict safeguards around any end-of-life laws.", 0, 0, 0, 0],
        ["Prohibit physician-assisted suicide to uphold the sanctity of life and protect elderly or disabled patients from pressure.", 0, 2, 2, 0]
    ]],
    ["Culture & Education", "National Service Programs", "Whether young adults should participate in civilian or military national service.", [
        ["Expand voluntary, paid civilian service programs like AmeriCorps and climate corps to build community and pay for college.", -1, -1, 0, 0],
        ["Keep both military and civic service completely voluntary, supported by strong GI Bill and scholarship incentives.", 0, 0, 0, 0],
        ["Promote a strong culture of patriotic national and military service to unite citizens across class and regional lines.", 0, 2, 2, 2]
    ]],
    ["Culture & Education", "Animal Welfare Standards", "Regulations on how animals are treated in agriculture, testing, and commerce.", [
        ["Enforce strict animal welfare laws banning confining cages in agriculture, cosmetic animal testing, and commercial fur farming.", -1, -2, 1, 0],
        ["Maintain humane anti-cruelty standards while allowing regulated agricultural production and essential biomedical research.", 0, 0, 0, 0],
        ["Avoid burdensome animal regulations that drive up food costs for families or slow down life-saving medical research.", 1, 2, -1, 0]
    ]],
    ["Culture & Education", "Historical Monuments & Public Names", "How cities and institutions should handle statues of controversial historical figures.", [
        ["Remove public statues honoring Confederate leaders or figures tied to racial oppression and rename public buildings to reflect inclusive values.", -1, -2, 0, -1],
        ["Add accurate historical context plaques or move disputed monuments to museums through local democratic votes.", 0, 0, 0, 0],
        ["Preserve historical monuments, memorials, and traditional names to honor national heritage and oppose erasing history.", 1, 2, 1, 2]
    ]],

    // --- 83-94: IMMIGRATION, BORDERS & GLOBAL TRADE ---
    ["Immigration & Trade", "Border Security & Enforcement", "How the national border and ports of entry should be managed.", [
        ["Focus border policy on humane asylum processing, legal pathways, and addressing root causes of migration rather than walls and detention.", -2, -2, -1, -2],
        ["Invest in border patrol personnel, surveillance technology, and more immigration judges to ensure an orderly, secure border.", 0, 0, 0, 0],
        ["Complete physical border barriers, end catch-and-release, and strictly enforce laws against unauthorized entry.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Undocumented Immigrants Living in the Country", "Policy toward long-term undocumented residents who are already in the country.", [
        ["Create a clear, accessible pathway to legal status and citizenship for undocumented immigrants who live and work in our communities.", -1, -2, -1, -2],
        ["Deport individuals who commit serious crimes, while allowing long-term undocumented workers to earn legal status after background checks and fines.", 0, 0, 0, 0],
        ["Oppose amnesty, enforce mandatory E-Verify for all employers, and prioritize deportation of individuals residing in the country unlawfully.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Asylum & Refugee Resettlement", "How the nation should handle people fleeing foreign violence or instability.", [
        ["Uphold generous asylum protections and increase annual refugee admissions to help displaced families worldwide.", -2, -2, 0, -2],
        ["Grant asylum strictly to applicants who prove credible fear of political or religious persecution through lawful ports of entry.", 0, 0, 0, 0],
        ["Tighten asylum rules so economic migrants cannot use asylum claims to bypass normal immigration waiting lines, and require claims to be made in the first safe country.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Legal Immigration Levels & Visas", "How many legal immigrants should be admitted and on what criteria.", [
        ["Expand both family-reunification and work visas to welcome immigrants across all skill levels.", -1, -2, -1, -2],
        ["Move toward a balanced system that attracts high-skilled STEM talent and fills verified labor shortages while protecting domestic wages.", 0, 0, 0, 0],
        ["Significantly reduce overall legal immigration numbers to tighten the labor market and raise wages for native-born workers.", 0, 2, 1, 2]
    ]],
    ["Immigration & Trade", "National Language & Cultural Integration", "How public institutions should balance multilingual access with a common national language.", [
        ["Provide government documents, ballots, and school support in multiple languages to ensure equal access in a multicultural society.", -1, -2, 0, -2],
        ["Support English-language classes for newcomers while keeping translations available for courts, ballots, and emergencies.", 0, 0, 0, 0],
        ["Establish English as the official national language and emphasize civic assimilation into a shared national culture.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Tariffs & Free Trade Agreements", "Whether the country should pursue open trade or protective tariffs.", [
        ["Renegotiate trade deals so they enforce strict international labor union rights and environmental standards before allowing duty-free imports.", -1, 0, 1, 0],
        ["Expand free-trade agreements with democratic allies to lower consumer prices and open foreign markets to domestic exports.", 1, 0, 0, -1],
        ["Use broad tariffs on foreign imports to protect domestic manufacturing jobs, rebuild industrial capacity, and reduce trade deficits.", 0, 1, 1, 2]
    ]],
    ["Immigration & Trade", "Economic Strategy Toward China", "How trade and technology ties with China should be handled.", [
        ["Maintain diplomatic and trade engagement with China to cooperate on global issues like climate change and avoid military escalation.", -1, -1, 0, -2],
        ["Restrict exports of sensitive military and semiconductor technologies while continuing normal trade in non-strategic consumer goods.", 0, 0, 0, 0],
        ["Aggressively decouple critical supply chains from China using high tariffs, investment bans, and reshoring incentives.", 1, 1, 2, 2]
    ]],
    ["Immigration & Trade", "Supply Chains & Industrial Policy", "Whether the government should subsidize domestic manufacturing of strategic goods.", [
        ["Use public subsidies with strict pro-union and climate conditions to build green manufacturing and domestic supply chains.", -2, -1, 1, 0],
        ["Provide targeted incentives for domestic semiconductor, medical, and defense manufacturing while keeping most industries market-driven.", 0, 0, 0, 0],
        ["Avoid government industrial subsidies where politicians pick corporate winners and losers; cut taxes and regulations for all businesses instead.", 2, 0, -1, 0]
    ]],
    ["Immigration & Trade", "Foreign Ownership of Domestic Land & Assets", "Rules on foreign individuals or companies purchasing domestic farmland and infrastructure.", [
        ["Prohibit foreign corporations and foreign state-linked entities from buying domestic farmland, water rights, and housing.", -1, 1, 1, 2],
        ["Block land or corporate purchases by adversarial foreign governments or near military bases, while welcoming allied investment.", 0, 0, 0, 0],
        ["Allow open international capital investment so domestic businesses and property owners have access to global buyers.", 2, 0, -1, -2]
    ]],
    ["Immigration & Trade", "International Organizations (UN, WHO, WTO)", "How much authority international institutions should have.", [
        ["Strengthen global cooperation through the United Nations, international courts, and multilateral treaties to solve global problems.", -2, -2, 1, -2],
        ["Work through international organizations to advance diplomatic goals without surrendering domestic constitutional authority.", 0, 0, 0, 0],
        ["Reject binding authority from unelected international bodies like the UN or WHO and prioritize national sovereignty first.", 1, 2, 0, 2]
    ]],
    ["Immigration & Trade", "Foreign Humanitarian & Development Aid", "How much money the federal budget should allocate to foreign assistance.", [
        ["Increase international humanitarian, health, and development aid to reduce global poverty, disease, and instability.", -2, -2, 0, -2],
        ["Maintain targeted foreign aid that supports strategic allies and counters the diplomatic influence of rival powers.", 0, 0, 0, -1],
        ["Drastically cut foreign aid budgets and redirect those taxpayer dollars to domestic infrastructure, veterans, and border security.", 1, 2, 0, 2]
    ]],
    ["Immigration & Trade", "Economic Sanctions Policy", "How economic sanctions should be used against hostile foreign governments.", [
        ["Avoid broad economic sanctions and embargoes that harm ordinary civilians in foreign countries, and favor diplomacy instead.", -2, -1, -1, -2],
        ["Use targeted financial sanctions against corrupt foreign regimes and military leaders in coordination with international allies.", 0, 0, 0, 0],
        ["Enforce maximum economic sanctions and secondary tariffs against adversarial regimes that threaten national security.", 1, 1, 2, 1]
    ]],

    // --- 95-105: DEFENSE, FOREIGN POLICY & DEMOCRATIC INSTITUTIONS ---
    ["Defense & Governance", "Defense Budget & Military Footprint", "How large the military budget and overseas base presence should be.", [
        ["Significantly reduce military spending, close unnecessary overseas bases, and shift funds into domestic social priorities.", -2, -2, -1, -1],
        ["Maintain a strong, modernized military capable of deterring major adversaries while auditing Pentagon contracting waste.", 0, 0, 0, 0],
        ["Expand defense spending and naval/air capacity to guarantee unmatched military deterrence against global rivals.", 2, 2, 2, 1]
    ]],
    ["Defense & Governance", "NATO & Mutual Defense Alliances", "Commitment to mutual-defense treaties in Europe and the Indo-Pacific.", [
        ["De-emphasize military blocs and focus foreign policy on diplomacy, arms control treaties, and conflict prevention.", -2, -1, -1, -1],
        ["Uphold strong commitments to NATO and Indo-Pacific allies as essential deterrents that prevent wider wars.", 0, 0, 0, -1],
        ["Require foreign allies to shoulder the primary cost of their own regional defense rather than relying on American taxpayers and troops.", 1, 1, 0, 2]
    ]],
    ["Defense & Governance", "Foreign Conflicts & Military Assistance", "How the country should respond when foreign democracies or partners face armed conflict.", [
        ["Prioritize immediate diplomatic ceasefires and humanitarian relief, and block weapons transfers if human rights laws are violated.", -2, -2, -1, -1],
        ["Provide military aid and intelligence to help democratic partners defend themselves against aggression without deploying our own combat troops.", 0, 0, 0, -1],
        ["Stay out of foreign wars that do not directly threaten vital national security interests and end open-ended foreign military aid.", 1, 1, -1, 2]
    ]],
    ["Defense & Governance", "Voting Access & Voter ID", "How election laws should balance ease of voting with ballot security.", [
        ["Maximize voter turnout with automatic voter registration, universal mail-in voting, and same-day registration without strict photo ID barriers.", -1, -2, -1, 0],
        ["Combine convenient early voting and free state-issued photo IDs with regular maintenance of accurate voter rolls.", 0, 0, 0, 0],
        ["Require government photo ID, verified citizenship, and strict limits on mail-in ballot harvesting to ensure complete confidence in election results.", 1, 2, 2, 1]
    ]],
    ["Defense & Governance", "Presidential Elections & The Electoral College", "How the President of the United States should be elected.", [
        ["Replace the Electoral College with a national popular vote so every individual ballot counts equally regardless of state.", -1, -2, 0, 0],
        ["Keep the constitutional framework, or reform states to allocate electoral votes proportionally rather than winner-take-all.", 0, 0, 0, 0],
        ["Preserve the Electoral College so presidential candidates must build broad geographic coalitions across both rural and urban states.", 1, 2, 1, 1]
    ]],
    ["Defense & Governance", "Campaign Finance Laws", "How political campaigns and independent advocacy groups should be funded.", [
        ["Overturn Citizens United, strictly cap political spending, and establish public matching funds for small-dollar political donations.", -2, -1, 1, 0],
        ["Require immediate, real-time public disclosure of all campaign donors and Super PAC funders to eliminate dark money.", 0, 0, 0, 0],
        ["Protect the First Amendment right of citizens and associations to spend money advocating for political candidates and causes without government caps.", 2, 1, -1, 0]
    ]],
    ["Defense & Governance", "Supreme Court Structure & Interpretation", "How Supreme Court justices should serve and interpret the Constitution.", [
        ["Establish 18-year term limits for Supreme Court justices and interpret the Constitution as an evolving document that adapts to modern society.", -2, -2, 1, 0],
        ["Enforce a clear judicial ethics code and bipartisan confirmation norms without changing the number of seats on the Court.", 0, 0, 0, 0],
        ["Preserve lifetime judicial tenure to protect judicial independence and appoint judges who interpret the Constitution according to its original text.", 2, 2, 1, 0]
    ]],
    ["Defense & Governance", "Congressional Ethics & Term Limits", "Reforms to make Congress more accountable to voters.", [
        ["Ban members of Congress from trading individual stocks and enact long cooling-off periods before lawmakers can become corporate lobbyists.", -1, -1, 0, 0],
        ["Require lawmakers to place financial assets into blind trusts and end partisan gerrymandering through independent redistricting commissions.", 0, 0, 0, 0],
        ["Enact constitutional term limits on members of Congress to replace career politicians with citizen legislators.", 1, 1, -1, 0]
    ]],
    ["Defense & Governance", "Federalism vs. National Standards", "How power should be divided between Washington, D.C. and the 50 states.", [
        ["Strong federal legislation is essential to guarantee uniform civil rights, labor protections, environmental rules, and social programs across every state.", -2, -2, 1, 0],
        ["The federal government should manage national defense, interstate commerce, and core safety nets while letting states innovate on local policy.", 0, 0, 0, 0],
        ["Decentralize power back to state and local governments under the 10th Amendment so diverse communities can govern themselves.", 2, 2, -2, 1]
    ]],
    ["Defense & Governance", "Federal Regulatory Agencies", "How much rule-making power executive agencies (like the EPA, SEC, or OSHA) should hold.", [
        ["Empower expert federal agencies to write and enforce strong public-interest regulations on corporations, pollution, and workplace safety.", -2, -1, 2, 0],
        ["Agencies should enforce laws passed by Congress using cost-benefit analysis and subject to normal judicial review.", 0, 0, 0, 0],
        ["Rein in the unelected administrative state by requiring Congress to vote on every major new regulation and making it easier to fire federal bureaucrats.", 2, 2, -1, 2]
    ]],
    ["Defense & Governance", "Space Exploration & Commercial Spaceflight", "How civilian and commercial activities in space should be organized.", [
        ["Keep space exploration publicly led through NASA for open scientific research and climate monitoring rather than commercial profit.", -2, -1, 1, -1],
        ["Use public-private partnerships where NASA sets scientific goals and contracts with commercial space companies to lower launch costs.", 0, 0, 0, 0],
        ["Streamline launch regulations and recognize private property rights in space to unleash commercial spaceflight, satellites, and asteroid resources.", 2, 0, -1, 1]
    ]]
];

// Coordinates: [e: EconLeft(0-100), s: SocialProg(0-100), a: CivilLib(0-100), d: Global(0-100)]
const PROFILES = [
    // --- IDEOLOGIES ---
    {
        name: "Democratic Socialist / DSA",
        sub: "US & Global Left",
        family: "Far Left / Democratic Socialist · Left / Socialist-Progressive family",
        group: "ideology",
        e: 88, s: 90, a: 64, d: 82,
        pillars: ["Medicare for All", "Worker Ownership & Unions", "Green New Deal", "Civil Rights & Anti-Militarism"],
        desc: "You favor deep structural reforms to capitalism—combining universal public goods (healthcare, higher education, housing), strong labor union power, and wealth redistribution with progressive social values, civil liberties, and a non-interventionist foreign policy."
    },
    {
        name: "Progressive Left",
        sub: "US Left",
        family: "Left / Progressive · Social Democratic-Progressive family",
        group: "ideology",
        e: 78, s: 88, a: 56, d: 80,
        pillars: ["Universal Social Safety Net", "Climate Action", "Social & Racial Equity", "Corporate Regulation"],
        desc: "You align with the modern progressive movement: advocating bold federal action to combat economic inequality, transition rapidly to clean energy, protect reproductive and LGBTQ+ rights, and curb corporate and billionaire influence in democracy."
    },
    {
        name: "Social Democrat",
        sub: "Nordic / Mixed-Economy Model",
        family: "Center-Left / Social Democrat · Welfare State family",
        group: "ideology",
        e: 72, s: 78, a: 54, d: 75,
        pillars: ["Nordic-Style Welfare State", "Collective Bargaining", "Regulated Market Economy", "International Cooperation"],
        desc: "You support a thriving private market paired with a comprehensive, universal welfare state—similar to the Nordic model. You prioritize universal healthcare, strong unions, public infrastructure, and progressive taxation without abolishing market enterprise."
    },
    {
        name: "Left-Libertarian / Civil Libertarian",
        sub: "Anti-Authoritarian Left",
        family: "Left-Libertarian · Decentralist Progressive family",
        group: "ideology",
        e: 76, s: 86, a: 88, d: 78,
        pillars: ["Civil Liberties & Privacy", "End the War on Drugs", "Worker Co-ops & Mutual Aid", "Anti-Surveillance"],
        desc: "You combine egalitarian economic views with a fierce defense of personal freedom and distrust of state coercion. You oppose both corporate monopolies and government overreach—championing digital privacy, free expression, criminal justice reform, and bodily autonomy."
    },
    {
        name: "Establishment Liberal",
        sub: "US Center-Left",
        family: "Center-Left / Liberal · Mainstream Democratic family",
        group: "ideology",
        e: 62, s: 75, a: 46, d: 78,
        pillars: ["Pragmatic Reform", "Public Option Healthcare", "Democratic Alliances (NATO)", "Inclusive Institutions"],
        desc: "You favor steady, institutional center-left governance: strengthening the social safety net, investing in clean energy and public education, defending civil rights, and maintaining strong international alliances like NATO within a regulated market economy."
    },
    {
        name: "Centrist / Pragmatic Moderate",
        sub: "US Center",
        family: "Center / Moderate · Bipartisan Pragmatist family",
        group: "ideology",
        e: 50, s: 52, a: 52, d: 55,
        pillars: ["Bipartisan Compromise", "Fiscal Responsibility", "Balanced Regulation", "Institutional Stability"],
        desc: "You reject ideological extremes on both the left and right, preferring practical, evidence-based solutions. You favor a mixed economy that rewards business growth while maintaining a targeted safety net, alongside sensible moderation on cultural and border issues."
    },
    {
        name: "Neoliberal / Market Liberal",
        sub: "Global Center-Right",
        family: "Center-Right / Market Liberal · Free-Trade Technocratic family",
        group: "ideology",
        e: 34, s: 68, a: 58, d: 85,
        pillars: ["Free Trade & Globalization", "YIMBY Housing Supply", "Market Innovation", "Socially Liberal"],
        desc: "You believe dynamic markets, free international trade, abundant housing construction, and technological innovation are the strongest engines of human prosperity—paired with socially liberal cultural views and open international engagement."
    },
    {
        name: "Classical Liberal / Moderate Libertarian",
        sub: "Fiscal Conservative, Social Moderate",
        family: "Center-Right / Classical Liberal · Individualist family",
        group: "ideology",
        e: 24, s: 60, a: 82, d: 65,
        pillars: ["Individual Liberty", "Free Enterprise & Low Taxes", "Free Speech & Due Process", "Limited Government"],
        desc: "Rooted in the tradition of constitutional liberty, you favor low taxes, free enterprise, deregulation, and strong property rights alongside personal freedom, free speech, and skepticism of both left-wing economic mandates and right-wing cultural policing."
    },
    {
        name: "Right-Libertarian",
        sub: "Free Market & Civil Liberties",
        family: "Right-Libertarian · Voluntaryist Free-Market family",
        group: "ideology",
        e: 10, s: 55, a: 94, d: 55,
        pillars: ["Maximum Personal Freedom", "Laissez-Faire Capitalism", "Sound Money & Deregulation", "Non-Interventionism"],
        desc: "You consistently prioritize voluntary exchange and individual liberty over state coercion in every sphere: slashing taxes and regulations, protecting gun and privacy rights, ending foreign wars, and stripping the federal government down to core constitutional duties."
    },
    {
        name: "Traditional Conservative",
        sub: "US Right",
        family: "Right / Conservative · Constitutionalist-Reaganite family",
        group: "ideology",
        e: 22, s: 22, a: 38, d: 35,
        pillars: ["Free Enterprise", "Constitutional Originalism", "Traditional Family Values", "Peace Through Strength"],
        desc: "You uphold the classic American conservative synthesis: free-market capitalism, lower taxes, deregulation, constitutional originalism, strong national defense, law and order, and the preservation of traditional moral and family institutions."
    },
    {
        name: "Neoconservative / Defense Conservative",
        sub: "Internationalist Right",
        family: "Right / Neoconservative · Hawkish Institutionalist family",
        group: "ideology",
        e: 26, s: 30, a: 28, d: 48,
        pillars: ["Global Military Leadership", "Strong Alliances", "Free Market Growth", "Domestic Law & Order"],
        desc: "You combine pro-business economic conservatism and domestic law-and-order policies with a muscular foreign policy—believing American military strength and leadership of democratic alliances are indispensable to preventing global chaos."
    },
    {
        name: "National Populist / America First Right",
        sub: "Populist Right",
        family: "Right-Wing Populist · Nationalist-Protectionist family",
        group: "ideology",
        e: 36, s: 15, a: 30, d: 10,
        pillars: ["Strict Border Enforcement", "Protective Tariffs & Reshoring", "Anti-Globalism", "Traditional National Culture"],
        desc: "You prioritize national sovereignty and working-class domestic industry over globalist institutions—supporting strict border security, protective tariffs to bring back manufacturing, energy dominance, traditional cultural norms, and avoiding foreign wars."
    },
    {
        name: "Paleoconservative / Traditionalist Right",
        sub: "Social & Cultural Traditionalist",
        family: "Far Right / Traditionalist · Social-Nationalist family",
        group: "ideology",
        e: 32, s: 8, a: 20, d: 12,
        pillars: ["Religious & Moral Order", "Cultural Preservation", "National Sovereignty", "Strong Family Policy"],
        desc: "You believe a healthy nation rests on religious heritage, traditional family structures, social order, and cultural cohesion—favoring strong restrictions on immigration, opposition to progressive social norms, and putting domestic communities ahead of global markets."
    },

    // --- PROMINENT POLITICAL FIGURES ---
    {
        name: "Bernie Sanders",
        sub: "US Senator (I-VT) · Democratic Socialist",
        group: "figure",
        e: 86, s: 86, a: 62, d: 74,
        desc: "Longtime independent Senator and democratic socialist championing Medicare for All, tuition-free public college, wealth taxes, and strong labor unions."
    },
    {
        name: "Alexandria Ocasio-Cortez (AOC)",
        sub: "US Representative (D-NY) · Progressive Left",
        group: "figure",
        e: 88, s: 92, a: 60, d: 82,
        desc: "Leading voice of the modern progressive wing in Congress, advocating a Green New Deal, universal healthcare, abolishing ICE, and racial/climate equity."
    },
    {
        name: "Elizabeth Warren",
        sub: "US Senator (D-MA) · Progressive Reformer",
        group: "figure",
        e: 78, s: 86, a: 52, d: 76,
        desc: "Architect of the Consumer Financial Protection Bureau, known for tough antitrust enforcement, billionaire wealth taxes, and structural regulatory reform."
    },
    {
        name: "Franklin D. Roosevelt (FDR)",
        sub: "32nd US President · New Deal Coalition",
        group: "figure",
        e: 76, s: 64, a: 36, d: 72,
        desc: "Created Social Security, federal labor protections, SEC regulation, and massive public infrastructure works under the New Deal."
    },
    {
        name: "Barack Obama",
        sub: "44th US President · Modern Center-Left",
        group: "figure",
        e: 62, s: 76, a: 46, d: 80,
        desc: "Passed the Affordable Care Act (Obamacare), Dodd-Frank financial rules, and clean-energy investments while favoring multilateral diplomacy."
    },
    {
        name: "Joe Biden",
        sub: "46th US President · Institutional Center-Left",
        group: "figure",
        e: 60, s: 72, a: 44, d: 74,
        desc: "Focused on industrial policy (CHIPS Act, Inflation Reduction Act), union jobs, NATO alliance support, and institutional Democratic governance."
    },
    {
        name: "Bill Clinton",
        sub: "42nd US President · Third Way Centrist",
        group: "figure",
        e: 46, s: 64, a: 44, d: 82,
        desc: "Champion of 'Third Way' centrism: combining NAFTA free trade, welfare work requirements, balanced federal budgets, and moderate social liberalism."
    },
    {
        name: "George W. Bush",
        sub: "43rd US President · Neoconservative",
        group: "figure",
        e: 26, s: 28, a: 26, d: 48,
        desc: "Combined across-the-board tax cuts and faith-based conservatism with the Patriot Act and an interventionist post-9/11 foreign policy."
    },
    {
        name: "Ronald Reagan",
        sub: "40th US President · Supply-Side Conservative",
        group: "figure",
        e: 18, s: 22, a: 40, d: 38,
        desc: "Defined modern American conservatism through supply-side tax cuts, deregulation, free enterprise, traditional values, and anti-Soviet military strength."
    },
    {
        name: "Donald Trump",
        sub: "45th & 47th US President · National Populist",
        group: "figure",
        e: 34, s: 16, a: 28, d: 10,
        desc: "Transformed the GOP around 'America First' nationalism: universal tariffs, strict border enforcement, energy deregulation, and skepticism of foreign alliances."
    },
    {
        name: "Ron Paul",
        sub: "Former US Representative · Constitutional Libertarian",
        group: "figure",
        e: 8, s: 52, a: 94, d: 56,
        desc: "Lifelong advocate of libertarian constitutionalism: auditing/ending the Federal Reserve, abolishing the income tax, non-interventionism, and civil liberties."
    },
    {
        name: "Javier Milei",
        sub: "President of Argentina · Free-Market Libertarian",
        group: "figure",
        e: 6, s: 36, a: 86, d: 54,
        desc: "Economist and libertarian leader famous for his 'chainsaw' cuts to government ministries, radical deregulation, privatization, and anti-socialist platform."
    },

    // --- US PARTIES & CAUCUSES ---
    {
        name: "Democratic Socialists of America (DSA)",
        sub: "US Political Organization (Left Wing)",
        group: "caucus",
        e: 90, s: 92, a: 66, d: 85,
        desc: "Advocates Medicare for All, tuition-free college, tenant unions, a Green New Deal, and democratic worker control over major industries."
    },
    {
        name: "Congressional Progressive Caucus",
        sub: "US House Democratic Caucus (~100 Members)",
        group: "caucus",
        e: 78, s: 86, a: 58, d: 78,
        desc: "The progressive wing of the Democratic Party in Congress, championing universal healthcare, labor unions, climate legislation, and taxing top earners."
    },
    {
        name: "Green Party of the United States",
        sub: "US Third Party (Eco-Progressive)",
        group: "caucus",
        e: 86, s: 88, a: 72, d: 84,
        desc: "Focuses on rapid fossil-fuel phaseout, eco-socialism, ranked-choice voting, cutting military spending, and grassroots social justice."
    },
    {
        name: "New Democrat Coalition",
        sub: "US House Democratic Caucus (Center-Left)",
        group: "caucus",
        e: 58, s: 72, a: 48, d: 76,
        desc: "Pro-growth, pragmatic center-left Democrats who support innovation, trade, public-private healthcare coverage, and mainstream liberal social policies."
    },
    {
        name: "Blue Dog Coalition",
        sub: "US House Democratic Caucus (Moderate / Fiscal Hawk)",
        group: "caucus",
        e: 48, s: 52, a: 48, d: 56,
        desc: "Moderate and rural-district Democrats emphasizing fiscal restraint, national defense, border security, and bipartisan compromise."
    },
    {
        name: "Problem Solvers Caucus",
        sub: "Bipartisan US House Caucus (Centrist)",
        group: "caucus",
        e: 46, s: 50, a: 50, d: 55,
        desc: "An evenly split caucus of moderate Democrats and Republicans focused on bipartisan infrastructure, budget, and immigration deals."
    },
    {
        name: "Republican Governance Group (Main Street)",
        sub: "US House Republican Caucus (Center-Right)",
        group: "caucus",
        e: 32, s: 38, a: 45, d: 48,
        desc: "Pragmatic, business-minded Republicans representing suburban and swing districts who favor fiscal conservatism and governing stability."
    },
    {
        name: "Republican Study Committee",
        sub: "US House Republican Caucus (Mainstream Conservative)",
        group: "caucus",
        e: 20, s: 20, a: 36, d: 30,
        desc: "The largest conservative caucus in Congress, advancing tax cuts, deregulation, strong defense, pro-life policies, and border security."
    },
    {
        name: "House Freedom Caucus",
        sub: "US House Republican Caucus (Populist / Hardline Right)",
        group: "caucus",
        e: 18, s: 12, a: 32, d: 12,
        desc: "Populist and constitutional conservatives pushing for deep federal spending cuts, strict border enforcement, America First trade, and dismantling federal agencies."
    },
    {
        name: "Libertarian Party (US)",
        sub: "US Third Party (Free Market & Civil Liberties)",
        group: "caucus",
        e: 10, s: 58, a: 95, d: 60,
        desc: "Advocates laissez-faire capitalism, abolishing the income tax, gun rights, ending drug prohibition, civil liberties, and military non-intervention."
    },

    // --- INTERNATIONAL PARTIES ---
    {
        name: "La France Insoumise / Die Linke",
        sub: "France & Germany (Democratic Socialist Left)",
        group: "international",
        e: 86, s: 86, a: 62, d: 78,
        desc: "European left-wing parties championing wealth taxes, lower retirement ages, public ownership of utilities, and strong worker protections."
    },
    {
        name: "New Democratic Party (NDP)",
        sub: "Canada (Social Democratic)",
        group: "international",
        e: 76, s: 84, a: 56, d: 78,
        desc: "Canada's social-democratic party, backing universal pharmacare, dental care, union rights, affordable housing, and climate action."
    },
    {
        name: "Labour Party (UK) / SPD (Germany) / ALP (Australia)",
        sub: "UK, Germany & Australia (Mainstream Center-Left)",
        group: "international",
        e: 66, s: 74, a: 48, d: 74,
        desc: "Governing center-left labor parties that pair market economies with universal public healthcare, worker rights, and green industrial investment."
    },
    {
        name: "Green Party (Bündnis 90 / UK & European Greens)",
        sub: "Europe & Commonwealth (Eco-Progressive)",
        group: "international",
        e: 74, s: 88, a: 60, d: 85,
        desc: "Focused on rapid decarbonization, renewable energy, social progressive rights, public transit, and international human rights."
    },
    {
        name: "Liberal Party (Canada) / Liberal Democrats (UK)",
        sub: "Canada & UK (Social Liberal Centrist)",
        group: "international",
        e: 56, s: 76, a: 54, d: 82,
        desc: "Centrist social-liberal parties combining regulated capitalism, international trade, civil liberties, and progressive social inclusion."
    },
    {
        name: "Renaissance (France) / D66 (Netherlands)",
        sub: "Europe (Market-Liberal Centrist)",
        group: "international",
        e: 40, s: 68, a: 46, d: 85,
        desc: "Pro-European, technocratic centrist parties emphasizing pro-business labor reforms, economic competitiveness, and socially liberal values."
    },
    {
        name: "Free Democratic Party (FDP) / ACT Party",
        sub: "Germany & New Zealand (Classical Liberal)",
        group: "international",
        e: 22, s: 64, a: 80, d: 70,
        desc: "Classical-liberal parties dedicated to free enterprise, lower taxes, digital privacy, individual freedom, and cutting red tape."
    },
    {
        name: "Conservative Party (UK) / CDU (Germany) / CPC (Canada)",
        sub: "UK, Germany & Canada (Center-Right Conservative)",
        group: "international",
        e: 28, s: 34, a: 40, d: 44,
        desc: "Major center-right parties advocating market growth, fiscal discipline, controlled immigration, law and order, and Western security alliances."
    },
    {
        name: "Reform UK / National Rally (France) / Fratelli d'Italia",
        sub: "Europe (National Populist Right)",
        group: "international",
        e: 34, s: 16, a: 30, d: 12,
        desc: "Sovereigntist right-wing parties focused on halting illegal migration, protecting national identity, opposing green mandates, and prioritizing domestic workers."
    },
    {
        name: "La Libertad Avanza (Argentina)",
        sub: "Argentina (Libertarian Right)",
        group: "international",
        e: 8, s: 36, a: 86, d: 52,
        desc: "Free-market libertarian movement advocating radical deregulation, privatization of state enterprises, sound money, and shrinking government ministries."
    }
];

// Pew Research Center Political Typology Empirical Groups
const PEW_TYPOLOGIES = [
    { name: "Progressive Left (~6% of US Public)", e: 86, s: 90, desc: "Hold very liberal views across nearly all economic, racial, climate, and social issues; highly engaged in politics." },
    { name: "Establishment Liberals (~13% of US Public)", e: 66, s: 78, desc: "Strongly Democratic and socially liberal, but favor pragmatic, institutional reform over sweeping overhaul." },
    { name: "Democratic Mainstays (~16% of US Public)", e: 68, s: 58, desc: "Loyal center-left voters who strongly back the social safety net and unions while holding more moderate cultural views." },
    { name: "Outsider Left (~10% of US Public)", e: 74, s: 82, desc: "Younger, economically left-leaning and socially progressive, but skeptical of both major political parties." },
    { name: "Stressed Sideliners (~15% of US Public)", e: 52, s: 48, desc: "Economically populist/pro-safety-net and culturally moderate voters who sit near the empirical center of the electorate." },
    { name: "Ambivalent Right (~12% of US Public)", e: 26, s: 58, desc: "Favor free markets, smaller government, and low taxes, but hold more moderate or libertarian views on social issues." },
    { name: "Committed Conservatives (~7% of US Public)", e: 18, s: 22, desc: "Hold consistently conservative views across Reaganite free enterprise, limited government, and traditional values." },
    { name: "Populist Right (~11% of US Public)", e: 36, s: 14, desc: "Strongly nationalist and anti-immigration; skeptical of both big government and large multinational corporations." },
    { name: "Faith and Flag Conservatives (~10% of US Public)", e: 22, s: 10, desc: "Highly religious and socially traditionalist voters who favor strong national defense and Christian heritage in public life." }
];
