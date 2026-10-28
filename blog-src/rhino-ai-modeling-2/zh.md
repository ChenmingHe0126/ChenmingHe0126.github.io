上篇试了 Claude，这一篇换 GPT／Codex、智谱 GLM 和 DeepSeek，看看同样是在 Rhino 建模，效果有什么区别。最后也试了一下本地部署，把模型放在自己的电脑上跑。结果有好的，也有没做成的，大家可以自行比较。

第一次接触的朋友，可以先看上篇的安装过程：在 Rhino 安装 **Rhino-MCP-Platform**，用 **MCPConnect** 配置 AI 客户端，再运行 **MCPStart**。连通以后，我们就可以用文字提出要求，让 AI 直接在 Rhino 里建模。

::: note
这里先说明一下，各次尝试的要求和设置并不完全一样，也没有严格控制测试条件。所以这篇主要分享我自己的使用感受，不给它们排一个严格的名次。
:::

## 01 先用 GPT／Codex 做个旋转楼梯

先换到 Codex，这次选的是 **6 Astra**，推理强度是 **Ultra**，还是让它做旋转楼梯。操作和前面用 Claude 差不多：左边看 Rhino，右边给 AI 提要求，模型出来以后再继续修改。

我当时用的 Prompt：  
*连接rhino mcp http://localhost:10500/ 然后建一个旋转楼梯*

![Codex 生成的旋转楼梯及执行记录。同一时刻裁切并排，模型已经出现，助手仍在保存。](images/l01_codex_stair.png "Codex 生成的旋转楼梯及执行记录。同一时刻裁切并排，模型已经出现，助手仍在保存。")

这次楼梯下面多了横梁，底部还有螺栓，图层也按材料分开了。这些小地方比我前面用 Claude 做的版本考虑得多一些，速度上我也感觉更快。完成回复显示，这一轮用了 **5 分 50 秒**。

## 02 换个复杂一点的：朗香教堂

楼梯做完，我想试试朗香教堂，因为是个很异形的建筑，用手工建模或者 GH 都不太好建。这次我只要求做**外壳**，先看看它能不能把屋顶、厚墙和塔体这些主要形态做出来。

::: prompt 我给它的 Prompt 很简单
你能建一个朗香教堂的模型给我吗 只要外壳先
:::

![Codex 生成的朗香教堂外壳：屋顶、塔体、厚墙与窗洞已经形成。](images/l02_ronchamp.png "Codex 生成的朗香教堂外壳：屋顶、塔体、厚墙与窗洞已经形成。")

这个效果我觉得还不错。曲面屋顶、厚墙、塔体和窗洞都出来了，一眼能看出是朗香教堂。至少作为一个可以继续改的外形初稿，我是比较满意的。整体来说，感觉还是很惊艳的。

::: note
扣掉中间额度限制的暂停，第一轮用了 **8 分 13 秒**，恢复后的第二轮用了 **12 分 29 秒**，合计 **20 分 42 秒**，也就是约 **21 分钟**。这里包括生成外壳、后续检查和保存。
:::

但是转到里面看，就能发现有些彩色玻璃没有嵌进墙里，位置是错的。正面看着不错，换个角度就露馅了。这里做的也只是根据资料建立的近似外壳，尺寸并不是实测复原。

![换个角度看局部：部分彩色玻璃与墙体的位置没有对齐，还需要修正。](images/l03_ronchamp_issue.png "换个角度看局部：部分彩色玻璃与墙体的位置没有对齐，还需要修正。")

## 03 智谱 GLM：用 ZCode 接上 Rhino

考虑到有些朋友无法使用国外的模型，我也测试了一下国内的模型。智谱 AI 的客户端是 ZCode，和 GPT 之类的类似，你可以通过客户端使用他们的大模型 GLM。我让它调用 Rhino 接口，做了下面这个旋转楼梯。

![通过智谱 ZCode 调用 Rhino 接口生成的楼梯，构件与连接关系仍需检查。](images/l04_glm.png "通过智谱 ZCode 调用 Rhino 接口生成的楼梯，构件与连接关系仍需检查。")

楼梯能做出来，主要构件也有了，但楼梯板是直接悬空的，没有接到中间的柱子上，所以这个结构连接关系还是有些问题。这样看上去，GLM 的思考深度好像不及前两者，这只是单次实验结果，仅作参考。另外，大家还可以考虑其他国内大模型，例如 MiniMax 之类的，工作流都类似，这里就不再赘述了。

## 04 DeepSeek 怎么接？先装 Harness

DeepSeek 是需要单独提出来的。DeepSeek 作为国产模型之光，性能很强，但是梁总不屑做 B 端客户，所以它并没有一个易用的客户端。想要使用 DeepSeek 的 Agent，需要一些操作。我们可以下载安装 **DeepSeek Harness**。

这里可以粗浅解释一下 Harness 是啥。Agent 客户端背后一般都有这样一套东西：大语言模型负责理解和生成内容，而 Harness 给它配上工具调用、文件访问和执行循环，才能让它从 chatbot 变成可以自己动手干活的 agent。DeepSeek Harness 还比较新，安装没有那么友好，以下是安装流程。

**第一步，把 Harness 装好并启动。**  
打开文末的 DeepSeek Harness GitHub 项目，点绿色的 **Code**，复制 HTTPS 地址。我用的是 **GitHub Desktop**：打开 **File → Clone repository → URL**，粘贴地址，选择本地存放位置，再点 **Clone**。这一步也可以直接在终端运行：  
*git clone https://github.com/deepseek-ai/deepseek-harness.git*

下载好以后，用已有的 AI 客户端打开 **deepseek-harness** 文件夹，让它照着项目说明安装依赖、完成配置。我当时直接说：  
*帮我下载所有的依赖项 完成配置并打开web ui*

它会检查项目，再安装依赖、启动服务。终端给出本地网址后，用浏览器打开这个地址，就能看到 Web UI。

![用 GitHub Desktop 克隆 deepseek-ai/deepseek-harness。](images/l10_harness_clone.png "用 GitHub Desktop 克隆 deepseek-ai/deepseek-harness。")

![把项目交给 AI，让它安装依赖、完成配置并打开 Web UI。](images/l11_ai_install.png "把项目交给 AI，让它安装依赖、完成配置并打开 Web UI。")

![DeepSeek Harness 的操作界面：先配置模型与工具，再进入 Rhino 建模。](images/l05_harness.png "DeepSeek Harness 的操作界面：先配置模型与工具，再进入 Rhino 建模。")

如果不想克隆源码，官方 README 也提供了一个更简单的启动方法：先安装 Node.js，然后在终端输入下面这行。一般会打开 **127.0.0.1:3080**，如果终端给出的地址不同，就用它给的地址。

::: prompt 官方快速启动命令
npx @deepseek-ai/dsh web
:::

**第二步，填 API Key，选工作文件夹。**  
登录 DeepSeek 开放平台，进入 **API keys**，点 **Create new API key**，填一个名称，再点 **Create API key**，创建后复制密钥。再打开 Harness 的 **Settings → Models**，把密钥填到 DeepSeek 的 API Key 一栏，再点 **Apply** 保存。

然后点 **Choose workspace**，添加并选中一个项目文件夹，新建会话，选择模型，先看看能不能正常聊天。

![点击 API keys → Create new API key，给密钥起名后创建。](images/l12_api_key_create.png "点击 API keys → Create new API key，给密钥起名后创建。")

![Settings → Models：填写 API Key，再点 Apply。](images/l13_harness_models.png "Settings → Models：填写 API Key，再点 Apply。")

![左侧是工作文件夹和会话，输入框上方可以切换当前工作文件夹。](images/l14_harness_workspace.png "左侧是工作文件夹和会话，输入框上方可以切换当前工作文件夹。")

**第三步，连接 Rhino。**  
打开 Rhino，用之前类似的流程，在 Harness 的 MCP 入口完成配置，再到 Rhino 运行 MCPStart，就可以开始建模了。

::: prompt 我用的 Prompt
http://localhost:10500/ 链接rhino mcp 检查连通性
:::

一开始还有个小问题：当时选的 Flash 不能读参考图，需要换成带 Vision 的模型。现在模型可能已经更新了，大家可以按自己界面里的选项来选。另外，不同模型收费也不同。

## 05 DeepSeek 的水壶和楼梯做得怎么样？

还是拿玻璃水壶来试。第一版做得有点矮胖，它又自己调整了高宽比例。壶里面还多出来一个不需要的球，后面也自己删掉了。但是壶盖还是太鼓，像戴了一顶帽子，和参考图差得比较明显。

我当时发了参考图，Prompt 还是这一句：  
*Model this image in Rhino*

![DeepSeek 修改后的水壶：比例已调整，壶盖依然过于鼓起。](images/l06_deepseek_kettle.png "DeepSeek 修改后的水壶：比例已调整，壶盖依然过于鼓起。")

::: note
这一轮的完成回复显示用了 **5 分 44 秒**，约 **350 万 tokens**。确实挺快，从发出要求到它完成建模，大约就是 **6 分钟**，包括它自己检查和修改，不含前面的安装连接。
:::

另外，我也打开了之前用 DeepSeek 做的旋转楼梯。中心柱、踏步、扶手都有，但是上面直接封住了，大家可以对这个建模能力做个参考。

![此前用 DeepSeek 生成的旋转楼梯：主体齐全，但通行关系仍有问题。](images/l07_deepseek_stair.png "此前用 DeepSeek 生成的旋转楼梯：主体齐全，但通行关系仍有问题。")

费用也看了一下：账单前后从 **2.02 元**变成 **4.10 元**，增加了 **2.08 元**；累计用量增加了 **5,832,303 tokens**，约 **583 万**。这是这一段连接、建模和修改等操作的合计，不是单独一个水壶的费用。

DeepSeek API 有峰谷价，按目前的规则，周末全天都是谷价，价格是峰价的一半，大家可以比如周末用来建模。这条 API 路线不是订阅制，而是按 token 来收费，命中缓存还可以进一步降低成本，用多少付多少，我觉得还是很好的。具体价格会更新，文末放了官方价目表。并且 Harness 一直在改进，采用 plug-in 架构，也能让社区参与扩展，我觉得这个很 promising。

总体来说，我只做了一些简单的测试，而且都没有重复测试，所以都比较片面。但根据我的体感来说，当下国产模型的智能水平还是略差一点，不过建模水平用于加速一下平时的工作，应该没有太大问题。我觉得，随着 DeepSeek Harness 以及其他国产模型变得更加强大，之后实现自动、高效的 AI 建模指日可待。

![上：这段测试前的累计用量；下：测试后的累计用量。两处画面裁切拼排，差额约 583 万 tokens、2.08 元，包含连接检查等调用。](images/l17_deepseek_usage.png "上：这段测试前的累计用量；下：测试后的累计用量。两处画面裁切拼排，差额约 583 万 tokens、2.08 元，包含连接检查等调用。")

## 06 本地部署：这次没做成

最后再试试本地模型。能不能不调用远程服务，就在自己的电脑上跑一个模型来操作 Rhino？这样可以节约很多成本。如果是设计公司，完全可以自己购入服务器，部署本地模型，降低成本且保护公司数据。但是这次我只是在本地跑，我自己的显卡是 5070，12 GB 显存。

这次我们需要下载 **LM Studio**。进入官网的下载页，找到 **LM Studio**，选择对应系统的安装包，下载后安装。当前页面上还有 Bionic，本文用的是 LM Studio。

装好后，打开左侧的 **Discover**（Windows 可以按 Ctrl+2），搜索 **Qwen3-Coder-30B-A3B-Instruct**，选中模型和要下载的量化版本，点 **Download**。我这次选的是 **Q4\_K\_M** 版本，文件约 **17.35 GB**。下载完成后回到聊天页，在顶部选择这个模型并加载。这个部分因为失败了，所以就不详述了，大家感兴趣也可以去看 Rhino MCP 的官方文档。

![在 LM Studio 官方下载页，选择系统和架构，下载 LM Studio。](images/l15_lm_download.png "在 LM Studio 官方下载页，选择系统和架构，下载 LM Studio。")

先在 LM Studio 下载并加载模型，确认可以聊天；再加上 Rhino MCP 的连接配置，看看工具列表有没有出来；最后到 Rhino 启动 MCP 服务，让它读一下当前场景。

![模型下载好以后，从顶部选择 Qwen3-Coder-30B-A3B-Instruct 并加载。](images/l16_qwen_select.png "模型下载好以后，从顶部选择 Qwen3-Coder-30B-A3B-Instruct 并加载。")

![LM Studio 中实际使用的 Qwen3-Coder-30B-A3B-Instruct 模型与设置。](images/l08_local_setup.png "LM Studio 中实际使用的 Qwen3-Coder-30B-A3B-Instruct 模型与设置。")

这次要求已经降得很低了：读取场景，画一个球。后面也试了让它打开 Grasshopper，先看看最简单的操作能不能做。

结果还是不顺利。工具列表是有了，但一调用就反复出现 **Unknown command**，还有 **Model failed to generate a tool call**。我调整过启用的工具，也等了挺久。Grasshopper 倒是打开了，但想要的简单建模任务始终没有可靠完成。

![同一时刻的两处画面裁切并排：左侧工具调用失败，右侧 Rhino 仍是空白视图。](images/l09_local_failure.png "同一时刻的两处画面裁切并排：左侧工具调用失败，右侧 Rhino 仍是空白视图。")

::: note
所以这次本地部署只能说：模型加载成功了，Rhino 建模没成功。连上以后能列出工具，和模型真的会用这些工具，还是有差别。
:::

## 07 试下来，我的感觉

::: card
**Claude／Claude Code**

水壶主体还可以，牛来改了好几轮也没太满意。楼梯和 GH 能做，不过等待、修改和整理画布都花较长时间。Claude 的编程还是更加强大，更适合 GH 和脚本任务。
:::

::: card
**GPT／Codex**

楼梯多做了一些构件细节，朗香教堂的外壳也让我比较满意。但楼梯连接和彩色玻璃的位置还是有错。整体来说，Codex 的 3D 建模水平还是最顶。
:::

::: card
**GLM／ZCode**

能建出可用的模型，中规中矩。
:::

::: card
**DeepSeek／Harness**

建模能力尚可，API 计费合理，期待 Harness 之后有更多进展。
:::

::: card
**本地 Qwen／LM Studio**

能加载，也能看到工具列表，但实际调用一直出问题。本地部署可能需要更好的硬件，例如 RTX Spark 笔记本、DGX Spark 这类设备，或者小型服务器、工作站，也可能需要更好的小参数模型。
:::

### 官方资料

- [Rhino MCP 官方项目与连接文档](https://github.com/mcneel/RhinoAI)
- [DeepSeek Harness 项目与启动说明](https://github.com/deepseek-ai/deepseek-harness)
- [DeepSeek Harness Web UI 使用指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md)
- [DeepSeek 开放平台与 API Key](https://platform.deepseek.com/api_keys)
- [DeepSeek 模型与价格（含峰谷价）](https://api-docs.deepseek.com/zh-cn/quick_start/pricing/)
- [LM Studio 官方下载](https://lmstudio.ai/download)
- [LM Studio 模型下载说明](https://lmstudio.ai/docs/app/basics/download-model)
- [NVIDIA RTX Spark](https://www.nvidia.com/en-us/products/rtx-spark/)
- [NVIDIA DGX Spark](https://www.nvidia.com/en-us/products/workstations/dgx-spark/)
