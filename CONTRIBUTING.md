# Contributing

Thanks for helping improve the dictionary! Contributions are simple—just follow the formats below.

---

## General Rules

* Use `|` to separate fields
* Keep everything on one line per entry
* Use ` / ` (space-slash-space) to separate multiple definitions or senses
* Keep part of speech lowercase (e.g. `noun`, `verb`, `adjective`)
* Avoid extra spaces unless necessary
* Translation fields at the end are **optional** — leave them blank or omit them if you don't know

---

## English Format

```
word|definition|partOfSpeech|transJA|transES|transZH
```

Translation field order: **Japanese | Spanish | Chinese**

### Example:

```
house|a building for people to live in|noun
run|to move quickly on foot / to operate|verb|走る|correr|跑
water|a colorless, transparent, odorless liquid / to irrigate|noun/verb|水 (みず)|el agua|水
```

---

## Spanish Format

```
word|definition|partOfSpeech|transEN|transJA|transZH
```

Translation field order: **English | Japanese | Chinese**

### Example:

```
casa|house / home|noun
correr|to run / to move quickly|verb|to run|走る|跑
agua|water|noun|water|水 (みず)|水
```

---

## Japanese Format

```
word|romaji|definition|partOfSpeech|transEN|transES|transZH
```

Translation field order: **English | Spanish | Chinese**

### Notes:

* Use **kanji** when available (e.g. 塩)
* Use **katakana** for loanwords (e.g. チキン)
* Use **hiragana** for native words without kanji (e.g. そして)
* `romaji` can list multiple readings separated by `/` (e.g. `hito/jin/nin`)

### Example:

```
塩|shio|salt|noun
チキン|chikin|chicken (loanword)|noun
そして|soshite|and then / and|conjunction
天気|tenki|weather|noun|weather|el tiempo|天气
```

---

## Chinese Format

```
traditional|simplified|pinyin|definition|partOfSpeech|transEN|transES|transJA
```

Translation field order: **English | Spanish | Japanese**

### Notes:

* If traditional and simplified are the same character, write it twice
* Pinyin should include tone marks (e.g. `nǐ hǎo`) — the search engine handles accent-free input automatically
* Multiple pinyin readings separated by `/`

### Example:

```
貓|猫|māo|cat|noun
愛|爱|ài|love / affection|verb/noun
天氣|天气|tiānqì|weather / climate|noun|weather|el tiempo|天気 (てんき)
你好|你好|nǐ hǎo|hello / how do you do|interjection|hello|hola|こんにちは
```

---

## Tips

* Keep definitions concise and clear
* Use ` / ` (with spaces on both sides) to separate multiple senses — this renders as a numbered list in the dictionary
* Avoid duplicate entries
* Double-check spelling, tone marks, and formatting
* You don't need to fill in all translation fields — partial is fine

---

## Submitting Changes

* Add your entries to the appropriate script file inside the `wordsText` block
* Make sure formatting matches the examples above
* Submit a pull request or send the entries directly

Thanks for contributing!
