const pageTitle = ''
//specify the path to the markdown files here
//REMEMBER TO END THE STRING WITH *.mdx
const pages: Record<string, mdxTypeInterface> = import.meta.glob('/src/content/file-name-here/*.mdx', {
  eager: true,
})

import InformationPage from "../InformationPage"
import { mdxTypeInterface } from "../mdx/mdxTypeInterface"

export default function GeneralInformation(){
  return(
    <>
      <InformationPage pageTitle={pageTitle} pages={pages}></InformationPage>
    </>
  )
}