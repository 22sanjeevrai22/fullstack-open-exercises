const { PORT } = require("./utils/config");
const { info } = require("./utils/logger");
const app = require("./app");

app.listen(PORT, () => {
  info(
    `Notes Server is running on http://localhost:${PORT}`,
    "We can add additional argument like this too."
  );
});
