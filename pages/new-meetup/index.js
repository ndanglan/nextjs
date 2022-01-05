import { useRouter } from 'next/router';
import NewMeetupForm from "../../components/meetups/NewMeetupForm"

const NewMeetupPage = () => {
  const router = useRouter()
  const onAddMeetup = async (data) => {
    const res = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const resData = await res.json();
    console.log(resData);
    router.push('/')
  }

  return (
    <NewMeetupForm onAddMeetup={ onAddMeetup } />
  )
}

export default NewMeetupPage
