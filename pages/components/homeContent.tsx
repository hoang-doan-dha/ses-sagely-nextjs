import type { NextPage } from "next"
import HomeCard from "./homeCard";

const homeList = [
  {
    title: 'Simple Email Service',
    repository: 'ses-mock',
    description: 'To read all emails are sent from SES AWS (e.g: Invite mail, Welcome mail, Event mail, ...).',
    urlEndpoint: 'emails',
  },
  {
    title: 'Communications CLI',
    repository: 'sagely-communications',
    description: 'Run every "grunt" command line to invoke lambda function from this site.',
    urlEndpoint: 'communications',
  },
];

const HomeContent: NextPage = () => {
  return (
    <div className="bg-gray-300 min-h-full w-full p-4">
      {homeList.map((item) => <HomeCard key={item.repository} {...item} />)}
    </div>
  );
}

export default HomeContent;