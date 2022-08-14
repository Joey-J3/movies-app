declare module "*.svg" {
  const content: any;
  export default content;
}

type Dispose = () => void;
type InsertCssItem = () => Dispose;
type GetCSSItem = () => string;
type GetContent = () => string;

interface Style {
  [key: string]: string;
  _insertCss: InsertCssItem;
  _getCss: GetCSSItem;
  _getContent: GetContent;
}

declare module "*.scss" {
  const content: Style;
  export default content;
}

declare module "isomorphic-style-loader/StyleContext" {
  import { Context } from "react";

  type RemoveGlobalCss = () => void;
  type InsertCSS = (...styles: Style[]) => RemoveGlobalCss | void;
  interface StyleContextValue {
    insertCss: InsertCSS;
  }

  const StyleContext: Context<StyleContextValue>;

  export { StyleContext as default, InsertCSS };
}

declare module "isomorphic-style-loader/useStyles" {
  function useStyles(...styles: Style[]): void;
  export default useStyles;
}

declare module "isomorphic-style-loader/withStyles";
