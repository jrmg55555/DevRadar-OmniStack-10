const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

//index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, longitude, latitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      //filtrar conexoes que estão a 10km e que o dev tenha uma tecnologia escolhida
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { github_username, latitude, longitude, techs } = req.body;

    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { name = login, avatar_url, bio } = response.data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.findByIdAndUpdate(
      req.params.id,
      {
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location: location
      },
      { useFindAndModify: false }
    );
    console.log(dev);

    return res.json(dev);
  },

  async destroy(req, res) {
    const dev = await Dev.findByIdAndRemove(req.query.id);
    return res.send(dev);
  }
};
