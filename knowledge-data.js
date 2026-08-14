(() => {
  const R = String.raw;
  const topics = {
    limit:{name:'极限与等价无穷小',category:'极限与级数',formula:R`\(\sin x\sim x,\ \ln(1+x)\sim x,\ e^x-1\sim x\ (x\to0)\)`,conclusion:'先判断型别，再用等价无穷小、夹逼、洛必达或展开；乘除可替换，加减必须比较到首个不消去的阶。',inference:R`若 \(u_n\to0,\ v_nu_n\to A\)，则 \((1+u_n)^{v_n}\to e^A\)。`,pitfall:'无穷小等价不能直接用于加减式；先检查低阶项是否抵消。',quizTopic:'函数极限'},
    taylor:{name:'泰勒展开',category:'极限与级数',formula:R`\(f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(0)}{k!}x^k+o(x^n)\)`,conclusion:R`常用展开：\(e^x,\sin x,\cos x,\ln(1+x),(1+x)^\alpha\)。阶数由“抵消到哪一项”决定。`,inference:R`若 \(f(x)=a_mx^m+o(x^m)\) 且 \(a_m\ne0\)，则 \(f(x)\sim a_mx^m\)。`,pitfall:'展开阶数不够是竞赛极限最常见的失分点。',quizTopic:'泰勒展开'},
    sequence:{name:'数列极限与递推',category:'极限与级数',formula:R`\(a_n\to A\Rightarrow f(a_n)\to f(A)\quad(f\text{ 在 }A\text{ 连续})\)`,conclusion:'递推数列通常按“有界性＋单调性＋极限方程”处理；乘积型数列优先找逐项消去或取对数。',inference:R`若 \(a_{n+1}=\varphi(a_n)\) 且 \(|\varphi'(x)|\le q<1\)，不动点通常唯一且迭代收敛。`,pitfall:'代入极限方程只能找候选值，不能代替收敛性证明。',quizTopic:'数列极限'},
    series:{name:'数项级数判敛',category:'极限与级数',formula:R`\(\sum a_n\text{ 收敛}\Rightarrow a_n\to0\)`,conclusion:'正项级数优先比较、比值、根值；变号级数检查绝对收敛与莱布尼茨条件。',inference:R`若 \(a_n\sim b_n>0\)，则 \(\sum a_n\) 与 \(\sum b_n\) 同敛散。`,pitfall:R`\(a_n\to0\) 只是必要条件，不足以推出级数收敛。`,quizTopic:'数列极限'},
    power:{name:'幂级数与函数项级数',category:'极限与级数',formula:R`\(\frac1{1-x}=\sum_{n=0}^{\infty}x^n,\quad |x|<1\)`,conclusion:'先求收敛半径，再单独判断端点；收敛区间内部可以逐项求导和积分。',inference:R`由几何级数逐项求导可得 \(\sum nx^n=\frac{x}{(1-x)^2}\) 与 \(\sum n^2x^n=\frac{x(1+x)}{(1-x)^3}\)。`,pitfall:'半径不包含端点结论，端点必须代回原级数。',quizTopic:'幂级数'},
    mvt:{name:'中值定理与零点证明',category:'一元微积分',formula:R`\(f(b)-f(a)=f'(\xi)(b-a)\)`,conclusion:'存在性问题常用罗尔、拉格朗日或柯西中值定理；根的个数用单调性或重复使用罗尔定理控制。',inference:R`若 \(f''>0\)，则 \(f\) 严格凸，割线在图像上方、切线在图像下方，方程至多出现特定数量的根。`,pitfall:'先核对连续、可导、端点相等等使用条件。',quizTopic:'高阶导数'},
    derivative:{name:'导数、极值与高阶导数',category:'一元微积分',formula:R`\(f'(x_0)=0,\ f''(x_0)>0\Rightarrow x_0\text{ 为严格局部极小点}\)`,conclusion:'驻点、不可导点和区间端点都是极值候选；整体最值还必须比较边界和无穷远趋势。',inference:R`部分分式或幂级数可把有理函数的 \(n\) 阶导数化为系数读取问题。`,pitfall:'驻点不一定是极值点，必须补充符号变化或高阶判别。',quizTopic:'高阶导数'},
    integral:{name:'定积分计算技巧',category:'一元微积分',formula:R`\(\int_a^b f(x)dx=\int_a^b f(a+b-x)dx\)`,conclusion:'优先检查对称性、周期性、分部积分和换元；含参数时可尝试参数积分法。',inference:R`令两个等值积分相加，常可把复杂被积函数化为常数或简单函数。`,pitfall:'换元后上下限、方向和雅可比必须同步改变。',quizTopic:'定积分'},
    improper:{name:'反常积分',category:'一元微积分',formula:R`\(\int_1^{\infty}x^{-p}dx\text{ 收敛}\Longleftrightarrow p>1\)`,conclusion:'先定位瑕点，再用比较、极限比较或狄利克雷判别；“收敛”和“绝对收敛”需要分别判断。',inference:R`周期振荡函数除以 \(x\) 往往条件收敛，而取绝对值后可与调和级数比较得发散。`,pitfall:'不能把条件收敛误写成绝对收敛。',quizTopic:'反常积分'},
    implicit:{name:'隐函数与参数方程',category:'一元微积分',formula:R`F(x,y)=0\Rightarrow y'=-\frac{F_x}{F_y}\quad(F_y\ne0)`,conclusion:R`参数方程满足 \(\frac{dy}{dx}=\frac{dy/dt}{dx/dt}\)，二阶导数还要再除一次 \(dx/dt\)。`,inference:'齐次隐式关系常令 y=tx 或 x=uy，把微分与积分转成单变量有理式。',pitfall:'隐函数求导后仍需结合原方程确定候选点是否存在。',quizTopic:'参数方程'},
    multivar:{name:'多元微分与条件极值',category:'多元微积分',formula:R`dz=f_xdx+f_ydy,\quad \nabla f=(f_x,f_y)`,conclusion:'切平面由梯度给出；条件极值使用拉格朗日乘子，并检查约束边界与退化点。',inference:R`在约束 \(g=0\) 下，极值点通常满足 \(\nabla f=\lambda\nabla g\)。`,pitfall:'拉格朗日方程给出的是候选点，仍需比较函数值。',quizTopic:'隐函数'},
    multiple:{name:'重积分与变量替换',category:'多元微积分',formula:R`\(\iint_D f(x,y)dxdy=\iint_{D'}f(x(u,v),y(u,v))|J|dudv\)`,conclusion:'先画投影域，再选直角、极坐标、柱坐标或球坐标；对称区域先判断奇偶性。',inference:R`圆域配合极坐标 \(dxdy=rdrd\theta\)，球域配合 \(dV=\rho^2\sin\varphi\,d\rho d\varphi d\theta\)。`,pitfall:'最容易漏掉雅可比中的 r 或球坐标中的平方与正弦因子。',quizTopic:'多元积分'},
    green:{name:'曲线积分与格林公式',category:'多元微积分',formula:R`\(\oint_L Pdx+Qdy=\iint_D(Q_x-P_y)dxdy\)`,conclusion:'闭曲线第二型积分优先检查格林公式；区域有孔或奇点时要挖去小圆并处理附加边界。',inference:R`若 \(P_y=Q_x\) 且区域单连通，则积分与路径无关并存在势函数。`,pitfall:'正向是外边界逆时针、内边界顺时针。',quizTopic:'多元积分'},
    gauss:{name:'曲面积分与高斯公式',category:'多元微积分',formula:R`\(\oiint_\Sigma P,dydz+Q,dzdx+R,dxdy=\iiint_\Omega(P_x+Q_y+R_z)dV\)`,conclusion:'封闭曲面第二型积分优先转成散度的三重积分；非封闭曲面可补面后相减。',inference:'当散度只依赖到原点的距离时，配合球坐标往往大幅简化。',pitfall:'公式要求封闭曲面外侧方向，补面时方向必须一致。',quizTopic:'多元积分'},
    ode:{name:'常微分方程',category:'方程与建模',formula:R`ay''+by'+cy=0\Longleftrightarrow ar^2+br+c=0`,conclusion:'常系数方程先解特征根；非齐次项按类型设特解，和齐次解重合时乘以足够次数的 x。',inference:R`二重根 r 对应 \((C_1+C_2x)e^{rx}\)。已知若干解时，可先用解之差消去非齐次项。`,pitfall:'通解必须包含足够数量的线性无关任意常数。',quizTopic:'微分方程'},
    integralEquation:{name:'积分方程与变上限积分',category:'方程与建模',formula:R`\(\frac d{dx}\int_a^x f(t)dt=f(x)\)`,conclusion:'定限积分可整体设为常数；变上限积分通常对等式求导化成微分方程，再由原式补初值。',inference:R`\(\frac d{dx}\int_{u(x)}^{v(x)}f(t)dt=f(v)v'-f(u)u'\)。`,pitfall:'求导会损失常数条件，必须回到原式或代入端点确定。',quizTopic:'积分方程'},
    geometry:{name:'空间解析几何',category:'方程与建模',formula:R`d_{异面直线}=\frac{|\overrightarrow{P_1P_2}\cdot(\mathbf s_1\times\mathbf s_2)|}{|\mathbf s_1\times\mathbf s_2|}`,conclusion:'直线看方向向量，平面看法向量；切平面法向量来自隐式曲面的梯度。',inference:R`曲面 \(F=0\) 在点 P 的切平面为 \(\nabla F(P)\cdot(\mathbf r-\mathbf r_P)=0\)。`,pitfall:'写完平面方程后代入已知点做一次快速校验。',quizTopic:'多元积分'},
    inequality:{name:'积分不等式与估计',category:'证明与策略',formula:R`\((\int_a^b fg)^2\le\int_a^b f^2\int_a^b g^2\)`,conclusion:'估计题常用柯西—施瓦茨、积分中值定理、单调性、凸性和分段比较。',inference:R`若 \(m\le f\le M\)，则 \(m(b-a)\le\int_a^bf\le M(b-a)\)。`,pitfall:'放缩方向必须与被积函数及积分区间符号一致。',quizTopic:'反常积分'},
    optimization:{name:'最优化与几何应用',category:'证明与策略',formula:R`V=\int_a^b\pi[R(x)^2-r(x)^2]dx`,conclusion:'先把几何条件翻译成目标函数与约束，再降维求极值；体积、面积、转动惯量常与积分和条件极值结合。',inference:'对称性可以消去交叉项，并把多变量最值化为主轴方向比较。',pitfall:'极值存在性、参数范围和几何可行性必须一并检查。',quizTopic:'多元积分'}
  };
  const years = [
    {edition:1,year:2009,focus:'积分、微分方程与级数综合度高，强调把陌生表达式转成标准结构。',keys:['multiple','integralEquation','multivar','limit','green','ode','optimization','power'],paper:'materials/2009-01/paper.pdf'},
    {edition:2,year:2010,focus:'从基础计算延伸到严格证明，凸性、参数方程与空间几何同时出现。',keys:['sequence','limit','improper','multivar','geometry','mvt','implicit','series','green'],paper:'materials/2010-02/document-01.pdf'},
    {edition:3,year:2011,focus:'极限和级数仍是主线，并加强积分区域、微分方程与空间积分的联动。',keys:['limit','taylor','derivative','integral','multiple','ode','series','inequality'],paper:'materials/2011-03/document-01.pdf'},
    {edition:4,year:2012,focus:'重视估计与证明，数列、函数积分和多元积分之间的转化较多。',keys:['sequence','mvt','integral','improper','multivar','multiple','green','series'],paper:'materials/2012-04/document-01.pdf'},
    {edition:5,year:2013,focus:'反常积分、隐函数极值、积分不等式与高斯公式形成完整分析链。',keys:['limit','improper','implicit','integral','series','inequality','gauss','green'],paper:'materials/2013-05/document-01.pdf'},
    {edition:6,year:2014,focus:'基本方法与综合应用并重，常系数方程、积分变换和条件极值值得复盘。',keys:['limit','derivative','integral','multivar','multiple','ode','series','optimization'],paper:'materials/2014-06/non-math-prelim-only.pdf'},
    {edition:7,year:2015,focus:'几何背景明显增多，切平面、投影域和重积分是连接多个大题的核心。',keys:['taylor','implicit','integral','multivar','multiple','geometry','ode','series'],paper:'materials/2015-07/document-01.pdf'},
    {edition:8,year:2016,focus:'一元极限与多元积分平衡，突出可导展开、积分估计和公式迁移。',keys:['limit','mvt','integral','improper','multivar','green','gauss','power'],paper:'materials/2016-08/non-math-prelim-answer.pdf'},
    {edition:9,year:2017,focus:'积分方程转微分方程是代表性技巧，同时覆盖级数和多元积分证明。',keys:['integralEquation','limit','derivative','integral','multiple','green','ode','series'],paper:'materials/2017-09/document-01.pdf'},
    {edition:10,year:2018,focus:'参数型极限和证明题比重突出，要求对展开阶数与定理条件非常敏感。',keys:['limit','taylor','mvt','integral','improper','multivar','ode','series'],paper:'materials/2018-10/document-01.pdf'},
    {edition:11,year:2019,focus:'参数化与高阶导数辨识度高，并保持积分、方程和多元计算的综合考查。',keys:['implicit','derivative','taylor','integral','multiple','green','ode','series'],paper:'materials/2019-11/document-01.pdf'},
    {edition:12,year:2020,focus:'复合极限、积分估计与场论公式并行，适合训练限时下的公式选择。',keys:['limit','taylor','mvt','integral','multiple','green','gauss','series'],paper:'materials/2020-12/document-01.pdf'},
    {edition:13,year:2021,focus:'隐函数偏导是代表题型；整体仍围绕极限、积分、级数和方程展开。',keys:['implicit','multivar','limit','taylor','integral','multiple','ode','series'],paper:'materials/2021-13/non-math-prelim-answer.pdf'},
    {edition:14,year:2022,focus:'幂级数求和与多元综合题突出，基础公式需要做到快速调用。',keys:['power','taylor','derivative','integral','multivar','multiple','ode','gauss'],paper:'materials/2022-14/document-02.pdf'},
    {edition:15,year:2023,focus:'高阶导数和局部展开辨识度高，适合训练“换一种表示再计算”。',keys:['derivative','taylor','implicit','integral','multiple','ode','series','inequality'],paper:'materials/2023-15/non-math-a-prelim-answer.pdf'},
    {edition:16,year:2024,focus:'定积分技巧和多元公式保持高频，强调边界、方向和换元细节。',keys:['integral','taylor','multivar','multiple','green','gauss','ode','series'],paper:'materials/2024-16/document-01.pdf'},
    {edition:17,year:2025,focus:'泰勒展开用于锁定等价无穷小系数，基础方法与综合表达并重。',keys:['taylor','limit','derivative','integral','multivar','multiple','ode','series'],paper:'materials/2025-17/document-02.pdf'}
  ];
  window.knowledgeTopics=topics;
  window.yearKnowledge=years;
})();
