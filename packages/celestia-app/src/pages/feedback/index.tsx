const Feedback = () => {
  return (
    <div className="h-full mx-12 bg-violet-4 mt-16 rounded-lg overflow-hidden">
      <div className="m-4">
        <p className="py-2">
          Your feedback is important to making this a useful tool. Whether it is a issue with the website itself, an
          idea for an improvement or just a feature request I want to hear it.
        </p>
        <p className="py-2">
          You can either click the email button below to directly send a message to eveCelestia2@gmail.com or head on
          over to GitHub and create an issue there!
        </p>
        <p className="py-2">
          If the project takes off and the interest is there I can create a discord server as well.
        </p>
        <p className="py-2">I look forward to hearing from you!</p>
      </div>
      <div className="m-4 flex justify-evenly">
        <a href="mailto:eveCelestia2@gmail.com" className="px-4 hover:text-blue-500">
          Email
        </a>
        <a href="https://github.com/Codykilpatrick/Celestia/issues" className="px-4 hover:text-blue-500">
          Github
        </a>
      </div>
    </div>
  );
};

export default Feedback;
