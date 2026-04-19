/* ============================================================
   CRILLINOX SPANISH DICTIONARY — es_script.js
   format for words is name|definition|partOfSpeech|EN|JA|ZH
   ============================================================ */

// ── Dark/Light mode ─────────────────────────────────────────
const modeToggle = document.getElementById('modeToggle');
const savedMode  = localStorage.getItem('es-mode') || 'light';

if (savedMode === 'dark') {
  document.body.classList.add('dark-mode');
  modeToggle.textContent = '☽';
}

modeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  modeToggle.textContent = isDark ? '☽' : '☀';
  localStorage.setItem('es-mode', isDark ? 'dark' : 'light');
});


// ── Accent stripper ──────────────────────────────────────────
// Strips diacritics so "por que" matches "por qué", "mas" matches "más", etc.
// Works for all Latin accents: á é í ó ú ü ñ ¿ ¡ and equivalents.
function stripAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ── Word class ───────────────────────────────────────────────
class Word {
  constructor(name, definition, partOfSpeech, transEN, transJA, transZH) {
    this.name         = name;
    this.definition   = definition;
    this.partOfSpeech = partOfSpeech;
    this.transEN = transEN || '';
    this.transJA = transJA || '';
    this.transZH = transZH || '';
  }

  get posCategory() {
    const pos = this.partOfSpeech.toLowerCase();
    if (pos.includes('noun') || pos.includes('pronoun') || pos.includes('article') ||
        pos.includes('determiner')) return 'noun';
    if (pos.includes('verb'))        return 'verb';
    if (pos.includes('adjective'))   return 'adjective';
    if (pos.includes('adverb'))      return 'adverb';
    if (pos.includes('preposition') || pos.includes('conjunction') ||
        pos.includes('particle') || pos.includes('interjection')) return 'preposition';
    return 'other';
  }
}

// ── Dictionary data ──────────────────────────────────────────
const wordsText = `
a|to / at / in (direction or destination marker)|preposition
abrir|to open|verb
acabar|to finish / to end / to run out of|verb
acción|action / act / share (stock)|noun
acerca de|about / regarding / concerning|preposition
actuar|to act / to perform / to behave|verb
además|furthermore / also / in addition|adverb
adónde|where to / to where|adverb
agua|water|noun
ahora|now / at this moment|adverb
algo|something / anything / somewhat|pronoun/adverb
alguien|someone / somebody / anyone|pronoun
algún|some / any (before masculine nouns)|adjective
alguno|some / any / one of them|adjective/pronoun
allí|there / over there|adverb
alto|tall / high / loud / stop|adjective/noun
amigo|friend (male)|noun
amiga|friend (female)|noun
amor|love / affection|noun
año|year|noun
aprender|to learn|verb
aquí|here / in this place|adverb
arriba|up / above / upstairs|adverb
así|like this / so / therefore|adverb
aún|still / yet / even|adverb
aunque|although / even though / even if|conjunction
ayudar|to help / to assist|verb
bajo|short / low / quiet / under|adjective/preposition
baño|bathroom / bath / toilet|noun
bien|well / good / fine / okay|adverb/adjective
buen|good (before masculine singular nouns)|adjective
bueno|good / fine / well|adjective
buscar|to look for / to search for / to fetch|verb
cada|each / every|adjective
caliente|hot / warm|adjective
cambiar|to change / to exchange / to switch|verb
caminar|to walk / to move / to go|verb
campo|field / countryside / area|noun
cantar|to sing|verb
casa|house / home|noun
casi|almost / nearly|adverb
ciudad|city / town|noun
claro|clear / of course / light (color)|adjective/adverb
comer|to eat|verb
cómo|how / what (in exclamations)|adverb
comprar|to buy / to purchase|verb
con|with / together with / by means of|preposition
conocer|to know (a person or place) / to meet for the first time|verb
conseguir|to get / to obtain / to manage to do|verb
contar|to count / to tell / to matter|verb
correr|to run / to flow / to rush|verb
cosa|thing / matter / affair|noun
creer|to believe / to think / to suppose|verb
cual|which / that / who|pronoun
cuando|when / whenever / since|adverb/conjunction
cuánto|how much / how many|adjective/adverb
cuarto|room / bedroom / quarter / fourth|noun/adjective
dar|to give / to provide / to cause|verb
de|of / from / about / by|preposition
deber|must / should / to owe / duty|verb/noun
decir|to say / to tell / to mean|verb
dejar|to leave / to let / to stop|verb
del|of the / from the (contraction of de + el)|article
dentro|inside / within / in|adverb
desde|from / since / starting at|preposition
después|after / afterwards / later|adverb
día|day|noun
dinero|money / currency|noun
donde|where / in which|adverb/conjunction
dormir|to sleep|verb
durante|during / for (a period of time)|preposition
echar|to throw / to put / to pour / to fire (someone)|verb
el|the (masculine singular)|article
él|he / him|pronoun
ella|she / her|pronoun
ellos|they / them (masculine or mixed)|pronoun
ellas|they / them (feminine)|pronoun
empezar|to begin / to start|verb
en|in / on / at|preposition
encontrar|to find / to meet / to encounter|verb
entender|to understand / to think / to know how|verb
entre|between / among / in the middle of|preposition
es|is / it is / he is / she is (ser)|verb
esa|that (feminine)|adjective/pronoun
ese|that (masculine)|adjective/pronoun
español|Spanish (language or person)|noun/adjective
esperar|to wait / to hope / to expect|verb
estar|to be (state, location, condition)|verb
este|this (masculine)|adjective/pronoun
explicar|to explain / to account for|verb
fácil|easy / simple / likely|adjective
familia|family|noun
feliz|happy / joyful / fortunate|adjective
fin|end / purpose / weekend|noun
grande|big / large / great / old|adjective
gritar|to shout / to scream / to yell|verb
grupo|group / band / cluster|noun
gustar|to like / to be pleasing to|verb
haber|to have (auxiliary) / there is / there are|verb
hablar|to speak / to talk / to say|verb
hacer|to do / to make / to cause|verb
hasta|until / up to / even / as far as|preposition/adverb
hay|there is / there are|verb
hijo|son / child (male)|noun
hija|daughter / child (female)|noun
historia|history / story / tale|noun
hombre|man / human being|noun
hora|hour / time / appointment|noun
hoy|today|adverb
ir|to go|verb
jamás|never / ever (emphatic)|adverb
joven|young / youth / young person|adjective/noun
juntos|together / jointly|adjective
la|the (feminine singular) / her / it (direct object)|article/pronoun
lado|side / direction / aspect|noun
largo|long / lengthy / far|adjective
las|the (feminine plural) / them (feminine direct object)|article/pronoun
le|to him / to her / to you (indirect object)|pronoun
leer|to read|verb
lejos|far / far away|adverb
les|to them / to you (plural indirect object)|pronoun
libre|free / available / unoccupied|adjective
libro|book|noun
llamar|to call / to name / to ring|verb
llegar|to arrive / to reach / to come|verb
llevar|to carry / to take / to wear / to lead|verb
lo|the (neuter) / him / it (direct object)|article/pronoun
luego|then / later / afterwards / soon|adverb
lugar|place / location / space / instead of|noun
madre|mother / mom|noun
mal|bad / badly / wrong / evil|adjective/adverb
mañana|tomorrow / morning|adverb/noun
más|more / plus / most / but (literary)|adverb/conjunction
me|me / myself (reflexive and object pronoun)|pronoun
mejor|better / best / rather|adjective/adverb
menos|less / fewer / minus / except|adverb/preposition
mientras|while / whereas / as long as|conjunction
mirar|to look at / to watch / to see|verb
mismo|same / very / itself / right|adjective/pronoun
mucho|a lot / much / many / very|adjective/adverb
mujer|woman / wife|noun
mundo|world / universe / everyone|noun
muy|very / quite / too|adverb
nada|nothing / not at all / anything|pronoun/adverb
nadie|nobody / no one / not anyone|pronoun
necesitar|to need / to require|verb
ni|neither / nor / not even|conjunction
ningún|no / none / not any (before masculine nouns)|adjective
ninguno|none / not one / no one|adjective/pronoun
niño|child / boy / kid|noun
niña|girl / child (female)|noun
noche|night / evening|noun
nombre|name / noun|noun
nos|us / ourselves (object and reflexive pronoun)|pronoun
nosotros|we / us|pronoun
nuevo|new / fresh / another|adjective
nunca|never / not ever|adverb
o|or / either|conjunction
oír|to hear / to listen to|verb
otro|other / another / different|adjective/pronoun
padre|father / dad / priest|noun
país|country / nation|noun
palabra|word / promise|noun
para|for / in order to / toward / by (deadline)|preposition
parecer|to seem / to appear / to look like|verb
parte|part / portion / side / report|noun
pasar|to pass / to happen / to spend (time) / to come in|verb
pedir|to ask for / to order / to request|verb
pequeño|small / little / young|adjective
perder|to lose / to miss / to waste|verb
pero|but / yet / however|conjunction
persona|person / individual|noun
poder|can / to be able to / power|verb/noun
poner|to put / to place / to set / to turn on|verb
por|for / by / through / because of / per|preposition
porque|because / since / so that|conjunction
por qué|why / for what reason|adverb
primer|first (before masculine singular nouns)|adjective
primero|first / firstly / at first|adjective/adverb
propio|own / proper / characteristic / oneself|adjective
pueblo|town / village / people / nation|noun
puede|can / he can / she can / it can (poder)|verb
quedar|to stay / to remain / to be left / to meet up|verb
querer|to want / to love / to wish|verb
quién|who / whom / whoever|pronoun
saber|to know (a fact) / to know how to / to taste|verb
sacar|to take out / to get / to pull out / to score|verb
salir|to leave / to go out / to come out / to turn out|verb
se|himself / herself / itself / themselves (reflexive)|pronoun
seguir|to follow / to continue / to keep on|verb
según|according to / depending on|preposition
señor|mister / sir / lord / gentleman|noun
señora|madam / mrs / lady / woman|noun
ser|to be (permanent characteristics, identity, origin)|verb
si|if / whether / indeed|conjunction
sí|yes / indeed / himself (reflexive)|adverb/pronoun
siempre|always / forever / as long as|adverb
sin|without / lacking|preposition
sobre|on / about / over / above / envelope|preposition/noun
solo|alone / only / just / single|adjective/adverb
su|his / her / its / your (formal) / their|adjective
también|also / too / as well|adverb
tampoco|neither / not either / nor|adverb
tan|so / as / such|adverb
tanto|so much / so many / as much / as many|adjective/adverb
tarde|afternoon / evening / late|noun/adverb
te|you / yourself (direct and indirect object)|pronoun
tener|to have / to hold / to be (age, temperature)|verb
tiempo|time / weather / tense / period|noun
todo|all / everything / every / whole|adjective/pronoun
tomar|to take / to drink / to catch / to have (food)|verb
trabajar|to work / to labor|verb
trabajo|work / job / effort / task|noun
traer|to bring / to carry / to cause|verb
tu|your (informal singular)|adjective
tú|you (informal singular)|pronoun
último|last / latest / final / lowest|adjective
un|a / an / one (masculine)|article
una|a / an / one (feminine)|article
usar|to use / to wear / to employ|verb
usted|you (formal singular)|pronoun
ver|to see / to watch / to understand|verb
verdad|truth / true / right|noun/adjective
vez|time / turn / occasion|noun
vida|life / living / existence|noun
volver|to return / to come back / to do again|verb
vosotros|you (plural informal — used in Spain)|pronoun
ya|already / now / soon / anymore|adverb
yo|I (subject pronoun)|pronoun
agua|water|noun|water|水 (みず)|水
`;

// ── Build word list ──────────────────────────────────────────
let allWords = [];

function setupDict() {
  const lines = wordsText.trim().split('\n');
  lines.forEach(line => {
    const parts = line.split('|');
    if (parts.length >= 3) {
      allWords.push(new Word(
        parts[0].trim(), parts[1].trim(), parts[2].trim(),
        (parts[3] || '').trim(), (parts[4] || '').trim(), (parts[5] || '').trim()
      ));
    }
  });
  console.log(`✅ Spanish dictionary loaded: ${allWords.length} words`);
}

// ── Helpers ──────────────────────────────────────────────────
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDefinition(raw) {
  const senses = raw.split(' / ').map(s => s.trim()).filter(Boolean);
  if (senses.length <= 1) return `<span>${escapeHTML(raw)}</span>`;
  const items = senses.map(s => `<li>${escapeHTML(s)}</li>`).join('');
  return `<ul class="def-list">${items}</ul>`;
}


// ── Active POS filter ────────────────────────────────────────
let activePOS = 'all';

document.getElementById('posFilter').addEventListener('click', e => {
  const btn = e.target.closest('.pos-btn');
  if (!btn) return;
  document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activePOS = btn.dataset.pos;
  showResults(document.getElementById('searchInput').value);
});

// ── Ranked search ────────────────────────────────────────────
// Both the stored word name and the query are accent-stripped for comparison,
// so "por que" matches "por qué" and "mas" matches "más".
// The original accented word is still displayed correctly.
function rankedSearch(query) {
  const q      = query.toLowerCase().trim();
  const qPlain = stripAccents(q);
  if (!q) return [];

  const scored = [];

  for (const word of allWords) {
    if (activePOS !== 'all' && word.posCategory !== activePOS) continue;

    const name      = word.name.toLowerCase();
    const namePlain = stripAccents(name);
    const defn      = word.definition.toLowerCase();
    const defnPlain = stripAccents(defn);

    let tier = null;

    if (name === q || namePlain === qPlain) {
      tier = 0;
    } else if (name.startsWith(q) || namePlain.startsWith(qPlain)) {
      tier = 1;
    } else if (name.includes(q) || namePlain.includes(qPlain)) {
      tier = 2;
    } else if (defn.includes(q) || defnPlain.includes(qPlain)) {
      tier = 3;
    }

    if (tier !== null) scored.push({ word, tier });
  }

  scored.sort((a, b) => a.tier - b.tier);
  return scored.map(s => s.word);
}

// ── Keyboard nav state ───────────────────────────────────────
let selectedIndex  = -1;
let currentMatches = [];

function renderResults(matches) {
  currentMatches = matches;
  selectedIndex  = -1;

  const results = document.getElementById('results');
  results.innerHTML = '';
  if (!matches.length) return;

  matches.forEach((word, i) => {
    const div = document.createElement('div');
    div.className   = 'result-item';
    div.role        = 'option';
    div.dataset.idx = i;

    const badge = document.createElement('span');
    badge.className   = 'result-pos';
    badge.textContent = word.posCategory;

    const label = document.createElement('span');
    label.className = 'result-label';
    label.innerHTML = `<strong>${escapeHTML(word.name)}</strong>`;

    const def = document.createElement('span');
    def.className   = 'result-def';
    def.textContent = word.definition;

    div.appendChild(badge);
    div.appendChild(label);
    div.appendChild(def);

    div.addEventListener('mousedown', e => {
      e.preventDefault();
      selectResult(i);
    });

    results.appendChild(div);
  });
}

function selectResult(idx) {
  const word = currentMatches[idx];
  if (!word) return;
  document.getElementById('searchInput').value = word.name;
  document.getElementById('results').innerHTML = '';
  currentMatches = [];
  selectedIndex  = -1;
  displayWord(word);
}

function highlightResult(idx) {
  const items = document.querySelectorAll('.result-item');
  items.forEach((el, i) => el.classList.toggle('highlighted', i === idx));
  if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
}

function showResults(query) {
  if (!query.trim()) {
    document.getElementById('results').innerHTML = '';
    currentMatches = [];
    return;
  }
  renderResults(rankedSearch(query).slice(0, 60));
}

// ── Full entry display ───────────────────────────────────────
function displayWord(word) {
  const output = document.getElementById('output');

  const posHTML = word.partOfSpeech.split('/').map(p =>
    `<span class="tag">${escapeHTML(p.trim())}</span>`
  ).join('');

  const defHTML = formatDefinition(word.definition);

  output.innerHTML = `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-word">${escapeHTML(word.name)}</span>
        <div class="entry-tags">${posHTML}</div>
      </div>
      <div class="entry-body">
        <div class="entry-row">
          <span class="entry-field-label" id="defLabel">Definition</span>
          <div class="entry-definition" id="defContent">${defHTML}</div>
        </div>
        <div class="translate-strip">
          <span class="translate-label">Translate:</span>
          <button class="translate-btn" id="translateBtn-en">🇺🇸 EN</button>
          <button class="translate-btn" id="translateBtn-ja">🇯🇵 JA</button>
          <button class="translate-btn" id="translateBtn-zh">🇨🇳 ZH</button>
          <button class="translate-btn translate-btn-reset" id="translateBtn-reset" style="display:none">↩ Original</button>
        </div>
      </div>
    </div>
  `;

  const originalDef = word.definition;

  function wireBtn(btnId, trans, langLabel) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (!trans) { btn.disabled = true; btn.title = 'No translation provided'; return; }
    btn.addEventListener('click', () => {
      const defContent = document.getElementById('defContent');
      const defLabel   = document.getElementById('defLabel');
      defContent.innerHTML = formatDefinition(trans);
      defLabel.textContent = langLabel;
      document.getElementById('translateBtn-reset').style.display = '';
    });
  }

  document.getElementById('translateBtn-reset').addEventListener('click', () => {
    document.getElementById('defContent').innerHTML = formatDefinition(originalDef);
    document.getElementById('defLabel').textContent = 'Definition';
    document.getElementById('translateBtn-reset').style.display = 'none';
    document.querySelectorAll('.translate-btn').forEach(b => {
      if (b.id !== 'translateBtn-reset') b.disabled = !b._hasTrans;
    });
  });

  wireBtn('translateBtn-en', word.transEN, 'EN');
  wireBtn('translateBtn-ja', word.transJA, 'JA');
  wireBtn('translateBtn-zh', word.transZH, 'ZH');
  ['translateBtn-en','translateBtn-ja','translateBtn-zh'].forEach(id => {
    const b = document.getElementById(id); if (b) b._hasTrans = !b.disabled;
  });
}

function searchWord() {
  const input = document.getElementById('searchInput');
  const query = input.value.trim();
  if (!query) return;

  document.getElementById('results').innerHTML = '';

  const matches = rankedSearch(query);
  if (matches.length) {
    displayWord(matches[0]);
  } else {
    document.getElementById('output').innerHTML =
      `<div class="output-placeholder not-found">"${escapeHTML(query)}" not found.</div>`;
  }
}

// ── Keyboard navigation ──────────────────────────────────────
document.addEventListener('keydown', e => {
  const hasResults = currentMatches.length > 0;

  if (e.key === 'ArrowDown' && hasResults) {
    e.preventDefault();
    selectedIndex = Math.min(selectedIndex + 1, currentMatches.length - 1);
    highlightResult(selectedIndex);
  } else if (e.key === 'ArrowUp' && hasResults) {
    e.preventDefault();
    selectedIndex = Math.max(selectedIndex - 1, 0);
    highlightResult(selectedIndex);
  } else if (e.key === 'Enter') {
    if (hasResults && selectedIndex >= 0) selectResult(selectedIndex);
    else searchWord();
  } else if (e.key === 'Escape') {
    document.getElementById('results').innerHTML = '';
    currentMatches = [];
    selectedIndex  = -1;
  }
});

// ── Init ─────────────────────────────────────────────────────
window.onload = () => {
  setupDict();
  const input = document.getElementById('searchInput');
  input.addEventListener('input', e => showResults(e.target.value));
};
