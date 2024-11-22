# Rime formatter

English | [简体中文](README.md)

VS Code extension for formatting Rime dictionary files (`*.dict.yaml`) and custom phrases (`custom_phrase.txt`).

## Usage

1. Install the extension anyformatter: <https://marketplace.visualstudio.com/items?itemName=lxl66566.rime-formatter>.
2. Enable the plugin
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

## Settings

```json
"rime-formatter": {
  "sort_by": "spell"  // Sorting method, default is "spell", accepts "spell" | "weight" | null
}
```

This sorting method only applies to dictionaries; the `custom_phrase` file is not affected by this setting.

## Formatting Effects

You can view the formatting effects of the formatter in the [tests](./tests/) directory.

## Requirements for Dictionary Files

1. During the formatting process, only the first occurrence of a comment block will be retained. Subsequent comment blocks will be lost.
2. The Rime dictionary must be in the following format:
   ```yaml
   columns:
     - text # vocabulary
     - code # encoding
     - weight # weight, which can be omitted
   ```
3. Columns in the dictionary and word library can be separated by spaces, and they will automatically be converted to tab-separated after formatting.
4. You can view supported dictionary samples in the [tests](./tests/) directory.
