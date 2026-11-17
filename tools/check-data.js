#!/usr/bin/env node
// 课程数据检查：node tools/check-data.js
// 用 vm 模块和一个假的 window 对象执行 js/data.js，然后检查结构、分词、拼音和重复项。
// 有错误时逐条打印并以非零状态退出；警告只打印，不影响退出码。
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

// 可选参数：要检查的文件路径（默认 js/data.js）
var DATA_FILE = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '..', 'js', 'data.js');
var LANGS = ['zh', 'en', 'de'];
var COLORS = ['orange', 'teal', 'purple', 'pink', 'blue', 'green', 'amber', 'red'];
var WORDS_PER_UNIT = 10;
var SENTENCES_PER_UNIT = 10;
var MIN_TOKENS = 2;
var MAX_TOKENS = 7;

var FW_PUNCT = '，。！？、：；';
var TRAILING_FW = new RegExp('[' + FW_PUNCT + ']+$');
var ANY_FW = new RegExp('[' + FW_PUNCT + '（）《》“”‘’]');
var HAN = /\p{Script=Han}/u;
var ASCII_PUNCT = /[!-\/:-@\[-`{-~]/;
var PY_VOWELS = 'aeiouüāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ';
var VOWEL_RUN = new RegExp('[' + PY_VOWELS + ']+', 'g');
var PY_CORE = new RegExp('^[a-z' + PY_VOWELS + '\']+$');
var TONE_OF = {};
[['āēīōūǖ', 1], ['áéíóúǘ', 2], ['ǎěǐǒǔǚ', 3], ['àèìòùǜ', 4]].forEach(function (p) {
  p[0].split('').forEach(function (c) { TONE_OF[c] = p[1]; });
});
// 人名的固定拼音（李明分成两个词：李 明 / Lǐ Míng）
var NAME_PY = { '安娜': 'Ānnà', '汤姆': 'Tāngmǔ' };

var errors = [];
var warnings = [];
function err(where, msg) { errors.push(where + ': ' + msg); }
function warn(where, msg) { warnings.push(where + ': ' + msg); }

function isObj(x) { return x !== null && typeof x === 'object' && !Array.isArray(x); }
function nonEmptyStr(x) { return typeof x === 'string' && x.trim().length > 0; }
function chars(s) { return Array.from(s); }
function hanCount(s) { return chars(s).filter(function (c) { return HAN.test(c); }).length; }
function latinCount(s) { return (s.match(/[A-Za-z]/g) || []).length; }

// '你好，' -> { core: '你好', punct: '，' }
function splitPunct(tok) {
  var m = tok.match(TRAILING_FW);
  var punct = m ? m[0] : '';
  return { core: tok.slice(0, tok.length - punct.length), punct: punct };
}
function syllables(pyCore) { return pyCore.toLowerCase().match(VOWEL_RUN) || []; }
function toneOf(run) {
  var t = 0;
  for (var i = 0; i < run.length; i++) if (TONE_OF[run[i]]) t = TONE_OF[run[i]];
  return t;
}
function markCount(run) {
  var n = 0;
  for (var i = 0; i < run.length; i++) if (TONE_OF[run[i]]) n++;
  return n;
}
function isQuestion(s) { var c = s.charAt(s.length - 1); return c === '?' || c === '？'; }

// ---------- 字符串与分词 ----------

function checkString(where, s) {
  if (!nonEmptyStr(s)) { err(where, 'missing or empty string'); return false; }
  if (/^\s|\s$/.test(s)) err(where, 'leading/trailing whitespace in "' + s + '"');
  if (/ {2,}/.test(s)) err(where, 'double space in "' + s + '"');
  if (/[\t\n\r  -​　]/.test(s)) err(where, 'non-standard whitespace in "' + s + '" (use single ASCII spaces)');
  return true;
}

function checkZhString(where, s) {
  if (!checkString(where, s)) return null;
  var toks = s.split(' ');
  toks.forEach(function (t) {
    if (ASCII_PUNCT.test(t)) err(where, 'ASCII punctuation in zh token "' + t + '" (use full-width ，。！？)');
    var p = splitPunct(t);
    if (!p.core) { err(where, 'full-width punctuation as a standalone token "' + t + '" in "' + s + '"'); return; }
    var bad = chars(p.core).filter(function (c) { return !HAN.test(c) && !ASCII_PUNCT.test(c); });
    if (bad.length) err(where, 'non-Chinese character(s) "' + bad.join('') + '" in zh token "' + t + '"');
  });
  return toks;
}

function checkLatinString(where, s) {
  if (!checkString(where, s)) return null;
  if (ANY_FW.test(s)) err(where, 'full-width punctuation in "' + s + '"');
  if (HAN.test(s)) err(where, 'Chinese characters in "' + s + '"');
  var toks = s.split(' ');
  toks.forEach(function (t) {
    if (!/[\p{L}\p{N}]/u.test(t)) err(where, 'standalone punctuation token "' + t + '" in "' + s + '"');
  });
  return toks;
}

function isNameToken(zhToks, i) {
  var c = splitPunct(zhToks[i]).core;
  if (NAME_PY.hasOwnProperty(c)) return true;
  if (c === '李' && i + 1 < zhToks.length && splitPunct(zhToks[i + 1]).core === '明') return true;
  if (c === '明' && i > 0 && splitPunct(zhToks[i - 1]).core === '李') return true;
  return false;
}

// 拼音：逐词与汉字对应——标点一致、音节数 = 汉字数（儿化除外）、每个音节最多一个声调符号、大小写
function checkPinyin(where, zhToks, py, isSentence) {
  if (!checkString(where + '.py', py)) return null;
  var pyToks = py.split(' ');
  if (pyToks.length !== zhToks.length) {
    err(where, 'zh has ' + zhToks.length + ' token(s) but py has ' + pyToks.length + ': "' + zhToks.join(' ') + '" / "' + py + '"');
    return null;
  }
  for (var i = 0; i < pyToks.length; i++) {
    var z = splitPunct(zhToks[i]);
    var p = splitPunct(pyToks[i]);
    var label = where + ' token ' + (i + 1) + ' "' + zhToks[i] + '" / "' + pyToks[i] + '"';
    if (z.punct !== p.punct) err(label, 'punctuation differs between zh and py');
    var core = p.core;
    if (!core) { err(label, 'empty pinyin token'); continue; }
    if (!PY_CORE.test(core.toLowerCase())) { err(label, 'invalid character(s) in pinyin'); continue; }
    if (/^'|''|'$/.test(core)) err(label, 'misplaced apostrophe');
    var syl = syllables(core);
    var han = hanCount(z.core);
    var er = (z.core.match(/儿/g) || []).length;
    if (syl.length !== han && !(er && syl.length === han - er)) {
      err(label, han + ' character(s) but ' + syl.length + ' pinyin syllable(s)');
    }
    syl.forEach(function (run) {
      if (markCount(run) > 1) err(label, 'more than one tone mark in syllable "' + run + '"');
    });
    var name = isNameToken(zhToks, i);
    if (NAME_PY.hasOwnProperty(z.core) && core !== NAME_PY[z.core]) err(label, 'name should be written "' + NAME_PY[z.core] + '"');
    if (z.core === '李' && name && core !== 'Lǐ') err(label, 'name should be written "Lǐ"');
    if (z.core === '明' && name && core !== 'Míng') err(label, 'name should be written "Míng"');
    var first = core.charAt(0);
    var rest = core.slice(1);
    if (name) {
      if (first === first.toLowerCase()) err(label, 'proper name must be capitalised');
    } else if (isSentence && i === 0) {
      if (first === first.toLowerCase()) err(label, 'sentence pinyin must start with a capital letter');
      if (rest !== rest.toLowerCase()) err(label, 'unexpected capital letter in pinyin');
    } else if (core !== core.toLowerCase()) {
      err(label, 'unexpected capital letter in pinyin');
    }
  }
  return pyToks;
}

// 一/不 变调约定：不 在第四声前读 bú，其余 bù；一 在第四声前读 yí，在一、二、三声前读 yì，单用或句末读 yī。
// 个 本调是第四声（轻读 ge），所以 一个 = yí ge。
function checkSandhi(where, zhToks, pyToks) {
  for (var i = 0; i < zhToks.length; i++) {
    var z = splitPunct(zhToks[i]);
    if (z.core !== '不' && z.core !== '一') continue;
    var got = splitPunct(pyToks[i]).core.toLowerCase();
    var standalone = !!z.punct || i === zhToks.length - 1;
    var nextTone = 0;
    if (!standalone) {
      var nz = splitPunct(zhToks[i + 1]).core;
      var ns = syllables(splitPunct(pyToks[i + 1]).core);
      nextTone = nz.charAt(0) === '个' ? 4 : (ns.length ? toneOf(ns[0]) : 0);
    }
    var expected;
    if (z.core === '不') {
      expected = (!standalone && nextTone === 4) ? 'bú' : 'bù';
    } else if (standalone) {
      expected = 'yī';
    } else if (nextTone === 4) {
      expected = 'yí';
    } else if (nextTone >= 1) {
      expected = 'yì';
    } else {
      warn(where + ' token ' + (i + 1), 'cannot decide the tone of 一 before a neutral-tone syllable');
      continue;
    }
    if (got !== expected) {
      err(where + ' token ' + (i + 1), '"' + z.core + '" should be "' + expected + '" here (tone-sandhi convention), found "' + got + '"');
    }
  }
}

function checkEndMark(where, lang, s) {
  var c = s.charAt(s.length - 1);
  var ok = lang === 'zh' ? '。！？'.indexOf(c) >= 0 : '.!?'.indexOf(c) >= 0;
  if (!ok) warn(where, 'sentence does not end with sentence punctuation: "' + s + '"');
}

// ---------- 加载 ----------

var src;
try {
  src = fs.readFileSync(DATA_FILE, 'utf8');
} catch (e) {
  console.error('FAIL: cannot read ' + DATA_FILE + ': ' + e.message);
  process.exit(1);
}
var sandbox = { window: {} };
try {
  vm.runInNewContext(src, sandbox, { filename: DATA_FILE });
} catch (e) {
  console.error('FAIL: js/data.js does not evaluate: ' + (e.stack || e.message));
  process.exit(1);
}
var DL = sandbox.window.DL;
if (!isObj(DL) || !Array.isArray(DL.units)) {
  console.error('FAIL: window.DL.units is missing or not an array');
  process.exit(1);
}

// ---------- 检查 ----------

var allIds = {};
var emojiSeen = {};
var wordStr = { zh: {}, en: {}, de: {} };
var sentStr = { zh: {}, en: {}, de: {} };
var colorSeen = {};
var phrases = [];
var stats = { units: 0, words: 0, sentences: 0, alts: 0, altSentences: 0, altByLang: { zh: 0, en: 0, de: 0 } };

function claimId(id, where) {
  if (allIds.hasOwnProperty(id)) err(where, 'duplicate id "' + id + '" (also used by ' + allIds[id] + ')');
  else allIds[id] = where;
}

DL.units.forEach(function (u, ui) {
  var uw = 'unit ' + (ui + 1) + (u && u.id ? ' (' + u.id + ')' : '');
  if (!isObj(u)) { err(uw, 'unit is not an object'); return; }
  stats.units++;

  ['id', 'icon', 'color'].forEach(function (f) { if (!nonEmptyStr(u[f])) err(uw, 'missing field "' + f + '"'); });
  if (nonEmptyStr(u.id)) {
    claimId(u.id, uw);
    if (u.id !== 'u' + (ui + 1)) err(uw, 'id should be "u' + (ui + 1) + '"');
  }
  if (nonEmptyStr(u.color)) {
    if (COLORS.indexOf(u.color) < 0) err(uw, 'color "' + u.color + '" is not one of ' + COLORS.join(', '));
    else if (colorSeen[u.color]) err(uw, 'color "' + u.color + '" already used by ' + colorSeen[u.color]);
    else if (u.color !== COLORS[ui]) warn(uw, 'color "' + u.color + '" breaks the expected order (expected "' + COLORS[ui] + '")');
    colorSeen[u.color] = uw;
  }
  ['title', 'desc'].forEach(function (f) {
    if (!isObj(u[f])) { err(uw, 'missing object "' + f + '"'); return; }
    ['zh', 'en'].forEach(function (l) { if (!nonEmptyStr(u[f][l])) err(uw, 'missing ' + f + '.' + l); });
  });
  if (!isObj(u.tips)) {
    err(uw, 'missing object "tips"');
  } else {
    LANGS.forEach(function (l) { if (!nonEmptyStr(u.tips[l])) err(uw, 'missing tips.' + l); });
    Object.keys(u.tips).forEach(function (k) { if (LANGS.indexOf(k) < 0) err(uw, 'unknown tips language "' + k + '"'); });
    ['en', 'de'].forEach(function (l) {
      if (nonEmptyStr(u.tips[l]) && !HAN.test(u.tips[l])) warn(uw, 'tips.' + l + ' should be written in Chinese');
    });
    if (nonEmptyStr(u.tips.zh) && hanCount(u.tips.zh) > latinCount(u.tips.zh)) warn(uw, 'tips.zh should be written in English');
  }

  // ----- words -----
  if (!Array.isArray(u.words)) {
    err(uw, 'missing array "words"');
  } else {
    if (u.words.length !== WORDS_PER_UNIT) err(uw, 'has ' + u.words.length + ' words, expected ' + WORDS_PER_UNIT);
    u.words.forEach(function (w, wi) {
      var ww = uw + ' word ' + (wi + 1) + (w && w.id ? ' (' + w.id + ')' : '');
      if (!isObj(w)) { err(ww, 'word is not an object'); return; }
      stats.words++;
      ['id', 'emoji', 'zh', 'py', 'en', 'de'].forEach(function (f) { if (!nonEmptyStr(w[f])) err(ww, 'missing field "' + f + '"'); });
      Object.keys(w).forEach(function (k) {
        if (['id', 'emoji', 'zh', 'py', 'en', 'de'].indexOf(k) < 0) warn(ww, 'unknown field "' + k + '"');
      });
      if (nonEmptyStr(w.id)) {
        if (!/^[a-z][a-z0-9]*$/.test(w.id)) err(ww, 'id should be a short lowercase slug');
        claimId(w.id, ww);
      }
      if (nonEmptyStr(w.emoji)) {
        var en = w.emoji.replace(/️/g, '');
        if (!/\p{Extended_Pictographic}|⃣/u.test(w.emoji)) warn(ww, 'emoji "' + w.emoji + '" does not look like an emoji');
        if (emojiSeen.hasOwnProperty(en)) err(ww, 'duplicate emoji ' + w.emoji + ' (also used by ' + emojiSeen[en] + ')');
        else emojiSeen[en] = ww;
      }
      var zhToks = null;
      if (nonEmptyStr(w.zh)) {
        if (w.zh.indexOf(' ') >= 0) err(ww, 'zh word contains a space: "' + w.zh + '"');
        zhToks = checkZhString(ww + '.zh', w.zh);
        if (zhToks && splitPunct(w.zh).punct) err(ww, 'zh word should not contain punctuation');
      }
      if (nonEmptyStr(w.py)) {
        if (w.py.indexOf(' ') >= 0) err(ww, 'word py contains a space: "' + w.py + '" (write syllables together)');
        if (zhToks) checkPinyin(ww, zhToks, w.py, false);
      }
      ['en', 'de'].forEach(function (l) {
        if (!nonEmptyStr(w[l])) return;
        var toks = checkLatinString(ww + '.' + l, w[l]);
        if (toks && toks.length > 1) {
          var article = l === 'de' && toks.length === 2 && /^(der|die|das)$/.test(toks[0]);
          if (!article) phrases.push(w.id + '.' + l + ' "' + w[l] + '"');
        }
        if (/[.!?,]$/.test(w[l])) warn(ww, l + ' word should not carry punctuation');
      });
      if (nonEmptyStr(w.de) && /^(der|die|das) /.test(w.de)) {
        var noun = w.de.split(' ')[1] || '';
        if (noun.charAt(0) !== noun.charAt(0).toUpperCase()) err(ww, 'German noun must be capitalised: "' + w.de + '"');
      }
      LANGS.forEach(function (l) {
        if (!nonEmptyStr(w[l])) return;
        var key = l === 'zh' ? w[l] : w[l].toLowerCase();
        if (wordStr[l].hasOwnProperty(key)) err(ww, 'duplicate ' + l + ' word "' + w[l] + '" (also ' + wordStr[l][key] + ')');
        else wordStr[l][key] = ww;
      });
    });
  }

  // ----- sentences -----
  var unitTokens = {};
  if (!Array.isArray(u.sentences)) {
    err(uw, 'missing array "sentences"');
  } else {
    if (u.sentences.length !== SENTENCES_PER_UNIT) err(uw, 'has ' + u.sentences.length + ' sentences, expected ' + SENTENCES_PER_UNIT);
    u.sentences.forEach(function (s, si) {
      var sw = uw + ' sentence ' + (si + 1) + (s && s.id ? ' (' + s.id + ')' : '');
      if (!isObj(s)) { err(sw, 'sentence is not an object'); return; }
      stats.sentences++;
      ['id', 'zh', 'py', 'en', 'de'].forEach(function (f) { if (!nonEmptyStr(s[f])) err(sw, 'missing field "' + f + '"'); });
      Object.keys(s).forEach(function (k) {
        if (['id', 'zh', 'py', 'en', 'de', 'alt'].indexOf(k) < 0) warn(sw, 'unknown field "' + k + '"');
      });
      if (nonEmptyStr(s.id)) {
        var expectId = 'u' + (ui + 1) + 's' + (si + 1);
        if (s.id !== expectId) err(sw, 'id should be "' + expectId + '"');
        claimId(s.id, sw);
      }

      var zhToks = nonEmptyStr(s.zh) ? checkZhString(sw + '.zh', s.zh) : null;
      if (zhToks) {
        zhToks.forEach(function (t) { unitTokens[splitPunct(t).core] = true; });
        if (zhToks.length < MIN_TOKENS || zhToks.length > MAX_TOKENS) {
          warn(sw, 'zh has ' + zhToks.length + ' words (expected ' + MIN_TOKENS + '-' + MAX_TOKENS + ')');
        }
        checkEndMark(sw + '.zh', 'zh', s.zh);
        if (nonEmptyStr(s.py)) {
          var pyToks = checkPinyin(sw, zhToks, s.py, true);
          if (pyToks) checkSandhi(sw, zhToks, pyToks);
        }
      }
      ['en', 'de'].forEach(function (l) {
        if (!nonEmptyStr(s[l])) return;
        var toks = checkLatinString(sw + '.' + l, s[l]);
        if (!toks) return;
        checkEndMark(sw + '.' + l, l, s[l]);
        var c = s[l].charAt(0);
        if (c !== c.toUpperCase()) warn(sw + '.' + l, 'sentence should start with a capital letter');
      });
      if (LANGS.every(function (l) { return nonEmptyStr(s[l]); })) {
        var q = isQuestion(s.zh);
        if (isQuestion(s.en) !== q || isQuestion(s.de) !== q) warn(sw, 'question mark not consistent across zh/en/de');
      }
      LANGS.forEach(function (l) {
        if (!nonEmptyStr(s[l])) return;
        if (sentStr[l].hasOwnProperty(s[l])) warn(sw, 'same ' + l + ' sentence as ' + sentStr[l][s[l]] + ': "' + s[l] + '"');
        else sentStr[l][s[l]] = sw;
      });

      // ----- alts -----
      if (s.alt === undefined) return;
      if (!isObj(s.alt)) { err(sw, '"alt" must be an object keyed by language'); return; }
      var hasAlt = false;
      Object.keys(s.alt).forEach(function (l) {
        var aw = sw + ' alt.' + l;
        if (LANGS.indexOf(l) < 0) { err(aw, 'alt language key must be one of zh/en/de'); return; }
        var list = s.alt[l];
        if (!Array.isArray(list) || !list.length) { err(aw, 'must be a non-empty array of strings'); return; }
        var seen = {};
        list.forEach(function (a, ai) {
          var aiw = aw + '[' + ai + ']';
          if (!nonEmptyStr(a)) { err(aiw, 'empty or not a string'); return; }
          stats.alts++;
          stats.altByLang[l]++;
          hasAlt = true;
          if (l === 'zh') {
            checkZhString(aiw, a);
            if (a.indexOf(' ') < 0 && chars(a).length > 3) warn(aiw, 'zh alt "' + a + '" looks untokenised (no spaces)');
          } else {
            checkLatinString(aiw, a);
          }
          checkEndMark(aiw, l, a);
          if (a === s[l]) warn(aiw, 'alt is identical to the canonical sentence');
          if (seen[a]) warn(aiw, 'duplicate alt "' + a + '"');
          seen[a] = true;
          if (nonEmptyStr(s[l]) && isQuestion(a) !== isQuestion(s[l])) warn(aiw, 'alt and canonical disagree on being a question');
        });
      });
      if (hasAlt) stats.altSentences++;
    });
  }

  // 每个单词至少在本单元的一个句子里出现（按 zh 词）
  if (Array.isArray(u.words) && Array.isArray(u.sentences)) {
    u.words.forEach(function (w) {
      if (isObj(w) && nonEmptyStr(w.zh) && !unitTokens[w.zh]) warn(uw, 'word "' + w.zh + '" (' + w.id + ') is not used in any of the unit\'s sentences');
    });
  }
});

if (stats.units !== COLORS.length) warn('units', 'found ' + stats.units + ' units, expected ' + COLORS.length);

// ---------- 输出 ----------

if (warnings.length) {
  console.log('Warnings (' + warnings.length + '):');
  warnings.forEach(function (w) { console.log('  ! ' + w); });
  console.log('');
}
if (errors.length) {
  console.error('Errors (' + errors.length + '):');
  errors.forEach(function (e) { console.error('  x ' + e); });
  console.error('');
}

console.log('Summary');
console.log('  units:     ' + stats.units);
console.log('  words:     ' + stats.words);
console.log('  sentences: ' + stats.sentences);
console.log('  alts:      ' + stats.alts + ' in ' + stats.altSentences + ' sentences (zh ' + stats.altByLang.zh +
  ', en ' + stats.altByLang.en + ', de ' + stats.altByLang.de + ')');
if (phrases.length) console.log('  multi-word word entries (' + phrases.length + '): ' + phrases.join(', '));

if (errors.length) {
  console.error('\nFAIL: ' + errors.length + ' error(s) in js/data.js');
  process.exit(1);
}
console.log('\nPASS' + (warnings.length ? ' with ' + warnings.length + ' warning(s)' : ''));
