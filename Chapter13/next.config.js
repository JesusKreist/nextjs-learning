const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGO_URI:
          "mongodb://salmosine:ABR2782jgzfeDQkH@localhost:27017/next_course?authSource=admin&readPreference=primary&ssl=false",
      },
    };
  }
  return {
    env: {
      MONGO_URI:
        "mongodb+srv://salmosine:XHgKWXSD26CM1XDw@cluster0.ns1ta.mongodb.net/nextjs-course?retryWrites=true&w=majority",
    },
  };
};
