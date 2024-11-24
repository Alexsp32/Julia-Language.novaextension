const Config = require("Config.js");

const config = new Config("JuliaLang");

var langserver = null;

exports.activate = function() {
	// Do work when the extension is activated
	restart_server();
}

exports.deactivate = function() {
	// Clean up state before the extension is deactivated
	if (langserver) {
		langserver.deactivate();
		langserver = null;
	}
}

// Resolve the path to use and start the Language Server, removing previous instances. 
function restart_server() {
	langserver = new JuliaLanguageServer(config);
	// Observe the configuration setting for the Julia binary location, and restart the server on change
	nova.config.observe('JuliaLang.julia-executable-path', (path) => langserver.start(path));
}

const LS_Prefs = new Set([
	// Our extension
	"JuliaLang.JuliaExecutablePath",
	"JuliaLang.OverrideProjectPath",
	"JuliaLang.LanguageServerActive",
]);

class JuliaLanguageServer {
	constructor(config) {
		this.config = config
		for (const pref of LS_Prefs) {
			nova.workspace.config.onDidChange(pref, (newValue, oldValue) => {
				if (oldValue !== newValue) {
					this.start();
				}
			});
		}
	}
	
	deactivate() {
		this.stop();
	}
	
	start(path) {
		if (this.languageClient) {
			this.languageClient.stop();
			nova.subscriptions.remove(this.languageClient);
		}
		
		// Check if LS requested
		if (!this.config.get("LanguageServerActive", "boolean", false)) {
			return;
		}
		
		// Resolve Project env path
		var env_path = this.config.get("OverrideProjectPath", "string", null);
		if (env_path === null) {
			var workspace_path = nova.path.join(nova.workspace.path, "Project.toml");
			if (nova.workspace.contains(workspace_path)) {
				var env_path = nova.workspace.path;
			}
		}
		
		// Create the client
		var serverOptions = {
			path: this.config.get("JuliaExecutablePath", "string", "/opt/homebrew/bin/julia"),
			args: [
				"--project=" + nova.extension.path,
				"-e",
				"using Pkg;Pkg.instantiate();using LanguageServer;runserver()",
			]
		};
		
		// Add environment path if one was found.
		if (env_path !== null) {
			serverOptions.args.push(env_path);
		}
		
		// serverOptions.args.push("--debug")
		
		var clientOptions = {
			syntaxes: ["julia"],
			debug: true,
			// Not sure if needed, but server wouldn't initialise without previously. 
			initializationOptions: {
				capabilities: {
					window: {
						workDoneProgress: false
					}
				}
			},
		};
		
		//Notify about LS starting and which environment we're starting in
		let request = new NotificationRequest("julia-ls-environment");
		request.title = nova.localize("LSP: Server starting");
		request.body = nova.localize("Julia Language server starting with environment: " + serverOptions.args[serverOptions.args.length - 1]);
		nova.notifications.add(request)
		var client = new LanguageClient('julia-lsp', 'Julia Language Server', serverOptions, clientOptions);
		
		// Start the client
		try {	
			client.start();
			
			// Add the client to the subscriptions to be cleaned up
			nova.subscriptions.add(client);
			this.languageClient = client;
		}
		catch (err) {
			// If the .start() method throws, it's likely because the path to the language server is invalid
			
			if (nova.inDevMode()) {
				console.error(err);
			}
		}
	}
	
	stop() {
		if (this.languageClient) {
			this.languageClient.stop();
			nova.subscriptions.remove(this.languageClient);
			this.languageClient = null;
		}
	}
}


// Nova editor commands

nova.commands.register("JuliaLang.restartLS", (workspace) => restart_server())
