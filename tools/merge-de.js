#!/usr/bin/env node
// 把 content/de-u<起>-u<止>.js 分片按单元顺序合并成 js/data-de.js（网页实际加载的文件）。
// 用法：node tools/merge-de.js && node tools/check-data.js
'use strict';
var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var DIR = path.join(ROOT, 'content');
var OUT = path.join(ROOT, 'js', 'data-de.js');

var parts = fs.readdirSync(DIR)
  .map(function (f) { var m = f.match(/^de-u(\d+)-u(\d+)\.js$/); return m ? { f: f, a: +m[1], b: +m[2] } : null; })
  .filter(Boolean)
  .sort(function (x, y) { return x.a - y.a; });

if (!parts.length) { console.error('no content/de-u*-u*.js parts found'); process.exit(1); }
for (var i = 1; i < parts.length; i++) {
  if (parts[i].a !== parts[i - 1].b + 1) console.warn('gap or overlap between ' + parts[i - 1].f + ' and ' + parts[i].f);
}

var head = '// 德语课第' + parts[0].a + '–' + parts[parts.length - 1].b + '单元（只用于“用中文学德语”和“用英语学德语”）。\n' +
  '// 由 tools/merge-de.js 从 content/ 的分片合并生成：要改内容请改分片，再重新运行合并和检查。\n';
var body = parts.map(function (p) { return fs.readFileSync(path.join(DIR, p.f), 'utf8').replace(/^﻿/, '').trim() + '\n'; }).join('\n');
fs.writeFileSync(OUT, head + body);
console.log('wrote ' + path.relative(ROOT, OUT) + ' from ' + parts.length + ' part(s): ' + parts.map(function (p) { return p.f; }).join(', '));
