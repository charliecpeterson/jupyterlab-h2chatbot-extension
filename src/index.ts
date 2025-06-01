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
const h2ChatbotIconSvg = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <circle cx="50" cy="50" r="48" fill="#E0E0E0" stroke="#B0B0B0" stroke-width="2"/>
  <path d="M25 20 C20 20 15 25 15 30 L15 70 C15 75 20 80 25 80 L75 80 C80 80 85 75 85 70 L85 30 C85 25 80 20 75 20 Z" fill="#4A90E2"/>
  <path d="M40 80 L40 90 L50 80 Z" fill="#4A90E2"/>
  <text x="50" y="48" font-family="Arial, sans-serif" font-size="24" fill="#FFFFFF" text-anchor="middle" font-weight="bold">H2</text>
  <line x1="30" y1="60" x2="45" y2="60" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="55" y1="60" x2="70" y2="60" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="35" cy="68" r="2.5" fill="#FFFFFF"/>
  <circle cx="45" cy="68" r="2.5" fill="#FFFFFF"/>
  <circle cx="55" cy="68" r="2.5" fill="#FFFFFF"/>
  <circle cx="65" cy="68" r="2.5" fill="#FFFFFF"/>
  <line x1="25" y1="35" x2="25" y2="45" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="25" cy="50" r="2" fill="#FFFFFF"/>
  <line x1="75" y1="35" x2="75" y2="45" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="75" cy="50" r="2" fill="#FFFFFF"/>
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
      icon: h2ChatbotIcon, // Replace iconClass with icon
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
          chatbotWidget.title.label = chatbotTitle;
          chatbotWidget.title.closable = true;
        }

        if (!chatbotWidget.isAttached) {
          shell.add(chatbotWidget, 'left', { rank: 200 });
        }
        shell.activateById(chatbotWidget.id);
      }
    });

    palette.addItem({ command, category: 'IDRE Chatbot' });

    // ---- ADD THIS LINE TO OPEN ON STARTUP ----
    app.commands.execute(command);
    // -----------------------------------------
  }
};

export default plugin;
