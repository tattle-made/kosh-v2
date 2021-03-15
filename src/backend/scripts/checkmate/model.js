const createPost = (data, creator, datasource) => ({
  type: data.media_type,
  creator: creator,
  datasource: datasource,
  published_at: data.timestamp,
  media_url: "",
  preview: data.media_type === "text" ? data.text.slice(0, 255) : "",
});

const createMetadata = (data) => ({
  bucket_name: data.bucket_name,
  external_shares: data.external_shares,
  likes: data.likes,
  caption: data.caption,
  tag_name: data.tag_name,
  tag_translation: data.tag_translation,
  text: data.text,
  filename: data.filename,
  verifiable_claim: data.verifiable_claim,
  contains_video: data.contains_video,
  contains_image: data.contains_image,
  visible_source: data.visible_source,
  contains_relevant_meme: data.contains_relevant_meme,
  annotator_label: data.annotator_label,
});

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
