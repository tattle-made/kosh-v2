const { update } = require("../../core/mongo");

const markDocAsRegistered = async (docId) => {
  try {
    await update(
      "factcheck_sites_dev",
      "kosh_registration_status",
      { doc_id: docId },
      { $set: { status: "registered" } }
    );
  } catch (err) {
    console.log("Error : could not mark doc as unregistered");
    throw err;
  }
};

const markDocAsFailed = async (docId) => {
  try {
    await update(
      "factcheck_sites_dev",
      "kosh_registration_status",
      { doc_id: docId },
      { $set: { status: "failed" } }
    );
  } catch (err) {
    console.log("Error : could not mark doc as failed");
    throw err;
  }
};

module.exports = { markDocAsRegistered, markDocAsFailed };
