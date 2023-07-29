declare module "*.mdx" {  
  export const title: string;
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
}