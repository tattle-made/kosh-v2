const createPost = (doc, post, creator, datasource) => {
  return {
    type: doc.mediaType,
    creator: creator,
    datasource: datasource,
    published_at: post.date_updated,
    media_url: "",
    preview: doc.mediaType === "text" ? doc.content.slice(0, 255) : "",
  };
};

const createMetadata = (post) => {
  const { postURL, domain, headline, author } = post;
  return { postURL, domain, headline, author };
};

const ReportManager = () => {
  var success = [];
  var failure = [];
  var message = "";
  const addSuccess = (msg) => {
    success.push(msg);
  };
  const addFailure = (msg) => {
    failure.push(msg);
  };
  const getReportJSON = () => JSON.stringify({ success, failure, message });
  const getReport = () => ({ success, failure, message });
  const createNewReport = () => ({ success: [], failure: [], message: "" });
  return { addSuccess, addFailure, getReportJSON, getReport, createNewReport };
};

module.exports = {
  createPost,
  createMetadata,
  ReportManager,
};
