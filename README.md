# JupyterLab Hoffman2 HPC Chatbot Extension

This extension integrates the Hoffman2 HPC Chatbot directly into the JupyterLab interface, providing easy access to help and information about using the Hoffman2 cluster, including jobs, software, and more.

The chatbot panel will open automatically on the left side when JupyterLab starts.

## Features
- Embeds the Hoffman2 HPC Chatbot (or a configured chatbot) in a dedicated panel.
- Panel automatically opens in the left area on JupyterLab startup.
- Command Palette integration: Search for "IDRE RAG Chatbot" to open or focus the panel.
- Customizable icon (using jp-ChatbotIcon CSS class).

## Requirements
- JupyterLab >= 3.x (developed with an environment compatible with JupyterLab 4.x)
- Python >= 3.8
- Node.js >= 18.x (for development)

## Installation

### For End Users (if published to PyPI)
If this package is published to PyPI, you can install it using pip:

```bash
pip install jupyterlab-h2chatbot-extension
jupyter lab build
```

### From Source (e.g., from GitHub)
To install directly from this repository:

1. Clone the repository:
```bash
git clone https://github.com/charliecpeterson/jupyterlab_h2chatbot_exentsion.git
cd jupyterlab_h2chatbot_exentsion
```

2. Install the Python package (this also registers the lab extension):
```bash
pip install -e .
```

3. Build the JupyterLab extension:
```bash
jupyter lab build
```


## Usage
Once installed, the Hoffman2 HPC Chatbot panel will automatically appear in the left-hand dock area when you start JupyterLab.

You can also open or focus the panel using the Command Palette:

1. Open the Command Palette (Ctrl+Shift+C or Cmd+Shift+C).
2. Type "H2 Chatbot" and select the command.

## Configuration
Currently, the chatbot URL is hardcoded in the extension's source code.

- **File:** `src/index.ts`
- **Variable:** `chatbotUrl`
- **Default Value:** `http://localhost:5000`

To change the chatbot URL, you will need to modify this file and rebuild the extension.

Future enhancements could include making this configurable via JupyterLab settings.

## Development
If you want to contribute to or modify this extension, follow these steps to set up a development environment:

1. Clone the repository:
```bash
git clone https://github.com/charliecpeterson/jupyterlab_h2chatbot_exentsion.git
cd jupyterlab_h2chatbot_exentsion
```

2. Install Python dependencies (and the package in editable mode):
```bash
pip install -e .
```

3. Install JavaScript dependencies using jlpm:
```bash
jlpm install
```


4. Build the TypeScript source to JavaScript:
```bash
jlpm build
```
   This compiles the code from `src/` to `lib/`.


6. Install the development version of the extension:
```bash
jupyter lab
```

```bash
jupyter lab 
```

After making changes to the TypeScript (`src/`) or CSS (`style/`) files:
- Ensure `jlpm build` (or `jlpm watch`) has completed.
- Refresh your JupyterLab browser page. In some cases, you might need to rebuild JupyterLab itself (`jupyter lab build`), especially if `package.json` or Python-side files change.

## Style
The extension uses a custom icon class `jp-ChatbotIcon`. You can define this icon's appearance in `style/index.css`. For example:

```css
/* style/index.css */
.jp-ChatbotIcon {
  background-image: url('path/to/your/icon.svg'); /* Or use a LabIcon */
  background-repeat: no-repeat;
  background-position: center;
}
```

