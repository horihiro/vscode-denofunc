# `denofunc` extension for Visual Studio Code

This is VS code extension for using [`denofunc`](https://github.com/anthonychu/azure-functions-deno-worker).

## Features
This extension adds the following commands to VS code.

1. Initialize your folder as `denofunc` project, equivalent to typing `denofunc init` in a terminal
![01 init_project](https://user-images.githubusercontent.com/4566555/122005034-1d28f280-cdf0-11eb-8ca2-949283206f82.gif)

1. Create functions to your project based on [templates](https://github.com/horihiro/vscode-denofunc/blob/main/src/templates/index.ts) included in this extension
![02 create_function](https://user-images.githubusercontent.com/4566555/122005050-1e5a1f80-cdf0-11eb-8776-2c753f57e1b8.gif)

1. (Experimental) Add bindings to your function.
![03 add_binding](https://user-images.githubusercontent.com/4566555/122005053-1ef2b600-cdf0-11eb-9216-a435444c7b7a.gif)

1. Deploy your project to Azure Functions, equivalent to typing `denofunc publish` in a terminal

    - Deploy to a production slot
![04 deploy_to_app](https://user-images.githubusercontent.com/4566555/122005054-1ef2b600-cdf0-11eb-99da-47cdd086760a.gif)

    - Deploy to a deployment slot
    ![05 deploy_to_slot](https://user-images.githubusercontent.com/4566555/122005055-1f8b4c80-cdf0-11eb-8ba2-38de3cae640a.gif)

## Requirements

- [denofunc CLI](https://github.com/anthonychu/azure-functions-deno-worker#install-the-denofunc-cli) 0.6.0 or later<br>
  \# NOTE: Slot deployment is supported only 0.7.0 or later of `denofunc`
  - [Deno](https://deno.land/x/install@v0.1.4) 1.5.4 or later
  - [Azure Functions Core Tools V3](https://github.com/Azure/azure-functions-core-tools#azure-functions-core-tools) - needed for debugging the app locally and deploying it
  - [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest#install) - needed to deploy the app

## Extension Settings

* `denofunc.path`: path of `denofunc` CLI (default: "`denofunc`")

## Known Issues

Please check [known issues](https://github.com/horihiro/vscode-denofunc/issues) before opening new one.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.0

Add following features:
  - Add binding
  - Slot deployment

### 0.0.2

Fix README and env for development.

### 0.0.1

Alpha release.
