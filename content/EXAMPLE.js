// 格式示例（不会被网页加载）：德语课专属单元。检查：node tools/check-data.js content/EXAMPLE.js
window.DL.units.push(
  {
    id: 'u9',
    icon: '💶',
    color: 'orange',               // 颜色按单元号循环：(编号-1) % 8 → orange, teal, purple, pink, blue, green, amber, red
    level: 'A1',
    courses: ['de', 'den'],        // 只出现在两门德语课里
    title: { zh: '数字与价钱', en: 'Numbers & prices' },
    desc: { zh: '数到一百，问问多少钱', en: 'Count to a hundred and ask about prices' },
    tips: {
      de: '德语 21 到 99 先说个位再说十位：einundzwanzig 是“一和二十”。问价钱用 Wie viel kostet …?',
      den: 'From 21 to 99 German says the ones before the tens: einundzwanzig is "one-and-twenty". Ask prices with Wie viel kostet …?'
    },
    words: [
      { id: 'u9_twenty', emoji: '🔢', zh: '二十', en: 'twenty', de: 'zwanzig' },
      { id: 'u9_euro', emoji: '💶', zh: '欧元', en: 'euro', de: 'der Euro' },
      { id: 'u9_cost', zh: '花费', en: 'to cost', de: 'kosten' }
    ],
    sentences: [
      { id: 'u9s1', zh: '这 个 多少 钱？', en: 'How much is this?', de: 'Wie viel kostet das?',
        alt: { zh: ['这 多少 钱？'], en: ['How much does this cost?', 'How much does that cost?', 'How much is that?'] } },
      { id: 'u9s2', zh: '面包 两 欧元。', en: 'The bread costs two euros.', de: 'Das Brot kostet zwei Euro.',
        alt: { en: ['The bread is two euros.', 'Bread costs two euros.'], zh: ['面包 要 两 欧元。'] } }
    ]
  }
);
