'use babel';

import LanguageExpertRulesView from './language-expert-rules-view';
import { CompositeDisposable } from 'atom';

export default {

  languageExpertRulesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageExpertRulesView = new LanguageExpertRulesView(state.languageExpertRulesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageExpertRulesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-expert-rules:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageExpertRulesView.destroy();
  },

  serialize() {
    return {
      languageExpertRulesViewState: this.languageExpertRulesView.serialize()
    };
  },

  toggle() {
    console.log('LanguageExpertRules was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
