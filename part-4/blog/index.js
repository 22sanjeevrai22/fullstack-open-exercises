const { PORT } = require("./utils/config");
const { info } = require("./utils/logger");
const app = require("./app");
const port = PORT || 3002;
app.listen(port, () => {
  info(`Server running on port ${port}`);
});
