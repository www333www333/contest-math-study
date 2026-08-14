window.quizQuestions = [
  {id:'e01-q02',edition:1,year:2009,topic:'积分方程',difficulty:'基础',title:'由积分方程确定函数',question:'设连续函数 f(x) 满足：<span class="formula-line">f(x) = 3x² − ∫₀² f(t)dt − 2</span>，求 f(x)。',answer:'f(x) = 3x² − 10/3',knowledge:'把含未知函数的定积分看作常数；积分方程代数化。',solutions:[{name:'方法一 · 设常数',steps:['设 <mark>C = ∫₀² f(t)dt</mark>，原式成为 f(x)=3x²−C−2。','两边在 [0,2] 上积分：C=∫₀²(3x²−C−2)dx。','计算得 C=8−2C−4，即 <em>3C=4</em>，所以 C=4/3。','代回得到 <strong>f(x)=3x²−10/3</strong>。']},{name:'方法二 · 直接积分',steps:['直接对原式在 [0,2] 上积分。','注意 ∫₀²[∫₀²f(t)dt]dx = 2∫₀²f(t)dt。','解出该定积分后代回原式。']}],mistake:'题干的积分变量是哑变量；不要把 ∫f(t)dt 误当成 x 的函数。',source:'materials/2009-01/paper.pdf'},
  {id:'e02-q01',edition:2,year:2010,topic:'数列极限',difficulty:'基础',title:'乘积型数列极限',question:'设 |a|<1，<span class="formula-line">xₙ=(1+a)(1+a²)…(1+a²ⁿ)</span>，求 lim xₙ。',answer:'1 / (1 − a)',knowledge:'平方指数乘积；利用 (1−a) 的逐项消去。',solutions:[{name:'方法一 · 乘法消去',steps:['在乘积前乘以 (1−a)。','使用 (1−a)(1+a)=1−a²，再与 (1+a²) 相乘得到 1−a⁴。','逐次消去得 <mark>(1−a)xₙ=1−a^(2ⁿ⁺¹)</mark>。','由 |a|<1，幂趋于 0，所以极限为 <strong>1/(1−a)</strong>。']},{name:'方法二 · 递推观察',steps:['写出前几项：x₀=1+a，x₁=(1−a⁴)/(1−a)。','归纳得到 xₙ=(1−a^(2ⁿ⁺¹))/(1−a)。','再取极限。']}],mistake:'指数是 2 的幂而不是 2n；最终余项为 a^(2ⁿ⁺¹)。',source:'materials/2010-02/document-01.pdf'},
  {id:'e03-q02',edition:3,year:2011,topic:'三角极限',difficulty:'基础',title:'连乘公式求极限',question:'设 <span class="formula-line">aₙ=cos(θ/2)cos(θ/2²)…cos(θ/2ⁿ)</span>，求 lim aₙ。',answer:'θ=0 时为 1；θ≠0 时为 sinθ / θ',knowledge:'二倍角公式；有限连乘化简。',solutions:[{name:'方法一 · 二倍角',steps:['反复使用 sin x=2sin(x/2)cos(x/2)。','得到 <mark>aₙ = sinθ / [2ⁿ sin(θ/2ⁿ)]</mark>。','利用 sin u ~ u，分母趋于 θ。','故 θ≠0 时极限为 sinθ/θ；θ=0 时各因子均为 1。']},{name:'方法二 · 对数法',steps:['对乘积取对数：ln aₙ=Σln cos(θ/2ᵏ)。','用 ln cos u = −u²/2+o(u²) 判断收敛。','结合二倍角恒等式确定极限的精确值。']}],mistake:'θ=0 需要单独说明；直接写 sinθ/θ 会出现 0/0。',source:'materials/2011-03/document-01.pdf'},
  {id:'e04-q01',edition:4,year:2012,topic:'数列极限',difficulty:'基础',title:'阶乘根式极限',question:'求极限 <span class="formula-line">limₙ→∞ (n!)^(1/n²)</span>。',answer:'1',knowledge:'取对数；夹逼估计 ln(n!)。',solutions:[{name:'方法一 · 对数夹逼',steps:['设 Lₙ=(n!)^(1/n²)，则 ln Lₙ=ln(n!)/n²。','有 0≤ln(n!)≤n ln n。','因此 0≤ln Lₙ≤ln n/n→0。','故 <strong>Lₙ→e⁰=1</strong>。']},{name:'方法二 · 直接夹逼',steps:['由 n!≤nⁿ，得 1≤(n!)^(1/n²)≤n^(1/n)。','而 n^(1/n)→1。','由夹逼准则，原极限为 1。']}],mistake:'根指数是 n²；若看成 n 次根会得到不同结论。',source:'materials/2012-04/document-01.pdf'},
  {id:'e05-q02',edition:5,year:2013,topic:'反常积分',difficulty:'中等',title:'证明反常积分非绝对收敛',question:'证明反常积分 <span class="formula-line">∫₀^∞ sin x / x dx</span> 不是绝对收敛的。',answer:'∫₀^∞ |sin x|/x dx 发散，所以不绝对收敛',knowledge:'反常积分；比较判别法；分区间估计。',solutions:[{name:'方法一 · 分段比较',steps:['令 aₙ=∫ₙπ^(n+1)π |sin x|/x dx。','在该区间上 1/x≥1/[(n+1)π]。','故 aₙ≥2/[(n+1)π]。','调和级数发散，因此 Σaₙ 发散。']},{name:'方法二 · 固定子区间',steps:['在每个周期中取 sin x≥1/2 的固定长度区间。','该区间上的积分不小于常数乘 1/n。','下界级数为调和型，所以绝对值积分发散。']}],mistake:'“不绝对收敛”不等于原积分发散；原积分实际上条件收敛。',source:'materials/2013-05/document-01.pdf'},
  {id:'e06-q01',edition:6,year:2014,topic:'微分方程',difficulty:'基础',title:'由基本解反求微分方程',question:'已知 y₁=eˣ 和 y₂=xeˣ 是某二阶齐次常系数线性微分方程的解，求该方程。',answer:'y″ − 2y′ + y = 0',knowledge:'常系数线性微分方程；二重特征根。',solutions:[{name:'方法一 · 特征根',steps:['eˣ 对应特征根 r=1。','xeˣ 与 eˣ 同时出现，说明 r=1 是<mark>二重根</mark>。','特征多项式为 (r−1)²=r²−2r+1。','所以方程为 <strong>y″−2y′+y=0</strong>。']},{name:'方法二 · 待定系数',steps:['设方程为 y″+ay′+by=0。','分别代入 eˣ 与 xeˣ。','比较 x 项与常数项，解得 a=−2，b=1。']}],mistake:'xeˣ 不是另一个不同特征根，而是二重根对应的第二个线性无关解。',source:'materials/2014-06/non-math-prelim-only.pdf'},
  {id:'e07-q03',edition:7,year:2015,topic:'多元积分',difficulty:'中等',title:'切平面与抛物面围成的体积',question:'曲面 z=x²+y²+1 在 M(1,−1,3) 处的切平面与曲面 z=x²+y² 所围区域体积是多少？',answer:'π / 2',knowledge:'切平面；二重积分；平移极坐标。',solutions:[{name:'方法一 · 投影积分',steps:['切平面为 z=2x−2y−1。','与 z=x²+y² 联立，投影域为 <mark>(x−1)²+(y+1)²≤1</mark>。','高度差为 1−(x−1)²−(y+1)²。','平移后用极坐标：∫₀²π∫₀¹(1−r²)rdrdθ=<strong>π/2</strong>。']},{name:'方法二 · 标准抛物体',steps:['平移坐标 u=x−1，v=y+1。','区域化为单位圆，高度为 1−u²−v²。','这是高为 1、底半径为 1 的抛物体，体积等于底面积×高/2=π/2。']}],mistake:'切平面常数项容易算错；必须代入 M 检查平面是否经过该点。',source:'materials/2015-07/document-01.pdf'},
  {id:'e08-q01',edition:8,year:2016,topic:'函数极限',difficulty:'中等',title:'可导函数构造重要极限',question:'若 f 在 x=a 处可导且 f(a)≠0，求 <span class="formula-line">limₙ→∞ [f(a+1/n)/f(a)]ⁿ</span>。',answer:'exp(f′(a) / f(a))',knowledge:'1^∞ 型极限；可导展开；对数化。',solutions:[{name:'方法一 · 一阶展开',steps:['由可导性：f(a+h)=f(a)+f′(a)h+o(h)。','令 h=1/n，底数为 1+f′(a)/[nf(a)]+o(1/n)。','套用 <mark>(1+c/n)ⁿ→eᶜ</mark>。','答案为 <strong>e^(f′(a)/f(a))</strong>。']},{name:'方法二 · 取对数',steps:['设极限为 L，对表达式取对数。','ln L=lim n[ln f(a+1/n)−ln f(a)]。','这是 ln f 在 a 点的导数，等于 f′(a)/f(a)。','指数还原得到结论。']}],mistake:'由 f(a)≠0 可知比值最终为正；取对数时应使用 ln|f|，不能直接写 ln f。',source:'materials/2016-08/non-math-prelim-answer.pdf'},
  {id:'e09-q01',edition:9,year:2017,topic:'微分方程',difficulty:'中等',title:'积分方程转微分方程',question:'可导函数 f 满足 <span class="formula-line">f(x)cos x + 2∫₀ˣ f(t)sin t dt = x + 1</span>，求 f(x)。',answer:'f(x)=cos x + sin x',knowledge:'积分方程求导；一阶线性微分方程。',solutions:[{name:'方法一 · 求导',steps:['令 x=0，得 f(0)=1。','两边求导并整理：f′+tan x·f=sec x。','积分因子为 e^(∫tanx dx)=sec x。','解得 f=sin x+C cos x；代 f(0)=1 得 C=1。']},{name:'方法二 · 验证猜测',steps:['观察右侧为 x+1，尝试 f=cos x+sin x。','计算 f(x)cosx 与积分项。','两项相加恰为 x+1。','再由相应初值问题解的唯一性确认。']}],mistake:'求导积分项时用的是微积分基本定理：导数为 2f(x)sin x。',source:'materials/2017-09/document-01.pdf'},
  {id:'e10-q01',edition:10,year:2018,topic:'数列极限',difficulty:'中等',title:'参数型差值极限',question:'设 0<α<1，求 <span class="formula-line">limₙ→∞ [(1+1/n)^α − 1] n^α</span>。',answer:'0',knowledge:'等价无穷小；凹函数估计。',solutions:[{name:'方法一 · 等价无穷小',steps:['(1+x)^α−1 ~ αx（x→0）。','取 x=1/n，括号约为 α/n。','乘 n^α 得 αn^(α−1)。','因 α−1<0，极限为 <strong>0</strong>。']},{name:'方法二 · 凹性夹逼',steps:['函数 t^α 在正半轴为凹函数。','所以 (1+1/n)^α−1 < α/n。','原式介于 0 与 αn^(α−1) 之间。','夹逼得到 0。']}],mistake:'题目是整个差值乘 n^α，不是把差值整体取 n 次幂。',source:'materials/2018-10/document-01.pdf'},
  {id:'e11-q02',edition:11,year:2019,topic:'参数方程',difficulty:'中等',title:'隐式曲线积分',question:'设隐函数 y=y(x) 由 y²(x−y)=x² 确定，求 <span class="formula-line">∫ dx / y²</span>。',answer:'3y/x − 2ln|y/x| + C',knowledge:'齐次代换；参数化；不定积分。',solutions:[{name:'方法一 · 令 y=tx',steps:['令 y=tx，代入方程得 x=1/[t²(1−t)]。','于是 y=1/[t(1−t)]，并求 dx/dt=(3t−2)/[t³(1−t)²]。','因此 dx/y²=(3−2/t)dt。','积分并代回 t=y/x，得 <strong>3y/x−2ln|y/x|+C</strong>。']},{name:'方法二 · 参数化',steps:['令 t=y/x，先由原方程把 x、y 都表示成 t 的函数。','计算 dx/y²=(3−2/t)dt。','积分得 3t−2ln|t|+C。','最后代回 t=y/x。']}],mistake:'参数代换后 x、y 都依赖 t；dx 不能直接写成 dt。',source:'materials/2019-11/document-01.pdf'},
  {id:'e12-q01',edition:12,year:2020,topic:'函数极限',difficulty:'基础',title:'根式与三角函数复合极限',question:'求 <span class="formula-line">limₓ→0 [(x−sin x)e^(−x²)]/[√(1−x³)−1]</span>。',answer:'−1 / 3',knowledge:'等价无穷小；泰勒展开；分母有理化。',solutions:[{name:'方法一 · 等价无穷小',steps:['x−sinx ~ x³/6，且 e^(−x²)→1。','分子因此与 x³/6 等价。','√(1−x³)−1 ~ −x³/2。','比值趋于 <strong>−1/3</strong>。']},{name:'方法二 · 分母有理化',steps:['分子、分母同乘 √(1−x³)+1。','分母化为 −x³。','利用 (x−sinx)/x³→1/6，e^(−x²)→1，根式和趋于 2。','得到 −2×(1/6)=−1/3。']}],mistake:'根式分母的首项是 −x³/2，负号和系数 1/2 都不能漏。',source:'materials/2020-12/document-01.pdf'},
  {id:'e13-q02',edition:13,year:2021,topic:'隐函数',difficulty:'中等',title:'二元隐函数偏导之和',question:'z=z(x,y) 由 <span class="formula-line">2sin(x+2y−3z)=x+2y−3z</span> 确定，求 zₓ+zᵧ。',answer:'1',knowledge:'隐函数求导；分情形消元。',solutions:[{name:'方法一 · 分别求导',steps:['分别对 x、y 求偏导，记 c=cos(x+2y−3z)。','得到 2c(1−3zₓ)=1−3zₓ 与 2c(2−3zᵧ)=2−3zᵧ。','无论 2c=1 与否，结合原关系可得 zₓ=1/3、zᵧ=2/3。','所以 <strong>zₓ+zᵧ=1</strong>。']},{name:'方法二 · 变量合并',steps:['令 u=x+2y−3z，方程只含 u：2sinu=u。','在连续分支上 u 为常数。','故 du=dx+2dy−3dz=0。','得到 dz=(dx+2dy)/3，从而偏导之和为 1。']}],mistake:'直接约去 2cosu−1 可能漏掉它为 0 的情形。',source:'materials/2021-13/non-math-prelim-answer.pdf'},
  {id:'e14-q03',edition:14,year:2022,topic:'幂级数',difficulty:'基础',title:'幂级数和函数极限',question:'求 <span class="formula-line">limₓ→1⁻ (1−x)³ Σₙ₌₁^∞ n²xⁿ</span>。',answer:'2',knowledge:'幂级数求和；逐项求导。',solutions:[{name:'方法一 · 记忆公式',steps:['在 |x|<1 内，Σn²xⁿ = x(1+x)/(1−x)³。','乘上 (1−x)³ 后只剩 x(1+x)。','令 x→1⁻。','得到 <strong>2</strong>。']},{name:'方法二 · 两次求导',steps:['从 Σxⁿ=1/(1−x) 出发。','求导并乘 x 得 Σnxⁿ=x/(1−x)²。','再次求导并乘 x，得到 Σn²xⁿ=x(1+x)/(1−x)³。','代回取极限。']}],mistake:'收敛域是 |x|<1，因此只能从左侧趋近 x=1。',source:'materials/2022-14/document-02.pdf'},
  {id:'e15-q03',edition:15,year:2023,topic:'高阶导数',difficulty:'中等',title:'有理函数的 n 阶导数',question:'设 f(x)=1/(x²−3x+2)，求 f⁽ⁿ⁾(0)。',answer:'n! (1 − 1/2ⁿ⁺¹)',knowledge:'部分分式；高阶导数公式。',solutions:[{name:'方法一 · 部分分式',steps:['分解 f(x)=−1/(x−1)+1/(x−2)。','使用 [1/(x−a)]⁽ⁿ⁾=(−1)ⁿn!/(x−a)ⁿ⁺¹。','令 x=0 并整理符号。','得 <strong>n!(1−1/2ⁿ⁺¹)</strong>。']},{name:'方法二 · 幂级数',steps:['在 x=0 附近展开 1/(1−x) 与 1/(2−x)。','读取 xⁿ 的系数。','利用 f⁽ⁿ⁾(0)=n!·[xⁿ]f(x)。','得到同一答案。']}],mistake:'部分分式系数的正负号容易颠倒；可令 x=0 检查 f(0)=1/2。',source:'materials/2023-15/non-math-a-prelim-answer.pdf'},
  {id:'e16-q01',edition:16,year:2024,topic:'定积分',difficulty:'基础',title:'对数函数定积分',question:'计算 <span class="formula-line">∫₀¹ ln(1+x²) dx</span>。',answer:'ln 2 − 2 + π/2',knowledge:'分部积分；反正切积分。',solutions:[{name:'方法一 · 分部积分',steps:['令 u=ln(1+x²)，dv=dx。','得 ∫ln(1+x²)dx=xln(1+x²)−∫2x²/(1+x²)dx。','把 2x²/(1+x²) 写成 2−2/(1+x²)。','代入 0、1 得 <strong>ln2−2+π/2</strong>。']},{name:'方法二 · 参数积分',steps:['设 F(a)=∫₀¹ln(1+a²x²)dx。','对 a 求导后计算有理积分。','再从 F(0)=0 积分恢复 F(1)。','化简得到相同结果。']}],mistake:'分部积分后的边界项在 x=0 为 0，不是 ln1。',source:'materials/2024-16/document-01.pdf'},
  {id:'e17-q01',edition:17,year:2025,topic:'泰勒展开',difficulty:'基础',title:'确定等价无穷小系数',question:'设 f(x)=x−ln(1+x)−(1/2)xsinx，g(x)=ax³，且 limₓ→0 f(x)/g(x)=1，求 a。',answer:'a = −1/3',knowledge:'泰勒展开；等价无穷小。',solutions:[{name:'方法一 · 泰勒展开',steps:['ln(1+x)=x−x²/2+x³/3+o(x³)。','(1/2)xsinx=x²/2+o(x³)。','相减得 <mark>f(x)=−x³/3+o(x³)</mark>。','要使 f/(ax³)→1，故 <strong>a=−1/3</strong>。']},{name:'方法二 · 洛必达',steps:['分子分母在 0 附近均趋于 0。','连续使用三次洛必达法则。','分子三阶导在 0 的值为 −2，分母三阶导为 6a。','令 (−2)/(6a)=1，得 a=−1/3。']}],mistake:'xsinx 的最低阶是 x²，恰好与 ln(1+x) 的二次项抵消。',source:'materials/2025-17/document-02.pdf'}
];

const latexContent = {
  'e01-q02': {
    question: String.raw`设连续函数 \(f(x)\) 满足：$$f(x)=3x^2-\int_0^2 f(t)\,\mathrm dt-2,$$求 \(f(x)\)。`,
    answer: String.raw`\(f(x)=3x^2-\dfrac{10}{3}\)`,
    steps: [[String.raw`设 \(C=\int_0^2 f(t)\,\mathrm dt\)，原式化为 \(f(x)=3x^2-C-2\)。`,String.raw`两边在 \([0,2]\) 上积分：$$C=\int_0^2(3x^2-C-2)\,\mathrm dx.$$`,String.raw`计算得 \(C=8-2C-4\)，即 \(3C=4\)，所以 \(C=\frac43\)。`,String.raw`代回得到 <strong>\(f(x)=3x^2-\frac{10}{3}\)</strong>。`],[String.raw`直接对原式在 \([0,2]\) 上积分。`,String.raw`注意 $$\int_0^2\!\left[\int_0^2f(t)\,\mathrm dt\right]\mathrm dx=2\int_0^2f(t)\,\mathrm dt$$`,String.raw`解出该定积分，再代回原式即可。`]]
  },
  'e02-q01': {
    question: String.raw`设 \(|a|<1\)，$$x_n=(1+a)(1+a^2)\cdots(1+a^{2^n}),$$求 \(\displaystyle\lim_{n\to\infty}x_n\)。`,
    answer: String.raw`\(\dfrac{1}{1-a}\)`,
    steps: [[String.raw`在乘积前乘以 \(1-a\)。`,String.raw`使用 \((1-a)(1+a)=1-a^2\)，再与 \(1+a^2\) 相乘得到 \(1-a^4\)。`,String.raw`逐次消去得 $$(1-a)x_n=1-a^{2^{n+1}}$$`,String.raw`由 \(|a|<1\)，幂趋于零，所以极限为 <strong>\(\frac1{1-a}\)</strong>。`],[String.raw`写出前几项并观察消去规律。`,String.raw`归纳得到 $$x_n=\frac{1-a^{2^{n+1}}}{1-a}$$`,String.raw`令 \(n\to\infty\) 即得结论。`]]
  },
  'e03-q02': {
    question: String.raw`设 $$a_n=\cos\frac{\theta}{2}\cos\frac{\theta}{2^2}\cdots\cos\frac{\theta}{2^n},$$求 \(\displaystyle\lim_{n\to\infty}a_n\)。`,
    answer: String.raw`\(\theta=0\) 时为 \(1\)；\(\theta\ne0\) 时为 \(\dfrac{\sin\theta}{\theta}\)`,
    steps: [[String.raw`反复使用 \(\sin x=2\sin\frac{x}{2}\cos\frac{x}{2}\)。`,String.raw`得到 $$a_n=\frac{\sin\theta}{2^n\sin(\theta/2^n)}$$`,String.raw`利用 \(\sin u\sim u\;(u\to0)\)，分母趋于 \(\theta\)。`,String.raw`故 \(\theta\ne0\) 时极限为 \(\frac{\sin\theta}{\theta}\)；\(\theta=0\) 时各因子均为 \(1\)。`],[String.raw`对乘积取对数：$$\ln a_n=\sum_{k=1}^n\ln\cos\frac{\theta}{2^k}$$`,String.raw`用 \(\ln\cos u=-\frac{u^2}{2}+o(u^2)\) 判断收敛。`,String.raw`再结合二倍角恒等式确定精确极限。`]]
  },
  'e04-q01': {
    question: String.raw`求极限 $$\lim_{n\to\infty}(n!)^{1/n^2}$$`,
    answer: String.raw`\(1\)`,
    steps: [[String.raw`设 \(L_n=(n!)^{1/n^2}\)，则 $$\ln L_n=\frac{\ln(n!)}{n^2}$$`,String.raw`有 \(0\le\ln(n!)\le n\ln n\)。`,String.raw`因此 $$0\le\ln L_n\le\frac{\ln n}{n}\to0$$`,String.raw`故 <strong>\(L_n\to e^0=1\)</strong>。`],[String.raw`由 \(n!\le n^n\)，得 $$1\le(n!)^{1/n^2}\le n^{1/n}$$`,String.raw`而 \(n^{1/n}\to1\)。`,String.raw`由夹逼准则，原极限为 \(1\)。`]]
  },
  'e05-q02': {
    question: String.raw`证明反常积分 $$\int_0^{+\infty}\frac{\sin x}{x}\,\mathrm dx$$不是绝对收敛的。`,
    answer: String.raw`\(\displaystyle\int_0^{+\infty}\frac{|\sin x|}{x}\,\mathrm dx\) 发散`,
    steps: [[String.raw`令 $$a_n=\int_{n\pi}^{(n+1)\pi}\frac{|\sin x|}{x}\,\mathrm dx$$`,String.raw`在该区间上 \(\frac1x\ge\frac1{(n+1)\pi}\)。`,String.raw`故 $$a_n\ge\frac1{(n+1)\pi}\int_{n\pi}^{(n+1)\pi}|\sin x|\,\mathrm dx=\frac{2}{(n+1)\pi}$$`,String.raw`右侧为调和型下界，所以绝对值积分发散。`],[String.raw`在每个周期中取 \(|\sin x|\ge\frac12\) 的固定长度子区间。`,String.raw`这些子区间上的积分均不小于 \(\frac{C}{n}\)。`,String.raw`下界级数发散，故原积分不绝对收敛。`]]
  },
  'e06-q01': {
    question: String.raw`已知 \(y_1=e^x\) 和 \(y_2=xe^x\) 是某二阶齐次常系数线性微分方程的解，求该方程。`,
    answer: String.raw`\(y''-2y'+y=0\)`,
    steps: [[String.raw`\(e^x\) 对应特征根 \(r=1\)。`,String.raw`\(xe^x\) 与 \(e^x\) 同时出现，说明 \(r=1\) 是<mark>二重根</mark>。`,String.raw`特征多项式为 $$(r-1)^2=r^2-2r+1$$`,String.raw`所以方程为 <strong>\(y''-2y'+y=0\)</strong>。`],[String.raw`设方程为 \(y''+ay'+by=0\)。`,String.raw`分别代入 \(e^x\) 与 \(xe^x\)。`,String.raw`比较 \(x\) 项与常数项，解得 \(a=-2,b=1\)。`]]
  },
  'e07-q03': {
    question: String.raw`曲面 \(z=x^2+y^2+1\) 在 \(M(1,-1,3)\) 处的切平面与曲面 \(z=x^2+y^2\) 所围区域的体积是多少？`,
    answer: String.raw`\(\dfrac{\pi}{2}\)`,
    steps: [[String.raw`切平面为 \(z=2x-2y-1\)。`,String.raw`与 \(z=x^2+y^2\) 联立，投影域为 $$(x-1)^2+(y+1)^2\le1$$`,String.raw`高度差为 \(1-(x-1)^2-(y+1)^2\)。`,String.raw`平移后用极坐标：$$V=\int_0^{2\pi}\int_0^1(1-r^2)r\,\mathrm dr\,\mathrm d\theta=\frac\pi2$$`],[String.raw`平移坐标 \(u=x-1,v=y+1\)。`,String.raw`区域化为单位圆，高度为 \(1-u^2-v^2\)。`,String.raw`这是高为 \(1\)、底半径为 \(1\) 的抛物体，体积为 \(\frac12\pi\cdot1^2\cdot1=\frac\pi2\)。`]]
  },
  'e08-q01': {
    question: String.raw`若 \(f\) 在 \(x=a\) 处可导且 \(f(a)\ne0\)，求 $$\lim_{n\to\infty}\left[\frac{f(a+1/n)}{f(a)}\right]^n$$`,
    answer: String.raw`\(\displaystyle\exp\!\left(\frac{f'(a)}{f(a)}\right)\)`,
    steps: [[String.raw`由可导性，$$f(a+h)=f(a)+f'(a)h+o(h).$$`,String.raw`令 \(h=\frac1n\)，底数为 $$1+\frac{f'(a)}{nf(a)}+o\!\left(\frac1n\right).$$`,String.raw`套用 \(\left(1+\frac cn\right)^n\to e^c\)。`,String.raw`答案为 <strong>\(\exp\!\left(\frac{f'(a)}{f(a)}\right)\)</strong>。`],[String.raw`记原数列为 \(A_n\)。因 \(f(a)\ne0\)，其底数在 \(n\) 足够大时为正。`,String.raw`$$\ln A_n=n\left[\ln\left|f\!\left(a+\frac1n\right)\right|-\ln|f(a)|\right].$$`,String.raw`由 \((\ln|f|)'=\frac{f'}f\)，上式趋于 \(\frac{f'(a)}{f(a)}\)。`,String.raw`指数还原得到结论。`]]
  },
  'e09-q01': {
    question: String.raw`可导函数 \(f\) 满足 $$f(x)\cos x+2\int_0^x f(t)\sin t\,\mathrm dt=x+1,$$求 \(f(x)\)。`,
    answer: String.raw`\(f(x)=\cos x+\sin x\)`,
    steps: [[String.raw`令 \(x=0\)，得 \(f(0)=1\)。`,String.raw`两边求导并整理：$$f'(x)+\tan x\,f(x)=\sec x$$`,String.raw`积分因子为 \(e^{\int\tan x\,\mathrm dx}=\sec x\)。`,String.raw`解得 \(f=\sin x+C\cos x\)；代入 \(f(0)=1\) 得 \(C=1\)。`],[String.raw`观察右侧为 \(x+1\)，尝试 \(f(x)=\cos x+\sin x\)。`,String.raw`分别计算 \(f(x)\cos x\) 与积分项。`,String.raw`两项相加恰为 \(x+1\)，再由初值问题解的唯一性确认。`]]
  },
  'e10-q01': {
    question: String.raw`设 \(0<\alpha<1\)，求 $$\lim_{n\to\infty}\left[\left(1+\frac1n\right)^\alpha-1\right]n^\alpha$$`,
    answer: String.raw`\(0\)`,
    steps: [[String.raw`当 \(x\to0\) 时，\((1+x)^\alpha-1\sim\alpha x\)。`,String.raw`取 \(x=\frac1n\)，括号约为 \(\frac\alpha n\)。`,String.raw`乘以 \(n^\alpha\) 得 \(\alpha n^{\alpha-1}\)。`,String.raw`因 \(\alpha-1<0\)，极限为 <strong>\(0\)</strong>。`],[String.raw`函数 \(t^\alpha\) 在正半轴为凹函数。`,String.raw`所以 $$0<\left(1+\frac1n\right)^\alpha-1<\frac\alpha n$$`,String.raw`原式介于 \(0\) 与 \(\alpha n^{\alpha-1}\) 之间。`,String.raw`由夹逼准则得到 \(0\)。`]]
  },
  'e11-q02': {
    question: String.raw`设隐函数 \(y=y(x)\) 由 $$y^2(x-y)=x^2$$确定，求 $$\int\frac{\mathrm dx}{y^2}$$`,
    answer: String.raw`\(\displaystyle\frac{3y}{x}-2\ln\left|\frac yx\right|+C\)`,
    steps: [[String.raw`令 \(y=tx\)，代入方程得 \(x=\frac1{t^2(1-t)}\)。`,String.raw`于是 \(y=\frac1{t(1-t)}\)，且 $$\frac{\mathrm dx}{\mathrm dt}=\frac{3t-2}{t^3(1-t)^2}.$$`,String.raw`因此 $$\frac{\mathrm dx}{y^2}=\left(3-\frac2t\right)\mathrm dt.$$`,String.raw`积分并代回 \(t=\frac yx\)，得 <strong>\(\frac{3y}{x}-2\ln\left|\frac yx\right|+C\)</strong>。`],[String.raw`令 \(t=\frac yx\)，先由原方程把 \(x,y\) 都表示为 \(t\) 的函数。`,String.raw`计算 \(\frac{\mathrm dx}{y^2}=\left(3-\frac2t\right)\mathrm dt\)。`,String.raw`积分得 \(3t-2\ln|t|+C\)。`,String.raw`最后代回 \(t=\frac yx\)。`]]
  },
  'e12-q01': {
    question: String.raw`求 $$\lim_{x\to0}\frac{(x-\sin x)e^{-x^2}}{\sqrt{1-x^3}-1}$$`,
    answer: String.raw`\(-\dfrac13\)`,
    steps: [[String.raw`\(x-\sin x\sim\frac{x^3}{6}\)，且 \(e^{-x^2}\to1\)。`,String.raw`因此分子 \((x-\sin x)e^{-x^2}\sim\frac{x^3}{6}\)。`,String.raw`分母 $$\sqrt{1-x^3}-1\sim-\frac{x^3}{2}.$$`,String.raw`所以比值趋于 <strong>\(-\frac13\)</strong>。`],[String.raw`分子、分母同乘 \(\sqrt{1-x^3}+1\)。`,String.raw`分母化为 \(-x^3\)。`,String.raw`利用 $$\frac{x-\sin x}{x^3}\to\frac16,\quad e^{-x^2}\to1,\quad\sqrt{1-x^3}+1\to2,$$`,String.raw`得到 \(-2\times\frac16=-\frac13\)。`]]
  },
  'e13-q02': {
    question: String.raw`\(z=z(x,y)\) 由 $$2\sin(x+2y-3z)=x+2y-3z$$确定，求 \(z_x+z_y\)。`,
    answer: String.raw`\(1\)`,
    steps: [[String.raw`分别对 \(x,y\) 求偏导，记 \(c=\cos(x+2y-3z)\)。`,String.raw`得到 $$2c(1-3z_x)=1-3z_x,\qquad2c(2-3z_y)=2-3z_y$$`,String.raw`结合原关系分情形可得 \(z_x=\frac13,z_y=\frac23\)。`,String.raw`所以 <strong>\(z_x+z_y=1\)</strong>。`],[String.raw`令 \(u=x+2y-3z\)，方程只含 \(u\)：\(2\sin u=u\)。`,String.raw`在连续分支上 \(u\) 为常数。`,String.raw`故 \(\mathrm du=\mathrm dx+2\mathrm dy-3\mathrm dz=0\)。`,String.raw`于是 \(\mathrm dz=\frac13\mathrm dx+\frac23\mathrm dy\)，从而偏导之和为 \(1\)。`]]
  },
  'e14-q03': {
    question: String.raw`求 $$\lim_{x\to1^-}(1-x)^3\sum_{n=1}^{\infty}n^2x^n$$`,
    answer: String.raw`\(2\)`,
    steps: [[String.raw`在 \(|x|<1\) 内，$$\sum_{n=1}^{\infty}n^2x^n=\frac{x(1+x)}{(1-x)^3}$$`,String.raw`乘以 \((1-x)^3\) 后只剩 \(x(1+x)\)。`,String.raw`令 \(x\to1^-\)。`,String.raw`得到 <strong>\(2\)</strong>。`],[String.raw`从 \(\sum_{n=0}^{\infty}x^n=\frac1{1-x}\) 出发。`,String.raw`求导并乘 \(x\)，得 \(\sum nx^n=\frac{x}{(1-x)^2}\)。`,String.raw`再次求导并乘 \(x\)，得到 \(\sum n^2x^n=\frac{x(1+x)}{(1-x)^3}\)。`,String.raw`代回取极限。`]]
  },
  'e15-q03': {
    question: String.raw`设 $$f(x)=\frac1{x^2-3x+2},$$求 \(f^{(n)}(0)\)。`,
    answer: String.raw`\(\displaystyle n!\left(1-\frac1{2^{n+1}}\right)\)`,
    steps: [[String.raw`分解 $$f(x)=-\frac1{x-1}+\frac1{x-2}$$`,String.raw`使用 $$\left(\frac1{x-a}\right)^{(n)}=\frac{(-1)^n n!}{(x-a)^{n+1}}$$`,String.raw`令 \(x=0\) 并整理符号。`,String.raw`得 <strong>\(n!\left(1-\frac1{2^{n+1}}\right)\)</strong>。`],[String.raw`在 \(x=0\) 附近展开 \(\frac1{1-x}\) 与 \(\frac1{2-x}\)。`,String.raw`读取 \(x^n\) 的系数。`,String.raw`利用 \(f^{(n)}(0)=n![x^n]f(x)\)。`,String.raw`得到同一答案。`]]
  },
  'e16-q01': {
    question: String.raw`计算 $$\int_0^1\ln(1+x^2)\,\mathrm dx$$`,
    answer: String.raw`\(\ln2-2+\dfrac\pi2\)`,
    steps: [[String.raw`令 \(u=\ln(1+x^2),\;\mathrm dv=\mathrm dx\)。`,String.raw`分部积分得 $$\int\ln(1+x^2)\,\mathrm dx=x\ln(1+x^2)-\int\frac{2x^2}{1+x^2}\,\mathrm dx$$`,String.raw`把 \(\frac{2x^2}{1+x^2}\) 写成 \(2-\frac2{1+x^2}\)。`,String.raw`代入上下限得 <strong>\(\ln2-2+\frac\pi2\)</strong>。`],[String.raw`设 \(F(a)=\int_0^1\ln(1+a^2x^2)\,\mathrm dx\)。`,String.raw`对参数 \(a\) 求导并计算有理积分。`,String.raw`利用 \(F(0)=0\) 积分恢复 \(F(1)\)。`,String.raw`化简得到相同结果。`]]
  },
  'e17-q01': {
    question: String.raw`设 $$f(x)=x-\ln(1+x)-\frac12x\sin x,\qquad g(x)=ax^3,$$且 $$\lim_{x\to0}\frac{f(x)}{g(x)}=1,$$求 \(a\)。`,
    answer: String.raw`\(a=-\dfrac13\)`,
    steps: [[String.raw`$$\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}+o(x^3).$$`,String.raw`$$\frac12x\sin x=\frac{x^2}{2}+o(x^3).$$`,String.raw`相减得 <mark>\(f(x)=-\frac{x^3}{3}+o(x^3)\)</mark>。`,String.raw`要使 \(\frac{f(x)}{ax^3}\to1\)，故 <strong>\(a=-\frac13\)</strong>。`],[String.raw`分子、分母在 \(x=0\) 附近均趋于零。`,String.raw`连续使用三次洛必达法则。`,String.raw`分子三阶导在零点的值为 \(-2\)，分母三阶导为 \(6a\)。`,String.raw`令 \(\frac{-2}{6a}=1\)，得 \(a=-\frac13\)。`]]
  }
};

const latexNotes = {
  'e01-q02': {mistake:String.raw`题干的积分变量是哑变量；不要把 \(\int f(t)\,\mathrm dt\) 误当成 \(x\) 的函数。`},
  'e02-q01': {knowledge:String.raw`平方指数乘积；利用 \((1-a)\) 逐项消去。`,mistake:String.raw`指数是 \(2\) 的幂而不是 \(2n\)；最终余项为 \(a^{2^{n+1}}\)。`},
  'e03-q02': {mistake:String.raw`\(\theta=0\) 需要单独说明；直接写 \(\frac{\sin\theta}{\theta}\) 会出现 \(\frac00\)。`},
  'e04-q01': {knowledge:String.raw`取对数；夹逼估计 \(\ln(n!)\)。`,mistake:String.raw`根指数是 \(n^2\)；若看成 \(n\) 次根会得到不同结论。`},
  'e05-q02': {mistake:'“不绝对收敛”不等于原积分发散；原积分实际上条件收敛。'},
  'e06-q01': {mistake:String.raw`\(xe^x\) 不是另一个不同特征根，而是二重根 \(r=1\) 对应的第二个线性无关解。`},
  'e07-q03': {mistake:String.raw`切平面常数项容易算错；必须代入 \(M(1,-1,3)\) 检查平面是否经过该点。`},
  'e08-q01': {knowledge:String.raw`\(1^\infty\) 型极限；可导展开；对数化。`,mistake:String.raw`由 \(f(a)\ne0\) 可知比值最终为正；取对数时应使用 \(\ln|f|\)，不能直接写 \(\ln f\)。`},
  'e09-q01': {mistake:String.raw`求导积分项时使用微积分基本定理，其导数为 \(2f(x)\sin x\)。`},
  'e10-q01': {mistake:String.raw`题目是整个差值乘以 \(n^\alpha\)，不是把差值整体取 \(n\) 次幂。`},
  'e11-q02': {mistake:String.raw`参数代换后 \(x,y\) 都依赖 \(t\)；\(\mathrm dx\) 不能直接写成 \(\mathrm dt\)。`},
  'e12-q01': {knowledge:String.raw`等价无穷小；泰勒展开；分母有理化。`,mistake:String.raw`根式分母的首项是 \(-\frac{x^3}{2}\)，负号和系数 \(\frac12\) 都不能漏。`},
  'e13-q02': {mistake:String.raw`直接约去 \(2\cos u-1\) 之前，必须先检查它是否可能为零。`},
  'e14-q03': {mistake:String.raw`收敛域是 \(|x|<1\)，因此只能从左侧趋近 \(x=1\)。`},
  'e15-q03': {mistake:String.raw`部分分式系数的正负号容易颠倒；可令 \(x=0\) 检查 \(f(0)=\frac12\)。`},
  'e16-q01': {mistake:String.raw`分部积分后的边界项在 \(x=0\) 时为零，不要把它误写成 \(\ln1\)。`},
  'e17-q01': {mistake:String.raw`\(x\sin x\) 的最低阶是 \(x^2\)，恰好与 \(\ln(1+x)\) 展开后的二次项抵消。`}
};

window.quizQuestions.forEach(question => {
  const latex = latexContent[question.id];
  if (!latex) return;
  question.question = latex.question;
  question.answer = latex.answer;
  question.solutions.forEach((solution, index) => {
    solution.steps = latex.steps[index];
  });
  Object.assign(question,latexNotes[question.id]||{});
});
