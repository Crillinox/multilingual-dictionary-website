// ── Dark/Light mode ─────────────────────────────────────────
const lightBtn  = document.getElementById('lightBtn');
const darkBtn   = document.getElementById('darkBtn');
const savedMode = localStorage.getItem('zh-mode') || 'light';

if (savedMode === 'dark') {
  document.body.classList.add('dark-mode');
  darkBtn.classList.add('active');
} else {
  lightBtn.classList.add('active');
}

lightBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  lightBtn.classList.add('active');
  darkBtn.classList.remove('active');
  localStorage.setItem('zh-mode', 'light');
});

darkBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  darkBtn.classList.add('active');
  lightBtn.classList.remove('active');
  localStorage.setItem('zh-mode', 'dark');
});

// ── Tone stripper ────────────────────────────────────────────
// Converts toned pinyin like "nǐ hǎo" → "ni hao" so users can
// type without tone marks and still get matches.
function stripTones(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ── Word class ───────────────────────────────────────────────
class ChineseWord {
  constructor(traditional, simplified, pinyin, definition, partOfSpeech) {
    this.traditional  = traditional;
    this.simplified   = simplified;
    this.pinyin       = pinyin;
    this.definition   = definition;
    this.partOfSpeech = partOfSpeech;
  }

  // Display name: "traditional / simplified" or just traditional if same
  get displayName() {
    return this.traditional === this.simplified
      ? this.traditional
      : `${this.traditional} / ${this.simplified}`;
  }

  get pinyinVariants() {
    // pinyin may list alternatives with "/" e.g. "nǐ/nǐmen"
    return this.pinyin.split('/').map(p => stripTones(p.trim().toLowerCase()));
  }

  get posCategory() {
    const pos = this.partOfSpeech.toLowerCase();
    if (pos.includes('noun') || pos.includes('pronoun') || pos.includes('measure') ||
        pos.includes('numeral') || pos.includes('counter')) return 'noun';
    if (pos.includes('verb'))      return 'verb';
    if (pos.includes('adjective')) return 'adjective';
    if (pos.includes('particle') || pos.includes('conjunction') ||
        pos.includes('adverb') || pos.includes('interjection')) return 'particle';
    return 'other';
  }
}

// ── Dictionary data ──────────────────────────────────────────
// Format: traditional|simplified|pinyin|definition|partOfSpeech
// Add your words here. Traditional and simplified are separate fields;
// if they are the same character, just write it twice.
// Example of a word where they differ: 愛|爱|ài|love|verb/noun
const wordsText = `
你|你|nǐ|you (singular)|pronoun
你好|你好|nǐ hǎo|hello / how do you do|interjection
我|我|wǒ|I / me / my|pronoun
他|他|tā|he / him / his|pronoun
她|她|tā|she / her / hers|pronoun
它|它|tā|it (for objects and animals)|pronoun
我們|我们|wǒmen|we / us / our|pronoun
你們|你们|nǐmen|you (plural)|pronoun
他們|他们|tāmen|they / them / their (male or mixed)|pronoun
她們|她们|tāmen|they / them / their (female)|pronoun
是|是|shì|to be / is / are / am / yes|verb
不|不|bù|no / not / negation particle|adverb/particle
有|有|yǒu|to have / there is / there are|verb
沒有|没有|méiyǒu|to not have / there is not / did not|verb/adverb
好|好|hǎo|good / well / fine / okay|adjective/adverb
大|大|dà|big / large / great|adjective
小|小|xiǎo|small / little / young|adjective
多|多|duō|many / much / more / a lot|adjective/adverb
少|少|shǎo|few / less / scarce|adjective/adverb
人|人|rén|person / people / human being|noun
中國|中国|Zhōngguó|China|noun
中文|中文|Zhōngwén|Chinese language (written) / Chinese text|noun
普通話|普通话|Pǔtōnghuà|Mandarin Chinese / standard Chinese|noun
英語|英语|Yīngyǔ|English language|noun
日本|日本|Rìběn|Japan|noun
日語|日语|Rìyǔ|Japanese language|noun
國|国|guó|country / nation / national|noun
語言|语言|yǔyán|language / speech|noun
字|字|zì|character / word / written symbol|noun
說|说|shuō|to speak / to say / to talk|verb
聽|听|tīng|to listen / to hear / to obey|verb
看|看|kàn|to look / to see / to watch / to read|verb
寫|写|xiě|to write|verb
讀|读|dú|to read (aloud) / to study|verb
吃|吃|chī|to eat|verb
喝|喝|hē|to drink|verb
去|去|qù|to go / to leave|verb
來|来|lái|to come / to arrive|verb
做|做|zuò|to do / to make / to act as|verb
學|学|xué|to study / to learn / to imitate|verb
買|买|mǎi|to buy / to purchase|verb
賣|卖|mài|to sell|verb
一|一|yī|one / 1|numeral
二|二|èr|two / 2|numeral
兩|两|liǎng|two (used before measure words) / both|numeral
三|三|sān|three / 3|numeral
四|四|sì|four / 4|numeral
五|五|wǔ|five / 5|numeral
六|六|liù|six / 6|numeral
七|七|qī|seven / 7|numeral
八|八|bā|eight / 8|numeral
九|九|jiǔ|nine / 9|numeral
十|十|shí|ten / 10|numeral
百|百|bǎi|hundred / 100|numeral
千|千|qiān|thousand / 1000|numeral
萬|万|wàn|ten thousand / 10,000|numeral
個|个|gè|general measure word for people and objects|measure word
的|的|de|possessive and attributive particle / used after adjectives|particle
了|了|le|particle indicating completed action or change of state|particle
嗎|吗|ma|question particle (yes/no questions)|particle
呢|呢|ne|question particle (follow-up questions) / and you?|particle
吧|吧|ba|suggestion / assumption / softening particle|particle
都|都|dōu|all / both / entirely / already|adverb
也|也|yě|also / too / as well|adverb
很|很|hěn|very / quite (used before adjectives)|adverb
非常|非常|fēicháng|very / extremely / exceptionally|adverb
太|太|tài|too / excessively / extremely|adverb
現在|现在|xiànzài|now / currently / at present|noun/adverb
今天|今天|jīntiān|today|noun
明天|明天|míngtiān|tomorrow|noun
昨天|昨天|zuótiān|yesterday|noun
時間|时间|shíjiān|time / period|noun
年|年|nián|year|noun
月|月|yuè|month / moon|noun
日|日|rì|day / sun / date|noun
`;

// ── Build word list ──────────────────────────────────────────
let allWords = [];

function setupDict() {
  const lines = wordsText.trim().split('\n');
  lines.forEach(line => {
    const parts = line.split('|');
    if (parts.length === 5) {
      allWords.push(new ChineseWord(
        parts[0].trim(), parts[1].trim(), parts[2].trim(),
        parts[3].trim(), parts[4].trim()
      ));
    }
  });
  console.log(`✅ Chinese dictionary loaded: ${allWords.length} words`);
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

async function translateText(text, from, to) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  if (data.responseStatus !== 200 && data.responseStatus !== 206) throw new Error(data.responseDetails);
  return data.responseData.translatedText;
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
// Tier 0: exact match on traditional, simplified, or any pinyin variant
// Tier 1: starts with query
// Tier 2: contains query
// Tier 3: definition contains query
function rankedSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = [];

  for (const word of allWords) {
    if (activePOS !== 'all' && word.posCategory !== activePOS) continue;

    const trad     = word.traditional.toLowerCase();
    const simp     = word.simplified.toLowerCase();
    const variants = word.pinyinVariants; // already tone-stripped
    const defn     = word.definition.toLowerCase();
    const qPlain   = stripTones(q); // strip tones from query too

    let tier = null;

    if (trad === q || simp === q || variants.includes(qPlain)) {
      tier = 0;
    } else if (trad.startsWith(q) || simp.startsWith(q) || variants.some(v => v.startsWith(qPlain))) {
      tier = 1;
    } else if (trad.includes(q) || simp.includes(q) || variants.some(v => v.includes(qPlain))) {
      tier = 2;
    } else if (defn.includes(q)) {
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
    // Show traditional / simplified if different, plus pinyin
    const charDisplay = word.traditional === word.simplified
      ? escapeHTML(word.traditional)
      : `${escapeHTML(word.traditional)} <span style="opacity:0.55">/ ${escapeHTML(word.simplified)}</span>`;
    label.innerHTML = `<strong>${charDisplay}</strong> <span class="pinyin">${escapeHTML(word.pinyin)}</span>`;

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
  // Put traditional char in search box
  document.getElementById('searchInput').value = word.traditional;
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

// ── Live results ─────────────────────────────────────────────
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

  // If traditional === simplified, add class to hide the duplicate
  const charSame  = word.traditional === word.simplified;
  const charClass = charSame ? 'entry-chars entry-char-same' : 'entry-chars';

  output.innerHTML = `
    <div class="entry-card">
      <div class="entry-top">
        <div class="${charClass}">
          <span class="entry-char-traditional">${escapeHTML(word.traditional)}</span>
          <span class="char-divider">/</span>
          <span class="entry-char-simplified">${escapeHTML(word.simplified)}</span>
        </div>
        <span class="entry-pinyin">${escapeHTML(word.pinyin)}</span>
      </div>
      <div class="entry-body">
        <div class="entry-row">
          <span class="entry-field-label">Definition</span>
          <div class="entry-definition">${defHTML}</div>
        </div>
        <div class="entry-row">
          <span class="entry-field-label">POS</span>
          <div class="entry-tags">${posHTML}</div>
        </div>
        <div class="translate-strip">
          <button class="translate-btn" id="translateBtn-en">🇺🇸 → English</button>
          <button class="translate-btn" id="translateBtn-ja">🇯🇵 → Japanese</button>
          <span class="translate-result" id="translateResult"></span>
        </div>
      </div>
    </div>
  `;

  function wireBtn(btnId, from, to, label) {
    const btn    = document.getElementById(btnId);
    const result = document.getElementById('translateResult');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.translate-btn').forEach(b => b.disabled = true);
      result.className = 'translate-result loading';
      result.textContent = `Translating to ${label}…`;
      try {
        const translated = await translateText(word.definition, 'en', to);
        result.className = 'translate-result';
        result.textContent = translated;
      } catch {
        result.className = 'translate-result';
        result.textContent = '⚠ Translation unavailable';
      }
      document.querySelectorAll('.translate-btn').forEach(b => b.disabled = false);
    });
  }

  wireBtn('translateBtn-en', 'zh-CN', 'en', 'English');
  wireBtn('translateBtn-ja', 'zh-CN', 'ja', 'Japanese');
}

function searchWord() {
  const input = document.getElementById('searchInput');
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  document.getElementById('results').innerHTML = '';

  const matches = rankedSearch(query);
  if (matches.length) {
    displayWord(matches[0]);
  } else {
    document.getElementById('output').innerHTML =
      `<div class="output-placeholder not-found">「${escapeHTML(input.value.trim())}」not found.</div>`;
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
