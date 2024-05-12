import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-customBlack py-4 p">
      <div className="container mx-auto flex justify-between items-center">
        <h6 className="text-white text-start font-xs ">
          Copyright ©2024 ALL-IN-ONE-SOLUTION. All Rights Reserved.
        </h6>
        <nav className="flex text-end">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="https://www.facebook.com"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  stroke-width="1.5"
                  viewBox="0 0 50 50"
                  className="w-8 h-8"
                >
                  <path
                    fill="#039be5"
                    d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                  ></path>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.youtube.com"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  stroke-width="1.5"
                  viewBox="0 0 50 50"
                  className="w-8 h-8"
                >
                  <path
                    fill="#FF3D00"
                    d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                  ></path>
                  <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
