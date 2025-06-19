const { PORT } = require("../notes/utils/config");
const { info } = require("./utils/logger");
const app = require("./controllers/blogController");

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
