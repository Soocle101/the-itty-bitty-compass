// ============================================================================
// GLOBAL POLITICAL INVENTORY — UNBIASED EMPIRICAL DATA ENGINE (data.js)
// ============================================================================

const CATEGORY_META = [
    { id: "Taxation & Fiscal", count: 10, desc: "Income tax brackets, wealth taxes, corporate tax rates, capital gains, estate taxes, and national deficits." },
    { id: "Labor & Welfare", count: 10, desc: "Minimum wage, collective bargaining, UBI, welfare work rules, paid family leave, gig work, and Social Security." },
    { id: "Healthcare", count: 8, desc: "Single-payer vs. public option vs. market care, drug pricing, medical debt, vaccines, and mental health." },
    { id: "Housing & Finance", count: 10, desc: "Rent control, institutional home buyers, zoning density, transit, the Federal Reserve, crypto, and antitrust." },
    { id: "Energy & Climate", count: 9, desc: "Fossil fuels vs. renewables, EV mandates, nuclear power, carbon pricing, public lands, and NEPA permitting." },
    { id: "Civil Liberties & Tech", count: 10, desc: "Free speech, platform moderation, NSA surveillance, encryption, facial recognition, Right to Repair, and AI." },
    { id: "Crime & Justice", count: 11, desc: "Second Amendment & gun laws, police funding, qualified immunity, death penalty, cash bail, and drug policy." },
    { id: "Culture & Education", count: 14, desc: "Abortion, youth gender medicine, school sports, DEI, reparations, school vouchers, student loans, and secularism." },
    { id: "Immigration & Trade", count: 12, desc: "Border enforcement, undocumented status, asylum, tariffs, China trade, industrial policy, and the UN." },
    { id: "Defense & Governance", count: 11, desc: "Pentagon budget, NATO, foreign military aid, Voter ID, Electoral College, Citizens United, and the Supreme Court." }
];

// Format: [Category, TopicTitle, PlainEnglishContext, [ [Statement, Econ, Social, Auth, Diplo], ... ]]
// Econ:  -2 = Left (Socialist/Public), +2 = Right (Market/Private)
// Social: -2 = Progressive, +2 = Traditional/Conservative
// Auth:  -2 = Civil Libertarian, +2 = State Order/Authority (Unbundled from pure fiscal policy)
// Diplo: -2 = Globalist/Internationalist, +2 = Nationalist/Sovereigntist
const QUESTION_BANK = [
    // --- 1-10: TAXATION & FISCAL POLICY ---
    ["Taxation & Fiscal", "Income Tax Structure", "How the federal government should tax personal earnings across different income brackets.", [
        ["Raise top marginal income tax rates significantly on high earners to fund universal public programs and compress income disparities.", -2, 0, 0, 0],
        ["Maintain a graduated income tax system with multiple brackets and targeted deductions for middle-income households.", 0, 0, 0, 0],
        ["Replace the graduated income tax with a single flat tax rate or a national consumption tax.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "Taxing Accumulated Wealth", "Whether taxes should apply annually to total net worth or only when assets are sold.", [
        ["Levy an annual net-worth tax on multi-millionaires and billionaires, including large unrealized stock holdings.", -2, 0, 0, 0],
        ["Tax investment wealth only when assets are sold or transferred, while eliminating step-up basis loopholes.", 0, 0, 0, 0],
        ["Prohibit taxes on net worth or unrealized capital gains so invested capital remains undisturbed in the private sector.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "Corporate Income Taxes", "How business profits should be taxed relative to other developed economies.", [
        ["Increase the statutory corporate tax rate and impose strict financial penalties on offshore profit shifting.", -2, 0, 0, 0],
        ["Set corporate tax rates near the OECD international average while phasing out industry-specific tax credits.", 0, 0, 0, 0],
        ["Reduce or eliminate the corporate income tax to maximize domestic capital investment and business hiring.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "Estate & Inheritance Taxes", "How wealth passed down from parents to heirs upon death should be treated.", [
        ["Impose high estate tax rates on large inheritances to limit the concentration of dynastic family wealth.", -2, -1, 0, 0],
        ["Apply an estate tax only to estates exceeding a high multi-million-dollar threshold, exempting family farms and small businesses.", 0, 0, 0, 0],
        ["Repeal the federal estate tax completely so families can transfer 100% of their after-tax assets to their heirs.", 2, 1, 0, 0]
    ]],
    ["Taxation & Fiscal", "Capital Gains Tax Rates", "Whether profits from long-term investments should be taxed differently than wages.", [
        ["Tax income from stocks, dividends, and real estate sales at the exact same schedule as ordinary wage income.", -2, 0, 0, 0],
        ["Maintain a lower tax rate on long-term capital gains for middle-income savers while taxing top-bracket gains at ordinary rates.", 0, 0, 0, 0],
        ["Eliminate or sharply reduce capital gains taxes to incentivize investment, venture capital, and retirement savings.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "Sales Taxes vs. Income Taxes", "How public revenue should be divided between taxes on earnings and taxes on consumption.", [
        ["Rely primarily on progressive income and wealth taxes rather than sales or consumption taxes.", -2, 0, 0, 0],
        ["Combine federal income taxes with state-level sales taxes that exempt staple goods like groceries and medicine.", 0, 0, 0, 0],
        ["Shift the tax system toward consumption and sales taxes rather than taxing personal and business income.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "IRS Funding & Tax Enforcement", "How tax collection and compliance audits should be administered.", [
        ["Expand IRS enforcement budgets to audit complex corporate partnerships, trusts, and high-income filings.", -2, 0, 1, 0],
        ["Focus IRS funding on automated return processing and taxpayer assistance while keeping audit rates at historical norms.", 0, 0, 0, 0],
        ["Simplify the tax code into a standard-deduction postcard system and significantly reduce the size and investigative power of the IRS.", 2, 0, -1, 0]
    ]],
    ["Taxation & Fiscal", "Corporate Stock Buybacks", "When publicly traded companies use profits to repurchase their own shares on the open market.", [
        ["Prohibit corporate stock buybacks so company earnings are directed toward worker compensation and operational R&D.", -2, 0, 1, 0],
        ["Permit corporate stock buybacks subject to a small federal excise tax and public disclosure periods.", 0, 0, 0, 0],
        ["Allow companies to repurchase their own shares freely without special taxes or regulatory restrictions.", 2, 0, -1, 0]
    ]],
    ["Taxation & Fiscal", "National Debt & Deficit Spending", "How the federal government should manage annual budget deficits.", [
        ["Prioritize full funding for healthcare, infrastructure, and climate programs over deficit reduction, raising revenue from top brackets as needed.", -2, 0, 0, 0],
        ["Reduce budget deficits over time through a combination of entitlement adjustments, discretionary caps, and tax revenue increases.", 0, 0, 0, 0],
        ["Enact statutory federal spending caps and a constitutional balanced-budget amendment that restricts deficit spending.", 2, 0, 0, 0]
    ]],
    ["Taxation & Fiscal", "Public Social Programs vs. Private Philanthropy", "The role of tax-funded agencies compared to private charities in addressing poverty.", [
        ["Fund social services universally through public taxation rather than relying on tax-deductible private philanthropy.", -2, -1, 0, 0],
        ["Operate public safety-net programs alongside tax deductions for registered nonprofit and charitable donations.", 0, 0, 0, 0],
        ["Scale back federal social agencies and expand tax credits for private charities, mutual-aid groups, and religious organizations.", 2, 1, 0, 0]
    ]],

    // --- 11-20: LABOR, WAGES & WELFARE ---
    ["Labor & Welfare", "Minimum Wage Laws", "How baseline hourly pay for entry-level workers should be determined.", [
        ["Establish a federal living minimum wage nationwide and index it automatically to annual inflation.", -2, 0, 0, 0],
        ["Set minimum wage rates at the state and municipal level based on local cost-of-living metrics.", 0, 0, 0, 0],
        ["Repeal statutory minimum wage laws so hourly compensation is determined by labor market supply and demand.", 2, 0, 0, 0]
    ]],
    ["Labor & Welfare", "Labor Unions & Right-to-Work", "Rules governing how workers organize and whether union dues can be mandatory.", [
        ["Repeal state 'Right-to-Work' laws, allow card-check union certification, and penalize employers for anti-union campaigns.", -2, 0, 0, 0],
        ["Guarantee secret-ballot union elections while allowing individual workers in unionized workplaces to opt out of non-bargaining dues.", 0, 0, 0, 0],
        ["Enact national 'Right-to-Work' protections and restrict collective bargaining by government employee unions.", 2, 0, 0, 0]
    ]],
    ["Labor & Welfare", "Universal Basic Income (UBI)", "Proposals to provide every adult citizen with a recurring unconditional cash grant.", [
        ["Establish a universal basic income floor paid monthly to every adult resident regardless of employment status.", -2, -1, 0, 0],
        ["Limit government cash assistance to means-tested programs for low-income families, seniors, and disabled citizens.", 0, 0, 0, 0],
        ["Oppose universal cash stipends and phase out direct income-transfer programs in favor of private employment.", 2, 1, 0, 0]
    ]],
    ["Labor & Welfare", "Welfare Eligibility & Work Rules", "Whether able-bodied adults should be required to work or train to receive public benefits.", [
        ["Provide food, housing, and medical assistance as unconditional entitlements without work-reporting requirements.", -2, -1, 0, 0],
        ["Require able-bodied adults without young dependents to work, search for work, or attend vocational training to receive benefits.", 0, 0, 0, 0],
        ["Enforce strict lifetime time limits and work requirements on all public assistance programs to reduce government expenditure.", 2, 1, 0, 0]
    ]],
    ["Labor & Welfare", "Paid Family & Medical Leave", "How time off for childbirth or family illness should be funded.", [
        ["Create a mandatory federal social-insurance program guaranteeing at least 12 weeks of paid family and medical leave.", -2, -1, 0, 0],
        ["Offer federal tax credits to employers that voluntarily provide paid leave, paired with optional state-run insurance pools.", 0, 0, 0, 0],
        ["Leave family and medical time-off policies to private negotiation between employers and employees without federal mandates.", 2, 0, 0, 0]
    ]],
    ["Labor & Welfare", "Gig Economy Worker Classification", "Whether app-based rideshare and delivery drivers should be classified as employees or contractors.", [
        ["Require app-based platforms to classify regular drivers and couriers as full W-2 employees with statutory benefits and wage floors.", -2, 0, 1, 0],
        ["Maintain independent contractor status for gig workers while requiring platforms to contribute to portable benefit accounts.", 0, 0, 0, 0],
        ["Allow workers and platforms to contract freely as independent 1099 contractors without government re-classification.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Standard Workweek & Overtime Rules", "Regulations governing full-time weekly hours and overtime pay thresholds.", [
        ["Lower the statutory full-time workweek to 32 hours with no reduction in pay and expand mandatory overtime eligibility.", -2, 0, 1, 0],
        ["Maintain the 40-hour statutory workweek and update salaried overtime pay thresholds periodically for inflation.", 0, 0, 0, 0],
        ["Allow employers and employees to negotiate flexible hours and compensatory time off without federal workweek restrictions.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Corporate Boards & Worker Ownership", "Who should hold decision-making seats on corporate boards of directors.", [
        ["Require large corporations to allocate a percentage of board seats to worker-elected representatives and share equity with employees.", -2, 0, 1, 0],
        ["Provide tax incentives for voluntary employee stock ownership plans (ESOPs) while keeping board elections with shareholders.", 0, 0, 0, 0],
        ["Keep corporate governance strictly in the hands of shareholders and capital owners.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Social Security Retirement System", "How to manage the long-term finances of Social Security.", [
        ["Remove the income cap on Social Security payroll taxes so high earners pay tax on all earnings, and increase monthly benefit payouts.", -2, 0, 0, 0],
        ["Adjust the payroll tax cap and gradually index the retirement age to longevity to keep the existing trust fund solvent.", 0, 0, 0, 0],
        ["Allow workers to direct their payroll taxes into personal investment accounts that they own and pass on to heirs.", 2, 0, -1, 0]
    ]],
    ["Labor & Welfare", "Childcare & Early Childhood Policy", "How families should afford daycare and preschool.", [
        ["Establish universal, publicly funded childcare and pre-kindergarten programs with capped copayments for all families.", -2, -1, 0, 0],
        ["Fund means-tested childcare vouchers for low-income workers alongside an expanded Child Tax Credit.", 0, 0, 0, 0],
        ["Reduce state licensing regulations on daycare providers and provide broad family tax relief that supports stay-at-home or private care.", 2, 1, -1, 0]
    ]],

    // --- 21-28: HEALTHCARE & PUBLIC HEALTH ---
    ["Healthcare", "National Health Insurance Model", "How medical coverage should be organized and financed.", [
        ["Establish a universal, single-payer Medicare for All system funded by taxes, replacing private health insurance.", -2, 0, 0, 0],
        ["Operate a government-run public option plan that competes alongside private employer and individual insurance plans.", 0, 0, 0, 0],
        ["Rely on private health insurance, expanded tax-free Health Savings Accounts (HSAs), and deregulation of interstate insurance sales.", 2, 0, 0, 0]
    ]],
    ["Healthcare", "Prescription Drug Pricing", "How prescription medication prices should be regulated.", [
        ["Empower a federal board to set maximum price caps on all prescription drugs and issue compulsory licenses on patents.", -2, 0, 1, 0],
        ["Allow Medicare and public plans to negotiate prices on high-cost drugs after their initial exclusivity period.", 0, 0, 0, 0],
        ["Avoid government price controls on pharmaceuticals; instead, accelerate FDA approval of competing generics and biologics.", 2, 0, -1, 0]
    ]],
    ["Healthcare", "Medical Debt & Hospital Billing", "How unpaid medical bills and hospital pricing should be handled.", [
        ["Use federal funds to retire existing patient medical debt and prohibit medical bills from being reported to credit bureaus.", -2, 0, 0, 0],
        ["Enforce charity-care requirements on tax-exempt nonprofit hospitals and cap out-of-network surprise billing.", 0, 0, 0, 0],
        ["Enforce mandatory upfront price disclosure by hospitals and clinics so patients and insurers can compare costs before care.", 2, 0, 0, 0]
    ]],
    ["Healthcare", "Vaccine Mandates & Public Health", "How governments should handle immunization requirements for schools and workplaces.", [
        ["Enforce mandatory immunization schedules for public schools, healthcare workers, and large employers with medical exemptions only.", 0, -1, 2, 0],
        ["Require standard childhood vaccinations for public school attendance while permitting documented religious or personal exemptions.", 0, 0, 0, 0],
        ["Prohibit government agencies and private employers from mandating any vaccine as a condition of employment, travel, or schooling.", 0, 1, -2, 0]
    ]],
    ["Healthcare", "Severe Mental Illness & Civil Commitment", "When courts and health agencies should intervene with individuals experiencing severe untreated psychosis in public.", [
        ["Fund voluntary community mental health clinics and supportive housing while prohibiting involuntary psychiatric commitment.", -2, -1, -2, 0],
        ["Fund outpatient community care alongside temporary court-ordered inpatient treatment for individuals who pose a danger to themselves or others.", 0, 0, 0, 0],
        ["Expand state psychiatric hospitals and broaden civil commitment laws to mandate inpatient care for severely mentally ill street vagrants.", 0, 1, 2, 0]
    ]],
    ["Healthcare", "Organ Donation Policy", "How to increase the supply of organs for transplant waiting lists.", [
        ["Make all adults automatic organ donors by default ('opt-out' system) while keeping organ allocation strictly public and non-financial.", -1, 0, 1, 0],
        ["Maintain a voluntary 'opt-in' donor registry and reimburse living donors for travel, medical expenses, and lost wages.", 0, 0, 0, 0],
        ["Legalize regulated financial compensation or tax credits for living kidney and organ donors to increase donor supply.", 2, 0, -1, 0]
    ]],
    ["Healthcare", "Excise Taxes on Sugary Drinks & Processed Foods", "Whether tax policy should be used to influence consumer diets.", [
        ["Levy excise taxes on sugary beverages and ultra-processed foods and restrict their advertising to minors.", -1, 0, 2, 0],
        ["Mandate standardized nutrition and ingredient labeling on packaging without applying special excise taxes to food.", 0, 0, 0, 0],
        ["Repeal special food taxes and dietary regulations so consumers and grocers transact without government paternalism.", 1, 0, -2, 0]
    ]],
    ["Healthcare", "FDA Drug Approval & Right to Try", "How strictly the FDA should regulate access to experimental medical treatments.", [
        ["Require comprehensive multi-phase FDA clinical trials proving both safety and efficacy before any drug can be sold to patients.", -1, 0, 1, 0],
        ["Maintain standard FDA safety trials while offering accelerated conditional approval for treatments targeting fatal diseases.", 0, 0, 0, 0],
        ["Allow patients and physicians to access experimental treatments after Phase 1 safety trials without awaiting full FDA efficacy approval.", 2, 0, -2, 0]
    ]],

    // --- 29-38: HOUSING, INFRASTRUCTURE & FINANCE ---
    ["Housing & Finance", "Rent Control Laws", "How municipalities and states should address rising apartment rents.", [
        ["Enact national or state rent control laws that cap annual rent increases and require just-cause eviction standards.", -2, 0, 1, 0],
        ["Fund means-tested rental vouchers for low-income tenants while leaving market-rate apartment pricing unrestricted.", 0, 0, 0, 0],
        ["Preempt local rent control ordinances so property owners set rental rates freely and builders have maximum incentive to construct new units.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Corporate Ownership of Single-Family Homes", "Large investment funds purchasing single-family houses to operate as rentals.", [
        ["Prohibit large institutional investors and private equity firms from purchasing single-family residential homes.", -2, 0, 1, 0],
        ["Eliminate tax depreciation advantages for large institutional home portfolios while offering down-payment grants to first-time buyers.", 0, 0, 0, 0],
        ["Allow any individual or corporation to buy, develop, or rent residential real estate on the open market without ownership caps.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Zoning & Residential Density", "Whether single-family residential zones should be opened to apartments and duplexes.", [
        ["Override local single-family zoning laws to mandate multi-family housing, transit-oriented density, and public social housing.", -2, -1, 1, 0],
        ["Allow accessory dwelling units (ADUs) and duplexes by right while leaving larger apartment zoning to local city councils.", 0, 0, 0, 0],
        ["Keep zoning authority strictly at the local municipal and neighborhood level to preserve single-family residential areas.", 1, 1, 0, 0]
    ]],
    ["Housing & Finance", "Public Transit vs. Highway Funding", "How transportation budgets should be allocated between rail/bus transit and roadways.", [
        ["Shift federal transportation funds away from highway expansion into mass transit, passenger rail, and pedestrian infrastructure.", -2, -1, 0, 0],
        ["Divide transportation funding between highway maintenance and metropolitan mass-transit corridors based on ridership volume.", 0, 0, 0, 0],
        ["Dedicate fuel taxes and vehicle fees strictly to roads, bridges, and highways rather than subsidizing public transit systems.", 2, 1, 0, 0]
    ]],
    ["Housing & Finance", "The Federal Reserve & Central Banking", "How the central bank should manage interest rates and monetary policy.", [
        ["Place the Federal Reserve under direct congressional oversight to prioritize full employment and finance public infrastructure.", -2, 0, 1, 0],
        ["Maintain an independent Federal Reserve with a dual mandate to manage price inflation and maximum sustainable employment.", 0, 0, 0, 0],
        ["Restrict the Federal Reserve strictly to price stability, subject it to full congressional audits, and remove barriers to competing currencies.", 2, 0, -2, 0]
    ]],
    ["Housing & Finance", "Cryptocurrency Regulation", "How digital assets like Bitcoin and decentralized finance should be treated.", [
        ["Subject cryptocurrency networks and exchanges to strict banking, securities, and environmental energy regulations.", -2, 0, 2, 0],
        ["Apply standard anti-fraud and tax-reporting rules to centralized crypto exchanges while permitting individual ownership.", 0, 0, 0, 0],
        ["Protect the right to hold self-custody digital wallets, run nodes, and transact peer-to-peer without regulatory licensing.", 2, 0, -2, 0]
    ]],
    ["Housing & Finance", "Central Bank Digital Currency (CBDC)", "Whether the Federal Reserve should issue a programmable digital dollar.", [
        ["Issue a public digital dollar through the Federal Reserve to provide free digital bank accounts and direct stimulus transfers.", -1, 0, 2, 0],
        ["Upgrade interbank instant-payment networks through regulated private banks rather than creating a direct retail central bank currency.", 0, 0, 0, 0],
        ["Ban the Federal Reserve from issuing a retail CBDC to prevent government surveillance or control over personal transactions.", 1, 0, -2, 0]
    ]],
    ["Housing & Finance", "Bank Regulation & Financial Bailouts", "How large banks should be regulated and handled during financial crises.", [
        ["Break up the largest Wall Street banks, reinstate Glass-Steagall separation of banking activities, and create public postal banking.", -2, 0, 1, 0],
        ["Enforce statutory capital reserve requirements, stress tests, and FDIC depositor insurance for commercial banks.", 0, 0, 0, 0],
        ["Repeal complex federal banking regulations and prohibit taxpayer bailouts so insolvent banks go through private bankruptcy.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Antitrust & Corporate Mergers", "How antitrust agencies should treat large corporate mergers and market concentration.", [
        ["Break up dominant firms in technology, retail, and agriculture to reduce market concentration regardless of short-term consumer prices.", -2, 0, 1, 0],
        ["Challenge corporate mergers when economic evidence demonstrates they will raise consumer prices or restrict output.", 0, 0, 0, 0],
        ["Limit antitrust intervention strictly to cases of explicit price-fixing, allowing market competition to discipline large firms.", 2, 0, -1, 0]
    ]],
    ["Housing & Finance", "Occupational Licensing Laws", "State licenses required to practice trades and professions.", [
        ["Maintain comprehensive state licensing boards and training-hour requirements across trades to enforce service and safety standards.", -1, 0, 1, 0],
        ["Require state licensing for medical, legal, and structural-safety professions while recognizing out-of-state licenses automatically.", 0, 0, 0, 0],
        ["Repeal occupational licensing requirements for non-hazardous trades so individuals can enter professions without government permits.", 2, 0, -2, 0]
    ]],

    // --- 39-47: ENERGY, CLIMATE & ENVIRONMENT ---
    ["Energy & Climate", "Fossil Fuels & Renewable Energy", "How national energy policy should treat oil, gas, coal, and renewables.", [
        ["End new fossil-fuel leasing on public lands and waters and use federal subsidies and mandates to transition the grid to renewable energy.", -2, -2, 1, -1],
        ["Continue domestic oil and natural gas production while providing tax credits for solar, wind, and grid battery storage.", 0, 0, 0, 0],
        ["Eliminate federal green-energy subsidies and expand leasing and pipelines for domestic oil, natural gas, and coal.", 2, 2, -1, 2]
    ]],
    ["Energy & Climate", "Vehicle Emissions & Electric Cars", "Federal rules regarding gas-powered cars and electric vehicles (EVs).", [
        ["Enforce federal tailpipe regulations requiring automakers to phase out new internal-combustion passenger vehicles in favor of EVs.", -2, -1, 2, -1],
        ["Fund interstate EV charging stations and purchase credits while keeping gasoline and hybrid vehicle sales unrestricted.", 0, 0, 0, 0],
        ["Repeal federal fuel-economy mandates and EV tax credits so vehicle drivetrains are chosen purely by consumer demand.", 2, 1, -2, 1]
    ]],
    ["Energy & Climate", "Nuclear Power", "The role of nuclear fission reactors in electricity generation.", [
        ["Decommission existing nuclear plants as they age and direct clean-energy funding strictly to wind, solar, and geothermal.", -1, -1, 0, 0],
        ["Maintain existing nuclear power plants and fund federal demonstration projects for small modular nuclear reactors.", 0, 0, 0, 0],
        ["Streamline Nuclear Regulatory Commission licensing to allow rapid private construction of new nuclear reactors.", 2, 1, -1, 1]
    ]],
    ["Energy & Climate", "Carbon Pricing & Industrial Emissions", "Whether greenhouse gas emissions should be taxed or capped by law.", [
        ["Enact a mandatory carbon fee on industrial fossil-fuel emissions and enforce binding sector-by-sector emission caps.", -2, -1, 1, -1],
        ["Fund clean-technology research grants and voluntary efficiency incentives without levying a direct tax on carbon emissions.", 0, 0, 0, 0],
        ["Repeal federal greenhouse-gas regulations on power plants and factories to keep domestic industrial energy costs low.", 2, 1, -1, 2]
    ]],
    ["Energy & Climate", "Federal Public Lands Management", "How federally owned lands in the Western states and Alaska should be used.", [
        ["Designate additional federal lands as protected wilderness and national monuments closed to commercial extraction.", -2, -1, 0, 0],
        ["Manage federal public lands under a multiple-use mandate combining recreation, conservation, and regulated timber/mineral leases.", 0, 0, 0, 0],
        ["Open non-park federal lands to energy and mineral development or transfer land management authority to state governments.", 2, 1, 0, 1]
    ]],
    ["Energy & Climate", "Environmental Permitting (NEPA)", "How environmental impact reviews should be conducted for infrastructure projects.", [
        ["Require comprehensive multi-year environmental impact assessments and broad citizen standing to sue over proposed projects.", -2, -1, 1, 0],
        ["Retain environmental impact reviews but enforce a statutory two-year deadline on federal agency permitting decisions.", 0, 0, 0, 0],
        ["Curtail NEPA litigation and fast-track permitting approvals for energy pipelines, mines, transmission lines, and highways.", 2, 1, -1, 1]
    ]],
    ["Energy & Climate", "Agricultural & Livestock Regulations", "Environmental rules governing farms, ranches, and meat production.", [
        ["Regulate agricultural methane and fertilizer runoff strictly and shift federal farm subsidies toward plant-based and organic crops.", -2, -2, 1, -1],
        ["Fund voluntary soil-conservation and watershed programs for farmers without restricting livestock production.", 0, 0, 0, 0],
        ["Exempt agricultural land and livestock operations from federal climate and water-runoff regulations.", 2, 2, -1, 1]
    ]],
    ["Energy & Climate", "International Climate Treaties", "Participation in global climate frameworks like the Paris Agreement.", [
        ["Enforce binding emission pledges under international climate treaties and contribute public funds to developing-nation climate finance.", -2, -2, 0, -2],
        ["Participate in international climate negotiations conditioned on reciprocal emission-reporting by China and India.", 0, 0, 0, -1],
        ["Withdraw from international climate treaties and reject international climate-finance transfers.", 2, 2, 0, 2]
    ]],
    ["Energy & Climate", "Single-Use Plastics & Packaging", "Government policies on plastic bags, containers, and packaging waste.", [
        ["Prohibit single-use plastic bags, utensils, and foam containers and mandate extended producer responsibility fees.", -2, -1, 1, 0],
        ["Fund municipal recycling and waste-to-energy facilities without banning specific consumer packaging materials.", 0, 0, 0, 0],
        ["Preempt bans and excise taxes on plastic bags, straws, and food packaging.", 2, 1, -1, 0]
    ]],

    // --- 48-57: CIVIL LIBERTIES, SPEECH & TECHNOLOGY ---
    ["Civil Liberties & Tech", "Free Speech & Hate Speech Laws", "Where the legal boundary on offensive or extremist speech should be set.", [
        ["Enact legal penalties against hate speech and organized disinformation targeting protected groups.", 0, -2, 2, 0],
        ["Protect offensive and controversial speech under the First Amendment, restricting only direct incitement to imminent violence or defamation.", 0, 0, 0, 0],
        ["Enforce absolute First Amendment protections and prohibit government agencies from pressuring private entities to censor speech.", 0, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "Social Media Content Moderation", "How large digital platforms should moderate user speech.", [
        ["Require major social networks to remove hate speech, election disinformation, and extremist content under regulatory oversight.", -1, -1, 2, 0],
        ["Allow private platforms to set their own moderation rules under Section 230 while requiring transparent user appeal processes.", 0, 0, 0, 0],
        ["Classify major social media platforms as common carriers barred from de-platforming users for lawful political speech.", 0, 1, -1, 0]
    ]],
    ["Civil Liberties & Tech", "Intelligence Surveillance & FISA", "Government surveillance powers used in counterterrorism and national security.", [
        ["Grant intelligence agencies broad authority to collect communications metadata and monitor foreign-linked digital networks.", 0, 0, 2, 1],
        ["Permit foreign intelligence collection under FISA, but require an individual probable-cause court warrant before searching any US citizen's data.", 0, 0, 0, 0],
        ["Repeal the Patriot Act and FISA Section 702, prohibiting all warrantless government collection of digital communications.", 0, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "End-to-End Encryption", "Whether messaging apps and devices should include law-enforcement access mechanisms.", [
        ["Require technology companies to build lawful-access mechanisms into encrypted platforms so police can execute court wiretap orders.", 0, 1, 2, 0],
        ["Allow companies to offer default encryption while permitting law enforcement to use targeted device exploits under a judge's warrant.", 0, 0, 0, 0],
        ["Protect the right to unbreakable end-to-end encryption and prohibit government-mandated backdoors or client-side scanning.", 0, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "Facial Recognition & Biometric Policing", "Use of automated facial recognition cameras in public spaces.", [
        ["Prohibit police departments and government agencies from using facial recognition and biometric tracking in public spaces.", 0, -1, -2, 0],
        ["Permit police to run facial recognition searches only against arrest mugshot databases when investigating violent felonies, subject to human review.", 0, 0, 0, 0],
        ["Deploy live facial recognition cameras and automated license-plate readers across public transit and streets to apprehend wanted suspects.", 0, 1, 2, 0]
    ]],
    ["Civil Liberties & Tech", "Classified Leaks & Whistleblowers", "How the law should treat individuals who release classified government documents.", [
        ["Grant legal immunity to whistleblowers and journalists who publish classified evidence of illegal government surveillance or war crimes.", 0, -1, -2, -1],
        ["Protect whistleblowers who report classified misconduct through congressional intelligence committees or inspectors general, while prosecuting public leaks.", 0, 0, 0, 0],
        ["Strictly prosecute anyone who leaks classified defense or intelligence information under the Espionage Act.", 0, 1, 2, 1]
    ]],
    ["Civil Liberties & Tech", "Right to Repair Hardware", "Whether manufacturers must sell replacement parts and diagnostic tools to owners and independent shops.", [
        ["Require electronics, appliance, and farm-equipment manufacturers to provide parts, schematics, and diagnostic software to consumers and independent repair shops.", -1, 0, -1, 0],
        ["Require manufacturers to make standard replacement parts available for consumer electronics while exempting proprietary embedded source code.", 0, 0, 0, 0],
        ["Allow manufacturers to set their own hardware design, Authorized Repair network, and warranty terms by private contract.", 2, 0, 0, 0]
    ]],
    ["Civil Liberties & Tech", "Consumer Data Privacy", "How commercial data collection and targeted advertising should be regulated.", [
        ["Prohibit behavioral surveillance advertising and ban companies from collecting or selling personal data beyond what is strictly needed to provide the service.", -2, 0, 0, 0],
        ["Enact a uniform federal privacy law giving consumers the right to view, download, delete, and opt out of the sale of their personal data.", 0, 0, 0, 0],
        ["Allow online services and consumers to set data-sharing terms through voluntary terms of service without federal data restrictions.", 2, 0, 0, 0]
    ]],
    ["Civil Liberties & Tech", "Artificial Intelligence Regulation", "How governments should regulate large AI models and automated systems.", [
        ["Require federal pre-deployment licensing, algorithmic bias audits, and copyright-compensation pools for large AI models.", -2, -1, 2, 0],
        ["Apply existing fraud, liability, and national-security export rules to AI systems while keeping open-weights research legal.", 0, 0, 0, 0],
        ["Refrain from federal AI licensing or model restrictions so domestic open-source and commercial developers can innovate rapidly.", 2, 0, -2, 0]
    ]],
    ["Civil Liberties & Tech", "Online Age Verification Laws", "Whether websites hosting adult material or social media must verify user ages via government ID.", [
        ["Prohibit laws that require adults to submit government identification or biometric scans to access websites.", 0, -2, -2, 0],
        ["Rely on device-level and operating-system parental controls rather than requiring individual websites to collect government IDs.", 0, 0, 0, 0],
        ["Enforce mandatory government-ID or biometric age verification on adult websites and require parental consent for minor social media accounts.", 0, 2, 2, 0]
    ]],

    // --- 58-68: GUNS, CRIME & CRIMINAL JUSTICE ---
    ["Crime & Justice", "Firearm Ownership & Semi-Automatic Rifles", "Laws governing the sale and possession of firearms and magazines.", [
        ["Enact universal background checks, red-flag laws, mandatory waiting periods, and a ban on semi-automatic assault-style rifles and magazines over 10 rounds.", -1, -2, 2, 0],
        ["Require background checks on all commercial firearm transfers and permit court-ordered red-flag gun removals with due-process hearings, without banning common rifles.", 0, 0, 0, 0],
        ["Oppose bans on semi-automatic rifles and standard magazines, repeal federal firearm restrictions, and prohibit national gun registries.", 1, 2, -2, 0]
    ]],
    ["Crime & Justice", "Concealed Carry of Firearms", "Rules governing carrying concealed handguns in public.", [
        ["Restrict public concealed carry permits to law enforcement officers and applicants who prove a documented, specific threat to their life.", 0, -1, 2, 0],
        ["Maintain a 'shall-issue' permit system where any adult who passes a background check and live-fire safety course receives a concealed carry license.", 0, 0, 0, 0],
        ["Enact national Constitutional Carry allowing any law-abiding adult to carry a concealed handgun without a government permit or fee.", 0, 1, -2, 0]
    ]],
    ["Crime & Justice", "Policing & Municipal Safety Budgets", "How cities should fund law enforcement and crime prevention.", [
        ["Reallocate a portion of municipal police budgets into unarmed mental-health crisis teams, youth jobs, and violence-interruption programs.", -2, -2, -2, 0],
        ["Maintain full police department staffing while funding co-responder mental-health units, mandatory body cameras, and de-escalation training.", 0, 0, 0, 0],
        ["Expand police officer hiring, increase patrol density, and authorize proactive broken-windows policing to deter street crime.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Qualified Immunity for Police", "Legal standards governing civil lawsuits against police officers.", [
        ["Abolish qualified immunity so citizens can sue individual police officers in civil court for constitutional violations.", 0, -1, -2, 0],
        ["Allow civil lawsuits against municipal departments for officer misconduct while retaining individual immunity unless an officer violates a clearly established statute.", 0, 0, 0, 0],
        ["Maintain full qualified immunity protections so law enforcement officers are shielded from personal civil liability while on duty.", 0, 2, 2, 0]
    ]],
    ["Crime & Justice", "Civil Asset Forfeiture", "Laws allowing police to seize cash or property suspected of connection to criminal activity.", [
        ["Abolish civil asset forfeiture; require a criminal conviction beyond a reasonable doubt before the state can permanently take any property.", 0, 0, -2, 0],
        ["Allow property forfeiture only after a criminal conviction, and direct all forfeited funds into the general treasury rather than law-enforcement budgets.", 0, 0, 0, 0],
        ["Authorize law enforcement to seize and forfeit cash, vehicles, and assets linked to suspected narcotics trafficking and organized crime.", 0, 1, 2, 0]
    ]],
    ["Crime & Justice", "Capital Punishment (Death Penalty)", "Whether the death penalty should be an available sentence for first-degree murder.", [
        ["Abolish the death penalty at the state and federal levels, replacing it with a maximum sentence of life imprisonment.", 0, -2, -2, 0],
        ["Limit capital punishment strictly to federal terrorism or mass-casualty murders confirmed by DNA evidence.", 0, 0, 0, 0],
        ["Retain capital punishment for aggravated first-degree murder and streamline post-conviction appeals to carry out sentences promptly.", 0, 2, 2, 0]
    ]],
    ["Crime & Justice", "Cash Bail & Pretrial Detention", "How courts determine whether a defendant is held in jail prior to trial.", [
        ["Eliminate cash bail for non-capital offenses and release defendants on recognizance while they await trial.", -1, -2, -2, 0],
        ["Replace cash bail schedules with judicial danger assessments—holding violent suspects without bail while releasing low-risk nonviolent defendants.", 0, 0, 0, 0],
        ["Require secured cash bail or mandatory pretrial detention for felony and repeat offenders to prevent crimes while awaiting trial.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Criminal Sentencing & Mandatory Minimums", "How prison sentences should be structured for felony convictions.", [
        ["Repeal mandatory minimum sentences, expand parole eligibility, and focus correctional facilities on rehabilitation and education.", -1, -2, -2, 0],
        ["Retain mandatory minimum sentences for violent firearms felonies while granting judges sentencing discretion on nonviolent offenses.", 0, 0, 0, 0],
        ["Enforce mandatory minimum prison terms and 'truth-in-sentencing' rules requiring felons to serve their full court sentence.", 1, 2, 2, 0]
    ]],
    ["Crime & Justice", "Private Correctional Facilities", "Whether governments should contract with privately managed prisons.", [
        ["Prohibit federal and state governments from contracting with for-profit private prisons and detention facilities.", -2, -1, -1, 0],
        ["Use public correctional facilities as the default, permitting private contractor facilities only under performance audits tied to recidivism reduction.", 0, 0, 0, 0],
        ["Allow state and federal agencies to contract with private prison operators to expand capacity and lower per-inmate operating costs.", 2, 1, 1, 0]
    ]],
    ["Crime & Justice", "Drug Laws & Narcotics Policy", "How the legal system should address cannabis and illicit drugs.", [
        ["Legalize cannabis, decriminalize personal possession of all controlled substances, and fund harm-reduction and treatment clinics.", 0, -2, -2, 0],
        ["Legalize and tax cannabis for adults 21+, while keeping hard narcotics illegal and diverting first-time possession offenders into drug courts.", 0, 0, 0, 0],
        ["Enforce criminal penalties against illicit drug possession and impose mandatory prison sentences on fentanyl and narcotics dealers.", 0, 2, 2, 0]
    ]],
    ["Crime & Justice", "Prostitution & Sex Work Laws", "How the legal system should treat consensual adult sex work.", [
        ["Decriminalize or legalize consensual adult sex work, subject to labor and public-health regulations.", 0, -2, -2, 0],
        ["Adopt the 'Nordic model': decriminalize individuals selling sex while maintaining criminal penalties for buyers, pimps, and traffickers.", 0, 0, 0, 0],
        ["Enforce criminal prohibitions against both the purchase and sale of prostitution.", 0, 2, 2, 0]
    ]],

    // --- 69-82: CULTURE, EDUCATION & SOCIAL VALUES ---
    ["Culture & Education", "Abortion & Reproductive Law", "Legal standards governing abortion access.", [
        ["Guarantee the legal right to abortion nationwide throughout pregnancy by federal statute and include coverage in public health programs.", -1, -2, -1, 0],
        ["Permit abortion up to fetal viability (around 15–22 weeks) and in cases of rape, incest, or medical emergency, with restrictions thereafter.", 0, 0, 0, 0],
        ["Prohibit abortion by law from conception or detection of a fetal heartbeat, with exceptions only to save the life of the mother.", 1, 2, 2, 0]
    ]],
    ["Culture & Education", "Youth Gender-Transition Medicine", "Laws regarding puberty blockers and cross-sex hormones for minors under 18.", [
        ["Allow minors to access puberty blockers and hormone therapy with parental and physician consent, and prohibit state bans.", 0, -2, -1, 0],
        ["Restrict surgical transition procedures to adults 18+ and require multi-year psychological evaluations before any endocrine intervention for minors.", 0, 0, 0, 0],
        ["Enact statutory bans on puberty blockers, cross-sex hormones, and transition surgeries for minors under the age of 18.", 0, 2, 2, 0]
    ]],
    ["Culture & Education", "Eligibility in Female School Sports", "How eligibility for girls' and women's scholastic and collegiate sports should be determined.", [
        ["Allow students to compete in school and college athletic categories that match their gender identity.", 0, -2, 0, 0],
        ["Maintain an open/co-ed division alongside a female division governed by sport-specific hormone and developmental rules set by athletic bodies.", 0, 0, 0, 0],
        ["Require by statute that female sports categories in public schools and colleges be restricted to biological females at birth.", 0, 2, 1, 0]
    ]],
    ["Culture & Education", "Affirmative Action & DEI Policies", "How universities, agencies, and corporations should handle diversity and admissions.", [
        ["Use race-conscious admissions, hiring targets, and institutional DEI programs to remedy systemic disparities.", -2, -2, 1, 0],
        ["Enforce anti-discrimination laws and base college admissions preferences on household income and socioeconomic need rather than race.", 0, 0, 0, 0],
        ["Prohibit race- or sex-based preferences and eliminate DEI mandates across government agencies, universities, and contractors.", 2, 2, 0, 0]
    ]],
    ["Culture & Education", "Historical Racial Disparities & Reparations", "How public policy should address racial wealth gaps.", [
        ["Fund federal reparations and targeted wealth-transfer programs for descendants of enslaved Americans.", -2, -2, 0, 0],
        ["Direct public investment into universal school funding, infrastructure, and small-business credit in low-income zip codes of all backgrounds.", 0, 0, 0, 0],
        ["Enforce equal individual treatment under current law without race-specific financial transfers or historical reparations programs.", 2, 2, 0, 0]
    ]],
    ["Culture & Education", "School Vouchers & Education Choice", "Whether public education funds should be usable at private or religious schools.", [
        ["Dedicate all public K-12 tax dollars exclusively to public schools and prohibit private school voucher programs.", -2, -1, 0, 0],
        ["Fund public schools alongside public charter schools, magnet programs, and open enrollment across public school districts.", 0, 0, 0, 0],
        ["Establish universal Education Savings Accounts allowing parents to use their child's per-pupil state funding at any public, private, or religious school.", 2, 2, -1, 0]
    ]],
    ["Culture & Education", "Public School Curriculums & Parental Rights", "How classroom materials on history, race, and human sexuality should be governed.", [
        ["vest curriculum and library selection in credentialed educators and state boards, prohibiting local removals of books on race or gender.", -1, -2, 0, 0],
        ["Require public schools to post all curriculum syllabi online for parents and allow parental opt-outs from sexuality lessons.", 0, 0, 0, 0],
        ["Prohibit instruction on gender identity and critical race theory in K-12 public schools and empower elected parent boards over school libraries.", 1, 2, 1, 1]
    ]],
    ["Culture & Education", "Higher Education & Student Loan Debt", "How public universities and federal student loans should be handled.", [
        ["Eliminate tuition at public colleges and universities and cancel existing federal student loan balances.", -2, -1, 0, 0],
        ["Cap federal student loan interest rates, expand income-driven repayment, and increase grants for vocational trade programs.", 0, 0, 0, 0],
        ["Require borrowers to repay their contracted student loans in full and end federal loan subsidies that allow universities to raise tuition.", 2, 1, 0, 0]
    ]],
    ["Culture & Education", "Religion & Secularism in Government", "The role of religion in public schools, courts, and government institutions.", [
        ["Enforce strict institutional secularism, removing religious symbols and invocations from government buildings, courts, and public schools.", 0, -2, 0, 0],
        ["Uphold the Establishment and Free Exercise clauses—neither endorsing religion in state functions nor restricting private religious expression.", 0, 0, 0, 0],
        ["Permit voluntary prayer and religious heritage displays in public schools and civic spaces, and grant broad religious exemptions from secular mandates.", 0, 2, 1, 1]
    ]],
    ["Culture & Education", "Marriage & Family Tax Policy", "How legal and tax codes should treat different household structures.", [
        ["Structure tax, benefit, and domestic-partnership laws to treat single individuals, unmarried partners, and married couples identically.", -1, -2, -1, 0],
        ["Maintain legal marriage equality for all consenting adults while removing marriage tax penalties from the tax code.", 0, 0, 0, 0],
        ["Use family tax credits and social policy to explicitly incentivize wedlock and married two-parent households.", 1, 2, 1, 1]
    ]],
    ["Culture & Education", "Physician-Assisted Suicide", "Whether terminally ill adults should be legally permitted to obtain lethal prescriptions.", [
        ["Legalize medical aid in dying for mentally competent adults diagnosed with terminal or intractable illnesses.", 0, -2, -2, 0],
        ["Permit patients to execute living wills, refuse life support, and receive high-dose palliative pain care, without legalizing lethal prescriptions.", 0, 0, 0, 0],
        ["Prohibit physician-assisted suicide and euthanasia under federal and state law.", 0, 2, 2, 0]
    ]],
    ["Culture & Education", "National Civic & Military Service", "Whether young adults should participate in national service programs.", [
        ["Expand paid, voluntary civilian service programs (such as AmeriCorps and conservation corps) with college tuition grants.", -1, -1, 0, 0],
        ["Maintain an all-volunteer military and voluntary civic corps without mandatory service obligations.", 0, 0, 0, 0],
        ["Establish a universal national service expectation—either military or civic—for young adults to foster national cohesion.", 0, 2, 2, 2]
    ]],
    ["Culture & Education", "Animal Welfare & Agricultural Standards", "Regulations governing animal husbandry, testing, and commerce.", [
        ["Prohibit intensive livestock confinement cages, cosmetic animal testing, and fur farming by federal statute.", -1, -2, 1, 0],
        ["Enforce humane slaughter and anti-cruelty laws while permitting standard livestock production and regulated medical research.", 0, 0, 0, 0],
        ["Repeal state and federal livestock confinement mandates that increase consumer meat and egg prices.", 1, 2, -1, 0]
    ]],
    ["Culture & Education", "Historical Monuments & Civic Naming", "How governments should handle statues and names of historical figures.", [
        ["Remove Confederate monuments and rename public schools, bases, and parks that honor figures associated with slavery or colonialism.", 0, -2, 0, -1],
        ["Decide monument placement through local voter referendums, adding historical context plaques or relocating statues to museums.", 0, 0, 0, 0],
        ["Enact statutory protections preserving existing historical monuments, military base names, and national memorials from removal.", 0, 2, 1, 2]
    ]],

    // --- 83-94: IMMIGRATION, BORDERS & GLOBAL TRADE ---
    ["Immigration & Trade", "Border Enforcement & Physical Barriers", "How the national border and unauthorized crossings should be handled.", [
        ["End physical border-wall construction, decriminalize unauthorized border crossings into civil infractions, and expand asylum processing capacity.", -1, -2, -1, -2],
        ["Fund border patrol staffing, port-of-entry scanners, physical barriers in high-traffic sectors, and additional immigration judges.", 0, 0, 0, 0],
        ["Complete a continuous border wall, deploy military personnel to halt unauthorized entry, and detain and deport all unlawful border crossers.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Undocumented Immigrants Residing in the US", "Policy toward long-term undocumented residents.", [
        ["Enact a pathway to permanent legal status and citizenship for undocumented immigrants residing in the country without felony records.", -1, -2, -1, -2],
        ["Deport non-citizens convicted of violent or serious crimes, while allowing long-term undocumented workers to apply for renewable work permits after paying back taxes and fines.", 0, 0, 0, 0],
        ["Mandate nationwide E-Verify for all employers, end sanctuary-city policies, and carry out deportation operations for undocumented residents.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Asylum & Refugee Admissions", "Standards for granting asylum and resettling international refugees.", [
        ["Raise the annual refugee resettlement cap and expand asylum eligibility to include individuals fleeing gang violence or climate displacement.", -1, -2, 0, -2],
        ["Admit refugees vetted overseas and grant asylum only to applicants who apply at legal ports of entry and prove political, religious, or ethnic persecution.", 0, 0, 0, 0],
        ["Require asylum seekers to apply in the first safe country they transit through and suspend domestic asylum release programs.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Legal Immigration & Work Visas", "How many legal immigrants should be admitted and under what criteria.", [
        ["Increase annual caps on both family-sponsored green cards and employment visas across all skill levels.", -1, -2, -1, -2],
        ["Shift legal immigration toward a merit- and skills-based points system that prioritizes STEM graduates and verified labor shortages.", 0, 0, 0, 0],
        ["Reduce overall legal immigration and guest-worker visa numbers to tighten the domestic labor market and raise native-born wages.", 0, 2, 1, 2]
    ]],
    ["Immigration & Trade", "Official Language & Civic Assimilation", "How government agencies and schools should handle language diversity.", [
        ["Provide multilingual ballots, government services, and bilingual public schooling with no single official national language.", -1, -2, 0, -2],
        ["Designate English as the common civic language and fund English-acquisition classes while keeping translations for courts, hospitals, and ballots.", 0, 0, 0, 0],
        ["Establish English as the sole official language of all government operations, ballots, and public instruction.", 1, 2, 2, 2]
    ]],
    ["Immigration & Trade", "Tariffs & International Trade Deals", "Whether trade policy should favor open trade or protective tariffs.", [
        ["Make trade agreements contingent on enforceable international labor-union and environmental standards, using targeted tariffs against violators.", -1, 0, 0, 0],
        ["Pursue reciprocal free-trade agreements with allied nations to lower consumer tariffs and expand export markets.", 1, 0, 0, -1],
        ["Implement universal baseline tariffs on foreign imports to protect domestic manufacturing industries and reduce trade deficits.", 0, 1, 1, 2]
    ]],
    ["Immigration & Trade", "Trade & Technology Policy Toward China", "How economic and technological relations with China should be managed.", [
        ["Maintain normal trade relations and diplomatic climate cooperation with China while avoiding broad tariff escalations.", -1, -1, 0, -2],
        ["Enforce targeted export controls on advanced semiconductors and military technology while continuing trade in non-strategic consumer goods.", 0, 0, 0, 0],
        ["Revoke China's Permanent Normal Trade Relations status, impose high tariffs on Chinese goods, and restrict bilateral capital investment.", 1, 1, 1, 2]
    ]],
    ["Immigration & Trade", "Industrial Policy & Manufacturing Subsidies", "Whether the federal government should subsidize domestic industries.", [
        ["Direct federal subsidies and public equity stakes into green manufacturing and domestic supply chains with union-labor requirements.", -2, -1, 0, 0],
        ["Provide targeted tax credits for domestic semiconductor, pharmaceutical, and defense-industrial manufacturing.", 0, 0, 0, 0],
        ["Eliminate industry-specific federal subsidies and industrial policy, relying on across-the-board tax and regulatory reductions instead.", 2, 0, 0, 0]
    ]],
    ["Immigration & Trade", "Foreign Ownership of Farmland & Infrastructure", "Rules on foreign entities purchasing domestic land and corporate assets.", [
        ["Prohibit foreign corporations and foreign investors from purchasing domestic agricultural land, water rights, and residential real estate.", -1, 1, 1, 2],
        ["Block land and corporate acquisitions by state-owned enterprises of adversarial nations or near military installations via CFIUS review.", 0, 0, 0, 0],
        ["Allow open international capital investment in domestic real estate and businesses unless a specific national-security threat is proven.", 2, 0, -1, -2]
    ]],
    ["Immigration & Trade", "International Institutions (UN, WTO, ICC)", "How domestic law should relate to international bodies and treaties.", [
        ["Participate fully in the United Nations, International Criminal Court, and binding multilateral human-rights and labor treaties.", -1, -2, 0, -2],
        ["Maintain diplomatic membership in the UN and WTO while retaining constitutional veto power over any domestic legal obligations.", 0, 0, 0, 0],
        ["Withdraw from or defund international bodies like the UN, WHO, and WTO to ensure complete national legislative sovereignty.", 1, 2, 0, 2]
    ]],
    ["Immigration & Trade", "Foreign Aid & International Development", "How much funding the federal budget should allocate to foreign aid.", [
        ["Expand foreign humanitarian, health, and development assistance to meet international percentage-of-GDP targets.", -2, -2, 0, -2],
        ["Maintain foreign assistance programs that are tied to diplomatic alliances, disaster relief, and countering rival influence.", 0, 0, 0, -1],
        ["Eliminate non-emergency foreign aid programs and reallocate those funds to domestic taxpayers and infrastructure.", 1, 2, 0, 2]
    ]],
    ["Immigration & Trade", "Economic Sanctions Policy", "How economic sanctions should be used in foreign policy.", [
        ["Lift broad trade embargoes and sector-wide sanctions that impact civilian populations in foreign countries.", -1, -1, -1, -2],
        ["Apply targeted financial and travel sanctions against specific foreign military leaders and oligarchs in coordination with allies.", 0, 0, 0, 0],
        ["Enforce comprehensive primary and secondary economic sanctions to isolate hostile foreign regimes.", 1, 1, 1, 1]
    ]],

    // --- 95-105: DEFENSE, FOREIGN POLICY & DEMOCRATIC INSTITUTIONS ---
    ["Defense & Governance", "Defense Budget & Overseas Military Bases", "How large the military budget and global base footprint should be.", [
        ["Reduce the defense budget significantly, close overseas military bases, and reallocate funds to domestic programs.", -2, -2, -1, -1],
        ["Maintain current defense spending levels as a share of GDP while auditing Pentagon procurement and modernizing deterrence systems.", 0, 0, 0, 0],
        ["Increase defense budgets to expand naval, air, and strategic forces capable of defeating any peer military rival.", 2, 2, 1, 1]
    ]],
    ["Defense & Governance", "NATO & Mutual Defense Treaties", "Commitments to mutual-defense alliances in Europe and the Indo-Pacific.", [
        ["Halt military alliance expansion and prioritize mutual arms-reduction treaties and diplomatic non-alignment.", -1, -1, -1, -1],
        ["Uphold mutual-defense commitments under NATO and Indo-Pacific treaties to deter military aggression.", 0, 0, 0, -1],
        ["Condition alliance defense guarantees on allied nations funding their own primary territorial defense.", 1, 1, 0, 2]
    ]],
    ["Defense & Governance", "Foreign Wars & Military Aid", "How the country should respond when foreign partners face armed invasion.", [
        ["Withhold offensive weapons transfers, condition aid on human-rights compliance, and press for immediate negotiated ceasefires.", -1, -2, -1, -1],
        ["Supply military equipment, munitions, and intelligence to democratic partners defending their territory without deploying domestic combat troops.", 0, 0, 0, -1],
        ["End foreign military aid packages and avoid involvement in overseas conflicts that do not directly attack domestic territory.", 1, 1, -1, 2]
    ]],
    ["Defense & Governance", "Voter Registration & Voter ID Laws", "Rules governing voter registration, mail-in ballots, and identification at the polls.", [
        ["Implement automatic voter registration, universal no-excuse mail-in voting, and same-day registration without photo-ID requirements.", -1, -2, -1, 0],
        ["Require a photo ID to vote—providing free state ID cards to all citizens—combined with in-person early voting and signature-verified absentee ballots.", 0, 0, 0, 0],
        ["Require government photo ID, documented proof of citizenship to register, and in-person paper-ballot voting with absentee ballots limited to verified illness or military service.", 1, 2, 1, 1]
    ]],
    ["Defense & Governance", "Presidential Elections & The Electoral College", "How the President of the United States should be elected.", [
        ["Abolish the Electoral College and elect the President by direct national popular vote.", -1, -2, 0, 0],
        ["Retain the Electoral College while allocating each state's electoral votes proportionally or by congressional district rather than winner-take-all.", 0, 0, 0, 0],
        ["Preserve the current state-by-state Electoral College system unchanged as a constitutional safeguard for federalism.", 1, 2, 0, 1]
    ]],
    ["Defense & Governance", "Campaign Finance & Political Spending", "How election campaigns and independent political advocacy should be regulated.", [
        ["Overturn Citizens United by constitutional amendment, cap independent political expenditures, and finance elections with public matching funds.", -2, -1, 1, 0],
        ["Allow private campaign contributions subject to statutory limits and require immediate public disclosure of all donors to Super PACs and 501(c)(4) groups.", 0, 0, 0, 0],
        ["Repeal government limits on campaign contributions and independent political expenditures as protected First Amendment political speech.", 2, 1, -1, 0]
    ]],
    ["Defense & Governance", "Supreme Court Tenure & Constitutional Interpretation", "How Supreme Court justices should serve and interpret the Constitution.", [
        ["Enact 18-year staggered term limits for Supreme Court justices and interpret constitutional provisions in light of evolving contemporary standards.", -1, -2, 0, 0],
        ["Maintain lifetime tenure with a binding judicial ethics code and interpret statutes according to precedent and legislative text.", 0, 0, 0, 0],
        ["Preserve lifetime judicial tenure unchanged and appoint judges who interpret the Constitution strictly according to its original public meaning.", 1, 2, 0, 0]
    ]],
    ["Defense & Governance", "Congressional Term Limits & Ethics Rules", "Rules governing congressional tenure, stock ownership, and lobbying.", [
        ["Prohibit members of Congress from owning individual stocks and ban former lawmakers from working as corporate lobbyists.", -1, -1, 0, 0],
        ["Require lawmakers to place financial assets into blind trusts during office and use independent commissions to draw congressional districts.", 0, 0, 0, 0],
        ["Enact a constitutional amendment imposing hard term limits on members of the House and Senate.", 1, 1, 0, 0]
    ]],
    ["Defense & Governance", "Federalism vs. National Uniformity", "How legislative authority should be divided between the federal government and the states.", [
        ["Enact uniform federal standards on civil rights, labor, voting, and environmental protection that preempt conflicting state laws.", -2, -2, 1, 0],
        ["Maintain federal authority over interstate commerce and national safety nets while allowing states to set local regulatory policies.", 0, 0, 0, 0],
        ["Devolve regulatory, education, and welfare authority back to state legislatures under the 10th Amendment.", 2, 2, -1, 1]
    ]],
    ["Defense & Governance", "Executive Agencies & Regulatory Power", "How much rule-making authority federal agencies (EPA, SEC, OSHA, FTC) should exercise.", [
        ["Authorize federal executive agencies to issue and enforce broad regulatory standards under general congressional statutes.", -2, -1, 2, 0],
        ["Require agencies to conduct cost-benefit analyses on major rules and subject agency interpretations to independent judicial review.", 0, 0, 0, 0],
        ["Require an explicit vote of Congress before any major agency regulation takes effect and reclassify civil-service regulators as at-will employees.", 2, 2, -1, 1]
    ]],
    ["Defense & Governance", "Space Exploration & Commercial Space", "How civil and commercial spaceflight should be organized.", [
        ["Fund space exploration and Earth-climate satellites primarily through public agencies like NASA rather than private corporations.", -2, 0, 0, -1],
        ["Use NASA public-private fixed-price contracts to fund lunar and deep-space missions alongside commercial launch providers.", 0, 0, 0, 0],
        ["Deregulate commercial launch licensing and recognize private property rights for orbital industry and space resource extraction.", 2, 0, -1, 1]
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
        e: 88, s: 90, a: 68, d: 82,
        pillars: ["Medicare for All", "Worker Ownership & Unions", "Green New Deal", "Civil Rights & Anti-Militarism"],
        desc: "You favor deep structural reforms to capitalism—combining universal public goods (healthcare, higher education, housing), strong labor union power, and wealth redistribution with progressive social values, civil liberties, and a non-interventionist foreign policy."
    },
    {
        name: "Progressive Left",
        sub: "US Left",
        family: "Left / Progressive · Social Democratic-Progressive family",
        group: "ideology",
        e: 78, s: 88, a: 58, d: 80,
        pillars: ["Universal Social Safety Net", "Climate Action", "Social & Racial Equity", "Corporate Regulation"],
        desc: "You align with the modern progressive movement: advocating bold federal action to combat economic inequality, transition rapidly to clean energy, protect reproductive and LGBTQ+ rights, and curb corporate and billionaire influence in democracy."
    },
    {
        name: "Social Democrat",
        sub: "Nordic / Mixed-Economy Model",
        family: "Center-Left / Social Democrat · Welfare State family",
        group: "ideology",
        e: 72, s: 78, a: 56, d: 75,
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
        e: 62, s: 75, a: 48, d: 78,
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
        e: 86, s: 86, a: 64, d: 74,
        desc: "Longtime independent Senator and democratic socialist championing Medicare for All, tuition-free public college, wealth taxes, and strong labor unions."
    },
    {
        name: "Alexandria Ocasio-Cortez (AOC)",
        sub: "US Representative (D-NY) · Progressive Left",
        group: "figure",
        e: 88, s: 92, a: 64, d: 82,
        desc: "Leading voice of the modern progressive wing in Congress, advocating a Green New Deal, universal healthcare, abolishing ICE, and racial/climate equity."
    },
    {
        name: "Elizabeth Warren",
        sub: "US Senator (D-MA) · Progressive Reformer",
        group: "figure",
        e: 78, s: 86, a: 54, d: 76,
        desc: "Architect of the Consumer Financial Protection Bureau, known for tough antitrust enforcement, billionaire wealth taxes, and structural regulatory reform."
    },
    {
        name: "Franklin D. Roosevelt (FDR)",
        sub: "32nd US President · New Deal Coalition",
        group: "figure",
        e: 76, s: 64, a: 38, d: 72,
        desc: "Created Social Security, federal labor protections, SEC regulation, and massive public infrastructure works under the New Deal."
    },
    {
        name: "Barack Obama",
        sub: "44th US President · Modern Center-Left",
        group: "figure",
        e: 62, s: 76, a: 48, d: 80,
        desc: "Passed the Affordable Care Act (Obamacare), Dodd-Frank financial rules, and clean-energy investments while favoring multilateral diplomacy."
    },
    {
        name: "Joe Biden",
        sub: "46th US President · Institutional Center-Left",
        group: "figure",
        e: 60, s: 72, a: 46, d: 74,
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
        e: 90, s: 92, a: 68, d: 85,
        desc: "Advocates Medicare for All, tuition-free college, tenant unions, a Green New Deal, and democratic worker control over major industries."
    },
    {
        name: "Congressional Progressive Caucus",
        sub: "US House Democratic Caucus (~100 Members)",
        group: "caucus",
        e: 78, s: 86, a: 60, d: 78,
        desc: "The progressive wing of the Democratic Party in Congress, championing universal healthcare, labor unions, climate legislation, and taxing top earners."
    },
    {
        name: "Green Party of the United States",
        sub: "US Third Party (Eco-Progressive)",
        group: "caucus",
        e: 86, s: 88, a: 74, d: 84,
        desc: "Focuses on rapid fossil-fuel phaseout, eco-socialism, ranked-choice voting, cutting military spending, and grassroots social justice."
    },
    {
        name: "New Democrat Coalition",
        sub: "US House Democratic Caucus (Center-Left)",
        group: "caucus",
        e: 58, s: 72, a: 50, d: 76,
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
        e: 86, s: 86, a: 64, d: 78,
        desc: "European left-wing parties championing wealth taxes, lower retirement ages, public ownership of utilities, and strong worker protections."
    },
    {
        name: "New Democratic Party (NDP)",
        sub: "Canada (Social Democratic)",
        group: "international",
        e: 76, s: 84, a: 58, d: 78,
        desc: "Canada's social-democratic party, backing universal pharmacare, dental care, union rights, affordable housing, and climate action."
    },
    {
        name: "Labour Party (UK) / SPD (Germany) / ALP (Australia)",
        sub: "UK, Germany & Australia (Mainstream Center-Left)",
        group: "international",
        e: 66, s: 74, a: 50, d: 74,
        desc: "Governing center-left labor parties that pair market economies with universal public healthcare, worker rights, and green industrial investment."
    },
    {
        name: "Green Party (Bündnis 90 / UK & European Greens)",
        sub: "Europe & Commonwealth (Eco-Progressive)",
        group: "international",
        e: 74, s: 88, a: 62, d: 85,
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
        e: 40, s: 68, a: 48, d: 85,
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
    { name: "Progressive Left (~6% of US Public)", e: 86, s: 90, desc: "Hold strongly progressive views across economic, racial, climate, and social issues; highly engaged in politics." },
    { name: "Establishment Liberals (~13% of US Public)", e: 66, s: 78, desc: "Strongly Democratic and socially liberal, favoring institutional reform and multilateral alliances." },
    { name: "Democratic Mainstays (~16% of US Public)", e: 68, s: 58, desc: "Loyal center-left voters who strongly back the social safety net and unions while holding moderate cultural views." },
    { name: "Outsider Left (~10% of US Public)", e: 74, s: 82, desc: "Younger, economically left-leaning and socially progressive, but skeptical of establishment institutions." },
    { name: "Stressed Sideliners (~15% of US Public)", e: 52, s: 48, desc: "Economically pro-safety-net and culturally moderate voters who sit near the empirical center of the electorate." },
    { name: "Ambivalent Right (~12% of US Public)", e: 26, s: 58, desc: "Favor free markets, smaller government, and low taxes, while holding moderate or libertarian views on social issues." },
    { name: "Committed Conservatives (~7% of US Public)", e: 18, s: 22, desc: "Hold consistently conservative views across free enterprise, limited government, and traditional values." },
    { name: "Populist Right (~11% of US Public)", e: 36, s: 14, desc: "Strongly nationalist and restrictionist on immigration; skeptical of both big government and multinational corporations." },
    { name: "Faith and Flag Conservatives (~10% of US Public)", e: 22, s: 10, desc: "Socially traditionalist voters who favor strong national defense and religious heritage in public life." }
];
