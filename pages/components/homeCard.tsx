import type { NextPage } from "next";
import Link from "next/link";

type Props = {
  title: string,
  repository: string,
  description: string,
  urlEndpoint: string
};

const HomeCard: NextPage<Props> = ({ title, repository, description, urlEndpoint }) => {
  return (
    <div className="py-4 px-8 mx-4 mb-4 lg:mx-20 bg-white shadow-lg rounded-lg">
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">
          {title}
        </h2>
        {repository && <p className="mt-2 text-gray-700">
          {`#${repository}`}
        </p>}
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <Link href={`/${urlEndpoint}`} >
          <a className="text-xl font-heading">CLICK HERE</a>
        </Link>
      </div>
    </div>
  )
}

export default HomeCard;