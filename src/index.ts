// src/index.ts
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { IMainMenu } from '@jupyterlab/mainmenu';

import '../style/index.css';

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

    const chatbotUrl = 'http://localhost:5000';
    const chatbotId = 'h2chatbot-panel';
    const chatbotTitle = 'H2 Chatbot';

    let chatbotWidget: MainAreaWidget<Widget>;
    const command: string = 'chatbot:open-idre-rag';

    app.commands.addCommand(command, {
      label: chatbotTitle,
      iconClass: 'jp-ChatbotIcon',
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
