import Link from 'next/link'
import { useViewerQuery, ViewerDocument } from '../lib/viewer.graphql'
import { initializeApollo } from '../lib/apollo'
import { CTA } from '../components/CTA'

const Index = () => {
  const { data } = useViewerQuery()
  const { viewer } = data!

  return (
    <div>
      You're signed in as {viewer.name} and you're {viewer.status} go to the{' '}
      <Link href="/about">
        <a>about</a>
      </Link>{' '}
      page.
      <CTA />
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
