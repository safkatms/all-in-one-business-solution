import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <h5 className="font-bold">ALL-IN-ONE BUSINESS SOLUTION</h5>
            <p>Handle Everything from Purchase to Sale</p>
          </div>
          <div className="flex space-x-8">
            <div>
              <h6 className="font-bold">Sales & Marketing</h6>
              <p>077 7475 8489</p>
              <p>083 8475 7484</p>
            </div>
            <div>
              <h6 className="font-bold">Support</h6>
              <p>019 4877 8888</p>
              <p>035 7999 2777</p>
            </div>
            <div>
              <h6 className="font-bold">Product</h6>
              <p>How it works?</p>
              <p>Pricing</p>
            </div>
            <div>
              <h6 className="font-bold">Others</h6>
              <p>About Us</p>
              <p>Privacy & Policy</p>
              <p>Terms & Condition</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <p>&copy; 2024 ALL-IN-ONE-SOLUTION. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
          <nav className="flex text-end">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="https://www.facebook.com"
                className="text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="1.5"
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
                  strokeWidth="1.5"
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
        
      </div>
    </footer>
  );
};

export default Footer;
