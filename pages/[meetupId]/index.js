import { MongoClient, ObjectId } from "mongodb"
import MeetupDetail from "../../components/meetups/MeetupDetail"

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={ props.meetupData?.image }
      title={ props.meetupData?.title }
      address={ props.meetupData?.address }
      description={ props.meetupData?.description }
    />
  )
}

export const getStaticPaths = async () => {

  const client = await MongoClient.connect('mongodb+srv://ndanglan:CyoLehl4wGqPzQ7S@cluster0.kmhnn.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(item => ({
      params: {
        meetupId: item._id.toString()
      }
    }))

  }
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://ndanglan:CyoLehl4wGqPzQ7S@cluster0.kmhnn.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  console.log(selectedMeetup);
  client.close();


  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      }
    }
  }
}

export default MeetupDetails
