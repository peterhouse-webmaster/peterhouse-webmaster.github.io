const pageTitle = 'General Information'
//specify the path to the markdown files here
//REMEMBER TO END THE STRING WITH *.mdx
const pages: Record<string, mdxTypeInterface> = import.meta.glob('/src/content/generalInformation/*.mdx', {
  eager: true,
})

import { mdxTypeInterface } from "../mdx/mdxTypeInterface"

import InformationPage from "../InformationPage"

export default function GeneralInformation(){
  return(
    <>
      <InformationPage pageTitle={pageTitle} pages={pages}></InformationPage>
    </>
  )
}


