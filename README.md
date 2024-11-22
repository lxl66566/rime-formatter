# Rime formatter

[English](README-en.md) | 简体中文

VS Code 插件，用于格式化 Rime 词库文件（`*.dict.yaml`）和自定义短语（`custom_phrase.txt`）。

## 使用方法

1. 安装插件 anyformatter：<https://marketplace.visualstudio.com/items?itemName=lxl66566.rime-formatter>。
2. 启用插件
   ```json
   "[dict-yaml]": {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "lxl66566.rime-formatter"
   },
   "[custom-phrase]": {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "lxl66566.rime-formatter"
   }
   ```

## 设置项

```json
"rime-formatter": {
  "sort_by": "spell"  // 排序方式，默认为 spell，可选值为 "spell" | "weight" | null
}
```

此排序方式仅对 dict 生效，custom_phrase 文件不受此设置影响。

## 格式化效果

你可以在 [tests](./tests/) 里查看 formatter 的格式化效果。

## 对词库文件的要求

1. 格式化过程中只会保留第一次出现的注释块。后续的其他注释块会丢失。
2. rime dict 必须是[如下格式](https://www.mintimate.cc/zh/guide/customizationInput.html#%E7%BC%96%E5%86%99%E8%AF%8D%E5%BA%93)：
   ```yaml
   columns:
     - text # 词汇
     - code # 编码
     - weight # 权重，可以不写
   ```
3. 字典和词库中可以使用空格分割 columns，格式化后会自动转为 tab 分割
4. 你可以在 [tests](./tests/) 里查看支持的词库样例。
