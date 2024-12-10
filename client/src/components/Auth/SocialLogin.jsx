const SocialLogin = () => {
    return (
      <>
        <p className="text-sm text-gray-700 mt-4">
          またはソーシャルアカウントでログイン
        </p>
        <div className="flex justify-center items-center mt-2 space-x-4 z-10">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            <i className="fab fa-google fa-2x"></i>
          </a>
        </div>
      </>
    );
  };
  
  export default SocialLogin;