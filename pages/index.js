import Head from 'next/head';
import { MongoClient } from 'mongodb'

import MeetupList from "../components/meetups/MeetupList"
import { Fragment } from 'react';

const HomePage = (props) => {

  return (
    <Fragment>
      <Head>
        <title>
          React meetups
        </title>
        <meta name='description' content='Browse a huge list of highly active React meetups!' />
      </Head>
      <MeetupList meetups={ props.meetups } />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb+srv://ndanglan:CyoLehl4wGqPzQ7S@cluster0.kmhnn.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meet => ({
        title: meet.title,
        address: meet.address,
        image: meet.image,
        description: meet.description,
        id: meet._id.toString(),
      }))
    },
    // data change frequently
    revalidate: 1
  }
}

// regenerate page for every incoming request 
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export default HomePage
