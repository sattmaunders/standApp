module.exports = {
  port: process.env.PORT || 8000,
  mongo: {
    options: {
      db: {safe: true},
      auto_reconnect: true
    },
    uri: process.env.MONGOLAB_URI || 'mongodb://localhost/standapp-api',
    notificationUrl: "https://android.googleapis.com/gcm/notification",
    apiKey: "AIzaSyDSdZlLQhrXQCM6bpLoY-XPCEIXLcg88Wc",
    projectId: 665143645608
  }
};
