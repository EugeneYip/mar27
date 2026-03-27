import React, { useMemo, useState } from "react";

const L = (en, zh) => ({ en, zh });

const theme = {
  bg: "#FCFAF2",
  card: "#FFFDF8",
  ink: "#1F2A2E",
  sub: "#5F6966",
  line: "#DDD6C8",
  accent: "#496B6A",
  accent2: "#9F5F56",
  accent3: "#7B8F63",
  accent4: "#6F6A8C",
  gold: "#B98928",
};

const ICONS = {
  spark: ["M12 3.5 14.6 9.4 20.5 12 14.6 14.6 12 20.5 9.4 14.6 3.5 12 9.4 9.4 12 3.5"],
  layers: ["M12 4 20.5 8.2 12 12.4 3.5 8.2 12 4", "M4.7 11.9 12 15.7 19.3 11.9", "M4.7 15.9 12 19.7 19.3 15.9"],
  chart: ["M4 20h16", "M7 18V11", "M12 18V7", "M17 18V13"],
  shield: ["M12 4c2.8 1.9 5.7 2.8 8 2.9v5.2c0 4.4-2.7 6.9-8 8.7-5.3-1.8-8-4.3-8-8.7V6.9C6.3 6.8 9.2 5.9 12 4", "m9.3 12.4 1.9 1.9 3.7-4.5"],
  plug: ["M9 4v5", "M15 4v5", "M7.5 8.5h9V11A4.5 4.5 0 0 1 12 15.5 4.5 4.5 0 0 1 7.5 11V8.5", "M12 15.5V20"],
  gear: ["M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8", "M12 3.8V6", "M12 18V20.2", "M20.2 12H18", "M6 12H3.8", "M17.8 6.2 16.1 7.9", "M7.9 16.1 6.2 17.8", "M17.8 17.8 16.1 16.1", "M7.9 7.9 6.2 6.2"],
  clock: ["M12 3.8A8.2 8.2 0 1 0 12 20.2 8.2 8.2 0 0 0 12 3.8", "M12 7.8V12l3.1 2"],
  book: ["M5.5 5.2h7a2 2 0 0 1 2 2v11h-7a2 2 0 0 0-2 2v-15", "M18.5 5.2h-6a2 2 0 0 0-2 2v11h6a2 2 0 0 1 2 2v-15"],
  network: ["M12 5.2a2 2 0 1 0 0 .01", "M5.5 18.2a2 2 0 1 0 0 .01", "M18.5 18.2a2 2 0 1 0 0 .01", "M10.8 7 7.1 16", "M13.2 7 16.9 16", "M7.5 18.2h9"],
  target: ["M12 3.8A8.2 8.2 0 1 0 12 20.2 8.2 8.2 0 0 0 12 3.8", "M12 7.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5", "M12 11.2A.8.8 0 1 0 12 12.8.8.8 0 0 0 12 11.2"],
  home: ["M4 10.5 12 4l8 6.5", "M6 9.5V20h12V9.5"],
  globe: ["M12 3.8A8.2 8.2 0 1 0 12 20.2 8.2 8.2 0 0 0 12 3.8", "M3.9 12h16.2", "M12 3.8c2.5 2 3.9 5 3.9 8.2 0 3.2-1.4 6.2-3.9 8.2-2.5-2-3.9-5-3.9-8.2 0-3.2 1.4-6.2 3.9-8.2"],
  check: ["m5 12.5 4 4L19 7"],
  down: ["m6.5 9.5 5.5 5 5.5-5"],
  x: ["M6 6l12 12", "M18 6 6 18"],
};

const heroStats = [
  { value: "$3B", label: L("Anthropic ARR, May 2025", "Anthropic ARR，2025 年 5 月"), tiers: ["B"] },
  { value: "$183B", label: L("Post-money valuation, Sept. 2025", "投後估值，2025 年 9 月"), tiers: ["B"] },
  { value: "42%", label: L("Claude code-generation share", "Claude 程式碼生成市占"), tiers: ["B"] },
  { value: "2026", label: L("Cowork push for knowledge work", "Cowork 推進知識工作"), tiers: ["A"] },
];

const summaryItems = [
  {
    label: L("Current thesis", "目前主論點"),
    text: L(
      "Anthropic is trying to turn Claude from a strong model into a governed operating layer for enterprise work.",
      "Anthropic 正試圖把 Claude 從強模型推成可治理的 enterprise operating layer。"
    ),
  },
  {
    label: L("Key numbers", "關鍵數字"),
    text: L(
      "$3B ARR, $183B valuation, 42% code-generation share, and a 2026 Cowork push beyond coding.",
      "$3B ARR、$183B 估值、42% 程式碼生成市占，以及 2026 年從 coding 走向更廣知識工作的 Cowork 推進。"
    ),
  },
  {
    label: L("Safest reading", "最穩判讀"),
    text: L(
      "The moat is moving up the stack, from raw models toward skills, workflow fit, connectors, and governance.",
      "護城河正在往上層移動，從原始模型走向 skills、workflow fit、connectors 與 governance。"
    ),
  },
];

const thesisCards = [
  {
    icon: "spark",
    title: L("This is not just a product launch story", "這不只是產品發表故事"),
    body: L(
      "The strongest reading is strategic. The course had already taught weak AI as prediction embedded in a workflow. Anthropic Agents asks what changes when AI can plan, retrieve context, use tools, and carry multi-step work closer to completion.",
      "最穩的讀法是策略讀法。課堂前面已經把弱 AI 講成嵌進 workflow 的 prediction。Anthropic Agents 真正追問的是，當 AI 開始能規劃、抓 context、使用工具，並把多步驟工作推向更接近完成時，整個 operating layer 會怎麼改變。"
    ),
    tiers: ["A", "C"],
  },
  {
    icon: "chart",
    title: L("The move is from coding to knowledge work", "重點是從 coding 走向 knowledge work"),
    body: L(
      "The Briefing frames Claude Code as the proof point from 2025 and Cowork as the next move for 2026. The form factor changed. Anthropic is trying to bring agent power into the interfaces non-technical workers already inhabit.",
      "The Briefing 把 Claude Code 講成 2025 的 proof point，再把 Cowork 講成 2026 的下一步。真正改變的是 form factor。Anthropic 想把 agent 能力帶進非技術工作者原本就在用的介面。"
    ),
    tiers: ["A"],
  },
  {
    icon: "shield",
    title: L("Anthropic’s tension is real", "Anthropic 的核心張力是真實存在的"),
    body: L(
      "The case places Anthropic between safety-first identity and commercial acceleration. It is no longer deciding whether to commercialize. It is deciding how aggressively to push into agents without weakening the governance and alignment brand that made it distinctive.",
      "案例把 Anthropic 放在 safety-first 身分與商業加速之間。它已不是在決定要不要商業化，而是在決定 agents 要推多快，同時又不能削弱原本讓它有辨識度的治理與 alignment 品牌。"
    ),
    tiers: ["B"],
  },
  {
    icon: "target",
    title: L("The moat is moving up the stack", "護城河正在往上層移動"),
    body: L(
      "The deeper competitive question is no longer just model quality. It is who best codifies institutional method, plugs into enterprise systems, fits real workflows, and governs deployment well.",
      "更深的競爭問題已不只是模型品質，而是誰最能把 institutional method 編碼化、最能接進 enterprise systems、最貼合真實 workflow，並且最會治理部署。"
    ),
    tiers: ["A", "C"],
  },
];

const timeline = [
  ["2021", L("Anthropic is founded around safety and long-horizon governance", "Anthropic 以 safety 與長期治理為核心成立"), ["B"]],
  ["2025", L("Commercial scale, valuation pressure, and stronger coding traction", "商業規模、估值壓力與更強的 coding traction 同時出現"), ["B"]],
  ["Oct. 2025", L("Agent Skills become explicit as structured organizational know-how", "Agent Skills 被明確產品化為結構化的組織 know-how"), ["A"]],
  ["Feb. 2026", L("The Briefing presents Cowork, plugins, controls, and enterprise use cases", "The Briefing 展示 Cowork、plugins、controls 與 enterprise use cases"), ["A"]],
];

const stackCards = [
  { icon: "layers", title: L("Claude as a thinking engine", "Claude 作為 thinking engine"), body: L("Anthropic does not present Claude as a simple assistant. It presents Claude as a system layer meant to make employees smarter, processes faster, and products more transformative.", "Anthropic 並不是把 Claude 講成單純 assistant，而是把它講成一個系統層，目標是讓員工更強、流程更快、產品更具變革性。"), tiers: ["A"] },
  { icon: "plug", title: L("Cowork changes the form factor", "Cowork 改變的是 form factor"), body: L("Claude Code worked because technical users were already comfortable in terminals and IDEs. Cowork matters because it lowers both the technical barrier and the organizational adoption barrier for broader knowledge work.", "Claude Code 成功，是因為技術使用者原本就熟悉 terminals 與 IDEs。Cowork 的意義，在於它同時降低了技術門檻與組織採用門檻。"), tiers: ["A"] },
  { icon: "book", title: L("Plugins are the operating mechanism", "Plugins 才是真正的作業機制"), body: L("Plugins package skills, data connections, and workflows. That matters because they turn Claude from a general model into a company-specific operating layer.", "Plugins 把 skills、資料連接與 workflows 打包起來。這很重要，因為它把 Claude 從泛用模型推成公司專屬的 operating layer。"), tiers: ["A"] },
  { icon: "gear", title: L("Skills turn tacit method into reusable assets", "Skills 把隱性方法變成可重用資產"), body: L("The Agent Skills material frames a skill as organized files centered on SKILL.md, with progressive disclosure, optional code execution, and iteration based on how Claude actually uses the skill in real tasks.", "Agent Skills 材料把 skill 講成以 SKILL.md 為核心的組織化檔案，搭配 progressive disclosure、必要時的 code execution，以及根據 Claude 真實使用情況持續迭代。"), tiers: ["A"] },
  { icon: "network", title: L("MCP extends reach into live systems", "MCP 讓 Claude 接進真實系統"), body: L("The stack gets much more valuable when Claude can reach live tools and data. This is where the agent stops being a clever response generator and starts affecting the workflow itself.", "當 Claude 能接進即時工具與資料時，整個 stack 的價值就大幅上升。也正是在這裡，agent 不再只是聰明的回應生成器，而開始真正影響 workflow。"), tiers: ["A", "C"] },
  { icon: "shield", title: L("Enterprise controls are part of the product", "企業控制本身就是產品的一部分"), body: L("Provisioning, private plugin marketplaces, GitHub sources, structured slash-command forms, and OpenTelemetry-based auditability all signal that enterprise agent deployment is as much a governance problem as a model problem.", "Provisioning、私人 plugin marketplaces、GitHub sources、結構化 slash-command forms 與以 OpenTelemetry 為基礎的 auditability，都顯示 enterprise agent deployment 既是模型問題，也是治理問題。"), tiers: ["A"] },
];

const internalCases = [
  {
    icon: "chart",
    name: L("Finance", "Finance"),
    title: L("Lindsay Schwitzer shows how plugins compress analysis work", "Lindsay Schwitzer 展示 plugins 如何壓縮分析工作"),
    bullets: [
      L("Finance used skills plus MCP connectors across warehouse, collaboration, project management, and internal knowledge systems.", "Finance 把 skills 與 MCP connectors 接進資料倉儲、協作、專案管理與內部知識系統。"),
      L("Dashmaker let even non-technical staff build grounded React dashboards from trusted data.", "Dashmaker 讓非技術人員也能用可信資料建立有根據的 React dashboards。"),
      L("The important point is not just speed. It is moving from reactive reporting toward proactive detection and explanation.", "真正重要的不只是速度，而是從被動報告走向主動偵測與解釋。"),
    ],
    tiers: ["A"],
  },
  {
    icon: "book",
    name: L("Legal", "Legal"),
    title: L("Mark Pike is a strong proof that the technical barrier can fall sharply", "Mark Pike 很能證明技術門檻可以大幅下降"),
    bullets: [
      L("He openly says he does not code, yet helped build the legal plugin in one afternoon.", "他直接說自己不會寫程式，但仍能在一個下午內協助做出 legal plugin。"),
      L("The plugin was built from legal memos, policies, reasoning patterns, and team method, not from a separate frontier model.", "這個 plugin 建立在法律備忘錄、政策文件、推理模式與團隊做事方法之上，不是另一個 frontier model。"),
      L("The strategic lesson is that domain method becomes the scarce layer once model access broadens.", "策略上的啟示是，一旦模型存取變得更普及，真正稀缺的層就變成 domain method。"),
    ],
    tiers: ["A", "C"],
  },
  {
    icon: "layers",
    name: L("Product", "Product"),
    title: L("Matt Picella shows what an agent stack looks like in managerial work", "Matt Picella 讓人看見 agent stack 在管理工作裡長甚麼樣子"),
    bullets: [
      L("A productivity plugin kept tasks, open loops, and institutional memory in one maintained structure.", "Productivity plugin 把任務、未完成事項與 institutional memory 放在同一個可維護結構中。"),
      L("A data plugin let Claude write SQL, query data, and generate grounded analysis instead of generic filler.", "Data plugin 讓 Claude 能寫 SQL、查資料，產出有根據的分析，而不是空泛 filler。"),
      L("The value is not more documents. It is fewer important things getting dropped.", "真正的價值不是多幾份文件，而是更少遺漏真正重要的事情。"),
    ],
    tiers: ["A"],
  },
];

const externalCases = [
  { company: "Spotify", stat: "90%", note: L("up to engineering time reduction", "工程時間減少最高"), body: L("Spotify used Claude in systems engineers already touched every day. The lesson is de-bottlenecking specialist work, not just adding convenience.", "Spotify 把 Claude 放進工程師原本每天就在用的系統。重點不只是更方便，而是解掉原本只靠少數專家才能處理的瓶頸。"), tiers: ["A"] },
  { company: "Novo Nordisk", stat: "10+ weeks → 10 minutes", note: L("regulatory document cycle", "法規文件週期"), body: L("Novo Scribe shows that agent value extends far beyond engineering. A non-engineering leader can prototype features in natural language while compliant documentation cycles collapse.", "Novo Scribe 顯示 agent 價值遠不只存在於工程領域。非工程背景主管也能用自然語言做原型，同時大幅壓縮合規文件週期。"), tiers: ["A"] },
  { company: "Salesforce", stat: "96% / 97 min", note: L("satisfaction and time saved", "滿意度與節省時間"), body: L("Salesforce matters because it shows that value capture can happen inside an existing collaboration layer. The prize is not always a new destination. Sometimes it is the workflow surface that users already live in.", "Salesforce 很重要，因為它顯示價值擷取可以發生在既有 collaboration layer 裡。獎賞不一定來自新入口，有時真正的 prize 就是使用者原本已經住在裡面的 workflow surface。"), tiers: ["A", "C"] },
];

const competition = [
  {
    player: "Anthropic",
    route: L("Governed enterprise agents", "可治理的 enterprise agents"),
    strength: L("Coding traction, safety brand, skills plus plugin logic, and a strong enterprise-control story.", "coding traction、安全品牌、skills 與 plugin 邏輯，以及完整的企業控制敘事。"),
    tension: L("Push faster into agents without weakening the safety-first identity.", "更快推進 agents，同時不削弱 safety-first 身分。"),
    tiers: ["A", "B"],
  },
  {
    player: "OpenAI",
    route: L("Consumer scale plus app surface", "消費者規模加上 app 入口"),
    strength: L("Operator, ChatGPT agent, huge distribution, and broader app experiences.", "Operator、ChatGPT agent、龐大分發能力，以及更廣的 app experiences。"),
    tension: L("Convert broad use into durable enterprise control while carrying high burn.", "在高燒錢情況下，把廣泛使用轉成穩定 enterprise control。"),
    tiers: ["B"],
  },
  {
    player: "Google",
    route: L("Infrastructure and platform stack", "基礎設施與平台堆疊"),
    strength: L("Gemini, Vertex AI Agent Builder, protocol-level play, and strong system position.", "Gemini、Vertex AI Agent Builder、協定層打法，以及強系統位置。"),
    tension: L("Needs clearer product coherence across many surfaces.", "仍需要在多個產品表面之間建立更清楚的一致性。"),
    tiers: ["B"],
  },
  {
    player: "Open-weight camp",
    route: L("Cost, transparency, control", "成本、透明度與控制權"),
    strength: L("Lower cost, self-hosting, customization, and stronger local control for some firms.", "較低成本、自行託管、客製能力，以及部分企業更看重的本地控制權。"),
    tension: L("Weaker default governance and harder coordination than tightly managed closed systems.", "相較高度管理的封閉系統，預設治理較弱，協調難度也更高。"),
    tiers: ["B", "C"],
  },
];

const readiness = [
  { label: L("Organizations making major agentic AI investments", "對 agentic AI 做重大投資的組織"), value: 19, display: "19%" },
  { label: L("Projects predicted to be canceled by 2027", "預測在 2027 年前被取消的專案"), value: 40, display: "40%" },
  { label: L("Organizations seeing zero GenAI return", "GenAI 投資回報為零的組織"), value: 95, display: "95%" },
  { label: L("Firms trusting autonomous AI judgment", "信任 AI 可自主做 judgment 的公司"), value: 3, display: "<3%" },
];

const judgment = [
  { icon: "target", title: L("Value is moving up the stack", "價值正在往上層移動"), body: L("Raw model quality still matters, but durable advantage increasingly sits in connectors, institutional knowledge, workflow fit, and governance.", "底層模型品質仍然重要，但更持久的優勢愈來愈落在 connectors、institutional knowledge、workflow fit 與 governance。"), tiers: ["A", "C"] },
  { icon: "clock", title: L("Why agents are not everywhere yet", "為甚麼 agents 還沒有無所不在"), body: L("The constraint is not only intelligence. It is trust, access to data, process redesign, ROI proof, and organizational willingness to let the system act.", "限制不只在 intelligence，而在 trust、資料存取、流程重設、ROI 證明，以及組織是否願意讓系統真正行動。"), tiers: ["B", "C"] },
  { icon: "shield", title: L("Who benefits most", "誰最容易受益"), body: L("Agents are more complementary to people who frame problems, manage context, and exercise judgment. They are more threatening to roles built mainly around routine transformation of information.", "Agents 對能定義問題、管理 context、行使 judgment 的人更像放大器；對主要建立在 routine information transformation 上的角色，威脅更高。"), tiers: ["A", "C"] },
  { icon: "spark", title: L("What Anthropic is really betting on", "Anthropic 真正押注的是甚麼"), body: L("Not just a better model and not just a prettier app. Anthropic is betting that governed action plus codified organizational method will be more defensible than a generic assistant race alone.", "不是只有更好的模型，也不是只有更漂亮的 app。Anthropic 真正押注的是，可治理的行動能力加上被編碼化的組織方法，會比單純的泛用 assistant 競賽更有防守力。"), tiers: ["A", "C"] },
];

const quickFacts = [
  ["$3B", L("Anthropic ARR in May 2025", "Anthropic 2025 年 5 月 ARR")],
  ["$183B", L("Anthropic post-money valuation in Sept. 2025", "Anthropic 2025 年 9 月投後估值")],
  ["42%", L("Claude code-generation share", "Claude 程式碼生成市占")],
  ["32%", L("Enterprise AI solutions share", "企業 AI 解決方案市占")],
  ["$2.5B", L("Compute cost in 2025", "2025 年運算成本")],
  ["90%", L("Spotify time reduction, up to", "Spotify 工程時間減少最高")],
  ["10+ weeks → 10 minutes", L("Novo Nordisk documentation cycle", "Novo Nordisk 文件週期")],
  ["96% / 97 min", L("Salesforce satisfaction and time saved", "Salesforce 滿意度與節省時間")],
];

function pickText(value, mode) {
  if (typeof value === "string") return value;
  if (mode === "zh") return value.zh;
  return value.en;
}

function Icon({ name, className = "h-5 w-5" }) {
  const paths = ICONS[name] || ICONS.spark;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

function Text({ value, mode, className = "", mutedBi = true }) {
  if (typeof value === "string") {
    return <div className={`break-words [overflow-wrap:anywhere] ${className}`}>{value}</div>;
  }

  if (mode === "bi") {
    return (
      <div className={`space-y-1.5 whitespace-pre-line break-words [overflow-wrap:anywhere] ${className}`}>
        <div>{value.en}</div>
        <div className={mutedBi ? "text-[var(--sub)]" : ""}>{value.zh}</div>
      </div>
    );
  }

  return <div className={`whitespace-pre-line break-words [overflow-wrap:anywhere] ${className}`}>{pickText(value, mode)}</div>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[24px] border border-[var(--line)] bg-[var(--card)] shadow-[0_10px_30px_rgba(31,42,46,.055)] ${className}`}>{children}</div>;
}

function TierPills({ tiers = [] }) {
  const map = {
    A: "bg-[rgba(73,107,106,.12)] text-[var(--accent)]",
    B: "bg-[rgba(185,137,40,.14)] text-[var(--gold)]",
    C: "bg-[rgba(111,106,140,.12)] text-[var(--accent4)]",
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tiers.map((tier) => (
        <span key={tier} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${map[tier]}`}>
          [{tier}]
        </span>
      ))}
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, mode }) {
  return (
    <div>
      {eyebrow ? <Text value={eyebrow} mode={mode} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--sub)]" /> : null}
      <Text value={title} mode={mode} className="mt-2 max-w-4xl text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] text-[var(--ink)] sm:text-[2rem]" />
      {sub ? <Text value={sub} mode={mode} className="mt-3 max-w-3xl text-[14px] leading-7 text-[var(--sub)] sm:text-[15px]" /> : null}
    </div>
  );
}

function MetricCard({ value, label, tiers, mode }) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-[var(--ink)] sm:text-[2rem]">{value}</div>
      <Text value={label} mode={mode} className="mt-2 text-[13px] leading-6 text-[var(--sub)] sm:text-sm" />
      <TierPills tiers={tiers} />
    </Card>
  );
}

function InsightCard({ icon, title, body, tiers, mode }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(73,107,106,.1)] text-[var(--accent)] sm:h-11 sm:w-11">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <Text value={title} mode={mode} className="text-[15px] font-semibold leading-7 text-[var(--ink)] sm:text-base" />
          <Text value={body} mode={mode} className="mt-2.5 text-[14px] leading-7 text-[var(--sub)]" />
          <TierPills tiers={tiers} />
        </div>
      </div>
    </Card>
  );
}

function StickySummary({ mode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-[56px] z-20 mt-4 sm:top-[60px]">
      <Card className="bg-[rgba(255,253,248,.95)] px-3 py-2.5 backdrop-blur sm:px-4 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(73,107,106,.1)] text-[var(--accent)]">
              <Icon name="spark" className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sub)]">Quick Summary</div>
              <div className="truncate text-[13px] leading-5 text-[var(--ink)]">
                {pickText(L("Thesis, numbers, and safest reading", "主論點、數字與最穩判讀"), mode === "bi" ? "en" : mode)}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--ink)] transition hover:bg-[rgba(73,107,106,.05)]"
          >
            {open ? pickText(L("Hide", "收起"), mode === "bi" ? "en" : mode) : pickText(L("Show", "展開"), mode === "bi" ? "en" : mode)}
          </button>
        </div>

        {open ? (
          <div className="mt-3 grid gap-3 xl:grid-cols-3 xl:gap-4">
            {summaryItems.map((item) => (
              <div key={item.label.en} className="min-w-0 rounded-[18px] bg-[rgba(31,42,46,.025)] px-3.5 py-3">
                <Text value={item.label} mode={mode} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sub)]" />
                <Text value={item.text} mode={mode} className="mt-1.5 text-[13px] leading-6 text-[var(--ink)]" mutedBi={false} />
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </div>
  );
}

function Timeline({ mode }) {
  return (
    <div className="space-y-3.5">
      {timeline.map(([year, text, tiers], index) => (
        <div key={year} className="grid gap-3 md:grid-cols-[104px_minmax(0,1fr)] md:gap-4">
          <div className="relative pl-8 md:pl-0">
            {index < timeline.length - 1 ? <div className="absolute left-[9px] top-7 h-[calc(100%+14px)] w-px bg-[var(--line)] md:left-auto md:right-0" /> : null}
            <div className="absolute left-0 top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--accent)] md:left-auto md:right-[-9px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </div>
            <div className="text-[13px] font-semibold text-[var(--ink)] sm:text-sm">{year}</div>
          </div>
          <Card className="p-4 sm:p-5">
            <Text value={text} mode={mode} className="text-[14px] leading-7 text-[var(--sub)]" />
            <TierPills tiers={tiers} />
          </Card>
        </div>
      ))}
    </div>
  );
}

function BarChart({ mode }) {
  const max = useMemo(() => Math.max(...readiness.map((r) => r.value)), []);

  return (
    <Card className="p-5 sm:p-6">
      <Text value={L("Adoption reality check", "採用現實檢查")} mode={mode} className="text-[15px] font-semibold text-[var(--ink)]" />
      <Text value={L("These numbers matter because they stop the discussion from becoming hype-only. Real deployment still looks early, uneven, and fragile.", "這些數字很重要，因為它們能防止討論滑向純 hype。真實部署仍然很早、不平均，也很脆弱。")} mode={mode} className="mt-2 text-[14px] leading-7 text-[var(--sub)]" />
      <div className="mt-5 space-y-4">
        {readiness.map((row) => (
          <div key={row.display}>
            <div className="mb-1.5 flex items-start justify-between gap-4">
              <Text value={row.label} mode={mode} className="max-w-[75%] text-[12px] leading-5 text-[var(--sub)] sm:text-[13px]" />
              <div className="shrink-0 text-[12px] font-semibold text-[var(--ink)] sm:text-[13px]">{row.display}</div>
            </div>
            <div className="h-2.5 rounded-full bg-[rgba(31,42,46,.06)]">
              <div className="h-2.5 rounded-full bg-[var(--accent)]" style={{ width: `${(row.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <TierPills tiers={["B"]} />
    </Card>
  );
}

function QuickTable({ mode }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-[var(--line)] bg-[rgba(31,42,46,.03)] px-4 py-3.5 sm:px-5 sm:py-4">
        <Text value={L("Numbers worth memorizing", "最值得背的數字")} mode={mode} className="text-[15px] font-semibold text-[var(--ink)]" />
      </div>
      <div className="divide-y divide-[var(--line)]">
        {quickFacts.map(([number, description]) => (
          <div key={number} className="grid grid-cols-[100px_minmax(0,1fr)] gap-3 px-4 py-2.5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-4 sm:px-5 sm:py-3">
            <div className="text-[13px] font-semibold leading-6 text-[var(--ink)] sm:text-sm">{number}</div>
            <Text value={description} mode={mode} className="text-[13px] leading-6 text-[var(--sub)] sm:text-sm sm:leading-7" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompetitionTable({ mode }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <colgroup>
            <col className="w-[16%]" />
            <col className="w-[22%]" />
            <col className="w-[31%]" />
            <col className="w-[31%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[var(--line)] bg-[rgba(31,42,46,.03)]">
              {[L("Player", "玩家"), L("Route", "路徑"), L("Strength", "強項"), L("Tension", "張力")].map((header, index) => (
                <th key={index} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sub)] sm:px-5 sm:py-4 sm:text-xs sm:tracking-[0.16em]">
                  {pickText(header, mode === "bi" ? "en" : mode)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competition.map((row) => (
              <tr key={row.player} className="border-b border-[var(--line)] align-top last:border-b-0">
                <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="min-w-[112px] text-[13px] font-semibold leading-6 text-[var(--ink)] sm:text-sm">{row.player}</div>
                  <TierPills tiers={row.tiers} />
                </td>
                <td className="px-4 py-3.5 text-[13px] leading-6 text-[var(--sub)] sm:px-5 sm:py-4 sm:text-sm sm:leading-7"><Text value={row.route} mode={mode} /></td>
                <td className="px-4 py-3.5 text-[13px] leading-6 text-[var(--sub)] sm:px-5 sm:py-4 sm:text-sm sm:leading-7"><Text value={row.strength} mode={mode} /></td>
                <td className="px-4 py-3.5 text-[13px] leading-6 text-[var(--sub)] sm:px-5 sm:py-4 sm:text-sm sm:leading-7"><Text value={row.tension} mode={mode} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function CompetitionScale({ mode }) {
  const points = [
    { left: 12, label: "Meta / open-weight", color: theme.accent3 },
    { left: 46, label: "Google", color: theme.accent4 },
    { left: 68, label: "Anthropic", color: theme.accent },
    { left: 83, label: "OpenAI", color: theme.accent2 },
  ];

  return (
    <Card className="p-5 sm:p-6">
      <Text value={L("Open versus closed is useful, but only if you ask the right question", "開放與封閉有用，但前提是問題問對")} mode={mode} className="text-[15px] font-semibold leading-7 text-[var(--ink)]" />
      <Text value={L("The issue is not ideology. It is control, monetization, deployment, and who can make the workflow layer stick inside real organizations.", "問題不在意識形態，而在控制權、monetization、部署方式，以及誰能讓 workflow layer 真正黏進組織裡。")} mode={mode} className="mt-2 text-[14px] leading-7 text-[var(--sub)]" />

      <div className="mt-6">
        <div className="relative h-4 rounded-full bg-[linear-gradient(90deg,rgba(123,143,99,.22),rgba(73,107,106,.12),rgba(159,95,86,.22))]">
          {points.map((point) => (
            <div key={point.label} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${point.left}%` }}>
              <div className="h-4 w-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: point.color }} />
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[11px] font-semibold text-[var(--sub)] xl:grid-cols-4">
          {points.map((point) => (
            <div key={point.label} className="flex items-center gap-2 xl:justify-center">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: point.color }} />
              <span>{point.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {[
          L("Open-weight promise: lower cost, self-hosting, transparency, deeper customization.", "Open-weight 承諾：更低成本、自行託管、更高透明度、更深客製能力。"),
          L("Closed-system promise: tighter experience control, stronger default governance, and often clearer value capture.", "封閉系統承諾：更緊的體驗控制、更強的預設治理，以及通常更清楚的價值擷取。"),
        ].map((item, index) => (
          <div key={index} className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
            <Text value={item} mode={mode} className="text-[14px] leading-7 text-[var(--sub)]" />
          </div>
        ))}
      </div>

      <TierPills tiers={["B", "C"]} />
    </Card>
  );
}

function LangSwitch({ mode, setMode }) {
  const [open, setOpen] = useState(false);
  const options = [
    { key: "en", label: "English" },
    { key: "zh", label: "中文" },
    { key: "bi", label: "EN / 中文" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/92 text-[var(--ink)] shadow-xl backdrop-blur transition hover:scale-[1.02]"
        >
          <Icon name={open ? "x" : "globe"} />
        </button>

        {open ? (
          <div className="absolute bottom-14 right-0 w-56 rounded-[22px] border border-[var(--line)] bg-white/95 p-2 shadow-2xl backdrop-blur">
            <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sub)]">Language</div>
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  setMode(option.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm ${mode === option.key ? "bg-[rgba(73,107,106,.12)] text-[var(--ink)]" : "text-[var(--sub)] hover:bg-[rgba(73,107,106,.06)]"}`}
              >
                <span>{option.label}</span>
                {mode === option.key ? <Icon name="check" className="h-4 w-4" /> : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function AnthropicAgentsInfrastructureV2() {
  const [mode, setMode] = useState("en");

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--ink)]"
      style={{
        "--bg": theme.bg,
        "--card": theme.card,
        "--ink": theme.ink,
        "--sub": theme.sub,
        "--line": theme.line,
        "--accent": theme.accent,
        "--accent2": theme.accent2,
        "--accent3": theme.accent3,
        "--accent4": theme.accent4,
        "--gold": theme.gold,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(73,107,106,.08),transparent_34%),radial-gradient(circle_at_top_right,rgba(159,95,86,.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1360px] px-4 pb-24 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <div className="sticky top-0 z-30 -mx-4 border-b border-[var(--line)] bg-[rgba(252,250,242,.9)] px-4 py-2.5 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-0.5 text-xs font-semibold text-[var(--sub)]">
            {[
              ["overview", "home", L("Overview", "總覽")],
              ["stack", "layers", L("Stack", "堆疊")],
              ["cases", "chart", L("Cases", "案例")],
              ["competition", "target", L("Competition", "競爭")],
              ["judgment", "shield", L("Judgment", "判讀")],
              ["lab", "book", L("Reference lab", "資料實驗室")],
            ].map(([id, icon, label]) => (
              <a key={id} href={`#${id}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--line)] bg-white/82 px-3 py-2 hover:text-[var(--ink)]">
                <Icon name={icon} className="h-4 w-4" />
                <span>{pickText(label, mode === "bi" ? "en" : mode)}</span>
              </a>
            ))}
          </div>
        </div>

        <StickySummary mode={mode} />

        <section id="overview" className="pt-7 sm:pt-8">
          <div className="grid gap-5 xl:grid-cols-[1.28fr_.72fr]">
            <Card className="overflow-hidden p-5 sm:p-7 xl:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[rgba(73,107,106,.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Anthropic Agents</span>
                <span className="rounded-full bg-[rgba(185,137,40,.14)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">The Briefing + Agent Skills</span>
              </div>

              <Text value={L("Anthropic Agents", "Anthropic Agents")} mode={mode} className="mt-4 max-w-3xl text-[2rem] font-semibold leading-none tracking-[-0.05em] text-[var(--ink)] sm:text-[3.75rem]" mutedBi={false} />

              <Text
                value={L(
                  "A clean way to read this material is to treat it as a transition from strong models toward governed enterprise operating layers. The question is no longer only how good Claude is. The question is how Claude, skills, plugins, live systems, and controls come together to carry real work.",
                  "理解這組材料最乾淨的方式，是把它看成從強模型走向可治理 enterprise operating layers 的轉型。問題已不只是 Claude 本身有多強，而是 Claude、skills、plugins、即時系統與控制機制如何一起承擔真實工作。"
                )}
                mode={mode}
                className="mt-4 max-w-[48rem] text-[14px] leading-7 text-[var(--sub)] sm:text-[15px] xl:max-w-[44rem]"
              />
            </Card>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              {heroStats.map((stat) => (
                <MetricCard key={stat.value} {...stat} mode={mode} />
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {thesisCards.map((card) => (
              <InsightCard key={card.title.en} {...card} mode={mode} />
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
            <Card className="p-5 sm:p-7">
              <SectionHead
                eyebrow={L("Time logic", "時間邏輯")}
                title={L("A short timeline that keeps the story coherent", "一條能把故事講順的簡短時間線")}
                sub={L("The material crosses a case snapshot, a 2025 Agent Skills essay, and a 2026 enterprise event. The timeline below keeps those layers in one line of sight.", "這組材料同時跨了案例時間點、2025 的 Agent Skills 文章，以及 2026 的企業活動。下面的時間線把這些層次放進同一條視線裡。")}
                mode={mode}
              />
              <div className="mt-5"><Timeline mode={mode} /></div>
            </Card>

            <Card className="p-5 sm:p-7">
              <SectionHead
                eyebrow={L("Course bridge", "課程橋接")}
                title={L("Why this case fits the course so well", "為甚麼這個案例和課程邏輯高度吻合")}
                sub={L("The course keeps returning to value creation, value delivery, and value capture. Anthropic Agents is useful because it touches all three at once. It shows the promise, the operating stack, and the emerging moat in one place.", "這門課反覆回到 value creation、value delivery 與 value capture。Anthropic Agents 很有價值，因為它一次碰到三者。它把價值承諾、operating stack，以及正在形成中的護城河放在同一個地方。")}
                mode={mode}
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["spark", L("Value creation", "Value creation"), L("Agentic work promises faster, fuller outcomes.", "Agentic work 承諾更快、更完整的 outcomes。")],
                  ["layers", L("Value delivery", "Value delivery"), L("Cowork, plugins, skills, MCP, and controls form the operating model.", "Cowork、plugins、skills、MCP 與 controls 共同構成 operating model。")],
                  ["shield", L("Value capture", "Value capture"), L("Institutional knowledge, workflow fit, and governance become harder to copy.", "institutional knowledge、workflow fit 與 governance 變成更難複製的層。")],
                ].map(([icon, header, text]) => (
                  <div key={icon} className="rounded-[20px] border border-[var(--line)] bg-white/75 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[rgba(73,107,106,.1)] text-[var(--accent)]">
                      <Icon name={icon} className="h-5 w-5" />
                    </div>
                    <Text value={header} mode={mode} className="mt-3 text-[14px] font-semibold text-[var(--ink)]" />
                    <Text value={text} mode={mode} className="mt-2 text-[13px] leading-6 text-[var(--sub)]" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="stack" className="mt-14 sm:mt-16">
          <SectionHead
            eyebrow={L("Section 2", "第二部分")}
            title={L("How the Anthropic agent stack is actually built", "Anthropic 的 agent stack 實際上怎麼組成")}
            sub={L("The important move is not just a stronger model. It is a layered system in which product surface, organizational method, live data access, and governance all work together.", "真正重要的不是只有更強模型，而是一套分層系統，讓產品表面、組織方法、即時資料存取與治理一起運作。")}
            mode={mode}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {stackCards.map((card) => (
              <InsightCard key={card.title.en} {...card} mode={mode} />
            ))}
          </div>
        </section>

        <section id="cases" className="mt-14 sm:mt-16">
          <SectionHead
            eyebrow={L("Section 3", "第三部分")}
            title={L("Where the story becomes concrete", "故事最具體的地方")}
            sub={L("The strongest evidence is not abstract AI language. It is the accumulation of workflows that show how context, tools, and institutional method turn into work that is closer to done.", "最強的證據不是抽象 AI 語言，而是一連串 workflow，讓人看見 context、工具與 institutional method 如何變成更接近完成品的工作。")}
            mode={mode}
          />

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {internalCases.map((item) => (
              <Card key={item.title.en} className="p-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(73,107,106,.1)] text-[var(--accent)]">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <Text value={item.name} mode={mode} className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--sub)]" />
                <Text value={item.title} mode={mode} className="mt-2 text-[15px] font-semibold leading-7 text-[var(--ink)]" />
                <ul className="mt-4 space-y-3 text-[14px] leading-7 text-[var(--sub)]">
                  {item.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <Text value={bullet} mode={mode} />
                    </li>
                  ))}
                </ul>
                <TierPills tiers={item.tiers} />
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {externalCases.map((item) => (
              <Card key={item.company} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--sub)]">{item.company}</div>
                    <div className="mt-3 text-[1.5rem] font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-[1.7rem]">{item.stat}</div>
                    <Text value={item.note} mode={mode} className="mt-1 text-[13px] leading-6 text-[var(--sub)]" />
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[var(--line)] bg-white text-[12px] font-semibold text-[var(--ink)]">
                    {item.company.slice(0, 2)}
                  </div>
                </div>
                <Text value={item.body} mode={mode} className="mt-4 text-[14px] leading-7 text-[var(--sub)]" />
                <TierPills tiers={item.tiers} />
              </Card>
            ))}
          </div>
        </section>

        <section id="competition" className="mt-14 sm:mt-16">
          <SectionHead
            eyebrow={L("Section 4", "第四部分")}
            title={L("Competition is moving up the stack", "競爭正在往上層移動")}
            sub={L("A shallow reading treats this as a benchmark race. The stronger reading is ecosystem rivalry involving connectors, workflow fit, deployment control, and who owns the enterprise surface.", "淺層讀法會把這看成 benchmark race。更強的讀法則是 ecosystem rivalry，焦點在 connectors、workflow fit、部署控制，以及誰掌握 enterprise surface。")}
            mode={mode}
          />

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.18fr_.82fr]">
            <CompetitionTable mode={mode} />
            <CompetitionScale mode={mode} />
          </div>
        </section>

        <section id="judgment" className="mt-14 sm:mt-16">
          <SectionHead
            eyebrow={L("Section 5", "第五部分")}
            title={L("The strongest overall reading", "最穩的整體判讀")}
            sub={L("A good final reading should be simple enough to say clearly, but rich enough to survive pushback. These cards are the judgment layer this page is designed to support.", "一個好的最終判讀，必須夠簡潔，能被清楚說出來，同時也要夠紮實，能撐住追問。下面這些卡片，就是這一頁想支撐的判讀層。")}
            mode={mode}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {judgment.map((item) => (
              <InsightCard key={item.title.en} {...item} mode={mode} />
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_1fr]">
            <BarChart mode={mode} />
            <QuickTable mode={mode} />
          </div>
        </section>

        <section id="lab" className="mt-14 sm:mt-16">
          <SectionHead
            eyebrow={L("Section 6", "第六部分")}
            title={L("Reference lab", "資料實驗室")}
            sub={L("This final layer keeps the fastest check points close at hand. It is placed later on purpose, so readers reach the thesis first and the supporting material second.", "最後這一層是給快速查核用的。它被刻意放在後面，讓讀者先抓到主論點，再回來補足 supporting material。")}
            mode={mode}
          />

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_.82fr]">
            <Card className="p-5 sm:p-7">
              <SectionHead
                eyebrow={L("Fast oral kit", "快速口頭版素材")}
                title={L("Four safe sentences", "四句穩定句型")}
                sub={L("These are compact enough for class discussion, but still anchored in the logic of the material.", "這些句型足夠簡短，適合課堂討論，但仍然扎根在材料本身的邏輯裡。")}
                mode={mode}
              />

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {[
                  [L("Chatbot versus agent", "Chatbot 與 agent"), L("A chatbot supports the conversation around work. An agent starts to carry the workflow itself.", "Chatbot 支援的是圍繞工作展開的對話。Agent 則開始承擔 workflow 本身。")],
                  [L("Anthropic’s core problem", "Anthropic 的核心問題"), L("How can it push aggressively into agents without weakening the safety-first identity that defines it?", "它如何能積極推進 agents，同時不削弱原本定義它的 safety-first 身分？")],
                  [L("Why deployment is hard", "為甚麼部署很難"), L("The barrier is not only intelligence. It is trust, governance, context, redesign of process, and proof that the economics work in production.", "障礙不只在 intelligence，而在 trust、governance、context、流程重設，以及能否在 production 中證明經濟效益。")],
                  [L("Where competition is going", "競爭正往哪裡去"), L("From pure benchmark rivalry toward ecosystem rivalry involving connectors, workflow fit, and control layers.", "從純 benchmark rivalry，轉向圍繞 connectors、workflow fit 與控制層的 ecosystem rivalry。")],
                ].map(([header, text], index) => (
                  <Card key={index} className="p-4 sm:p-5">
                    <Text value={header} mode={mode} className="text-[14px] font-semibold leading-6 text-[var(--ink)]" />
                    <Text value={text} mode={mode} className="mt-2 text-[14px] leading-7 text-[var(--sub)]" />
                  </Card>
                ))}
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="p-5 sm:p-6">
                <Text value={L("What to watch for", "建議優先注意的地方")} mode={mode} className="text-[15px] font-semibold text-[var(--ink)]" />
                <ul className="mt-3 space-y-2.5 text-[14px] leading-7 text-[var(--sub)]">
                  {[
                    L("Notice how often Anthropic’s story returns to workflow rather than isolated chat.", "留意 Anthropic 的敘事有多頻繁回到 workflow，而不是單點 chat。"),
                    L("Notice how many examples combine model ability with organizational method.", "留意有多少例子不是只有模型能力，而是模型能力加上組織方法。"),
                    L("Notice how governance appears not as a side issue, but as part of the product itself.", "留意 governance 並不是附帶問題，而是產品本身的一部分。"),
                  ].map((item, index) => (
                    <li key={index}><Text value={item} mode={mode} /></li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5 sm:p-6">
                <Text value={L("What this signals", "這組材料真正透露的訊號")} mode={mode} className="text-[15px] font-semibold text-[var(--ink)]" />
                <Text
                  value={L(
                    "Anthropic is not only selling intelligence. It is trying to sell a way for enterprises to trust, route, and reuse intelligence inside daily operations. That is why skills, plugins, and control layers matter so much in this story.",
                    "Anthropic 不只是在賣 intelligence，而是在賣一種讓企業能在日常營運中信任、導入、重複使用 intelligence 的方式。這也正是 skills、plugins 與控制層在這個故事裡如此重要的原因。"
                  )}
                  mode={mode}
                  className="mt-3 text-[14px] leading-7 text-[var(--sub)]"
                />
              </Card>
            </div>
          </div>
        </section>
      </div>

      <LangSwitch mode={mode} setMode={setMode} />
    </div>
  );
}
