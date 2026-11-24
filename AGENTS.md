# AGENTS.md：多语（游戏化语言学习PWA）

多语是一个自用的手机PWA，玩法参考游戏化背单词App（闯关路径、红心、连胜、经验、宝石），但名字、吉祥物（小橘）、配色、图标都是原创的，不要换成任何现成App的名字、角色或美术。四门课程：英语（中文学）、德语（中文学）、中文（英语学）、德语（英语学）。纯静态页面：原生HTML/CSS/JS，无构建、无后端、无npm依赖，在Safari“添加到主屏幕”后全屏离线使用。

线上地址：https://zimocun.github.io/duoyu/ （GitHub Pages，`main`分支根目录）。

## 运行、测试、发布
- 本机预览：在本目录运行`python -m http.server 8766 --bind 127.0.0.1`，打开`http://127.0.0.1:8766/`（`.claude/launch.json`里也有这个配置）。改完刷新即可。
- 内容检查：`node tools/check-data.js`（检查`js/data.js`加`js/data-de.js`），改了内容必须跑通。
- 德语第9–100单元的源文件在`content/de-u*-u*.js`（每个分片若干单元，写法见`content/EXAMPLE.js`，大纲和每单元分配的词在`content/CURRICULUM.md`）。改分片后运行`node tools/merge-de.js`重新生成`js/data-de.js`，再跑检查；单独检查一个分片：`node tools/check-data.js content/de-u9-u18.js`。
- 没有自动化测试，手动走一遍：引导页、四门课切换、每种题型（看图选词、选意思、听音选词、配对、词块翻译、键盘作答、听写、填空）、答错扣红心、红心用完、退出确认、结算页与连胜页、宝箱、练习三种模式、商店购买、设置开关。
- 桌面上可用数字键选项、回车检查/继续、退格撤回词块。
- 只在localhost/127.0.0.1下有调试入口`window.__dyl`（`ls()`当前课程状态、`s()`存档、`judge`、`norm`、`gen`出题、`cn`各课程关卡、`body`题目HTML），可用来在浏览器里自动答题走查，或对每门课的每个关卡批量出题、检查每道题都能答对。
- 图标：`python tools/make-icons.py`重新生成`icons/`。
- Service worker只在HTTPS下注册；本机http预览不走缓存。
- 发布（只有用户明确要求才做）：`git add -A`、`git commit -m "<中文一句话>"`、`git push origin main`，Pages约一分钟生效。GitHub登录由用户自己操作，不要代输入验证码或密码。

## 文件速览
- `index.html`：唯一页面（顶栏、四个视图、标签栏、`#lesson`课程层、`#screen`全屏页、`#sheet`底部弹层）。
- `js/data.js`：`window.DL.units`，第1–8单元（四门课共用），每单元10个词、10个句子，三语平行（zh/py/en/de）。
- `js/data-de.js`：第9–100单元，由`tools/merge-de.js`从`content/`合并生成，不要手改。单元带`courses: ['de','den']`（只在两门德语课出现）和`level`（A1/A2/B1），没有拼音；单词id带单元前缀（`u9_euro`），`emoji`可省略（抽象词没有图，出题时改用新词卡和选意思）。分词约定：句子里的词用半角空格分隔，中文按词分、拼音与之一一对应，标点贴在前一个词上；德语名词带冠词；`alt`是可接受的其他译法；`tips`按课程id存（en/de用中文写，zh/den用英文写）。
- `js/app.js`：全部逻辑（IIFE）。出题`genNode/genPractice`，答题`check/judge/norm`，结算`complete`，界面`renderLearn/renderPractice/renderShop/renderMe`，文字表`STR`（zh/en两套，界面语言=课程母语）。课程定义在`COURSES`/`ORDER`，课程id（en/de/zh/den）是存档的键，target/source决定学什么、用什么语言学。
- `css/app.css`：样式，颜色走`:root`变量，深色模式跟随系统。
- `sw.js`：缓存先行加后台更新；`manifest.webmanifest`：PWA清单。

## 规则
- 改了`index.html`、`css/`、`js/`、`icons/`，要同时提高`sw.js`里的`CACHE`（现为`dyl-v3`，下次`dyl-v4`），否则已安装的手机拿不到新版。新增要离线可用的文件要加进`FILES`并确认存在。
- 单元可以用`courses`限定出现在哪些课程（`CU`/`CN`是每门课自己的单元和关卡列表）；单元编号按课程内顺序显示。路径上当前单元之后再往后的单元折叠成一条，分级课程显示A1/A2/B1分段。
- 每单元的关卡固定为6个：新单词1、新单词2、宝箱、句子1、句子2、单元测验（`KINDS`），进度按`<单元id>-<序号>`存，改顺序会打乱已有进度。
- 存档只在本机`localStorage`的`dyl.state`，读写都包try/catch；不加联网请求、统计、第三方脚本。
- 不要提交或推送，除非用户要求。文档、代码、提交信息里不要出现个人信息。
- 界面文字中文为主，汉字与数字、英文之间按现有写法（文字表里留空格的地方保持一致）。
