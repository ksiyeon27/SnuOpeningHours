import * as shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "views/", "dist/views/");
shell.cp("-R", "public/", "dist/public/");
