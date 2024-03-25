const pageTitle = 'JCR Documents'

const pages: Record<string, mdxTypeInterface> = import.meta.glob('/src/content/JCRDocs/*.mdx', {
    eager: true,
})

import { mdxTypeInterface } from "../mdx/mdxTypeInterface"

import InformationPage from "../InformationPage"

export default function JCRDocuments(){
    return(
        <>
            <InformationPage pageTitle={pageTitle} pages={pages}></InformationPage>
        </>
    )
}