// ── Dark/Light mode ─────────────────────────────────────────
const modeToggle = document.getElementById('modeToggle');
const savedMode  = localStorage.getItem('mode') || 'light';

if (savedMode === 'dark') {
  document.body.classList.add('dark-mode');
  modeToggle.textContent = '☽';
}

modeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  modeToggle.textContent = isDark ? '☽' : '☀';
  localStorage.setItem('mode', isDark ? 'dark' : 'light');
});


// ── Word class ───────────────────────────────────────────────
class Word {
  constructor(name, romaji, definition, partOfSpeech, transEN, transES, transZH) {
    this.name        = name;
    this.romaji      = romaji;           // may contain "/" e.g. "hito/jin/nin"
    this.definition  = definition;
    this.partOfSpeech = partOfSpeech;
    // Optional manual translations (empty string = not provided)
    this.transEN = transEN || '';
    this.transES = transES || '';
    this.transZH = transZH || '';
  }

  // All individual romaji variants as an array
  get romajiVariants() {
    return this.romaji.split('/').map(r => r.trim().toLowerCase());
  }

  // Broad POS category used for filtering
  get posCategory() {
    const pos = this.partOfSpeech.toLowerCase();
    if (pos.includes('noun') || pos.includes('pronoun') || pos.includes('counter')) return 'noun';
    if (pos.includes('verb'))       return 'verb';
    if (pos.includes('adjective'))  return 'adjective';
    if (pos.includes('particle'))   return 'particle';
    return 'other';
  }
}

// ── Dictionary data ─────────────────────────────────────────
const wordsText = `
中国|chuugoku|china|noun
中国語|chuugokugo|chinese language|noun
注文|chuumon|order (for an item[like amazon])|noun/suru verb/transitive verb
英語|eigo|english language|noun
人|hito/jin/nin|person / person(of nationality) / counting people, pets, smart animals, human-like creatures|noun/suffix/counter
本|hon|counting long, thin, or cylindrical objects with L:W >= 1:2 / book; volume; script / this; present; current; in question; at issue; / main; head; principal / real; genuine; regular; proper|counter/noun/prefix/prefix/prefix
欲しい|hoshii|want|i-adjective
一|ichi|1/one|numeral
今|ima|now|adverb
辞典|jiten|dictionary|noun
書く|kaku|to write|godan verb
韓国|kankoku|south korea|noun
韓国語|kankokugo|korean language|noun
こんにちは|konnichiwa|greeting|interjection
日本|nihon|japan|noun
日本語|nihongo|japanese language|noun
冊|satsu|counting books, magazines, notebooks, and bound documents|counter
静か|shizuka|quiet|na-adjective
そして|soshite|and|conjunction
食べる|taberu|to eat|ichidan verb
つ|tsu|general purpose measure|counter
は|wa|topic marker|particle
私|watashi|I, myself, me|pronoun
天気|tenki|weather|noun|weather|el tiempo|天气
`;

// ── Build word list ──────────────────────────────────────────
let allWords = [];

function setupDict() {
  const lines = wordsText.trim().split('\n');
  lines.forEach(line => {
    const parts = line.split('|');
    if (parts.length >= 4) {
      allWords.push(new Word(
        parts[0].trim(), parts[1].trim(), parts[2].trim(), parts[3].trim(),
        (parts[4] || '').trim(), (parts[5] || '').trim(), (parts[6] || '').trim()
      ));
    }
  });
  console.log(`✅ Dictionary loaded: ${allWords.length} words`);
}

// ── Active POS filter ────────────────────────────────────────
let activePOS = 'all';

document.getElementById('posFilter').addEventListener('click', e => {
  const btn = e.target.closest('.pos-btn');
  if (!btn) return;
  document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activePOS = btn.dataset.pos;
  // Re-run search with current input
  showResults(document.getElementById('searchInput').value);
});

// ── Ranked search logic ──────────────────────────────────────
/**
 * Returns words ranked by how well they match the query:
 *   Tier 1 (0) — exact match on kanji or any romaji variant
 *   Tier 2 (1) — kanji/romaji starts with query
 *   Tier 3 (2) — kanji/romaji contains query
 *   Tier 4 (3) — definition contains query (loose)
 * Words not matching any tier are excluded.
 */
function rankedSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = [];

  for (const word of allWords) {
    // Apply POS filter
    if (activePOS !== 'all' && word.posCategory !== activePOS) continue;

    const kanji    = word.name.toLowerCase();
    const variants = word.romajiVariants;           // e.g. ["hito","jin","nin"]
    const defn     = word.definition.toLowerCase();

    let tier = null;

    // Tier 0: exact
    if (kanji === q || variants.includes(q)) {
      tier = 0;
    }
    // Tier 1: starts-with on kanji or any variant
    else if (kanji.startsWith(q) || variants.some(v => v.startsWith(q))) {
      tier = 1;
    }
    // Tier 2: contains on kanji or any variant
    else if (kanji.includes(q) || variants.some(v => v.includes(q))) {
      tier = 2;
    }
    // Tier 3: definition contains query
    else if (defn.includes(q)) {
      tier = 3;
    }

    if (tier !== null) scored.push({ word, tier });
  }

  // Sort by tier (stable)
  scored.sort((a, b) => a.tier - b.tier);
  return scored.map(s => s.word);
}

// ── Keyboard nav state ───────────────────────────────────────
let selectedIndex = -1;
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
    badge.className = 'result-pos';
    badge.textContent = word.posCategory;

    const label = document.createElement('span');
    label.className = 'result-label';
    label.innerHTML = `<strong>${word.name}</strong> <em>${word.romaji}</em>`;

    const def = document.createElement('span');
    def.className   = 'result-def';
    def.textContent = word.definition;

    div.appendChild(badge);
    div.appendChild(label);
    div.appendChild(def);

    // Click: auto-search immediately (no need to press Enter again)
    div.addEventListener('mousedown', e => {
      e.preventDefault(); // keep focus on input
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
  items.forEach((el, i) => {
    el.classList.toggle('highlighted', i === idx);
  });
  if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
}

// ── Live results (on input) ──────────────────────────────────
function showResults(query) {
  if (!query.trim()) {
    document.getElementById('results').innerHTML = '';
    currentMatches = [];
    return;
  }
  const matches = rankedSearch(query).slice(0, 50);
  renderResults(matches);
}

// ── Helpers ──────────────────────────────────────────────────
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Splits "sense one / sense two / sense three" into a numbered <ul>.
// Only splits on " / " (with spaces) to avoid splitting fractions / ratios.
function formatDefinition(raw) {
  const senses = raw.split(' / ').map(s => s.trim()).filter(Boolean);
  if (senses.length <= 1) return `<span>${escapeHTML(raw)}</span>`;
  const items = senses.map(s => `<li>${escapeHTML(s)}</li>`).join('');
  return `<ul class="def-list">${items}</ul>`;
}


// ── Full display (on Enter / click) ─────────────────────────
function displayWord(word) {
  const output = document.getElementById('output');

  const posHTML = word.partOfSpeech.split('/').map(p =>
    `<span class="tag">${p.trim()}</span>`
  ).join('');

  const romajiHTML = word.romajiVariants.map(r =>
    `<span class="romaji-chip">${r}</span>`
  ).join('');

  const defHTML = formatDefinition(word.definition);

  output.innerHTML = `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-kanji">${escapeHTML(word.name)}</span>
        <div class="entry-romaji">${romajiHTML}</div>
      </div>
      <div class="entry-body">
        <div class="entry-row">
          <span class="entry-field-label" id="defLabel">定義</span>
          <div class="entry-definition" id="defContent">${defHTML}</div>
        </div>
        <div class="entry-row">
          <span class="entry-field-label">品詞</span>
          <div class="entry-tags">${posHTML}</div>
        </div>
        <div class="translate-strip">
          <span class="translate-label">Translate:</span>
          <button class="translate-btn" id="translateBtn-en">🇺🇸 EN</button>
          <button class="translate-btn" id="translateBtn-es">🇪🇸 ES</button>
          <button class="translate-btn" id="translateBtn-zh">🇨🇳 ZH</button>
          <button class="translate-btn translate-btn-reset" id="translateBtn-reset" style="display:none">↩ Original</button>
        </div>
      </div>
    </div>
  `;

  const originalDef = word.definition;

  function wireBtn(btnId, trans, langLabel, resetLabel) {
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
    document.getElementById('defLabel').textContent = '定義';
    document.getElementById('translateBtn-reset').style.display = 'none';
    document.querySelectorAll('.translate-btn').forEach(b => {
      if (b.id !== 'translateBtn-reset') b.disabled = !b._hasTrans;
    });
  });

  wireBtn('translateBtn-en', word.transEN, 'EN');
  wireBtn('translateBtn-es', word.transES, 'ES');
  wireBtn('translateBtn-zh', word.transZH, 'ZH');
  // Store whether each btn has a translation (for reset)
  ['translateBtn-en','translateBtn-es','translateBtn-zh'].forEach(id => {
    const b = document.getElementById(id); if (b) b._hasTrans = !b.disabled;
  });
}

function searchWord() {
  const input = document.getElementById('searchInput');
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  // Hide results dropdown
  document.getElementById('results').innerHTML = '';

  // Ranked: pick the best match (tier 0 ideally)
  const matches = rankedSearch(query);
  if (matches.length) {
    displayWord(matches[0]);
  } else {
    document.getElementById('output').innerHTML =
      `<div class="output-placeholder not-found">「${input.value.trim()}」not found.</div>`;
  }
}

// ── Keyboard navigation ──────────────────────────────────────
document.addEventListener('keydown', e => {
  const results = document.getElementById('results');
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
    if (hasResults && selectedIndex >= 0) {
      selectResult(selectedIndex);
    } else {
      searchWord();
    }
  } else if (e.key === 'Escape') {
    results.innerHTML = '';
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
