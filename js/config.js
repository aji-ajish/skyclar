var CONFIG = {
  dev: true,
  root: '..',
  fontSize: 15,
  theme: "#584da0",
  dtc: "/dtc",
  hcp: "/hcp",
  leaveSite: {
    title: "You are now leaving skyclarys.com",
    content: "Links are provided as a convenience and for general informational purposes only. Reata does not control the site you are going to. It is recommended you carefully review the terms of use and privacy statement of any other sites. You are solely responsible for your interactions."
  },
  api: {
    dtc: {
      signUp: '/signup',
      baseUrl: "https://skyclaryspatd2.wpengine.com/api"
    }
  },
  default: {
    timeZone: 'America/New_York',
    path: {
      data: "./data",
      images: "./images",
      lottie: '../lottie',
      template: "./templates"
    }
  }
};