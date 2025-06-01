// src/index.ts
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { LabIcon } from '@jupyterlab/ui-components'; // Add this import

import '../style/index.css';

// Create the H2 Chatbot icon
const h2ChatbotIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="#4A90E2"/>
  <text x="12" y="13" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white" text-anchor="middle">H2</text>
</svg>`;

const h2ChatbotIcon = new LabIcon({
  name: 'h2chatbot:icon',
  svgstr: h2ChatbotIconSvg
});

const PLUGIN_ID = 'jupyterlab-chatbot-extension:plugin';

const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ICommandPalette, IMainMenu, ILabShell],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu,
    shell: ILabShell
  ) => {
    console.log('JupyterLab extension jupyterlab-chatbot-extension is activated!');

    const chatbotUrl = 'http://ai1.idre.ucla.edu:31694';
    const chatbotId = 'h2chatbot-panel';
    const chatbotTitle = 'H2 Chatbot';

    let chatbotWidget: MainAreaWidget<Widget>;
    const command: string = 'chatbot:open-idre-rag';

    app.commands.addCommand(command, {
      label: chatbotTitle,
      icon: h2ChatbotIcon, 
      execute: () => {
        if (!chatbotWidget || chatbotWidget.isDisposed) {
          const iframe = document.createElement('iframe');
          iframe.src = chatbotUrl;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-forms');

          const content = new Widget();
          content.node.appendChild(iframe);
          content.id = `${chatbotId}-content`;

          chatbotWidget = new MainAreaWidget({ content });
          chatbotWidget.id = chatbotId;
          chatbotWidget.title.label = ''; 
          chatbotWidget.title.caption = chatbotTitle; 
          chatbotWidget.title.icon = h2ChatbotIcon; 
          chatbotWidget.title.closable = true;
        }

        if (!chatbotWidget.isAttached) {
          shell.add(chatbotWidget, 'left', { rank: 200 });
        }
        shell.activateById(chatbotWidget.id);
      }
    });

    palette.addItem({ command, category: 'H2 Chatbot' });

    // ---- ADD THIS LINE TO OPEN ON STARTUP ----
    app.commands.execute(command);
    // -----------------------------------------
  }
};

export default plugin;
