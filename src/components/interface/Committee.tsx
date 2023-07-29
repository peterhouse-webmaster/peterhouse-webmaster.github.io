import { committeeData } from "../../content/committeeData"
import { CommitteeProfileCard } from './CommitteeProfileCard'
import { ContentPage } from './ContentPage'

export default function Committee() {
  return (
    <>
      <ContentPage
        title={'JCR Committee'}
        data={committeeData.map((e, _i) => {
          return {
            title: e.title,
            content: (
              <CommitteeProfileCard
                name={e.name}
                pictureUrl={e.pictureUrl}
                role={e.title}
                email={e.email}
                introduction={e.introduction}
                key={e.name}
              ></CommitteeProfileCard>
            ),
          }
        })}
      ></ContentPage>
    </>
  )
}
