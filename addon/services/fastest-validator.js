import Service from '@ember/service';
import FastestValidator from 'fastest-validator';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';

export default class FastestValidatorService extends Service {
  @tracked instance = new FastestValidator();

  constructor() {
    super(...arguments);
    this._defaultMessages = { ...this.instance.messages };
  }

  _instanceChanged() {
    set(this, 'instance', this.instance);
  }

  resetMessages() {
    Object.keys(this._defaultMessages).forEach((key) => {
      this.instance.addMessage(key, this._defaultMessages[key]);
    });
    this._instanceChanged();
  }

  addMessages(messages = {}) {
    if (!(messages instanceof Object)) {
      throw new Error("'messages' must be an object");
    }
    Object.keys(messages).forEach((key) => {
      this.instance.addMessage(key, messages[key]);
    });
    this._instanceChanged();
  }
}
