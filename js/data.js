// 课程内容：三语平行数据（zh/en/de），由app.js生成练习
// 拼音约定：一/不 按实际变调标调（不是 bú shì、一个 yí ge、一只 yì zhī），量词 个 读轻声 ge。
// 修改后运行 node tools/check-data.js 检查。
window.DL = {
  units: [
    // ───────────────────────── 1 问候 ─────────────────────────
    {
      id: 'u1',
      icon: '💬',
      color: 'orange',
      title: { zh: '问候', en: 'Greetings' },
      desc:  { zh: '打招呼、道谢和告别', en: 'Say hello, thank you and goodbye' },
      tips: {
        en: '英语里的 I（我）在句子任何位置都要大写。别人问 How are you? 时，最常见的回答是 I\'m fine, thanks!',
        de: '德语名词的首字母永远大写，比如 der Freund（朋友）。对家人和朋友说 du（你），对陌生人和长辈说 Sie（您）。',
        den: 'German nouns are always capitalized, e.g. der Freund (friend). Say du to family and friends, and the polite Sie to strangers and older people.',
        zh: 'Mandarin has four tones plus a light neutral tone: mā, má, mǎ, mà. Put 吗 (ma) at the end of a statement to turn it into a yes/no question: 你好吗？'
      },
      words: [
        { id: 'hello',       emoji: '👋', zh: '你好',   py: 'nǐhǎo',       en: 'hello',        de: 'hallo' },
        { id: 'goodbye',     emoji: '🚪', zh: '再见',   py: 'zàijiàn',     en: 'goodbye',      de: 'tschüss' },
        { id: 'thanks',      emoji: '🙏', zh: '谢谢',   py: 'xièxie',      en: 'thanks',       de: 'danke' },
        { id: 'please',      emoji: '🥺', zh: '请',     py: 'qǐng',        en: 'please',       de: 'bitte' },
        { id: 'sorry',       emoji: '🙇', zh: '对不起', py: 'duìbuqǐ',     en: 'sorry',        de: 'Entschuldigung' },
        { id: 'yes',         emoji: '✅', zh: '是的',   py: 'shìde',       en: 'yes',          de: 'ja' },
        { id: 'no',          emoji: '❌', zh: '不',     py: 'bù',          en: 'no',           de: 'nein' },
        { id: 'goodmorning', emoji: '🌅', zh: '早上好', py: 'zǎoshanghǎo', en: 'good morning', de: 'guten Morgen' },
        { id: 'goodnight',   emoji: '🌙', zh: '晚安',   py: 'wǎn\'ān',     en: 'good night',   de: 'gute Nacht' },
        { id: 'friend',      emoji: '🧑‍🤝‍🧑', zh: '朋友', py: 'péngyou',     en: 'friend',       de: 'der Freund' }
      ],
      sentences: [
        { id: 'u1s1', zh: '你好， 安娜！', py: 'Nǐhǎo， Ānnà！', en: 'Hello, Anna!', de: 'Hallo, Anna!',
          alt: { en: ['Hi, Anna!'] } },
        { id: 'u1s2', zh: '你 好 吗？', py: 'Nǐ hǎo ma？', en: 'How are you?', de: 'Wie geht es dir?',
          alt: { zh: ['您 好 吗？'], en: ['How are you doing?'], de: ['Wie geht\'s dir?', 'Wie geht es Ihnen?'] } },
        { id: 'u1s3', zh: '我 很 好， 谢谢！', py: 'Wǒ hěn hǎo， xièxie！', en: 'I\'m fine, thanks!', de: 'Mir geht es gut, danke!',
          alt: { en: ['I\'m fine, thank you!', 'I\'m good, thanks!', 'I\'m well, thanks!', 'I\'m very well, thanks!'],
                 de: ['Mir geht\'s gut, danke!', 'Es geht mir gut, danke!', 'Mir geht es sehr gut, danke!'] } },
        { id: 'u1s4', zh: '谢谢， 再见！', py: 'Xièxie， zàijiàn！', en: 'Thanks, goodbye!', de: 'Danke, tschüss!',
          alt: { en: ['Thank you, goodbye!', 'Thanks, bye!', 'Thank you, bye!'], de: ['Danke, tschüs!', 'Danke, auf Wiedersehen!'] } },
        { id: 'u1s5', zh: '早上好， 汤姆！', py: 'Zǎoshanghǎo， Tāngmǔ！', en: 'Good morning, Tom!', de: 'Guten Morgen, Tom!' },
        { id: 'u1s6', zh: '不， 谢谢。', py: 'Bù， xièxie。', en: 'No, thanks.', de: 'Nein, danke.',
          alt: { en: ['No, thank you.'] } },
        { id: 'u1s7', zh: '对不起， 我 不 是 安娜。', py: 'Duìbuqǐ， wǒ bú shì Ānnà。', en: 'Sorry, I\'m not Anna.', de: 'Entschuldigung, ich bin nicht Anna.',
          alt: { en: ['I\'m sorry, I\'m not Anna.'], de: ['Tut mir leid, ich bin nicht Anna.'] } },
        { id: 'u1s8', zh: '是的， 我 是 李 明。', py: 'Shìde， wǒ shì Lǐ Míng。', en: 'Yes, I\'m Li Ming.', de: 'Ja, ich bin Li Ming.',
          alt: { zh: ['对， 我 是 李 明。'] } },
        { id: 'u1s9', zh: '晚安， 我 的 朋友！', py: 'Wǎn\'ān， wǒ de péngyou！', en: 'Good night, my friend!', de: 'Gute Nacht, mein Freund!',
          alt: { de: ['Gute Nacht, meine Freundin!'] } },
        { id: 'u1s10', zh: '请 坐。', py: 'Qǐng zuò。', en: 'Please sit down.', de: 'Bitte setz dich.',
          alt: { en: ['Please have a seat.', 'Please take a seat.', 'Sit down, please.'],
                 de: ['Setz dich bitte.', 'Bitte setzen Sie sich.', 'Setzen Sie sich bitte.', 'Bitte nimm Platz.', 'Bitte nehmen Sie Platz.'] } }
      ]
    },

    // ───────────────────────── 2 人物与家庭 ─────────────────────────
    {
      id: 'u2',
      icon: '👪',
      color: 'teal',
      title: { zh: '人物与家庭', en: 'People & family' },
      desc:  { zh: '介绍自己和家人', en: 'Introduce yourself and your family' },
      tips: {
        en: '英语介绍职业时名词前要加 a：I am a student（我是学生）。he 指“他”，she 指“她”，说的时候要分清。',
        de: '德语介绍职业时不加冠词：Ich bin Student。女性的职业名称通常加 -in：Lehrer → Lehrerin，Arzt → Ärztin。',
        den: 'Leave out the article when you say your job: Ich bin Student. Female job titles usually add -in: Lehrer → Lehrerin, Arzt → Ärztin.',
        zh: '是 (shì) links two nouns: 我是学生 = I am a student. Negate it with 不 (bù), which changes to bú before a fourth tone: 不是 (bú shì). 他 (he) and 她 (she) sound the same: tā.'
      },
      words: [
        { id: 'man',     emoji: '👨',  zh: '男人', py: 'nánrén',   en: 'man',     de: 'der Mann' },
        { id: 'woman',   emoji: '👩',  zh: '女人', py: 'nǚrén',    en: 'woman',   de: 'die Frau' },
        { id: 'boy',     emoji: '👦',  zh: '男孩', py: 'nánhái',   en: 'boy',     de: 'der Junge' },
        { id: 'girl',    emoji: '👧',  zh: '女孩', py: 'nǚhái',    en: 'girl',    de: 'das Mädchen' },
        { id: 'mother',  emoji: '🤱',  zh: '妈妈', py: 'māma',     en: 'mother',  de: 'die Mutter' },
        { id: 'father',  emoji: '👨‍🍼', zh: '爸爸', py: 'bàba',     en: 'father',  de: 'der Vater' },
        { id: 'teacher', emoji: '🧑‍🏫', zh: '老师', py: 'lǎoshī',   en: 'teacher', de: 'der Lehrer' },
        { id: 'student', emoji: '🧑‍🎓', zh: '学生', py: 'xuésheng', en: 'student', de: 'der Student' },
        { id: 'doctor',  emoji: '🧑‍⚕️', zh: '医生', py: 'yīshēng',  en: 'doctor',  de: 'der Arzt' },
        { id: 'name',    emoji: '🏷️',  zh: '名字', py: 'míngzi',   en: 'name',    de: 'der Name' }
      ],
      sentences: [
        { id: 'u2s1', zh: '我 是 学生。', py: 'Wǒ shì xuésheng。', en: 'I am a student.', de: 'Ich bin Student.',
          alt: { de: ['Ich bin Studentin.', 'Ich bin Schüler.', 'Ich bin Schülerin.'] } },
        { id: 'u2s2', zh: '你 是 老师 吗？', py: 'Nǐ shì lǎoshī ma？', en: 'Are you a teacher?', de: 'Bist du Lehrer?',
          alt: { zh: ['您 是 老师 吗？'], de: ['Bist du Lehrerin?', 'Sind Sie Lehrer?', 'Sind Sie Lehrerin?'] } },
        { id: 'u2s3', zh: '我 爸爸 是 医生。', py: 'Wǒ bàba shì yīshēng。', en: 'My father is a doctor.', de: 'Mein Vater ist Arzt.',
          alt: { zh: ['我 的 爸爸 是 医生。'], en: ['My dad is a doctor.'], de: ['Mein Papa ist Arzt.'] } },
        { id: 'u2s4', zh: '我 妈妈 是 老师。', py: 'Wǒ māma shì lǎoshī。', en: 'My mother is a teacher.', de: 'Meine Mutter ist Lehrerin.',
          alt: { zh: ['我 的 妈妈 是 老师。'], en: ['My mom is a teacher.', 'My mum is a teacher.'], de: ['Meine Mama ist Lehrerin.'] } },
        { id: 'u2s5', zh: '你 叫 什么 名字？', py: 'Nǐ jiào shénme míngzi？', en: 'What is your name?', de: 'Wie heißt du?',
          alt: { zh: ['你 叫 什么？', '您 叫 什么 名字？'], de: ['Wie ist dein Name?', 'Wie heißen Sie?', 'Wie ist Ihr Name?'] } },
        { id: 'u2s6', zh: '我 叫 安娜。', py: 'Wǒ jiào Ānnà。', en: 'My name is Anna.', de: 'Ich heiße Anna.',
          alt: { zh: ['我 的 名字 是 安娜。'], en: ['I am called Anna.'], de: ['Mein Name ist Anna.'] } },
        { id: 'u2s7', zh: '这 个 男孩 叫 汤姆。', py: 'Zhè ge nánhái jiào Tāngmǔ。', en: 'This boy is called Tom.', de: 'Dieser Junge heißt Tom.' },
        { id: 'u2s8', zh: '这 个 男人 是 谁？', py: 'Zhè ge nánrén shì shéi？', en: 'Who is this man?', de: 'Wer ist dieser Mann?' },
        { id: 'u2s9', zh: '她 是 女人， 不 是 女孩。', py: 'Tā shì nǚrén， bú shì nǚhái。', en: 'She is a woman, not a girl.', de: 'Sie ist eine Frau, kein Mädchen.' },
        { id: 'u2s10', zh: '李 明 是 我 的 老师。', py: 'Lǐ Míng shì wǒ de lǎoshī。', en: 'Li Ming is my teacher.', de: 'Li Ming ist mein Lehrer.' }
      ]
    },

    // ───────────────────────── 3 食物与饮料 ─────────────────────────
    {
      id: 'u3',
      icon: '🍜',
      color: 'purple',
      title: { zh: '食物与饮料', en: 'Food & drink' },
      desc:  { zh: '说说你吃什么、喝什么', en: 'Talk about what you eat and drink' },
      tips: {
        en: '英语可数名词的复数一般加 -s：banana → bananas。water、milk、rice 是不可数名词，没有复数。',
        de: '德语名词有三种性：der（阳性）、die（阴性）、das（中性），记单词时要连冠词一起记。阳性名词作宾语时 ein 要变成 einen：Ich esse einen Apfel。',
        den: 'Every noun is der (masculine), die (feminine) or das (neuter), so learn each noun together with its article. A masculine object turns ein into einen: Ich esse einen Apfel.',
        zh: 'After a number or 这/那, a noun needs a measure word: 一个苹果 (yí ge píngguǒ) = an apple. 个 (ge) is the most common one. 吃 (chī) is to eat, 喝 (hē) is to drink.'
      },
      words: [
        { id: 'apple',  emoji: '🍎', zh: '苹果', py: 'píngguǒ',   en: 'apple',  de: 'der Apfel' },
        { id: 'bread',  emoji: '🍞', zh: '面包', py: 'miànbāo',   en: 'bread',  de: 'das Brot' },
        { id: 'water',  emoji: '💧', zh: '水',   py: 'shuǐ',      en: 'water',  de: 'das Wasser' },
        { id: 'milk',   emoji: '🥛', zh: '牛奶', py: 'niúnǎi',    en: 'milk',   de: 'die Milch' },
        { id: 'coffee', emoji: '☕', zh: '咖啡', py: 'kāfēi',     en: 'coffee', de: 'der Kaffee' },
        { id: 'tea',    emoji: '🍵', zh: '茶',   py: 'chá',       en: 'tea',    de: 'der Tee' },
        { id: 'egg',    emoji: '🥚', zh: '鸡蛋', py: 'jīdàn',     en: 'egg',    de: 'das Ei' },
        { id: 'rice',   emoji: '🍚', zh: '米饭', py: 'mǐfàn',     en: 'rice',   de: 'der Reis' },
        { id: 'banana', emoji: '🍌', zh: '香蕉', py: 'xiāngjiāo', en: 'banana', de: 'die Banane' },
        { id: 'cheese', emoji: '🧀', zh: '奶酪', py: 'nǎilào',    en: 'cheese', de: 'der Käse' }
      ],
      sentences: [
        { id: 'u3s1', zh: '我 喝 水。', py: 'Wǒ hē shuǐ。', en: 'I drink water.', de: 'Ich trinke Wasser.',
          alt: { en: ['I am drinking water.'] } },
        { id: 'u3s2', zh: '我 喜欢 喝 咖啡。', py: 'Wǒ xǐhuan hē kāfēi。', en: 'I like drinking coffee.', de: 'Ich trinke gern Kaffee.',
          alt: { en: ['I like to drink coffee.', 'I like coffee.'], de: ['Ich trinke gerne Kaffee.', 'Ich mag Kaffee.'] } },
        { id: 'u3s3', zh: '你 要 茶 吗？', py: 'Nǐ yào chá ma？', en: 'Do you want tea?', de: 'Möchtest du Tee?',
          alt: { zh: ['您 要 茶 吗？', '你 想 喝 茶 吗？'], en: ['Would you like tea?', 'Would you like some tea?', 'Do you want some tea?'],
                 de: ['Willst du Tee?', 'Möchten Sie Tee?'] } },
        { id: 'u3s4', zh: '我 吃 一 个 苹果。', py: 'Wǒ chī yí ge píngguǒ。', en: 'I am eating an apple.', de: 'Ich esse einen Apfel.',
          alt: { en: ['I eat an apple.'] } },
        { id: 'u3s5', zh: '我 吃 面包 和 奶酪。', py: 'Wǒ chī miànbāo hé nǎilào。', en: 'I eat bread and cheese.', de: 'Ich esse Brot und Käse.',
          alt: { en: ['I am eating bread and cheese.'] } },
        { id: 'u3s6', zh: '你 喜欢 香蕉 吗？', py: 'Nǐ xǐhuan xiāngjiāo ma？', en: 'Do you like bananas?', de: 'Magst du Bananen?',
          alt: { zh: ['您 喜欢 香蕉 吗？'], de: ['Mögen Sie Bananen?', 'Isst du gern Bananen?'] } },
        { id: 'u3s7', zh: '我 不 喝 牛奶。', py: 'Wǒ bù hē niúnǎi。', en: 'I don\'t drink milk.', de: 'Ich trinke keine Milch.' },
        { id: 'u3s8', zh: '她 吃 米饭。', py: 'Tā chī mǐfàn。', en: 'She eats rice.', de: 'Sie isst Reis.',
          alt: { en: ['She is eating rice.'] } },
        { id: 'u3s9', zh: '我 要 一 个 鸡蛋。', py: 'Wǒ yào yí ge jīdàn。', en: 'I want an egg.', de: 'Ich möchte ein Ei.',
          alt: { en: ['I would like an egg.'], de: ['Ich will ein Ei.'] } },
        { id: 'u3s10', zh: '茶 还是 咖啡？', py: 'Chá háishi kāfēi？', en: 'Tea or coffee?', de: 'Tee oder Kaffee?' }
      ]
    },

    // ───────────────────────── 4 动物 ─────────────────────────
    {
      id: 'u4',
      icon: '🐾',
      color: 'pink',
      title: { zh: '动物', en: 'Animals' },
      desc:  { zh: '常见动物和它们的量词', en: 'Common animals and their measure words' },
      tips: {
        en: '泛指一类动物时英语常用复数：Cats eat fish（猫吃鱼）。mouse 的复数是不规则的 mice。',
        de: '德语里动物“吃”用 fressen，人“吃”才用 essen：Katzen fressen Fisch。很多复数形式不规则，要一起记：die Maus → die Mäuse。',
        den: 'Animals fressen, people essen: Katzen fressen Fisch. Many plurals are irregular, so learn them as well: die Maus → die Mäuse.',
        zh: 'Animals take different measure words: 只 (zhī) for most animals, 匹 (pǐ) for horses and 头 (tóu) for cows. Chinese nouns have no plural form: 猫 can mean cat or cats.'
      },
      words: [
        { id: 'cat',      emoji: '🐱', zh: '猫',   py: 'māo',      en: 'cat',      de: 'die Katze' },
        { id: 'dog',      emoji: '🐶', zh: '狗',   py: 'gǒu',      en: 'dog',      de: 'der Hund' },
        { id: 'bird',     emoji: '🐦', zh: '鸟',   py: 'niǎo',     en: 'bird',     de: 'der Vogel' },
        { id: 'fish',     emoji: '🐟', zh: '鱼',   py: 'yú',       en: 'fish',     de: 'der Fisch' },
        { id: 'horse',    emoji: '🐴', zh: '马',   py: 'mǎ',       en: 'horse',    de: 'das Pferd' },
        { id: 'panda',    emoji: '🐼', zh: '熊猫', py: 'xióngmāo', en: 'panda',    de: 'der Panda' },
        { id: 'rabbit',   emoji: '🐰', zh: '兔子', py: 'tùzi',     en: 'rabbit',   de: 'das Kaninchen' },
        { id: 'cow',      emoji: '🐮', zh: '牛',   py: 'niú',      en: 'cow',      de: 'die Kuh' },
        { id: 'mouse',    emoji: '🐭', zh: '老鼠', py: 'lǎoshǔ',   en: 'mouse',    de: 'die Maus' },
        { id: 'elephant', emoji: '🐘', zh: '大象', py: 'dàxiàng',  en: 'elephant', de: 'der Elefant' }
      ],
      sentences: [
        { id: 'u4s1', zh: '我 有 一 只 猫。', py: 'Wǒ yǒu yì zhī māo。', en: 'I have a cat.', de: 'Ich habe eine Katze.' },
        { id: 'u4s2', zh: '你 有 狗 吗？', py: 'Nǐ yǒu gǒu ma？', en: 'Do you have a dog?', de: 'Hast du einen Hund?',
          alt: { zh: ['您 有 狗 吗？'], de: ['Haben Sie einen Hund?'] } },
        { id: 'u4s3', zh: '熊猫 很 可爱。', py: 'Xióngmāo hěn kě\'ài。', en: 'Pandas are cute.', de: 'Pandas sind süß.',
          alt: { en: ['Pandas are very cute.', 'The panda is cute.', 'The panda is very cute.'],
                 de: ['Pandas sind sehr süß.', 'Der Panda ist süß.', 'Der Panda ist sehr süß.'] } },
        { id: 'u4s4', zh: '鸟 会 飞。', py: 'Niǎo huì fēi。', en: 'Birds can fly.', de: 'Vögel können fliegen.' },
        { id: 'u4s5', zh: '猫 吃 鱼。', py: 'Māo chī yú。', en: 'Cats eat fish.', de: 'Katzen fressen Fisch.',
          alt: { en: ['The cat eats fish.'], de: ['Die Katze frisst Fisch.'] } },
        { id: 'u4s6', zh: '这 匹 马 很 大。', py: 'Zhè pǐ mǎ hěn dà。', en: 'This horse is big.', de: 'Dieses Pferd ist groß.',
          alt: { en: ['This horse is very big.'], de: ['Dieses Pferd ist sehr groß.'] } },
        { id: 'u4s7', zh: '老鼠 怕 猫。', py: 'Lǎoshǔ pà māo。', en: 'Mice are afraid of cats.', de: 'Mäuse haben Angst vor Katzen.',
          alt: { en: ['The mouse is afraid of the cat.'], de: ['Die Maus hat Angst vor der Katze.'] } },
        { id: 'u4s8', zh: '我 喜欢 大象。', py: 'Wǒ xǐhuan dàxiàng。', en: 'I like elephants.', de: 'Ich mag Elefanten.' },
        { id: 'u4s9', zh: '这 是 一 头 牛。', py: 'Zhè shì yì tóu niú。', en: 'This is a cow.', de: 'Das ist eine Kuh.' },
        { id: 'u4s10', zh: '兔子 在 哪儿？', py: 'Tùzi zài nǎr？', en: 'Where is the rabbit?', de: 'Wo ist das Kaninchen?',
          alt: { zh: ['兔子 在 哪里？'], de: ['Wo ist der Hase?'] } }
      ]
    },

    // ───────────────────────── 5 颜色与数字 ─────────────────────────
    {
      id: 'u5',
      icon: '🎨',
      color: 'blue',
      title: { zh: '颜色与数字', en: 'Colours & numbers' },
      desc:  { zh: '认识颜色和简单的数字', en: 'Learn colours and simple numbers' },
      tips: {
        en: '英语颜色词放在名词前面：a black dog（一只黑色的狗）。数量大于一时名词要用复数：two cats、three eggs。',
        de: '德语形容词放在名词前要加词尾：Ich habe einen schwarzen Hund。颜色当名词用时首字母大写：Ich mag Blau。',
        den: 'An adjective in front of a noun takes an ending: Ich habe einen schwarzen Hund. A colour used as a noun is capitalized: Ich mag Blau.',
        zh: 'Before a measure word, "two" is 两 (liǎng), not 二 (èr): 两只猫 = two cats. 一 changes tone: yì before tones 1-3 (一只 yì zhī) and yí before tone 4 (一个 yí ge).'
      },
      words: [
        { id: 'red',    emoji: '🔴', zh: '红色', py: 'hóngsè',  en: 'red',    de: 'rot' },
        { id: 'blue',   emoji: '🔵', zh: '蓝色', py: 'lánsè',   en: 'blue',   de: 'blau' },
        { id: 'green',  emoji: '🟢', zh: '绿色', py: 'lǜsè',    en: 'green',  de: 'grün' },
        { id: 'yellow', emoji: '🟡', zh: '黄色', py: 'huángsè', en: 'yellow', de: 'gelb' },
        { id: 'black',  emoji: '⚫', zh: '黑色', py: 'hēisè',   en: 'black',  de: 'schwarz' },
        { id: 'white',  emoji: '⚪', zh: '白色', py: 'báisè',   en: 'white',  de: 'weiß' },
        { id: 'one',    emoji: '1️⃣', zh: '一',   py: 'yī',      en: 'one',    de: 'eins' },
        { id: 'two',    emoji: '2️⃣', zh: '二',   py: 'èr',      en: 'two',    de: 'zwei' },
        { id: 'three',  emoji: '3️⃣', zh: '三',   py: 'sān',     en: 'three',  de: 'drei' },
        { id: 'ten',    emoji: '🔟', zh: '十',   py: 'shí',     en: 'ten',    de: 'zehn' }
      ],
      sentences: [
        { id: 'u5s1', zh: '一， 二， 三！', py: 'Yī， èr， sān！', en: 'One, two, three!', de: 'Eins, zwei, drei!' },
        { id: 'u5s2', zh: '我 有 两 只 猫。', py: 'Wǒ yǒu liǎng zhī māo。', en: 'I have two cats.', de: 'Ich habe zwei Katzen.' },
        { id: 'u5s3', zh: '你 要 三 个 鸡蛋 吗？', py: 'Nǐ yào sān ge jīdàn ma？', en: 'Do you want three eggs?', de: 'Möchtest du drei Eier?',
          alt: { zh: ['您 要 三 个 鸡蛋 吗？'], en: ['Would you like three eggs?'], de: ['Willst du drei Eier?', 'Möchten Sie drei Eier?'] } },
        { id: 'u5s4', zh: '他 十 岁。', py: 'Tā shí suì。', en: 'He is ten years old.', de: 'Er ist zehn Jahre alt.',
          alt: { zh: ['他 十 岁 了。'], en: ['He is ten.'], de: ['Er ist zehn.'] } },
        { id: 'u5s5', zh: '这 个 苹果 是 红色 的。', py: 'Zhè ge píngguǒ shì hóngsè de。', en: 'This apple is red.', de: 'Dieser Apfel ist rot.' },
        { id: 'u5s6', zh: '香蕉 是 黄色 的。', py: 'Xiāngjiāo shì huángsè de。', en: 'Bananas are yellow.', de: 'Bananen sind gelb.',
          alt: { en: ['The banana is yellow.'], de: ['Die Banane ist gelb.'] } },
        { id: 'u5s7', zh: '这 只 鸟 是 绿色 的。', py: 'Zhè zhī niǎo shì lǜsè de。', en: 'This bird is green.', de: 'Dieser Vogel ist grün.' },
        { id: 'u5s8', zh: '你 喜欢 蓝色 吗？', py: 'Nǐ xǐhuan lánsè ma？', en: 'Do you like blue?', de: 'Magst du Blau?',
          alt: { zh: ['您 喜欢 蓝色 吗？'], en: ['Do you like the colour blue?', 'Do you like the color blue?'],
                 de: ['Magst du die Farbe Blau?', 'Mögen Sie Blau?'] } },
        { id: 'u5s9', zh: '我 有 一 只 黑色 的 狗。', py: 'Wǒ yǒu yì zhī hēisè de gǒu。', en: 'I have a black dog.', de: 'Ich habe einen schwarzen Hund.',
          alt: { zh: ['我 有 一 条 黑色 的 狗。'] } },
        { id: 'u5s10', zh: '她 有 一 只 白色 的 兔子。', py: 'Tā yǒu yì zhī báisè de tùzi。', en: 'She has a white rabbit.', de: 'Sie hat ein weißes Kaninchen.',
          alt: { de: ['Sie hat einen weißen Hasen.'] } }
      ]
    },

    // ───────────────────────── 6 家与日常 ─────────────────────────
    {
      id: 'u6',
      icon: '🏡',
      color: 'green',
      title: { zh: '家与日常', en: 'Home & daily life' },
      desc:  { zh: '家、学校和每天做的事', en: 'Home, school and everyday activities' },
      tips: {
        en: '主语是 he/she/it 时，一般现在时的动词要加 -s：I work → she works。正在做的事用 be + 动词-ing：I am reading a book。',
        de: '德语陈述句中变位动词总在第二位：Morgen gehe ich in die Schule。morgen（明天）是副词要小写，der Morgen（早上）是名词要大写。',
        den: 'In a statement the conjugated verb always comes second: Morgen gehe ich in die Schule. morgen (tomorrow) is an adverb in lower case; der Morgen (the morning) is a noun.',
        zh: 'Time words like 今天 (today) and 明天 (tomorrow) go before the verb, either before or after the subject: 我明天去学校 or 明天我去学校. Chinese verbs never change for tense or person.'
      },
      words: [
        { id: 'house',    emoji: '🏠', zh: '房子', py: 'fángzi',   en: 'house',    de: 'das Haus' },
        { id: 'school',   emoji: '🏫', zh: '学校', py: 'xuéxiào',  en: 'school',   de: 'die Schule' },
        { id: 'book',     emoji: '📖', zh: '书',   py: 'shū',      en: 'book',     de: 'das Buch' },
        { id: 'car',      emoji: '🚗', zh: '汽车', py: 'qìchē',    en: 'car',      de: 'das Auto' },
        { id: 'city',     emoji: '🏙️', zh: '城市', py: 'chéngshì', en: 'city',     de: 'die Stadt' },
        { id: 'today',    emoji: '📅', zh: '今天', py: 'jīntiān',  en: 'today',    de: 'heute' },
        { id: 'tomorrow', emoji: '🔜', zh: '明天', py: 'míngtiān', en: 'tomorrow', de: 'morgen' },
        { id: 'work',     emoji: '💼', zh: '工作', py: 'gōngzuò',  en: 'work',     de: 'arbeiten' },
        { id: 'sleep',    emoji: '😴', zh: '睡觉', py: 'shuìjiào', en: 'sleep',    de: 'schlafen' },
        { id: 'eat',      emoji: '🍽️', zh: '吃',   py: 'chī',      en: 'eat',      de: 'essen' }
      ],
      sentences: [
        { id: 'u6s1', zh: '我 今天 很 忙。', py: 'Wǒ jīntiān hěn máng。', en: 'I am busy today.', de: 'Ich bin heute beschäftigt.',
          alt: { zh: ['今天 我 很 忙。'], en: ['I am very busy today.', 'Today I am busy.', 'Today I am very busy.'],
                 de: ['Heute bin ich beschäftigt.', 'Ich bin heute sehr beschäftigt.', 'Heute bin ich sehr beschäftigt.'] } },
        { id: 'u6s2', zh: '明天 我 去 学校。', py: 'Míngtiān wǒ qù xuéxiào。', en: 'I am going to school tomorrow.', de: 'Morgen gehe ich in die Schule.',
          alt: { zh: ['我 明天 去 学校。'],
                 en: ['I will go to school tomorrow.', 'I go to school tomorrow.', 'Tomorrow I am going to school.', 'Tomorrow I will go to school.', 'Tomorrow I go to school.'],
                 de: ['Ich gehe morgen in die Schule.', 'Morgen gehe ich zur Schule.', 'Ich gehe morgen zur Schule.'] } },
        { id: 'u6s3', zh: '我 住 在 一 个 大 城市。', py: 'Wǒ zhù zài yí ge dà chéngshì。', en: 'I live in a big city.', de: 'Ich wohne in einer großen Stadt.',
          alt: { en: ['I live in a large city.'], de: ['Ich lebe in einer großen Stadt.'] } },
        { id: 'u6s4', zh: '这 是 我 的 房子。', py: 'Zhè shì wǒ de fángzi。', en: 'This is my house.', de: 'Das ist mein Haus.' },
        { id: 'u6s5', zh: '你 有 汽车 吗？', py: 'Nǐ yǒu qìchē ma？', en: 'Do you have a car?', de: 'Hast du ein Auto?',
          alt: { zh: ['您 有 汽车 吗？', '你 有 车 吗？'], de: ['Haben Sie ein Auto?'] } },
        { id: 'u6s6', zh: '我 在 看 书。', py: 'Wǒ zài kàn shū。', en: 'I am reading a book.', de: 'Ich lese ein Buch.',
          alt: { zh: ['我 正在 看 书。'], en: ['I am reading.'], de: ['Ich lese gerade ein Buch.', 'Ich lese gerade.'] } },
        { id: 'u6s7', zh: '猫 在 睡觉。', py: 'Māo zài shuìjiào。', en: 'The cat is sleeping.', de: 'Die Katze schläft.',
          alt: { zh: ['猫 正在 睡觉。'], de: ['Die Katze schläft gerade.'] } },
        { id: 'u6s8', zh: '我们 吃 饭 吧！', py: 'Wǒmen chī fàn ba！', en: 'Let\'s eat!', de: 'Lass uns essen!',
          alt: { de: ['Lasst uns essen!', 'Essen wir!'] } },
        { id: 'u6s9', zh: '你 明天 工作 吗？', py: 'Nǐ míngtiān gōngzuò ma？', en: 'Are you working tomorrow?', de: 'Arbeitest du morgen?',
          alt: { zh: ['明天 你 工作 吗？', '您 明天 工作 吗？'], en: ['Do you work tomorrow?', 'Will you work tomorrow?'], de: ['Arbeiten Sie morgen?'] } },
        { id: 'u6s10', zh: '我们 的 学校 很 大。', py: 'Wǒmen de xuéxiào hěn dà。', en: 'Our school is big.', de: 'Unsere Schule ist groß.',
          alt: { zh: ['我们 学校 很 大。'], en: ['Our school is very big.'], de: ['Unsere Schule ist sehr groß.'] } }
      ]
    },

    // ───────────────────────── 7 出行 ─────────────────────────
    {
      id: 'u7',
      icon: '🧭',
      color: 'amber',
      title: { zh: '出行', en: 'Travel' },
      desc:  { zh: '车站、机场和酒店', en: 'Stations, airports and hotels' },
      tips: {
        en: '问地点用 Where is …?：Where is the station?（火车站在哪儿？）说乘坐交通工具用 by：by train、by plane。',
        de: '德语表示乘坐交通工具用 mit 加第三格：mit dem Zug（坐火车）。去某个地方常用 zu：zum Flughafen（= zu dem Flughafen）。',
        den: 'Use mit plus the dative for transport: mit dem Zug (by train). To say where you are going, zu is common: zum Flughafen (= zu dem Flughafen).',
        zh: 'Ask where something is with 在哪儿 (zài nǎr): 机场在哪儿？ The means of transport comes before the main verb: 坐火车去 (zuò huǒchē qù) = to go by train.'
      },
      words: [
        { id: 'train',    emoji: '🚆', zh: '火车',   py: 'huǒchē',      en: 'train',    de: 'der Zug' },
        { id: 'plane',    emoji: '✈️', zh: '飞机',   py: 'fēijī',       en: 'plane',    de: 'das Flugzeug' },
        { id: 'hotel',    emoji: '🏨', zh: '酒店',   py: 'jiǔdiàn',     en: 'hotel',    de: 'das Hotel' },
        { id: 'ticket',   emoji: '🎫', zh: '票',     py: 'piào',        en: 'ticket',   de: 'das Ticket' },
        { id: 'airport',  emoji: '🛫', zh: '机场',   py: 'jīchǎng',     en: 'airport',  de: 'der Flughafen' },
        { id: 'map',      emoji: '🗺️', zh: '地图',   py: 'dìtú',        en: 'map',      de: 'die Karte' },
        { id: 'beach',    emoji: '🏖️', zh: '海滩',   py: 'hǎitān',      en: 'beach',    de: 'der Strand' },
        { id: 'passport', emoji: '🛂', zh: '护照',   py: 'hùzhào',      en: 'passport', de: 'der Reisepass' },
        { id: 'suitcase', emoji: '🧳', zh: '行李箱', py: 'xínglixiāng', en: 'suitcase', de: 'der Koffer' },
        { id: 'station',  emoji: '🚉', zh: '火车站', py: 'huǒchēzhàn',  en: 'station',  de: 'der Bahnhof' }
      ],
      sentences: [
        { id: 'u7s1', zh: '我们 坐 火车 去。', py: 'Wǒmen zuò huǒchē qù。', en: 'We are going by train.', de: 'Wir fahren mit dem Zug.',
          alt: { en: ['We go by train.', 'We will go by train.', 'We are taking the train.', 'We take the train.'], de: ['Wir nehmen den Zug.'] } },
        { id: 'u7s2', zh: '火车站 在 哪儿？', py: 'Huǒchēzhàn zài nǎr？', en: 'Where is the train station?', de: 'Wo ist der Bahnhof?',
          alt: { zh: ['火车站 在 哪里？'], en: ['Where is the station?'] } },
        { id: 'u7s3', zh: '我 要 两 张 票。', py: 'Wǒ yào liǎng zhāng piào。', en: 'I want two tickets.', de: 'Ich möchte zwei Tickets.',
          alt: { en: ['I would like two tickets.'], de: ['Ich will zwei Tickets.', 'Ich möchte zwei Fahrkarten.', 'Ich hätte gern zwei Tickets.'] } },
        { id: 'u7s4', zh: '我 的 护照 在 哪儿？', py: 'Wǒ de hùzhào zài nǎr？', en: 'Where is my passport?', de: 'Wo ist mein Reisepass?',
          alt: { zh: ['我 的 护照 在 哪里？'], de: ['Wo ist mein Pass?'] } },
        { id: 'u7s5', zh: '我 想 去 海滩。', py: 'Wǒ xiǎng qù hǎitān。', en: 'I want to go to the beach.', de: 'Ich möchte an den Strand gehen.',
          alt: { en: ['I would like to go to the beach.'],
                 de: ['Ich will an den Strand gehen.', 'Ich möchte zum Strand gehen.', 'Ich will zum Strand gehen.', 'Ich möchte an den Strand.'] } },
        { id: 'u7s6', zh: '我 在 飞机 上。', py: 'Wǒ zài fēijī shang。', en: 'I am on the plane.', de: 'Ich bin im Flugzeug.',
          alt: { en: ['I am on a plane.'], de: ['Ich sitze im Flugzeug.'] } },
        { id: 'u7s7', zh: '你 有 地图 吗？', py: 'Nǐ yǒu dìtú ma？', en: 'Do you have a map?', de: 'Hast du eine Karte?',
          alt: { zh: ['您 有 地图 吗？'], de: ['Haben Sie eine Karte?', 'Hast du eine Landkarte?', 'Hast du einen Stadtplan?'] } },
        { id: 'u7s8', zh: '这 家 酒店 很 贵。', py: 'Zhè jiā jiǔdiàn hěn guì。', en: 'This hotel is expensive.', de: 'Dieses Hotel ist teuer.',
          alt: { zh: ['这 个 酒店 很 贵。'], en: ['This hotel is very expensive.'], de: ['Dieses Hotel ist sehr teuer.'] } },
        { id: 'u7s9', zh: '我 的 行李箱 很 重。', py: 'Wǒ de xínglixiāng hěn zhòng。', en: 'My suitcase is heavy.', de: 'Mein Koffer ist schwer.',
          alt: { en: ['My suitcase is very heavy.'], de: ['Mein Koffer ist sehr schwer.'] } },
        { id: 'u7s10', zh: '我们 明天 去 机场。', py: 'Wǒmen míngtiān qù jīchǎng。', en: 'We are going to the airport tomorrow.', de: 'Wir fahren morgen zum Flughafen.',
          alt: { zh: ['明天 我们 去 机场。'],
                 en: ['We will go to the airport tomorrow.', 'We go to the airport tomorrow.', 'Tomorrow we are going to the airport.', 'Tomorrow we will go to the airport.'],
                 de: ['Morgen fahren wir zum Flughafen.'] } }
      ]
    },

    // ───────────────────────── 8 时间与天气 ─────────────────────────
    {
      id: 'u8',
      icon: '🌦️',
      color: 'red',
      title: { zh: '时间与天气', en: 'Time & weather' },
      desc:  { zh: '谈论天气和一天中的时间', en: 'Talk about the weather and times of day' },
      tips: {
        en: '英语谈天气时用 it 作主语：It is cold（天冷）、It is raining（在下雨）。',
        de: '德语谈天气也用 es 作主语：Es regnet，Es ist kalt。说自己冷要用 Mir ist kalt，不能说 Ich bin kalt。',
        den: 'Weather sentences use es as the subject: Es regnet, Es ist kalt. To say you feel cold, use Mir ist kalt, not Ich bin kalt.',
        zh: '下雨 (xià yǔ) means "to rain" and 下雪 (xià xuě) "to snow", literally "fall rain/snow". Adjectives such as 冷 (cold) usually take 很 (hěn) in statements, even when "very" is not meant.'
      },
      words: [
        { id: 'sun',     emoji: '☀️', zh: '太阳', py: 'tàiyáng',  en: 'sun',     de: 'die Sonne' },
        { id: 'rain',    emoji: '🌧️', zh: '雨',   py: 'yǔ',       en: 'rain',    de: 'der Regen' },
        { id: 'snow',    emoji: '❄️', zh: '雪',   py: 'xuě',      en: 'snow',    de: 'der Schnee' },
        { id: 'wind',    emoji: '🌬️', zh: '风',   py: 'fēng',     en: 'wind',    de: 'der Wind' },
        { id: 'cold',    emoji: '🥶', zh: '冷',   py: 'lěng',     en: 'cold',    de: 'kalt' },
        { id: 'hot',     emoji: '🥵', zh: '热',   py: 'rè',       en: 'hot',     de: 'heiß' },
        { id: 'morning', emoji: '⏰', zh: '早上', py: 'zǎoshang', en: 'morning', de: 'der Morgen' },
        { id: 'evening', emoji: '🌇', zh: '晚上', py: 'wǎnshang', en: 'evening', de: 'der Abend' },
        { id: 'week',    emoji: '🗓️', zh: '星期', py: 'xīngqī',   en: 'week',    de: 'die Woche' },
        { id: 'time',    emoji: '⏳', zh: '时间', py: 'shíjiān',  en: 'time',    de: 'die Zeit' }
      ],
      sentences: [
        { id: 'u8s1', zh: '我 很 冷。', py: 'Wǒ hěn lěng。', en: 'I am cold.', de: 'Mir ist kalt.',
          alt: { en: ['I am very cold.', 'I feel cold.'], de: ['Mir ist sehr kalt.'] } },
        { id: 'u8s2', zh: '今天 下 雨。', py: 'Jīntiān xià yǔ。', en: 'It is raining today.', de: 'Heute regnet es.',
          alt: { en: ['Today it is raining.', 'It will rain today.'], de: ['Es regnet heute.'] } },
        { id: 'u8s3', zh: '明天 会 下 雪 吗？', py: 'Míngtiān huì xià xuě ma？', en: 'Will it snow tomorrow?', de: 'Schneit es morgen?',
          alt: { en: ['Is it going to snow tomorrow?'], de: ['Wird es morgen schneien?'] } },
        { id: 'u8s4', zh: '我 喜欢 太阳。', py: 'Wǒ xǐhuan tàiyáng。', en: 'I like the sun.', de: 'Ich mag die Sonne.' },
        { id: 'u8s5', zh: '外面 风 很 大。', py: 'Wàimian fēng hěn dà。', en: 'It is very windy outside.', de: 'Draußen ist es sehr windig.',
          alt: { en: ['It is windy outside.', 'Outside it is very windy.', 'The wind is strong outside.'],
                 de: ['Es ist draußen sehr windig.', 'Draußen ist es windig.', 'Es ist draußen windig.'] } },
        { id: 'u8s6', zh: '今天 热 吗？', py: 'Jīntiān rè ma？', en: 'Is it hot today?', de: 'Ist es heute heiß?',
          alt: { zh: ['今天 热 不 热？'] } },
        { id: 'u8s7', zh: '我 早上 喝 咖啡。', py: 'Wǒ zǎoshang hē kāfēi。', en: 'I drink coffee in the morning.', de: 'Ich trinke morgens Kaffee.',
          alt: { zh: ['早上 我 喝 咖啡。'], en: ['I drink coffee in the mornings.', 'In the morning I drink coffee.'],
                 de: ['Morgens trinke ich Kaffee.', 'Ich trinke am Morgen Kaffee.', 'Am Morgen trinke ich Kaffee.'] } },
        { id: 'u8s8', zh: '我 晚上 工作。', py: 'Wǒ wǎnshang gōngzuò。', en: 'I work in the evening.', de: 'Ich arbeite abends.',
          alt: { zh: ['晚上 我 工作。'], en: ['I work in the evenings.', 'In the evening I work.', 'I work at night.'],
                 de: ['Abends arbeite ich.', 'Ich arbeite am Abend.', 'Am Abend arbeite ich.'] } },
        { id: 'u8s9', zh: '下 个 星期 见！', py: 'Xià ge xīngqī jiàn！', en: 'See you next week!', de: 'Bis nächste Woche!',
          alt: { zh: ['下 周 见！'], de: ['Wir sehen uns nächste Woche!'] } },
        { id: 'u8s10', zh: '我 没有 时间。', py: 'Wǒ méiyǒu shíjiān。', en: 'I don\'t have time.', de: 'Ich habe keine Zeit.',
          alt: { zh: ['我 没 时间。'], en: ['I have no time.', 'I don\'t have any time.'] } }
      ]
    }
  ]
};
