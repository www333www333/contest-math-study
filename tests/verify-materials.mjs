import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFileSync(resolve(root, file), 'utf8');
const index = read('index.html');
const quiz = read('quiz-data.js');
const knowledge = read('knowledge-data.js');
const failures = [];

const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const materialRefs = [...new Set(
  [index, quiz, knowledge]
    .flatMap(source => source.match(/materials\/[^'"`\s<>]+\.pdf/g) || [])
)];

for (const ref of materialRefs) {
  assert(existsSync(resolve(root, ref)), `引用的文件不存在：${ref}`);
}

const expectedHashes = {
  'materials/2009-01/answer.pdf': 'F3C22E61C5E368738354EEE973A18FBBA72615704A4D5CFF90D80ABA28BAC324',
  'materials/2009-01/final-answer.pdf': '58A36AFC1C1F70B3CF65B1E333DE1C3A585139703D1894B40D656E288F3262ED',
  'materials/2010-02/final-paper.pdf': '5AED044497390CCB9044E6E087372CEF8DAB3AD284244BD97B2EF87FC2434C08',
  'materials/2014-06/non-math-prelim-only.pdf': 'E6511B6DEDB542CBA718434802B4D9AF472359C9360EF64D88905BD985C7668D',
  'materials/2015-07/final-complete.pdf': '8AC61F02D910C37C14E92E736D124CFA88C6CF7EC5757AFF65033D96BC83176A',
  'materials/2016-08/final-complete.pdf': '98C3340052853FA77B88BE0FCF1AA2BB27110277A60FF1EF20AE0A907DB01C7A',
  'materials/2017-09/final-paper.pdf': '6DF17C666E670F0DA01D1147381F789FBEE9FBB1621E687F4E49201FD1576B24',
  'materials/2018-10/document-02.pdf': '34E84A978702FCA56D48DE326D315179725637887B51F272A5967EBD5B9C4642',
  'materials/2021-13/non-math-prelim-makeup-answer.pdf': 'EDCA45F5BAEC5B51396D1C1F420B20C36E273590EDE4226180408F70C5CB2AED',
  'materials/2024-16/non-math-b-prelim-answer.pdf': '71B70C2CE9D8728BBCDAB3374E269DF5F0068DE51BFAA80CDD2AA7AA0BA0C540',
  'materials/2024-16/non-math-b-final-answer.pdf': 'A909C7816A41EAA8484127AA2CE16C6D84BCFD1D2426433B901CA8FA1A805248',
  'materials/2025-17/non-math-b-prelim-answer.pdf': 'CBBD7D5C3B4EA5C886CF5096F4AD831740228BB38440FC3B19EA995461A09309'
};

for (const [relativePath, expected] of Object.entries(expectedHashes)) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) continue;
  const actual = createHash('sha256').update(readFileSync(absolutePath)).digest('hex').toUpperCase();
  assert(actual === expected, `材料内容已变化，需重新核验届次：${relativePath}`);
}

const archive = index.match(/<div class="archive-grid" id="archiveGrid">([\s\S]*?)<\/div>\s*<p class="archive-empty"/u)?.[1] || '';
const archivePdfCount = (archive.match(/href="materials\/[^"\s]+\.pdf"/g) || []).length;
const declaredCount = Number(index.match(/已整理 17 届 · (\d+) 份试卷与参考答案/u)?.[1]);
assert(archivePdfCount === declaredCount, `真题库标注 ${declaredCount} 份，实际链接 ${archivePdfCount} 份`);

assert(!existsSync(resolve(root, 'materials/2021-13/non-math-answer.pdf')), '第13届目录仍含数电期末试卷');
assert(index.includes('第 17 届 · 非数学 A/B 类'), '第17届分类没有标为“非数学 A/B 类”');
assert(!index.includes('第 17 届 · 数学 A 类'), '第17届仍残留错误的“数学 A 类”标签');

assert(quiz.includes('f(x)cos x + 2∫₀ˣ f(t)sin t dt = x + 1'), '第9届底层题面仍未同步为 x+1');
assert(!quiz.includes('= 1 + sin x</span>'), '第9届仍残留错误右端 1+sin x');
assert(quiz.includes("answer:'3y/x − 2ln|y/x| + C'"), '第11届底层答案仍未同步为 3y/x');
assert(quiz.includes('\\frac{(x-\\sin x)e^{-x^2}}{\\sqrt{1-x^3}-1}'), '第12届 LaTeX 题面不是原卷根式极限');
assert(quiz.includes("answer:'−1 / 3'"), '第12届底层答案不是 -1/3');
assert(!quiz.includes('e^{x-\\sin x}-1'), '第12届仍残留不属于原卷的指数极限');

const pdftotext = spawnSync('pdftotext', ['-v'], { encoding: 'utf8' });
if (!pdftotext.error) {
  const pdfText = relativePath => {
    const result = spawnSync('pdftotext', ['-layout', resolve(root, relativePath), '-'], {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024
    });
    assert(result.status === 0, `无法读取 PDF：${relativePath}`);
    return result.stdout || '';
  };

  const round1Prelim = pdfText('materials/2009-01/answer.pdf');
  assert(round1Prelim.includes('2009') && round1Prelim.includes('非数学类'), '第1届初赛题解内容或年份不符');

  const round1Final = pdfText('materials/2009-01/final-answer.pdf');
  assert(round1Final.includes('决赛试卷参考答案') && round1Final.includes('2010'), '第1届决赛题解内容或年份不符');

  const round6 = pdfText('materials/2014-06/non-math-prelim-only.pdf');
  assert(round6.includes('第六届') && round6.includes('2014'), '第6届初赛题解内容或年份不符');
  assert(!round6.includes('第七届'), '第6届 PDF 仍混有第7届页面');
} else {
  console.warn('未找到 pdftotext，已跳过 PDF 正文标记核验。');
}

if (failures.length) {
  console.error(`材料一致性检查失败（${failures.length} 项）：`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`材料一致性检查通过：${materialRefs.length} 个引用文件、${archivePdfCount} 个真题库链接。`);
