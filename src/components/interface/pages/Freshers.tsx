const pageTitle = 'Freshers'
//specify the path to the markdown files here
//REMEMBER TO END THE STRING WITH *.mdx
const pages: Record<string, mdxTypeInterface> = import.meta.glob('/src/content/freshers/*.mdx', {
  eager: true,
})

import { mdxTypeInterface } from '../mdx/mdxTypeInterface'

import InformationPage from "../InformationPage"

export default function Freshers(){
  return(
    <>
      <InformationPage pageTitle={pageTitle} pages={pages}></InformationPage>
    </>
  )
}