# Multi-Language Dictionary

A fast, lightweight, browser-based dictionary supporting multiple languages with smart search and clean UI.

if you are interested in trying it out without downloading go here: https://crillinox.github.io/multilingual-dictionary-website/

this is intended to be an offline library usable anytime
---

## Features

* 🌍 Multiple dictionaries:

  * Chinese
  * English
  * Spanish
  * Japanese

* 🔎 Smart search:

  * Exact match, prefix match, and partial match
  * Search by character, pinyin, or definition
  * Tone-insensitive pinyin (e.g. `mao` → `māo`)
  * Ranked results for better accuracy

* 🧠 Language-aware features:

  * Chinese: traditional, simplified, and pinyin support
  * Japanese: kanji, katakana, and hiragana support
  * All: definition based lookup

* Part-of-speech filtering

* 📖 Multi-sense definitions displayed as readable lists

* Instant results with keyboard navigation

* Click a result to instantly view full entry

---

## UI

* Light and dark mode (saved automatically)
* Color-coded dictionaries:

  * English → orange
  * Spanish → terracotta
  * Chinese → red
  * Japanese → blue-green

---

## How to Use

1. Type a word, character, or definition into the search bar
2. Browse live results as you type
3. Use arrow keys to navigate results
4. Press **Enter** or click a result to view full details

---

## Project Structure

```id="c3k82d"
/
├── CHANGELOG
├── CONTRIBUTING.md
├── en_script.js
├── en_style.css
├── es_index.html
├── es_script.js
├── es_style.css
├── index.html (holds english)
├── jp_index.html
├── script.js (holds japanese)
├── style.css (holds japanese)
├── zh_index.html
├── zh_script.js
├── zh_style.css
```

---

## Contributing

Want to help expand the dictionary?

Check out `CONTRIBUTING.md` for the correct formats and examples.

---

## License

This project is licensed under the MIT License.

---

## Notes

* This project is designed to be simple, fast, and easy to extend
* Dictionaries are manually curated and can be expanded over time
* Contributions are welcome

---

## Future Ideas

* Larger word databases
* Better ranking and fuzzy search

---
built this because I was bored in class
