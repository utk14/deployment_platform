const { Subject } = require('rxjs');
const AppsModel = require('../db/models/apps');

const s = new Subject();

function addApp(req) {
  const app = new AppsModel(req);
  app.save();
}

function findAndUpdateApp(req) {
  AppsModel.findOneAndUpdate({
    appId: req.appId,
    app_URL: req.app_URL,
    userId: req.userId,
    app_name: req.app_name,
    status: req.status,
  }, {
    timestamp: Date.now(),
  }, {
    upsert: true,
    new: true,
  }, (error, doc) => {
    try {
      s.next(doc);
    } catch (err) {
      s.error(err);
    }
  });
  return s;
}

function getUserApps() {
  return new Promise((resolve) => {
    AppsModel.find(null, (err, doc) => {
      resolve(doc);
    });
  });
}

function getAppByAppURL(req) {
  AppsModel.find(req, (err, doc) => {
    try {
      s.next(doc);
    } catch (error) {
      s.error(error);
    }
  });
  return s;
}

function deleteApp(req) {
  AppsModel.findOneAndDelete({ app_URL: req.app_URL, userId: req.userId, appId: req.appId },
    (err, doc) => {
      try {
        s.next(doc);
      } catch (error) {
        s.error(error);
      }
    });
  return s;
}

module.exports = {
  addApp,
  findAndUpdateApp,
  getUserApps,
  getAppByAppURL,
  deleteApp,
};
