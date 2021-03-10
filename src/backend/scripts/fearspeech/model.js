const createPost = (data, creator, datasource) => {
  return {
    type: "text",
    creator: creator,
    datasource: datasource,
    published_at: null,
    media_url: "",
    preview: data.message_text.slice(0, 255),
  };
};

const createMetadata = (data) => {
  const { translated_text, annotation_list, propagation } = data;
  return { translated_text, annotation_list, propagation };
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
