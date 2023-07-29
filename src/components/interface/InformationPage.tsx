import { ContentCard } from './ContentCard';
import { ContentPage } from './ContentPage';
import { useEffect, useRef, useState } from 'react';
import { contentComponents } from './mdx/contentComponents';
import { mdxTypeInterface } from './mdx/mdxTypeInterface';

interface importedPageInterface {
  title: string;
  content: JSX.Element;
}
interface generalInformationContentProps {
  title: string;
  content: string | JSX.Element;
}

interface informationPageProps{
  pages: Record<string, mdxTypeInterface>;
  pageTitle: string
}

export default function InformationPage({pages, pageTitle}: informationPageProps) {
  // console.log(pages)
  let generalInformationPages: importedPageInterface[] = [];
  for (const path in pages) {
    // console.log(pages[path].default);
    const e = pages[path].default({ components: contentComponents });
    generalInformationPages.push({
      title: pages[path].title,
      content: e,
    });
  }

  return (
    <ContentPage
      title={pageTitle}
      data={generalInformationPages.map((e) => {
        return {
          title: e.title,
          content: (
            <ContentCard key={e.title}>
              <GeneralInformationContent title={e.title} content={e.content}></GeneralInformationContent>
            </ContentCard>
          ),
        };
      })}
    ></ContentPage>
  );
}
function GeneralInformationContent({ title, content }: generalInformationContentProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    if (cardRef.current !== null &&
      (cardRef.current.clientHeight < cardRef.current.scrollHeight ||
        cardRef.current.clientWidth < cardRef.current.scrollWidth)) {
      setOverflow(true);
    } else {
      setOverflow(false);
    } // console.log(cardRef.current)

    // console.log('called')
  }, [cardRef.current, cardRef.current?.offsetHeight, cardRef.current?.offsetWidth]);

  return (
    <>
      <h2 className='flex font-alegreyasans text-2xl sm:text-4xl sm:font-light'>{title}</h2>
      <div className='relative box-border flex h-full max-h-full w-full flex-col items-end overflow-hidden'>
        <div ref={cardRef} className='h-full min-h-0 w-full flex-col space-y-6 flex-shrink overflow-auto text-left'>
          {content}
        </div>
        <div className='bottom-0 right-0 flex h-5 flex-1 text-right font-alegreyasans font-light italic'>
          {overflow ? 'Scroll Down' : ''}
        </div>
      </div>
    </>
  );
}
