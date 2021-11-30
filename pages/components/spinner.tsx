import type { NextPage } from "next";
import Link from "next/link";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Spinner: NextPage = () => {
  return (
    <div className="h-screen w-full d-flex align-center justify-center">
      <div className="animate-spin h-5 w-5 mr-3 text-white">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  )
}

export default Spinner;