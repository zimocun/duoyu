// 多语：游戏化语言学习PWA（英语、德语、中文）。原生JS，全部逻辑都在这个文件里。
// 课程内容在 js/data.js（window.DL），本文件据此生成练习题。
(function () {
  'use strict';

  var D = window.DL || { units: [] };

  // ---------- 课程与常量 ----------
  var COURSES = {
    en: { id: 'en', target: 'en', source: 'zh', badge: 'EN', name: { zh: '英语', en: 'English' }, sub: { zh: '用中文学英语', en: 'English for Chinese speakers' } },
    de: { id: 'de', target: 'de', source: 'zh', badge: 'DE', name: { zh: '德语', en: 'German' }, sub: { zh: '用中文学德语', en: 'German for Chinese speakers' } },
    zh: { id: 'zh', target: 'zh', source: 'en', badge: '中', name: { zh: '中文', en: 'Chinese' }, sub: { zh: '用英语学中文', en: 'Learn Chinese in English' } }
  };
  var ORDER = ['en', 'de', 'zh'];
  var UCOL = {
    orange: ['#ff9a2e', '#d9780f'], teal: ['#16c1ae', '#0e9586'], purple: ['#a86df0', '#8549cf'], pink: ['#ff75aa', '#dc4f87'],
    blue: ['#2ea6f5', '#1a82c9'], green: ['#58c832', '#3f9e1f'], amber: ['#f5b300', '#c99200'], red: ['#ff5d5d', '#d33c3c']
  };
  var KINDS = ['w1', 'w2', 'chest', 's1', 's2', 'test'];
  var LNUM = { w1: 1, w2: 2, s1: 3, s2: 4 };
  var OFFS = [0, 46, 72, 46, 0, -46];
  var MAXH = 5, HEART_MS = 30 * 60 * 1000, REFILL = 50, FREEZE = 100, BOOST = 80, BOOST_MS = 15 * 60 * 1000, MAXFREEZE = 2;
  var GOALS = [10, 20, 30, 50];
  var KEY = 'dyl.state';
  var TTSL = { en: 'en-US', de: 'de-DE', zh: 'zh-CN' };

  // ---------- 界面文字（界面语言 = 课程的母语：英语/德语课用中文，中文课用英语） ----------
  var STR = {
    zh: {
      t_learn: '学习', t_practice: '练习', t_shop: '商店', t_me: '我的',
      unitN: '第{n}单元', guide: '指南', start: '开始',
      k_w1: '新单词 1', k_w2: '新单词 2', k_chest: '宝箱', k_s1: '句子 1', k_s2: '句子 2', k_test: '单元测验',
      lessonOf: '第{a}课，共{b}课', testSub: '检验整个单元的内容', chestSub: '打开领取宝石', chestDone: '宝箱已领取',
      locked: '完成前面的所有关卡才能解锁！', goXp: '开始 +{n} 经验', reXp: '复习 +{n} 经验', openChest: '打开宝箱', chestGot: '获得 {n} 颗宝石！',
      check: '检查', cont: '继续', skip: '跳过', cantListen: '现在不方便听', useKbd: '使用键盘', useTiles: '使用词块', typeIn: '用{l}输入',
      ln_en: '英语', ln_de: '德语', ln_zh: '中文',
      qPick: '哪个是“{w}”？', qMean: '选择正确的意思', qSay: '怎么说“{w}”？', qHear: '你听到了什么？', qMatch: '配对',
      qBuild: '翻译这句话', qListen: '听写这句话', qFill: '选择正确的词填空', newWord: '新词',
      praise: ['太棒了！', '很好！', '正确！', '完美！', '真厉害！', '好极了！'],
      wrongT: '正确答案：', typo: '注意拼写：', meaning: '意思：', combo: '连对 {n} 题！',
      quitT: '确定要退出吗？', quitSub: '现在退出，本课的进度会丢失。', keep: '继续学习', quit: '退出',
      done: '课程完成！', perfect: '完美通关！', practiceDone: '练习完成！', xpGot: '经验', acc: '正确率', time: '用时',
      gemsGot: '+{n} 宝石', heartGot: '+1 红心',
      streakT: '连续学习 {n} 天！', streakSub: '每天学一点，别让火苗熄灭。', goalDone: '已达成今日目标！', goal: '今日目标', goalOf: '{a}/{b} 经验',
      noHeartsT: '红心用完了', noHeartsSub: '每 30 分钟恢复 1 颗红心。', refill: '补满红心', earn: '练习赚红心', noThanks: '不用了',
      nextHeart: '{m} 分钟后恢复下一颗', heartsFull: '红心已满，继续加油！', heartsOff: '红心机制已关闭', hearts: '红心',
      gemsNot: '宝石不够', bought: '购买成功！', shopT: '商店', gemHow: '完成课程、打开宝箱都能获得宝石。',
      i_refill: '补满红心', i_refillD: '把红心恢复到 5 颗，继续学习', i_freeze: '连胜保护', i_freezeD: '漏学一天也不会中断连胜，最多持有 2 个',
      i_boost: '双倍经验', i_boostD: '15 分钟内完成课程获得双倍经验', owned: '已有 {n}/{m}', activeM: '生效中，还剩 {m} 分钟', full: '已满',
      practiceT: '练习', pEarn: '完成一次练习 +10 经验，并恢复 1 颗红心', p_mist: '错题本', p_mistD: '复习答错过的题（{n}）',
      p_words: '单词强化', p_wordsD: '巩固最薄弱的单词', p_listen: '听力训练', p_listenD: '只听不看，练耳朵', needLearn: '先去学几节课吧',
      vocab: '词汇本', vocabN: '已学 {n} 个', noVocab: '学过的单词会出现在这里。',
      joined: '{d}加入', learner: '学习者', editName: '输入你的名字', stats: '统计',
      st_streak: '连胜天数', st_best: '最长 {n} 天', st_xp: '总经验', st_words: '已学单词', st_lessons: '完成课程',
      week: '近 7 天经验', cal: '学习日历', ach: '成就', courses: '我的课程', current: '当前',
      settings: '设置', s_goal: '每日目标', goalNames: ['轻松', '普通', '认真', '疯狂'], xpDay: '{n} 经验/天',
      s_sfx: '音效', s_tts: '自动朗读', s_slow: '慢速朗读', s_py: '显示拼音', s_hearts: '红心机制', s_heartsD: '关闭后答错不扣红心',
      reset: '重置所有进度', resetT: '确定要清除所有进度吗？', resetSub: '所有课程的进度、经验和宝石都会被清空，无法撤销。', resetYes: '清除', cancel: '取消',
      about: '离线可用 · 数据只保存在这台设备上',
      welcome: '你好！我是小橘。', welcomeSub: '每天几分钟，轻松学语言。', getStarted: '开始', chooseCourse: '你想学什么？',
      chooseGoal: '每天的学习目标是？', letsGo: '开始学习',
      courseEnd: '恭喜！你已经完成全部单元。', keyWords: '核心词汇', keyPhrases: '常用句子', tip: '小贴士',
      achGot: '获得成就：{n}', freezeUsed: '连胜保护帮你保住了连胜！', streakInfo: '连胜', freezes: '连胜保护：{n} 个',
      wd: ['日', '一', '二', '三', '四', '五', '六'], ym: '{y}年{m}月',
      a_first: '初次登场', ad_first: '完成第一节课', a_perfect: '零失误', ad_perfect: '一节课没有答错',
      a_st3: '小火苗', ad_st3: '连续学习 3 天', a_st7: '一周不断', ad_st7: '连续学习 7 天', a_st30: '坚持不懈', ad_st30: '连续学习 30 天',
      a_xp100: '百点经验', ad_xp100: '累计 100 经验', a_xp1000: '千点经验', ad_xp1000: '累计 1000 经验',
      a_unit: '单元毕业', ad_unit: '通过一次单元测验', a_w50: '词汇达人', ad_w50: '学会 50 个单词',
      a_tri: '三语学者', ad_tri: '英语、德语、中文各完成一节课', a_early: '早起的鸟儿', ad_early: '早上 7 点前完成一节课',
      a_night: '夜猫子', ad_night: '晚上 11 点后完成一节课'
    },
    en: {
      t_learn: 'Learn', t_practice: 'Practice', t_shop: 'Shop', t_me: 'Profile',
      unitN: 'Unit {n}', guide: 'Guide', start: 'START',
      k_w1: 'New words 1', k_w2: 'New words 2', k_chest: 'Treasure chest', k_s1: 'Sentences 1', k_s2: 'Sentences 2', k_test: 'Unit review',
      lessonOf: 'Lesson {a} of {b}', testSub: 'Test everything in this unit', chestSub: 'Open it to collect gems', chestDone: 'Already collected',
      locked: 'Complete all levels above to unlock this!', goXp: 'START +{n} XP', reXp: 'PRACTICE +{n} XP', openChest: 'OPEN', chestGot: 'You got {n} gems!',
      check: 'CHECK', cont: 'CONTINUE', skip: 'SKIP', cantListen: "CAN'T LISTEN NOW", useKbd: 'Use keyboard', useTiles: 'Use word bank', typeIn: 'Type in {l}',
      ln_en: 'English', ln_de: 'German', ln_zh: 'Chinese',
      qPick: 'Which one is “{w}”?', qMean: 'Select the correct meaning', qSay: 'How do you say “{w}”?', qHear: 'What do you hear?', qMatch: 'Tap the matching pairs',
      qBuild: 'Translate this sentence', qListen: 'Type what you hear', qFill: 'Fill in the blank', newWord: 'NEW WORD',
      praise: ['Amazing!', 'Nice!', 'Correct!', 'Great job!', 'Excellent!', 'Awesome!'],
      wrongT: 'Correct answer:', typo: 'Watch the spelling:', meaning: 'Meaning:', combo: '{n} in a row!',
      quitT: "Wait, don't go!", quitSub: "You'll lose your progress if you quit now.", keep: 'KEEP LEARNING', quit: 'QUIT',
      done: 'Lesson complete!', perfect: 'Perfect lesson!', practiceDone: 'Practice complete!', xpGot: 'XP', acc: 'Accuracy', time: 'Time',
      gemsGot: '+{n} gems', heartGot: '+1 heart',
      streakT: '{n} day streak!', streakSub: "Practice every day so your streak won't reset.", goalDone: 'Daily goal complete!', goal: 'Daily goal', goalOf: '{a}/{b} XP',
      noHeartsT: 'You ran out of hearts', noHeartsSub: 'You get 1 heart back every 30 minutes.', refill: 'REFILL HEARTS', earn: 'PRACTICE TO EARN HEARTS', noThanks: 'NO THANKS',
      nextHeart: 'Next heart in {m} min', heartsFull: 'Your hearts are full. Keep going!', heartsOff: 'Hearts are turned off', hearts: 'Hearts',
      gemsNot: 'Not enough gems', bought: 'Purchased!', shopT: 'Shop', gemHow: 'Earn gems by finishing lessons and opening chests.',
      i_refill: 'Refill hearts', i_refillD: 'Get back to 5 hearts and keep learning', i_freeze: 'Streak freeze', i_freezeD: 'Keeps your streak if you miss a day. Hold up to 2.',
      i_boost: 'Double XP', i_boostD: 'Earn twice the XP for 15 minutes', owned: 'Owned {n}/{m}', activeM: 'Active · {m} min left', full: 'Full',
      practiceT: 'Practice', pEarn: 'Each practice earns +10 XP and 1 heart', p_mist: 'Mistakes', p_mistD: 'Review questions you missed ({n})',
      p_words: 'Word workout', p_wordsD: 'Strengthen your weakest words', p_listen: 'Listening', p_listenD: 'Train your ears', needLearn: 'Finish a few lessons first',
      vocab: 'Words', vocabN: '{n} learned', noVocab: 'Words you learn will show up here.',
      joined: 'Joined {d}', learner: 'Learner', editName: 'Enter your name', stats: 'Statistics',
      st_streak: 'Day streak', st_best: 'Best {n}', st_xp: 'Total XP', st_words: 'Words learned', st_lessons: 'Lessons',
      week: 'XP, last 7 days', cal: 'Streak calendar', ach: 'Achievements', courses: 'My courses', current: 'CURRENT',
      settings: 'Settings', s_goal: 'Daily goal', goalNames: ['Casual', 'Regular', 'Serious', 'Intense'], xpDay: '{n} XP per day',
      s_sfx: 'Sound effects', s_tts: 'Auto-play audio', s_slow: 'Slower speech', s_py: 'Show pinyin', s_hearts: 'Hearts', s_heartsD: "When off, mistakes don't cost hearts",
      reset: 'Reset all progress', resetT: 'Delete all progress?', resetSub: "Progress, XP and gems for every course will be erased. This can't be undone.", resetYes: 'DELETE', cancel: 'CANCEL',
      about: 'Works offline · Your data stays on this device',
      welcome: "Hi there! I'm Juju.", welcomeSub: 'A few minutes a day to learn a language.', getStarted: 'GET STARTED', chooseCourse: 'What would you like to learn?',
      chooseGoal: "What's your daily goal?", letsGo: "LET'S GO",
      courseEnd: "Congratulations! You've finished every unit.", keyWords: 'Key words', keyPhrases: 'Key phrases', tip: 'Tip',
      achGot: 'Achievement unlocked: {n}', freezeUsed: 'A streak freeze saved your streak!', streakInfo: 'Streak', freezes: 'Streak freezes: {n}',
      wd: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], ym: '{mn} {y}',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      a_first: 'First steps', ad_first: 'Finish your first lesson', a_perfect: 'Flawless', ad_perfect: 'Finish a lesson with no mistakes',
      a_st3: 'On fire', ad_st3: 'Reach a 3 day streak', a_st7: 'Week warrior', ad_st7: 'Reach a 7 day streak', a_st30: 'Unstoppable', ad_st30: 'Reach a 30 day streak',
      a_xp100: '100 XP', ad_xp100: 'Earn 100 XP', a_xp1000: '1000 XP', ad_xp1000: 'Earn 1000 XP',
      a_unit: 'Graduate', ad_unit: 'Pass a unit review', a_w50: 'Word collector', ad_w50: 'Learn 50 words',
      a_tri: 'Polyglot', ad_tri: 'Finish a lesson in English, German and Chinese', a_early: 'Early bird', ad_early: 'Finish a lesson before 7 am',
      a_night: 'Midnight learner', ad_night: 'Finish a lesson after 11 pm'
    }
  };

  var ACH = [
    { id: 'first', ic: '🌱', ok: function () { return S.lessons >= 1; } },
    { id: 'perfect', ic: '💯', ok: function () { return S.perfect >= 1; } },
    { id: 'st3', ic: '🔥', ok: function () { return S.st.best >= 3; } },
    { id: 'st7', ic: '📅', ok: function () { return S.st.best >= 7; } },
    { id: 'st30', ic: '🏅', ok: function () { return S.st.best >= 30; } },
    { id: 'xp100', ic: '⚡', ok: function () { return S.xp >= 100; } },
    { id: 'xp1000', ic: '🌟', ok: function () { return S.xp >= 1000; } },
    { id: 'unit', ic: '🏆', ok: function () { return ORDER.some(function (c) { return D.units.some(function (u) { return S.prog[c][u.id + '-5']; }); }); } },
    { id: 'w50', ic: '📚', ok: function () { return totalLearned() >= 50; } },
    { id: 'tri', ic: '🌍', ok: function () { return ORDER.every(function (c) { return S.tri[c]; }); } },
    { id: 'early', ic: '🌅', ok: function () { return !!S.flags.early; } },
    { id: 'night', ic: '🌙', ok: function () { return !!S.flags.night; } }
  ];

  // ---------- 图标 ----------
  var IC = {
    heart: '<svg viewBox="0 0 24 24" class="ic"><path d="M12 21s-7.6-4.6-10-9.4C.4 8.3 2.4 4 6.5 4c2.3 0 3.8 1.3 5.5 3.3C13.7 5.3 15.2 4 17.5 4c4.1 0 6.1 4.3 4.5 7.6C19.6 16.4 12 21 12 21z" fill="#ff4b4b"/><path d="M6.4 7.3c-1.3.3-2.1 1.3-2.1 2.6" stroke="#fff" stroke-opacity=".7" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    flame: '<svg viewBox="0 0 24 24" class="ic"><path d="M12 1.8c1.2 3.6 6 6.1 6 11.4a6 6 0 0 1-12 0c0-2.6 1.3-4.4 2.6-5.6.2 1.7 1 2.9 2.2 3.4C10 8 11 4.4 12 1.8z" fill="currentColor"/><path d="M12 13.2c1.3 1.3 2.6 2.4 2.6 4.2a2.6 2.6 0 0 1-5.2 0c0-1.6 1.3-2.8 2.6-4.2z" fill="#ffe38a"/></svg>',
    gem: '<svg viewBox="0 0 24 24" class="ic"><path d="M6.5 3.5h11l4 5.5L12 21 2.5 9z" fill="#22b5ef"/><path d="M2.5 9h19L12 21z" fill="#1597d1"/><path d="M6.5 3.5L9 9h6l2.5-5.5z" fill="#6fd3fb"/><path d="M9 9l3 12 3-12z" fill="#2fc0f5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" class="ic"><rect x="5" y="10" width="14" height="11" rx="2.6" fill="currentColor"/><path d="M8.2 10V7.6a3.8 3.8 0 0 1 7.6 0V10" stroke="currentColor" stroke-width="2.6" fill="none"/></svg>',
    check: '<svg viewBox="0 0 24 24" class="ic"><path d="M5 12.6l4.4 4.4L19 7.4" stroke="currentColor" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" class="ic"><path d="M12 2.6l2.9 5.9 6.4.9-4.7 4.5 1.1 6.4L12 17.3l-5.7 3 1.1-6.4-4.7-4.5 6.4-.9z" fill="currentColor"/></svg>',
    chest: '<svg viewBox="0 0 24 24" class="ic"><path d="M2.5 10.5h19v8.2a2.3 2.3 0 0 1-2.3 2.3H4.8a2.3 2.3 0 0 1-2.3-2.3z" fill="#c97a2a"/><path d="M2.5 10.5A5.5 5.5 0 0 1 8 5h8a5.5 5.5 0 0 1 5.5 5.5z" fill="#e7a04d"/><rect x="2.5" y="10" width="19" height="2.4" fill="#8f5517"/><rect x="10" y="9" width="4" height="5.6" rx="1.1" fill="#ffd54a"/><path d="M7 5.4v15.6M17 5.4v15.6" stroke="#8f5517" stroke-width="1.4" opacity=".55"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" class="ic"><path d="M7 3h10v5.5a5 5 0 0 1-10 0z" fill="currentColor"/><path d="M7 5H3.6a3.6 3.6 0 0 0 4.2 4.6M17 5h3.4a3.6 3.6 0 0 1-4.2 4.6" stroke="currentColor" stroke-width="2" fill="none"/><rect x="10.6" y="13" width="2.8" height="4" fill="currentColor"/><rect x="7" y="16.6" width="10" height="4.2" rx="1.3" fill="currentColor"/></svg>',
    book: '<svg viewBox="0 0 24 24" class="ic"><path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6v16.5H5A1.5 1.5 0 0 1 3.5 18.5zM20.5 5A1.5 1.5 0 0 0 19 3.5h-6v16.5h6a1.5 1.5 0 0 0 1.5-1.5z" fill="currentColor"/></svg>',
    spk: '<svg viewBox="0 0 24 24" class="ic"><path d="M3 9.3h3.6L12 4.8v14.4l-5.4-4.5H3z" fill="currentColor"/><path d="M15.4 8.6a4.8 4.8 0 0 1 0 6.8M18.3 5.7a8.9 8.9 0 0 1 0 12.6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>',
    turtle: '<svg viewBox="0 0 24 24" class="ic"><path d="M3.5 15a7.5 6.5 0 0 1 15 0z" fill="currentColor"/><circle cx="20" cy="12.6" r="2.4" fill="currentColor"/><path d="M6 15.5v3M15.5 15.5v3" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
    x: '<svg viewBox="0 0 24 24" class="ic"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>',
    okc: '<svg viewBox="0 0 24 24" class="ic fbi"><circle cx="12" cy="12" r="11" fill="#fff"/><path d="M6.8 12.4l3.4 3.4 7-7.6" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    badc: '<svg viewBox="0 0 24 24" class="ic fbi"><circle cx="12" cy="12" r="11" fill="#fff"/><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
    home: '<svg viewBox="0 0 24 24" class="ic"><path d="M3 11.2L12 3.6l9 7.6v8.3a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 19.5z" fill="currentColor"/></svg>',
    dumb: '<svg viewBox="0 0 24 24" class="ic"><rect x="1.5" y="8.5" width="3" height="7" rx="1" fill="currentColor"/><rect x="4.6" y="5.5" width="3.6" height="13" rx="1.2" fill="currentColor"/><rect x="15.8" y="5.5" width="3.6" height="13" rx="1.2" fill="currentColor"/><rect x="19.5" y="8.5" width="3" height="7" rx="1" fill="currentColor"/><rect x="8" y="10.6" width="8" height="2.8" fill="currentColor"/></svg>',
    bag: '<svg viewBox="0 0 24 24" class="ic"><path d="M8.6 9V6.6a3.4 3.4 0 0 1 6.8 0V9" stroke="currentColor" stroke-width="2" fill="none"/><path d="M4.2 8h15.6l-1.1 12.1a1.6 1.6 0 0 1-1.6 1.4H6.9a1.6 1.6 0 0 1-1.6-1.4z" fill="currentColor"/></svg>',
    user: '<svg viewBox="0 0 24 24" class="ic"><circle cx="12" cy="8" r="4.6" fill="currentColor"/><path d="M3.4 21a8.6 8.6 0 0 1 17.2 0z" fill="currentColor"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" class="ic"><path d="M13.6 1.8L4 14h6.6l-1 8.2L20 9.6h-6.7z" fill="#ffc400"/></svg>',
    clock: '<svg viewBox="0 0 24 24" class="ic"><circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="M12 7v5.3l3.4 2" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>',
    target: '<svg viewBox="0 0 24 24" class="ic"><circle cx="12" cy="12" r="9.5" fill="currentColor"/><circle cx="12" cy="12" r="6" fill="#fff"/><circle cx="12" cy="12" r="2.8" fill="currentColor"/></svg>'
  };

  // 吉祥物“小橘”：圆圆的橘子，顶上一片叶子
  function mascot(mood, size) {
    size = size || 96;
    var ink = '#4a2a12', eyes, mouth, arms = '';
    if (mood === 'joy') {
      eyes = '<path d="M37 62q7-9 14 0M69 62q7-9 14 0" stroke="' + ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
      mouth = '<path d="M46 75q14 19 28 0z" fill="' + ink + '"/><path d="M53 83q7 4 14 0" stroke="#ff7b7b" stroke-width="4" stroke-linecap="round"/>';
      arms = '<ellipse cx="17" cy="52" rx="7" ry="12" fill="#ff9a2e" transform="rotate(-32 17 52)"/><ellipse cx="103" cy="52" rx="7" ry="12" fill="#ff9a2e" transform="rotate(32 103 52)"/>';
    } else if (mood === 'sad') {
      eyes = '<circle cx="45" cy="64" r="5.5" fill="' + ink + '"/><circle cx="75" cy="64" r="5.5" fill="' + ink + '"/><path d="M36 56l13-5M84 56l-13-5" stroke="' + ink + '" stroke-width="4" stroke-linecap="round"/>';
      mouth = '<path d="M50 86q10-9 20 0" stroke="' + ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    } else if (mood === 'wink') {
      eyes = '<circle cx="45" cy="63" r="6" fill="' + ink + '"/><circle cx="47" cy="61" r="2" fill="#fff"/><path d="M68 64q7-7 14 0" stroke="' + ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
      mouth = '<path d="M49 77q11 11 22 0" stroke="' + ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    } else {
      eyes = '<circle cx="45" cy="63" r="6" fill="' + ink + '"/><circle cx="75" cy="63" r="6" fill="' + ink + '"/><circle cx="47" cy="61" r="2" fill="#fff"/><circle cx="77" cy="61" r="2" fill="#fff"/>';
      mouth = '<path d="M50 77q10 10 20 0" stroke="' + ink + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
    }
    return '<svg class="mas" viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">' +
      '<ellipse cx="60" cy="113" rx="30" ry="5" fill="#000" opacity=".08"/>' + arms +
      '<path d="M60 27C59 19 61 13 65 9" stroke="#7a5230" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M64 17C72 5 90 5 97 12 89 23 73 25 64 17Z" fill="#4cc23a"/><path d="M67 16C77 13 86 12 93 12.5" stroke="#36992a" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="60" cy="68" r="42" fill="#ff9a2e"/>' +
      '<ellipse cx="42" cy="46" rx="12" ry="7" fill="#ffc27a" transform="rotate(-32 42 46)"/>' +
      '<circle cx="60" cy="28" r="3.5" fill="#d9780f"/>' +
      '<ellipse cx="33" cy="78" rx="7" ry="4.5" fill="#ff5f5f" opacity=".4"/><ellipse cx="87" cy="78" rx="7" ry="4.5" fill="#ff5f5f" opacity=".4"/>' +
      eyes + mouth + '</svg>';
  }

  // ---------- 工具 ----------
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dstr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return dstr(new Date()); }
  function pdate(s) { var p = s.split('-'); return new Date(+p[0], p[1] - 1, +p[2]); }
  function dayDiff(a, b) { return Math.round((pdate(b) - pdate(a)) / 864e5); }
  function addDays(s, n) { var d = pdate(s); d.setDate(d.getDate() + n); return dstr(d); }
  function mmss(sec) { return Math.floor(sec / 60) + ':' + pad(sec % 60); }

  // ---------- 存档（只存在本机 localStorage） ----------
  function fresh() {
    return {
      v: 1, ob: false, course: 'en', name: '', joined: today(),
      xp: 0, gems: 50, hearts: MAXH, heartAt: 0, goal: 20, daily: {},
      st: { n: 0, last: '', best: 0 }, freeze: 0, frozen: [], boost: 0, noL: 0,
      prog: { en: {}, de: {}, zh: {} }, cxp: { en: 0, de: 0, zh: 0 }, seen: { en: {}, de: {}, zh: {} }, mist: { en: {}, de: {}, zh: {} },
      lessons: 0, perfect: 0, ach: {}, tri: {}, flags: {},
      set: { sfx: true, tts: true, slow: false, py: true, hearts: true, kbd: false }
    };
  }
  function load() {
    var s = null, f = fresh(), k;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch (e) { s = null; }
    if (!s || typeof s !== 'object') return f;
    for (k in f) if (!(k in s)) s[k] = f[k];
    ['prog', 'cxp', 'seen', 'mist'].forEach(function (key) { ORDER.forEach(function (c) { if (s[key][c] == null) s[key][c] = f[key][c]; }); });
    for (k in f.set) if (!(k in s.set)) s.set[k] = f.set[k];
    if (!COURSES[s.course]) s.course = 'en';
    return s;
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* 存储不可用时照常运行 */ } }

  // ---------- 文字 ----------
  function C() { return COURSES[S.course]; }
  function UL() { return C().source; }
  function T(k, p) {
    var s = STR[UL()][k];
    if (s == null) s = STR.zh[k];
    if (s == null) return k;
    if (p && typeof s === 'string') for (var x in p) s = s.split('{' + x + '}').join(p[x]);
    return s;
  }
  function tx(o) { return o ? (o[UL()] || o.zh || o.en || '') : ''; }
  function heartsOn() { return !!S.set.hearts; }
  function showPy() { return C().target === 'zh' && S.set.py; }

  // ---------- 课程数据索引 ----------
  var ITEMS = {}, WORDS = [], SENTS = [], NODES = [];
  D.units.forEach(function (u, ui) {
    u.idx = ui;
    u.words.forEach(function (w) { w.u = ui; w.kind = 'w'; ITEMS[w.id] = w; WORDS.push(w); });
    u.sentences.forEach(function (s) { s.u = ui; s.kind = 's'; ITEMS[s.id] = s; SENTS.push(s); });
    u.nodes = KINDS.map(function (k, i) { return { id: u.id + '-' + i, k: k, i: i, u: u }; });
    NODES = NODES.concat(u.nodes);
  });
  function prog() { return S.prog[S.course]; }
  function curIdx() { var p = prog(); for (var i = 0; i < NODES.length; i++) if (!p[NODES[i].id]) return i; return NODES.length; }
  function nodeState(gi, ci) { return gi < ci ? 'done' : gi === ci ? 'cur' : 'lock'; }
  function poolW(u) { var a = []; for (var i = 0; i <= u.idx; i++) a = a.concat(D.units[i].words); return a; }
  function poolS(u) { var a = []; for (var i = 0; i <= u.idx; i++) a = a.concat(D.units[i].sentences); return a; }
  function learnedW(c) { c = c || S.course; return WORDS.filter(function (w) { return S.seen[c][w.id]; }); }
  function learnedS(c) { c = c || S.course; return SENTS.filter(function (s) { return S.seen[c][s.id]; }); }
  function totalLearned() { var n = 0; ORDER.forEach(function (c) { n += learnedW(c).length; }); return n; }
  function strength(id) { var x = S.seen[S.course][id]; if (!x) return -1; return Math.max(0, x.s - Math.floor((Date.now() - x.t) / (3 * 864e5))); }
  function coursePct(c) { var p = S.prog[c], n = 0; NODES.forEach(function (x) { if (p[x.id]) n++; }); return Math.round(100 * n / Math.max(1, NODES.length)); }

  // ---------- 分词与答案比对 ----------
  var PUN = /[.,!?;:"“”„«»()¡¿…。，！？；：、（）《》「」]/g;
  function rtoks(s) { return String(s || '').trim().split(/\s+/); }
  function ctok(t) { return String(t).replace(PUN, ''); }
  function disp(s, lang) { return lang === 'zh' ? String(s).replace(/ /g, '') : String(s); }
  function rawPairs(it, lang) {
    var r = rtoks(it[lang]), p = lang === 'zh' ? rtoks(it.py) : [];
    return r.map(function (x, i) { return { raw: x, t: ctok(x), p: p[i] ? ctok(p[i]) : '' }; });
  }
  // 词块上的拼音：句首的大写会泄露答案，改成小写（人名除外）
  var PNAMES = null;
  function lowerPy(p) {
    if (!p) return p;
    if (!PNAMES) {
      PNAMES = {};
      SENTS.forEach(function (s) { rtoks(s.py).forEach(function (x, i) { var c = ctok(x); if (i > 0 && c && c.charAt(0) !== c.charAt(0).toLowerCase()) PNAMES[c] = 1; }); });
    }
    return PNAMES[p] ? p : p.charAt(0).toLowerCase() + p.slice(1);
  }
  function tileList(it, lang) { return rawPairs(it, lang).filter(function (x) { return x.t; }).map(function (x) { return { t: x.t, p: lowerPy(x.p) }; }); }

  var CONTR = {
    "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are',
    "that's": 'that is', "what's": 'what is', "where's": 'where is', "who's": 'who is', "how's": 'how is', "there's": 'there is', "here's": 'here is',
    "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
    "can't": 'can not', 'cannot': 'can not', "won't": 'will not', "i'll": 'i will', "you'll": 'you will', "we'll": 'we will', "it'll": 'it will',
    "i've": 'i have', "you've": 'you have', "we've": 'we have', "let's": 'let us', "i'd": 'i would', "haven't": 'have not', "hasn't": 'has not'
  };
  function norm(s, lang) {
    s = String(s || '').toLowerCase().replace(/[’‘`´]/g, "'");
    if (lang === 'zh') return s.replace(PUN, '').replace(/[\s'"]/g, '');
    s = s.replace(PUN, ' ').replace(/\s+/g, ' ').trim();
    if (lang === 'en') s = s.split(' ').map(function (w) { return CONTR[w] || w; }).join(' ');
    if (lang === 'de') s = s.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/'s\b/g, ' es');
    return s.replace(/\s+/g, ' ').trim();
  }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  // 打字时允许个别长词拼错一个字母（冠词等短词不算拼写错误）
  function nearly(u, a) {
    var x = u.split(' '), y = a.split(' '), diff = 0;
    if (x.length !== y.length) return false;
    for (var i = 0; i < x.length; i++) {
      if (x[i] === y[i]) continue;
      if (y[i].length < 4 || lev(x[i], y[i]) > 1) return false;
      diff++;
    }
    return diff > 0 && diff <= 2;
  }
  function judge(user, it, lang, typed) {
    var u = norm(user, lang), list = [it[lang]].concat((it.alt && it.alt[lang]) || []), i;
    if (!u) return { ok: false };
    for (i = 0; i < list.length; i++) if (norm(list[i], lang) === u) return { ok: true, matched: list[i] };
    if (typed && lang !== 'zh') for (i = 0; i < list.length; i++) if (nearly(u, norm(list[i], lang))) return { ok: true, typo: true, matched: list[i] };
    return { ok: false };
  }

  // ---------- 显示 ----------
  var HINTS = {};
  function hintMap() {
    var c = C();
    if (HINTS[c.id]) return HINTS[c.id];
    var m = {};
    function add(x, mean) { x = x.toLowerCase(); if (!m[x]) m[x] = []; if (m[x].indexOf(mean) < 0) m[x].push(mean); }
    WORDS.forEach(function (w) {
      var t = w[c.target];
      add(t, w[c.source]);
      var parts = t.split(' ');
      if (c.target === 'de' && parts.length === 2 && /^(der|die|das)$/i.test(parts[0])) add(parts[1], w[c.source]);
    });
    HINTS[c.id] = m;
    return m;
  }
  function rubyTok(t, p) {
    var base = ctok(t);
    if (!base) return esc(t);
    return '<ruby>' + esc(base) + '<rt>' + esc(ctok(p || '')) + '</rt></ruby>' + esc(t.replace(base, ''));
  }
  function wlab(w, lang) {
    if (lang === 'zh' && showPy()) return '<ruby>' + esc(w.zh) + '<rt>' + esc(w.py) + '</rt></ruby>';
    return esc(w[lang]);
  }
  function hintAttr(tok, lang) {
    if (lang !== C().target) return '';
    var m = hintMap()[ctok(tok).toLowerCase()];
    return m ? ' data-act="hint" data-h="' + esc(m.join(' / ')) + '" data-w="' + esc(ctok(tok)) + '"' : '';
  }
  function sentHTML(it, lang, hints) {
    var ps = rawPairs(it, lang);
    return ps.map(function (x) {
      var h = hints ? hintAttr(x.raw, lang) : '';
      var inner = lang === 'zh' && showPy() ? rubyTok(x.raw, x.p) : esc(x.raw);
      return '<span class="tk' + (h ? ' hint' : '') + '"' + h + '>' + inner + '</span>';
    }).join(lang === 'zh' ? '' : ' ');
  }
  function flag(id) { return '<span class="flag f-' + id + '">' + COURSES[id].badge + '</span>'; }

  // ---------- 声音：朗读 + 音效 ----------
  var canSpeak = 'speechSynthesis' in window, VOICES = [];
  function loadV() { try { VOICES = canSpeak ? window.speechSynthesis.getVoices() : []; } catch (e) { VOICES = []; } }
  if (canSpeak) { loadV(); try { window.speechSynthesis.addEventListener('voiceschanged', loadV); } catch (e) { window.speechSynthesis.onvoiceschanged = loadV; } }
  var PREF = {
    en: /samantha|ava|allison|google us|aria|jenny|zira/i,
    de: /anna|helena|katja|google deutsch|petra|hedda/i,
    zh: /ting|xiaoxiao|huihui|yaoyao|google 普通|普通话|meijia/i
  };
  function voice(lang) {
    var tag = TTSL[lang].toLowerCase();
    var list = VOICES.filter(function (v) { return (v.lang || '').replace('_', '-').toLowerCase() === tag; });
    if (!list.length) list = VOICES.filter(function (v) { var l = (v.lang || '').toLowerCase(); return l.indexOf(lang) === 0 && !(lang === 'zh' && /tw|hk/.test(l)); });
    var good = list.filter(function (v) { return PREF[lang].test(v.name); });
    return good[0] || list.filter(function (v) { return v.localService; })[0] || list[0] || null;
  }
  function speak(text, lang, slow) {
    if (!canSpeak || !text) return;
    try {
      var ss = window.speechSynthesis;
      ss.cancel();
      var u = new SpeechSynthesisUtterance(lang === 'zh' ? String(text).replace(/ /g, '') : text);
      u.lang = TTSL[lang];
      var v = voice(lang);
      if (v) u.voice = v;
      u.rate = (slow ? 0.55 : 0.92) * (S.set.slow ? 0.8 : 1);
      ss.speak(u);
    } catch (e) { /* 没有语音也能继续 */ }
  }
  function sayItem(it, slow) { if (it) speak(it[C().target], C().target, slow); }
  function autoSay(it) { if (S.set.tts) sayItem(it); }

  var AC = null;
  function ac() {
    if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = null; } }
    if (AC && AC.state === 'suspended') { try { AC.resume(); } catch (e) { /* ignore */ } }
    return AC;
  }
  function tone(c, f, t0, dur, type, vol) {
    var o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function sfx(n) {
    if (!S.set.sfx) return;
    var c = ac();
    if (!c) return;
    var t = c.currentTime + 0.01;
    try {
      if (n === 'ok') { tone(c, 784, t, 0.14, 'sine', 0.22); tone(c, 1175, t + 0.09, 0.26, 'sine', 0.22); }
      else if (n === 'bad') { tone(c, 233, t, 0.16, 'square', 0.06); tone(c, 175, t + 0.14, 0.28, 'square', 0.06); }
      else if (n === 'tap') { tone(c, 660, t, 0.06, 'triangle', 0.08); }
      else if (n === 'pair') { tone(c, 988, t, 0.12, 'sine', 0.14); }
      else if (n === 'done') { [523, 659, 784, 1047].forEach(function (f, i) { tone(c, f, t + i * 0.11, 0.3, 'triangle', 0.18); }); }
      else if (n === 'combo') { [784, 988, 1319].forEach(function (f, i) { tone(c, f, t + i * 0.07, 0.18, 'sine', 0.16); }); }
    } catch (e) { /* ignore */ }
  }

  // ---------- 红心、连胜、经验 ----------
  function regenHearts() {
    if (S.hearts >= MAXH) { if (S.heartAt) { S.heartAt = 0; save(); } return false; }
    if (!S.heartAt) { S.heartAt = Date.now(); save(); return false; }
    var n = Math.floor((Date.now() - S.heartAt) / HEART_MS);
    if (n <= 0) return false;
    S.hearts = Math.min(MAXH, S.hearts + n);
    S.heartAt = S.hearts >= MAXH ? 0 : S.heartAt + n * HEART_MS;
    save();
    return true;
  }
  function minsToNext() { return Math.max(1, Math.ceil((S.heartAt + HEART_MS - Date.now()) / 60000)); }
  function loseHeart() {
    if (!LS || LS.mode !== 'lesson' || !heartsOn() || S.hearts <= 0) return;
    S.hearts--;
    if (!S.heartAt) S.heartAt = Date.now();
    save();
  }
  function streakNow() {
    if (!S.st.last) return 0;
    var d = dayDiff(S.st.last, today());
    if (d <= 1) return S.st.n;
    return d - 1 <= S.freeze ? S.st.n : 0;
  }
  function doneToday() { return S.st.last === today(); }
  function bumpStreak() {
    var t = today();
    if (S.st.last === t) return { up: false };
    var d = S.st.last ? dayDiff(S.st.last, t) : 999, froze = false;
    if (d === 1) S.st.n++;
    else if (d > 1 && d - 1 <= S.freeze) {
      for (var i = 1; i < d; i++) S.frozen.push(addDays(S.st.last, i));
      S.freeze -= d - 1; S.st.n++; froze = true;
    } else S.st.n = 1;
    S.st.last = t;
    if (S.st.n > S.st.best) S.st.best = S.st.n;
    return { up: true, froze: froze };
  }
  function todayXp() { return S.daily[today()] || 0; }
  function pruneDaily() {
    var lim = addDays(today(), -400);
    Object.keys(S.daily).forEach(function (k) { if (k < lim) delete S.daily[k]; });
    S.frozen = S.frozen.filter(function (k) { return k >= lim; });
  }
  function checkAch() {
    var got = [];
    ACH.forEach(function (a) { if (!S.ach[a.id] && a.ok()) { S.ach[a.id] = today(); got.push(a.id); } });
    if (got.length) save();
    return got;
  }
  function markSeen(it, ok) {
    if (!it) return;
    var m = S.seen[S.course], x = m[it.id] || { s: 0, t: 0 };
    x.s = ok ? Math.min(5, x.s + 1) : Math.max(0, x.s - 1);
    x.t = Date.now();
    m[it.id] = x;
  }
  function addMist(it) { if (it) { var m = S.mist[S.course]; m[it.id] = (m[it.id] || 0) + 1; } }

  // ---------- 出题 ----------
  function tl() { return C().target; }
  function sl() { return C().source; }
  function others(pool, w, n, fld) {
    var seen = {}, out = [];
    seen[String(w[fld]).toLowerCase()] = 1;
    shuffle(pool).forEach(function (x) {
      var k = String(x[fld]).toLowerCase();
      if (out.length < n && x !== w && !seen[k]) { seen[k] = 1; out.push(x); }
    });
    return out;
  }
  function withAns(e, right) { e.opts = shuffle(e.opts); e.ans = e.opts.indexOf(right); return e; }
  function exPick(w, pool) { return withAns({ t: 'pick', it: w, opts: [w].concat(others(pool, w, 3, tl())) }, w); }
  function exMC(w, pool, dir) { return withAns({ t: 'mc', dir: dir, it: w, opts: [w].concat(others(pool, w, 3, dir === 't2s' ? sl() : tl())) }, w); }
  function exHear(w, pool) { return withAns({ t: 'hear', it: w, opts: [w].concat(others(pool, w, 3, tl())) }, w); }
  function exMatch(ws) { return { t: 'match', ws: ws.slice(0, 5) }; }
  function bankFor(s, lang, spool) {
    var ans = tileList(s, lang), have = {}, extra = [];
    var n = Math.min(4, Math.max(2, Math.round(ans.length * 0.6)));
    ans.forEach(function (x) { have[x.t.toLowerCase()] = 1; });
    shuffle(spool).some(function (o) {
      if (o === s) return false;
      shuffle(tileList(o, lang)).some(function (x) {
        var k = x.t.toLowerCase();
        if (have[k]) return false;
        have[k] = 1; extra.push(x); return true;
      });
      return extra.length >= n;
    });
    return shuffle(ans.concat(extra));
  }
  function exBuild(s, dir, spool) { var al = dir === 't2s' ? sl() : tl(); return { t: 'build', dir: dir, it: s, al: al, bank: bankFor(s, al, spool) }; }
  function exListen(s, spool) { return { t: 'listen', it: s, al: tl(), bank: bankFor(s, tl(), spool) }; }
  function exFill(s, spool) {
    var lang = tl(), ps = rawPairs(s, lang), idx = [], hm = hintMap();
    ps.forEach(function (x, i) { if (x.t) idx.push(i); });
    if (idx.length < 2) return exBuild(s, 't2s', spool);
    var vocab = idx.filter(function (i) { return hm[ps[i].t.toLowerCase()]; });
    var bi = vocab.length ? rnd(vocab) : idx.slice().sort(function (a, b) { return ps[b].t.length - ps[a].t.length; })[0];
    var right = { t: ps[bi].t, p: lowerPy(ps[bi].p) }, opts = [right], used = {};
    ps.forEach(function (x) { used[x.t.toLowerCase()] = 1; });
    shuffle(spool).some(function (o) {
      if (o === s) return false;
      shuffle(tileList(o, lang)).some(function (x) {
        var k = x.t.toLowerCase();
        if (used[k] || (lang !== 'zh' && x.t.length < 2)) return false;
        used[k] = 1; opts.push(x); return true;
      });
      return opts.length >= 3;
    });
    return withAns({ t: 'fill', it: s, bi: bi, opts: opts }, right);
  }
  function mkS(s, type, ps) {
    if (type === 'listen') return exListen(s, ps);
    if (type === 'fill') return exFill(s, ps);
    return exBuild(s, type, ps);
  }
  function genNode(n) {
    var u = n.u, W = u.words, Ss = u.sentences, pw = poolW(u), ps = poolS(u), ex = [];
    if (n.k === 'w1' || n.k === 'w2') {
      var ws = n.k === 'w1' ? W.slice(0, 5) : W.slice(5, 10);
      if (ws.length < 2) ws = W.slice(0, 5);
      ws.forEach(function (w, i) {
        ex.push(exPick(w, W));
        if (i > 0) { var r = ws[i - 1]; ex.push(rnd([exMC(r, W, 't2s'), exMC(r, W, 's2t'), exHear(r, W)])); }
      });
      ex.push(exMatch(shuffle(ws)));
      if (n.k === 'w2') shuffle(Ss.slice(0, 5)).slice(0, 2).forEach(function (s) { ex.push(exBuild(s, 't2s', ps)); });
      return applyNoListen(ex);
    }
    if (n.k === 's1' || n.k === 's2') {
      var half = Math.ceil(Ss.length / 2), ss = n.k === 's1' ? Ss.slice(0, half) : Ss.slice(half);
      var types = n.k === 's1' ? ['t2s', 'fill', 's2t', 'listen', 't2s', 's2t'] : ['listen', 's2t', 'fill', 't2s', 'listen', 's2t'];
      ss.forEach(function (s, i) { ex.push(mkS(s, types[i % types.length], ps)); });
      var wk = shuffle(W), other = n.k === 's1' ? Ss.slice(half) : Ss.slice(0, half);
      ex.push(exMatch(wk.slice(0, 5)), exMC(wk[5] || wk[0], pw, 's2t'), exHear(wk[6] || wk[1], W), exMC(wk[7] || wk[2], pw, 't2s'));
      if (other.length) ex.push(exBuild(rnd(other), 't2s', ps));
      return applyNoListen(shuffle(ex));
    }
    var tt = ['s2t', 't2s', 'listen', 's2t', 'fill', 'listen', 's2t', 't2s'], wx = shuffle(W);
    shuffle(Ss).slice(0, 8).forEach(function (s, i) { ex.push(mkS(s, tt[i], ps)); });
    ex.push(exMatch(wx.slice(0, 5)), exMC(wx[5] || wx[0], pw, 's2t'), exHear(wx[6] || wx[1], W), exMC(wx[7] || wx[2], pw, 't2s'));
    return applyNoListen(shuffle(ex));
  }
  function genPractice(m) {
    var LW = learnedW(), LSn = learnedS(), ex = [];
    var pw = LW.length >= 4 ? LW : WORDS.slice(0, 10), ps = LSn.length >= 4 ? LSn : SENTS.slice(0, 10);
    if (m === 'mist') {
      var mm = S.mist[S.course];
      Object.keys(mm).filter(function (id) { return ITEMS[id]; }).sort(function (a, b) { return mm[b] - mm[a]; }).slice(0, 10).forEach(function (id) {
        var it = ITEMS[id];
        ex.push(it.kind === 'w' ? rnd([exMC(it, pw, 's2t'), exMC(it, pw, 't2s'), exPick(it, pw)]) : mkS(it, rnd(['t2s', 's2t', 'fill']), ps));
      });
      // 错题不多时，用最薄弱的单词补足一组
      if (ex.length && ex.length < 6) LW.slice().sort(function (a, b) { return strength(a.id) - strength(b.id); }).filter(function (w) { return !mm[w.id]; }).slice(0, 6 - ex.length).forEach(function (w) { ex.push(exMC(w, pw, rnd(['t2s', 's2t']))); });
    } else if (m === 'words') {
      var ws = LW.slice().sort(function (a, b) { return strength(a.id) - strength(b.id) || Math.random() - 0.5; }).slice(0, 8);
      if (ws.length < 4) return [];
      ws.forEach(function (w, i) { ex.push([exPick(w, pw), exMC(w, pw, 't2s'), exMC(w, pw, 's2t'), exHear(w, pw)][i % 4]); });
      ex.push(exMatch(shuffle(ws).slice(0, 5)));
    } else {
      var ss = shuffle(LSn).slice(0, 6);
      if (ss.length < 3) return [];
      ss.forEach(function (s) { ex.push(exListen(s, ps)); });
      shuffle(LW).slice(0, 3).forEach(function (w) { ex.push(exHear(w, pw)); });
    }
    return applyNoListen(shuffle(ex));
  }
  // “现在不方便听”：15分钟内把听力题换成看字题
  function deListen(e) {
    if (e.t === 'listen') return exBuild(e.it, 't2s', poolS(D.units[e.it.u]));
    if (e.t === 'hear') return exMC(e.it, D.units[e.it.u].words, 't2s');
    return e;
  }
  function applyNoListen(q) { return (!canSpeak || S.noL > Date.now()) ? q.map(deListen) : q; }
  function regen(ex) {
    var e = {}, k;
    for (k in ex) e[k] = ex[k];
    if (ex.opts) withAns(e, ex.opts[ex.ans]);
    if (ex.bank) e.bank = shuffle(ex.bank);
    return e;
  }

  // ---------- 课程进行中 ----------
  var LS = null;
  function startNode(n) {
    if (n.k === 'chest') return openChest(n);
    regenHearts();
    if (heartsOn() && S.hearts <= 0) return noHearts();
    run(genNode(n), { node: n, mode: 'lesson', replay: !!prog()[n.id] });
  }
  function startPractice(m) {
    var q = genPractice(m);
    if (q.length < 3) return toast(T('needLearn'));
    run(q, { mode: 'practice', pm: m });
  }
  function run(q, o) {
    ac();
    LS = { q: q, done: 0, mis: 0, combo: 0, best: 0, right: 0, answered: 0, t0: Date.now(), node: o.node || null, mode: o.mode, pm: o.pm || '', replay: !!o.replay, fb: null };
    var el = $('#lesson');
    el.innerHTML = '<div class="lwrap"><div class="lhead"><button class="lx" data-act="quit" aria-label="close">' + IC.x + '</button><div class="lprog"><i id="lpb"></i></div><div class="lhearts" id="lh"></div></div><div class="lbody" id="lb"></div><div class="lfoot" id="lf"></div></div>';
    el.hidden = false;
    document.body.classList.add('inlesson');
    closePop();
    renderEx();
  }
  function updateHead() {
    var pct = Math.round(100 * LS.done / Math.max(1, LS.done + LS.q.length));
    $('#lpb').style.width = Math.max(pct, 3) + '%';
    $('#lh').innerHTML = LS.mode === 'lesson' ? IC.heart + '<b>' + (heartsOn() ? S.hearts : '∞') + '</b>' : '';
  }
  function renderEx() {
    var ex = LS.q[0];
    LS.sel = -1; LS.picked = []; LS.typed = ''; LS.fb = null;
    if (ex.t === 'match') { LS.mL = null; LS.mR = null; LS.mDone = 0; LS.mOrdL = shuffle(ex.ws); LS.mOrdR = shuffle(ex.ws); }
    updateHead();
    var lb = $('#lb');
    lb.className = 'lbody';
    lb.innerHTML = body(ex);
    lb.scrollTop = 0;
    renderFoot(ex);
    if (ex.t === 'build' || ex.t === 'listen') renderAns();
    if (S.set.tts && (ex.t === 'hear' || ex.t === 'listen' || (ex.t === 'mc' && ex.dir === 't2s') || (ex.t === 'build' && ex.dir === 't2s'))) setTimeout(function () { sayItem(ex.it); }, 150);
  }
  function renderFoot(ex) {
    var lf = $('#lf'), aside;
    lf.className = 'lfoot';
    if (ex.t === 'match') { lf.innerHTML = '<div class="lfin"><span></span><button class="btn pri" disabled>' + T('check') + '</button></div>'; return; }
    aside = (ex.t === 'listen' || ex.t === 'hear') ? '<button class="btn ghost" data-act="nolisten">' + T('cantListen') + '</button>' : '<button class="btn ghost" data-act="skip">' + T('skip') + '</button>';
    lf.innerHTML = '<div class="lfin">' + aside + '<button class="btn pri" id="chk" data-act="check" disabled>' + T('check') + '</button></div>';
  }
  function say(inner) { return '<div class="say">' + mascot('happy', 74) + '<div class="bub">' + inner + '</div></div>'; }
  function spkBtn(it) { return '<button class="spk" data-act="say" data-id="' + it.id + '" aria-label="play">' + IC.spk + '</button>'; }
  function listenBtns() { return '<div class="lbtns"><button class="spk big" data-act="play" aria-label="play">' + IC.spk + '</button><button class="spk slow" data-act="play" data-slow="1" aria-label="slow">' + IC.turtle + '</button></div>'; }
  function optList(list) { return '<div class="opts">' + list.map(function (h, i) { return '<button class="opt" data-act="opt" data-i="' + i + '"><span class="kn">' + (i + 1) + '</span><span class="ot">' + h + '</span></button>'; }).join('') + '</div>'; }
  function tileInner(x) { return (x.p && showPy() ? '<small>' + esc(x.p) + '</small>' : '') + '<span>' + esc(x.t) + '</span>'; }
  function isNew(it) { return !S.seen[S.course][it.id]; }
  function body(ex) {
    var t = tl(), s = sl(), it = ex.it;
    switch (ex.t) {
      case 'pick':
        return (isNew(it) ? '<span class="newb">' + T('newWord') + '</span>' : '') + '<h2 class="q">' + esc(T('qPick', { w: it[s] })) + '</h2><div class="cards">' +
          ex.opts.map(function (w, i) { return '<button class="card" data-act="opt" data-i="' + i + '"><span class="kn">' + (i + 1) + '</span><span class="em">' + w.emoji + '</span><span class="lb">' + wlab(w, t) + '</span></button>'; }).join('') + '</div>';
      case 'mc':
        if (ex.dir === 't2s') return '<h2 class="q">' + T('qMean') + '</h2>' + say(spkBtn(it) + '<span class="big">' + wlab(it, t) + '</span>') + optList(ex.opts.map(function (w) { return esc(w[s]); }));
        return '<h2 class="q">' + esc(T('qSay', { w: it[s] })) + '</h2>' + optList(ex.opts.map(function (w) { return wlab(w, t); }));
      case 'hear':
        return '<h2 class="q">' + T('qHear') + '</h2>' + listenBtns() + optList(ex.opts.map(function (w) { return wlab(w, t); }));
      case 'match':
        return '<h2 class="q">' + T('qMatch') + '</h2><div class="match"><div class="mcol">' +
          LS.mOrdL.map(function (w, i) { return '<button class="tile m" data-act="m" data-side="L" data-id="' + w.id + '"><span class="kn">' + (i + 1) + '</span>' + wlab(w, t) + '</button>'; }).join('') +
          '</div><div class="mcol">' +
          LS.mOrdR.map(function (w, i) { return '<button class="tile m" data-act="m" data-side="R" data-id="' + w.id + '"><span class="kn">' + ((i + 6) % 10) + '</span>' + esc(w[s]) + '</button>'; }).join('') + '</div></div>';
      case 'build':
        var from = ex.dir === 't2s' ? t : s;
        return '<h2 class="q">' + T('qBuild') + '</h2>' + say((from === t ? spkBtn(it) : '') + '<span class="sent">' + sentHTML(it, from, from === t) + '</span>') + answerArea(ex);
      case 'listen':
        return '<h2 class="q">' + T('qListen') + '</h2>' + listenBtns() + answerArea(ex);
      case 'fill':
        var ps = rawPairs(it, t), fs = ps.map(function (x, i) {
          if (i === ex.bi) return '<span class="blank" id="blank">' + esc(x.raw.replace(x.t, '')) + '</span>';
          return '<span class="tk">' + (t === 'zh' && showPy() ? rubyTok(x.raw, x.p) : esc(x.raw)) + '</span>';
        }).join(t === 'zh' ? '' : ' ');
        return '<h2 class="q">' + T('qFill') + '</h2><div class="fillbox"><div class="fs">' + fs + '</div><div class="fsub">' + esc(disp(it[s], s)) + '</div></div><div class="chips">' +
          ex.opts.map(function (x, i) { return '<button class="tile" data-act="opt" data-i="' + i + '">' + tileInner(x) + '</button>'; }).join('') + '</div>';
    }
    return '';
  }
  function answerArea(ex) {
    var tog = '<button class="kbt" data-act="kbd">' + (S.set.kbd ? T('useTiles') : T('useKbd')) + '</button>';
    if (S.set.kbd) return '<textarea id="ta" class="ta" lang="' + TTSL[ex.al] + '" placeholder="' + esc(T('typeIn', { l: T('ln_' + ex.al) })) + '" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" rows="3"></textarea>' + tog;
    return '<div class="ans" id="ans"></div><div class="bank" id="bank">' + ex.bank.map(function (x, i) {
      return '<span class="slot" id="sl' + i + '"><button class="tile" data-act="tile" data-i="' + i + '">' + tileInner(x) + '</button></span>';
    }).join('') + '</div>' + tog;
  }
  function renderAns() {
    var ex = LS.q[0], a = $('#ans');
    if (!a) return;
    a.innerHTML = LS.picked.map(function (i) { return '<button class="tile" data-act="untile" data-i="' + i + '">' + tileInner(ex.bank[i]) + '</button>'; }).join('');
    ex.bank.forEach(function (x, i) { var sl = $('#sl' + i); if (sl) sl.classList.toggle('used', LS.picked.indexOf(i) >= 0); });
  }
  function updateCheck() {
    var b = $('#chk');
    if (!b || LS.fb) return;
    var ex = LS.q[0], ok;
    if (ex.t === 'build' || ex.t === 'listen') ok = S.set.kbd ? !!LS.typed.trim() : LS.picked.length > 0;
    else ok = LS.sel >= 0;
    b.disabled = !ok;
  }
  function chooseOpt(i) {
    var ex = LS.q[0];
    if (LS.fb || !ex.opts) return;
    LS.sel = i;
    $$('#lb [data-act=opt]').forEach(function (b) { b.classList.toggle('sel', +b.getAttribute('data-i') === i); });
    var o = ex.opts[i];
    if (ex.t === 'fill') { var bl = $('#blank'); if (bl) { var tail = rawPairs(ex.it, tl())[ex.bi]; bl.innerHTML = '<b>' + esc(o.t) + '</b>' + esc(tail.raw.replace(tail.t, '')); bl.classList.add('filled'); } }
    if (S.set.tts && (ex.t === 'pick' || ex.t === 'hear' || (ex.t === 'mc' && ex.dir === 's2t'))) sayItem(o);
    else if (S.set.tts && ex.t === 'fill') speak(o.t, tl());
    else sfx('tap');
    updateCheck();
  }
  function pickTile(i) {
    var ex = LS.q[0];
    if (LS.fb || LS.picked.indexOf(i) >= 0) return;
    LS.picked.push(i);
    renderAns();
    if (S.set.tts && ex.al === tl()) speak(ex.bank[i].t, tl()); else sfx('tap');
    updateCheck();
  }
  function unpickTile(i) {
    if (LS.fb) return;
    var k = LS.picked.indexOf(i);
    if (k < 0) return;
    LS.picked.splice(k, 1);
    renderAns(); sfx('tap'); updateCheck();
  }
  function matchTap(el) {
    if (LS.fb || el.classList.contains('gone')) return;
    var side = el.getAttribute('data-side'), id = el.getAttribute('data-id');
    $$('#lb .m[data-side=' + side + ']').forEach(function (b) { b.classList.toggle('sel', b === el); });
    if (side === 'L') { LS.mL = id; if (S.set.tts) sayItem(ITEMS[id]); } else { LS.mR = id; sfx('tap'); }
    if (!LS.mL || !LS.mR) return;
    var l = $('#lb .m[data-side=L][data-id="' + LS.mL + '"]'), r = $('#lb .m[data-side=R][data-id="' + LS.mR + '"]');
    if (LS.mL === LS.mR) {
      [l, r].forEach(function (b) { b.classList.remove('sel'); b.classList.add('good'); setTimeout(function () { b.classList.remove('good'); b.classList.add('gone'); }, 350); });
      markSeen(ITEMS[LS.mL], true);
      LS.mDone++;
      sfx('pair');
      if (LS.mDone >= LS.q[0].ws.length) setTimeout(function () { if (LS && LS.q[0].t === 'match') finishEx(LS.q[0], { ok: true }); }, 380);
    } else {
      [l, r].forEach(function (b) { b.classList.remove('sel'); b.classList.add('badm'); setTimeout(function () { b.classList.remove('badm'); }, 450); });
      sfx('bad');
    }
    LS.mL = null; LS.mR = null;
  }
  function check() {
    if (!LS) return;
    if (LS.fb) return next();
    var ex = LS.q[0], r;
    if (ex.t === 'build' || ex.t === 'listen') {
      var user = S.set.kbd ? LS.typed : LS.picked.map(function (i) { return ex.bank[i].t; }).join(' ');
      r = judge(user, ex.it, ex.al, S.set.kbd);
    } else r = { ok: LS.sel === ex.ans };
    finishEx(ex, r);
  }
  function finishEx(ex, r) {
    if (!LS || LS.fb) return;
    LS.answered++;
    if (r.ok) {
      LS.done++; LS.right++; LS.combo++;
      if (LS.combo > LS.best) LS.best = LS.combo;
      if (ex.it) markSeen(ex.it, true);
      if (ex.it && LS.pm === 'mist') delete S.mist[S.course][ex.it.id];
      sfx(LS.combo >= 5 && LS.combo % 5 === 0 ? 'combo' : 'ok');
    } else {
      LS.combo = 0; LS.mis++;
      markSeen(ex.it, false); addMist(ex.it); loseHeart();
      LS.q.push(regen(ex));
      sfx('bad');
    }
    save();
    LS.fb = { ok: r.ok };
    showFeedback(ex, r);
    updateHead();
    if (r.ok && S.set.tts && ((ex.t === 'build' && ex.dir === 's2t') || ex.t === 'fill')) setTimeout(function () { sayItem(ex.it); }, 250);
  }
  function answerHTML(ex) {
    var t = tl(), s = sl(), it = ex.it;
    if (ex.t === 'mc' && ex.dir === 't2s') return esc(it[s]);
    if (ex.t === 'pick' || ex.t === 'mc' || ex.t === 'hear') return wlab(it, t) + ' <span class="fbm">' + esc(it[s]) + '</span>';
    if (ex.t === 'fill' || ex.t === 'listen' || (ex.t === 'build' && ex.dir === 's2t')) return sentHTML(it, t, false) + '<div class="fbm">' + esc(disp(it[s], s)) + '</div>';
    return esc(disp(it[ex.al], ex.al));
  }
  function showFeedback(ex, r) {
    var lb = $('#lb'), lf = $('#lf'), h;
    lb.classList.add('locked');
    if (ex.opts && LS.sel >= 0) {
      var sb = $('#lb [data-act=opt][data-i="' + LS.sel + '"]');
      if (sb) sb.classList.add(r.ok ? 'right' : 'wrong');
    }
    var ta = $('#ta');
    if (ta) ta.readOnly = true;
    if (r.ok) {
      var title = LS.combo >= 5 && LS.combo % 5 === 0 ? T('combo', { n: LS.combo }) : rnd(T('praise')), det = '';
      if (r.typo) det = '<div class="fbd">' + T('typo') + ' ' + esc(disp(r.matched, ex.al)) + '</div>';
      else if (ex.t === 'listen') det = '<div class="fbd">' + T('meaning') + ' ' + esc(disp(ex.it[sl()], sl())) + '</div>';
      h = '<div class="fb">' + IC.okc + '<div class="fbx"><div class="fbt">' + esc(title) + '</div>' + det + '</div></div>';
    } else {
      h = '<div class="fb">' + IC.badc + '<div class="fbx"><div class="fbt">' + T('wrongT') + '</div><div class="fbd">' + answerHTML(ex) + '</div></div></div>';
    }
    lf.className = 'lfoot ' + (r.ok ? 'ok' : 'bad');
    lf.innerHTML = h + '<button class="btn ' + (r.ok ? 'okb' : 'badb') + '" data-act="check">' + T('cont') + '</button>';
  }
  function next() {
    LS.q.shift();
    if (LS.mode === 'lesson' && heartsOn() && S.hearts <= 0 && LS.q.length) return noHearts();
    if (!LS.q.length) return complete();
    renderEx();
  }
  function closeLesson() {
    LS = null;
    try { if (canSpeak) window.speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    $('#lesson').hidden = true;
    $('#lesson').innerHTML = '';
    document.body.classList.remove('inlesson');
  }
  function complete() {
    var L = LS, secs = Math.round((Date.now() - L.t0) / 1000), perfect = L.mis === 0;
    var isTest = L.node && L.node.k === 'test';
    var xp = L.mode === 'practice' ? 10 : L.replay ? 5 : isTest ? 20 : 10;
    if (perfect && L.mode === 'lesson' && !L.replay) xp += 5;
    var boosted = S.boost > Date.now();
    if (boosted) xp *= 2;
    var gems = L.mode === 'lesson' ? (L.replay ? 2 : (isTest ? 15 : 5) + (perfect ? 5 : 0)) : 0;
    var t = today(), before = todayXp(), heart = false;
    S.xp += xp; S.cxp[S.course] += xp; S.daily[t] = before + xp; S.gems += gems; S.lessons++;
    if (perfect) S.perfect++;
    if (L.node) prog()[L.node.id] = (prog()[L.node.id] || 0) + 1;
    if (L.mode === 'practice' && heartsOn() && S.hearts < MAXH) { S.hearts++; heart = true; if (S.hearts >= MAXH) S.heartAt = 0; }
    S.tri[S.course] = 1;
    var hr = new Date().getHours();
    if (hr < 7 && hr >= 4) S.flags.early = 1;
    if (hr >= 23 || hr < 4) S.flags.night = 1;
    var sk = bumpStreak();
    pruneDaily();
    save();
    var ach = checkAch();
    closeLesson();
    showResult({
      xp: xp, gems: gems, heart: heart, secs: secs, perfect: perfect, boosted: boosted, mode: L.mode,
      acc: Math.round(100 * L.right / Math.max(1, L.answered)), streakUp: sk.up, froze: sk.froze,
      goalHit: before < S.goal && S.daily[t] >= S.goal, ach: ach
    });
  }

  // ---------- 全屏页：结果、连胜、红心、引导 ----------
  var RES = null;
  function showScreen(h) { var s = $('#screen'); s.innerHTML = '<div class="scr">' + h + '</div>'; s.hidden = false; s.scrollTop = 0; }
  function hideScreen() { var s = $('#screen'); s.hidden = true; s.innerHTML = ''; }
  function confetti() {
    var cols = ['#ff9a2e', '#58c832', '#2ea6f5', '#ff75aa', '#ffc400', '#a86df0'], h = '';
    for (var i = 0; i < 70; i++) {
      h += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;background:' + rnd(cols) + ';animation-delay:' + (Math.random() * 0.7).toFixed(2) + 's;animation-duration:' + (2 + Math.random() * 1.6).toFixed(2) + 's;width:' + (6 + Math.random() * 6 | 0) + 'px;height:' + (8 + Math.random() * 8 | 0) + 'px"></i>';
    }
    return '<div class="confetti">' + h + '</div>';
  }
  function statCard(cls, label, ic, val) { return '<div class="rs ' + cls + '"><div class="rsl">' + label + '</div><div class="rsv">' + ic + '<b>' + val + '</b></div></div>'; }
  function showResult(r) {
    RES = r;
    sfx('done');
    var title = r.mode === 'practice' ? T('practiceDone') : r.perfect ? T('perfect') : T('done');
    var extra = [];
    if (r.gems) extra.push('<span class="pill gem">' + IC.gem + T('gemsGot', { n: r.gems }) + '</span>');
    if (r.heart) extra.push('<span class="pill hrt">' + IC.heart + T('heartGot') + '</span>');
    if (r.boosted) extra.push('<span class="pill xp">' + IC.bolt + '×2</span>');
    showScreen(confetti() + '<div class="res">' + mascot('joy', 170) + '<h1 class="rt">' + title + '</h1><div class="rstats">' +
      statCard('xp', T('xpGot'), IC.bolt, '+' + r.xp) + statCard('acc', T('acc'), IC.target, r.acc + '%') + statCard('tm', T('time'), IC.clock, mmss(r.secs)) +
      '</div>' + (extra.length ? '<div class="pills">' + extra.join('') + '</div>' : '') + '</div><div class="sfoot"><button class="btn pri wide" data-act="resNext">' + T('cont') + '</button></div>');
  }
  function weekRow() {
    var wd = T('wd'), h = '';
    for (var i = 6; i >= 0; i--) {
      var d = addDays(today(), -i), on = (S.daily[d] || 0) > 0, fz = S.frozen.indexOf(d) >= 0;
      h += '<div class="wdc' + (on ? ' on' : fz ? ' fz' : '') + (i === 0 ? ' td' : '') + '"><span>' + wd[pdate(d).getDay()] + '</span><i>' + (on ? IC.check : fz ? '❄' : '') + '</i></div>';
    }
    return '<div class="wrow">' + h + '</div>';
  }
  function goalBar() {
    var x = todayXp(), pct = Math.min(100, Math.round(100 * x / S.goal));
    return '<div class="goalc">' + IC.bolt + '<div class="gcx"><b>' + T('goal') + '</b><div class="bar"><i style="width:' + pct + '%"></i></div></div><span>' + T('goalOf', { a: Math.min(x, S.goal), b: S.goal }) + '</span></div>';
  }
  function resNext() {
    if (RES && RES.streakUp && !RES.shownStreak) {
      RES.shownStreak = true;
      var n = streakNow();
      showScreen('<div class="res">' + '<div class="bigflame">' + IC.flame + '<b>' + n + '</b></div><h1 class="rt fire">' + T('streakT', { n: n }) + '</h1>' + weekRow() +
        '<p class="rsub">' + (RES.froze ? T('freezeUsed') : T('streakSub')) + '</p>' + (RES.goalHit ? '<p class="goalhit">🎉 ' + T('goalDone') + '</p>' : '') + goalBar() +
        '</div><div class="sfoot"><button class="btn pri wide" data-act="resNext">' + T('cont') + '</button></div>');
      sfx('combo');
      return;
    }
    var a = RES ? RES.ach : [];
    RES = null;
    hideScreen();
    renderAll();
    scrollToCur(true);
    a.forEach(function (id, i) { setTimeout(function () { toast('🏅 ' + T('achGot', { n: T('a_' + id) })); }, 500 + i * 2400); });
  }
  function noHearts() {
    var canBuy = S.gems >= REFILL;
    showScreen('<div class="res">' + mascot('sad', 150) + '<h1 class="rt">' + T('noHeartsT') + '</h1><div class="hrow">' + heartRow() + '</div><p class="rsub">' + T('noHeartsSub') + (S.heartAt ? ' ' + T('nextHeart', { m: minsToNext() }) : '') + '</p></div>' +
      '<div class="sfoot col"><button class="btn blue wide" data-act="refill"' + (canBuy ? '' : ' disabled') + '>' + T('refill') + ' · ' + IC.gem + REFILL + '</button>' +
      '<button class="btn pri wide" data-act="earn">' + T('earn') + '</button><button class="btn ghost wide" data-act="nhQuit">' + T('noThanks') + '</button></div>');
  }
  function heartRow() { var h = ''; for (var i = 0; i < MAXH; i++) h += '<span class="' + (i < S.hearts ? '' : 'off') + '">' + IC.heart + '</span>'; return h; }
  function openChest(n) {
    var g = 15 + Math.floor(Math.random() * 16);
    S.gems += g;
    prog()[n.id] = 1;
    save();
    sfx('done');
    showScreen(confetti() + '<div class="res"><div class="chestbig">' + IC.chest + '</div><h1 class="rt">' + T('chestGot', { n: g }) + '</h1><div class="pills"><span class="pill gem">' + IC.gem + '+' + g + '</span></div></div><div class="sfoot"><button class="btn pri wide" data-act="resNext">' + T('cont') + '</button></div>');
    RES = { ach: checkAch() };
  }
  function onboard(step) {
    var h;
    if (step === 0) {
      h = '<div class="res ob0">' + mascot('wink', 180) + '<h1 class="brand">多语</h1><p class="rsub">每天几分钟，轻松学语言。<br>A few minutes a day to learn a language.</p></div><div class="sfoot"><button class="btn pri wide" data-act="ob" data-s="1">开始 · GET STARTED</button></div>';
    } else if (step === 1) {
      h = '<div class="obh">' + mascot('happy', 70) + '<div class="bub">你想学什么？<small>What would you like to learn?</small></div></div><div class="clist">' + ORDER.map(function (id) {
        var c = COURSES[id];
        return '<button class="crow big" data-act="obCourse" data-c="' + id + '">' + flag(id) + '<div class="ci"><b>' + c.name.zh + ' · ' + c.name.en + '</b><small>' + c.sub[c.source] + '</small></div><span class="chev">›</span></button>';
      }).join('') + '</div>';
    } else {
      h = '<div class="obh">' + mascot('happy', 70) + '<div class="bub">' + T('chooseGoal') + '</div></div><div class="glist">' + GOALS.map(function (g, i) {
        return '<button class="grow' + (S.goal === g ? ' on' : '') + '" data-act="obGoal" data-g="' + g + '"><b>' + T('goalNames')[i] + '</b><span>' + T('xpDay', { n: g }) + '</span></button>';
      }).join('') + '</div><div class="sfoot"><button class="btn pri wide" data-act="obDone">' + T('letsGo') + '</button></div>';
    }
    showScreen(h);
  }

  // ---------- 底部弹层 ----------
  function openSheet(h, cls) {
    var s = $('#sheet');
    s.innerHTML = '<div class="sb" data-act="closeSheet"></div><div class="sp ' + (cls || '') + '"><div class="grab"></div>' + h + '</div>';
    s.hidden = false;
  }
  function closeSheet() { var s = $('#sheet'); s.hidden = true; s.innerHTML = ''; }
  function confirmSheet(title, sub, yesAct, yesLabel, noLabel, danger) {
    openSheet('<div class="cfm">' + mascot('sad', 90) + '<h3>' + title + '</h3><p>' + sub + '</p><button class="btn ' + (danger ? 'danger' : 'pri') + ' wide" data-act="' + yesAct + '">' + yesLabel + '</button><button class="btn ghost wide" data-act="closeSheet">' + noLabel + '</button></div>');
  }
  function courseRow(id, act) {
    var c = COURSES[id], on = id === S.course, ul = UL();
    return '<button class="crow' + (on ? ' on' : '') + '" data-act="' + act + '" data-c="' + id + '">' + flag(id) + '<div class="ci"><b>' + c.name[ul] + '</b><small>' + c.sub[ul] + '</small><div class="bar"><i style="width:' + coursePct(id) + '%"></i></div></div>' + (on ? '<span class="tag">' + T('current') + '</span>' : '<span class="chev">›</span>') + '</button>';
  }
  function courseSheet() { openSheet('<h3 class="sh">' + T('courses') + '</h3><div class="clist">' + ORDER.map(function (id) { return courseRow(id, 'setCourse'); }).join('') + '</div>'); }
  function heartSheet() {
    regenHearts();
    var h = '<h3 class="sh">' + T('hearts') + '</h3><div class="hrow">' + heartRow() + '</div>';
    if (!heartsOn()) h += '<p class="shp">' + T('heartsOff') + '</p>';
    else if (S.hearts >= MAXH) h += '<p class="shp">' + T('heartsFull') + '</p>';
    else h += '<p class="shp">' + T('nextHeart', { m: minsToNext() }) + '</p><button class="btn blue wide" data-act="buy" data-item="refill"' + (S.gems >= REFILL ? '' : ' disabled') + '>' + T('refill') + ' · ' + IC.gem + REFILL + '</button><button class="btn ghost wide" data-act="earn">' + T('earn') + '</button>';
    openSheet(h);
  }
  function streakSheet() {
    var n = streakNow();
    openSheet('<div class="sth' + (doneToday() ? ' on' : '') + '">' + IC.flame + '<b>' + n + '</b></div><h3 class="sh c">' + T('streakT', { n: n }) + '</h3>' + weekRow() + goalBar() + '<p class="shp c">' + T('freezes', { n: S.freeze }) + ' · ' + T('st_best', { n: S.st.best }) + '</p>');
  }
  function guideSheet(ui) {
    var u = D.units[ui], c = C(), col = UCOL[u.color] || UCOL.orange;
    var h = '<div class="gh" style="--c:' + col[0] + ';--d:' + col[1] + '"><small>' + T('unitN', { n: ui + 1 }) + '</small><b>' + u.icon + ' ' + esc(tx(u.title)) + '</b><span>' + esc(tx(u.desc)) + '</span></div>';
    if (u.tips && u.tips[c.target]) h += '<div class="tip"><b>💡 ' + T('tip') + '</b><p>' + esc(u.tips[c.target]) + '</p></div>';
    h += '<h4 class="gs">' + T('keyWords') + '</h4>' + u.words.map(function (w) {
      return '<div class="vrow"><span class="em">' + w.emoji + '</span><div class="vt"><b>' + wlab(w, c.target) + '</b><small>' + esc(w[c.source]) + '</small></div><button class="spk sm" data-act="say" data-id="' + w.id + '">' + IC.spk + '</button></div>';
    }).join('');
    h += '<h4 class="gs">' + T('keyPhrases') + '</h4>' + u.sentences.map(function (s) {
      return '<div class="vrow"><div class="vt"><b>' + sentHTML(s, c.target, false) + '</b><small>' + esc(disp(s[c.source], c.source)) + '</small></div><button class="spk sm" data-act="say" data-id="' + s.id + '">' + IC.spk + '</button></div>';
    }).join('');
    openSheet(h, 'tall');
  }

  // ---------- 主界面 ----------
  var TAB = 'learn';
  function renderAll() { renderTop(); renderTabs(); renderView(); }
  function renderTop() {
    regenHearts();
    document.documentElement.lang = UL() === 'zh' ? 'zh-CN' : 'en';
    $('#top').innerHTML = '<button class="tb" data-act="courses" aria-label="course">' + flag(S.course) + '</button>' +
      '<button class="tb fire' + (doneToday() ? ' on' : '') + '" data-act="streak">' + IC.flame + '<b>' + streakNow() + '</b></button>' +
      '<button class="tb gem" data-act="tab" data-tab="shop">' + IC.gem + '<b>' + S.gems + '</b></button>' +
      '<button class="tb hrt" data-act="hearts">' + IC.heart + '<b>' + (heartsOn() ? S.hearts : '∞') + '</b></button>';
    requestAnimationFrame(function () { document.documentElement.style.setProperty('--toph', $('#top').offsetHeight + 'px'); });
  }
  function renderTabs() {
    $('#tabs').innerHTML = [['learn', IC.home], ['practice', IC.dumb], ['shop', IC.bag], ['me', IC.user]].map(function (t) {
      return '<button class="' + (TAB === t[0] ? 'on' : '') + '" data-act="tab" data-tab="' + t[0] + '">' + t[1] + '<span>' + T('t_' + t[0]) + '</span></button>';
    }).join('');
  }
  function renderView() {
    ['learn', 'practice', 'shop', 'me'].forEach(function (v) { $('#v-' + v).classList.toggle('on', v === TAB); });
    if (TAB === 'learn') renderLearn(); else if (TAB === 'practice') renderPractice(); else if (TAB === 'shop') renderShop(); else renderMe();
  }
  function nodeIcon(n, st) {
    if (n.k === 'chest') return IC.chest;
    if (n.k === 'test') return IC.trophy;
    if (st === 'lock') return IC.lock;
    if (st === 'done') return IC.check;
    return IC.star;
  }
  function renderLearn() {
    var ci = curIdx(), h = '';
    D.units.forEach(function (u, ui) {
      var col = UCOL[u.color] || UCOL.orange, sign = ui % 2 ? -1 : 1, base = NODES.indexOf(u.nodes[0]);
      h += '<section class="unit' + (base > ci ? ' future' : '') + '" style="--c:' + col[0] + ';--d:' + col[1] + '">' +
        '<div class="ubar"><div class="ut"><small>' + T('unitN', { n: ui + 1 }) + '</small><b>' + esc(tx(u.title)) + '</b><span>' + esc(tx(u.desc)) + '</span></div>' +
        '<button class="ug" data-act="guide" data-u="' + ui + '">' + IC.book + '<span>' + T('guide') + '</span></button></div><div class="path">';
      u.nodes.forEach(function (n, i) {
        var gi = base + i, st = nodeState(gi, ci);
        h += '<div class="nrow" style="--x:' + (OFFS[i] * sign) + 'px"><button class="node ' + st + ' k-' + n.k + '" data-act="node" data-n="' + gi + '">' + nodeIcon(n, st) +
          (st === 'cur' ? '<span class="startb">' + T('start') + '</span>' : '') + '</button></div>';
      });
      h += '<div class="pmas ' + (sign > 0 ? 'l' : 'r') + '">' + mascot(['happy', 'wink', 'joy'][ui % 3], 104) + '</div></div></section>';
    });
    if (ci >= NODES.length) h += '<div class="pend">' + mascot('joy', 120) + '<p>' + T('courseEnd') + '</p></div>';
    $('#v-learn').innerHTML = h;
  }
  function scrollToCur(smooth) {
    if (TAB !== 'learn') return;
    var el = $('.node.cur');
    if (el) el.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
  }
  function closePop() { var p = $('.pop'); if (p) p.remove(); }
  function togglePop(btn) {
    var gi = +btn.getAttribute('data-n'), row = btn.parentNode, old = $('.pop');
    if (old) { var same = old.parentNode === row; old.remove(); if (same) return; }
    var n = NODES[gi], st = nodeState(gi, curIdx()), sub, act = '';
    if (st === 'lock') sub = T('locked');
    else if (n.k === 'chest') {
      sub = st === 'done' ? T('chestDone') : T('chestSub');
      if (st === 'cur') act = '<button class="btn wbtn wide" data-act="go" data-n="' + gi + '">' + T('openChest') + '</button>';
    } else {
      sub = n.k === 'test' ? T('testSub') : T('lessonOf', { a: LNUM[n.k], b: 4 });
      act = '<button class="btn wbtn wide" data-act="go" data-n="' + gi + '">' + (st === 'done' ? T('reXp', { n: 5 }) : T('goXp', { n: n.k === 'test' ? 20 : 10 })) + '</button>';
    }
    var pop = document.createElement('div');
    pop.className = 'pop ' + st;
    pop.innerHTML = '<b>' + esc(T('k_' + n.k)) + '</b><p>' + esc(sub) + '</p>' + act;
    row.appendChild(pop);
    sfx('tap');
    setTimeout(function () {
      var r = pop.getBoundingClientRect(), lim = window.innerHeight - ($('#tabs').offsetHeight + 16);
      if (r.bottom > lim) window.scrollBy({ top: r.bottom - lim, behavior: 'smooth' });
    }, 20);
  }
  function renderPractice() {
    var nm = Object.keys(S.mist[S.course]).filter(function (id) { return ITEMS[id]; }).length, lw = learnedW(), ls = learnedS(), c = C();
    var h = '<h1 class="vh">' + T('practiceT') + '</h1><p class="vsub">' + T('pEarn') + '</p>' + goalBar();
    h += pcard('mist', '🎯', T('p_mist'), T('p_mistD', { n: nm }), nm === 0, 'red');
    h += pcard('words', '💪', T('p_words'), T('p_wordsD'), lw.length < 4, 'blue');
    h += pcard('listen', '🎧', T('p_listen'), T('p_listenD'), ls.length < 3 || !canSpeak, 'purple');
    h += '<h2 class="vh2">' + T('vocab') + '<small>' + T('vocabN', { n: lw.length }) + '</small></h2>';
    if (!lw.length) h += '<p class="empty">' + T('noVocab') + '</p>';
    D.units.forEach(function (u) {
      var ws = u.words.filter(function (w) { return S.seen[S.course][w.id]; });
      if (!ws.length) return;
      h += '<div class="vgroup"><div class="vgt">' + u.icon + ' ' + esc(tx(u.title)) + '</div>' + ws.map(function (w) {
        var st = Math.max(0, strength(w.id)), bars = '';
        for (var i = 1; i <= 5; i++) bars += '<i class="' + (i <= st ? 'on' : '') + '"></i>';
        return '<div class="vrow"><span class="em">' + w.emoji + '</span><div class="vt"><b>' + wlab(w, c.target) + '</b><small>' + esc(w[c.source]) + '</small></div><span class="str">' + bars + '</span><button class="spk sm" data-act="say" data-id="' + w.id + '">' + IC.spk + '</button></div>';
      }).join('') + '</div>';
    });
    $('#v-practice').innerHTML = h;
  }
  function pcard(m, ic, t, d, dis, col) {
    return '<button class="pcard" data-act="practice" data-m="' + m + '"' + (dis ? ' disabled' : '') + '><span class="pi ' + col + '">' + ic + '</span><span class="pt"><b>' + t + '</b><small>' + d + '</small></span><span class="chev">›</span></button>';
  }
  function renderShop() {
    var left = Math.ceil((S.boost - Date.now()) / 60000);
    var items = [
      { id: 'refill', ic: IC.heart, cls: 'hrt', price: REFILL, st: !heartsOn() ? T('heartsOff') : S.hearts >= MAXH ? T('full') : S.hearts + '/' + MAXH, dis: !heartsOn() || S.hearts >= MAXH },
      { id: 'freeze', ic: IC.flame, cls: 'ice', price: FREEZE, st: T('owned', { n: S.freeze, m: MAXFREEZE }), dis: S.freeze >= MAXFREEZE },
      { id: 'boost', ic: IC.bolt, cls: 'xp', price: BOOST, st: left > 0 ? T('activeM', { m: left }) : '', dis: left > 0 }
    ];
    var h = '<div class="vtop"><h1 class="vh">' + T('shopT') + '</h1><div class="gembal">' + IC.gem + '<b>' + S.gems + '</b></div></div><p class="vsub">' + T('gemHow') + '</p>';
    h += items.map(function (it) {
      return '<div class="sitem"><span class="sic ' + it.cls + '">' + it.ic + '</span><div class="si"><b>' + T('i_' + it.id) + '</b><small>' + T('i_' + it.id + 'D') + '</small>' + (it.st ? '<em>' + esc(it.st) + '</em>' : '') + '</div>' +
        '<button class="btn price" data-act="buy" data-item="' + it.id + '"' + (it.dis || S.gems < it.price ? ' disabled' : '') + '>' + IC.gem + it.price + '</button></div>';
    }).join('');
    $('#v-shop').innerHTML = h;
  }
  function buy(id) {
    var price = { refill: REFILL, freeze: FREEZE, boost: BOOST }[id];
    if (S.gems < price) return toast(T('gemsNot'));
    if (id === 'refill') { if (!heartsOn() || S.hearts >= MAXH) return; S.hearts = MAXH; S.heartAt = 0; }
    else if (id === 'freeze') { if (S.freeze >= MAXFREEZE) return; S.freeze++; }
    else if (id === 'boost') { if (S.boost > Date.now()) return; S.boost = Date.now() + BOOST_MS; }
    S.gems -= price;
    save(); sfx('ok'); toast(T('bought'));
    closeSheet(); renderTop(); renderView();
  }
  function fmtMonth(s) {
    var d = pdate(s);
    return UL() === 'zh' ? d.getFullYear() + '年' + (d.getMonth() + 1) + '月' : T('months')[d.getMonth()] + ' ' + d.getFullYear();
  }
  function weekChart() {
    var wd = T('wd'), days = [], max = S.goal, i;
    for (i = 6; i >= 0; i--) { var d = addDays(today(), -i), v = S.daily[d] || 0; days.push([d, v]); if (v > max) max = v; }
    return '<div class="chart">' + days.map(function (x, k) {
      return '<div class="cb' + (k === 6 ? ' td' : '') + '"><span class="cv">' + (x[1] || '') + '</span><div class="cbar"><i style="height:' + Math.round(100 * x[1] / max) + '%"' + (x[1] >= S.goal ? ' class="met"' : '') + '></i></div><span class="cl">' + wd[pdate(x[0]).getDay()] + '</span></div>';
    }).join('') + '</div>';
  }
  function calendar() {
    var now = new Date(), y = now.getFullYear(), m = now.getMonth(), first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate(), t = today(), wd = T('wd');
    var h = '<div class="cal"><div class="calh">' + T('ym', { y: y, m: m + 1, mn: UL() === 'en' ? T('months')[m] : '' }) + '</div><div class="calg">';
    h += wd.map(function (x) { return '<span class="cw">' + x + '</span>'; }).join('');
    for (var i = 0; i < first; i++) h += '<span></span>';
    for (var d = 1; d <= n; d++) {
      var ds = y + '-' + pad(m + 1) + '-' + pad(d), cls = (S.daily[ds] || 0) > 0 ? 'on' : S.frozen.indexOf(ds) >= 0 ? 'fz' : '';
      h += '<span class="cd ' + cls + (ds === t ? ' td' : '') + '">' + d + '</span>';
    }
    return h + '</div></div>';
  }
  function renderMe() {
    var h = '<div class="mehead"><div class="av">' + mascot('happy', 78) + '</div><div class="mi"><button class="nm" data-act="rename">' + esc(S.name || T('learner')) + ' <small>✎</small></button><p>' + T('joined', { d: fmtMonth(S.joined) }) + '</p></div></div>';
    h += '<h2 class="vh2">' + T('courses') + '</h2><div class="clist">' + ORDER.map(function (id) { return courseRow(id, 'setCourse'); }).join('') + '</div>';
    h += '<h2 class="vh2">' + T('stats') + '</h2><div class="sgrid">' +
      '<div class="sg fire">' + IC.flame + '<div><b>' + streakNow() + '</b><small>' + T('st_streak') + ' · ' + T('st_best', { n: S.st.best }) + '</small></div></div>' +
      '<div class="sg">' + IC.bolt + '<div><b>' + S.xp + '</b><small>' + T('st_xp') + '</small></div></div>' +
      '<div class="sg blue">' + IC.book + '<div><b>' + totalLearned() + '</b><small>' + T('st_words') + '</small></div></div>' +
      '<div class="sg green">' + IC.star + '<div><b>' + S.lessons + '</b><small>' + T('st_lessons') + '</small></div></div></div>';
    h += goalBar();
    h += '<h2 class="vh2">' + T('week') + '</h2>' + weekChart();
    h += '<h2 class="vh2">' + T('cal') + '</h2>' + calendar();
    h += '<h2 class="vh2">' + T('ach') + '<small>' + Object.keys(S.ach).length + '/' + ACH.length + '</small></h2><div class="agrid">' + ACH.map(function (a) {
      return '<div class="ach' + (S.ach[a.id] ? ' got' : '') + '"><span class="ai">' + a.ic + '</span><b>' + T('a_' + a.id) + '</b><small>' + T('ad_' + a.id) + '</small></div>';
    }).join('') + '</div>';
    var tg = [['sfx'], ['tts'], ['slow'], ['hearts', T('s_heartsD')]];
    if (S.course === 'zh') tg.push(['py']);
    h += '<h2 class="vh2">' + T('settings') + '</h2><div class="set"><div class="srow col"><span>' + T('s_goal') + '</span><div class="seg">' + GOALS.map(function (g, i) {
      return '<button class="' + (S.goal === g ? 'on' : '') + '" data-act="setGoal" data-g="' + g + '"><b>' + T('goalNames')[i] + '</b><small>' + g + ' XP</small></button>';
    }).join('') + '</div></div>' + tg.map(function (x) {
      return '<div class="srow"><div><span>' + T('s_' + x[0]) + '</span>' + (x[1] ? '<small>' + x[1] + '</small>' : '') + '</div><button class="sw' + (S.set[x[0]] ? ' on' : '') + '" data-act="toggle" data-k="' + x[0] + '" aria-pressed="' + !!S.set[x[0]] + '"><i></i></button></div>';
    }).join('') + '</div>';
    h += '<button class="btn danger wide mt" data-act="reset">' + T('reset') + '</button><p class="about">多语 · ' + T('about') + '</p>';
    $('#v-me').innerHTML = h;
  }

  // ---------- 提示 ----------
  var toastT = 0;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove('on'); }, 2200);
  }
  function hideHint() { var h = $('.hintpop'); if (h) h.remove(); }
  function showHint(el) {
    hideHint();
    var r = el.getBoundingClientRect(), d = document.createElement('div');
    d.className = 'hintpop';
    d.textContent = el.getAttribute('data-h');
    document.body.appendChild(d);
    var w = d.offsetWidth;
    d.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    d.style.top = (r.bottom + 8) + 'px';
    speak(el.getAttribute('data-w'), tl());
  }

  // ---------- 事件 ----------
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
    hideHint();
    if (!el) { if (!e.target.closest || !e.target.closest('.pop')) closePop(); return; }
    var a = el.getAttribute('data-act');
    if (a !== 'node' && a !== 'go') closePop();
    ac();
    switch (a) {
      case 'tab': TAB = el.getAttribute('data-tab'); closeSheet(); renderAll(); window.scrollTo(0, 0); if (TAB === 'learn') scrollToCur(false); break;
      case 'node': togglePop(el); break;
      case 'go': {
        var gi = +el.getAttribute('data-n');
        closePop();
        if (gi <= curIdx()) startNode(NODES[gi]);
        break;
      }
      case 'guide': guideSheet(+el.getAttribute('data-u')); break;
      case 'courses': courseSheet(); break;
      case 'setCourse': {
        var c = el.getAttribute('data-c');
        if (c !== S.course) { S.course = c; save(); }
        closeSheet(); TAB = 'learn'; renderAll(); scrollToCur(false);
        break;
      }
      case 'streak': streakSheet(); break;
      case 'hearts': heartSheet(); break;
      case 'say': sayItem(ITEMS[el.getAttribute('data-id')]); break;
      case 'play': if (LS) sayItem(LS.q[0].it, el.getAttribute('data-slow') === '1'); break;
      case 'hint': e.stopPropagation(); showHint(el); break;
      case 'opt': if (LS) chooseOpt(+el.getAttribute('data-i')); break;
      case 'tile': if (LS) pickTile(+el.getAttribute('data-i')); break;
      case 'untile': if (LS) unpickTile(+el.getAttribute('data-i')); break;
      case 'm': if (LS) matchTap(el); break;
      case 'kbd':
        if (LS && !LS.fb) {
          S.set.kbd = !S.set.kbd; save();
          LS.picked = []; LS.typed = '';
          $('#lb').innerHTML = body(LS.q[0]);
          renderAns(); updateCheck();
          var ta = $('#ta'); if (ta) ta.focus();
        }
        break;
      case 'check': check(); break;
      case 'skip': if (LS && !LS.fb) finishEx(LS.q[0], { ok: false }); break;
      case 'nolisten':
        if (LS && !LS.fb) { S.noL = Date.now() + 15 * 60000; save(); LS.q = LS.q.map(deListen); renderEx(); }
        break;
      case 'quit': confirmSheet(T('quitT'), T('quitSub'), 'quitYes', T('quit'), T('keep'), true); break;
      case 'quitYes': closeSheet(); closeLesson(); renderAll(); break;
      case 'closeSheet': closeSheet(); break;
      case 'resNext': resNext(); break;
      case 'refill':
        if (S.gems < REFILL) { toast(T('gemsNot')); break; }
        S.gems -= REFILL; S.hearts = MAXH; S.heartAt = 0; save(); sfx('ok');
        hideScreen();
        if (LS) { renderEx(); } else renderAll();
        break;
      case 'earn': {
        closeSheet(); hideScreen();
        if (LS) closeLesson();
        renderAll();
        var nm = Object.keys(S.mist[S.course]).filter(function (id) { return ITEMS[id]; }).length;
        startPractice(nm >= 3 ? 'mist' : 'words');
        break;
      }
      case 'nhQuit': hideScreen(); if (LS) closeLesson(); renderAll(); break;
      case 'practice': startPractice(el.getAttribute('data-m')); break;
      case 'buy': buy(el.getAttribute('data-item')); break;
      case 'setGoal': S.goal = +el.getAttribute('data-g'); save(); renderView(); break;
      case 'toggle': {
        var k = el.getAttribute('data-k');
        S.set[k] = !S.set[k]; save(); renderTop(); renderView();
        if (k === 'sfx' && S.set.sfx) sfx('ok');
        break;
      }
      case 'rename': {
        var nmv = window.prompt(T('editName'), S.name || '');
        if (nmv != null) { S.name = nmv.trim().slice(0, 20); save(); renderView(); }
        break;
      }
      case 'reset': confirmSheet(T('resetT'), T('resetSub'), 'resetYes', T('resetYes'), T('cancel'), true); break;
      case 'resetYes': try { localStorage.removeItem(KEY); } catch (er) { /* ignore */ } location.reload(); break;
      case 'ob': onboard(+el.getAttribute('data-s')); break;
      case 'obCourse': S.course = el.getAttribute('data-c'); save(); onboard(2); break;
      case 'obGoal': S.goal = +el.getAttribute('data-g'); save(); onboard(2); break;
      case 'obDone': S.ob = true; save(); hideScreen(); TAB = 'learn'; renderAll(); scrollToCur(false); break;
    }
  });
  document.addEventListener('input', function (e) {
    if (LS && e.target && e.target.id === 'ta') { LS.typed = e.target.value; updateCheck(); }
  });
  document.addEventListener('keydown', function (e) {
    var scr = $('#screen');
    if (!scr.hidden) {
      if (e.key === 'Enter') { var b0 = $('#screen .sfoot .btn.pri'); if (b0) { e.preventDefault(); b0.click(); } }
      return;
    }
    if (!LS || !$('#sheet').hidden) return;
    var inTa = e.target && e.target.tagName === 'TEXTAREA';
    if (e.key === 'Enter') {
      e.preventDefault();
      var b = LS.fb ? $('#lf [data-act=check]') : $('#chk');
      if (b && !b.disabled) b.click();
      return;
    }
    if (inTa || LS.fb) return;
    if (/^[0-9]$/.test(e.key)) {
      var hit = $$('#lb .kn').filter(function (x) { return x.textContent === e.key && !x.parentNode.classList.contains('gone'); })[0];
      if (hit) hit.parentNode.click();
    } else if (e.key === 'Backspace' && LS.picked && LS.picked.length) unpickTile(LS.picked[LS.picked.length - 1]);
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !LS) renderTop(); });
  setInterval(function () { if (regenHearts() && !LS) { renderTop(); if (TAB === 'shop') renderShop(); } }, 30000);

  // ---------- 启动 ----------
  // 仅本机预览时暴露调试入口，方便自动走查
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) window.__dyl = { ls: function () { return LS; }, s: function () { return S; }, judge: judge, norm: norm };
  renderAll();
  if (!S.ob) onboard(0);
  else requestAnimationFrame(function () { scrollToCur(false); });
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { /* 离线缓存失败也能用 */ }); });
  }
})();
