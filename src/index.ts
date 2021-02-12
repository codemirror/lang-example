import {parser} from "./syntax.grammar"
import {LezerLanguage, LanguageSupport, indentNodeProp, foldNodeProp, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const EXAMPLELanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application(tree) { return {from: tree.from + 1, to: tree.to - 1} }
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: ";"}
  }
})

export function EXAMPLE() {
  return new LanguageSupport(EXAMPLELanguage)
}
