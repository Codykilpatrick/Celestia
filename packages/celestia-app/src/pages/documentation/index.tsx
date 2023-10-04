const Blog = () => {
  return (
    <div className="h-full mx-12 bg-violet-4 mt-16 rounded-lg overflow-hidden">
      <div className="p-8">
      <h1 className="text-center">Release Day!</h1>
      <h2 className="text-xl font-bold">Intro:</h2>
      <p className="my-4">
        Hello all and welcome to Celestia, the Eve Online Market prediction application. This might be a little long but
        bear with me through it, or don’t read it at all it doesn’t matter to me.
      </p>
      <p className="my-4">
        Let’s start with a little background about how we got here. I started playing Eve Online in January of 2009,
        sometime in middle school. I fell in love with the game and played for the next eleven years until I had to
        become an adult and real life took over. I kept up with Eve over the years with friends who still played but I
        myself no longer play.
      </p>

      <p className="my-4">
        My day job now is being a junior Software Engineer doing mostly Web development with a touch of data science in
        a small startup company. I wanted to create a side project that incorporated AI/ML, Data Science, DevOps,
        Web-dev, and cloud storage to practice my skills and learn some new technology along the way.
      </p>

      <p className="my-4">
        With that Celestia was born, right now I am the sole developer but may potentially make this an open-source
        project once it matures a bit. The goal of starting out was to answer the question “What is a Rifter going to
        cost in Jita tomorrow?” or “What will an Omen Navy Issue cost in Amarr?”. It turns out that it is currently
        beyond my capabilities, the TLDR is predicting exact prices on markets with AI/ML is hard. As of right now, we
        are currently predicting “Will the average price of a Rifter in Jita increase tomorrow”? But for every item in
        The major trade hub regions.
      </p>

      <p className="my-4">
        And that is where we are now. Please keep in mind THIS IS NOT SOUND FINANCIAL ADVICE. I imagine if you are here
        you understand that already though. AI/ML is not an exact science and has a certain artistic aspect. That being
        said I am just one developer working on this as a side project, predictions may be wrong sometimes or all the
        time, but hopefully through the development of Celestia we will get better with more and more capabilities 🚀.
      </p>

      <h2 className="text-xl font-bold">Tech stack:</h2>
      <p className="my-4">For the other Developers out there or just curious minds about what all goes into Celestia here it is.</p>
      <p className="my-4">
        For the front I am using Next.js with Typescript and React and for styling, I am using TailwindCSS and RadixUI.
      </p>
      <p className="my-4">For connecting to the API I am using Graphql with Apollo.</p>
      <p className="my-4">For the API I am using Postgraphile and serving it up with Express.</p>
      <p className="my-4">
        For the Database, I am using PostgreSQL hosted locally for development work and remotely on Neon for the website
        itself.
      </p>
      <p className="my-4">
        For the Data Pipeline, I am using Python to make calls to the Eve API triggered by GitHub Actions to seed the
        database.
      </p>
      <p className="my-4">For the models, I am using SciKit-Learn and TensorFlow in Python.</p>
      <p className="my-4">
        The GitHub repository is located here:{' '}
        <a href="https://github.com/Codykilpatrick/Celestia">https://github.com/Codykilpatrick/Celestia</a>
      </p>
      <div>
        The current workflow looks like this:
        <ol className="my-4">
          <li>
            Github actions will trigger the data pipeline to scrape all historic market averages from the eve ESI.
          </li>
          <li>
            That Data is inserted into the Neon database after comparing it to the data that already exists so that we
            don’t have duplicate data.
          </li>
          <li>Another GH action will trigger the model to make predictions on our new daily data.</li>
          <li>Those new predictions get inserted into the database.</li>
          <li>You get to view all the hot new predictions on the website.</li>
        </ol>
      </div>
      <p className="my-4">There is some nuance in there as well but that is the rough outline of how everything works.</p>

      <h2>The Artificial Intelligence Machine Learning</h2>
      <p className="my-4">This is the fun part that everyone gets excited about, the actual models that predict the data.</p>
      <p className="my-4">
        Right now this is how the ML pipeline works. To train a model we grab all of the market history for an item.
        Which consists of the following data values. “average”, “highest”, “lowest”, “order_count”, and “volume”. After
        that we use that data to get a “trend”, and “close_ration” for the next 3, 7, and 14 days for each data entry.
        Then with that we take the “average” for day 0, and the average for day 1 and figure out if it increased or
        decreased. We shift that value to a new column for the next day in the data and call it “target”. That is what
        we are predicting.
      </p>
      <p className="my-4">
        That’s confusing to read. In the future, I plan to add some nice pictures and a section so that a user can see
        what happened and understand what went into the prediction they are seeing.
      </p>

      <p className="my-4">
        That all being said, currently there is ONE model trained on ONE item In ONE region and we are using that ONE
        model to predict on ALL OTHER DATA. If that sounds like it might not be the right way to do it you are probably
        correct. Our current model was trained on Punisher’s in Domain. We used a Random Forest and achieved an accuracy
        of 82% on our test set which is pretty good for that item. The issue is that without feedback I simply don’t
        know how well it will perform on that item or other items in the real world.
      </p>

      <p className="my-4">
        Model development is a continuous process. We make predictions, figure out if we were correct or not, tweak the
        model, and try again. Do we tune the model to be more confident when it makes a prediction? What about having a
        model for each item/region combination? What about predicting volume movement instead of average increase? There
        are endless paths to choose from and the feedback that you provide will help me make those decisions.
      </p>

      <h2 className="my-4 text-xl font-bold">Closing:</h2>
      <p className="my-4">
        I have invested a significant amount of time and energy into the project and I don’t plan on stopping anytime
        soon. I would appreciate any feedback on any single piece of the application. The more feedback I can gather
        from real players using it will help me make a better application for everyone.
      </p>
      <p className="my-4">
        I also ask for patience and understanding through this process. I am one developer working on this as a side
        project. There are going to be issues and the whole thing might be pretty bad in the beginning but I promise
        with time it will get better.
      </p>
      <p className="my-4">Overall I am excited and cannot wait to see the results and hear your stories!</p>

      <p className="mt-4">Fly safe and make some money!</p>
      </div>
    </div>
  );
};

export default Blog;
